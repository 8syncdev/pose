import { Card } from "@/components/ui/card";
import { TimelineContent } from "@/components/ui/animation/scroll/framer-timeline";

interface CourseDescriptionProps {
  description: string;
  timelineRef: React.RefObject<HTMLDivElement>;
}

export const CourseDescription = ({ description, timelineRef }: CourseDescriptionProps) => (
  <TimelineContent animationNum={3} timelineRef={timelineRef}>
    <Card className="p-6 hover-scale shadow-custom glass-effect">
      <h3 className="text-xl font-semibold mb-4 text-gradient">Mô tả khóa học</h3>
      <p className="text-muted-foreground whitespace-pre-line leading-relaxed">{description}</p>
    </Card>
  </TimelineContent>
); 