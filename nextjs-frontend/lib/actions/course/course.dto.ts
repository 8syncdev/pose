import { DataResponse, Paginated } from '../base.dto';

export interface Course {
  id?: number;
  name: string;
  slug: string;
  description?: string;
  img_url?: string;
  price: number;
  discounted_price?: number;
  author_id?: number;
  difficulty_level?: 'Beginner' | 'Intermediate' | 'Advanced';
  duration_hours?: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id?: number;
  name: string;
  slug: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface CourseCategory {
  course_id: number;
  category_id: number;
}

export interface Chapter {
  id?: number;
  course_id: number;
  name: string;
  description?: string | null;
  order: number;
  duration_minutes?: number;
  created_at: string;
  updated_at: string;
}

export interface Lesson {
  id?: number;
  chapter_id: number;
  name: string;
  description?: string;
  order: number;
  content?: string;
  video_url?: string;
  duration_minutes?: number;
  is_free: boolean;
  created_at: string;
  updated_at: string;
}

export interface Exercise {
  id?: number;
  lesson_id: number;
  name: string;
  description?: string;
  order: number;
  content?: string;
  created_at: string;
  updated_at: string;
}

export interface Voucher {
  id?: number;
  code: string;
  discount: number;
  discount_type: 'Percentage' | 'Fixed';
  max_uses?: number;
  uses_count: number;
  start_date?: string;
  expiration_date: string;
  course_id?: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export type CourseDto = Course;
export type CategoryDto = Category;
export type CourseCategoryDto = CourseCategory;
export type ChapterDto = Chapter;
export type LessonDto = Lesson;
export type ExerciseDto = Exercise;
export type VoucherDto = Voucher;
export type UserDto = User;

export type CreateCourseDto = Omit<Course, 'id' | 'created_at' | 'updated_at'>;
export type UpdateCourseDto = Partial<Omit<Course, 'id' | 'created_at' | 'updated_at'>>;

export type CreateCategoryDto = Omit<Category, 'id' | 'created_at' | 'updated_at'>;
export type UpdateCategoryDto = Partial<Omit<Category, 'id' | 'created_at' | 'updated_at'>>;

export type CreateChapterDto = Omit<Chapter, 'id' | 'created_at' | 'updated_at'>;
export type UpdateChapterDto = Partial<Omit<Chapter, 'id' | 'created_at' | 'updated_at'>>;

export type CreateLessonDto = Omit<Lesson, 'id' | 'created_at' | 'updated_at'>;
export type UpdateLessonDto = Partial<Omit<Lesson, 'id' | 'created_at' | 'updated_at'>>;

export type CreateExerciseDto = Omit<Exercise, 'id' | 'created_at' | 'updated_at'>;
export type UpdateExerciseDto = Partial<Omit<Exercise, 'id' | 'created_at' | 'updated_at'>>;

export type CreateVoucherDto = Omit<Voucher, 'id' | 'created_at' | 'updated_at'>;
export type UpdateVoucherDto = Partial<Omit<Voucher, 'id' | 'created_at' | 'updated_at'>>;

export type CourseResponse = Omit<DataResponse, 'result'> & {
  result?: CourseDto | CourseDto[];
  pagination?: Paginated;
}

export type CategoryResponse = Omit<DataResponse, 'result'> & {
  result?: CategoryDto | CategoryDto[];
  pagination?: Paginated;
}

export type ChapterResponse = Omit<DataResponse, 'result'> & {
  result?: ChapterDto | ChapterDto[];
  pagination?: Paginated;
}

export type LessonResponse = Omit<DataResponse, 'result'> & {
  result?: LessonDto | LessonDto[];
  pagination?: Paginated;
}

export type ExerciseResponse = Omit<DataResponse, 'result'> & {
  result?: ExerciseDto | ExerciseDto[];
  pagination?: Paginated;
}

export type VoucherResponse = Omit<DataResponse, 'result'> & {
  result?: VoucherDto | VoucherDto[];
  pagination?: Paginated;
}

export type UserResponse = Omit<DataResponse, 'result'> & {
  result?: UserDto | UserDto[];
  pagination?: Paginated;
}

export type CourseWithCategories = {
  course: CourseDto;
  categories: string[];
};

export type CourseWithCategoriesResponse = Omit<DataResponse, 'result'> & {
  result?: CourseWithCategories[];
  pagination?: Paginated;
}
