import * as React from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CopyButton } from "@/features/tools/components/CopyButton"
import { ToolShell } from "@/features/tools/components/ToolShell"
import type { ToolDefinition } from "@/features/tools/registry"

function parseHex(value: string) {
  const clean = value.trim().replace(/^#/, "")
  if (!/^([\da-f]{3}|[\da-f]{6})$/i.test(clean)) return null
  const full = clean.length === 3 ? clean.split("").map((char) => char + char).join("") : clean
  return {
    r: Number.parseInt(full.slice(0, 2), 16),
    g: Number.parseInt(full.slice(2, 4), 16),
    b: Number.parseInt(full.slice(4, 6), 16),
  }
}

function rgbToHsl(r: number, g: number, b: number) {
  r /= 255; g /= 255; b /= 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2
  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    if (max === r) h = (g - b) / d + (g < b ? 6 : 0)
    else if (max === g) h = (b - r) / d + 2
    else h = (r - g) / d + 4
    h /= 6
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) }
}

export function ColorTool({ tool }: { tool: ToolDefinition }) {
  const [hex, setHex] = React.useState("#0d9488")
  const rgb = parseHex(hex)
  const hsl = rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : null
  const normalized = rgb ? `#${[rgb.r, rgb.g, rgb.b].map((n) => n.toString(16).padStart(2, "0")).join("")}` : ""
  const output = rgb && hsl ? `${normalized}\nrgb(${rgb.r}, ${rgb.g}, ${rgb.b})\nhsl(${hsl.h} ${hsl.s}% ${hsl.l}%)` : ""

  return (
    <ToolShell tool={tool} actions={<CopyButton text={output} />}>
      <div className="grid gap-4 lg:grid-cols-[320px_1fr]">
        <div className="space-y-2">
          <Label>HEX 颜色</Label>
          <Input value={hex} onChange={(event) => setHex(event.target.value)} placeholder="#0d9488" />
          {!rgb ? <p className="text-sm text-destructive">请输入 3 位或 6 位 HEX。</p> : null}
        </div>
        <div className="grid gap-4 sm:grid-cols-[180px_1fr]">
          <div className="min-h-40 rounded-lg border shadow-sm" style={{ background: normalized || "transparent" }} />
          <pre className="min-h-40 whitespace-pre-wrap rounded-lg border bg-muted/20 p-4 font-mono text-sm">{output}</pre>
        </div>
      </div>
    </ToolShell>
  )
}
