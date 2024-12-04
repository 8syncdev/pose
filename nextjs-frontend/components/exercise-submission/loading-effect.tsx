import { Loader2 } from 'lucide-react'

const LoadingEffect = () => {
    return (
        <div className="h-[calc(100vh-4rem)]">
            <div className="flex items-center justify-center h-full">
                <Loader2 className="w-8 h-8 animate-spin" />
            </div>
        </div>
    )
}

export default LoadingEffect 