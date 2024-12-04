import { Badge } from "@/components/ui/badge";
import { CardHeader } from "@/components/ui/card";
import { SparklesText } from "@/components/ui/animation/text/sparkles-text";
import { CourseHighlights } from "./course-highlights";
import type { TimelineProps } from "./types/course.types";

interface CourseHeaderProps extends TimelineProps {
  title: string;
  level: string;
}

export const CourseHeader = ({ title, level, timelineRef }: CourseHeaderProps) => (
  <CardHeader className="text-center">
    <Badge variant="secondary" className="w-fit mb-2 mx-auto text-glow">
      {level}
    </Badge>
    <SparklesText text={title} className="text-3xl font-bold" />
    <CourseHighlights timelineRef={timelineRef} />
  </CardHeader>
); 