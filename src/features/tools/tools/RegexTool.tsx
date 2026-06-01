import * as React from "react"

import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ToolShell } from "@/features/tools/components/ToolShell"
import type { ToolDefinition } from "@/features/tools/registry"

export function RegexTool({ tool }: { tool: ToolDefinition }) {
  const [pattern, setPattern] = React.useState("\\bTool\\w*")
  const [flags, setFlags] = React.useState("gi")
  const [text, setText] = React.useState("ToolKit is a local toolkit. tool results stay in your browser.")
  let matches: RegExpMatchArray[] = []
  let error = ""
  try {
    const regex = new RegExp(pattern, flags.includes("g") ? flags : `${flags}g`)
    matches = Array.from(text.matchAll(regex))
  } catch (err) {
    error = err instanceof Error ? err.message : "正则无效"
  }

  return (
    <ToolShell tool={tool}>
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-3">
          <Label>表达式</Label>
          <Input value={pattern} onChange={(event) => setPattern(event.target.value)} />
          <Label>Flags</Label>
          <Input value={flags} onChange={(event) => setFlags(event.target.value)} placeholder="gim" />
          <Label>测试文本</Label>
          <Textarea className="min-h-64" value={text} onChange={(event) => setText(event.target.value)} />
          {error ? <p className="text-sm text-destructive">{error}</p> : null}
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-2"><Label>匹配结果</Label><Badge>{matches.length} 项</Badge></div>
          <div className="min-h-96 rounded-lg border bg-muted/20 p-4 font-mono text-sm">
            {matches.length ? matches.map((match, index) => (
              <div key={`${match.index}-${index}`} className="mb-2 rounded-md bg-background p-2 shadow-xs">
                <span className="text-muted-foreground">#{index + 1} @{match.index}: </span>{match[0]}
              </div>
            )) : <span className="text-muted-foreground">暂无匹配</span>}
          </div>
        </div>
      </div>
    </ToolShell>
  )
}
