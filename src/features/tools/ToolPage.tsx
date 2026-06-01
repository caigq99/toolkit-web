import { Navigate, useParams } from "react-router-dom"

import { getTool } from "@/features/tools/registry"
import { ToolRenderer } from "@/features/tools/tools"

export function ToolPage() {
  const { toolId } = useParams()
  const tool = getTool(toolId)

  if (!tool) return <Navigate to="/" replace />

  localStorage.setItem("toolkit:last-tool", tool.path)
  return <ToolRenderer tool={tool} />
}
