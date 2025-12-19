import { ClassValue } from 'clsx';
import * as class_variance_authority_types from 'class-variance-authority/types';
import * as React from 'react';
import React__default from 'react';
import { VariantProps } from 'class-variance-authority';
import * as react_jsx_runtime from 'react/jsx-runtime';
import { motion } from 'motion/react';

declare function cn(...inputs: ClassValue[]): string;

declare const buttonVariants: (props?: ({
    variant?: "default" | "outline" | null | undefined;
    size?: "default" | "sm" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
}
declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;

interface Links {
    label: string;
    href: string;
    icon: React__default.JSX.Element | React__default.ReactNode;
}
interface SidebarContextProps {
    open: boolean;
    setOpen: React__default.Dispatch<React__default.SetStateAction<boolean>>;
    animate: boolean;
}
declare const useSidebar: () => SidebarContextProps;
declare const SidebarProvider: ({ children, open: openProp, setOpen: setOpenProp, animate, }: {
    children: React__default.ReactNode;
    open?: boolean;
    setOpen?: React__default.Dispatch<React__default.SetStateAction<boolean>>;
    animate?: boolean;
}) => react_jsx_runtime.JSX.Element;
declare const Sidebar: ({ children, open, setOpen, animate, }: {
    children: React__default.ReactNode;
    open?: boolean;
    setOpen?: React__default.Dispatch<React__default.SetStateAction<boolean>>;
    animate?: boolean;
}) => react_jsx_runtime.JSX.Element;
declare const SidebarBody: (props: React__default.ComponentProps<typeof motion.div>) => react_jsx_runtime.JSX.Element;
declare const DesktopSidebar: ({ className, children, ...props }: React__default.ComponentProps<typeof motion.div>) => react_jsx_runtime.JSX.Element;
declare const MobileSidebar: ({ className, children, ...props }: React__default.ComponentProps<"div">) => react_jsx_runtime.JSX.Element;
declare const SidebarLink: ({ link, className, ...props }: {
    link: Links;
    className?: string;
}) => react_jsx_runtime.JSX.Element;

export { Button, type ButtonProps, DesktopSidebar, MobileSidebar, Sidebar, SidebarBody, SidebarLink, SidebarProvider, cn, useSidebar };
