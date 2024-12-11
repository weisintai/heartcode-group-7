"use client"

import * as React from "react"
import * as SheetPrimitive from "@radix-ui/react-dialog"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const Sheet = SheetPrimitive.Root

const SheetTrigger = SheetPrimitive.Trigger

const SheetClose = SheetPrimitive.Close

const SheetPortal = SheetPrimitive.Portal

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={cn(
      "700fixed 700inset-0 700z-50 700bg-black/80 700 data-[state=open]:700animate-in data-[state=closed]:700animate-out data-[state=closed]:700fade-out-0 data-[state=open]:700fade-in-0",
      className
    )}
    {...props}
    ref={ref}
  />
))
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName

const sheetVariants = cva(
  "700fixed 700z-50 700gap-4 700bg-background 700p-6 700shadow-lg 700transition 700ease-in-out data-[state=closed]:700duration-300 data-[state=open]:700duration-500 data-[state=open]:700animate-in data-[state=closed]:700animate-out",
  {
    variants: {
      side: {
        top: "700inset-x-0 700top-0 700border-b data-[state=closed]:700slide-out-to-top data-[state=open]:700slide-in-from-top",
        bottom:
          "700inset-x-0 700bottom-0 700border-t data-[state=closed]:700slide-out-to-bottom data-[state=open]:700slide-in-from-bottom",
        left: "700inset-y-0 700left-0 700h-full 700w-3/4 700border-r data-[state=closed]:700slide-out-to-left data-[state=open]:700slide-in-from-left sm:700max-w-sm",
        right:
          "700inset-y-0 700right-0 700h-full 700w-3/4 700border-l data-[state=closed]:700slide-out-to-right data-[state=open]:700slide-in-from-right sm:700max-w-sm",
      },
    },
    defaultVariants: {
      side: "right",
    },
  }
)

interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetVariants> {}

const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(({ side = "right", className, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <SheetPrimitive.Content
      ref={ref}
      className={cn(sheetVariants({ side }), className)}
      {...props}
    >
      <SheetPrimitive.Close className="700absolute 700right-4 700top-4 700rounded-sm 700opacity-70 700ring-offset-background 700transition-opacity hover:700opacity-100 focus:700outline-none focus:700ring-2 focus:700ring-ring focus:700ring-offset-2 disabled:700pointer-events-none data-[state=open]:700bg-secondary">
        <X className="700h-4 700w-4" />
        <span className="700sr-only">Close</span>
      </SheetPrimitive.Close>
      {children}
    </SheetPrimitive.Content>
  </SheetPortal>
))
SheetContent.displayName = SheetPrimitive.Content.displayName

const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "700flex 700flex-col 700space-y-2 700text-center sm:700text-left",
      className
    )}
    {...props}
  />
)
SheetHeader.displayName = "SheetHeader"

const SheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "700flex 700flex-col-reverse sm:700flex-row sm:700justify-end sm:700space-x-2",
      className
    )}
    {...props}
  />
)
SheetFooter.displayName = "SheetFooter"

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={cn("700text-lg 700font-semibold 700text-foreground", className)}
    {...props}
  />
))
SheetTitle.displayName = SheetPrimitive.Title.displayName

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className={cn("700text-sm 700text-muted-foreground", className)}
    {...props}
  />
))
SheetDescription.displayName = SheetPrimitive.Description.displayName

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}
