import { Link } from "react-router-dom"

import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { getCategoryName, type ToolDefinition } from "@/features/tools/registry"

export function ToolCard({ tool }: { tool: ToolDefinition }) {
  const Icon = tool.icon
  return (
    <Link to={tool.path} className="group block">
      <Card className="h-full p-4 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md">
        <div className="flex items-start justify-between gap-3">
          <div className="rounded-lg border bg-background p-2 text-primary shadow-xs transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
            <Icon className="size-4" />
          </div>
          <Badge>{getCategoryName(tool.category)}</Badge>
        </div>
        <div className="mt-4 space-y-1">
          <h3 className="font-semibold tracking-tight">{tool.name}</h3>
          <p className="line-clamp-2 text-sm text-muted-foreground">{tool.description}</p>
        </div>
      </Card>
    </Link>
  )
}
