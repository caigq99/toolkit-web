import { ShieldCheck } from "lucide-react"

import { Badge } from "@/components/ui/badge"

export function PrivacyBadge() {
  return (
    <Badge className="gap-1 border-primary/20 bg-primary/10 text-primary">
      <ShieldCheck className="size-3.5" />
      浏览器本地处理 · 不上传数据
    </Badge>
  )
}
