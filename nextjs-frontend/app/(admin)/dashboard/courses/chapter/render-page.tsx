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
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import {
    Loader2, Search, Plus, ChevronLeft, ChevronRight,
    Edit2, Trash2, BookOpen, Clock, Book
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
    getAllChapters,
    createChapter,
    updateChapter,
    getAllCourses,
    getCourseById
} from "@/lib/actions/course/course.action"
import type {
    ChapterDto,
    CreateChapterDto,
    UpdateChapterDto,
    CourseDto
} from "@/lib/actions/course/course.dto"

interface ChapterFormData {
    name: string
    description: string | null
    order: number
    duration_minutes: number | null
    course_id: number
}

interface ChapterTableProps {
    data: (ChapterDto & { courseName?: string })[]
    onEdit: (chapter: ChapterDto) => void
    onDelete: (chapterId: number) => void
    isLoading?: boolean
}

const ChapterTable = ({ data, onEdit, onDelete, isLoading }: ChapterTableProps) => {
    return (
        <div className="overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Tên chương</TableHead>
                        <TableHead>Khóa học</TableHead>
                        <TableHead>Mô tả</TableHead>
                        <TableHead>Thứ tự</TableHead>
                        <TableHead>Thời lượng</TableHead>
                        <TableHead>Thao tác</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((chapter) => (
                        <TableRow key={chapter.id}>
                            <TableCell>{chapter.id}</TableCell>
                            <TableCell className="font-medium">{chapter.name}</TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <Book className="h-4 w-4 flex-shrink-0" />
                                    <span className="truncate">{chapter.courseName || `Khóa học ${chapter.course_id}`}</span>
                                </div>
                            </TableCell>
                            <TableCell>{chapter.description}</TableCell>
                            <TableCell>{chapter.order}</TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 flex-shrink-0" />
                                    <span>{chapter.duration_minutes} phút</span>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <Button 
                                        variant="ghost" 
                                        size="icon" 
                                        onClick={() => onEdit(chapter)}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                        ) : (
                                            <Edit2 className="h-4 w-4" />
                                        )}
                                    </Button>
                                    <Button 
                                        variant="ghost" 
                                        size="icon" 
                                        onClick={() => onDelete(chapter.id!)}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                        ) : (
                                            <Trash2 className="h-4 w-4" />
                                        )}
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

const ChapterForm = ({
    initialData,
    onSubmit,
    onCancel,
    courses,
    isSubmitting
}: {
    initialData?: Partial<ChapterFormData>
    onSubmit: (data: ChapterFormData) => void
    onCancel: () => void
    courses: CourseDto[]
    isSubmitting?: boolean
}) => {
    const [formData, setFormData] = useState<ChapterFormData>({
        name: initialData?.name || "",
        description: initialData?.description || null,
        order: initialData?.order || 0,
        duration_minutes: initialData?.duration_minutes || null,
        course_id: initialData?.course_id || 0
    })

    return (
        <div className="grid gap-4 py-4">
            <div className="grid gap-2">
                <Label htmlFor="course">Khóa học</Label>
                <Select 
                    value={formData.course_id.toString()}
                    onValueChange={(value) => setFormData({ ...formData, course_id: parseInt(value) })}
                    disabled={isSubmitting}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Chọn khóa học" />
                    </SelectTrigger>
                    <SelectContent>
                        {courses.map((course) => (
                            <SelectItem key={course.id} value={course.id!.toString()}>
                                {course.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="grid gap-2">
                <Label htmlFor="name">Tên chương</Label>
                <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    disabled={isSubmitting}
                />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="description">Mô tả</Label>
                <Textarea
                    id="description"
                    value={formData.description || ""}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    disabled={isSubmitting}
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="order">Thứ tự</Label>
                    <Input
                        id="order"
                        type="number"
                        value={formData.order}
                        onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
                        disabled={isSubmitting}
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="duration_minutes">Thời lượng (phút)</Label>
                    <Input
                        id="duration_minutes"
                        type="number"
                        value={formData.duration_minutes || ""}
                        onChange={(e) => setFormData({ ...formData, duration_minutes: e.target.value ? Number(e.target.value) : null })}
                        disabled={isSubmitting}
                    />
                </div>
            </div>

            <DialogFooter>
                <Button variant="outline" onClick={onCancel} disabled={isSubmitting}>
                    Hủy
                </Button>
                <Button onClick={() => onSubmit(formData)} disabled={isSubmitting}>
                    {isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Đang xử lý...
                        </>
                    ) : (
                        'Lưu'
                    )}
                </Button>
            </DialogFooter>
        </div>
    )
}

export default function ChaptersPage() {
    const [chapters, setChapters] = useState<(ChapterDto & { courseName?: string })[]>([])
    const [courses, setCourses] = useState<CourseDto[]>([])
    const [loading, setLoading] = useState(true)
    const [actionLoading, setActionLoading] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedChapter, setSelectedChapter] = useState<ChapterDto | null>(null)
    const [showForm, setShowForm] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const itemsPerPage = 10

    const loadCourses = useCallback(async () => {
        try {
            const response = await getAllCourses(1, 100)
            if (response.success && response.result) {
                setCourses(Array.isArray(response.result) ? response.result : [response.result])
            }
        } catch (error) {
            toast({
                title: "Lỗi",
                description: "Không thể tải danh sách khóa học",
                variant: "destructive"
            })
        }
    }, [])

    const loadChapters = useCallback(async () => {
        setLoading(true)
        try {
            const response = await getAllChapters(currentPage, itemsPerPage)
            if (response.success && response.result) {
                const chaptersData = Array.isArray(response.result) ? response.result : [response.result]
                
                const chaptersWithCourses = await Promise.all(
                    chaptersData.map(async (chapter) => {
                        const courseResponse = await getCourseById(chapter.course_id)
                        return {
                            ...chapter,
                            courseName: courseResponse.success && courseResponse.result ? 
                                (Array.isArray(courseResponse.result) ? 
                                    courseResponse.result[0].name : 
                                    courseResponse.result.name) : 
                                undefined
                        }
                    })
                )
                
                setChapters(chaptersWithCourses)
                if (response.pagination) {
                    setTotalPages(response.pagination.totalPages)
                }
            }
        } catch (error) {
            toast({
                title: "Lỗi",
                description: "Không thể tải danh sách chương",
                variant: "destructive"
            })
        }
        setLoading(false)
    }, [currentPage])

    useEffect(() => {
        loadCourses()
        loadChapters()
    }, [loadCourses, loadChapters])

    const handleCreateChapter = async (data: ChapterFormData) => {
        setActionLoading(true)
        try {
            const response = await createChapter(data as CreateChapterDto)
            if (response.success) {
                toast({
                    title: "Thành công",
                    description: "Tạo chương mới thành công"
                })
                loadChapters()
                setShowForm(false)
            }
        } catch (error) {
            toast({
                title: "Lỗi",
                description: "Không thể tạo chương mới",
                variant: "destructive"
            })
        }
        setActionLoading(false)
    }

    const handleUpdateChapter = async (data: ChapterFormData) => {
        if (!selectedChapter?.id) return
        setActionLoading(true)
        try {
            const response = await updateChapter(selectedChapter.id, data as UpdateChapterDto)
            if (response.success) {
                toast({
                    title: "Thành công",
                    description: "Cập nhật chương thành công"
                })
                loadChapters()
                setShowForm(false)
                setSelectedChapter(null)
            }
        } catch (error) {
            toast({
                title: "Lỗi",
                description: "Không thể cập nhật chương",
                variant: "destructive"
            })
        }
        setActionLoading(false)
    }

    const handleDeleteChapter = async (chapterId: number) => {
        setActionLoading(true)
        // Implement delete functionality
        toast({
            title: "Thông báo",
            description: "Chức năng xóa chương đang được phát triển"
        })
        setActionLoading(false)
    }

    const filteredChapters = chapters.filter(chapter =>
        chapter.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chapter.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chapter.courseName?.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="container mx-auto py-10">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Quản lý chương</h1>
                <Dialog open={showForm} onOpenChange={setShowForm}>
                    <DialogTrigger asChild>
                        <Button disabled={actionLoading}>
                            <Plus className="mr-2 h-4 w-4" />
                            Thêm chương
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                        <DialogHeader>
                            <DialogTitle>{selectedChapter ? "Sửa chương" : "Thêm chương mới"}</DialogTitle>
                            <DialogDescription>
                                {selectedChapter ? "Cập nhật thông tin chương" : "Tạo chương mới trong khóa học"}
                            </DialogDescription>
                        </DialogHeader>
                        <ChapterForm
                            initialData={selectedChapter || undefined}
                            onSubmit={selectedChapter ? handleUpdateChapter : handleCreateChapter}
                            onCancel={() => {
                                setShowForm(false)
                                setSelectedChapter(null)
                            }}
                            courses={courses}
                            isSubmitting={actionLoading}
                        />
                    </DialogContent>
                </Dialog>
            </div>

            <div className="flex items-center mb-6">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Tìm kiếm chương hoặc khóa học..."
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
                    <ChapterTable
                        data={filteredChapters}
                        onEdit={(chapter) => {
                            setSelectedChapter(chapter)
                            setShowForm(true)
                        }}
                        onDelete={handleDeleteChapter}
                        isLoading={actionLoading}
                    />

                    <div className="mt-4 flex justify-center">
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                        disabled={currentPage === 1 || loading}
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                    </Button>
                                </PaginationItem>
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                    <PaginationItem key={page}>
                                        <PaginationLink
                                            onClick={() => !loading && setCurrentPage(page)}
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
                                        disabled={currentPage === totalPages || loading}
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
