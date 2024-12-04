import { Clock, Award, BookOpen, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { TimelineContent } from "@/components/ui/animation/scroll/framer-timeline";

interface CourseStatsProps {
  duration: number;
  level: string;
  totalLessons: number;
  totalChapters: number;
  timelineRef: React.RefObject<HTMLDivElement>;
}

export const CourseStats = ({ duration, level, totalLessons, totalChapters, timelineRef }: CourseStatsProps) => {
  const stats = [
    { icon: Clock, label: "Thời lượng", value: `${duration} giờ` },
    { icon: Award, label: "Cấp độ", value: level },
    { icon: BookOpen, label: "Bài học", value: totalLessons },
    { icon: Users, label: "Chương", value: totalChapters }
  ];

  return (
    <TimelineContent animationNum={2} timelineRef={timelineRef}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map(({ icon: Icon, label, value }) => (
          <Card key={label} className="p-4 hover-scale shadow-custom">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-full bg-[hsl(var(--primary)_/_0.1)]">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{label}</p>
                <p className="font-semibold text-gradient">{value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </TimelineContent>
  );
}; 