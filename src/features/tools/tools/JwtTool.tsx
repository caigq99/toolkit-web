import * as React from "react"

import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CopyButton } from "@/features/tools/components/CopyButton"
import { ToolShell } from "@/features/tools/components/ToolShell"
import { base64ToBytes, base64UrlToBase64 } from "@/features/tools/lib/encoding"
import type { ToolDefinition } from "@/features/tools/registry"

const sample = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0b29sa2l0IiwibG9jYWwiOnRydWUsImlhdCI6MTcwMDAwMDAwMH0.signature"

function decodePart(value: string) {
  return JSON.stringify(JSON.parse(new TextDecoder().decode(base64ToBytes(base64UrlToBase64(value)))), null, 2)
}

export function JwtTool({ tool }: { tool: ToolDefinition }) {
  const [input, setInput] = React.useState(sample)
  const parts = input.trim().split(".")
  let header = ""
  let payload = ""
  let error = ""
  try {
    if (parts.length < 2) throw new Error("JWT 至少需要 header.payload 两段")
    header = decodePart(parts[0])
    payload = decodePart(parts[1])
  } catch (err) {
    error = err instanceof Error ? err.message : "JWT 解码失败"
  }
  const output = header || payload ? `Header\n${header}\n\nPayload\n${payload}` : ""

  return (
    <ToolShell tool={tool} actions={<CopyButton text={output} />}>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>JWT</Label>
          <Textarea className="min-h-32 font-mono" value={input} onChange={(event) => setInput(event.target.value)} />
          <p className="text-xs text-muted-foreground">仅做本地 Base64URL 解码，不校验签名。</p>
          {error ? <p className="text-sm text-destructive">{error}</p> : null}
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="space-y-2">
            <Label>Header</Label>
            <Textarea readOnly className="min-h-72 font-mono" value={header} />
          </div>
          <div className="space-y-2">
            <Label>Payload</Label>
            <Textarea readOnly className="min-h-72 font-mono" value={payload} />
          </div>
        </div>
      </div>
    </ToolShell>
  )
}
