import {
  Binary,
  Braces,
  Clock3,
  Code2,
  Diff,
  Fingerprint,
  Hash,
  KeyRound,
  Link2,
  LockKeyhole,
  Palette,
  Regex,
  type LucideIcon,
} from "lucide-react"

export type ToolCategoryId = "format" | "security" | "dev" | "generator"

export type ToolDefinition = {
  id: string
  name: string
  shortName: string
  path: string
  category: ToolCategoryId
  description: string
  keywords: string[]
  icon: LucideIcon
}

export const toolCategories: Array<{
  id: ToolCategoryId
  name: string
  description: string
}> = [
  { id: "format", name: "格式化 / 编码", description: "数据格式、编码解码" },
  { id: "security", name: "安全 / 账号", description: "账号、安全与校验" },
  { id: "dev", name: "文本 / 开发", description: "开发与文本处理" },
  { id: "generator", name: "生成器", description: "随机值与凭据生成" },
]

export const tools: ToolDefinition[] = [
  {
    id: "json",
    name: "JSON 美化",
    shortName: "JSON",
    path: "/tools/json",
    category: "format",
    description: "格式化、压缩并校验 JSON 内容。",
    keywords: ["json", "format", "prettier", "minify", "美化", "压缩", "校验"],
    icon: Braces,
  },
  {
    id: "uuid",
    name: "UUID 生成",
    shortName: "UUID",
    path: "/tools/uuid",
    category: "generator",
    description: "批量生成 UUID v4 并快速复制。",
    keywords: ["uuid", "guid", "随机", "生成"],
    icon: Fingerprint,
  },
  {
    id: "totp",
    name: "2FA / TOTP",
    shortName: "2FA",
    path: "/tools/totp",
    category: "security",
    description: "输入 secret 或 otpauth URL，本地生成验证码。",
    keywords: ["2fa", "totp", "otp", "authenticator", "验证码", "双因素"],
    icon: LockKeyhole,
  },
  {
    id: "base64",
    name: "本地 Base64",
    shortName: "Base64",
    path: "/tools/base64",
    category: "format",
    description: "在浏览器中完成 Base64 编码和解码。",
    keywords: ["base64", "encode", "decode", "编码", "解码"],
    icon: Binary,
  },
  {
    id: "url",
    name: "URL 编解码",
    shortName: "URL",
    path: "/tools/url",
    category: "format",
    description: "对 URL 片段或完整地址进行编码解码。",
    keywords: ["url", "uri", "encodeURIComponent", "decodeURIComponent", "编码"],
    icon: Link2,
  },
  {
    id: "timestamp",
    name: "时间戳转换",
    shortName: "时间戳",
    path: "/tools/timestamp",
    category: "dev",
    description: "Unix 时间戳、ISO 时间和本地时间互转。",
    keywords: ["timestamp", "unix", "date", "time", "时间", "转换"],
    icon: Clock3,
  },
  {
    id: "hash",
    name: "Hash 生成",
    shortName: "Hash",
    path: "/tools/hash",
    category: "security",
    description: "使用 Web Crypto 生成 SHA 系列摘要。",
    keywords: ["hash", "sha", "sha256", "digest", "摘要"],
    icon: Hash,
  },
  {
    id: "jwt",
    name: "JWT 解码",
    shortName: "JWT",
    path: "/tools/jwt",
    category: "security",
    description: "本地解析 JWT Header 与 Payload，不验证签名。",
    keywords: ["jwt", "token", "decode", "payload", "header"],
    icon: Code2,
  },
  {
    id: "color",
    name: "颜色转换",
    shortName: "颜色",
    path: "/tools/color",
    category: "dev",
    description: "HEX、RGB、HSL 颜色格式互转与预览。",
    keywords: ["color", "hex", "rgb", "hsl", "颜色"],
    icon: Palette,
  },
  {
    id: "regex",
    name: "正则测试",
    shortName: "正则",
    path: "/tools/regex",
    category: "dev",
    description: "测试正则表达式并查看匹配结果。",
    keywords: ["regex", "regexp", "正则", "匹配"],
    icon: Regex,
  },
  {
    id: "diff",
    name: "文本 Diff",
    shortName: "Diff",
    path: "/tools/diff",
    category: "dev",
    description: "对比两段文本，按行展示差异。",
    keywords: ["diff", "compare", "文本", "对比", "差异"],
    icon: Diff,
  },
  {
    id: "password",
    name: "密码生成",
    shortName: "密码",
    path: "/tools/password",
    category: "generator",
    description: "按规则生成强随机密码。",
    keywords: ["password", "密码", "random", "generate", "随机"],
    icon: KeyRound,
  },
]

export const toolsById = new Map(tools.map((tool) => [tool.id, tool]))

export function getTool(id: string | undefined) {
  if (!id) return undefined
  return toolsById.get(id)
}

export function getCategoryName(id: ToolCategoryId) {
  return toolCategories.find((category) => category.id === id)?.name ?? id
}
