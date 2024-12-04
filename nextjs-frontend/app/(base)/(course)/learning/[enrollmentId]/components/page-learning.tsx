"use client";

import { useCallback, useEffect, useMemo, useState, useRef, memo } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, GraduationCap, BookOpen, Play, PanelLeftClose, PanelLeftOpen } from "lucide-react";

// Import components
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import MarkdownRenderer from "@/components/shared/md/md-custom";
import { cn } from "@/lib/utils";

// Import actions & types
import { getEnrollmentById } from "@/lib/actions/enrollment/enrollment.action";
import { getChaptersByCourseId, getLessonsByChapterId } from "@/lib/actions/course/course.action";
import type { Chapter, ChapterResponse, Lesson, LessonResponse } from "@/lib/actions/course/course.dto";
import type { Enrollment, EnrollmentResponse } from "@/lib/actions/enrollment/enrollment.dto";
import type { Paginated } from "@/lib/actions/base.dto";

interface PageLearningProps {
  enrollmentId: string;
}

interface SidebarItemProps {
  chapter: Chapter;
  lessons: Lesson[];
  isActive: boolean;
  onSelectLesson: (lesson: Lesson) => void;
  currentLessonId?: number;
  onLessonPageChange: (chapterId: number, page: number) => Promise<void>;
  lessonPagination?: Paginated;
}

interface PaginationState {
  chapters: Paginated;
  lessons: Record<number, Paginated>;
}

const SidebarItem = memo(({ 
  chapter, 
  lessons, 
  isActive, 
  onSelectLesson, 
  currentLessonId,
  onLessonPageChange,
  lessonPagination
}: SidebarItemProps) => {
  const [isOpen, setIsOpen] = useState(isActive);
  const [isLoading, setIsLoading] = useState(false);

  const handlePageChange = async (chapterId: number, page: number) => {
    if (isLoading) return;
    
    try {
      setIsLoading(true);
      await onLessonPageChange(chapterId, page);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mb-2">
      <Button
        variant="ghost"
        size="sm"
        className="w-full justify-start gap-2 hover:bg-[hsl(var(--accent-hover))] text-[hsl(var(--primary))]"
        onClick={() => setIsOpen(!isOpen)}
      >
        <BookOpen className="h-3 w-3" />
        <span className="truncate text-sm font-medium">{chapter.name}</span>
        <ChevronRight className={`ml-auto h-3 w-3 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
      </Button>

      {isOpen && (
        <div className="ml-2 mt-1 space-y-1">
          {lessons.map((lesson) => (
            <Button
              key={lesson.id}
              variant="ghost"
              size="sm"
              className={cn(
                "w-full justify-start gap-2 pl-4 text-xs hover:bg-[hsl(var(--accent-hover))]",
                currentLessonId === lesson.id && "bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))]"
              )}
              onClick={() => onSelectLesson(lesson)}
            >
              <Play className="h-3 w-3" />
              <span className="truncate">{lesson.name}</span>
            </Button>
          ))}

          {lessonPagination && lessonPagination.totalPages > 1 && (
            <div className="flex justify-center py-1">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 hover:bg-[hsl(var(--accent-hover))]"
                      disabled={lessonPagination.current <= 1 || isLoading}
                      onClick={() => chapter.id && handlePageChange(chapter.id, lessonPagination.current - 1)}
                    >
                      <ChevronLeft className="h-3 w-3" />
                    </Button>
                  </PaginationItem>

                  {lessonPagination.current > 2 && (
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}

                  {lessonPagination.current > 1 && (
                    <PaginationItem>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 hover:bg-[hsl(var(--accent-hover))]"
                        disabled={isLoading}
                        onClick={() => chapter.id && handlePageChange(chapter.id, lessonPagination.current - 1)}
                      >
                        {lessonPagination.current - 1}
                      </Button>
                    </PaginationItem>
                  )}

                  <PaginationItem>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-6 w-6 bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))]"
                      disabled={isLoading}
                    >
                      {lessonPagination.current}
                    </Button>
                  </PaginationItem>

                  {lessonPagination.current < lessonPagination.totalPages && (
                    <PaginationItem>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 hover:bg-[hsl(var(--accent-hover))]"
                        disabled={isLoading}
                        onClick={() => chapter.id && handlePageChange(chapter.id, lessonPagination.current + 1)}
                      >
                        {lessonPagination.current + 1}
                      </Button>
                    </PaginationItem>
                  )}

                  {lessonPagination.current < lessonPagination.totalPages - 1 && (
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}

                  <PaginationItem>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 hover:bg-[hsl(var(--accent-hover))]"
                      disabled={lessonPagination.current >= lessonPagination.totalPages || isLoading}
                      onClick={() => chapter.id && handlePageChange(chapter.id, lessonPagination.current + 1)}
                    >
                      <ChevronRight className="h-3 w-3" />
                    </Button>
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      )}
    </div>
  );
}, (prevProps, nextProps) => {
  return (
    prevProps.chapter.id === nextProps.chapter.id &&
    prevProps.currentLessonId === nextProps.currentLessonId &&
    prevProps.lessons.length === nextProps.lessons.length &&
    JSON.stringify(prevProps.lessonPagination) === JSON.stringify(nextProps.lessonPagination)
  );
});

const LessonContent = memo(({ lesson }: { lesson: Lesson }) => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4 text-gradient-purple-blue">{lesson.name}</h1>
      <Separator className="my-4" />
      {lesson.video_url && (
        <div className="aspect-video mb-6">
          <iframe
            src={lesson.video_url}
            className="w-full h-full rounded-lg shadow-custom"
            allowFullScreen
          />
        </div>
      )}
      {lesson.content && (
        <div className="prose prose-blue max-w-none">
          <MarkdownRenderer content={lesson.content} />
        </div>
      )}
    </div>
  );
}, (prevProps, nextProps) => {
  return prevProps.lesson.id === nextProps.lesson.id;
});

const PageLearning = memo(({ enrollmentId }: PageLearningProps) => {
  const router = useRouter();
  const [state, setState] = useState({
    enrollment: null as Enrollment | null,
    loading: true,
    sidebarOpen: true
  });

  const [chapters, setChapters] = useState<Chapter[]>([]);
  const chapterLessonsRef = useRef<Record<number, Record<number, Lesson[]>>>({});
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);

  const [paginationState, setPaginationState] = useState<PaginationState>({
    chapters: {
      count: 0,
      pageSize: 10,
      totalPages: 0,
      current: 1
    },
    lessons: {}
  });

  const fetchEnrollment = useCallback(async () => {
    try {
      const response = await getEnrollmentById(Number(enrollmentId));
      if (response.success && response.result) {
        setState(prev => ({
          ...prev,
          enrollment: Array.isArray(response.result) ? response.result[0] : response.result ?? null
        }));
      }
    } catch (error) {
      console.error('Error loading enrollment:', error);
    }
  }, [enrollmentId]);

  const fetchChapterPage = useCallback(async (page: number) => {
    if (!state.enrollment?.course_id) return;

    try {
      const response = await getChaptersByCourseId(state.enrollment.course_id, page);
      if (response.success && response.result && response.pagination) {
        const chaptersData = Array.isArray(response.result) ? response.result : [response.result];
        
        setChapters(prev => {
          const prevString = JSON.stringify(prev);
          const newString = JSON.stringify(chaptersData);
          return prevString === newString ? prev : chaptersData;
        });

        setPaginationState(prev => {
          const newPagination = response.pagination!;
          return prev.chapters === newPagination ? prev : {
            ...prev,
            chapters: newPagination
          };
        });
      }
    } catch (error) {
      console.error('Error fetching chapters:', error);
    }
  }, [state.enrollment?.course_id]);

  const fetchLessonPage = useCallback(async (chapterId: number, page: number) => {
    if (chapterLessonsRef.current[chapterId]?.[page]) {
      setPaginationState(prev => {
        const currentChapterPagination = prev.lessons[chapterId];
        if (currentChapterPagination?.current === page) return prev;
        
        return {
          ...prev,
          lessons: {
            ...prev.lessons,
            [chapterId]: {
              ...currentChapterPagination,
              current: page
            }
          }
        };
      });
      return;
    }

    try {
      const response = await getLessonsByChapterId(chapterId, page);
      if (response.success && response.result && response.pagination) {
        const lessons = Array.isArray(response.result) ? response.result : [response.result];

        chapterLessonsRef.current = {
          ...chapterLessonsRef.current,
          [chapterId]: {
            ...chapterLessonsRef.current[chapterId],
            [page]: lessons
          }
        };

        setState(prev => {
          const newState = { ...prev };
          return JSON.stringify(newState) === JSON.stringify(prev) ? prev : newState;
        });

        setPaginationState(prev => {
          const newPagination = response.pagination!;
          return prev.lessons[chapterId] === newPagination ? prev : {
            ...prev,
            lessons: {
              ...prev.lessons,
              [chapterId]: newPagination
            }
          };
        });
      }
    } catch (error) {
      console.error('Error fetching lessons:', error);
    }
  }, []);

  useEffect(() => {
    let mounted = true;

    const loadData = async () => {
      if (!mounted) return;
      setState(prev => ({ ...prev, loading: true }));
      await fetchEnrollment();
      await fetchChapterPage(1);
      if (mounted) {
        setState(prev => ({ ...prev, loading: false }));
      }
    };

    loadData();
    return () => { mounted = false; };
  }, [fetchEnrollment, fetchChapterPage]);

  useEffect(() => {
    let mounted = true;

    const loadInitialLessons = async () => {
      if (!mounted) return;
      for (const chapter of chapters) {
        if (chapter.id && !chapterLessonsRef.current[chapter.id]?.[1]) {
          await fetchLessonPage(chapter.id, 1);
        }
      }
    };

    loadInitialLessons();
    return () => { mounted = false; };
  }, [chapters, fetchLessonPage]);

  const handleLessonSelect = useCallback((lesson: Lesson) => {
    setCurrentLesson(prev => {
      return prev?.id === lesson.id ? prev : lesson;
    });
  }, []);

  if (state.loading) {
    return <div className="flex h-screen items-center justify-center">
      <Skeleton className="h-[600px] w-full" />
    </div>;
  }

  return (
    <div className="h-screen flex">
      <div className="relative flex">
        <motion.div
          initial={false}
          animate={{ width: state.sidebarOpen ? "280px" : "0px" }}
          className="border-r bg-[hsl(var(--background))] overflow-hidden"
        >
          <div className="p-3 border-b flex items-center justify-end pr-5">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold flex items-center gap-2 justify-end text-[hsl(var(--primary))]">
                <GraduationCap className="h-5 w-5" />
                Course Content
              </h2>
            </div>
          </div>

          <ScrollArea className="h-[calc(100vh-3.5rem)]">
            <div className="p-2">
              {chapters.map((chapter) => {
                if (!chapter.id) return null;
                const currentPage = paginationState.lessons[chapter.id]?.current || 1;
                const lessons = chapterLessonsRef.current[chapter.id]?.[currentPage] || [];

                return (
                  <SidebarItem
                    key={chapter.id}
                    chapter={chapter}
                    lessons={lessons}
                    isActive={false}
                    onSelectLesson={handleLessonSelect}
                    currentLessonId={currentLesson?.id}
                    onLessonPageChange={fetchLessonPage}
                    lessonPagination={paginationState.lessons[chapter.id]}
                  />
                );
              })}
            </div>
          </ScrollArea>
        </motion.div>

        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 absolute top-3 left-3 z-50 hover:bg-[hsl(var(--accent-hover))]"
          onClick={() => setState(prev => ({ ...prev, sidebarOpen: !prev.sidebarOpen }))}
        >
          {state.sidebarOpen ? (
            <PanelLeftClose className="h-4 w-4" />
          ) : (
            <PanelLeftOpen className="h-4 w-4" />
          )}
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto bg-[hsl(var(--background))]">
        {currentLesson ? (
          <LessonContent lesson={currentLesson} />
        ) : (
          <div className="h-full flex items-center justify-center">
            <p className="text-[hsl(var(--muted-foreground))] text-gradient-purple-blue">Chọn bài học ngay</p>
          </div>
        )}
      </div>
    </div>
  );
}, (prevProps, nextProps) => {
  return prevProps.enrollmentId === nextProps.enrollmentId;
});

export default PageLearning;
