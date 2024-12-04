import React from 'react'
import PageLearning from './components/page-learning'

type Params = {
  enrollmentId: string;
};

interface LearningPageProps {
  params: Promise<Params>;
}

const LearningPage = async ({ params }: LearningPageProps) => {
  const { enrollmentId } = await params;

  return (
    <PageLearning enrollmentId={enrollmentId} />
  )
}

export default LearningPage