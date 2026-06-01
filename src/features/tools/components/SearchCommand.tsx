import * as React from "react"
import { Search, X } from "lucide-react"
import { useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { tools } from "@/features/tools/registry"

function isEditableTarget(target: EventTarget | null) {
  return target instanceof HTMLElement && Boolean(target.closest("input, textarea, select, [contenteditable='true']"))
}

export function SearchCommand() {
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const navigate = useNavigate()
  const inputRef = React.useRef<HTMLInputElement>(null)

  const results = React.useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) return tools
    return tools.filter((tool) => [tool.name, tool.shortName, tool.description, ...tool.keywords].join(" ").toLowerCase().includes(normalized))
  }, [query])

  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault()
        setOpen(true)
      }
      if (event.key === "/" && !isEditableTarget(event.target)) {
        event.preventDefault()
        setOpen(true)
      }
      if (event.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  React.useEffect(() => {
    if (!open) return
    window.setTimeout(() => inputRef.current?.focus(), 0)
  }, [open])

  function go(path: string) {
    navigate(path)
    localStorage.setItem("toolkit:last-tool", path)
    setOpen(false)
    setQuery("")
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex h-9 w-full max-w-xl items-center gap-2 rounded-lg border bg-background px-3 text-left text-sm text-muted-foreground shadow-xs transition-colors hover:bg-muted/50"
      >
        <Search className="size-4" />
        <span className="flex-1">搜索工具、关键词或分类...</span>
        <kbd className="rounded border bg-muted px-1.5 py-0.5 font-mono text-[10px]">⌘K</kbd>
      </button>
      <div className={cn("fixed inset-0 z-50 bg-background/70 backdrop-blur-sm", open ? "block" : "hidden")} onMouseDown={() => setOpen(false)}>
        <div className="mx-auto mt-[10vh] w-[min(640px,calc(100vw-32px))] overflow-hidden rounded-xl border bg-card shadow-xl" onMouseDown={(event) => event.stopPropagation()}>
          <div className="flex items-center gap-2 border-b p-3">
            <Search className="size-4 text-muted-foreground" />
            <Input ref={inputRef} className="h-8 border-0 shadow-none focus-visible:ring-0" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="输入 JSON、2FA、Hash、时间戳..." />
            <Button type="button" size="icon-sm" variant="ghost" onClick={() => setOpen(false)}><X /></Button>
          </div>
          <div className="max-h-[420px] overflow-y-auto p-2">
            {results.map((tool) => {
              const Icon = tool.icon
              return (
                <button key={tool.id} type="button" className="flex w-full items-center gap-3 rounded-lg p-3 text-left hover:bg-muted" onClick={() => go(tool.path)}>
                  <div className="rounded-md border bg-background p-2 text-primary"><Icon className="size-4" /></div>
                  <div className="min-w-0 flex-1">
                    <div className="font-medium">{tool.name}</div>
                    <div className="truncate text-sm text-muted-foreground">{tool.description}</div>
                  </div>
                  <div className="text-xs text-muted-foreground">打开</div>
                </button>
              )
            })}
            {!results.length ? <div className="p-8 text-center text-sm text-muted-foreground">没有找到匹配工具</div> : null}
          </div>
        </div>
      </div>
    </>
  )
}
