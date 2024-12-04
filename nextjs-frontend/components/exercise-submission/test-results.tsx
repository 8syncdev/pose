import { memo } from 'react'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { AlertCircle, CheckCircle2, XCircle, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { TimelineContent } from '@/components/ui/animation/scroll/framer-timeline'
import type { Exercise, SubmissionWithTestDetails } from '@/lib/actions/exercise/exercise.dto'

interface TestResultsProps {
    results: SubmissionWithTestDetails | null
    timelineRef: React.RefObject<HTMLDivElement>
    isSubmitting: boolean
    exercise: Exercise | null
}

const TestResults = memo(({ results, timelineRef, isSubmitting, exercise }: TestResultsProps) => {
    if (isSubmitting) {
        return (
            <div className="flex flex-col items-center justify-center h-full gap-4">
                <Loader2 className="w-8 h-8 animate-spin" />
                <p>Đang chạy kiểm thử...</p>
            </div>
        )
    }

    if (!results) {
        return (
            <div className="space-y-4">
                <div className="flex items-center gap-4">
                    <Badge variant="outline">
                        {exercise?.test_cases ? JSON.parse(exercise.test_cases).length : 0} Test cases
                    </Badge>
                </div>

                {exercise?.test_cases && JSON.parse(exercise.test_cases).map((test: any, index: number) => (
                    <Card key={index} className="p-4">
                        <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">Test case #{index + 1}</span>
                        </div>
                        <div className="grid gap-2">
                            <div>
                                <div className="font-medium">Input:</div>
                                <pre className="mt-1 p-2 rounded bg-[hsl(var(--muted))]">
                                    {test.input}
                                </pre>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        )
    }

    return (
        <div className="space-y-4" ref={timelineRef}>
            <div className="flex items-center gap-4">
                <Badge variant={results.status === 'completed' ? 'default' : 'destructive'}>
                    {results.passed_tests}/{results.total_tests} Test đã vượt qua
                </Badge>
                <Badge variant="outline">{results.grade || 0} Điểm</Badge>
            </div>

            {results.error_message && (
                <Card className="p-4 border-[hsl(var(--danger))]">
                    <div className="flex items-center gap-2 text-[hsl(var(--danger))]">
                        <AlertCircle className="w-4 h-4" />
                        <span>{results.error_message}</span>
                    </div>
                </Card>
            )}

            <div className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">
                <div>Thời gian thực thi tối đa: {results.max_execution_time}ms</div>
                <div>Bộ nhớ sử dụng tối đa: {results.max_memory_used}MB</div>
            </div>

            <div className="space-y-2">
                {results?.test_details?.map((test, index) => (
                    <TimelineContent 
                        key={index} 
                        animationNum={index} 
                        timelineRef={timelineRef}
                    >
                        <Card className={cn(
                            "p-4 transition-all duration-300",
                            test.status.toLowerCase() === 'passed' ? 'border-[hsl(var(--success))]' : 'border-[hsl(var(--danger))]'
                        )}>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    {test.status.toLowerCase() === 'passed' ? (
                                        <CheckCircle2 className="w-5 h-5 text-[hsl(var(--success))]" />
                                    ) : (
                                        <XCircle className="w-5 h-5 text-[hsl(var(--danger))]" />
                                    )}
                                    <span className="font-medium">Test case #{test.test_number}</span>
                                </div>
                                <div className="text-sm text-[hsl(var(--muted-foreground))]">
                                    {test.execution_time}ms | {test.memory_used}
                                </div>
                            </div>

                            {test.description && (
                                <p className="mt-2 text-sm">{test.description}</p>
                            )}

                            {test.error && (
                                <div className="mt-2 text-sm text-[hsl(var(--danger))]">
                                    Lỗi: {test.error}
                                </div>
                            )}

                            <div className="mt-2 grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <div className="font-medium">Input:</div>
                                    <pre className="mt-1 p-2 rounded bg-[hsl(var(--muted))]">
                                        {JSON.stringify(test.input, null, 2)}
                                    </pre>
                                </div>
                                <div>
                                    <div className="font-medium">Expected:</div>
                                    <pre className="mt-1 p-2 rounded bg-[hsl(var(--muted))]">
                                        {JSON.stringify(test.expected, null, 2)}
                                    </pre>
                                </div>
                            </div>
                        </Card>
                    </TimelineContent>
                ))}
            </div>
        </div>
    )
})

TestResults.displayName = 'TestResults'
export default TestResults
