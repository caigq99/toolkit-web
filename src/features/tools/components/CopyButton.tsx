import * as React from "react"
import { Check, Copy } from "lucide-react"

import { Button } from "@/components/ui/button"
import { copyText } from "@/features/tools/lib/clipboard"

export function CopyButton({ text, label = "复制" }: { text: string; label?: string }) {
  const [copied, setCopied] = React.useState(false)

  async function handleCopy() {
    const ok = await copyText(text)
    if (!ok) return
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1200)
  }

  return (
    <Button type="button" variant="outline" size="sm" onClick={handleCopy} disabled={!text}>
      {copied ? <Check /> : <Copy />}
      {copied ? "已复制" : label}
    </Button>
  )
}
