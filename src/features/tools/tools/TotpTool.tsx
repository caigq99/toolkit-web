import * as React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CopyButton } from "@/features/tools/components/CopyButton"
import { ToolShell } from "@/features/tools/components/ToolShell"
import { buildOtpAuthUrl, generateTotp, parseTotpInput, randomBase32 } from "@/features/tools/lib/totp"
import type { ToolDefinition } from "@/features/tools/registry"

export function TotpTool({ tool }: { tool: ToolDefinition }) {
  const [input, setInput] = React.useState("JBSWY3DPEHPK3PXP")
  const [code, setCode] = React.useState("")
  const [error, setError] = React.useState("")
  const [now, setNow] = React.useState(() => Date.now())

  const config = React.useMemo(() => {
    try {
      return parseTotpInput(input)
    } catch {
      return undefined
    }
  }, [input])
  const remaining = config ? config.period - (Math.floor(now / 1000) % config.period) : 0
  const otpAuthUrl = config ? buildOtpAuthUrl(config) : ""

  React.useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(timer)
  }, [])

  React.useEffect(() => {
    let cancelled = false
    async function run() {
      try {
        const parsed = parseTotpInput(input)
        const next = await generateTotp(parsed, now)
        if (!cancelled) {
          setCode(next)
          setError("")
        }
      } catch (err) {
        if (!cancelled) {
          setCode("")
          setError(err instanceof Error ? err.message : "TOTP 生成失败")
        }
      }
    }
    void run()
    return () => {
      cancelled = true
    }
  }, [input, now])

  return (
    <ToolShell tool={tool} actions={<CopyButton text={code} label="复制验证码" />}>
      <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="totp-input">Secret 或 otpauth:// URL</Label>
            <Input id="totp-input" value={input} onChange={(event) => setInput(event.target.value)} placeholder="JBSWY3DPEHPK3PXP" />
          </div>
          <div className="flex flex-wrap gap-2">
            <Button type="button" variant="outline" onClick={() => setInput(randomBase32())}>生成 Secret</Button>
            <CopyButton text={otpAuthUrl} label="复制 otpauth URL" />
          </div>
          {error ? <p className="text-sm text-destructive">{error}</p> : null}
          {config ? (
            <div className="grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
              <div>算法：{config.algorithm}</div>
              <div>位数：{config.digits}</div>
              <div>周期：{config.period}s</div>
              <div>账号：{config.account || "-"}</div>
            </div>
          ) : null}
        </div>
        <Card className="bg-muted/20">
          <CardContent className="flex min-h-56 flex-col items-center justify-center gap-4 p-6 text-center">
            <div className="text-sm text-muted-foreground">当前验证码</div>
            <div className="font-mono text-5xl font-semibold tracking-[0.2em] text-primary">{code || "------"}</div>
            <div className="w-full rounded-full bg-muted p-1">
              <div className="h-2 rounded-full bg-primary transition-all" style={{ width: config ? `${(remaining / config.period) * 100}%` : "0%" }} />
            </div>
            <div className="text-sm text-muted-foreground">{remaining}s 后刷新</div>
          </CardContent>
        </Card>
      </div>
    </ToolShell>
  )
}
