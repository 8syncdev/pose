"use client";

import dynamic from 'next/dynamic';
import React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { createAnimation } from '@/components/hoc/framer.config';

interface ShinyButtonProps extends HTMLMotionProps<"button"> {
    children: React.ReactNode;
    className?: string;
}

const ShinyButtonBase = ({ children, className, onClick, ...props }: ShinyButtonProps) => {
    return (
        <motion.button
            {...createAnimation({
                // Hiệu ứng di chuyển từ phải sang trái
                initialX: "100%", // Bắt đầu từ phải
                targetX: "-100%", // Di chuyển sang trái
                
                // Hiệu ứng co giãn khi hover/click
                initialScale: 0.8, // Kích thước ban đầu
                targetScale: 1, // Kích thước đích
                tapScale: 0.95, // Kích thước khi click
                
                // Thời gian lặp lại animation
                repeatDelay: 1,
                
                // Cấu hình spring cho hiệu ứng di chuyển
                springConfig: {
                    stiffness: 20, // Độ cứng
                    damping: 15,   // Độ giảm chấn
                    mass: 2        // Khối lượng
                },
                
                // Cấu hình spring cho hiệu ứng co giãn
                scaleConfig: {
                    stiffness: 200,
                    damping: 5,
                    mass: 0.5
                }
            })}
            onClick={onClick}
            {...props}
            className={cn(
                "relative rounded-lg px-6 py-2 font-medium backdrop-blur-xl transition-shadow duration-300 ease-in-out hover:shadow dark:bg-[radial-gradient(circle_at_50%_0%,hsl(var(--primary)/10%)_0%,transparent_60%)] dark:hover:shadow-[0_0_20px_hsl(var(--primary)/10%)]",
                "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                "disabled:pointer-events-none disabled:opacity-50",
                className
            )}
        >
            <span
                className={cn(
                    "relative block size-full text-sm uppercase tracking-wide",
                    "text-[hsl(var(--foreground)/75%)]",
                    "dark:text-[hsl(var(--foreground)/95%)] dark:font-light"
                )}
                style={{
                    maskImage:
                        "linear-gradient(-75deg,hsl(var(--primary)) calc(var(--x) + 20%),transparent calc(var(--x) + 30%),hsl(var(--primary)) calc(var(--x) + 100%))",
                }}
            >
                {children}
            </span>
            <span
                style={{
                    mask: "linear-gradient(rgb(0,0,0), rgb(0,0,0)) content-box,linear-gradient(rgb(0,0,0), rgb(0,0,0))",
                    maskComposite: "exclude",
                }}
                className="absolute inset-0 z-10 block rounded-[inherit] bg-[linear-gradient(-75deg,hsl(var(--primary)/10%)_calc(var(--x)+20%),hsl(var(--primary)/50%)_calc(var(--x)+25%),hsl(var(--primary)/10%)_calc(var(--x)+100%))] p-px"
            />
        </motion.button>
    );
};

ShinyButtonBase.displayName = "ShinyButtonBase";

const ShinyButton = dynamic(() => Promise.resolve(ShinyButtonBase), {
    ssr: false,
});

export default ShinyButton;
