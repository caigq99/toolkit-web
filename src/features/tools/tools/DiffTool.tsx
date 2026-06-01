import * as React from "react"

import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ToolShell } from "@/features/tools/components/ToolShell"
import type { ToolDefinition } from "@/features/tools/registry"

type DiffRow = { type: "same" | "changed" | "added" | "removed"; left: string; right: string; index: number }

function diffLines(left: string, right: string): DiffRow[] {
  const a = left.split("\n")
  const b = right.split("\n")
  const length = Math.max(a.length, b.length)
  return Array.from({ length }, (_, index) => {
    const leftLine = a[index]
    const rightLine = b[index]
    if (leftLine === undefined) return { type: "added", left: "", right: rightLine, index }
    if (rightLine === undefined) return { type: "removed", left: leftLine, right: "", index }
    if (leftLine === rightLine) return { type: "same", left: leftLine, right: rightLine, index }
    return { type: "changed", left: leftLine, right: rightLine, index }
  })
}

const rowStyle = {
  same: "bg-background",
  changed: "bg-amber-500/10 text-amber-900 dark:text-amber-200",
  added: "bg-emerald-500/10 text-emerald-900 dark:text-emerald-200",
  removed: "bg-red-500/10 text-red-900 dark:text-red-200",
}

export function DiffTool({ tool }: { tool: ToolDefinition }) {
  const [left, setLeft] = React.useState("ToolKit\nJSON 美化\nUUID 生成\n2FA")
  const [right, setRight] = React.useState("ToolKit\nJSON 美化\nUUID 批量生成\n2FA/TOTP\nBase64")
  const rows = diffLines(left, right)
  const changed = rows.filter((row) => row.type !== "same").length

  return (
    <ToolShell tool={tool}>
      <div className="space-y-4">
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="space-y-2"><Label>左侧文本</Label><Textarea className="min-h-56 font-mono" value={left} onChange={(event) => setLeft(event.target.value)} /></div>
          <div className="space-y-2"><Label>右侧文本</Label><Textarea className="min-h-56 font-mono" value={right} onChange={(event) => setRight(event.target.value)} /></div>
        </div>
        <div className="flex items-center gap-2"><Label>逐行差异</Label><Badge>{changed} 行变化</Badge></div>
        <div className="overflow-hidden rounded-lg border font-mono text-sm">
          {rows.map((row) => (
            <div key={row.index} className={`grid grid-cols-[56px_1fr_1fr] border-b last:border-b-0 ${rowStyle[row.type]}`}>
              <div className="border-r px-3 py-2 text-right text-muted-foreground">{row.index + 1}</div>
              <div className="border-r px-3 py-2 whitespace-pre-wrap">{row.left}</div>
              <div className="px-3 py-2 whitespace-pre-wrap">{row.right}</div>
            </div>
          ))}
        </div>
      </div>
    </ToolShell>
  )
}
