'use client';

import {
    useMotionValueEvent,
    useScroll,
    useTransform,
    motion,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { TimelineContent } from "@/components/ui/animation/scroll/framer-timeline";

interface TimelineEntry {
    title: string;
    content: React.ReactNode;
}

interface TimelineProps {
    data: TimelineEntry[];
    className?: string;
    title?: string;
    description?: string;
    titleClassName?: string;
    descriptionClassName?: string;
    lineColor?: string;
    dotColor?: string;
    dotBorderColor?: string;
    titleColor?: string;
    timelineRef?: React.RefObject<HTMLDivElement>;
    animationNumStart?: number;
}

export function Timeline({
    data,
    className,
    title,
    description,
    titleClassName,
    descriptionClassName,
    lineColor = "bg-gradient-purple-blue",
    dotColor = "bg-[hsl(var(--background))]",
    dotBorderColor = "border-[hsl(var(--border))]",
    titleColor = "text-gradient-purple-blue",
    timelineRef: externalRef,
    animationNumStart = 0
}: TimelineProps) {
    const ref = useRef<HTMLDivElement>(null);
    const defaultContainerRef = useRef<HTMLDivElement>(null);
    const containerRef = externalRef || defaultContainerRef;
    const [height, setHeight] = useState(0);

    useEffect(() => {
        if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            setHeight(rect.height);
        }
    }, [ref]);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 10%", "end 50%"],
    });

    const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
    const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

    return (
        <div
            className={cn(
                "w-full bg-[hsl(var(--background))] font-sans md:px-10",
                className
            )}
            ref={containerRef}
        >
            {(title || description) && (
                <TimelineContent animationNum={animationNumStart} timelineRef={containerRef}>
                    <div className="container py-20">
                        {title && (
                            <h2 className={cn(
                                "text-lg md:text-4xl mb-4 text-gradient-pink-purple max-w-4xl",
                                titleClassName
                            )}>
                                {title}
                            </h2>
                        )}
                        {description && (
                            <p className={cn(
                                "text-gradient-orange-red text-sm md:text-base max-w-sm",
                                descriptionClassName
                            )}>
                                {description}
                            </p>
                        )}
                    </div>
                </TimelineContent>
            )}

            <div ref={ref} className="container relative pb-20">
                {data.map((item, index) => (
                    <TimelineContent key={index} animationNum={index + 1 + animationNumStart} timelineRef={containerRef}>
                        <div
                            className="flex justify-start pt-10 md:pt-40 md:gap-10"
                        >
                            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
                                <div className={cn(
                                    "h-10 absolute left-3 md:left-3 w-10 rounded-full flex items-center justify-center",
                                    dotColor
                                )}>
                                    <div className={cn(
                                        "h-4 w-4 rounded-full bg-gradient-green-teal border p-2",
                                        dotBorderColor
                                    )} />
                                </div>
                                <h3 className={cn(
                                    "hidden md:block text-xl md:pl-20 md:text-5xl font-bold",
                                    titleColor
                                )}>
                                    {item.title}
                                </h3>
                            </div>

                            <div className="relative pl-20 pr-4 md:pl-4 w-full">
                                <h3 className={cn(
                                    "md:hidden block text-2xl mb-4 text-left font-bold",
                                    titleColor
                                )}>
                                    {item.title}
                                </h3>
                                {item.content}
                            </div>
                        </div>
                    </TimelineContent>
                ))}
                <div
                    style={{
                        height: height + "px",
                    }}
                    className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-[hsl(var(--muted))] to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
                >
                    <motion.div
                        style={{
                            height: heightTransform,
                            opacity: opacityTransform,
                        }}
                        className={cn(
                            "absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-[0%] via-[10%] rounded-full",
                            lineColor
                        )}
                    />
                </div>
            </div>
        </div>
    );
}
