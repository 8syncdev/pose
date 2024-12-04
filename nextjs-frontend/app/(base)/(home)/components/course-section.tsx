'use client';

import { useRef } from 'react';
import { TimelineContent } from '@/components/ui/animation/scroll/framer-timeline';
import { SparklesText } from '@/components/ui/animation/text/sparkles-text';
import { CardContainer, CardBody, CardItem } from '@/components/ui/card/3d-card';
import { DotPattern } from '@/components/ui/bg/dot-bg';
import Image from 'next/image';
import Link from 'next/link';
import { urlImageCourse } from '@/constants/firebase/image-course';
import { ExpandableCardDemo, ExpandableCards } from '@/components/ui/card/expandable-card';

const courseCards = [
    {
        title: 'React & TypeScript',
        description: 'Xây dựng ứng dụng với React và TypeScript',
        src: urlImageCourse['react-ts'],
        ctaLink: '/course',
        features: [
            'Kiến thức nền tảng về React Hooks và TypeScript',
            'Xây dựng UI với Styled Components và Tailwind CSS', 
            'State Management với Redux Toolkit',
            'Authentication và Authorization',
            'Testing với React Testing Library',
            'Deployment và CI/CD'
        ]
    },
    {
        title: 'Next.js Full Stack',
        description: 'Phát triển ứng dụng Full Stack với Next.js',
        src: urlImageCourse['nextjs'],
        ctaLink: '/course',
        features: [
            'Server Side Rendering và Static Generation',
            'API Routes và Middleware',
            'Database với Prisma và MongoDB',
            'Authentication với NextAuth.js', 
            'Deployment lên Vercel',
            'SEO và Performance Optimization'
        ]
    },
    {
        title: 'Node.js Backend',
        description: 'Xây dựng REST API với Node.js và Express',
        src: urlImageCourse['nodejs'],
        ctaLink: '/course',
        features: [
            'RESTful API Design',
            'Express.js và Middleware',
            'MongoDB và Mongoose',
            'JWT Authentication',
            'Error Handling và Logging',
            'Testing và Documentation'
        ]
    }
];

export default function CourseSection() {
    const courseRef = useRef<HTMLDivElement>(null);

    return (
        <section 
            ref={courseRef}
            className="py-20 relative"
        >
            <DotPattern
                className="absolute inset-0 -z-10 h-full w-full"
                width={32}
                height={32}
                cx={1}
                cy={1}
                cr={1}
            />

            <TimelineContent animationNum={0} timelineRef={courseRef}>
                <div className="container text-center space-y-6 mb-16">
                    <SparklesText
                        text="Khóa học nổi bật"
                        className="text-glow !text-4xl"
                    />
                    <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
                        Các khóa học được thiết kế chi tiết, từ cơ bản đến nâng cao giúp bạn nắm vững kiến thức và áp dụng vào dự án thực tế.
                    </p>
                </div>
            </TimelineContent>

            <ExpandableCards
                cards={courseCards.map(card => ({
                    description: card.description,
                    title: card.title,
                    src: card.src,
                    ctaText: "Xem khóa học",
                    ctaLink: card.ctaLink,
                    icon: <Image src={card.src} alt={card.title} width={400} height={200} className="w-full h-full object-cover" />,
                    content: () => (
                        <p>
                            {card.features.join('. ')}
                        </p>
                    )
                }))}
                className="mb-16"
            />

            <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {courseCards.map((card, index) => (
                    <TimelineContent key={index} animationNum={index + 1} timelineRef={courseRef}>
                            <CardContainer className="inter-var">
                                <CardBody className="bg-background/80 backdrop-blur-sm relative group/card dark:hover:shadow-2xl dark:hover:shadow-primary/[0.1] border-black/[0.1] h-[450px] w-full rounded-xl p-6">
                                    <CardItem
                                        translateZ="100"
                                        rotateX={10}
                                        rotateZ={-5}
                                        className="w-full"
                                    >
                                        <Image
                                            src={card.src}
                                            alt={card.title}
                                            width={400}
                                            height={200}
                                            className="h-44 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                                        />
                                    </CardItem>

                                    <CardItem translateZ="50" className="mt-4">
                                        <h3 className="text-2xl font-bold text-gradient-purple-blue">{card.title}</h3>
                                        <p className="mt-2 text-muted-foreground">{card.description}</p>
                                    </CardItem>

                                    <CardItem translateZ="60" className="mt-4">
                                        <ul className="space-y-1">
                                            {card.features.map((feature, i) => (
                                                <li key={i} className="flex items-center text-sm text-muted-foreground">
                                                    <span className="mr-2 text-primary">•</span>
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </CardItem>

                                    <CardItem translateZ="100" className="mt-6">
                                        <Link
                                            href={card.ctaLink}
                                            className="btn btn-primary w-full"
                                        >
                                            Xem khóa học
                                        </Link>
                                    </CardItem>
                                </CardBody>
                            </CardContainer>
                    </TimelineContent>
                ))}
            </div>
        </section>
    );
}
