import * as React from "react"

import { cn } from "@/lib/utils"

export function Badge({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="badge"
      className={cn(
        "inline-flex items-center rounded-md border border-transparent bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}
