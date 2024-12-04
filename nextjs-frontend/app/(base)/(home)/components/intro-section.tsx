'use client';

import { useRef } from 'react';
import { TimelineContent } from '@/components/ui/animation/scroll/framer-timeline';
import { IconCloudDemo } from '@/components/shared/icon-cloud-ui';
import { Github, Facebook, Youtube, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { SparklesText } from '@/components/ui/animation/text/sparkles-text';
import { VelocityScroll } from '@/components/ui/animation/text/scroll-text';
import { RainbowButton } from '@/components/ui/button/rainbow-button';
import GitHubButton from '@/components/ui/button/git-button';
import { MY_INFO } from '@/constants/my-info';
import { GridPattern } from '@/components/ui/bg/grid-bg';
import { Sparkles } from '@/components/ui/sparkles/sparkles';
import { Badge } from '@/components/ui/badge';

export const SparkleCustom = () => {
  return (
      <div className='absolute inset-0 [mask-image:radial-gradient(50%_50%,white,transparent)] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,hsl(var(--primary)),transparent_90%)] before:opacity-100'>
          <div className='absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#ffffff2c_1px,transparent_1px),linear-gradient(to_bottom,#3a3a3a01_1px,transparent_1px)] bg-[size:70px_80px]'></div>
          <Sparkles
              density={400}
              size={1.4}
              direction='top'
              className='absolute inset-x-0 top-0 h-full w-full [mask-image:radial-gradient(50%_50%,white,transparent_85%)]'
          />
      </div>
  )
}

export default function IntroSection() {
    const heroRef = useRef<HTMLDivElement>(null);

    return (
        <section
            className='relative min-h-screen flex items-center py-8 sm:py-12 lg:py-20 w-full overflow-x-hidden'
            ref={heroRef}
        >
            <GridPattern
                width={32}
                height={32}
                className="absolute inset-0 -z-10"
                strokeDasharray="4 4"
            />
            
            <SparkleCustom />

            <div className='container'>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 w-full relative z-10'>
                    <TimelineContent animationNum={0} timelineRef={heroRef}>
                        <div className="w-full col-span-1">
                            <IconCloudDemo />
                        </div>
                    </TimelineContent>

                    <div className='flex flex-col justify-center space-y-4 sm:space-y-6 lg:space-y-8 col-span-1'>
                        <TimelineContent animationNum={1} timelineRef={heroRef}>
                            <div className="space-y-2 sm:space-y-4">
                                <SparklesText
                                    text={MY_INFO.major}
                                    className="text-glow !text-xl sm:!text-3xl lg:!text-4xl"
                                />
                                <VelocityScroll
                                    text="Học • Xây dựng • Triển khai"
                                    default_velocity={3}
                                    className="text-gradient text-base sm:text-lg lg:text-xl font-bold"
                                />
                            </div>
                        </TimelineContent>

                        <TimelineContent animationNum={2} timelineRef={heroRef}>
                            <p className='text-sm sm:text-base lg:text-lg text-balance text-muted-foreground leading-relaxed'>
                                Tham gia khóa học IT trực tuyến toàn diện của chúng tôi. Học từ các chuyên gia trong ngành và xây dựng các dự án thực tế cùng {MY_INFO.nickname}.
                            </p>
                        </TimelineContent>

                        <TimelineContent animationNum={3} timelineRef={heroRef}>
                            <div className="flex flex-wrap gap-2 sm:gap-3">
                                <RainbowButton className="flex-1 w-auto">
                                    <Github className="size-4 text-white" />
                                    <span className="ml-2 text-xs sm:text-sm text-white dark:text-black">Bắt đầu học</span>
                                </RainbowButton>
                                <GitHubButton />
                            </div>
                        </TimelineContent>

                        <TimelineContent animationNum={4} timelineRef={heroRef}>
                            <div className="space-y-3">
                                <div className="flex flex-wrap gap-2">
                                    <Badge variant="default" className="hover:scale-105 transition-transform text-xs">{MY_INFO.techStack.frontend}</Badge>
                                    <Badge variant="default" className="hover:scale-105 transition-transform text-xs">{MY_INFO.techStack.backend}</Badge>
                                    <Badge variant="default" className="hover:scale-105 transition-transform text-xs">{MY_INFO.techStack.mobile}</Badge>
                                </div>

                                <div className="flex gap-2 sm:gap-3">
                                    <Link href={MY_INFO.socials.github} className="text-glow hover-scale">
                                        <Github className="size-4 sm:size-5" />
                                    </Link>
                                    <Link href={MY_INFO.socials.facebook} className="text-glow hover-scale">
                                        <Facebook className="size-4 sm:size-5" />
                                    </Link>
                                    <Link href={MY_INFO.socials.youtube} className="text-glow hover-scale">
                                        <Youtube className="size-4 sm:size-5" />
                                    </Link>
                                    <Link href={`tel:${MY_INFO.contact}`} className="text-glow hover-scale">
                                        <MessageCircle className="size-4 sm:size-5" />
                                    </Link>
                                </div>
                            </div>
                        </TimelineContent>
                    </div>
                </div>
            </div>
        </section>
    );
}
