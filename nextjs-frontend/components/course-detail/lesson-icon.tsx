import { Lock, Video, FileText } from "lucide-react";

interface LessonIconProps {
    type: 'video' | 'document' | string;
    isFree: boolean;
}

export const LessonIcon = ({ type, isFree }: LessonIconProps) => {
    if (!isFree) return <Lock className="h-4 w-4 text-muted-foreground" />;

    if (type === 'video') return <Video className="h-4 w-4 text-gradient-purple-blue" />;
    if (type === 'document') return <FileText className="h-4 w-4 text-glow" />;
    return <FileText className="h-4 w-4 text-glow" />;
};
    