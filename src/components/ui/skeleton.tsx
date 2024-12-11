import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("700animate-pulse 700rounded-md 700bg-primary/10", className)}
      {...props}
    />
  )
}

export { Skeleton }
