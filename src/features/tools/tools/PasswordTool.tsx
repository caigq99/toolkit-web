import * as React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { CopyButton } from "@/features/tools/components/CopyButton"
import { ToolShell } from "@/features/tools/components/ToolShell"
import type { ToolDefinition } from "@/features/tools/registry"

const sets = {
  lower: "abcdefghijklmnopqrstuvwxyz",
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "!@#$%^&*()-_=+[]{};:,.<>?",
}

function randomPassword(length: number, options: Record<keyof typeof sets, boolean>) {
  const pool = Object.entries(sets).filter(([key]) => options[key as keyof typeof sets]).map(([, value]) => value).join("") || sets.lower
  const bytes = new Uint32Array(Math.max(1, Math.min(128, length)))
  crypto.getRandomValues(bytes)
  return Array.from(bytes, (byte) => pool[byte % pool.length]).join("")
}

export function PasswordTool({ tool }: { tool: ToolDefinition }) {
  const [length, setLength] = React.useState(24)
  const [options, setOptions] = React.useState({ lower: true, upper: true, numbers: true, symbols: true })
  const [password, setPassword] = React.useState(() => randomPassword(24, options))

  function update() {
    setPassword(randomPassword(length, options))
  }

  return (
    <ToolShell tool={tool} actions={<CopyButton text={password} label="复制密码" />}>
      <div className="grid gap-4 lg:grid-cols-[320px_1fr]">
        <div className="space-y-4">
          <div className="space-y-2"><Label>长度</Label><Input type="number" min={1} max={128} value={length} onChange={(event) => setLength(Number(event.target.value))} /></div>
          {Object.keys(sets).map((key) => {
            const labels: Record<string, string> = { lower: "小写字母", upper: "大写字母", numbers: "数字", symbols: "符号" }
            const typedKey = key as keyof typeof sets
            return (
              <div key={key} className="flex items-center justify-between rounded-lg border p-3">
                <Label>{labels[key]}</Label>
                <Switch checked={options[typedKey]} onCheckedChange={(checked) => setOptions((current) => ({ ...current, [typedKey]: checked }))} />
              </div>
            )
          })}
          <Button type="button" onClick={update}>生成密码</Button>
        </div>
        <div className="flex min-h-72 items-center justify-center rounded-lg border bg-muted/20 p-6">
          <div className="break-all text-center font-mono text-2xl font-semibold tracking-wide">{password}</div>
        </div>
      </div>
    </ToolShell>
  )
}
