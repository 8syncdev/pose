'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';
import { TimelineContent } from '@/components/ui/animation/scroll/framer-timeline';
import { useRef } from 'react';

interface HoverCardProps {
    cards: Array<{
        tag: string;
        tagColor: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
        title: string;
        hoverTitle: string;
        description: string;
        image: string;
        hoverImage: string;
        gradientFrom: 'color-1' | 'color-2' | 'color-3' | 'color-4' | 'color-5';
        gradientTo: 'color-1' | 'color-2' | 'color-3' | 'color-4' | 'color-5';
    }>;
    className?: string;
    timelineRef?: React.RefObject<HTMLDivElement>;
    animationNumStart?: number;
}

export function HoverCard({ cards, className, timelineRef, animationNumStart = 0 }: HoverCardProps) {
    const defaultRef = useRef<HTMLDivElement>(null);
    const containerRef = timelineRef || defaultRef;

    return (
        <section 
            ref={defaultRef}
            className={cn(
                'grid gap-6 mx-auto w-full',
                'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
                'max-w-[20rem] sm:max-w-2xl lg:max-w-6xl',
                className
            )}
        >
            {cards.map((card, index) => (
                <TimelineContent key={index} animationNum={index + animationNumStart + 1} timelineRef={containerRef}>
                    <div className="w-full h-full perspective-1000">
                        <div 
                            className={cn(
                                "card group relative overflow-hidden hover-scale shadow-custom",
                                "min-h-[30rem] w-full",
                                `bg-gradient-to-t from-[hsl(var(--${card.gradientFrom}))] to-[hsl(var(--${card.gradientTo}))]`,
                                "before:absolute before:inset-0 before:bg-[url('/noise.gif')] before:opacity-5"
                            )}
                        >
                            <div className='relative h-full flex flex-col justify-between'>
                                {/* Card Header - Always on top */}
                                <div className='p-6 space-y-4 relative z-20 glass-effect rounded-lg'>
                                    <div className={cn(
                                        'badge',
                                        `badge-${card.tagColor}`,
                                        'hover-scale text-sm'
                                    )}>
                                        {card.tag}
                                    </div>
                                    
                                    <div className="space-y-3">
                                        <h3 className={cn(
                                            'text-xl sm:text-2xl font-semibold leading-tight',
                                            'text-[hsl(var(--foreground))] animate-fade text-glow',
                                            'group-hover:hidden inline-block'
                                        )}>
                                            {card.title}
                                        </h3>
                                        <h3 className={cn(
                                            'text-xl sm:text-2xl font-semibold leading-tight',
                                            'text-[hsl(var(--foreground))] animate-fade text-glow',
                                            'group-hover:inline-block hidden'
                                        )}>
                                            {card.hoverTitle}
                                        </h3>
                                        <p className='text-base text-[hsl(var(--muted-foreground))] line-clamp-2'>
                                            {card.description}
                                        </p>
                                    </div>
                                </div>
                                
                                {/* Image Container - In the middle */}
                                <div className='flex-1 flex items-center justify-center p-4 relative z-10 group-hover:-translate-y-2 animate-slide'>
                                    {/* Base Image */}
                                    <div className="relative w-full aspect-square max-w-[15rem] max-h-[15rem]">
                                        <Image
                                            className='group-hover:opacity-0 animate-fade'
                                            src={card.image}
                                            fill
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            priority={index < 3}
                                            style={{
                                                objectFit: 'contain',
                                                objectPosition: 'center'
                                            }}
                                            alt={`${card.title} image`}
                                        />
                                    </div>
                                    
                                    {/* Hover Image */}
                                    <div className="absolute w-full aspect-square max-w-[15rem] max-h-[15rem]">
                                        <Image
                                            className='opacity-0 group-hover:opacity-100 animate-fade'
                                            src={card.hoverImage}
                                            fill
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            style={{
                                                objectFit: 'contain',
                                                objectPosition: 'center'
                                            }}
                                            alt={`${card.title} hover image`}
                                            aria-hidden='true'
                                        />
                                    </div>
                                </div>

                                {/* Background Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--background)_/_0.2)] to-transparent z-0" />
                            </div>
                        </div>
                    </div>
                </TimelineContent>
            ))}
        </section>
    );
}

export default HoverCard;
