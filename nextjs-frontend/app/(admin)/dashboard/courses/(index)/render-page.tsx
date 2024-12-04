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
import { Switch } from "@/components/ui/switch";
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
  BookOpen,
  DoorClosed,
  DollarSign,
} from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  getAllCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  getAllCategories,
} from "@/lib/actions/course/course.action";
import type {
  CourseDto,
  CategoryDto,
  CreateCourseDto,
  UpdateCourseDto,
} from "@/lib/actions/course/course.dto";

interface CourseFormData {
  name: string;
  description: string;
  img_url: string;
  price: number;
  discounted_price: number | null;
  difficulty_level: "Beginner" | "Intermediate" | "Advanced";
  duration_hours: number | null;
  is_published: boolean;
}

interface CourseTableProps {
  data: CourseDto[];
  onEdit: (course: CourseDto) => void;
  onDelete: (courseId: number) => void;
}

const CourseTable = ({ data, onEdit, onDelete }: CourseTableProps) => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Tên khóa học</TableHead>
            <TableHead>Giá</TableHead>
            <TableHead>Độ khó</TableHead>
            <TableHead>Thời lượng</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((course) => (
            <TableRow key={course.id}>
              <TableCell>{course.id}</TableCell>
              <TableCell className="font-medium">{course.name}</TableCell>
              <TableCell>
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-1" />
                  {course.price.toLocaleString()}
                </div>
              </TableCell>
              <TableCell>{course.difficulty_level}</TableCell>
              <TableCell>{course.duration_hours} giờ</TableCell>
              <TableCell>
                {course.is_published ? (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <BookOpen className="w-4 h-4 mr-1" />
                    Đã xuất bản
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    <DoorClosed className="w-4 h-4 mr-1" />
                    Nháp
                  </span>
                )}
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(course)}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(course.id!)}
                  >
                    <Trash2 className="h-4 w-4" />
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

const CourseForm = ({
  initialData,
  onSubmit,
  onCancel,
}: {
  initialData?: Partial<CourseFormData>;
  onSubmit: (data: CourseFormData) => void;
  onCancel: () => void;
}) => {
  const [formData, setFormData] = useState<CourseFormData>({
    name: initialData?.name || "",
    description: initialData?.description || "",
    img_url: initialData?.img_url || "",
    price: initialData?.price || 0,
    discounted_price: initialData?.discounted_price || null,
    difficulty_level: initialData?.difficulty_level || "Beginner",
    duration_hours: initialData?.duration_hours || null,
    is_published: initialData?.is_published || false,
  });

  return (
    <div className="grid gap-4 py-4">
      <div className="grid gap-2">
        <Label htmlFor="name">Tên khóa học</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="description">Mô tả</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="img_url">URL hình ảnh</Label>
        <Input
          id="img_url"
          value={formData.img_url}
          onChange={(e) =>
            setFormData({ ...formData, img_url: e.target.value })
          }
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="price">Giá</Label>
          <Input
            id="price"
            type="number"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: Number(e.target.value) })
            }
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="discounted_price">Giá khuyến mãi</Label>
          <Input
            id="discounted_price"
            type="number"
            value={formData.discounted_price || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                discounted_price: e.target.value
                  ? Number(e.target.value)
                  : null,
              })
            }
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="difficulty_level">Độ khó</Label>
          <Select
            value={formData.difficulty_level}
            onValueChange={(value: "Beginner" | "Intermediate" | "Advanced") =>
              setFormData({ ...formData, difficulty_level: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Chọn độ khó" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Beginner">Cơ bản</SelectItem>
              <SelectItem value="Intermediate">Trung bình</SelectItem>
              <SelectItem value="Advanced">Nâng cao</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="duration_hours">Thời lượng (giờ)</Label>
          <Input
            id="duration_hours"
            type="number"
            value={formData.duration_hours || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                duration_hours: e.target.value ? Number(e.target.value) : null,
              })
            }
          />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="is_published"
          checked={formData.is_published}
          onCheckedChange={(checked) =>
            setFormData({ ...formData, is_published: checked })
          }
        />
        <Label htmlFor="is_published">Xuất bản</Label>
      </div>

      <DialogFooter>
        <Button variant="outline" onClick={onCancel}>
          Hủy
        </Button>
        <Button onClick={() => onSubmit(formData)}>Lưu</Button>
      </DialogFooter>
    </div>
  );
};

export default function CoursesPage() {
  const [courses, setCourses] = useState<CourseDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState<CourseDto | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  const loadCourses = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getAllCourses(currentPage, itemsPerPage);
      if (response.success && response.result) {
        setCourses(
          Array.isArray(response.result) ? response.result : [response.result]
        );
        if (response.pagination) {
          setTotalPages(response.pagination.totalPages);
        }
      }
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Không thể tải danh sách khóa học",
        variant: "destructive",
      });
    }
    setLoading(false);
  }, [currentPage]);

  useEffect(() => {
    loadCourses();
  }, [loadCourses]);

  const handleCreateCourse = async (data: CourseFormData) => {
    try {
      const response = await createCourse(data as CreateCourseDto);
      if (response.success) {
        toast({
          title: "Thành công",
          description: "Tạo khóa học mới thành công",
        });
        loadCourses();
        setShowForm(false);
      }
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Không thể tạo khóa học mới",
        variant: "destructive",
      });
    }
  };

  const handleUpdateCourse = async (data: CourseFormData) => {
    if (!selectedCourse?.id) return;
    try {
      const response = await updateCourse(
        selectedCourse.id,
        data as UpdateCourseDto
      );
      if (response.success) {
        toast({
          title: "Thành công",
          description: "Cập nhật khóa học thành công",
        });
        loadCourses();
        setShowForm(false);
        setSelectedCourse(null);
      }
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Không thể cập nhật khóa học",
        variant: "destructive",
      });
    }
  };

  const handleDeleteCourse = async (courseId: number) => {
    try {
      const response = await deleteCourse(courseId);
      if (response.success) {
        toast({
          title: "Thành công",
          description: "Xóa khóa học thành công",
        });
        loadCourses();
      }
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Không thể xóa khóa học",
        variant: "destructive",
      });
    }
  };

  const filteredCourses = courses.filter(
    (course) =>
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản lý khóa học</h1>
        <Dialog open={showForm} onOpenChange={setShowForm}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Thêm khóa học
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {selectedCourse ? "Sửa khóa học" : "Thêm khóa học mới"}
              </DialogTitle>
              <DialogDescription>
                {selectedCourse
                  ? "Cập nhật thông tin khóa học"
                  : "Tạo khóa học mới trong hệ thống"}
              </DialogDescription>
            </DialogHeader>
            <CourseForm
              initialData={selectedCourse || undefined}
              onSubmit={
                selectedCourse ? handleUpdateCourse : handleCreateCourse
              }
              onCancel={() => {
                setShowForm(false);
                setSelectedCourse(null);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm khóa học..."
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
          <CourseTable
            data={filteredCourses}
            onEdit={(course) => {
              setSelectedCourse(course);
              setShowForm(true);
            }}
            onDelete={handleDeleteCourse}
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
