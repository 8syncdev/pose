"use client"

import { useState, useCallback, useEffect } from "react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import {
    Loader2, Search, Plus, ChevronLeft, ChevronRight,
    Edit2, Trash2, BookOpen, Code, Brain
} from "lucide-react"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
} from "@/components/ui/pagination"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import {
    getAllExercises,
    createExercise,
    updateExercise,
    deleteExercise
} from "@/lib/actions/exercise/exercise.action"
import type { ExerciseDto, CreateExerciseDto, UpdateExerciseDto } from "@/lib/actions/exercise/exercise.dto"

interface ExerciseFormData {
    name: string
    level: 'Easy' | 'Medium' | 'Hard'
    content: string
    solution: string
    points: number
    function_name: string
    param_style: 'args' | 'list'
    time_limit: number
    memory_limit: number
    content_visibility: 'public' | 'premium' | 'enterprise'
    solution_visibility: 'public' | 'premium' | 'enterprise'
}

interface ExerciseTableProps {
    data: ExerciseDto[]
    onEdit: (exercise: ExerciseDto) => void
    onDelete: (exerciseId: number) => void
}

const ExerciseTable = ({ data, onEdit, onDelete }: ExerciseTableProps) => {
    return (
        <div className="overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Tên bài tập</TableHead>
                        <TableHead>Độ khó</TableHead>
                        <TableHead>Điểm</TableHead>
                        <TableHead>Thời gian</TableHead>
                        <TableHead>Bộ nhớ</TableHead>
                        <TableHead>Thao tác</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((exercise) => (
                        <TableRow key={exercise.id}>
                            <TableCell>{exercise.id}</TableCell>
                            <TableCell className="font-medium">{exercise.name}</TableCell>
                            <TableCell>
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                    ${exercise.level === 'Easy' ? 'bg-green-100 text-green-800' : 
                                      exercise.level === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                                      'bg-red-100 text-red-800'}`}>
                                    <Brain className="w-4 h-4 mr-1" />
                                    {exercise.level}
                                </span>
                            </TableCell>
                            <TableCell>{exercise.points}</TableCell>
                            <TableCell>{exercise.time_limit}ms</TableCell>
                            <TableCell>{exercise.memory_limit}MB</TableCell>
                            <TableCell>
                                <div className="flex space-x-2">
                                    <Button variant="ghost" size="icon" onClick={() => onEdit(exercise)}>
                                        <Edit2 className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" onClick={() => onDelete(exercise.id!)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

const ExerciseForm = ({
    initialData,
    onSubmit,
    onCancel
}: {
    initialData?: Partial<ExerciseFormData>
    onSubmit: (data: ExerciseFormData) => void
    onCancel: () => void
}) => {
    const [formData, setFormData] = useState<ExerciseFormData>({
        name: initialData?.name || "",
        level: initialData?.level || "Easy",
        content: initialData?.content || "",
        solution: initialData?.solution || "",
        points: initialData?.points || 0,
        function_name: initialData?.function_name || "",
        param_style: initialData?.param_style || "args",
        time_limit: initialData?.time_limit || 1000,
        memory_limit: initialData?.memory_limit || 128,
        content_visibility: initialData?.content_visibility || "public",
        solution_visibility: initialData?.solution_visibility || "public"
    })

    return (
        <div className="grid gap-4 py-4">
            <div className="grid gap-2">
                <Label htmlFor="name">Tên bài tập</Label>
                <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="level">Độ khó</Label>
                    <Select
                        value={formData.level}
                        onValueChange={(value: 'Easy' | 'Medium' | 'Hard') =>
                            setFormData({ ...formData, level: value })}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Chọn độ khó" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Easy">Dễ</SelectItem>
                            <SelectItem value="Medium">Trung bình</SelectItem>
                            <SelectItem value="Hard">Khó</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="points">Điểm</Label>
                    <Input
                        id="points"
                        type="number"
                        value={formData.points}
                        onChange={(e) => setFormData({ ...formData, points: Number(e.target.value) })}
                    />
                </div>
            </div>

            <div className="grid gap-2">
                <Label htmlFor="content">Nội dung</Label>
                <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    rows={5}
                />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="solution">Lời giải</Label>
                <Textarea
                    id="solution"
                    value={formData.solution}
                    onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                    rows={5}
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="function_name">Tên hàm</Label>
                    <Input
                        id="function_name"
                        value={formData.function_name}
                        onChange={(e) => setFormData({ ...formData, function_name: e.target.value })}
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="param_style">Kiểu tham số</Label>
                    <Select
                        value={formData.param_style}
                        onValueChange={(value: 'args' | 'list') =>
                            setFormData({ ...formData, param_style: value })}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Chọn kiểu tham số" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="args">Arguments</SelectItem>
                            <SelectItem value="list">List</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="time_limit">Giới hạn thời gian (ms)</Label>
                    <Input
                        id="time_limit"
                        type="number"
                        value={formData.time_limit}
                        onChange={(e) => setFormData({ ...formData, time_limit: Number(e.target.value) })}
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="memory_limit">Giới hạn bộ nhớ (MB)</Label>
                    <Input
                        id="memory_limit"
                        type="number"
                        value={formData.memory_limit}
                        onChange={(e) => setFormData({ ...formData, memory_limit: Number(e.target.value) })}
                    />
                </div>
            </div>

            <DialogFooter>
                <Button variant="outline" onClick={onCancel}>
                    Hủy
                </Button>
                <Button onClick={() => onSubmit(formData)}>Lưu</Button>
            </DialogFooter>
        </div>
    )
}

export default function ExercisePage() {
    const [exercises, setExercises] = useState<ExerciseDto[]>([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedExercise, setSelectedExercise] = useState<ExerciseDto | null>(null)
    const [showForm, setShowForm] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [deletingId, setDeletingId] = useState<number | null>(null)
    const itemsPerPage = 10

    const loadExercises = useCallback(async () => {
        setLoading(true)
        try {
            const response = await getAllExercises(currentPage, itemsPerPage)
            if (response.success && response.result) {
                setExercises(Array.isArray(response.result) ? response.result : [response.result])
                if (response.pagination) {
                    setTotalPages(response.pagination.totalPages)
                }
            }
        } catch (error) {
            toast({
                title: "Lỗi",
                description: "Không thể tải danh sách bài tập",
                variant: "destructive"
            })
        }
        setLoading(false)
    }, [currentPage])

    useEffect(() => {
        loadExercises()
    }, [loadExercises])

    const handleCreateExercise = async (data: ExerciseFormData) => {
        try {
            const response = await createExercise(data as CreateExerciseDto)
            if (response.success) {
                toast({
                    title: "Thành công",
                    description: "Tạo bài tập mới thành công"
                })
                loadExercises()
                setShowForm(false)
            }
        } catch (error) {
            toast({
                title: "Lỗi",
                description: "Không thể tạo bài tập mới",
                variant: "destructive"
            })
        }
    }

    const handleUpdateExercise = async (data: ExerciseFormData) => {
        if (!selectedExercise?.id) return
        try {
            const response = await updateExercise(selectedExercise.id, data as UpdateExerciseDto)
            if (response.success) {
                toast({
                    title: "Thành công",
                    description: "Cập nhật bài tập thành công"
                })
                loadExercises()
                setShowForm(false)
                setSelectedExercise(null)
            }
        } catch (error) {
            toast({
                title: "Lỗi",
                description: "Không thể cập nhật bài tập",
                variant: "destructive"
            })
        }
    }

    const handleDeleteExercise = async (exerciseId: number) => {
        setDeletingId(exerciseId)
        try {
            const response = await deleteExercise(exerciseId)
            if (response.success) {
                toast({
                    title: "Thành công",
                    description: "Xóa bài tập thành công"
                })
                loadExercises()
            }
        } catch (error) {
            toast({
                title: "Lỗi",
                description: "Không thể xóa bài tập",
                variant: "destructive"
            })
        }
        setDeletingId(null)
    }

    const filteredExercises = exercises.filter(exercise =>
        exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exercise.content?.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="w-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h1 className="text-2xl font-bold">Quản lý bài tập</h1>
                <Dialog open={showForm} onOpenChange={setShowForm}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Thêm bài tập
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>{selectedExercise ? "Sửa bài tập" : "Thêm bài tập mới"}</DialogTitle>
                            <DialogDescription>
                                {selectedExercise ? "Cập nhật thông tin bài tập" : "Tạo bài tập mới trong hệ thống"}
                            </DialogDescription>
                        </DialogHeader>
                        <ExerciseForm
                            initialData={selectedExercise || undefined}
                            onSubmit={selectedExercise ? handleUpdateExercise : handleCreateExercise}
                            onCancel={() => {
                                setShowForm(false)
                                setSelectedExercise(null)
                            }}
                        />
                    </DialogContent>
                </Dialog>
            </div>

            <div className="flex items-center mb-6">
                <div className="relative flex-1 max-w-sm w-full">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Tìm kiếm bài tập..."
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <Loader2 className="h-6 w-6 animate-spin" />
                </div>
            ) : (
                <>
                    <div className="overflow-hidden rounded-lg border">
                        <ExerciseTable
                            data={filteredExercises}
                            onEdit={(exercise) => {
                                setSelectedExercise(exercise)
                                setShowForm(true)
                            }}
                            onDelete={handleDeleteExercise}
                        />
                    </div>

                    <div className="mt-4 flex justify-center">
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                        disabled={currentPage === 1}
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                    </Button>
                                </PaginationItem>
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                    <PaginationItem key={page}>
                                        <PaginationLink
                                            onClick={() => setCurrentPage(page)}
                                            isActive={currentPage === page}
                                        >
                                            {page}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}
                                <PaginationItem>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                        disabled={currentPage === totalPages}
                                    >
                                        <ChevronRight className="h-4 w-4" />
                                    </Button>
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                </>
            )}
        </div>
    )
}