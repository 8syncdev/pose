import { motion, useInView, type Variants } from 'framer-motion';
import { fadeAnimations, blurAnimations, scaleAnimations, transitions } from '@/components/hoc/framer.config';
import React, { memo } from 'react';
import dynamic from 'next/dynamic';

interface TimelineContentProps {
    children: React.ReactNode;
    animationNum?: number; // Optional animation sequence number
    timelineRef: React.RefObject<HTMLDivElement>;
    effect?: 'fade' | 'blur' | 'scale' | 'combined'; // Animation effect type
    duration?: number; // Custom duration in seconds
    delay?: number; // Custom delay in seconds
    once?: boolean; // Whether to animate only once
}

// Get appropriate variants based on selected effect
const getVariants = (effect: TimelineContentProps['effect']): Variants => {
    switch (effect) {
        case 'fade':
            return fadeAnimations.default;
        case 'blur':
            return blurAnimations.default;
        case 'scale':
            return scaleAnimations.smooth;
        case 'combined':
        default:
            return {
                visible: (i: number) => ({
                    filter: 'blur(0px)',
                    scale: 1,
                    y: 0,
                    opacity: 1,
                    transition: {
                        ...transitions.performant,
                        delay: i * 0.3,
                        duration: 0.5,
                    },
                }),
                hidden: {
                    opacity: 0,
                    scale: 0.95,
                    y: 20,
                    filter: 'blur(8px)',
                },
            };
    }
};

const TimelineContentComponent = ({
    children,
    animationNum = 0,
    timelineRef,
    effect = 'combined',
    duration = 0.5,
    delay = 0.3,
    once = false,
}: TimelineContentProps) => {
    const isInView = useInView(timelineRef, {
        once,
        amount: 0.15, // Trigger animation when 15% of element is visible
    });

    return (
        <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={animationNum}
            variants={getVariants(effect)}
        >
            {children}
        </motion.div>
    );
};

export const TimelineContent = dynamic(() => Promise.resolve(memo(TimelineContentComponent)), {
    ssr: false
});
