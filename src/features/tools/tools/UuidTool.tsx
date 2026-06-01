import * as React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CopyButton } from "@/features/tools/components/CopyButton"
import { ToolShell } from "@/features/tools/components/ToolShell"
import type { ToolDefinition } from "@/features/tools/registry"

function makeUuids(count: number) {
  return Array.from({ length: Math.max(1, Math.min(200, count)) }, () => crypto.randomUUID()).join("\n")
}

export function UuidTool({ tool }: { tool: ToolDefinition }) {
  const [count, setCount] = React.useState(5)
  const [output, setOutput] = React.useState(() => makeUuids(5))

  return (
    <ToolShell tool={tool} actions={<CopyButton text={output} label="复制全部" />}>
      <div className="grid gap-4 lg:grid-cols-[260px_1fr]">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="uuid-count">生成数量（1-200）</Label>
            <Input id="uuid-count" type="number" min={1} max={200} value={count} onChange={(event) => setCount(Number(event.target.value))} />
          </div>
          <Button type="button" onClick={() => setOutput(makeUuids(count))}>重新生成</Button>
        </div>
        <Textarea readOnly className="min-h-96 font-mono" value={output} />
      </div>
    </ToolShell>
  )
}
