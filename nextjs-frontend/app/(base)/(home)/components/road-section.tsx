'use client';

import { useRef } from 'react';
import { Timeline } from '@/components/ui/common/timeline';
import { HoverCard } from '@/components/ui/card/hover-card';
import { DotPattern } from '@/components/ui/bg/dot-bg';
import Brand from '@/components/ui/marquee/brand';
import { SparklesText } from '@/components/ui/animation/text/sparkles-text';
import { TimelineContent } from '@/components/ui/animation/scroll/framer-timeline';
import { Code2, BookOpen, Rocket, GraduationCap, Database, Server, Globe, Cloud, Terminal, Cpu } from 'lucide-react';
import { urlImageCourse } from '@/constants/firebase/image-course';

const roadmapData = [
    {
        title: "Bắt đầu",
        content: (
            <div className="card card-hover">
                <div className="card-header">
                    <div className="icon-purple">
                        <Code2 className="size-8" />
                    </div>
                    <h3 className="text-gradient-purple-blue">Nền tảng lập trình</h3>
                </div>
                <div className="card-content">
                    <p>Học các kiến thức cơ bản về lập trình, thuật toán và cấu trúc dữ liệu.</p>
                </div>
            </div>
        )
    },
    {
        title: "Phát triển",
        content: (
            <div className="card card-hover">
                <div className="card-header">
                    <div className="icon-orange">
                        <BookOpen className="size-8" />
                    </div>
                    <h3 className="text-gradient-orange-red">Công nghệ Web</h3>
                </div>
                <div className="card-content">
                    <p>Tìm hiểu về HTML, CSS, JavaScript và các framework hiện đại.</p>
                </div>
            </div>
        )
    },
    {
        title: "Nâng cao",
        content: (
            <div className="card card-hover">
                <div className="card-header">
                    <div className="icon-green">
                        <Rocket className="size-8" />
                    </div>
                    <h3 className="text-gradient-green-teal">Dự án thực tế</h3>
                </div>
                <div className="card-content">
                    <p>Xây dựng các dự án thực tế, làm việc với database và API.</p>
                </div>
            </div>
        )
    }
];

const techCards = [
    {
        tag: "Frontend",
        tagColor: "primary" as const,
        title: "React & Next.js",
        hoverTitle: "Modern Web",
        description: "Xây dựng giao diện người dùng hiện đại với React và Next.js",
        image: urlImageCourse["react-ts"],
        hoverImage: urlImageCourse["nextjs"],
        gradientFrom: "color-1" as const,
        gradientTo: "color-2" as const
    },
    {
        tag: "Backend",
        tagColor: "success" as const,
        title: "Node.js & Express",
        hoverTitle: "API Development",
        description: "Phát triển REST API và xử lý backend với Node.js",
        image: urlImageCourse["nodejs"],
        hoverImage: urlImageCourse["django"],
        gradientFrom: "color-3" as const,
        gradientTo: "color-4" as const
    },
    {
        tag: "Database",
        tagColor: "warning" as const,
        title: "SQL & NoSQL",
        hoverTitle: "Data Management",
        description: "Thiết kế và quản lý cơ sở dữ liệu hiệu quả",
        image: urlImageCourse["database"],
        hoverImage: urlImageCourse["solution-architecture"],
        gradientFrom: "color-4" as const,
        gradientTo: "color-5" as const
    }
];

const techBrands = [
    {
        href: "https://react.dev",
        icon: <GraduationCap />,
        className: "bg-blue-500"
    },
    {
        href: "https://nextjs.org",
        icon: <Code2 />,
        className: "bg-black"
    },
    {
        href: "https://nodejs.org",
        icon: <Rocket />,
        className: "bg-green-600"
    },
    {
        href: "https://www.mongodb.com",
        icon: <Database />,
        className: "bg-emerald-500"
    },
    {
        href: "https://expressjs.com",
        icon: <Server />,
        className: "bg-gray-600"
    },
    {
        href: "https://www.w3.org",
        icon: <Globe />,
        className: "bg-orange-500"
    },
    {
        href: "https://aws.amazon.com",
        icon: <Cloud />,
        className: "bg-yellow-500"
    },
    {
        href: "https://www.docker.com",
        icon: <Terminal />,
        className: "bg-blue-600"
    },
    {
        href: "https://kubernetes.io",
        icon: <Cpu />,
        className: "bg-indigo-500"
    }
];

export default function RoadSection() {
    const sectionRef = useRef<HTMLDivElement>(null);

    return (
        <section ref={sectionRef} className="relative">
            <DotPattern
                className="absolute inset-0 -z-10 h-full w-full"
                width={32}
                height={32}
                cx={1}
                cy={1}
                cr={1}
            />

            <TimelineContent animationNum={0} timelineRef={sectionRef}>
                <div className="container py-20 text-center">
                    <SparklesText
                        text="Lộ trình học tập"
                        className="text-glow !text-4xl mb-4"
                    />
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Khám phá lộ trình học tập được thiết kế chi tiết, giúp bạn từng bước trở thành lập trình viên chuyên nghiệp
                    </p>
                </div>
            </TimelineContent>

            <Timeline
                data={roadmapData}
                className="mb-20"
                animationNumStart={1}
            />
            
            <HoverCard
                cards={techCards}
                className="container mb-20"
                animationNumStart={2}
            />

            <TimelineContent animationNum={3} timelineRef={sectionRef}>
                <Brand
                    items={techBrands}
                    className="mb-20"
                />
            </TimelineContent>
        </section>
    );
}
