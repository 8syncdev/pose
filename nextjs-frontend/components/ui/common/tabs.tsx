"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { withMotion } from "@/components/hoc/framer.config";
import { transitions } from "@/components/hoc/framer.config";
import { ChevronRight } from "lucide-react";
import dynamic from "next/dynamic";

// Types
export type TabItem = {
    title: string;
    value: string;
    content?: string | React.ReactNode;
};

export interface TabsProps {
    tabs: TabItem[];
    containerClassName?: string;
    activeTabClassName?: string;
    tabClassName?: string; 
    contentClassName?: string;
}

export interface TabContentProps {
    className?: string;
    key?: string;
    tabs: TabItem[];
    active: TabItem;
    hovering?: boolean;
}

// Animation variants
export const tabContentVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
        opacity: 1,
        y: 0,
        transition: transitions.spring
    },
    exit: { opacity: 0, y: -20 }
};

/**
 * Renders a single tab button with animations
 */
export const TabButton = ({
    tab,
    active,
    onClick,
    onHover,
    tabClassName,
    activeTabClassName
}: {
    tab: TabItem;
    active: TabItem;
    onClick: () => void;
    onHover: (hovering: boolean) => void;
    tabClassName?: string;
    activeTabClassName?: string;
}) => (
    <motion.button
        onClick={onClick}
        onMouseEnter={() => onHover(true)}
        onMouseLeave={() => onHover(false)}
        className={cn(
            "relative px-4 py-2 rounded-full",
            "hover-scale",
            tabClassName
        )}
        style={{ transformStyle: "preserve-3d" }}
        {...withMotion({
            whileHover: { scale: 1.05 },
            whileTap: { scale: 0.95 }
        })}
    >
        {active.value === tab.value && (
            <motion.div
                layoutId="active-tab"
                transition={transitions.spring}
                className={cn(
                    "absolute inset-0 bg-[hsl(var(--secondary))]",
                    "rounded-full shadow-custom",
                    activeTabClassName
                )}
            />
        )}

        <span className="relative flex items-center gap-2 text-[hsl(var(--foreground))]">
            {tab.title}
            {active.value === tab.value && (
                <ChevronRight className="w-4 h-4" />
            )}
        </span>
    </motion.button>
);

/**
 * Animated tab content component
 */
export const TabContent = ({
    className,
    tabs,
    hovering,
}: TabContentProps) => (
    <div className="relative w-full h-full">
        {tabs.map((tab, idx) => (
            <motion.div
                key={tab.value}
                layoutId={tab.value}
                variants={tabContentVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                style={{
                    scale: 1 - idx * 0.1,
                    top: hovering ? idx * -50 : 0,
                    zIndex: -idx,
                    opacity: idx < 3 ? 1 - idx * 0.1 : 0,
                }}
                className={cn(
                    "w-full h-full absolute top-0 left-0",
                    "card",
                    className
                )}
            >
                {tab.content}
            </motion.div>
        ))}
    </div>
);

/**
 * Main Tabs component with dynamic content rendering
 */
export const Tabs = dynamic(() => Promise.resolve(function TabsComponent({
    tabs: propTabs,
    containerClassName,
    activeTabClassName,
    tabClassName,
    contentClassName,
}: TabsProps) {
    const [active, setActive] = useState<TabItem>(propTabs[0]);
    const [tabs, setTabs] = useState<TabItem[]>(propTabs);
    const [hovering, setHovering] = useState(false);

    /**
     * Handles tab selection and reordering
     */
    const handleTabChange = (idx: number) => {
        const newTabs = [...propTabs];
        const selectedTab = newTabs.splice(idx, 1)[0];
        newTabs.unshift(selectedTab);
        setTabs(newTabs);
        setActive(selectedTab);
    };

    return (
        <>
            {/* Tab buttons container */}
            <div
                className={cn(
                    "flex flex-row items-center justify-start [perspective:1000px] relative",
                    "overflow-auto sm:overflow-visible no-visible-scrollbar max-w-full w-full",
                    "glass-effect",
                    containerClassName
                )}
            >
                {propTabs.map((tab, idx) => (
                    <TabButton
                        key={tab.title}
                        tab={tab}
                        active={active}
                        onClick={() => handleTabChange(idx)}
                        onHover={setHovering}
                        tabClassName={tabClassName}
                        activeTabClassName={activeTabClassName}
                    />
                ))}
            </div>

            {/* Tab content */}
            <TabContent
                tabs={tabs}
                active={active}
                key={active.value}
                hovering={hovering}
                className={cn("mt-8", contentClassName)}
            />
        </>
    );
}), {
    ssr: false,
    loading: () => <div>Loading...</div>
});
