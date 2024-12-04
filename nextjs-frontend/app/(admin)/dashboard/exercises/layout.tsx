import { ReactNode } from "react"



interface ExercisesLayoutProps {
    children: ReactNode
}

export default function ExercisesLayout({ children }: ExercisesLayoutProps) {
    return (
        <>
            {children}
        </>
    )
}
