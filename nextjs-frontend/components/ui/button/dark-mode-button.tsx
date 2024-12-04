"use client"

import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"
import ShinyButton from "./shinny-button"

export default function DarkModeButton() {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    return (
        <ShinyButton
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="icon-primary bg-transparent hover:bg-transparent"
        >
            {theme === "dark" ? (
                <Sun className="h-5 w-5 text-white" />
            ) : (
                <Moon className="h-5 w-5 text-white" />
            )}
        </ShinyButton>
    )
}

