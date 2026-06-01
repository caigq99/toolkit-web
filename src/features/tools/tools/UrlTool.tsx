import * as React from "react"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CopyButton } from "@/features/tools/components/CopyButton"
import { ToolShell } from "@/features/tools/components/ToolShell"
import type { ToolDefinition } from "@/features/tools/registry"

const sampleUrl = "https://example.com/search?q=ToolKit 工具&lang=zh-CN"
type UrlMode = "encode" | "decode" | "componentEncode" | "componentDecode"

export function UrlTool({ tool }: { tool: ToolDefinition }) {
  const [input, setInput] = React.useState(sampleUrl)
  const [mode, setMode] = React.useState<UrlMode>("encode")

  const result = React.useMemo(() => {
    try {
      const output =
        mode === "encode"
          ? encodeURI(input)
          : mode === "decode"
            ? decodeURI(input)
            : mode === "componentEncode"
              ? encodeURIComponent(input)
              : decodeURIComponent(input)
      return { output, error: "" }
    } catch (err) {
      return { output: "", error: err instanceof Error ? err.message : "URL 转换失败" }
    }
  }, [input, mode])

  return (
    <ToolShell tool={tool} actions={<CopyButton text={result.output} />}>
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-2">
          <Label>输入</Label>
          <Textarea className="min-h-80 font-mono" value={input} onChange={(event) => setInput(event.target.value)} />
          <div className="flex flex-wrap gap-2">
            <Button type="button" variant={mode === "encode" ? "default" : "outline"} onClick={() => setMode("encode")}>encodeURI</Button>
            <Button type="button" variant={mode === "decode" ? "default" : "outline"} onClick={() => setMode("decode")}>decodeURI</Button>
            <Button type="button" variant={mode === "componentEncode" ? "default" : "outline"} onClick={() => setMode("componentEncode")}>encodeURIComponent</Button>
            <Button type="button" variant={mode === "componentDecode" ? "default" : "outline"} onClick={() => setMode("componentDecode")}>decodeURIComponent</Button>
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
