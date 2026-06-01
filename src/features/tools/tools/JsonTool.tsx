import * as React from "react"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CopyButton } from "@/features/tools/components/CopyButton"
import { ToolShell } from "@/features/tools/components/ToolShell"
import type { ToolDefinition } from "@/features/tools/registry"

const sampleJson = `{"name":"ToolKit","local":true,"tools":["json","uuid","totp"]}`

export function JsonTool({ tool }: { tool: ToolDefinition }) {
  const [input, setInput] = React.useState(sampleJson)
  const [mode, setMode] = React.useState<"pretty" | "minify">("pretty")

  const result = React.useMemo(() => {
    try {
      const parsed = JSON.parse(input)
      return { output: mode === "pretty" ? JSON.stringify(parsed, null, 2) : JSON.stringify(parsed), error: "" }
    } catch (err) {
      return { output: "", error: err instanceof Error ? err.message : "JSON 解析失败" }
    }
  }, [input, mode])

  return (
    <ToolShell tool={tool} actions={<CopyButton text={result.output} />}>
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="json-input">输入 JSON</Label>
          <Textarea id="json-input" className="min-h-96 font-mono" value={input} onChange={(event) => setInput(event.target.value)} />
          <div className="flex flex-wrap gap-2">
            <Button type="button" variant={mode === "pretty" ? "default" : "outline"} onClick={() => setMode("pretty")}>美化</Button>
            <Button type="button" variant={mode === "minify" ? "default" : "outline"} onClick={() => setMode("minify")}>压缩</Button>
            <Button type="button" variant="ghost" onClick={() => setInput(sampleJson)}>示例</Button>
          </div>
          {result.error ? <p className="text-sm text-destructive">{result.error}</p> : null}
        </div>
        <div className="space-y-2">
          <Label htmlFor="json-output">输出</Label>
          <Textarea id="json-output" readOnly className="min-h-96 font-mono" value={result.output} placeholder="格式化结果会显示在这里" />
        </div>
      </div>
    </ToolShell>
  )
}
