"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { createEnrollment } from "@/lib/actions/enrollment/enrollment.action";
import { checkCourseIsFree } from "@/lib/actions/course/course.action";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

interface CourseActionsProps {
  courseId: number;
}

export const CourseActions = ({ courseId }: CourseActionsProps) => {
  const router = useRouter();
  const { user, loading } = useAuth();
  const { toast } = useToast();
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [isFree, setIsFree] = useState(false);
  const [checkingFree, setCheckingFree] = useState(true);

  useEffect(() => {
    const checkFree = async () => {
      try {
        const response = await checkCourseIsFree(courseId);
        if (response.success && response.result !== undefined) {
          setIsFree(response.result);
        }
      } catch (error) {
        console.error("Failed to check if course is free:", error);
      } finally {
        setCheckingFree(false);
      }
    };

    checkFree();
  }, [courseId]);

  const handleEnrollCourse = async () => {
    if (loading) {
      return; // Wait for auth check to complete
    }

    if (!user) {
      router.push("/sign-in");
      return;
    }

    try {
      setIsEnrolling(true);
      const response = await createEnrollment({
        user_id: Number(user.userID),
        course_id: courseId,
        status: "pending",
      });

      if (response.success) {
        router.push('/learning')
        toast({
          title: "Đăng ký thành công",
          description: "Bạn đã đăng ký khóa học thành công!",
          variant: "default",
        });
        router.refresh();
      } else {
        toast({
          title: "Đăng ký thất bại",
          description: response.message || "Đã có lỗi xảy ra khi đăng ký khóa học",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Failed to enroll:", error);
      toast({
        title: "Đăng ký thất bại",
        description: "Đã có lỗi xảy ra khi đăng ký khóa học",
        variant: "destructive",
      });
    } finally {
      setIsEnrolling(false);
    }
  };

  if (checkingFree) {
    return (
      <CardFooter className="flex justify-center">
        <Button disabled className="w-full btn-primary btn-lg">
          <Loader2 className="animate-spin" />
          Đang kiểm tra...
        </Button>
      </CardFooter>
    );
  }

  return (
    <CardFooter className="flex justify-center">
      <Button 
        className="w-full btn-primary btn-lg hover-scale" 
        size="lg"
        onClick={handleEnrollCourse}
        disabled={loading || isEnrolling}
      >
        {isEnrolling ? (
          <>
            <Loader2 className="animate-spin" />
            Đang đăng ký...
          </>
        ) : (
          isFree ? "Vào Học Ngay" : "Đăng Ký Ngay"
        )}
      </Button>
    </CardFooter>
  );
};