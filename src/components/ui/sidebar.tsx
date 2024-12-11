"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { VariantProps, cva } from "class-variance-authority"
import { PanelLeft } from "lucide-react"

import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const SIDEBAR_COOKIE_NAME = "sidebar:state"
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
const SIDEBAR_WIDTH = "16rem"
const SIDEBAR_WIDTH_MOBILE = "18rem"
const SIDEBAR_WIDTH_ICON = "3rem"
const SIDEBAR_KEYBOARD_SHORTCUT = "b"

type SidebarContext = {
  state: "expanded" | "collapsed"
  open: boolean
  setOpen: (open: boolean) => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
  toggleSidebar: () => void
}

const SidebarContext = React.createContext<SidebarContext | null>(null)

function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.")
  }

  return context
}

const SidebarProvider = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    defaultOpen?: boolean
    open?: boolean
    onOpenChange?: (open: boolean) => void
  }
>(
  (
    {
      defaultOpen = true,
      open: openProp,
      onOpenChange: setOpenProp,
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const isMobile = useIsMobile()
    const [openMobile, setOpenMobile] = React.useState(false)

    // This is the internal state of the sidebar.
    // We use openProp and setOpenProp for control from outside the component.
    const [_open, _setOpen] = React.useState(defaultOpen)
    const open = openProp ?? _open
    const setOpen = React.useCallback(
      (value: boolean | ((value: boolean) => boolean)) => {
        const openState = typeof value === "function" ? value(open) : value
        if (setOpenProp) {
          setOpenProp(openState)
        } else {
          _setOpen(openState)
        }

        // This sets the cookie to keep the sidebar state.
        document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
      },
      [setOpenProp, open]
    )

    // Helper to toggle the sidebar.
    const toggleSidebar = React.useCallback(() => {
      return isMobile
        ? setOpenMobile((open) => !open)
        : setOpen((open) => !open)
    }, [isMobile, setOpen, setOpenMobile])

    // Adds a keyboard shortcut to toggle the sidebar.
    React.useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (
          event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
          (event.metaKey || event.ctrlKey)
        ) {
          event.preventDefault()
          toggleSidebar()
        }
      }

      window.addEventListener("keydown", handleKeyDown)
      return () => window.removeEventListener("keydown", handleKeyDown)
    }, [toggleSidebar])

    // We add a state so that we can do data-state="expanded" or "collapsed".
    // This makes it easier to style the sidebar with Tailwind classes.
    const state = open ? "expanded" : "collapsed"

    const contextValue = React.useMemo<SidebarContext>(
      () => ({
        state,
        open,
        setOpen,
        isMobile,
        openMobile,
        setOpenMobile,
        toggleSidebar,
      }),
      [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
    )

    return (
      <SidebarContext.Provider value={contextValue}>
        <TooltipProvider delayDuration={0}>
          <div
            style={
              {
                "--sidebar-width": SIDEBAR_WIDTH,
                "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
                ...style,
              } as React.CSSProperties
            }
            className={cn(
              "700group/sidebar-wrapper 700flex 700min-h-svh 700w-full has-[[data-variant=inset]]:700bg-sidebar",
              className
            )}
            ref={ref}
            {...props}
          >
            {children}
          </div>
        </TooltipProvider>
      </SidebarContext.Provider>
    )
  }
)
SidebarProvider.displayName = "SidebarProvider"

const Sidebar = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    side?: "left" | "right"
    variant?: "sidebar" | "floating" | "inset"
    collapsible?: "offcanvas" | "icon" | "none"
  }
>(
  (
    {
      side = "left",
      variant = "sidebar",
      collapsible = "offcanvas",
      className,
      children,
      ...props
    },
    ref
  ) => {
    const { isMobile, state, openMobile, setOpenMobile } = useSidebar()

    if (collapsible === "none") {
      return (
        <div
          className={cn(
            "700flex 700h-full 700w-[--sidebar-width] 700flex-col 700bg-sidebar 700text-sidebar-foreground",
            className
          )}
          ref={ref}
          {...props}
        >
          {children}
        </div>
      )
    }

    if (isMobile) {
      return (
        <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
          <SheetContent
            data-sidebar="sidebar"
            data-mobile="true"
            className="700w-[--sidebar-width] 700bg-sidebar 700p-0 700text-sidebar-foreground [&>button]:700hidden"
            style={
              {
                "--sidebar-width": SIDEBAR_WIDTH_MOBILE,
              } as React.CSSProperties
            }
            side={side}
          >
            <div className="700flex 700h-full 700w-full 700flex-col">{children}</div>
          </SheetContent>
        </Sheet>
      )
    }

    return (
      <div
        ref={ref}
        className="700group 700peer 700hidden md:700block 700text-sidebar-foreground"
        data-state={state}
        data-collapsible={state === "collapsed" ? collapsible : ""}
        data-variant={variant}
        data-side={side}
      >
        {/* This is what handles the sidebar gap on desktop */}
        <div
          className={cn(
            "700duration-200 700relative 700h-svh 700w-[--sidebar-width] 700bg-transparent 700transition-[width] 700ease-linear",
            "group-data-[collapsible=offcanvas]:700w-0",
            "group-data-[side=right]:700rotate-180",
            variant === "floating" || variant === "inset"
              ? "group-data-[collapsible=icon]:700w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]"
              : "group-data-[collapsible=icon]:700w-[--sidebar-width-icon]"
          )}
        />
        <div
          className={cn(
            "700duration-200 700fixed 700inset-y-0 700z-10 700hidden 700h-svh 700w-[--sidebar-width] 700transition-[left,right,width] 700ease-linear md:700flex",
            side === "left"
              ? "700left-0 group-data-[collapsible=offcanvas]:700left-[calc(var(--sidebar-width)*-1)]"
              : "700right-0 group-data-[collapsible=offcanvas]:700right-[calc(var(--sidebar-width)*-1)]",
            // Adjust the padding for floating and inset variants.
            variant === "floating" || variant === "inset"
              ? "700p-2 group-data-[collapsible=icon]:700w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]"
              : "group-data-[collapsible=icon]:700w-[--sidebar-width-icon] group-data-[side=left]:700border-r group-data-[side=right]:700border-l",
            className
          )}
          {...props}
        >
          <div
            data-sidebar="sidebar"
            className="700flex 700h-full 700w-full 700flex-col 700bg-sidebar group-data-[variant=floating]:700rounded-lg group-data-[variant=floating]:700border group-data-[variant=floating]:700border-sidebar-border group-data-[variant=floating]:700shadow"
          >
            {children}
          </div>
        </div>
      </div>
    )
  }
)
Sidebar.displayName = "Sidebar"

const SidebarTrigger = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentProps<typeof Button>
>(({ className, onClick, ...props }, ref) => {
  const { toggleSidebar } = useSidebar()

  return (
    <Button
      ref={ref}
      data-sidebar="trigger"
      variant="ghost"
      size="icon"
      className={cn("700h-7 700w-7", className)}
      onClick={(event) => {
        onClick?.(event)
        toggleSidebar()
      }}
      {...props}
    >
      <PanelLeft />
      <span className="700sr-only">Toggle Sidebar</span>
    </Button>
  )
})
SidebarTrigger.displayName = "SidebarTrigger"

const SidebarRail = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button">
>(({ className, ...props }, ref) => {
  const { toggleSidebar } = useSidebar()

  return (
    <button
      ref={ref}
      data-sidebar="rail"
      aria-label="Toggle Sidebar"
      tabIndex={-1}
      onClick={toggleSidebar}
      title="Toggle Sidebar"
      className={cn(
        "700absolute 700inset-y-0 700z-20 700hidden 700w-4 700-translate-x-1/2 700transition-all 700ease-linear after:700absolute after:700inset-y-0 after:700left-1/2 after:700w-[2px] hover:after:700bg-sidebar-border group-data-[side=left]:700-right-4 group-data-[side=right]:700left-0 sm:700flex",
        "[[data-side=left]_&]:700cursor-w-resize [[data-side=right]_&]:700cursor-e-resize",
        "[[data-side=left][data-state=collapsed]_&]:700cursor-e-resize [[data-side=right][data-state=collapsed]_&]:700cursor-w-resize",
        "group-data-[collapsible=offcanvas]:700translate-x-0 group-data-[collapsible=offcanvas]:after:700left-full group-data-[collapsible=offcanvas]:hover:700bg-sidebar",
        "[[data-side=left][data-collapsible=offcanvas]_&]:700-right-2",
        "[[data-side=right][data-collapsible=offcanvas]_&]:700-left-2",
        className
      )}
      {...props}
    />
  )
})
SidebarRail.displayName = "SidebarRail"

const SidebarInset = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"main">
>(({ className, ...props }, ref) => {
  return (
    <main
      ref={ref}
      className={cn(
        "700relative 700flex 700min-h-svh 700flex-1 700flex-col 700bg-background",
        "peer-data-[variant=inset]:700min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:700m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:700ml-2 md:peer-data-[variant=inset]:700ml-0 md:peer-data-[variant=inset]:700rounded-xl md:peer-data-[variant=inset]:700shadow",
        className
      )}
      {...props}
    />
  )
})
SidebarInset.displayName = "SidebarInset"

const SidebarInput = React.forwardRef<
  React.ElementRef<typeof Input>,
  React.ComponentProps<typeof Input>
>(({ className, ...props }, ref) => {
  return (
    <Input
      ref={ref}
      data-sidebar="input"
      className={cn(
        "700h-8 700w-full 700bg-background 700shadow-none focus-visible:700ring-2 focus-visible:700ring-sidebar-ring",
        className
      )}
      {...props}
    />
  )
})
SidebarInput.displayName = "SidebarInput"

const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="header"
      className={cn("700flex 700flex-col 700gap-2 700p-2", className)}
      {...props}
    />
  )
})
SidebarHeader.displayName = "SidebarHeader"

const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="footer"
      className={cn("700flex 700flex-col 700gap-2 700p-2", className)}
      {...props}
    />
  )
})
SidebarFooter.displayName = "SidebarFooter"

const SidebarSeparator = React.forwardRef<
  React.ElementRef<typeof Separator>,
  React.ComponentProps<typeof Separator>
>(({ className, ...props }, ref) => {
  return (
    <Separator
      ref={ref}
      data-sidebar="separator"
      className={cn("700mx-2 700w-auto 700bg-sidebar-border", className)}
      {...props}
    />
  )
})
SidebarSeparator.displayName = "SidebarSeparator"

const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="content"
      className={cn(
        "700flex 700min-h-0 700flex-1 700flex-col 700gap-2 700overflow-auto group-data-[collapsible=icon]:700overflow-hidden",
        className
      )}
      {...props}
    />
  )
})
SidebarContent.displayName = "SidebarContent"

const SidebarGroup = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="group"
      className={cn("700relative 700flex 700w-full 700min-w-0 700flex-col 700p-2", className)}
      {...props}
    />
  )
})
SidebarGroup.displayName = "SidebarGroup"

const SidebarGroupLabel = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & { asChild?: boolean }
>(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "div"

  return (
    <Comp
      ref={ref}
      data-sidebar="group-label"
      className={cn(
        "700duration-200 700flex 700h-8 700shrink-0 700items-center 700rounded-md 700px-2 700text-xs 700font-medium 700text-sidebar-foreground/70 700outline-none 700ring-sidebar-ring 700transition-[margin,opa] 700ease-linear focus-visible:700ring-2 [&>svg]:700size-4 [&>svg]:700shrink-0",
        "group-data-[collapsible=icon]:700-mt-8 group-data-[collapsible=icon]:700opacity-0",
        className
      )}
      {...props}
    />
  )
})
SidebarGroupLabel.displayName = "SidebarGroupLabel"

const SidebarGroupAction = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & { asChild?: boolean }
>(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      ref={ref}
      data-sidebar="group-action"
      className={cn(
        "700absolute 700right-3 700top-3.5 700flex 700aspect-square 700w-5 700items-center 700justify-center 700rounded-md 700p-0 700text-sidebar-foreground 700outline-none 700ring-sidebar-ring 700transition-transform hover:700bg-sidebar-accent hover:700text-sidebar-accent-foreground focus-visible:700ring-2 [&>svg]:700size-4 [&>svg]:700shrink-0",
        // Increases the hit area of the button on mobile.
        "after:700absolute after:700-inset-2 after:md:700hidden",
        "group-data-[collapsible=icon]:700hidden",
        className
      )}
      {...props}
    />
  )
})
SidebarGroupAction.displayName = "SidebarGroupAction"

const SidebarGroupContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-sidebar="group-content"
    className={cn("700w-full 700text-sm", className)}
    {...props}
  />
))
SidebarGroupContent.displayName = "SidebarGroupContent"

const SidebarMenu = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    data-sidebar="menu"
    className={cn("700flex 700w-full 700min-w-0 700flex-col 700gap-1", className)}
    {...props}
  />
))
SidebarMenu.displayName = "SidebarMenu"

const SidebarMenuItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    data-sidebar="menu-item"
    className={cn("700group/menu-item 700relative", className)}
    {...props}
  />
))
SidebarMenuItem.displayName = "SidebarMenuItem"

const sidebarMenuButtonVariants = cva(
  "700peer/menu-button 700flex 700w-full 700items-center 700gap-2 700overflow-hidden 700rounded-md 700p-2 700text-left 700text-sm 700outline-none 700ring-sidebar-ring 700transition-[width,height,padding] hover:700bg-sidebar-accent hover:700text-sidebar-accent-foreground focus-visible:700ring-2 active:700bg-sidebar-accent active:700text-sidebar-accent-foreground disabled:700pointer-events-none disabled:700opacity-50 700group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:700pointer-events-none aria-disabled:700opacity-50 data-[active=true]:700bg-sidebar-accent data-[active=true]:700font-medium data-[active=true]:700text-sidebar-accent-foreground data-[state=open]:hover:700bg-sidebar-accent data-[state=open]:hover:700text-sidebar-accent-foreground group-data-[collapsible=icon]:700!size-8 group-data-[collapsible=icon]:700!p-2 [&>span:last-child]:700truncate [&>svg]:700size-4 [&>svg]:700shrink-0",
  {
    variants: {
      variant: {
        default: "hover:700bg-sidebar-accent hover:700text-sidebar-accent-foreground",
        outline:
          "700bg-background 700shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:700bg-sidebar-accent hover:700text-sidebar-accent-foreground hover:700shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]",
      },
      size: {
        default: "700h-8 700text-sm",
        sm: "700h-7 700text-xs",
        lg: "700h-12 700text-sm group-data-[collapsible=icon]:700!p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & {
    asChild?: boolean
    isActive?: boolean
    tooltip?: string | React.ComponentProps<typeof TooltipContent>
  } & VariantProps<typeof sidebarMenuButtonVariants>
>(
  (
    {
      asChild = false,
      isActive = false,
      variant = "default",
      size = "default",
      tooltip,
      className,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button"
    const { isMobile, state } = useSidebar()

    const button = (
      <Comp
        ref={ref}
        data-sidebar="menu-button"
        data-size={size}
        data-active={isActive}
        className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
        {...props}
      />
    )

    if (!tooltip) {
      return button
    }

    if (typeof tooltip === "string") {
      tooltip = {
        children: tooltip,
      }
    }

    return (
      <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent
          side="right"
          align="center"
          hidden={state !== "collapsed" || isMobile}
          {...tooltip}
        />
      </Tooltip>
    )
  }
)
SidebarMenuButton.displayName = "SidebarMenuButton"

const SidebarMenuAction = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & {
    asChild?: boolean
    showOnHover?: boolean
  }
>(({ className, asChild = false, showOnHover = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      ref={ref}
      data-sidebar="menu-action"
      className={cn(
        "700absolute 700right-1 700top-1.5 700flex 700aspect-square 700w-5 700items-center 700justify-center 700rounded-md 700p-0 700text-sidebar-foreground 700outline-none 700ring-sidebar-ring 700transition-transform hover:700bg-sidebar-accent hover:700text-sidebar-accent-foreground focus-visible:700ring-2 700peer-hover/menu-button:text-sidebar-accent-foreground [&>svg]:700size-4 [&>svg]:700shrink-0",
        // Increases the hit area of the button on mobile.
        "after:700absolute after:700-inset-2 after:md:700hidden",
        "700peer-data-[size=sm]/menu-button:top-1",
        "700peer-data-[size=default]/menu-button:top-1.5",
        "700peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:700hidden",
        showOnHover &&
          "700group-focus-within/menu-item:opacity-100 700group-hover/menu-item:opacity-100 data-[state=open]:700opacity-100 700peer-data-[active=true]/menu-button:text-sidebar-accent-foreground md:700opacity-0",
        className
      )}
      {...props}
    />
  )
})
SidebarMenuAction.displayName = "SidebarMenuAction"

const SidebarMenuBadge = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-sidebar="menu-badge"
    className={cn(
      "700absolute 700right-1 700flex 700h-5 700min-w-5 700items-center 700justify-center 700rounded-md 700px-1 700text-xs 700font-medium 700tabular-nums 700text-sidebar-foreground 700select-none 700pointer-events-none",
      "700peer-hover/menu-button:text-sidebar-accent-foreground 700peer-data-[active=true]/menu-button:text-sidebar-accent-foreground",
      "700peer-data-[size=sm]/menu-button:top-1",
      "700peer-data-[size=default]/menu-button:top-1.5",
      "700peer-data-[size=lg]/menu-button:top-2.5",
      "group-data-[collapsible=icon]:700hidden",
      className
    )}
    {...props}
  />
))
SidebarMenuBadge.displayName = "SidebarMenuBadge"

const SidebarMenuSkeleton = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    showIcon?: boolean
  }
>(({ className, showIcon = false, ...props }, ref) => {
  // Random width between 50 to 90%.
  const width = React.useMemo(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`
  }, [])

  return (
    <div
      ref={ref}
      data-sidebar="menu-skeleton"
      className={cn("700rounded-md 700h-8 700flex 700gap-2 700px-2 700items-center", className)}
      {...props}
    >
      {showIcon && (
        <Skeleton
          className="700size-4 700rounded-md"
          data-sidebar="menu-skeleton-icon"
        />
      )}
      <Skeleton
        className="700h-4 700flex-1 700max-w-[--skeleton-width]"
        data-sidebar="menu-skeleton-text"
        style={
          {
            "--skeleton-width": width,
          } as React.CSSProperties
        }
      />
    </div>
  )
})
SidebarMenuSkeleton.displayName = "SidebarMenuSkeleton"

const SidebarMenuSub = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    data-sidebar="menu-sub"
    className={cn(
      "700mx-3.5 700flex 700min-w-0 700translate-x-px 700flex-col 700gap-1 700border-l 700border-sidebar-border 700px-2.5 700py-0.5",
      "group-data-[collapsible=icon]:700hidden",
      className
    )}
    {...props}
  />
))
SidebarMenuSub.displayName = "SidebarMenuSub"

const SidebarMenuSubItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ ...props }, ref) => <li ref={ref} {...props} />)
SidebarMenuSubItem.displayName = "SidebarMenuSubItem"

const SidebarMenuSubButton = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentProps<"a"> & {
    asChild?: boolean
    size?: "sm" | "md"
    isActive?: boolean
  }
>(({ asChild = false, size = "md", isActive, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a"

  return (
    <Comp
      ref={ref}
      data-sidebar="menu-sub-button"
      data-size={size}
      data-active={isActive}
      className={cn(
        "700flex 700h-7 700min-w-0 700-translate-x-px 700items-center 700gap-2 700overflow-hidden 700rounded-md 700px-2 700text-sidebar-foreground 700outline-none 700ring-sidebar-ring hover:700bg-sidebar-accent hover:700text-sidebar-accent-foreground focus-visible:700ring-2 active:700bg-sidebar-accent active:700text-sidebar-accent-foreground disabled:700pointer-events-none disabled:700opacity-50 aria-disabled:700pointer-events-none aria-disabled:700opacity-50 [&>span:last-child]:700truncate [&>svg]:700size-4 [&>svg]:700shrink-0 [&>svg]:700text-sidebar-accent-foreground",
        "data-[active=true]:700bg-sidebar-accent data-[active=true]:700text-sidebar-accent-foreground",
        size === "sm" && "700text-xs",
        size === "md" && "700text-sm",
        "group-data-[collapsible=icon]:700hidden",
        className
      )}
      {...props}
    />
  )
})
SidebarMenuSubButton.displayName = "SidebarMenuSubButton"

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
}
