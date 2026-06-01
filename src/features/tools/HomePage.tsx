import { ArrowRight, Clock3, Command, ShieldCheck, Sparkles } from "lucide-react"
import { Link } from "react-router-dom"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PrivacyBadge } from "@/features/tools/components/PrivacyBadge"
import { ToolCard } from "@/features/tools/components/ToolCard"
import { tools } from "@/features/tools/registry"

const featured = ["json", "totp", "uuid", "jwt"]

export function HomePage() {
  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-2xl border bg-card shadow-sm">
        <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1.2fr_0.8fr] lg:p-10">
          <div className="flex flex-col justify-center gap-5">
            <div className="flex flex-wrap items-center gap-2">
              <PrivacyBadge />
              <Badge className="gap-1"><Sparkles className="size-3.5" /> 12 个常用工具</Badge>
            </div>
            <div className="space-y-3">
              <h1 className="max-w-3xl text-3xl font-semibold tracking-tight sm:text-5xl">欢迎使用 ToolKit</h1>
              <p className="max-w-2xl text-base text-muted-foreground sm:text-lg">面向开发者和日常效率场景的小工具集合。JSON、UUID、2FA、Hash、JWT、Diff 等操作全部在浏览器本地完成。</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button asChild><Link to="/tools/json">打开 JSON 美化 <ArrowRight /></Link></Button>
              <Button asChild variant="outline"><Link to="/tools/totp">查看 2FA/TOTP</Link></Button>
            </div>
          </div>
          <Card className="bg-muted/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Command className="size-5 text-primary" /> 快速打开</CardTitle>
              <CardDescription>按 Cmd/Ctrl + K 搜索任意工具。</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {tools.filter((tool) => featured.includes(tool.id)).map((tool) => {
                const Icon = tool.icon
                return (
                  <Link key={tool.id} to={tool.path} className="flex items-center gap-3 rounded-lg border bg-background p-3 text-sm transition-colors hover:bg-muted">
                    <Icon className="size-4 text-primary" />
                    <span className="flex-1 font-medium">{tool.name}</span>
                    <ArrowRight className="size-4 text-muted-foreground" />
                  </Link>
                )
              })}
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <Card><CardContent className="flex items-center gap-3 p-4"><ShieldCheck className="size-5 text-primary" /><div><div className="font-medium">隐私优先</div><div className="text-sm text-muted-foreground">敏感输入不落库</div></div></CardContent></Card>
        <Card><CardContent className="flex items-center gap-3 p-4"><Clock3 className="size-5 text-primary" /><div><div className="font-medium">即开即用</div><div className="text-sm text-muted-foreground">路径直达具体工具</div></div></CardContent></Card>
        <Card><CardContent className="flex items-center gap-3 p-4"><Command className="size-5 text-primary" /><div><div className="font-medium">全局搜索</div><div className="text-sm text-muted-foreground">快捷键快速跳转</div></div></CardContent></Card>
      </section>

      <section className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">全部工具</h2>
            <p className="text-sm text-muted-foreground">按分类组织，也可以使用顶部搜索直接打开。</p>
          </div>
          <Badge>{tools.length} tools</Badge>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {tools.map((tool) => <ToolCard key={tool.id} tool={tool} />)}
        </div>
      </section>
    </div>
  )
}
