import React from 'react'
import PageDetailExercise from './components/page-detail-exercise';
import { getExerciseById } from '@/lib/actions/exercise/exercise.action';
import { Exercise } from '@/lib/actions/exercise/exercise.dto';
import { redirect } from 'next/navigation';

type Params = {
  detailExercise: string;
};

interface DetailExerciseProps {
  params: Promise<Params>;
}

const DetailExercise = async ({ params }: DetailExerciseProps) => {
  const { detailExercise } = await params;
  
  // Fetch exercise data
  const response = await getExerciseById(Number(detailExercise));
  const exercise = response.success ? (response.result as Exercise) : null;


  return (
    <PageDetailExercise exId={Number(detailExercise)} initialExercise={exercise} />
  );
};

export default DetailExercise;