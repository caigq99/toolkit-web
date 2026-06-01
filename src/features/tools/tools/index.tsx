import { Base64Tool } from "./Base64Tool"
import { ColorTool } from "./ColorTool"
import { DiffTool } from "./DiffTool"
import { HashTool } from "./HashTool"
import { JsonTool } from "./JsonTool"
import { JwtTool } from "./JwtTool"
import { PasswordTool } from "./PasswordTool"
import { RegexTool } from "./RegexTool"
import { TimestampTool } from "./TimestampTool"
import { TotpTool } from "./TotpTool"
import { UrlTool } from "./UrlTool"
import { UuidTool } from "./UuidTool"
import type { ToolDefinition } from "@/features/tools/registry"

export function ToolRenderer({ tool }: { tool: ToolDefinition }) {
  switch (tool.id) {
    case "json": return <JsonTool tool={tool} />
    case "uuid": return <UuidTool tool={tool} />
    case "totp": return <TotpTool tool={tool} />
    case "base64": return <Base64Tool tool={tool} />
    case "url": return <UrlTool tool={tool} />
    case "timestamp": return <TimestampTool tool={tool} />
    case "hash": return <HashTool tool={tool} />
    case "jwt": return <JwtTool tool={tool} />
    case "color": return <ColorTool tool={tool} />
    case "regex": return <RegexTool tool={tool} />
    case "diff": return <DiffTool tool={tool} />
    case "password": return <PasswordTool tool={tool} />
    default: return null
  }
}
