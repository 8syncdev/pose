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
import { toast } from "@/hooks/use-toast"
import { Loader2, Search, ChevronLeft, ChevronRight, Edit2, Trash2, Clock4, CheckCircle2, Timer, XCircle, AlertCircle } from "lucide-react"
import { getEnrollments, createEnrollment, updateEnrollment, deleteEnrollment } from "@/lib/actions/enrollment/enrollment.action"
import type { EnrollmentDto, CreateEnrollmentDto, UpdateEnrollmentDto } from "@/lib/actions/enrollment/enrollment.dto"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
} from "@/components/ui/pagination"
import { getUserById } from "@/lib/actions/user/user.action"
import type { UserDto } from "@/lib/actions/user/user.dto"
import type { CourseDto } from "@/lib/actions/course/course.dto"
import { getCourseById } from "@/lib/actions/course/course.action"

interface EnrollmentWithUserAndCourse extends EnrollmentDto {
    user?: UserDto;
    course?: CourseDto;
}

export default function EnrollmentsPage() {
    const [enrollments, setEnrollments] = useState<EnrollmentWithUserAndCourse[]>([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedEnrollment, setSelectedEnrollment] = useState<EnrollmentDto | null>(null)
    const [showForm, setShowForm] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [deletingId, setDeletingId] = useState<number | null>(null)
    const [editingId, setEditingId] = useState<number | null>(null)
    const itemsPerPage = 10

    const getStatusConfig = (status: string) => {
        switch (status) {
            case 'pending':
                return {
                    icon: <Clock4 className="h-4 w-4 text-yellow-500" />,
                    text: 'Chờ xử lý',
                    color: 'text-yellow-500'
                }
            case 'active':
                return {
                    icon: <CheckCircle2 className="h-4 w-4 text-green-500" />,
                    text: 'Hoạt động',
                    color: 'text-green-500'
                }
            case 'trial':
                return {
                    icon: <Timer className="h-4 w-4 text-blue-500" />,
                    text: 'Dùng thử',
                    color: 'text-blue-500'
                }
            case 'expired':
                return {
                    icon: <XCircle className="h-4 w-4 text-red-500" />,
                    text: 'Hết hạn',
                    color: 'text-red-500'
                }
            case 'cancelled':
                return {
                    icon: <AlertCircle className="h-4 w-4 text-gray-500" />,
                    text: 'Đã hủy',
                    color: 'text-gray-500'
                }
            default:
                return {
                    icon: <AlertCircle className="h-4 w-4 text-gray-500" />,
                    text: status,
                    color: 'text-gray-500'
                }
        }
    }

    const loadEnrollments = useCallback(async () => {
        setLoading(true)
        try {
            const response = await getEnrollments(currentPage, itemsPerPage)
            if (response.success && response.result) {
                const enrollmentsWithDetails = await Promise.all(
                    (Array.isArray(response.result) ? response.result : [response.result])
                    .map(async (enrollment) => {
                        const [userResponse, courseResponse] = await Promise.all([
                            getUserById(enrollment.user_id),
                            getCourseById(enrollment.course_id)
                        ])
                        return {
                            ...enrollment,
                            user: userResponse.success && userResponse.result ? userResponse.result as UserDto : undefined,
                            course: courseResponse.success && courseResponse.result ? courseResponse.result as CourseDto : undefined
                        }
                    })
                )
                setEnrollments(enrollmentsWithDetails)
                if (response.pagination) {
                    setTotalPages(response.pagination.totalPages)
                }
            } else {
                toast({
                    title: "Lỗi",
                    description: response.message || "Không thể tải danh sách đăng ký",
                    variant: "destructive"
                })
            }
        } catch (error) {
            toast({
                title: "Lỗi",
                description: "Không thể tải danh sách đăng ký",
                variant: "destructive"
            })
        }
        setLoading(false)
    }, [currentPage])

    useEffect(() => {
        loadEnrollments()
    }, [loadEnrollments])

    const handleCreateEnrollment = async (data: CreateEnrollmentDto | UpdateEnrollmentDto) => {
        setIsSubmitting(true)
        try {
            const response = await createEnrollment(data as CreateEnrollmentDto)
            if (response.success) {
                toast({
                    title: "Thành công",
                    description: "Tạo đăng ký mới thành công"
                })
                loadEnrollments()
                setShowForm(false)
            } else {
                toast({
                    title: "Lỗi",
                    description: response.message || "Không thể tạo đăng ký mới",
                    variant: "destructive"
                })
            }
        } catch (error) {
            toast({
                title: "Lỗi", 
                description: "Không thể tạo đăng ký mới",
                variant: "destructive"
            })
        }
        setIsSubmitting(false)
    }

    const handleUpdateEnrollment = async (data: CreateEnrollmentDto | UpdateEnrollmentDto) => {
        if (!selectedEnrollment?.id) return
        setIsSubmitting(true)
        setEditingId(selectedEnrollment.id)
        try {
            const response = await updateEnrollment(selectedEnrollment.id, data as UpdateEnrollmentDto)
            if (response.success) {
                toast({
                    title: "Thành công",
                    description: "Cập nhật thông tin thành công"
                })
                loadEnrollments()
                setShowForm(false)
                setSelectedEnrollment(null)
            } else {
                toast({
                    title: "Lỗi",
                    description: response.message || "Không thể cập nhật thông tin",
                    variant: "destructive"
                })
            }
        } catch (error) {
            toast({
                title: "Lỗi",
                description: "Không thể cập nhật thông tin",
                variant: "destructive"
            })
        }
        setIsSubmitting(false)
        setEditingId(null)
    }

    const handleDeleteEnrollment = async (id: number) => {
        setDeletingId(id)
        try {
            const response = await deleteEnrollment(id)
            if (response.success) {
                toast({
                    title: "Thành công",
                    description: "Xóa đăng ký thành công"
                })
                loadEnrollments()
            } else {
                toast({
                    title: "Lỗi",
                    description: response.message || "Không thể xóa đăng ký",
                    variant: "destructive"
                })
            }
        } catch (error) {
            toast({
                title: "Lỗi",
                description: "Không thể xóa đăng ký",
                variant: "destructive"
            })
        }
        setDeletingId(null)
    }

    const filteredEnrollments = enrollments.filter(enrollment =>
        enrollment.user?.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        enrollment.user?.first_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        enrollment.user?.last_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        enrollment.course?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        enrollment.status.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="container mx-auto py-10">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Quản lý đăng ký khóa học</h1>
                <Dialog open={showForm} onOpenChange={setShowForm}>
                    <DialogTrigger asChild>
                        <Button disabled={isSubmitting}>
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Đang xử lý...
                                </>
                            ) : (
                                'Thêm đăng ký'
                            )}
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{selectedEnrollment ? "Sửa thông tin" : "Thêm đăng ký mới"}</DialogTitle>
                            <DialogDescription>
                                {selectedEnrollment ? "Cập nhật thông tin đăng ký" : "Tạo đăng ký khóa học mới"}
                            </DialogDescription>
                        </DialogHeader>
                        <EnrollmentForm
                            initialData={selectedEnrollment}
                            onSubmit={selectedEnrollment ? handleUpdateEnrollment : handleCreateEnrollment}
                            onCancel={() => {
                                setShowForm(false)
                                setSelectedEnrollment(null)
                            }}
                            isSubmitting={isSubmitting}
                        />
                    </DialogContent>
                </Dialog>
            </div>

            <div className="flex items-center mb-6">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Tìm kiếm đăng ký..."
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
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ID</TableHead>
                                    <TableHead>Người dùng</TableHead>
                                    <TableHead>Khóa học</TableHead>
                                    <TableHead>Trạng thái</TableHead>
                                    <TableHead>Ngày hết hạn</TableHead>
                                    <TableHead>Thao tác</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredEnrollments.map((enrollment) => {
                                    const statusConfig = getStatusConfig(enrollment.status)
                                    return (
                                        <TableRow key={enrollment.id}>
                                            <TableCell>{enrollment.id}</TableCell>
                                            <TableCell>
                                                <div className="flex flex-col">
                                                    <span className="font-medium">
                                                        {enrollment.user?.first_name} {enrollment.user?.last_name}
                                                    </span>
                                                    <span className="text-sm text-gray-500">{enrollment.user?.email}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex flex-col">
                                                    <span className="font-medium">{enrollment.course?.name}</span>
                                                    <span className="text-sm text-gray-500">{enrollment.course?.price} VND</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    {statusConfig.icon}
                                                    <span className={`${statusConfig.color} font-medium`}>
                                                        {statusConfig.text}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell>{enrollment.expiration_date}</TableCell>
                                            <TableCell>
                                                <div className="flex space-x-2">
                                                    <Button 
                                                        variant="ghost" 
                                                        size="icon" 
                                                        onClick={() => {
                                                            setSelectedEnrollment(enrollment)
                                                            setShowForm(true)
                                                        }}
                                                        disabled={editingId === enrollment.id || deletingId === enrollment.id}
                                                    >
                                                        {editingId === enrollment.id ? (
                                                            <Loader2 className="h-4 w-4 animate-spin" />
                                                        ) : (
                                                            <Edit2 className="h-4 w-4" />
                                                        )}
                                                    </Button>
                                                    <Button 
                                                        variant="ghost" 
                                                        size="icon" 
                                                        onClick={() => handleDeleteEnrollment(enrollment.id!)}
                                                        disabled={deletingId === enrollment.id || editingId === enrollment.id}
                                                    >
                                                        {deletingId === enrollment.id ? (
                                                            <Loader2 className="h-4 w-4 animate-spin" />
                                                        ) : (
                                                            <Trash2 className="h-4 w-4" />
                                                        )}
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
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

interface EnrollmentFormProps {
    initialData?: EnrollmentDto | null
    onSubmit: (data: CreateEnrollmentDto | UpdateEnrollmentDto) => void
    onCancel: () => void
    isSubmitting: boolean
}

const EnrollmentForm = ({ initialData, onSubmit, onCancel, isSubmitting }: EnrollmentFormProps) => {
    const [formData, setFormData] = useState<CreateEnrollmentDto>({
        user_id: initialData?.user_id || 0,
        course_id: initialData?.course_id || 0,
        status: initialData?.status || 'pending',
        expiration_date: initialData?.expiration_date || ''
    })

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const date = new Date(e.target.value);
        const timestamp = Math.floor(date.getTime() / 1000).toString();
        setFormData({ ...formData, expiration_date: timestamp });
    }

    const formatDateForInput = (timestamp: string) => {
        if (!timestamp) return '';
        const date = new Date(parseInt(timestamp) * 1000);
        return date.toISOString().slice(0, 16);
    }

    return (
        <div className="grid gap-4 py-4">
            <div className="grid gap-2">
                <Label htmlFor="user_id">ID Người dùng</Label>
                <Input
                    id="user_id"
                    type="number"
                    value={formData.user_id || ''}
                    onChange={(e) => setFormData({ ...formData, user_id: parseInt(e.target.value) || 0 })}
                    disabled={isSubmitting}
                />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="course_id">ID Khóa học</Label>
                <Input
                    id="course_id"
                    type="number" 
                    value={formData.course_id || ''}
                    onChange={(e) => setFormData({ ...formData, course_id: parseInt(e.target.value) || 0 })}
                    disabled={isSubmitting}
                />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="status">Trạng thái</Label>
                <select
                    id="status"
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as EnrollmentDto['status'] })}
                    disabled={isSubmitting}
                >
                    <option value="pending">Chờ xử lý</option>
                    <option value="active">Hoạt động</option>
                    <option value="trial">Dùng thử</option>
                    <option value="expired">Hết hạn</option>
                    <option value="cancelled">Đã hủy</option>
                </select>
            </div>

            <div className="grid gap-2">
                <Label htmlFor="expiration_date">Ngày hết hạn</Label>
                <Input
                    id="expiration_date"
                    type="datetime-local"
                    value={formData.expiration_date ? formatDateForInput(formData.expiration_date) : ''}
                    onChange={handleDateChange}
                    disabled={isSubmitting}
                />
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
