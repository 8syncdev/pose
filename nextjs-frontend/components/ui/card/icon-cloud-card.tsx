'use client';

import Link from 'next/link';
import { IconCloud } from '@/components/ui/animation/icon-cloud';
import { cn } from '@/lib/utils';

interface IconCloudCardProps {
  title: string;
  icons: string[];
  href?: string;
  description?: string;
  className?: string;
  containerClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  aspectRatio?: 'square' | 'video' | 'auto';
}

export function IconCloudCard({
  title,
  icons,
  href,
  description,
  className,
  containerClassName,
  titleClassName,
  descriptionClassName,
  aspectRatio = 'video'
}: IconCloudCardProps) {
  const CardWrapper = href ? Link : 'div';
  
  return (
    <CardWrapper
      href={href || ''}
      className={cn(
        'relative z-10 rounded-lg p-3 w-full h-full mx-auto',
        className
      )}
    >
      <div className={cn(
        'rounded-lg grid place-content-center relative max-h-full h-full 2xl:p-3 p-0 w-full',
        containerClassName
      )}>
        <div className='absolute rounded-lg top-0 left-0 h-full w-full -z-10 bg-center bg-cover' />
        <div className={cn(
          'relative w-full rounded-lg overflow-hidden shadow bg-[hsl(var(--card))]',
          {
            'aspect-video': aspectRatio === 'video',
            'aspect-square': aspectRatio === 'square'
          }
        )}>
          <div className="h-full flex items-center justify-center">
            <IconCloud iconSlugs={icons} />
          </div>
        </div>
        <h1 className={cn(
          'text-center xl:text-xl lg:text-lg text-xl font-semibold mt-4 text-balance',
          titleClassName
        )}>
          {title}
        </h1>
        {description && (
          <p className={cn(
            'text-center text-muted-foreground mt-2',
            descriptionClassName
          )}>
            {description}
          </p>
        )}
      </div>
    </CardWrapper>
  );
}
