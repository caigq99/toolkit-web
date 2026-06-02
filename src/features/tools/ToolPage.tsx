import * as React from "react"
import { Navigate, useParams } from "react-router-dom"

import { getTool } from "@/features/tools/registry"
import { ToolRenderer } from "@/features/tools/tools"

export function ToolPage() {
  const { toolId } = useParams()
  const tool = getTool(toolId)

  React.useEffect(() => {
    if (tool) {
      localStorage.setItem("toolkit:last-tool", tool.path)
    }
  }, [tool])

  if (!tool) return <Navigate to="/" replace />

  return <ToolRenderer tool={tool} />
}
