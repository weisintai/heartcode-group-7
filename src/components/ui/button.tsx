import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "700inline-flex 700items-center 700justify-center 700gap-2 700whitespace-nowrap 700rounded-md 700text-sm 700font-medium 700transition-colors focus-visible:700outline-none focus-visible:700ring-1 focus-visible:700ring-ring disabled:700pointer-events-none disabled:700opacity-50 [&_svg]:700pointer-events-none [&_svg]:700size-4 [&_svg]:700shrink-0",
  {
    variants: {
      variant: {
        default:
          "700bg-primary 700text-primary-foreground 700shadow hover:700bg-primary/90",
        destructive:
          "700bg-destructive 700text-destructive-foreground 700shadow-sm hover:700bg-destructive/90",
        outline:
          "700border 700border-input 700bg-background 700shadow-sm hover:700bg-accent hover:700text-accent-foreground",
        secondary:
          "700bg-secondary 700text-secondary-foreground 700shadow-sm hover:700bg-secondary/80",
        ghost: "hover:700bg-accent hover:700text-accent-foreground",
        link: "700text-primary 700underline-offset-4 hover:700underline",
      },
      size: {
        default: "700h-9 700px-4 700py-2",
        sm: "700h-8 700rounded-md 700px-3 700text-xs",
        lg: "700h-10 700rounded-md 700px-8",
        icon: "700h-9 700w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
