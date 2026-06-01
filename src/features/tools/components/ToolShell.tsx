import type { ReactNode } from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getCategoryName, type ToolDefinition } from "@/features/tools/registry"
import { PrivacyBadge } from "./PrivacyBadge"

export function ToolShell({
  tool,
  children,
  actions,
}: {
  tool: ToolDefinition
  children: ReactNode
  actions?: ReactNode
}) {
  const Icon = tool.icon
  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="rounded-lg border bg-card p-2 text-primary shadow-sm">
            <Icon className="size-5" />
          </div>
          <div>
            <div className="text-xs font-medium text-muted-foreground">{getCategoryName(tool.category)}</div>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight">{tool.name}</h1>
            <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{tool.description}</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <PrivacyBadge />
          {actions}
        </div>
      </div>
      <Card className="overflow-hidden">
        <CardHeader className="border-b bg-muted/20">
          <CardTitle>工作区</CardTitle>
          <CardDescription>所有输入只在当前浏览器标签页内处理。</CardDescription>
        </CardHeader>
        <CardContent className="p-5">{children}</CardContent>
      </Card>
    </div>
  )
}
