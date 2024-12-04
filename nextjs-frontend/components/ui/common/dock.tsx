/**
 * Note: Use position fixed according to your needs
 * Desktop navbar is better positioned at the bottom
 * Mobile navbar is better positioned at bottom right.
 **/

import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import {
    AnimatePresence,
    MotionValue,
    motion,
    useMotionValue,
    useSpring,
    useTransform,
} from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";
import { Separator } from "./seperator";

export interface DockItem {
    title: string;
    icon: React.ReactNode;
    href: string;
    component?: React.ReactNode;
    separator?: boolean;
}

export interface FloatingDockProps {
    items: DockItem[];
    desktopClassName?: string;
    mobileClassName?: string;
}

export interface DockContainerProps {
    items: DockItem[];
    className?: string;
}

export interface IconContainerProps {
    mouseX: MotionValue;
    title: string;
    icon: React.ReactNode;
    href: string;
}

export const FloatingDock = ({
    items,
    desktopClassName,
    mobileClassName,
}: FloatingDockProps) => {
    return (
        <>
            <FloatingDockDesktop items={items} className={desktopClassName} />
            <FloatingDockMobile items={items} className={mobileClassName} />
        </>
    );
};

const FloatingDockMobile = ({
    items,
    className,
}: DockContainerProps) => {
    const [open, setOpen] = useState(false);
    const filteredItems = items.filter(item => !item.separator && (item.icon || item.component));
    
    return (
        <div className={cn("relative block md:hidden", className)}>
            <AnimatePresence>
                {open && (
                    <motion.div
                        layoutId="nav"
                        className="absolute bottom-full mb-2 inset-x-0 flex flex-col gap-2"
                    >
                        {filteredItems.map((item, idx) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                exit={{
                                    opacity: 0,
                                    y: 10,
                                    transition: {
                                        delay: idx * 0.05,
                                    },
                                }}
                                transition={{ delay: (filteredItems.length - 1 - idx) * 0.05 }}
                                className="relative group"
                            >
                                {item.component ? (
                                    <div className="relative">
                                        {item.component}
                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md bg-[hsl(var(--background))] border border-[hsl(var(--border))] text-[hsl(var(--foreground))] text-xs whitespace-pre">
                                            {item.title}
                                        </div>
                                    </div>
                                ) : (
                                    <Link
                                        href={item.href}
                                        key={item.title}
                                        className="h-10 w-10 rounded-full bg-[hsl(var(--background))] flex items-center justify-center icon-primary shadow-md"
                                    >
                                        <div className="h-4 w-4">{item.icon}</div>
                                    </Link>
                                )}
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
            <button
                onClick={() => setOpen(!open)}
                className="h-10 w-10 rounded-full bg-[hsl(var(--background))] flex items-center justify-center shadow-md"
            >
                <Menu className="h-6 w-6 text-[hsl(var(--primary))]" />
            </button>
        </div>
    );
};

const FloatingDockDesktop = ({
    items,
    className,
}: DockContainerProps) => {
    let mouseX = useMotionValue(Infinity);
    return (
        <motion.div
            onMouseMove={(e) => mouseX.set(e.pageX)}
            onMouseLeave={() => mouseX.set(Infinity)}
            className={cn(
                "mx-auto hidden md:flex h-16 gap-4 items-end rounded-2xl bg-[hsl(var(--background))] px-4 pb-3 shadow-md",
                className
            )}
        >
            {items.map((item, idx) => (
                item.separator ? (
                    <Separator key={idx} orientation="vertical" className="h-8 mb-1 mr-2" />
                ) : item.component ? (
                    <div key={item.title} className="relative group h-10 w-10 flex items-center justify-center">
                        {item.component}
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md bg-[hsl(var(--background))] border border-[hsl(var(--border))] text-[hsl(var(--foreground))] text-xs whitespace-pre">
                            {item.title}
                        </div>
                    </div>
                ) : (
                    <IconContainer mouseX={mouseX} key={item.title} {...item} />
                )
            ))}
        </motion.div>
    );
};

function IconContainer({
    mouseX,
    title,
    icon,
    href,
}: IconContainerProps) {
    let ref = useRef<HTMLDivElement>(null);

    let distance = useTransform(mouseX, (val) => {
        let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
        return val - bounds.x - bounds.width / 2;
    });

    let widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
    let heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);

    let width = useSpring(widthTransform, {
        mass: 0.1,
        stiffness: 150,
        damping: 12,
    });
    let height = useSpring(heightTransform, {
        mass: 0.1,
        stiffness: 150,
        damping: 12,
    });

    const [hovered, setHovered] = useState(false);

    return (
        <Link href={href}>
            <motion.div
                ref={ref}
                style={{ width, height }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                className="aspect-square rounded-full bg-[hsl(var(--muted))] flex items-center justify-center relative icon-primary"
            >
                <AnimatePresence>
                    {hovered && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, x: "-50%" }}
                            animate={{ opacity: 1, y: 0, x: "-50%" }}
                            exit={{ opacity: 0, y: 2, x: "-50%" }}
                            className="px-2 py-0.5 whitespace-pre rounded-md bg-[hsl(var(--background))] border border-[hsl(var(--border))] text-[hsl(var(--foreground))] absolute left-1/2 -translate-x-1/2 -top-8 w-fit text-xs"
                        >
                            {title}
                        </motion.div>
                    )}
                </AnimatePresence>
                <div className="h-5 w-5 flex items-center justify-center">
                    {icon}
                </div>
            </motion.div>
        </Link>
    );
}
