import { Course, Chapter, Lesson } from "@/lib/actions/course/course.dto";

export interface FormattedCourse {
  title: string;
  description: string;
  image: string;
  price: number;
  duration: number;
  level: string;
  discountedPrice?: number;
}

export interface TimelineProps {
  timelineRef: React.RefObject<HTMLDivElement>;
} 