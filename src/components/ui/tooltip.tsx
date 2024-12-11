"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "@/lib/utils"

const TooltipProvider = TooltipPrimitive.Provider

const Tooltip = TooltipPrimitive.Root

const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "700z-50 700overflow-hidden 700rounded-md 700bg-primary 700px-3 700py-1.5 700text-xs 700text-primary-foreground 700animate-in 700fade-in-0 700zoom-in-95 data-[state=closed]:700animate-out data-[state=closed]:700fade-out-0 data-[state=closed]:700zoom-out-95 data-[side=bottom]:700slide-in-from-top-2 data-[side=left]:700slide-in-from-right-2 data-[side=right]:700slide-in-from-left-2 data-[side=top]:700slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  </TooltipPrimitive.Portal>
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
