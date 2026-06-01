import { cn } from "@/lib/utils"

export function ToolKitLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      role="img"
      aria-label="ToolKit"
      className={cn("size-9 shrink-0 drop-shadow-sm", className)}
    >
      <rect width="64" height="64" rx="14" className="fill-primary" />
      <path
        d="M32 13.5L47.5 22.25V39.75L32 48.5L16.5 39.75V22.25L32 13.5Z"
        className="stroke-primary-foreground"
        strokeWidth="3.5"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M17 22.5L32 31L47 22.5"
        className="stroke-primary-foreground"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M32 31V48"
        className="stroke-primary-foreground"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M24.5 26.5L39.5 18"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        className="text-primary-foreground/70"
      />
    </svg>
  )
}
