import * as React from "react"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CopyButton } from "@/features/tools/components/CopyButton"
import { ToolShell } from "@/features/tools/components/ToolShell"
import { base64ToBytes, bytesToBase64, utf8ToBytes } from "@/features/tools/lib/encoding"
import type { ToolDefinition } from "@/features/tools/registry"

const sampleText = "Hello, ToolKit! 你好"

export function Base64Tool({ tool }: { tool: ToolDefinition }) {
  const [input, setInput] = React.useState(sampleText)
  const [mode, setMode] = React.useState<"encode" | "decode">("encode")

  const result = React.useMemo(() => {
    try {
      const output = mode === "encode" ? bytesToBase64(utf8ToBytes(input)) : new TextDecoder().decode(base64ToBytes(input))
      return { output, error: "" }
    } catch (err) {
      return { output: "", error: err instanceof Error ? err.message : "Base64 解码失败" }
    }
  }, [input, mode])

  return (
    <ToolShell tool={tool} actions={<CopyButton text={result.output} />}>
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-2">
          <Label>输入</Label>
          <Textarea className="min-h-80 font-mono" value={input} onChange={(event) => setInput(event.target.value)} />
          <div className="flex gap-2">
            <Button type="button" variant={mode === "encode" ? "default" : "outline"} onClick={() => setMode("encode")}>编码</Button>
            <Button type="button" variant={mode === "decode" ? "default" : "outline"} onClick={() => setMode("decode")}>解码</Button>
          </div>
          {result.error ? <p className="text-sm text-destructive">{result.error}</p> : null}
        </div>
        <div className="space-y-2">
          <Label>输出</Label>
          <Textarea readOnly className="min-h-80 font-mono" value={result.output} />
        </div>
      </div>
    </ToolShell>
  )
}
