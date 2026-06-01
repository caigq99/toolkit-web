import * as React from "react"

import { cn } from "@/lib/utils"

type SwitchProps = Omit<React.ComponentProps<"button">, "onChange"> & {
  checked: boolean
  onCheckedChange: (checked: boolean) => void
}

export function Switch({ checked, onCheckedChange, className, ...props }: SwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      data-state={checked ? "checked" : "unchecked"}
      className={cn(
        "inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border border-transparent bg-input transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50 data-[state=checked]:bg-primary",
        className
      )}
      onClick={() => onCheckedChange(!checked)}
      {...props}
    >
      <span
        className={cn(
          "pointer-events-none block size-4 rounded-full bg-background shadow-sm transition-transform",
          checked ? "translate-x-4" : "translate-x-0"
        )}
      />
    </button>
  )
}
