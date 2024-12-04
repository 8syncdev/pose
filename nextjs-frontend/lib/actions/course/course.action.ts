import { post, get, patch, del } from '../config';
import { DOMAIN_BE } from '../const';
import { getCookieToken } from '@/lib/cookie';
import {
    CreateCourseDto,
    CourseResponse,
    UpdateCourseDto,
    CourseWithCategoriesResponse,
    CreateCategoryDto,
    CategoryResponse,
    UpdateCategoryDto,
    CreateChapterDto,
    ChapterResponse,
    UpdateChapterDto,
    CreateLessonDto,
    LessonResponse,
    UpdateLessonDto,
    CreateVoucherDto,
    VoucherResponse,
    UpdateVoucherDto
} from './course.dto';

// Course APIs
export async function createCourse(data: CreateCourseDto): Promise<CourseResponse> {
    const token = await getCookieToken();

    const response = await post<CreateCourseDto, CourseResponse>(
        `${DOMAIN_BE}/courses`,
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    if (response.error) {
        return {
            success: false,
            message: response.error
        };
    }

    return response.data || {
        success: false,
        message: 'Invalid response format'
    };
}

export async function getAllCourses(page = 1, limit = 10): Promise<CourseResponse> {
    const response = await get<CourseResponse>(
        `${DOMAIN_BE}/courses?page=${page}&limit=${limit}`,
        {
            cache: 'no-store'
        }
    );

    if (response.error) {
        return {
            success: false,
            message: response.error
        };
    }

    return response.data || {
        success: false,
        message: 'Invalid response format'
    };
}

export async function getCourseById(id: number): Promise<CourseResponse> {
    const response = await get<CourseResponse>(
        `${DOMAIN_BE}/courses/${id}`, {
            cache: 'no-store'
        }
    );

    if (response.error) {
        return {
            success: false,
            message: response.error
        };
    }

    return response.data || {
        success: false,
        message: 'Invalid response format'
    };
}

export async function checkCourseIsFree(courseId: number): Promise<{ success: boolean, message: string, result?: boolean }> {
    const response = await get<{ success: boolean, message: string, result?: boolean }>(
        `${DOMAIN_BE}/courses/${courseId}/is-free`
    );

    if (response.error) {
        return {
            success: false,
            message: response.error
        };
    }

    return response.data || {
        success: false,
        message: 'Invalid response format'
    };
}

export async function updateCourse(id: number, data: UpdateCourseDto): Promise<CourseResponse> {
    const token = await getCookieToken();

    const response = await patch<{ data: UpdateCourseDto }, CourseResponse>(
        `${DOMAIN_BE}/courses/${id}`,
        {
            data
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    if (response.error) {
        return {
            success: false,
            message: response.error
        };
    }

    return response.data || {
        success: false,
        message: 'Invalid response format'
    };
}

export async function deleteCourse(id: number): Promise<CourseResponse> {
    const token = await getCookieToken();

    const response = await del<CourseResponse>(
        `${DOMAIN_BE}/courses/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    if (response.error) {
        return {
            success: false,
            message: response.error
        };
    }

    return response.data || {
        success: false,
        message: 'Invalid response format'
    };
}

export async function getCoursesWithCategories(page = 1, limit = 10): Promise<CourseWithCategoriesResponse> {
    const response = await get<CourseWithCategoriesResponse>(
        `${DOMAIN_BE}/courses-with-categories?page=${page}&limit=${limit}`, {
        cache: 'no-store'
    }
    );

    if (response.error) {
        return {
            success: false,
            message: response.error
        };
    }

    return response.data || {
        success: false,
        message: 'Invalid response format'
    };
}

// Category APIs
export async function createCategory(data: CreateCategoryDto): Promise<CategoryResponse> {
    const token = await getCookieToken();

    const response = await post<CreateCategoryDto, CategoryResponse>(
        `${DOMAIN_BE}/categories`,
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    if (response.error) {
        return {
            success: false,
            message: response.error
        };
    }

    return response.data || {
        success: false,
        message: 'Invalid response format'
    };
}

export async function getAllCategories(page = 1, limit = 10): Promise<CategoryResponse> {
    const response = await get<CategoryResponse>(
        `${DOMAIN_BE}/categories?page=${page}&limit=${limit}`
    );

    if (response.error) {
        return {
            success: false,
            message: response.error
        };
    }

    return response.data || {
        success: false,
        message: 'Invalid response format'
    };
}

export async function getCategoryById(id: number): Promise<CategoryResponse> {
    const response = await get<CategoryResponse>(
        `${DOMAIN_BE}/categories/${id}`
    );

    if (response.error) {
        return {
            success: false,
            message: response.error
        };
    }

    return response.data || {
        success: false,
        message: 'Invalid response format'
    };
}

export async function updateCategory(id: number, data: UpdateCategoryDto): Promise<CategoryResponse> {
    const token = await getCookieToken();

    const response = await patch<{ data: UpdateCategoryDto }, CategoryResponse>(
        `${DOMAIN_BE}/categories/${id}`,
        {
            data
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    if (response.error) {
        return {
            success: false,
            message: response.error
        };
    }

    return response.data || {
        success: false,
        message: 'Invalid response format'
    };
}

export async function deleteCategory(id: number): Promise<CategoryResponse> {
    const token = await getCookieToken();

    const response = await del<CategoryResponse>(
        `${DOMAIN_BE}/categories/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    if (response.error) {
        return {
            success: false,
            message: response.error
        };
    }

    return response.data || {
        success: false,
        message: 'Invalid response format'
    };
}

// Chapter APIs
export async function createChapter(data: CreateChapterDto): Promise<ChapterResponse> {
    const token = await getCookieToken();

    const response = await post<CreateChapterDto, ChapterResponse>(
        `${DOMAIN_BE}/chapters`,
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    if (response.error) {
        return {
            success: false,
            message: response.error
        };
    }

    return response.data || {
        success: false,
        message: 'Invalid response format'
    };
}

export async function getChaptersByCourseId(courseId: number, page = 1, limit = 10): Promise<ChapterResponse> {
    const response = await get<ChapterResponse>(
        `${DOMAIN_BE}/courses/${courseId}/chapters?page=${page}&limit=${limit}`,
        {
            cache: 'no-store'
        }
    );

    if (response.error) {
        return {
            success: false,
            message: response.error
        };
    }

    return response.data || {
        success: false,
        message: 'Invalid response format'
    };
}

export async function updateChapter(id: number, data: UpdateChapterDto): Promise<ChapterResponse> {
    const token = await getCookieToken();

    const response = await patch<{ data: UpdateChapterDto }, ChapterResponse>(
        `${DOMAIN_BE}/chapters/${id}`,
        {
            data
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    if (response.error) {
        return {
            success: false,
            message: response.error
        };
    }

    return response.data || {
        success: false,
        message: 'Invalid response format'
    };
}

export async function getAllChapters(page = 1, limit = 10): Promise<ChapterResponse> {
    const token = await getCookieToken();

    const response = await get<ChapterResponse>(
        `${DOMAIN_BE}/chapters?page=${page}&limit=${limit}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
            cache: 'no-store'
        }
    );

    if (response.error) {
        return {
            success: false,
            message: response.error
        };
    }

    return response.data || {
        success: false,
        message: 'Invalid response format'
    };
}

// Lesson APIs
export async function createLesson(data: CreateLessonDto): Promise<LessonResponse> {
    const token = await getCookieToken();

    const response = await post<CreateLessonDto, LessonResponse>(
        `${DOMAIN_BE}/lessons`,
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    if (response.error) {
        return {
            success: false,
            message: response.error
        };
    }

    return response.data || {
        success: false,
        message: 'Invalid response format'
    };
}

export async function getLessonsByChapterId(chapterId: number, page = 1, limit = 10): Promise<LessonResponse> {
    const token = await getCookieToken();

    const response = await get<LessonResponse>(
        `${DOMAIN_BE}/chapters/${chapterId}/lessons?page=${page}&limit=${limit}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
            cache: 'no-store'
        }
    );

    if (response.error) {
        return {
            success: false,
            message: response.error
        };
    }

    return response.data || {
        success: false,
        message: 'Invalid response format'
    };
}

export async function updateLesson(id: number, data: UpdateLessonDto): Promise<LessonResponse> {
    const token = await getCookieToken();

    const response = await patch<{ data: UpdateLessonDto }, LessonResponse>(
        `${DOMAIN_BE}/lessons/${id}`,
        {
            data
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    if (response.error) {
        return {
            success: false,
            message: response.error
        };
    }

    return response.data || {
        success: false,
        message: 'Invalid response format'
    };
}

export async function getAllLessons(page = 1, limit = 10): Promise<LessonResponse> {
    const token = await getCookieToken();

    const response = await get<LessonResponse>(
        `${DOMAIN_BE}/lessons?page=${page}&limit=${limit}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
            cache: 'no-store'
        }
    );

    if (response.error) {
        return {
            success: false,
            message: response.error
        };
    }

    return response.data || {
        success: false,
        message: 'Invalid response format'
    };
}

// Voucher APIs
export async function createVoucher(data: CreateVoucherDto): Promise<VoucherResponse> {
    const token = await getCookieToken();

    const response = await post<CreateVoucherDto, VoucherResponse>(
        `${DOMAIN_BE}/vouchers`,
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    if (response.error) {
        return {
            success: false,
            message: response.error
        };
    }

    return response.data || {
        success: false,
        message: 'Invalid response format'
    };
}

export async function getVouchersByCourseId(courseId: number, page = 1, limit = 10): Promise<VoucherResponse> {
    const token = await getCookieToken();

    const response = await get<VoucherResponse>(
        `${DOMAIN_BE}/courses/${courseId}/vouchers?page=${page}&limit=${limit}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    if (response.error) {
        return {
            success: false,
            message: response.error
        };
    }

    return response.data || {
        success: false,
        message: 'Invalid response format'
    };
}

export async function updateVoucher(id: number, data: UpdateVoucherDto): Promise<VoucherResponse> {
    const token = await getCookieToken();

    const response = await patch<{ data: UpdateVoucherDto }, VoucherResponse>(
        `${DOMAIN_BE}/vouchers/${id}`,
        {
            data
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    if (response.error) {
        return {
            success: false,
            message: response.error
        };
    }

    return response.data || {
        success: false,
        message: 'Invalid response format'
    };
}
