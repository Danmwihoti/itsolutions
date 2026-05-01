import { cn } from "@/lib/utils"

function Badge({ className, variant = "default", ...props }: React.HTMLAttributes<HTMLDivElement> & { variant?: "default" | "destructive" }) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
        variant === "destructive" ? "border-transparent bg-destructive text-destructive-foreground" : "border-transparent bg-primary text-primary-foreground",
        className
      )}
      {...props}
    />
  )
}

export { Badge }
