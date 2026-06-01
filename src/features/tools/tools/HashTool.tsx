import * as React from "react"

import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { CopyButton } from "@/features/tools/components/CopyButton"
import { ToolShell } from "@/features/tools/components/ToolShell"
import { bytesToHex, utf8ToBytes } from "@/features/tools/lib/encoding"
import type { ToolDefinition } from "@/features/tools/registry"

const algorithms = ["SHA-1", "SHA-256", "SHA-384", "SHA-512"] as const

export function HashTool({ tool }: { tool: ToolDefinition }) {
  const [input, setInput] = React.useState("ToolKit")
  const [algorithm, setAlgorithm] = React.useState<(typeof algorithms)[number]>("SHA-256")
  const [output, setOutput] = React.useState("")

  React.useEffect(() => {
    let cancelled = false
    async function run() {
      const digest = await crypto.subtle.digest(algorithm, utf8ToBytes(input))
      if (!cancelled) setOutput(bytesToHex(digest))
    }
    void run()
    return () => {
      cancelled = true
    }
  }, [algorithm, input])

  return (
    <ToolShell tool={tool} actions={<CopyButton text={output} />}>
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-3">
          <Label>算法</Label>
          <Select value={algorithm} onChange={(event) => setAlgorithm(event.target.value as typeof algorithm)}>
            {algorithms.map((item) => <option key={item}>{item}</option>)}
          </Select>
          <Label>输入</Label>
          <Textarea className="min-h-72 font-mono" value={input} onChange={(event) => setInput(event.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>摘要</Label>
          <Textarea readOnly className="min-h-72 font-mono" value={output} />
        </div>
      </div>
    </ToolShell>
  )
}
