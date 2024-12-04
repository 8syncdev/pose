"use client"

import { useState, useCallback, useEffect, useMemo, useTransition, memo, use } from "react"
import { useRouter } from "next/navigation"
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
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { Loader2, MoreHorizontal, Plus, Search, UserPlus, ChevronLeft, ChevronRight, Edit2, Trash2, UserCheck, UserX } from "lucide-react"
import { getAllUsers, createUser, updateUser, deleteUser, checkRoleExistInUserRoles, getUserRoles } from "@/lib/actions/user/user.action"
import type { User, UserDto, UserResponse, Role, RoleDto, RoleResponse } from "@/lib/actions/user/user.dto"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { useAuth } from "@/hooks/use-auth"

interface UserTableProps {
    data: (UserDto & { roles?: RoleDto[] })[]
    onEdit: (user: UserDto & { roles?: RoleDto[] }) => void
    onDelete: (userId: number) => Promise<void>
    deletingId: number | null
    editingId: number | null
    currentUserId: number
}

const UserTable = memo(({ data, onEdit, onDelete, deletingId, editingId, currentUserId }: UserTableProps) => {
    const [userRoles, setUserRoles] = useState<{[key: number]: RoleDto[]}>({})
    const [isPending, startTransition] = useTransition()

    useEffect(() => {
        const loadUserRoles = async () => {
            const promises = data.map(async user => {
                if (user.id) {
                    try {
                        const response = await getUserRoles(user.id)
                        if (response.success && response.result) {
                            const roles = Array.isArray(response.result) ? response.result : [response.result]
                            return { id: user.id, roles }
                        }
                    } catch (error) {
                        console.error(`Error loading roles for user ${user.id}:`, error)
                    }
                }
                return null
            })

            const results = await Promise.all(promises)
            const newUserRoles = results.reduce((acc, curr) => {
                if (curr) {
                    acc[curr.id] = curr.roles
                }
                return acc
            }, {} as {[key: number]: RoleDto[]})

            setUserRoles(newUserRoles)
        }

        startTransition(() => {
            loadUserRoles()
        })
    }, [data])

    const canDeleteUser = useCallback(async (userId: number): Promise<boolean> => {
        if (userId === currentUserId) return false

        try {
            const response = await checkRoleExistInUserRoles(userId, currentUserId)
            return !(response.success && response.result)
        } catch (error) {
            console.error("Error checking user roles:", error)
            return false
        }
    }, [currentUserId])

    return (
        <div className="overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[50px]">ID</TableHead>
                        <TableHead className="w-[150px]">Tên đăng nhập</TableHead>
                        <TableHead className="w-[200px]">Họ và tên</TableHead>
                        <TableHead className="w-[200px]">Email</TableHead>
                        <TableHead className="w-[150px]">Điện thoại</TableHead>
                        <TableHead className="w-[200px]">Vai trò</TableHead>
                        <TableHead className="w-[120px]">Trạng thái</TableHead>
                        <TableHead className="w-[100px]">Thao tác</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell className="font-medium">{user.id}</TableCell>
                            <TableCell>{user.username}</TableCell>
                            <TableCell>{`${user.first_name || ''} ${user.last_name || ''}`}</TableCell>
                            <TableCell className="truncate max-w-[200px]">{user.email}</TableCell>
                            <TableCell>{user.phone}</TableCell>
                            <TableCell className="truncate max-w-[200px]">
                                {userRoles[user.id!]?.map(role => role.name).join(', ') || ''}
                            </TableCell>
                            <TableCell>
                                {user.is_active ? (
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                        <UserCheck className="w-4 h-4 mr-1" />
                                        Hoạt động
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                        <UserX className="w-4 h-4 mr-1" />
                                        Không hoạt động
                                    </span>
                                )}
                            </TableCell>
                            <TableCell>
                                <div className="flex space-x-2">
                                    <Button 
                                        variant="ghost" 
                                        size="icon" 
                                        onClick={() => onEdit({...user, roles: userRoles[user.id!] || []})}
                                        disabled={editingId === user.id}
                                    >
                                        {editingId === user.id ? (
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                        ) : (
                                            <Edit2 className="h-4 w-4" />
                                        )}
                                    </Button>
                                    <Button 
                                        variant="ghost" 
                                        size="icon"
                                        onClick={async () => {
                                            if (await canDeleteUser(user.id!)) {
                                                await onDelete(user.id!)
                                            } else {
                                                toast({
                                                    title: "Không thể xóa",
                                                    description: "Không thể xóa chính mình hoặc người dùng có cùng quyền",
                                                    variant: "destructive"
                                                })
                                            }
                                        }}
                                        disabled={deletingId === user.id}
                                    >
                                        {deletingId === user.id ? (
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
})

UserTable.displayName = 'UserTable'

interface UserFormData {
    username: string
    password: string
    email: string | null
    phone: string | null
    first_name: string | null
    last_name: string | null
    profile_picture: string | null
    bio: string | null
    is_active: boolean
    is_verified: boolean
    preferred_language: string | null
    timezone: string | null
}

const UserForm = memo(({
    initialData,
    onSubmit,
    onCancel,
    isSubmitting
}: {
    initialData?: Partial<UserFormData>
    onSubmit: (data: UserFormData) => void
    onCancel: () => void
    isSubmitting: boolean
}) => {
    const [formData, setFormData] = useState<UserFormData>({
        username: initialData?.username || "",
        password: "",
        email: initialData?.email || null,
        phone: initialData?.phone || null,
        first_name: initialData?.first_name || null,
        last_name: initialData?.last_name || null,
        profile_picture: initialData?.profile_picture || null,
        bio: initialData?.bio || null,
        is_active: initialData?.is_active || false,
        is_verified: initialData?.is_verified || false,
        preferred_language: initialData?.preferred_language || null,
        timezone: initialData?.timezone || null
    })

    return (
        <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="username">Tên đăng nhập</Label>
                    <Input
                        id="username"
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    />
                </div>
                {!initialData && (
                    <div className="grid gap-2">
                        <Label htmlFor="password">Mật khẩu</Label>
                        <Input
                            id="password"
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="first_name">Họ</Label>
                    <Input
                        id="first_name"
                        value={formData.first_name || ""}
                        onChange={(e) => setFormData({ ...formData, first_name: e.target.value || null })}
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="last_name">Tên</Label>
                    <Input
                        id="last_name"
                        value={formData.last_name || ""}
                        onChange={(e) => setFormData({ ...formData, last_name: e.target.value || null })}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        value={formData.email || ""}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value || null })}
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="phone">Điện thoại</Label>
                    <Input
                        id="phone"
                        value={formData.phone || ""}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value || null })}
                    />
                </div>
            </div>

            <div className="grid gap-2">
                <Label htmlFor="bio">Giới thiệu</Label>
                <Textarea
                    id="bio"
                    value={formData.bio || ""}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value || null })}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                    <Switch
                        id="is_active"
                        checked={formData.is_active}
                        onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                    />
                    <Label htmlFor="is_active">Hoạt động</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <Switch
                        id="is_verified"
                        checked={formData.is_verified}
                        onCheckedChange={(checked) => setFormData({ ...formData, is_verified: checked })}
                    />
                    <Label htmlFor="is_verified">Đã xác thực</Label>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="preferred_language">Ngôn ngữ</Label>
                    <Input
                        id="preferred_language"
                        value={formData.preferred_language || ""}
                        onChange={(e) => setFormData({ ...formData, preferred_language: e.target.value || null })}
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="timezone">Múi giờ</Label>
                    <Input
                        id="timezone"
                        value={formData.timezone || ""}
                        onChange={(e) => setFormData({ ...formData, timezone: e.target.value || null })}
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
                            Đang lưu...
                        </>
                    ) : (
                        'Lưu'
                    )}
                </Button>
            </DialogFooter>
        </div>
    )
})

UserForm.displayName = 'UserForm'

export default function UsersPage() {
    const [users, setUsers] = useState<UserDto[]>([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedUser, setSelectedUser] = useState<UserDto | null>(null)
    const [showForm, setShowForm] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [deletingId, setDeletingId] = useState<number | null>(null)
    const [editingId, setEditingId] = useState<number | null>(null)
    const router = useRouter()
    const itemsPerPage = 10

    const { user } = useAuth()

    // Create a promise for loading users
    const usersPromise = useCallback(async () => {
        try {
            const response = await getAllUsers(currentPage, itemsPerPage)
            if (response.success && response.result) {
                const userResults = Array.isArray(response.result) ? response.result : [response.result]
                return {
                    users: userResults.filter((user): user is UserDto => user !== undefined),
                    totalPages: response.pagination?.totalPages || 1
                }
            }
            throw new Error("Failed to load users")
        } catch (error) {
            console.error("Error loading users:", error)
            throw error
        }
    }, [currentPage])

    // Use the new use hook for data fetching
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const data = await usersPromise()
                setUsers(data.users)
                setTotalPages(data.totalPages)
            } catch (error) {
                toast({
                    title: "Lỗi",
                    description: "Không thể tải danh sách người dùng",
                    variant: "destructive"
                })
            }
            setLoading(false)
        }

        fetchData()
    }, [usersPromise])

    const handlePageChange = async (page: number) => {
        setLoading(true)
        setCurrentPage(page)
        try {
            const data = await usersPromise()
            setUsers(data.users)
            setTotalPages(data.totalPages)
        } catch (error) {
            toast({
                title: "Lỗi",
                description: "Không thể tải danh sách người dùng",
                variant: "destructive"
            })
        }
        setLoading(false)
    }

    const handleCreateUser = async (data: UserFormData) => {
        setIsSubmitting(true)
        try {
            const response = await createUser({
                username: data.username,
                password: data.password
            })
            
            if (response.success) {
                const updatedData = await usersPromise()
                setUsers(updatedData.users)
                setTotalPages(updatedData.totalPages)
                
                toast({
                    title: "Thành công",
                    description: "Tạo người dùng mới thành công"
                })
                setShowForm(false)
            } else {
                throw new Error("Failed to create user")
            }
        } catch (error) {
            toast({
                title: "Lỗi",
                description: "Không thể tạo người dùng mới",
                variant: "destructive"
            })
        }
        setIsSubmitting(false)
    }

    const handleUpdateUser = async (data: UserFormData) => {
        if (!selectedUser?.id) return
        setIsSubmitting(true)
        setEditingId(selectedUser.id)
        
        try {
            const response = await updateUser(selectedUser.id, {
                username: data.username,
                email: data.email,
                phone: data.phone,
                first_name: data.first_name,
                last_name: data.last_name,
                profile_picture: data.profile_picture,
                bio: data.bio,
                is_active: data.is_active,
                is_verified: data.is_verified,
                preferred_language: data.preferred_language,
                timezone: data.timezone
            })

            if (response.success) {
                const updatedData = await usersPromise()
                setUsers(updatedData.users)
                setTotalPages(updatedData.totalPages)
                
                toast({
                    title: "Thành công",
                    description: "Cập nhật thông tin thành công"
                })
                setShowForm(false)
                setSelectedUser(null)
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

    const handleDeleteUser = async (userId: number) => {
        setDeletingId(userId)
        try {
            const response = await deleteUser(userId)
            if (response.success) {
                const updatedData = await usersPromise()
                setUsers(updatedData.users)
                setTotalPages(updatedData.totalPages)
                
                toast({
                    title: "Thành công",
                    description: "Xóa người dùng thành công"
                })
            }
        } catch (error) {
            toast({
                title: "Lỗi", 
                description: "Không thể xóa người dùng",
                variant: "destructive"
            })
        }
        setDeletingId(null)
    }

    const filteredUsers = useMemo(() => {
        return users.filter(user => {
            const searchStr = searchQuery.toLowerCase()
            return (
                user.username?.toLowerCase().includes(searchStr) ||
                user.email?.toLowerCase().includes(searchStr) ||
                user.phone?.toLowerCase().includes(searchStr) ||
                `${user.first_name} ${user.last_name}`.toLowerCase().includes(searchStr)
            )
        })
    }, [users, searchQuery])
    
    return (
        <div className="container mx-auto py-10 px-4">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <h1 className="text-2xl font-bold">Quản lý người dùng</h1>
                <Dialog open={showForm} onOpenChange={setShowForm}>
                    <DialogTrigger asChild>
                        <Button>
                            <UserPlus className="mr-2 h-4 w-4" />
                            Thêm người dùng
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                        <DialogHeader>
                            <DialogTitle>{selectedUser ? "Sửa thông tin" : "Thêm người dùng mới"}</DialogTitle>
                            <DialogDescription>
                                {selectedUser ? "Cập nhật thông tin người dùng" : "Tạo tài khoản người dùng mới"}
                            </DialogDescription>
                        </DialogHeader>
                        <UserForm
                            initialData={selectedUser ? {
                                username: selectedUser.username,
                                email: selectedUser.email,
                                phone: selectedUser.phone,
                                first_name: selectedUser.first_name,
                                last_name: selectedUser.last_name,
                                profile_picture: selectedUser.profile_picture,
                                bio: selectedUser.bio,
                                is_active: selectedUser.is_active,
                                is_verified: selectedUser.is_verified,
                                preferred_language: selectedUser.preferred_language,
                                timezone: selectedUser.timezone,
                                password: ""
                            } : undefined}
                            onSubmit={selectedUser ? handleUpdateUser : handleCreateUser}
                            onCancel={() => {
                                setShowForm(false)
                                setSelectedUser(null)
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
                        placeholder="Tìm kiếm người dùng..."
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
                    <UserTable
                        data={filteredUsers}
                        onEdit={(user) => {
                            setSelectedUser(user)
                            setShowForm(true)
                        }}
                        onDelete={handleDeleteUser}
                        deletingId={deletingId}
                        editingId={editingId}
                        currentUserId={Number(user?.userID) || 0}
                    />

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
