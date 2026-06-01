import { bytesToBase64, bytesToHex } from "./encoding"

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"

export type TotpConfig = {
  secret: string
  issuer?: string
  account?: string
  digits: number
  period: number
  algorithm: "SHA-1" | "SHA-256" | "SHA-512"
}

export function normalizeBase32(value: string) {
  return value.toUpperCase().replace(/\s|=|-/g, "")
}

export function decodeBase32(value: string) {
  const clean = normalizeBase32(value)
  let bits = ""
  for (const char of clean) {
    const index = alphabet.indexOf(char)
    if (index === -1) throw new Error(`Secret 包含非法 Base32 字符：${char}`)
    bits += index.toString(2).padStart(5, "0")
  }
  const bytes: number[] = []
  for (let i = 0; i + 8 <= bits.length; i += 8) {
    bytes.push(Number.parseInt(bits.slice(i, i + 8), 2))
  }
  return new Uint8Array(bytes)
}

export function randomBase32(length = 32) {
  const random = new Uint8Array(length)
  crypto.getRandomValues(random)
  return Array.from(random, (byte) => alphabet[byte % alphabet.length]).join("")
}

export function parseTotpInput(input: string): TotpConfig {
  const trimmed = input.trim()
  if (!trimmed) throw new Error("请输入 secret 或 otpauth URL")
  const defaults: TotpConfig = { secret: trimmed, digits: 6, period: 30, algorithm: "SHA-1" }
  if (!trimmed.startsWith("otpauth://")) return defaults

  const url = new URL(trimmed)
  if (url.hostname !== "totp") throw new Error("当前仅支持 otpauth://totp")
  const secret = url.searchParams.get("secret") ?? ""
  if (!secret) throw new Error("otpauth URL 缺少 secret")
  const algorithmParam = (url.searchParams.get("algorithm") ?? "SHA1").toUpperCase().replace("SHA", "SHA-")
  const algorithm = algorithmParam === "SHA-256" || algorithmParam === "SHA-512" ? algorithmParam : "SHA-1"
  const digits = Number(url.searchParams.get("digits") ?? 6)
  const period = Number(url.searchParams.get("period") ?? 30)
  const label = decodeURIComponent(url.pathname.replace(/^\//, ""))
  const [labelIssuer, account] = label.includes(":") ? label.split(/:(.*)/, 2) : [undefined, label]
  return {
    secret,
    issuer: url.searchParams.get("issuer") ?? labelIssuer,
    account,
    digits: Number.isFinite(digits) ? digits : 6,
    period: Number.isFinite(period) ? period : 30,
    algorithm,
  }
}

export function buildOtpAuthUrl(config: TotpConfig) {
  const label = encodeURIComponent(`${config.issuer || "ToolKit"}:${config.account || "local"}`)
  const params = new URLSearchParams({
    secret: normalizeBase32(config.secret),
    issuer: config.issuer || "ToolKit",
    algorithm: config.algorithm.replace("-", ""),
    digits: String(config.digits),
    period: String(config.period),
  })
  return `otpauth://totp/${label}?${params.toString()}`
}

export async function generateTotp(config: TotpConfig, now = Date.now()) {
  const secretBytes = decodeBase32(config.secret)
  const counter = Math.floor(now / 1000 / config.period)
  const buffer = new ArrayBuffer(8)
  const view = new DataView(buffer)
  view.setUint32(4, counter, false)
  const key = await crypto.subtle.importKey("raw", secretBytes, { name: "HMAC", hash: config.algorithm }, false, ["sign"])
  const signature = new Uint8Array(await crypto.subtle.sign("HMAC", key, buffer))
  const offset = signature[signature.length - 1] & 0x0f
  const codeInt =
    ((signature[offset] & 0x7f) << 24) |
    ((signature[offset + 1] & 0xff) << 16) |
    ((signature[offset + 2] & 0xff) << 8) |
    (signature[offset + 3] & 0xff)
  return String(codeInt % 10 ** config.digits).padStart(config.digits, "0")
}

export function secretDebug(secret: string) {
  const bytes = decodeBase32(secret)
  return { bytes: bytes.length, hex: bytesToHex(bytes), base64: bytesToBase64(bytes) }
}
