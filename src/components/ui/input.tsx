import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "700flex 700h-9 700w-full 700rounded-md 700border 700border-input 700bg-transparent 700px-3 700py-1 700text-base 700shadow-sm 700transition-colors file:700border-0 file:700bg-transparent file:700text-sm file:700font-medium file:700text-foreground placeholder:700text-muted-foreground focus-visible:700outline-none focus-visible:700ring-1 focus-visible:700ring-ring disabled:700cursor-not-allowed disabled:700opacity-50 md:700text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
