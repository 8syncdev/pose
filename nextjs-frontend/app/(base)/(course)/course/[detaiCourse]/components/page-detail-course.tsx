"use client";

import { useCallback, useEffect, useMemo, useRef, useState, memo } from "react";
import { motion } from "framer-motion";
import { GridPattern } from "@/components/ui/bg/grid-bg";
import { createAnimation, createStaggerAnimation } from "@/components/hoc/framer.config";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

// Import actions
import {
  getCourseById,
  getChaptersByCourseId,
  getLessonsByChapterId
} from "@/lib/actions/course/course.action";
import { checkEnrollmentInCourse } from "@/lib/actions/enrollment/enrollment.action";

// Import types
import type {
  Course as CourseType,
  Chapter,
  Lesson,
  ChapterResponse,
  LessonResponse
} from "@/lib/actions/course/course.dto";

// Import components from @course-detail
import { CourseImage } from "@/components/course-detail/course-image";
import { CourseHeader } from "@/components/course-detail/course-header";
import { CourseContent as CourseContentComponent } from "@/components/course-detail/course-content";
import { CoursePricing } from "@/components/course-detail/course-pricing";
import { CourseActions } from "@/components/course-detail/course-actions";
import { CourseTabs } from "@/components/course-detail/course-tabs";
import { CourseLoading } from "@/components/course-detail/course-loading";
import { CourseNotFound } from "@/components/course-detail/course-not-found";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";

// Animation configs
const containerAnimation = createStaggerAnimation({
  duration: 0.3,
  staggerChildren: 0.1
});

const gridAnimation = createAnimation({
  initialScale: 0.95,
  targetScale: 1,
  duration: 0.5
});

interface PageDetailCourseProps {
  courseId: string;
}

interface CourseState {
  course: CourseType | null;
  chaptersResponse: ChapterResponse;
  lessonsByChapter: Record<number, LessonResponse>;
  loading: boolean;
}

const initialState: CourseState = {
  course: null,
  chaptersResponse: {
    success: false,
    message: '',
    result: [],
    pagination: {
      count: 0,
      pageSize: 10,
      totalPages: 0,
      current: 1
    }
  },
  lessonsByChapter: {},
  loading: true
};

const MemoizedCourseImage = memo(CourseImage);
const MemoizedCourseHeader = memo(CourseHeader);
const MemoizedCoursePricing = memo(CoursePricing);
const MemoizedCourseActions = memo(CourseActions);
const MemoizedCourseTabs = memo(CourseTabs);

const PageDetailCourse = memo(({ courseId }: PageDetailCourseProps) => {
  const router = useRouter();
  const { user } = useAuth();
  const timelineRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<CourseState>(initialState);
  const abortControllerRef = useRef<AbortController>();

  const checkEnrollment = useCallback(async () => {
    if (!user?.userID) return;

    try {
      const response = await checkEnrollmentInCourse(Number(user.userID), Number(courseId));
      if (response.success && response.result) {
        router.push(`/learning`);
      }
    } catch (error) {
      console.error('Error checking enrollment:', error);
    }
  }, [courseId, user?.userID, router]);

  const fetchCourseDetails = useCallback(async () => {
    try {
      const response = await getCourseById(Number(courseId));
      if (response.result) {
        const courseData = Array.isArray(response.result) ? response.result[0] : response.result;
        setState(prev => ({
          ...prev,
          course: courseData
        }));
      }
    } catch (error) {
      console.error('Error loading course:', error);
    }
  }, [courseId]);

  const fetchChapters = useCallback(async () => {
    try {
      const chaptersResponse = await getChaptersByCourseId(Number(courseId));

      if (chaptersResponse.result) {
        const chaptersData = Array.isArray(chaptersResponse.result) 
          ? chaptersResponse.result 
          : [chaptersResponse.result];

        const lessonsPromises = chaptersData.map(chapter => 
          getLessonsByChapterId(chapter.id!)
        );

        const lessonsResponses = await Promise.all(lessonsPromises);
        const lessonsMap = lessonsResponses.reduce((acc, response, index) => {
          if (chaptersData[index]?.id) {
            acc[chaptersData[index].id!] = response;
          }
          return acc;
        }, {} as Record<number, LessonResponse>);

        setState(prev => ({
          ...prev,
          chaptersResponse,
          lessonsByChapter: lessonsMap
        }));
      }
    } catch (error) {
      console.error('Error loading chapters:', error);
    }
  }, [courseId]);

  useEffect(() => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = new AbortController();

    const fetchData = async () => {
      setState(prev => ({ ...prev, loading: true }));
      await Promise.all([
        checkEnrollment(),
        fetchCourseDetails(),
        fetchChapters()
      ]);
      setState(prev => ({ ...prev, loading: false }));
    };

    fetchData();

    return () => {
      abortControllerRef.current?.abort();
    };
  }, [fetchCourseDetails, fetchChapters, checkEnrollment]);

  const formattedCourse = useMemo(() => {
    if (!state.course) return null;
    return {
      title: state.course.name,
      description: state.course.description || '',
      image: state.course.img_url || '',
      price: state.course.price,
      duration: state.course.duration_hours || 0,
      level: state.course.difficulty_level || 'Beginner',
      discountedPrice: state.course.discounted_price
    };
  }, [state.course]);

  if (state.loading) return <CourseLoading />;
  if (!formattedCourse) return <CourseNotFound />;

  return (
    <div className="min-h-screen relative backdrop-blur">
      <GridPattern
        className="absolute inset-0 opacity-10"
        {...gridAnimation}
      />
      <div className="container py-8 relative" ref={timelineRef}>
        <motion.div
          variants={containerAnimation}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <motion.div className="col-span-1">
            <Card className="overflow-hidden shadow-custom hover:border-glow transition-all duration-500">
              <MemoizedCourseImage
                image={formattedCourse.image}
                title={formattedCourse.title}
                timelineRef={timelineRef}
              />
            </Card>
          </motion.div>

          <motion.div className="col-span-2">
            <Card className={cn(
              "sticky top-4",
              "shadow-custom hover:border-glow transition-all duration-500",
              "glass-effect",
              "h-full"
            )}>
              <MemoizedCourseHeader
                title={formattedCourse.title}
                level={formattedCourse.level}
                timelineRef={timelineRef}
              />

              <MemoizedCoursePricing
                price={formattedCourse.price}
                discounted_price={formattedCourse.discountedPrice}
                timelineRef={timelineRef}
              />

              <MemoizedCourseActions courseId={Number(courseId)} />
            </Card>
          </motion.div>
        </motion.div>

        <motion.div className="mt-8">
          <MemoizedCourseTabs
            courseId={Number(courseId)}
            course={formattedCourse}
            chapters={state.chaptersResponse}
            lessonsByChapter={state.lessonsByChapter}
            timelineRef={timelineRef}
          />
        </motion.div>
      </div>
    </div>
  );
}, (prevProps, nextProps) => prevProps.courseId === nextProps.courseId);

export default PageDetailCourse;