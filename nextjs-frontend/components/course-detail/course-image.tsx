import Image from "next/image";
import { PlayCircle } from "lucide-react";
import { TimelineContent } from "@/components/ui/animation/scroll/framer-timeline";

interface CourseImageProps {
  image: string;
  title: string;
  timelineRef: React.RefObject<HTMLDivElement>;
}

export const CourseImage = ({ image, title, timelineRef }: CourseImageProps) => (
  <TimelineContent animationNum={0} timelineRef={timelineRef}>
    <div className="relative w-full h-[320px] rounded-lg overflow-hidden group shadow-custom">
      <Image
        src={image || '/placeholder.jpg'}
        alt={title}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-500"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
        <PlayCircle className="w-20 h-20 text-white animate-pulse" />
      </div>
    </div>
  </TimelineContent>
); 