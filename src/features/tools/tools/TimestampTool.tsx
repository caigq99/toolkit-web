import * as React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CopyButton } from "@/features/tools/components/CopyButton"
import { ToolShell } from "@/features/tools/components/ToolShell"
import type { ToolDefinition } from "@/features/tools/registry"

function parseTimestamp(value: string) {
  const numeric = Number(value.trim())
  if (Number.isFinite(numeric)) return new Date(value.trim().length === 10 ? numeric * 1000 : numeric)
  return new Date(value)
}

export function TimestampTool({ tool }: { tool: ToolDefinition }) {
  const [now, setNow] = React.useState(() => Date.now())
  const [input, setInput] = React.useState(() => String(Math.floor(Date.now() / 1000)))
  const date = parseTimestamp(input)
  const valid = !Number.isNaN(date.getTime())
  const output = valid
    ? [`Unix 秒：${Math.floor(date.getTime() / 1000)}`, `Unix 毫秒：${date.getTime()}`, `ISO：${date.toISOString()}`, `本地：${date.toLocaleString()}`].join("\n")
    : ""

  React.useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <ToolShell tool={tool} actions={<CopyButton text={output} />}>
      <div className="grid gap-4 lg:grid-cols-[320px_1fr]">
        <div className="space-y-4">
          <Card className="bg-muted/20">
            <CardContent className="space-y-2 p-4">
              <div className="text-sm text-muted-foreground">当前时间</div>
              <div className="font-mono text-xl font-semibold">{Math.floor(now / 1000)}</div>
              <div className="text-xs text-muted-foreground">{new Date(now).toLocaleString()}</div>
            </CardContent>
          </Card>
          <div className="space-y-2">
            <Label htmlFor="timestamp-input">时间戳 / ISO / 本地时间</Label>
            <Input id="timestamp-input" value={input} onChange={(event) => setInput(event.target.value)} />
          </div>
          <Button type="button" variant="outline" onClick={() => setInput(String(Math.floor(Date.now() / 1000)))}>使用当前时间</Button>
        </div>
        <pre className="min-h-56 whitespace-pre-wrap rounded-lg border bg-muted/20 p-4 font-mono text-sm">{valid ? output : "无法解析时间"}</pre>
      </div>
    </ToolShell>
  )
}
