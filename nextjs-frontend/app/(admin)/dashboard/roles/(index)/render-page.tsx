"use client";

import { useState, useCallback, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import {
  Loader2,
  Search,
  Plus,
  ChevronLeft,
  ChevronRight,
  Edit2,
  Trash2,
} from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";

import {
  getAllRoles,
  createRole,
  updateRole,
  deleteRole,
} from "@/lib/actions/user/user.action";
import type {
  RoleDto,
  CreateRoleDto,
  UpdateRoleDto,
} from "@/lib/actions/user/user.dto";

interface RoleFormData {
  name: string;
  description: string | null;
}

interface RoleTableProps {
  data: RoleDto[];
  onEdit: (role: RoleDto) => void;
  onDelete: (roleId: number) => void;
  deletingId: number | null;
}

const RoleTable = ({ data, onEdit, onDelete, deletingId }: RoleTableProps) => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Tên vai trò</TableHead>
            <TableHead>Mô tả</TableHead>
            <TableHead>Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((role) => (
            <TableRow key={role.id}>
              <TableCell>{role.id}</TableCell>
              <TableCell className="font-medium">{role.name}</TableCell>
              <TableCell>{role.description}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(role)}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(role.id!)}
                    disabled={deletingId === role.id}
                  >
                    {deletingId === role.id ? (
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
  );
};

const RoleForm = ({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting,
}: {
  initialData?: Partial<RoleFormData>;
  onSubmit: (data: RoleFormData) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}) => {
  const [formData, setFormData] = useState<RoleFormData>({
    name: initialData?.name || "",
    description: initialData?.description || null,
  });

  return (
    <div className="grid gap-4 py-4">
      <div className="grid gap-2">
        <Label htmlFor="name">Tên vai trò</Label>
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
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value || null })
          }
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
            "Lưu"
          )}
        </Button>
      </DialogFooter>
    </div>
  );
};

export default function RolesPage() {
  const [roles, setRoles] = useState<RoleDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState<RoleDto | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const itemsPerPage = 10;

  const loadRoles = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getAllRoles(currentPage, itemsPerPage);
      if (response.success && response.result) {
        setRoles(
          Array.isArray(response.result) ? response.result : [response.result]
        );
        if (response.pagination) {
          setTotalPages(response.pagination.totalPages);
        }
      }
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Không thể tải danh sách vai trò",
        variant: "destructive",
      });
    }
    setLoading(false);
  }, [currentPage]);

  useEffect(() => {
    loadRoles();
  }, [loadRoles]);

  const handleCreateRole = async (data: RoleFormData) => {
    setIsSubmitting(true);
    try {
      const createRoleData: CreateRoleDto = {
        name: data.name,
        description: data.description,
      };
      const response = await createRole(createRoleData);
      if (response.success) {
        toast({
          title: "Thành công",
          description: "Tạo vai trò mới thành công",
        });
        loadRoles();
        setShowForm(false);
      }
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Không thể tạo vai trò mới",
        variant: "destructive",
      });
    }
    setIsSubmitting(false);
  };

  const handleUpdateRole = async (data: RoleFormData) => {
    if (!selectedRole?.id) return;
    setIsSubmitting(true);
    try {
      const updateRoleData: UpdateRoleDto = {
        name: data.name,
        description: data.description,
      };
      const response = await updateRole(selectedRole.id, updateRoleData);
      if (response.success) {
        toast({
          title: "Thành công",
          description: "Cập nhật vai trò thành công",
        });
        loadRoles();
        setShowForm(false);
        setSelectedRole(null);
      }
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Không thể cập nhật vai trò",
        variant: "destructive",
      });
    }
    setIsSubmitting(false);
  };

  const handleDeleteRole = async (roleId: number) => {
    setDeletingId(roleId);
    try {
      const response = await deleteRole(roleId);
      if (response.success) {
        toast({
          title: "Thành công",
          description: "Xóa vai trò thành công",
        });
        loadRoles();
      }
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Không thể xóa vai trò",
        variant: "destructive",
      });
    }
    setDeletingId(null);
  };

  const filteredRoles = roles.filter(
    (role) =>
      role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      role.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản lý vai trò</h1>
        <Dialog open={showForm} onOpenChange={setShowForm}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Thêm vai trò
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {selectedRole ? "Sửa vai trò" : "Thêm vai trò mới"}
              </DialogTitle>
              <DialogDescription>
                {selectedRole
                  ? "Cập nhật thông tin vai trò"
                  : "Tạo vai trò mới trong hệ thống"}
              </DialogDescription>
            </DialogHeader>
            <RoleForm
              initialData={selectedRole || undefined}
              onSubmit={selectedRole ? handleUpdateRole : handleCreateRole}
              onCancel={() => {
                setShowForm(false);
                setSelectedRole(null);
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
            placeholder="Tìm kiếm vai trò..."
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
          <RoleTable
            data={filteredRoles}
            onEdit={(role) => {
              setSelectedRole(role);
              setShowForm(true);
            }}
            onDelete={handleDeleteRole}
            deletingId={deletingId}
          />

          <div className="mt-4 flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => setCurrentPage(page)}
                        isActive={currentPage === page}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  )
                )}
                <PaginationItem>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
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
  );
}
