import React from 'react'
import PageDetailCourse from './components/page-detail-course'

type Params = {
  detaiCourse: string;
};

type SearchParams = {
  id: string;
}

interface DetailCourseProps {
  params: Promise<Params>;
  searchParams: Promise<SearchParams>;
}

const DetailCourse = async ({ params, searchParams }: DetailCourseProps) => {
  const { id } = await searchParams;
  const { detaiCourse } = await params;

  return (
    <PageDetailCourse courseId={id} />
  );
};

export default DetailCourse;