import { DataResponse, Paginated } from "../../../common/dto";
import {
  Course,
  Category,
  CourseCategory,
  Chapter,
  Lesson,
  Voucher
} from "./courses.model";
import { User } from "../../../dev/module/users/users.model";

export type CourseDto = Course;
export type CategoryDto = Category;
export type CourseCategoryDto = CourseCategory;
export type ChapterDto = Chapter;
export type LessonDto = Lesson;
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


