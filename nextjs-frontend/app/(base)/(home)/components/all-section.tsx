'use client';

import IntroSection from './intro-section';
import RoadSection from './road-section';
import CourseSection from './course-section';
import AskSection from './ask-section';

export default function AllSection() {
    return (
        <div className="space-y-20">
            <div id="intro">
                <IntroSection />
            </div>
            <div id="roadmap">
                <RoadSection />
            </div>
            <div id="courses">
                <CourseSection />
            </div>
            <div id="ask">
                <AskSection />
            </div>
        </div>
    );
}
