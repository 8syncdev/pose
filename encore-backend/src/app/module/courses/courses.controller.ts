import { api, APIError } from "encore.dev/api";
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
} from "./courses.dto";
import { 
    CourseService, 
    ChapterService, 
    CategoryService,
    LessonService,
    VoucherService
} from "./services";
import { DataResponse } from "../../../common/dto";
import { EnrollmentService, RoleService } from "./courses.module";
import { getAuthData } from "encore.dev/internal/codegen/auth";
import type { AuthDataDto } from "./courses.module";
import { EnrollmentDto } from "../enrollments/enrollments.dto";

// Course APIs

/**
 * Create a new course
 * @description Creates a new course in the system
 * @access Admin and Instructor only
 * @method POST
 * @route /courses
 * @auth Required
 * @param {CreateCourseDto} data Course creation data
 * @returns {Promise<CourseResponse>} Created course details
 */
export const createCourse = api(
    { expose: true, method: "POST", path: "/courses", auth: true },
    async (data: CreateCourseDto): Promise<CourseResponse> => {
        try {
            const authData = getAuthData<AuthDataDto>();
            if (!authData) {
                throw APIError.unauthenticated("Authentication required");
            }

            // Check if user has instructor or admin role
            const hasRole = await RoleService.checkRoleExistInUserRoles(parseInt(authData.userID), [1, 2]); // 1=admin, 2=instructor
            if (!hasRole.success || !hasRole.result) {
                throw APIError.permissionDenied("Requires admin or instructor role");
            }

            return await CourseService.create(data);
        } catch (error) {
            throw APIError.aborted(error?.toString() || "Error creating course");
        }
    }
);

/**
 * Get all courses with pagination
 * @description Retrieves a paginated list of all courses
 * @access Public
 * @method GET
 * @route /courses
 * @param {number} page Page number (optional)
 * @param {number} limit Items per page (optional)
 * @returns {Promise<CourseResponse>} Paginated list of courses
 */
export const getAllCourses = api(
    { expose: true, method: "GET", path: "/courses" },
    async ({ page, limit }: { page?: number; limit?: number }): Promise<CourseResponse> => {
        try {
            // Public API - no auth required
            return await CourseService.find(page || 1, limit || 10);
        } catch (error) {
            throw APIError.aborted(error?.toString() || "Error getting courses");
        }
    }
);

/**
 * Get course by ID
 * @description Retrieves detailed information about a specific course
 * @access Public for free courses, Enrolled users for paid courses
 * @method GET
 * @route /courses/:id
 * @param {number} id Course ID
 * @returns {Promise<CourseResponse>} Course details
 */
export const getCourseById = api(
    { expose: true, method: "GET", path: "/courses/:id" },
    async ({ id }: { id: number }): Promise<CourseResponse> => {
        try {
            return await CourseService.findOne(id);
        } catch (error) {
            throw APIError.aborted(error?.toString() || "Error getting course");
        }
    }
);

/**
 * Update a course
 * @description Updates an existing course's information
 * @access Admin and Instructor only
 * @method PATCH
 * @route /courses/:id
 * @auth Required
 * @param {number} id Course ID
 * @param {UpdateCourseDto} data Course update data
 * @returns {Promise<CourseResponse>} Updated course details
 */
export const updateCourse = api(
    { expose: true, method: "PATCH", path: "/courses/:id", auth: true },
    async ({ id, data }: { id: number; data: UpdateCourseDto }): Promise<CourseResponse> => {
        try {
            const authData = getAuthData<AuthDataDto>();
            if (!authData) {
                throw APIError.unauthenticated("Authentication required");
            }

            // Check if user has instructor or admin role
            const hasRole = await RoleService.checkRoleExistInUserRoles(parseInt(authData.userID), [1, 2]); // 1=admin, 2=instructor
            if (!hasRole.success || !hasRole.result) {
                throw APIError.permissionDenied("Requires admin or instructor role");
            }

            return await CourseService.update(id, data);
        } catch (error) {
            throw APIError.aborted(error?.toString() || "Error updating course");
        }
    }
);

/**
 * Delete a course
 * @description Deletes an existing course from the system
 * @access Admin only
 * @method DELETE
 * @route /courses/:id
 * @auth Required
 * @param {number} id Course ID
 * @returns {Promise<CourseResponse>} Deletion confirmation
 */
export const deleteCourse = api(
    { expose: true, method: "DELETE", path: "/courses/:id", auth: true },
    async ({ id }: { id: number }): Promise<CourseResponse> => {
        try {
            const authData = getAuthData<AuthDataDto>();
            if (!authData) {
                throw APIError.unauthenticated("Authentication required");
            }

            // Check if user has admin role
            const hasRole = await RoleService.checkRoleExistInUserRoles(parseInt(authData.userID), [1]); // 1=admin
            if (!hasRole.success || !hasRole.result) {
                throw APIError.permissionDenied("Requires admin role");
            }

            return await CourseService.delete(id);
        } catch (error) {
            throw APIError.aborted(error?.toString() || "Error deleting course");
        }
    }
);

/**
 * Get courses with categories
 * @description Retrieves a paginated list of courses with their associated categories
 * @access Public
 * @method GET
 * @route /courses-with-categories
 * @param {number} page Page number (optional)
 * @param {number} limit Items per page (optional)
 * @returns {Promise<CourseWithCategoriesResponse>} Paginated list of courses with categories
 */
export const getCoursesWithCategories = api(
    { expose: true, method: "GET", path: "/courses-with-categories" },
    async ({ page, limit }: { page?: number; limit?: number }): Promise<CourseWithCategoriesResponse> => {
        try {
            // Public API - no auth required
            return await CourseService.findWithCategories(page || 1, limit || 10);
        } catch (error) {
            throw APIError.aborted(error?.toString() || "Error getting courses with categories");
        }
    }
);

/**
 * Check if course is free
 * @description Checks whether a specific course is free or requires payment/enrollment
 * @access Public
 * @method GET
 * @route /courses/:id/is-free
 * @param {number} id Course ID
 * @returns {Promise<DataResponse>} Course free status
 */
export const checkCourseIsFree = api(
    { expose: true, method: "GET", path: "/courses/:id/is-free" },
    async ({ id }: { id: number }): Promise<DataResponse> => {
        try {
            return await CourseService.checkCourseIsFree(id);
        } catch (error) {
            throw APIError.aborted(error?.toString() || "Error checking if course is free");
        }
    }
);

// Category APIs

/**
 * Create a new category
 * @description Creates a new course category in the system
 * @access Admin only
 * @method POST
 * @route /categories
 * @auth Required
 * @param {CreateCategoryDto} data Category creation data
 * @returns {Promise<CategoryResponse>} Created category details
 */
export const createCategory = api(
    { expose: true, method: "POST", path: "/categories", auth: true },
    async (data: CreateCategoryDto): Promise<CategoryResponse> => {
        try {
            const authData = getAuthData<AuthDataDto>();
            if (!authData) {
                throw APIError.unauthenticated("Authentication required");
            }

            // Check if user has admin role
            const hasRole = await RoleService.checkRoleExistInUserRoles(parseInt(authData.userID), [1]); // 1=admin
            if (!hasRole.success || !hasRole.result) {
                throw APIError.permissionDenied("Requires admin role");
            }

            return await CategoryService.create(data);
        } catch (error) {
            throw APIError.aborted(error?.toString() || "Error creating category");
        }
    }
);

/**
 * Get all categories with pagination
 * @description Retrieves a paginated list of all course categories
 * @access Public
 * @method GET
 * @route /categories
 * @param {number} page Page number (optional)
 * @param {number} limit Items per page (optional)
 * @returns {Promise<CategoryResponse>} Paginated list of categories
 */
export const getAllCategories = api(
    { expose: true, method: "GET", path: "/categories" },
    async ({ page, limit }: { page?: number; limit?: number }): Promise<CategoryResponse> => {
        try {
            return await CategoryService.find(page || 1, limit || 10);
        } catch (error) {
            throw APIError.aborted(error?.toString() || "Error getting categories");
        }
    }
);

/**
 * Get category by ID
 * @description Retrieves detailed information about a specific category
 * @access Public
 * @method GET
 * @route /categories/:id
 * @param {number} id Category ID
 * @returns {Promise<CategoryResponse>} Category details
 */
export const getCategoryById = api(
    { expose: true, method: "GET", path: "/categories/:id" },
    async ({ id }: { id: number }): Promise<CategoryResponse> => {
        try {
            return await CategoryService.findOne(id);
        } catch (error) {
            throw APIError.aborted(error?.toString() || "Error getting category");
        }
    }
);

/**
 * Update category
 * @description Updates an existing course category
 * @access Admin only
 * @method PATCH
 * @route /categories/:id
 * @auth Required
 * @param {number} id Category ID
 * @param {UpdateCategoryDto} data Category update data
 * @returns {Promise<CategoryResponse>} Updated category details
 */
export const updateCategory = api(
    { expose: true, method: "PATCH", path: "/categories/:id", auth: true },
    async ({ id, data }: { id: number; data: UpdateCategoryDto }): Promise<CategoryResponse> => {
        try {
            const authData = getAuthData<AuthDataDto>();
            if (!authData) {
                throw APIError.unauthenticated("Authentication required");
            }

            // Check if user has admin role
            const hasRole = await RoleService.checkRoleExistInUserRoles(parseInt(authData.userID), [1]); // 1=admin
            if (!hasRole.success || !hasRole.result) {
                throw APIError.permissionDenied("Requires admin role");
            }

            return await CategoryService.update(id, data);
        } catch (error) {
            throw APIError.aborted(error?.toString() || "Error updating category");
        }
    }
);

/**
 * Delete category
 * @description Deletes an existing course category
 * @access Admin only
 * @method DELETE
 * @route /categories/:id
 * @auth Required
 * @param {number} id Category ID
 * @returns {Promise<CategoryResponse>} Deletion confirmation
 */
export const deleteCategory = api(
    { expose: true, method: "DELETE", path: "/categories/:id", auth: true },
    async ({ id }: { id: number }): Promise<CategoryResponse> => {
        try {
            const authData = getAuthData<AuthDataDto>();
            if (!authData) {
                throw APIError.unauthenticated("Authentication required");
            }

            // Check if user has admin role
            const hasRole = await RoleService.checkRoleExistInUserRoles(parseInt(authData.userID), [1]); // 1=admin
            if (!hasRole.success || !hasRole.result) {
                throw APIError.permissionDenied("Requires admin role");
            }

            return await CategoryService.delete(id);
        } catch (error) {
            throw APIError.aborted(error?.toString() || "Error deleting category");
        }
    }
);

// Chapter APIs

/**
 * Create a new chapter
 * @description Creates a new chapter in a course
 * @access Admin and Instructor only
 * @method POST
 * @route /chapters
 * @auth Required
 * @param {CreateChapterDto} data Chapter creation data
 * @returns {Promise<ChapterResponse>} Created chapter details
 */
export const createChapter = api(
    { expose: true, method: "POST", path: "/chapters", auth: true },
    async (data: CreateChapterDto): Promise<ChapterResponse> => {
        try {
            const authData = getAuthData<AuthDataDto>();
            if (!authData) {
                throw APIError.unauthenticated("Authentication required");
            }

            // Check if user has instructor or admin role
            const hasRole = await RoleService.checkRoleExistInUserRoles(parseInt(authData.userID), [1, 2]); // 1=admin, 2=instructor
            if (!hasRole.success || !hasRole.result) {
                throw APIError.permissionDenied("Requires admin or instructor role");
            }

            return await ChapterService.create(data);
        } catch (error) {
            throw APIError.aborted(error?.toString() || "Error creating chapter");
        }
    }
);

/**
 * Get chapters by course ID
 * @description Retrieves all chapters for a specific course
 * @access Public for free courses, Enrolled users for paid courses
 * @method GET
 * @route /courses/:courseId/chapters
 * @param {number} courseId Course ID
 * @param {number} page Page number (optional)
 * @param {number} limit Items per page (optional)
 * @returns {Promise<ChapterResponse>} Paginated list of chapters
 */
export const getChaptersByCourseId = api(
    { expose: true, method: "GET", path: "/courses/:courseId/chapters" },
    async ({ courseId, page, limit }: { courseId: number; page?: number; limit?: number }): Promise<ChapterResponse> => {
        try {
            return await ChapterService.findByCourseId(courseId, page || 1, limit || 10);
        } catch (error) {
            throw APIError.aborted(error?.toString() || "Error getting chapters");
        }
    }
);

/**
 * Get chapter by ID
 * @description Retrieves a specific chapter by ID
 * @access Public for free courses, Enrolled users for paid courses
 * @method GET
 * @route /chapters/:id
 * @param {number} id Chapter ID
 * @returns {Promise<ChapterResponse>} Chapter details
 */
export const getChapterById = api(
    { expose: true, method: "GET", path: "/chapters/:id" },
    async ({ id }: { id: number }): Promise<ChapterResponse> => {
        try {
            return await ChapterService.findOne(id);
        } catch (error) {
            throw APIError.aborted(error?.toString() || "Error getting chapter");
        }
    }
);

/**
 * Update chapter
 * @description Updates an existing chapter
 * @access Admin and Instructor only
 * @method PATCH
 * @route /chapters/:id
 * @auth Required
 * @param {number} id Chapter ID
 * @param {UpdateChapterDto} data Chapter update data
 * @returns {Promise<ChapterResponse>} Updated chapter details
 */
export const updateChapter = api(
    { expose: true, method: "PATCH", path: "/chapters/:id", auth: true },
    async ({ id, data }: { id: number; data: UpdateChapterDto }): Promise<ChapterResponse> => {
        try {
            const authData = getAuthData<AuthDataDto>();
            if (!authData) {
                throw APIError.unauthenticated("Authentication required");
            }

            // Check if user has instructor or admin role
            const hasRole = await RoleService.checkRoleExistInUserRoles(parseInt(authData.userID), [1, 2]); // 1=admin, 2=instructor
            if (!hasRole.success || !hasRole.result) {
                throw APIError.permissionDenied("Requires admin or instructor role");
            }

            return await ChapterService.update(id, data);
        } catch (error) {
            throw APIError.aborted(error?.toString() || "Error updating chapter");
        }
    }
);

/**
 * Delete chapter
 * @description Deletes an existing chapter
 * @access Admin and Instructor only
 * @method DELETE
 * @route /chapters/:id
 * @auth Required
 * @param {number} id Chapter ID
 * @returns {Promise<ChapterResponse>} Deletion confirmation
 */
export const deleteChapter = api(
    { expose: true, method: "DELETE", path: "/chapters/:id", auth: true },
    async ({ id }: { id: number }): Promise<ChapterResponse> => {
        try {
            const authData = getAuthData<AuthDataDto>();
            if (!authData) {
                throw APIError.unauthenticated("Authentication required");
            }

            // Check if user has instructor or admin role
            const hasRole = await RoleService.checkRoleExistInUserRoles(parseInt(authData.userID), [1, 2]); // 1=admin, 2=instructor
            if (!hasRole.success || !hasRole.result) {
                throw APIError.permissionDenied("Requires admin or instructor role");
            }

            return await ChapterService.delete(id);
        } catch (error) {
            throw APIError.aborted(error?.toString() || "Error deleting chapter");
        }
    }
);


/**
 * Get all chapters with pagination
 * @description Retrieves a paginated list of all chapters
 * @access Admin only
 * @method GET
 * @route /chapters
 * @auth Required
 * @param {number} page Page number (optional)
 * @param {number} limit Items per page (optional)
 * @returns {Promise<ChapterResponse>} Paginated list of chapters
 */
export const getAllChapters = api(
    { expose: true, method: "GET", path: "/chapters", auth: true },
    async ({ page, limit }: { page?: number; limit?: number }): Promise<ChapterResponse> => {
        try {
            const authData = getAuthData<AuthDataDto>();
            if (!authData) {
                throw APIError.unauthenticated("Authentication required");
            }

            // Check if user has admin role
            const hasRole = await RoleService.checkRoleExistInUserRoles(parseInt(authData.userID), [1]); // 1=admin
            if (!hasRole.success || !hasRole.result) {
                throw APIError.permissionDenied("Requires admin role");
            }

            return await ChapterService.find(page || 1, limit || 10);
        } catch (error) {
            throw APIError.aborted(error?.toString() || "Error getting chapters");
        }
    }
);


// Lesson APIs

/**
 * Create a new lesson
 * @description Creates a new lesson in a chapter
 * @access Admin and Instructor only
 * @method POST
 * @route /lessons
 * @auth Required
 * @param {CreateLessonDto} data Lesson creation data
 * @returns {Promise<LessonResponse>} Created lesson details
 */
export const createLesson = api(
    { expose: true, method: "POST", path: "/lessons", auth: true },
    async (data: CreateLessonDto): Promise<LessonResponse> => {
        try {
            const authData = getAuthData<AuthDataDto>();
            if (!authData) {
                throw APIError.unauthenticated("Authentication required");
            }

            // Check if user has instructor or admin role
            const hasRole = await RoleService.checkRoleExistInUserRoles(parseInt(authData.userID), [1, 2]); // 1=admin, 2=instructor
            if (!hasRole.success || !hasRole.result) {
                throw APIError.permissionDenied("Requires admin or instructor role");
            }

            return await LessonService.create(data);
        } catch (error) {
            throw APIError.aborted(error?.toString() || "Error creating lesson");
        }
    }
);

/**
 * Get lesson by ID
 * @description Retrieves a specific lesson by ID
 * @access Public for free courses, Enrolled users for paid courses
 * @method GET
 * @route /lessons/:id
 * @param {number} id Lesson ID
 * @returns {Promise<LessonResponse>} Lesson details
 */
export const getLessonById = api(
    { expose: true, method: "GET", path: "/lessons/:id" },
    async ({ id }: { id: number }): Promise<LessonResponse> => {
        try {
            return await LessonService.findOne(id);
        } catch (error) {
            throw APIError.aborted(error?.toString() || "Error getting lesson");
        }
    }
);

/**
 * Get lessons by chapter ID
 * @description Retrieves lessons for a specific chapter
 * @access Public for free courses, Enrolled users for paid courses, Admin and Instructor
 * @method GET
 * @route /chapters/:chapterId/lessons
 * @param {number} chapterId Chapter ID
 * @param {number} page Page number (optional)
 * @param {number} limit Items per page (optional)
 * @returns {Promise<LessonResponse>} Paginated list of lessons
 */
export const getLessonsByChapterId = api(
    { expose: true, method: "GET", path: "/chapters/:chapterId/lessons" },
    async ({ chapterId, page, limit }: { chapterId: number; page?: number; limit?: number }): Promise<LessonResponse> => {
        try {
            const authData = getAuthData<AuthDataDto>();    
            if (!authData) {
                return await LessonService.findByChapter(chapterId, page || 1, limit || 10);
            }
            const chapter = await ChapterService.findOne(chapterId);
            if (!chapter.success || !chapter.result) {
                throw APIError.notFound("Chapter not found");
            }

            const checkEnroll = await EnrollmentService.checkEnrollInCourse(parseInt(authData.userID), Array.isArray(chapter.result) ? chapter.result[0].course_id : chapter.result.course_id);

            const enrollment = Array.isArray(checkEnroll.result) ? checkEnroll.result[0] : checkEnroll.result;
            if (enrollment?.status === "active" || enrollment?.status === "trial") {
                return await LessonService.findByChapter(chapterId, page || 1, limit || 10, true);
            }

            return await LessonService.findByChapter(chapterId, page || 1, limit || 10);
        } catch (error) {
            throw APIError.aborted(error?.toString() || "Error getting lessons");
        }
    }
);

/**
 * Update lesson
 * @description Updates an existing lesson
 * @access Admin and Instructor only
 * @method PATCH
 * @route /lessons/:id
 * @auth Required
 * @param {number} id Lesson ID
 * @param {UpdateLessonDto} data Lesson update data
 * @returns {Promise<LessonResponse>} Updated lesson details
 */
export const updateLesson = api(
    { expose: true, method: "PATCH", path: "/lessons/:id", auth: true },
    async ({ id, data }: { id: number; data: UpdateLessonDto }): Promise<LessonResponse> => {
        try {
            const authData = getAuthData<AuthDataDto>();
            if (!authData) {
                throw APIError.unauthenticated("Authentication required");
            }

            // Check if user has instructor or admin role
            const hasRole = await RoleService.checkRoleExistInUserRoles(parseInt(authData.userID), [1, 2]); // 1=admin, 2=instructor
            if (!hasRole.success || !hasRole.result) {
                throw APIError.permissionDenied("Requires admin or instructor role");
            }

            return await LessonService.update(id, data);
        } catch (error) {
            throw APIError.aborted(error?.toString() || "Error updating lesson");
        }
    }
);

/**
 * Delete lesson
 * @description Deletes an existing lesson
 * @access Admin and Instructor only
 * @method DELETE
 * @route /lessons/:id
 * @auth Required
 * @param {number} id Lesson ID
 * @returns {Promise<LessonResponse>} Deletion confirmation
 */
export const deleteLesson = api(
    { expose: true, method: "DELETE", path: "/lessons/:id", auth: true },
    async ({ id }: { id: number }): Promise<LessonResponse> => {
        try {
            const authData = getAuthData<AuthDataDto>();
            if (!authData) {
                throw APIError.unauthenticated("Authentication required");
            }

            // Check if user has instructor or admin role
            const hasRole = await RoleService.checkRoleExistInUserRoles(parseInt(authData.userID), [1, 2]); // 1=admin, 2=instructor
            if (!hasRole.success || !hasRole.result) {
                throw APIError.permissionDenied("Requires admin or instructor role");
            }

            return await LessonService.delete(id);
        } catch (error) {
            throw APIError.aborted(error?.toString() || "Error deleting lesson");
        }
    }
);

/**
 * Get all lessons with pagination
 * @description Retrieves a paginated list of all lessons
 * @access Admin only
 * @method GET
 * @route /lessons
 * @auth Required
 * @param {number} page Page number (optional)
 * @param {number} limit Items per page (optional)
 * @returns {Promise<LessonResponse>} Paginated list of lessons
 */
export const getAllLessons = api(
    { expose: true, method: "GET", path: "/lessons", auth: true },
    async ({ page, limit }: { page?: number; limit?: number }): Promise<LessonResponse> => {
        try {
            const authData = getAuthData<AuthDataDto>();
            if (!authData) {
                throw APIError.unauthenticated("Authentication required");
            }

            // Check if user has admin role
            const hasRole = await RoleService.checkRoleExistInUserRoles(parseInt(authData.userID), [1]); // 1=admin
            if (!hasRole.success || !hasRole.result) {
                throw APIError.permissionDenied("Requires admin role");
            }

            return await LessonService.find(page || 1, limit || 10, true);
        } catch (error) {
            throw APIError.aborted(error?.toString() || "Error getting lessons");
        }
    }
);


// Voucher APIs

/**
 * Create a new voucher
 * @description Creates a new voucher for a course
 * @access Admin only
 * @method POST
 * @route /vouchers
 * @auth Required
 * @param {CreateVoucherDto} data Voucher creation data
 * @returns {Promise<VoucherResponse>} Created voucher details
 */
export const createVoucher = api(
    { expose: true, method: "POST", path: "/vouchers", auth: true },
    async (data: CreateVoucherDto): Promise<VoucherResponse> => {
        try {
            const authData = getAuthData<AuthDataDto>();
            if (!authData) {
                throw APIError.unauthenticated("Authentication required");
            }

            // Check if user has admin role
            const hasRole = await RoleService.checkRoleExistInUserRoles(parseInt(authData.userID), [1]); // 1=admin
            if (!hasRole.success || !hasRole.result) {
                throw APIError.permissionDenied("Requires admin role");
            }

            return await VoucherService.create(data);
        } catch (error) {
            throw APIError.aborted(error?.toString() || "Error creating voucher");
        }
    }
);

/**
 * Get voucher by ID
 * @description Retrieves a specific voucher by ID
 * @access Admin only
 * @method GET
 * @route /vouchers/:id
 * @auth Required
 * @param {number} id Voucher ID
 * @returns {Promise<VoucherResponse>} Voucher details
 */
export const getVoucherById = api(
    { expose: true, method: "GET", path: "/vouchers/:id", auth: true },
    async ({ id }: { id: number }): Promise<VoucherResponse> => {
        try {
            const authData = getAuthData<AuthDataDto>();
            if (!authData) {
                throw APIError.unauthenticated("Authentication required");
            }

            // Check if user has admin role
            const hasRole = await RoleService.checkRoleExistInUserRoles(parseInt(authData.userID), [1]); // 1=admin
            if (!hasRole.success || !hasRole.result) {
                throw APIError.permissionDenied("Requires admin role");
            }

            return await VoucherService.findOne(id);
        } catch (error) {
            throw APIError.aborted(error?.toString() || "Error getting voucher");
        }
    }
);

/**
 * Get vouchers by course ID
 * @description Retrieves vouchers for a specific course
 * @access Admin only
 * @method GET
 * @route /courses/:courseId/vouchers
 * @auth Required
 * @param {number} courseId Course ID
 * @param {number} page Page number (optional)
 * @param {number} limit Items per page (optional)
 * @returns {Promise<VoucherResponse>} Paginated list of vouchers
 */
export const getVouchersByCourseId = api(
    { expose: true, method: "GET", path: "/courses/:courseId/vouchers", auth: true },
    async ({ courseId, page, limit }: { courseId: number; page?: number; limit?: number }): Promise<VoucherResponse> => {
        try {
            const authData = getAuthData<AuthDataDto>();
            if (!authData) {
                throw APIError.unauthenticated("Authentication required");
            }

            // Check if user has admin role
            const hasRole = await RoleService.checkRoleExistInUserRoles(parseInt(authData.userID), [1]); // 1=admin
            if (!hasRole.success || !hasRole.result) {
                throw APIError.permissionDenied("Requires admin role");
            }

            return await VoucherService.findByCourseId(courseId, page || 1, limit || 10);
        } catch (error) {
            throw APIError.aborted(error?.toString() || "Error getting vouchers");
        }
    }
);

/**
 * Update voucher
 * @description Updates an existing voucher
 * @access Admin only
 * @method PATCH
 * @route /vouchers/:id
 * @auth Required
 * @param {number} id Voucher ID
 * @param {UpdateVoucherDto} data Voucher update data
 * @returns {Promise<VoucherResponse>} Updated voucher details
 */
export const updateVoucher = api(
    { expose: true, method: "PATCH", path: "/vouchers/:id", auth: true },
    async ({ id, data }: { id: number; data: UpdateVoucherDto }): Promise<VoucherResponse> => {
        try {
            const authData = getAuthData<AuthDataDto>();
            if (!authData) {
                throw APIError.unauthenticated("Authentication required");
            }

            // Check if user has admin role
            const hasRole = await RoleService.checkRoleExistInUserRoles(parseInt(authData.userID), [1]); // 1=admin
            if (!hasRole.success || !hasRole.result) {
                throw APIError.permissionDenied("Requires admin role");
            }

            return await VoucherService.update(id, data);
        } catch (error) {
            throw APIError.aborted(error?.toString() || "Error updating voucher");
        }
    }
);

/**
 * Delete voucher
 * @description Deletes an existing voucher
 * @access Admin only
 * @method DELETE
 * @route /vouchers/:id
 * @auth Required
 * @param {number} id Voucher ID
 * @returns {Promise<VoucherResponse>} Deletion confirmation
 */
export const deleteVoucher = api(
    { expose: true, method: "DELETE", path: "/vouchers/:id", auth: true },
    async ({ id }: { id: number }): Promise<VoucherResponse> => {
        try {
            const authData = getAuthData<AuthDataDto>();
            if (!authData) {
                throw APIError.unauthenticated("Authentication required");
            }

            // Check if user has admin role
            const hasRole = await RoleService.checkRoleExistInUserRoles(parseInt(authData.userID), [1]); // 1=admin
            if (!hasRole.success || !hasRole.result) {
                throw APIError.permissionDenied("Requires admin role");
            }

            return await VoucherService.delete(id);
        } catch (error) {
            throw APIError.aborted(error?.toString() || "Error deleting voucher");
        }
    }
);

/**
 * Get all vouchers
 * @description Retrieves all vouchers with pagination
 * @access Admin only
 * @method GET
 * @route /vouchers
 * @auth Required
 * @param {number} page Page number (optional)
 * @param {number} limit Items per page (optional)
 * @returns {Promise<VoucherResponse>} Paginated list of vouchers
 */
export const getAllVouchers = api(
    { expose: true, method: "GET", path: "/vouchers", auth: true },
    async ({ page, limit }: { page?: number; limit?: number }): Promise<VoucherResponse> => {
        try {
            const authData = getAuthData<AuthDataDto>();
            if (!authData) {
                throw APIError.unauthenticated("Authentication required");
            }

            // Check if user has admin role
            const hasRole = await RoleService.checkRoleExistInUserRoles(parseInt(authData.userID), [1]); // 1=admin
            if (!hasRole.success || !hasRole.result) {
                throw APIError.permissionDenied("Requires admin role");
            }

            return await VoucherService.find(page || 1, limit || 10);
        } catch (error) {
            throw APIError.aborted(error?.toString() || "Error getting vouchers");
        }
    }
);

/**
 * Get voucher by code
 * @description Retrieves a specific voucher by its code
 * @access Public
 * @method GET
 * @route /vouchers/code/:code
 * @param {string} code Voucher code
 * @returns {Promise<VoucherResponse>} Voucher details
 */
export const getVoucherByCode = api(
    { expose: true, method: "GET", path: "/vouchers/code/:code" },
    async ({ code }: { code: string }): Promise<VoucherResponse> => {
        try {
            return await VoucherService.findByCode(code);
        } catch (error) {
            throw APIError.aborted(error?.toString() || "Error getting voucher by code");
        }
    }
);
