"use client"

import { useState, useCallback, useEffect } from "react"
import { Search, Loader2, UserCog, Shield, Plus, Trash2, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
} from "@/components/ui/pagination"
import { toast } from "@/hooks/use-toast"
import { UserDto, RoleDto } from "@/lib/actions/user/user.dto"
import { getAllUsers, getAllRoles, assignRoleToUser, removeRoleFromUser, getUserRoles, checkRoleExistInUserRoles } from "@/lib/actions/user/user.action"

interface AssignRoleFormData {
    userId: number
    roleId: number
}

interface UserWithRoles extends UserDto {
    roles?: RoleDto[]
}

interface UserRoleTableProps {
    data: UserWithRoles[]
    onAssignRole: (userId: number) => void
    onRemoveRole: (userId: number, roleId: number) => void
    isLoading?: boolean
}

const UserRoleTable = ({ data, onAssignRole, onRemoveRole, isLoading }: UserRoleTableProps) => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Tên người dùng</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Vai trò</TableHead>
                    <TableHead>Thao tác</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((user) => (
                    <TableRow key={user.id}>
                        <TableCell>{user.id}</TableCell>
                        <TableCell className="font-medium">{user.username}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                            <div className="flex flex-wrap gap-2">
                                {user.roles?.map((role) => (
                                    <div key={role.id} className="flex items-center gap-1 bg-secondary px-2 py-1 rounded-md">
                                        <Shield className="h-3 w-3" />
                                        <span className="text-sm">{role.name}</span>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-4 w-4"
                                            onClick={() => onRemoveRole(user.id!, role.id!)}
                                            disabled={isLoading}
                                        >
                                            <Trash2 className="h-3 w-3" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </TableCell>
                        <TableCell>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onAssignRole(user.id!)}
                                disabled={isLoading}
                            >
                                <Plus className="mr-2 h-4 w-4" />
                                Thêm vai trò
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

const AssignRoleForm = ({
    onSubmit,
    onCancel,
    roles,
    userId,
    isSubmitting
}: {
    onSubmit: (data: AssignRoleFormData) => void
    onCancel: () => void
    roles: RoleDto[]
    userId: number
    isSubmitting?: boolean
}) => {
    const [selectedRole, setSelectedRole] = useState<number>(0)

    return (
        <div className="grid gap-4 py-4">
            <div className="grid gap-2">
                <Label>Vai trò</Label>
                <Select
                    value={selectedRole.toString()}
                    onValueChange={(value) => setSelectedRole(parseInt(value))}
                    disabled={isSubmitting}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Chọn vai trò" />
                    </SelectTrigger>
                    <SelectContent>
                        {roles.map((role) => (
                            <SelectItem key={role.id} value={role.id!.toString()}>
                                {role.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <DialogFooter>
                <Button variant="outline" onClick={onCancel} disabled={isSubmitting}>
                    Hủy
                </Button>
                <Button 
                    onClick={() => onSubmit({ userId, roleId: selectedRole })}
                    disabled={isSubmitting || !selectedRole}
                >
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Xác nhận
                </Button>
            </DialogFooter>
        </div>
    )
}

const RenderPage = () => {
    const [users, setUsers] = useState<UserWithRoles[]>([])
    const [roles, setRoles] = useState<RoleDto[]>([])
    const [loading, setLoading] = useState(true)
    const [actionLoading, setActionLoading] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [showForm, setShowForm] = useState(false)
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const itemsPerPage = 10

    const loadUsers = useCallback(async () => {
        setLoading(true)
        try {
            const [usersResponse, rolesResponse] = await Promise.all([
                getAllUsers(currentPage, itemsPerPage),
                getAllRoles()
            ])

            if (usersResponse.success && rolesResponse.success) {
                const users = usersResponse.result as UserDto[]
                const roles = rolesResponse.result as RoleDto[]
                setRoles(roles)

                if (usersResponse.pagination) {
                    setTotalPages(usersResponse.pagination.totalPages)
                }

                // Load roles for each user
                const usersWithRoles = await Promise.all(
                    users.map(async (user) => {
                        const userRoles = await getUserRoles(user.id!)
                        return {
                            ...user,
                            roles: userRoles.success ? (Array.isArray(userRoles.result) ? userRoles.result : [userRoles.result]).filter(Boolean) : []
                        } as UserWithRoles
                    })
                )
                setUsers(usersWithRoles)
            }
        } catch (error) {
            toast({
                title: "Lỗi",
                description: "Không thể tải danh sách người dùng và vai trò",
                variant: "destructive"
            })
        }
        setLoading(false)
    }, [currentPage])

    useEffect(() => {
        loadUsers()
    }, [loadUsers])

    const handleAssignRole = async (data: AssignRoleFormData) => {
        setActionLoading(true)
        try {
            // Check if role already exists
            const checkResponse = await checkRoleExistInUserRoles(data.userId, data.roleId)
            if (checkResponse.success && checkResponse.result) {
                toast({
                    title: "Thông báo",
                    description: "Người dùng đã có vai trò này",
                    variant: "destructive"
                })
                return
            }

            const response = await assignRoleToUser(data.userId, data.roleId)
            if (response.success) {
                toast({
                    title: "Thành công",
                    description: "Gán vai trò thành công"
                })
                loadUsers()
                setShowForm(false)
                setSelectedUserId(null)
            }
        } catch (error) {
            toast({
                title: "Lỗi",
                description: "Không thể gán vai trò",
                variant: "destructive"
            })
        }
        setActionLoading(false)
    }

    const handleRemoveRole = async (userId: number, roleId: number) => {
        setActionLoading(true)
        try {
            const response = await removeRoleFromUser(userId, roleId)
            if (response.success) {
                toast({
                    title: "Thành công",
                    description: "Xóa vai trò thành công"
                })
                loadUsers()
            }
        } catch (error) {
            toast({
                title: "Lỗi",
                description: "Không thể xóa vai trò",
                variant: "destructive"
            })
        }
        setActionLoading(false)
    }

    const filteredUsers = users.filter(user =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.roles?.some(role => role.name.toLowerCase().includes(searchQuery.toLowerCase()))
    )

    return (
        <div className="container mx-auto py-10">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                <h1 className="text-2xl font-bold">Quản lý phân quyền</h1>
            </div>

            <div className="flex items-center mb-6">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Tìm kiếm người dùng hoặc vai trò..."
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            <Dialog open={showForm} onOpenChange={setShowForm}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Gán vai trò</DialogTitle>
                        <DialogDescription>
                            Chọn vai trò để gán cho người dùng
                        </DialogDescription>
                    </DialogHeader>
                    <AssignRoleForm
                        onSubmit={handleAssignRole}
                        onCancel={() => {
                            setShowForm(false)
                            setSelectedUserId(null)
                        }}
                        roles={roles}
                        userId={selectedUserId!}
                        isSubmitting={actionLoading}
                    />
                </DialogContent>
            </Dialog>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <Loader2 className="h-6 w-6 animate-spin" />
                </div>
            ) : (
                <>
                    <div className="border rounded-md">
                        <UserRoleTable
                            data={filteredUsers}
                            onAssignRole={(userId) => {
                                setSelectedUserId(userId)
                                setShowForm(true)
                            }}
                            onRemoveRole={handleRemoveRole}
                            isLoading={actionLoading}
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

export default RenderPage


