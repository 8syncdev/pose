import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CourseStats } from "./course-stats";
import { CourseDescription } from "./course-description";
import { CourseContent } from "./course-content";
import type { FormattedCourse, TimelineProps } from "./types/course.types";
import type { ChapterResponse, LessonResponse } from "@/lib/actions/course/course.dto";

interface CourseTabsProps extends TimelineProps {
    courseId: number;
    course: FormattedCourse;
    chapters: ChapterResponse;
    lessonsByChapter: Record<number, LessonResponse>;
}

export const CourseTabs = ({ courseId, course, chapters, lessonsByChapter, timelineRef }: CourseTabsProps) => {
    const chaptersArray = Array.isArray(chapters.result) ? chapters.result : [chapters.result];
    const totalLessons = Object.values(lessonsByChapter).reduce((total, response) => {
        const lessons = Array.isArray(response.result) ? response.result : [response.result];
        return total + lessons.length;
    }, 0);

    return (
        <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="overview">Tổng quan</TabsTrigger>
                <TabsTrigger value="content">Nội dung khóa học</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
                <div className="space-y-6">
                    <CourseStats
                        duration={course.duration}
                        level={course.level}
                        totalLessons={totalLessons}
                        totalChapters={chaptersArray.length}
                        timelineRef={timelineRef}
                    />
                    <CourseDescription
                        description={course.description}
                        timelineRef={timelineRef}
                    />
                </div>
            </TabsContent>
            <TabsContent value="content">
                <CourseContent
                    courseId={courseId}
                    chapters={chapters}
                    lessonsByChapter={lessonsByChapter}
                    timelineRef={timelineRef}
                />
            </TabsContent>
        </Tabs>
    );
};