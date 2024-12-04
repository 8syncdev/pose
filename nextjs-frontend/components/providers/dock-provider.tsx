"use client"

import { createContext, useContext, useState } from "react"
import { DockItem, FloatingDock } from "@/components/ui/common/dock"
import { usePathname } from "next/navigation"
import { BookOpen, Code, GraduationCap } from 'lucide-react';
import DarkModeButton from "../ui/button/dark-mode-button";

const dockItems: DockItem[] = [
    {
        title: "Intro",
        icon: <BookOpen className="h-4 w-4" />,
        href: "#intro"
    },
    {
        title: "Roadmap", 
        icon: <Code className="h-4 w-4" />,
        href: "#roadmap"
    },
    {
        title: "Courses",
        icon: <GraduationCap className="h-4 w-4" />,
        href: "#courses"
    },
    {
        separator: true,
        title: "",
        icon: null,
        href: "#"
    },
    {
        title: "Theme",
        component: <DarkModeButton />,
        icon: null,
        href: "#"
    }
];

type DockContextType = {
    items: DockItem[]
    setItems: (items: DockItem[]) => void
    transformHref: (href: string) => string
}

const DockContext = createContext<DockContextType | undefined>(undefined)

type DockProviderProps = {
    children: React.ReactNode
    items?: DockItem[]
}

export function DockProvider({ children, items: initialItems = dockItems }: DockProviderProps) {
    const [items, setItems] = useState<DockItem[]>(initialItems)
    const pathname = usePathname()

    const transformHref = (href: string) => {
        // Only transform href if not on homepage
        if (pathname !== "/" && href.startsWith('#') && !href.startsWith('/#')) {
            return '/' + href
        }
        return href
    }

    const transformedItems = items.map(item => ({
        ...item,
        href: transformHref(item.href)
    }))

    return (
        <DockContext.Provider value={{ items, setItems, transformHref }}>
            {children}
            <FloatingDock
                items={transformedItems}
                desktopClassName="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
                mobileClassName="fixed bottom-8 right-8 z-50"
            />
        </DockContext.Provider>
    )
}

export function useDock() {
    const context = useContext(DockContext)
    if (!context) {
        throw new Error("useDock must be used within a DockProvider")
    }
    return context
}
