"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileUpload } from "@/components/ui/upload/file-upload";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { Loader2, CreditCard, FileText, Send, AlertCircle } from "lucide-react";
import { getEnrollmentsByUserId } from "@/lib/actions/enrollment/enrollment.action";
import { getCourseById, checkCourseIsFree } from "@/lib/actions/course/course.action";
import { sendEmail } from "@/lib/actions/email.action";
import { EnrollmentDto } from "@/lib/actions/enrollment/enrollment.dto";
import { CourseDto } from "@/lib/actions/course/course.dto";
import { SparklesText } from "@/components/ui/animation/text/sparkles-text";
import { DotPattern } from "@/components/ui/bg/dot-bg";
import { MY_INFO } from "@/constants/my-info";

type EnrollmentWithCourse = EnrollmentDto & {
  course?: CourseDto;
}

export default function PagePayment() {
  const [enrollments, setEnrollments] = useState<EnrollmentWithCourse[]>([]);
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const fetchEnrollmentsWithCourses = async () => {
      if (!user?.userID) return;
      
      const response = await getEnrollmentsByUserId(Number(user.userID));
      if (response.success && Array.isArray(response.result)) {
        const pendingEnrollments = response.result.filter(
          enrollment => enrollment.status === "pending"
        );

        // Fetch course details and check if free for each enrollment
        const enrollmentsWithCourses = await Promise.all(
          pendingEnrollments.map(async (enrollment): Promise<EnrollmentWithCourse | null> => {
            if (!enrollment) return null;
            
            const courseResponse = await getCourseById(enrollment.course_id);
            const isFreeResponse = await checkCourseIsFree(enrollment.course_id);
            
            // Skip free courses
            if (isFreeResponse.success && isFreeResponse.result) {
              return null;
            }

            const course = courseResponse.success && courseResponse.result ? 
                          Array.isArray(courseResponse.result) ? 
                          courseResponse.result[0] : courseResponse.result 
                          : undefined;

            return {
              ...enrollment,
              course
            };
          })
        );
        
        // Filter out null values (free courses)
        const filteredEnrollments = enrollmentsWithCourses.filter((e): e is EnrollmentWithCourse => e !== null);
        setEnrollments(filteredEnrollments);
      }
      setIsLoading(false);
    };

    fetchEnrollmentsWithCourses();
  }, [user]);

  const handleSubmit = async () => {
    if (!uploadedFiles.length || !content.length) {
      toast({
        title: "Thiếu thông tin",
        description: "Vui lòng điền đầy đủ thông tin và tải lên ảnh thanh toán",
        variant: "destructive",
      });
      return;
    }

    // Check file size before processing
    const totalSize = uploadedFiles.reduce((sum, file) => sum + file.size, 0);
    const maxSize = 25 * 1024 * 1024; // 25MB max for email attachments
    if (totalSize > maxSize) {
      toast({
        title: "File quá lớn",
        description: "Tổng dung lượng file không được vượt quá 25MB",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const attachments = await Promise.all(
        uploadedFiles.map(async (file) => {
          const arrayBuffer = await file.arrayBuffer();
          return {
            filename: file.name,
            content: Buffer.from(arrayBuffer).toString('base64'),
            contentType: file.type,
          };
        })
      );

      const totalAmount = enrollments.reduce((sum, enrollment) => 
        sum + (enrollment.course?.price || 0), 0
      );

      const emailContent = `
        Thông tin thanh toán:
        Email: ${user?.email || MY_INFO.email}
        Số khóa học: ${enrollments.length}
        Tổng thanh toán: ${totalAmount.toLocaleString('vi-VN')}đ
        Nội dung: ${content}
      `;

      const sent = await sendEmail(user?.email || MY_INFO.email, emailContent, attachments);

      if (sent) {
        toast({
          title: "Gửi thành công",
          description: "Chúng tôi sẽ xác nhận thanh toán của bạn sớm nhất có thể",
        });
      } else {
        throw new Error("Failed to send email");
      }
    } catch (error) {
      let errorMessage = "Đã có lỗi xảy ra, vui lòng thử lại sau";
      if (error instanceof Error && error.message.includes("size limits")) {
        errorMessage = "File đính kèm vượt quá giới hạn cho phép (25MB)";
      }
      
      toast({
        title: "Gửi thất bại",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <Card className="w-full max-w-3xl mx-auto mt-8 text-center p-8">
        <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary mb-4" />
        <CardTitle className="mb-2">Đang tải...</CardTitle>
      </Card>
    );
  }

  if (!enrollments.length) {
    return (
      <Card className="w-full max-w-3xl mx-auto mt-8 text-center p-8">
        <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <CardTitle className="mb-2">Không có khóa học cần thanh toán</CardTitle>
        <p className="text-muted-foreground">Bạn chưa đăng ký khóa học nào cần thanh toán</p>
      </Card>
    );
  }

  return (
    <div className="relative">
      <DotPattern
        className="absolute inset-0 -z-10 h-full w-full opacity-50"
        width={32}
        height={32}
        cx={1}
        cy={1}
        cr={1}
      />
      
      <div className="container py-8">
        <SparklesText
          text="Thanh toán khóa học"
          className="text-glow !text-3xl mb-8 text-center"
        />

        <Card className="w-full max-w-3xl mx-auto backdrop-blur-sm bg-card/80">
          <CardContent className="space-y-8 p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-lg font-semibold text-primary">
                <CreditCard className="h-5 w-5" />
                <h3>Danh sách khóa học cần thanh toán</h3>
              </div>
              
              <div className="grid gap-4">
                {enrollments.map((enrollment, index) => (
                  <div key={enrollment.id} 
                    className="p-4 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{enrollment.course?.name || `Khóa học ${index + 1}`}</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {enrollment.course?.description || 'Không có mô tả'}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-primary">
                          {enrollment.course?.price?.toLocaleString('vi-VN')}đ
                        </p>
                        {enrollment.course?.discounted_price && (
                          <p className="text-sm text-muted-foreground line-through">
                            {enrollment.course.discounted_price.toLocaleString('vi-VN')}đ
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-lg font-semibold text-primary">
                <FileText className="h-5 w-5" />
                <h3>Tải lên ảnh thanh toán</h3>
              </div>
              <FileUpload
                onChange={(files) => setUploadedFiles(files)}
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-lg font-semibold text-primary">
                <Send className="h-5 w-5" />
                <h3>Nội dung thanh toán</h3>
              </div>
              <Textarea
                placeholder="Nhập nội dung thanh toán..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[100px] bg-muted/50"
              />
            </div>

            <div className="pt-4 border-t border-border">
              <Button 
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full text-lg py-6"
                size="lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Đang gửi...
                  </>
                ) : (
                  "Gửi xác nhận thanh toán"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
