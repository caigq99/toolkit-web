export function bytesToHex(bytes: ArrayBuffer | Uint8Array) {
  const array = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes)
  return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join("")
}

export function utf8ToBytes(value: string) {
  return new TextEncoder().encode(value)
}

export function bytesToBase64(bytes: Uint8Array) {
  let binary = ""
  for (const byte of bytes) binary += String.fromCharCode(byte)
  return btoa(binary)
}

export function base64ToBytes(value: string) {
  const binary = atob(value.replace(/\s/g, ""))
  return Uint8Array.from(binary, (char) => char.charCodeAt(0))
}

export function base64UrlToBase64(value: string) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/")
  return normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=")
}
