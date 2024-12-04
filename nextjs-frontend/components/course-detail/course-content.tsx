import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { TimelineContent } from "@/components/ui/animation/scroll/framer-timeline";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { LessonIcon } from "./lesson-icon";
import { cn } from "@/lib/utils";
import MarkdownRenderer from "@/components/shared/md/md-custom";
import { useState, useCallback, useEffect } from "react";
import { getChaptersByCourseId, getLessonsByChapterId } from "@/lib/actions/course/course.action";
import type { Chapter, ChapterResponse, Lesson, LessonResponse } from "@/lib/actions/course/course.dto";
import type { Paginated } from "@/lib/actions/base.dto";

interface CourseContentProps {
    courseId: number;
    chapters: ChapterResponse;
    lessonsByChapter: Record<number, LessonResponse>;
    timelineRef: React.RefObject<HTMLDivElement>;
}

interface LessonDialogProps {
    lesson: Lesson;
    isOpen: boolean;
    onClose: () => void;
}

interface PaginationState {
    chapters: Paginated;
    lessons: Record<number, Paginated>;
}

interface CustomPaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const LessonDialog = ({ lesson, isOpen, onClose }: LessonDialogProps) => {
    if (!lesson.content && !lesson.video_url) {
        return null;
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className={cn(
                "max-w-4xl h-[80vh] flex flex-col",
                "bg-[hsl(var(--background))]",
                "border border-[hsl(var(--border))]",
                "shadow-sm",
                "animate-fade"
            )}>
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-gradient-purple-blue">
                        {lesson.name}
                    </DialogTitle>
                </DialogHeader>

                <ScrollArea className="flex-1 pr-4 scrollbar-custom">
                    <div className="space-y-4">
                        {lesson.video_url && (
                            <div className="relative aspect-video rounded-lg overflow-hidden shadow-custom">
                                <iframe
                                    src={lesson.video_url}
                                    className="absolute inset-0 w-full h-full"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                        )}

                        {lesson.content && (
                            <div className="prose dark:prose-invert max-w-none">
                                <MarkdownRenderer content={lesson.content} />
                            </div>
                        )}
                    </div>
                </ScrollArea>

                <div className="flex justify-end pt-4">
                    <Button variant="outline" onClick={onClose} className="hover-scale">
                        Đóng
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

const CustomPagination = ({ currentPage, totalPages, onPageChange }: CustomPaginationProps) => {
    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    };

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(currentPage - 1);
                        }}
                        className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
                    />
                </PaginationItem>

                {[...Array(totalPages)].map((_, index) => {
                    const pageNumber = index + 1;
                    const isCurrentPage = pageNumber === currentPage;

                    if (
                        pageNumber === 1 ||
                        pageNumber === totalPages ||
                        (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                    ) {
                        return (
                            <PaginationItem key={pageNumber}>
                                <PaginationLink
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handlePageChange(pageNumber);
                                    }}
                                    isActive={isCurrentPage}
                                >
                                    {pageNumber}
                                </PaginationLink>
                            </PaginationItem>
                        );
                    }

                    if (
                        (pageNumber === currentPage - 2 && pageNumber > 2) ||
                        (pageNumber === currentPage + 2 && pageNumber < totalPages - 1)
                    ) {
                        return (
                            <PaginationItem key={pageNumber}>
                                <PaginationEllipsis />
                            </PaginationItem>
                        );
                    }

                    return null;
                })}

                <PaginationItem>
                    <PaginationNext
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(currentPage + 1);
                        }}
                        className={currentPage >= totalPages ? "pointer-events-none opacity-50" : ""}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};

const LessonItem = ({ lesson, index }: { lesson: Lesson; index: number }) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleLessonClick = () => {
        if (lesson.is_free) {
            setIsDialogOpen(true);
        }
    };
    return (
        <>
            <div
                onClick={handleLessonClick}
                className={cn(
                    "flex items-center space-x-3 p-3 rounded-md",
                    "hover:glass-effect animate-slide",
                    "border border-transparent hover:border-glow",
                    lesson.is_free ? "cursor-pointer" : "cursor-not-allowed opacity-80"
                )}
            >
                <div className="flex space-x-2">
                    {lesson.video_url && (
                        <LessonIcon type="video" isFree={lesson.is_free} />
                    )}
                    {lesson.content && (
                        <LessonIcon type="document" isFree={lesson.is_free} />
                    )}
                </div>
                <span className="text-sm flex-1 font-medium">
                    {lesson.name}
                </span>
                {lesson.duration_minutes && (
                    <span className="text-sm text-muted-foreground">
                        {lesson.duration_minutes} phút
                    </span>
                )}
                {lesson.is_free && (
                    <Badge variant="secondary" className="ml-2 text-glow animate-fade">
                        Miễn phí
                    </Badge>
                )}
            </div>

            <LessonDialog
                lesson={lesson}
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
            />
        </>
    );
};

const ChapterItem = ({
    chapter,
    index,
    lessons,
    timelineRef,
    onLessonPageChange,
    paginationState
}: {
    chapter: Chapter;
    index: number;
    lessons: Lesson[];
    timelineRef: React.RefObject<HTMLDivElement>;
    onLessonPageChange: (chapterId: number, page: number) => void;
    paginationState: PaginationState;
}) => {
    const lessonPagination = chapter.id ? paginationState.lessons[chapter.id] : undefined;

    return (
        <AccordionItem value={`chapter-${chapter.id}`} className="border rounded-lg my-2 shadow-custom">
            <TimelineContent animationNum={index + 1} timelineRef={timelineRef}>
                <AccordionTrigger className="hover:no-underline group px-4">
                    <div className="flex items-center space-x-3">
                        <span className="font-medium group-hover:text-gradient-purple-blue transition-colors">
                            Chương {index + 1}: {chapter.name}
                        </span>
                        <Badge variant="outline" className="group-hover:border-glow transition-all">
                            {lessonPagination?.count || 0} bài học
                        </Badge>
                        {chapter.duration_minutes && (
                            <Badge variant="secondary" className="text-glow">
                                {Math.floor(chapter.duration_minutes / 60)}h {chapter.duration_minutes % 60}m
                            </Badge>
                        )}
                    </div>
                </AccordionTrigger>
            </TimelineContent>
            <AccordionContent>
                <div className="space-y-2 pl-4 pr-2">
                    {lessons?.map((lesson, lessonIndex) => (
                        <LessonItem
                            key={lesson.id}
                            lesson={lesson}
                            index={lessonIndex}
                        />
                    ))}
                    {lessonPagination && lessonPagination.totalPages > 1 && (
                        <div className="flex justify-center mt-4">
                            <CustomPagination
                                currentPage={lessonPagination.current}
                                totalPages={lessonPagination.totalPages}
                                onPageChange={(page) => chapter.id && onLessonPageChange(chapter.id, page)}
                            />
                        </div>
                    )}
                </div>
            </AccordionContent>
        </AccordionItem>
    );
};

export const CourseContent = ({ courseId, chapters, lessonsByChapter, timelineRef }: CourseContentProps) => {
    const [paginationState, setPaginationState] = useState<PaginationState>({
        chapters: chapters.pagination || {
            count: 0,
            pageSize: 10,
            totalPages: 0,
            current: 1
        },
        lessons: Object.fromEntries(
            Object.entries(lessonsByChapter).map(([chapterId, response]) => [
                chapterId,
                response.pagination || {
                    count: 0,
                    pageSize: 10,
                    totalPages: 0,
                    current: 1
                }
            ])
        )
    });

    const [chapterLessons, setChapterLessons] = useState<Record<number, Record<number, Lesson[]>>>(() => {
        const initialLessons: Record<number, Record<number, Lesson[]>> = {};
        Object.entries(lessonsByChapter).forEach(([chapterId, response]) => {
            if (response.result) {
                initialLessons[Number(chapterId)] = {
                    1: Array.isArray(response.result) ? response.result : [response.result]
                };
            }
        });
        return initialLessons;
    });

    const fetchChapterPage = useCallback(async (page: number) => {
        try {
            const response = await getChaptersByCourseId(courseId, page);
            if (response.success && response.result && response.pagination) {
                setPaginationState(prev => ({
                    ...prev,
                    chapters: response.pagination!
                }));
            }
        } catch (error) {
            console.error('Error fetching chapters:', error);
        }
    }, [courseId]);

    const fetchLessonPage = useCallback(async (chapterId: number, page: number) => {
        // Return cached data if available
        if (chapterLessons[chapterId]?.[page]) {
            setPaginationState(prev => ({
                ...prev,
                lessons: {
                    ...prev.lessons,
                    [chapterId]: {
                        ...prev.lessons[chapterId],
                        current: page
                    }
                }
            }));
            return;
        }

        try {
            const response = await getLessonsByChapterId(chapterId, page);
            if (response.success && response.result && response.pagination) {
                const lessons = Array.isArray(response.result) ? response.result : [response.result];

                setChapterLessons(prev => ({
                    ...prev,
                    [chapterId]: {
                        ...prev[chapterId],
                        [page]: lessons
                    }
                }));

                setPaginationState(prev => ({
                    ...prev,
                    lessons: {
                        ...prev.lessons,
                        [chapterId]: response.pagination!
                    }
                }));
            }
        } catch (error) {
            console.error('Error fetching lessons:', error);
        }
    }, [chapterLessons]);

    const chaptersArray = chapters.result
        ? Array.isArray(chapters.result)
            ? chapters.result
            : [chapters.result]
        : [];

    return (
        <TimelineContent animationNum={0} timelineRef={timelineRef}>
            <ScrollArea className="h-[600px] pr-4 scrollbar-custom">
                <Accordion type="single" collapsible className="w-full">
                    {chaptersArray.map((chapter, index) => {
                        if (!chapter) return null;
                        const chapterId = chapter.id;
                        if (!chapterId) return null;

                        const currentPage = paginationState.lessons[chapterId]?.current || 1;
                        const lessons = chapterLessons[chapterId]?.[currentPage] || [];

                        return (
                            <ChapterItem
                                key={chapterId}
                                chapter={chapter}
                                index={index}
                                lessons={lessons}
                                timelineRef={timelineRef}
                                onLessonPageChange={fetchLessonPage}
                                paginationState={paginationState}
                            />
                        );
                    })}
                </Accordion>
                {paginationState.chapters.totalPages > 1 && (
                    <div className="flex justify-center mt-4">
                        <CustomPagination
                            currentPage={paginationState.chapters.current}
                            totalPages={paginationState.chapters.totalPages}
                            onPageChange={fetchChapterPage}
                        />
                    </div>
                )}
            </ScrollArea>
        </TimelineContent>
    );
};