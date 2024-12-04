import { Target, Sparkles, CheckCircle2, Star } from "lucide-react";
import { TimelineContent } from "@/components/ui/animation/scroll/framer-timeline";

interface CourseHighlightsProps {
  timelineRef: React.RefObject<HTMLDivElement>;
}

export const CourseHighlights = ({ timelineRef }: CourseHighlightsProps) => {
  const highlights = [
    { icon: Target, text: "Học theo lộ trình rõ ràng" },
    { icon: Sparkles, text: "Nội dung cập nhật liên tục" },
    { icon: CheckCircle2, text: "Giảng viên hỗ trợ 24/7" },
    { icon: Star, text: "Chứng chỉ sau khi hoàn thành" }
  ];

  return (
    <TimelineContent animationNum={1} timelineRef={timelineRef}>
      <div className="grid grid-cols-2 gap-4 mt-6">
        {highlights.map(({ icon: Icon, text }) => (
          <div key={text} className="flex items-center gap-2 text-sm text-muted-foreground">
            <Icon className="h-4 w-4 text-primary" />
            <span>{text}</span>
          </div>
        ))}
      </div>
    </TimelineContent>
  );
}; 