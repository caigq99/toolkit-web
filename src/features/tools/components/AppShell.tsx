import { NavLink, Outlet } from "react-router-dom"
import { Home, Moon, ShieldCheck } from "lucide-react"

import { ToolKitLogo } from "@/components/brand/ToolKitLogo"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { SearchCommand } from "./SearchCommand"
import { toolCategories, tools } from "@/features/tools/registry"

export function AppShell() {
  const { theme, setTheme } = useTheme()

  function toggleTheme() {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <div className="min-h-svh bg-background text-foreground">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 border-r bg-card/80 backdrop-blur lg:flex lg:flex-col">
        <div className="border-b p-5">
          <NavLink to="/" className="flex items-center gap-3">
            <ToolKitLogo />
            <div>
              <div className="font-semibold tracking-tight">ToolKit</div>
              <div className="text-xs text-muted-foreground">本地优先的小工具箱</div>
            </div>
          </NavLink>
        </div>
        <nav className="flex-1 space-y-6 overflow-y-auto p-4">
          <NavLink to="/" className={({ isActive }) => cn("flex items-center gap-2 rounded-lg px-3 py-2 text-sm", isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground")}>
            <Home className="size-4" /> 首页
          </NavLink>
          {toolCategories.map((category) => (
            <div key={category.id} className="space-y-1">
              <div className="px-3 text-xs font-medium text-muted-foreground">{category.name}</div>
              {tools.filter((tool) => tool.category === category.id).map((tool) => {
                const Icon = tool.icon
                return (
                  <NavLink key={tool.id} to={tool.path} className={({ isActive }) => cn("flex items-center gap-2 rounded-lg px-3 py-2 text-sm", isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground")}>
                    <Icon className="size-4" /> {tool.shortName}
                  </NavLink>
                )
              })}
            </div>
          ))}
        </nav>
        <div className="border-t p-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-2"><ShieldCheck className="size-4 text-primary" /> 所有工具在浏览器本地运行</div>
        </div>
      </aside>
      <div className="lg:pl-72">
        <header className="sticky top-0 z-20 border-b bg-background/85 backdrop-blur">
          <div className="flex h-16 items-center gap-3 px-4 sm:px-6">
            <NavLink to="/" className="flex items-center gap-2 font-semibold lg:hidden"><ToolKitLogo className="size-8" />ToolKit</NavLink>
            <div className="flex-1"><SearchCommand /></div>
            <Button type="button" variant="ghost" size="icon" title="切换深色模式" onClick={toggleTheme}><Moon /></Button>
          </div>
        </header>
        <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
