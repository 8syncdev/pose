'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { urlImageCourse } from '@/constants/firebase/image-course';

interface BrandProps {
    className?: string;
    items: Array<{
        href: string;
        icon: React.ReactNode;
        className?: string;
    }>;
}

export default function Brand({ className, items }: BrandProps) {
    return (
        <div className={cn(
            'w-full text-5xl py-8 inline-flex flex-nowrap overflow-hidden',
            '[mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)]',
            className
        )}>
            <ul className='flex items-center justify-center md:justify-start sm:[&_li]:mx-8 [&_li]:mx-4 [&_img]:max-w-none animate-infinite-scroll'>
                {items.map((item, index) => (
                    <li key={index}>
                        <a
                            target='_blank'
                            href={item.href}
                            className={cn(
                                'border bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] text-2xl sm:grid hidden place-content-center p-2 rounded-md card-hover',
                                item.className
                            )}
                        >
                            {item.icon}
                        </a>
                    </li>
                ))}
            </ul>
            <ul 
                className='flex items-center justify-center md:justify-start sm:[&_li]:mx-8 [&_li]:mx-4 [&_img]:max-w-none animate-infinite-scroll'
                aria-hidden='true'
            >
                {items.map((item, index) => (
                    <li key={index}>
                        <a
                            target='_blank'
                            href={item.href}
                            className={cn(
                                'border bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] text-2xl sm:grid hidden place-content-center p-2 rounded-md card-hover',
                                item.className
                            )}
                        >
                            {item.icon}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}
