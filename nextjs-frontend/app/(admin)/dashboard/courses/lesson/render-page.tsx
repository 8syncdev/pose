"use client"

import { useState, useCallback, useEffect } from "react"
import { Plus, Search, ChevronLeft, ChevronRight, Loader2, Edit2, Trash2, Book, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination"
import { toast } from "@/hooks/use-toast"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MarkdownRenderer from "@/components/shared/md/md-custom"
import { LessonDto, ChapterDto, CreateLessonDto, UpdateLessonDto } from "@/lib/actions/course/course.dto"
import { getAllLessons, getLessonsByChapterId, createLesson, updateLesson, getAllChapters } from "@/lib/actions/course/course.action"
import { ScrollArea } from "@/components/ui/scroll-area"

interface LessonFormData {
    name: string
    description: string
    order: number
    content: string
    video_url: string
    duration_minutes: number
    is_free: boolean
    chapter_id: number
}

interface LessonTableProps {
    data: (LessonDto & { chapterName?: string })[]
    onEdit: (lesson: LessonDto) => void
    onDelete: (lessonId: number) => void
    isLoading?: boolean
}

const LessonTable = ({ data, onEdit, onDelete, isLoading }: LessonTableProps) => {
    return (
        <div className="overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Tên bài học</TableHead>
                        <TableHead>Chương</TableHead>
                        <TableHead>Mô tả</TableHead>
                        <TableHead>Thứ tự</TableHead>
                        <TableHead>Thời lượng</TableHead>
                        <TableHead>Miễn phí</TableHead>
                        <TableHead>Thao tác</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((lesson) => (
                        <TableRow key={lesson.id}>
                            <TableCell>{lesson.id}</TableCell>
                            <TableCell className="font-medium">{lesson.name}</TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <Book className="h-4 w-4 flex-shrink-0" />
                                    <span className="truncate">{lesson.chapterName || `Chương ${lesson.chapter_id}`}</span>
                                </div>
                            </TableCell>
                            <TableCell>{lesson.description}</TableCell>
                            <TableCell>{lesson.order}</TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 flex-shrink-0" />
                                    <span>{lesson.duration_minutes} phút</span>
                                </div>
                            </TableCell>
                            <TableCell>
                                <Switch checked={lesson.is_free} disabled />
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <Button 
                                        variant="ghost" 
                                        size="icon" 
                                        onClick={() => onEdit(lesson)}
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
                                        onClick={() => onDelete(lesson.id!)}
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

const LessonForm = ({
    initialData,
    onSubmit,
    onCancel,
    chapters,
    isSubmitting
}: {
    initialData?: Partial<LessonFormData>
    onSubmit: (data: LessonFormData) => void
    onCancel: () => void
    chapters: ChapterDto[]
    isSubmitting?: boolean
}) => {
    const [formData, setFormData] = useState<LessonFormData>({
        name: initialData?.name || "",
        description: initialData?.description || "",
        order: initialData?.order || 0,
        content: initialData?.content || "",
        video_url: initialData?.video_url || "",
        duration_minutes: initialData?.duration_minutes || 0,
        is_free: initialData?.is_free || false,
        chapter_id: initialData?.chapter_id || 0
    })

    return (
        <div className="grid gap-4 py-4">
            <div className="grid gap-2">
                <Label htmlFor="chapter">Chương</Label>
                <Select 
                    value={formData.chapter_id.toString()}
                    onValueChange={(value) => setFormData({ ...formData, chapter_id: parseInt(value) })}
                    disabled={isSubmitting}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Chọn chương" />
                    </SelectTrigger>
                    <SelectContent>
                        {chapters.map((chapter) => (
                            <SelectItem key={chapter.id} value={chapter.id!.toString()}>
                                {chapter.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="grid gap-2">
                <Label htmlFor="name">Tên bài học</Label>
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
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    disabled={isSubmitting}
                />
            </div>

            <div className="grid gap-2">
                <Label>Nội dung (Markdown)</Label>
                <Tabs defaultValue="edit" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="edit">Chỉnh sửa</TabsTrigger>
                        <TabsTrigger value="preview">Xem trước</TabsTrigger>
                    </TabsList>
                    <TabsContent value="edit" className="mt-2">
                        <Textarea
                            id="content"
                            value={formData.content}
                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                            className="min-h-[400px] font-mono"
                            disabled={isSubmitting}
                        />
                    </TabsContent>
                    <TabsContent value="preview" className="mt-2">
                        <div className="border rounded-md">
                            <ScrollArea className="h-[400px] p-4 prose prose-slate dark:prose-invert max-w-none">
                                <MarkdownRenderer content={formData.content} />
                            </ScrollArea>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>

            <div className="grid gap-2">
                <Label htmlFor="video_url">URL Video</Label>
                <Input
                    id="video_url"
                    value={formData.video_url}
                    onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                    disabled={isSubmitting}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                        value={formData.duration_minutes}
                        onChange={(e) => setFormData({ ...formData, duration_minutes: Number(e.target.value) })}
                        disabled={isSubmitting}
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="is_free">Miễn phí</Label>
                    <Switch
                        id="is_free"
                        checked={formData.is_free}
                        onCheckedChange={(checked) => setFormData({ ...formData, is_free: checked })}
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

export default function LessonsPage() {
    const [lessons, setLessons] = useState<(LessonDto & { chapterName?: string })[]>([])
    const [chapters, setChapters] = useState<ChapterDto[]>([])
    const [loading, setLoading] = useState(true)
    const [actionLoading, setActionLoading] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedLesson, setSelectedLesson] = useState<LessonDto | null>(null)
    const [showForm, setShowForm] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const itemsPerPage = 10

    const loadChapters = useCallback(async () => {
        try {
            const response = await getAllChapters(1, 100)
            if (response.success && response.result) {
                setChapters(Array.isArray(response.result) ? response.result : [response.result])
            }
        } catch (error) {
            toast({
                title: "Lỗi",
                description: "Không thể tải danh sách chương",
                variant: "destructive"
            })
        }
    }, [])

    const loadLessons = useCallback(async () => {
        setLoading(true)
        try {
            const response = await getAllLessons(currentPage, itemsPerPage)
            if (response.success && response.result) {
                const lessonsData = Array.isArray(response.result) ? response.result : [response.result]
                
                const lessonsWithChapters = await Promise.all(
                    lessonsData.map(async (lesson) => {
                        const chapterResponse = await getLessonsByChapterId(lesson.chapter_id)
                        return {
                            ...lesson,
                            chapterName: chapterResponse.success && chapterResponse.result ? 
                                (Array.isArray(chapterResponse.result) ? 
                                    chapterResponse.result[0].name : 
                                    chapterResponse.result.name) : 
                                undefined
                        }
                    })
                )
                
                setLessons(lessonsWithChapters)
                if (response.pagination) {
                    setTotalPages(response.pagination.totalPages)
                }
            }
        } catch (error) {
            toast({
                title: "Lỗi",
                description: "Không thể tải danh sách bài học",
                variant: "destructive"
            })
        }
        setLoading(false)
    }, [currentPage])

    useEffect(() => {
        loadChapters()
        loadLessons()
    }, [loadChapters, loadLessons])

    const handleCreateLesson = async (data: LessonFormData) => {
        setActionLoading(true)
        try {
            const response = await createLesson(data as CreateLessonDto)
            if (response.success) {
                toast({
                    title: "Thành công",
                    description: "Tạo bài học mới thành công"
                })
                loadLessons()
                setShowForm(false)
            }
        } catch (error) {
            toast({
                title: "Lỗi",
                description: "Không thể tạo bài học mới",
                variant: "destructive"
            })
        }
        setActionLoading(false)
    }

    const handleUpdateLesson = async (data: LessonFormData) => {
        if (!selectedLesson?.id) return
        setActionLoading(true)
        try {
            const response = await updateLesson(selectedLesson.id, {
                ...data,
                description: data.description || "",
                content: data.content || "",
                video_url: data.video_url || "",
                duration_minutes: data.duration_minutes || 0
            } as UpdateLessonDto)
            if (response.success) {
                toast({
                    title: "Thành công",
                    description: "Cập nhật bài học thành công"
                })
                loadLessons()
                setShowForm(false)
                setSelectedLesson(null)
            }
        } catch (error) {
            toast({
                title: "Lỗi",
                description: "Không thể cập nhật bài học",
                variant: "destructive"
            })
        }
        setActionLoading(false)
    }

    const handleDeleteLesson = async (lessonId: number) => {
        setActionLoading(true)
        // Implement delete functionality
        toast({
            title: "Thông báo",
            description: "Chức năng xóa bài học đang được phát triển"
        })
        setActionLoading(false)
    }

    const filteredLessons = lessons.filter(lesson =>
        lesson.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lesson.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lesson.chapterName?.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="container mx-auto py-10 pb-32">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                <h1 className="text-2xl font-bold">Quản lý bài học</h1>
                <Dialog open={showForm} onOpenChange={setShowForm}>
                    <DialogTrigger asChild>
                        <Button disabled={actionLoading}>
                            <Plus className="mr-2 h-4 w-4" />
                            Thêm bài học
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>{selectedLesson ? "Sửa bài học" : "Thêm bài học mới"}</DialogTitle>
                            <DialogDescription>
                                {selectedLesson ? "Cập nhật thông tin bài học" : "Tạo bài học mới trong chương"}
                            </DialogDescription>
                        </DialogHeader>
                        <LessonForm
                            initialData={selectedLesson || undefined}
                            onSubmit={selectedLesson ? handleUpdateLesson : handleCreateLesson}
                            onCancel={() => {
                                setShowForm(false)
                                setSelectedLesson(null)
                            }}
                            chapters={chapters}
                            isSubmitting={actionLoading}
                        />
                    </DialogContent>
                </Dialog>
            </div>

            <div className="flex items-center mb-6">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Tìm kiếm bài học hoặc chương..."
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
                    <LessonTable
                        data={filteredLessons}
                        onEdit={(lesson) => {
                            setSelectedLesson(lesson)
                            setShowForm(true)
                        }}
                        onDelete={handleDeleteLesson}
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
