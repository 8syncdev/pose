import { memo } from 'react'
import { Badge } from '@/components/ui/badge'
import type { Exercise } from '@/lib/actions/exercise/exercise.dto'

interface ExerciseHeaderProps {
    exercise: Exercise
}

const ExerciseHeader = memo(({ exercise }: ExerciseHeaderProps) => {
    const getDifficultyVariant = (level: 'Easy' | 'Medium' | 'Hard' | undefined): "default" | "secondary" | "destructive" | "outline" => {
        switch (level) {
            case 'Easy': return 'default'
            case 'Medium': return 'secondary'
            case 'Hard': return 'destructive'
            default: return 'outline'
        }
    }

    return (
        <div className="flex items-center justify-between p-4 border-b">
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold text-gradient-purple-blue">{exercise.name}</h1>
                <div className="flex items-center gap-2">
                    <Badge variant={getDifficultyVariant(exercise.level)}>
                        {exercise.level || 'Unknown'}
                    </Badge>
                    <Badge variant="outline">{exercise.points} Điểm</Badge>
                    <Badge variant="secondary">
                        {exercise.content_visibility}
                    </Badge>
                </div>
            </div>
        </div>
    )
})

ExerciseHeader.displayName = 'ExerciseHeader'
export default ExerciseHeader 