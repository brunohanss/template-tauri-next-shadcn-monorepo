// src/lib/cn.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// src/components/Button.tsx
import * as React from "react";
import { cva } from "class-variance-authority";
import { jsx } from "react/jsx-runtime";
var buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
var Button = React.forwardRef(
  ({ className, variant, size, ...props }, ref) => /* @__PURE__ */ jsx(
    "button",
    {
      ref,
      className: cn(buttonVariants({ variant, size, className })),
      ...props
    }
  )
);
Button.displayName = "Button";

// src/components/ui/sidebar.tsx
import { useState, createContext, useContext } from "react";
import { AnimatePresence, motion } from "motion/react";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { Fragment, jsx as jsx2, jsxs } from "react/jsx-runtime";
var SidebarContext = createContext(
  void 0
);
var useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};
var SidebarProvider = ({
  children,
  open: openProp,
  setOpen: setOpenProp,
  animate = true
}) => {
  const [openState, setOpenState] = useState(false);
  const open = openProp !== void 0 ? openProp : openState;
  const setOpen = setOpenProp !== void 0 ? setOpenProp : setOpenState;
  return /* @__PURE__ */ jsx2(SidebarContext.Provider, { value: { open, setOpen, animate }, children });
};
var Sidebar = ({
  children,
  open,
  setOpen,
  animate
}) => {
  return /* @__PURE__ */ jsx2(SidebarProvider, { open, setOpen, animate, children });
};
var SidebarBody = (props) => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx2(DesktopSidebar, { ...props }),
    /* @__PURE__ */ jsx2(MobileSidebar, { ...props })
  ] });
};
var DesktopSidebar = ({
  className,
  children,
  ...props
}) => {
  const { open, setOpen, animate } = useSidebar();
  return /* @__PURE__ */ jsx2(Fragment, { children: /* @__PURE__ */ jsx2(
    motion.div,
    {
      className: cn(
        "h-full px-4 py-4 hidden  md:flex md:flex-col bg-neutral-100 dark:bg-neutral-800 w-[300px] shrink-0",
        className
      ),
      animate: {
        width: animate ? open ? "300px" : "60px" : "300px"
      },
      onMouseEnter: () => setOpen(true),
      onMouseLeave: () => setOpen(false),
      ...props,
      children
    }
  ) });
};
var MobileSidebar = ({
  className,
  children,
  ...props
}) => {
  const { open, setOpen } = useSidebar();
  return /* @__PURE__ */ jsx2(Fragment, { children: /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        "h-10 px-4 py-4 flex flex-row md:hidden  items-center justify-between bg-neutral-100 dark:bg-neutral-800 w-full"
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsx2("div", { className: "flex justify-end z-20 w-full", children: /* @__PURE__ */ jsx2(
          IconMenu2,
          {
            className: "text-neutral-800 dark:text-neutral-200",
            onClick: () => setOpen(!open)
          }
        ) }),
        /* @__PURE__ */ jsx2(AnimatePresence, { children: open && /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { x: "-100%", opacity: 0 },
            animate: { x: 0, opacity: 1 },
            exit: { x: "-100%", opacity: 0 },
            transition: {
              duration: 0.3,
              ease: "easeInOut"
            },
            className: cn(
              "fixed h-full w-full inset-0 bg-white dark:bg-neutral-900 p-10 z-[100] flex flex-col justify-between",
              className
            ),
            children: [
              /* @__PURE__ */ jsx2(
                "div",
                {
                  className: "absolute right-10 top-10 z-50 text-neutral-800 dark:text-neutral-200",
                  onClick: () => setOpen(!open),
                  children: /* @__PURE__ */ jsx2(IconX, {})
                }
              ),
              children
            ]
          }
        ) })
      ]
    }
  ) });
};
var SidebarLink = ({
  link,
  className,
  ...props
}) => {
  const { open, animate } = useSidebar();
  return /* @__PURE__ */ jsxs(
    "a",
    {
      href: link.href,
      className: cn(
        "flex items-center justify-start gap-2  group/sidebar py-2",
        className
      ),
      ...props,
      children: [
        link.icon,
        /* @__PURE__ */ jsx2(
          motion.span,
          {
            animate: {
              display: animate ? open ? "inline-block" : "none" : "inline-block",
              opacity: animate ? open ? 1 : 0 : 1
            },
            className: "text-neutral-700 dark:text-neutral-200 text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0",
            children: link.label
          }
        )
      ]
    }
  );
};
export {
  Button,
  DesktopSidebar,
  MobileSidebar,
  Sidebar,
  SidebarBody,
  SidebarLink,
  SidebarProvider,
  cn,
  useSidebar
};
//# sourceMappingURL=index.js.map