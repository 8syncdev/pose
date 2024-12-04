import { api, APIError } from "encore.dev/api";
import { getAuthData } from "encore.dev/internal/codegen/auth";
import { AuthDataDto, ChapterService, CourseService, LessonService } from "./exercises.module";
import { EnrollmentService, RoleService } from "../courses/courses.module";
import ExerciseService from "./services/exercise.service";
import { CreateExerciseDto, UpdateExerciseDto, ExerciseResponse, CreateSubmissionDto, SubmissionResponse, CreateUserSubmissionDto, UserSubmissionResponse } from "./exercises.dto";

/**
 * Create a new exercise
 * @description Creates a new exercise in the system
 * @access Admin and Instructor only
 * @method POST
 * @route /exercises
 * @auth Required
 * @param {CreateExerciseDto} data Exercise creation data
 * @returns {Promise<ExerciseResponse>} Created exercise details
 */
export const createExercise = api(
    { expose: true, method: "POST", path: "/exercises", auth: true },
    async (data: CreateExerciseDto): Promise<ExerciseResponse> => {
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

            return await ExerciseService.create(data);
        } catch (error) {
            throw APIError.aborted(error?.toString() || "Error creating exercise");
        }
    }
);

/**
 * Get all exercises with pagination
 * @description Retrieves a paginated list of all exercises
 * @access Public
 * @method GET
 * @route /exercises
 * @param {number} page Page number (optional)
 * @param {number} limit Items per page (optional)
 * @returns {Promise<ExerciseResponse>} Paginated list of exercises
 */
export const getAllExercises = api(
    { expose: true, method: "GET", path: "/exercises" },
    async ({ page, limit }: { page?: number; limit?: number }): Promise<ExerciseResponse> => {
        try {
            return await ExerciseService.find(page || 1, limit || 10);
        } catch (error) {
            throw APIError.aborted(error?.toString() || "Error getting exercises");
        }
    }
);

/**
 * Get exercise by ID
 * @description Retrieves a single exercise by its ID
 * @access Public
 * @method GET
 * @route /exercises/:id
 * @param {number} id Exercise ID
 * @returns {Promise<ExerciseResponse>} Exercise details
 */
export const getExerciseById = api(
    { expose: true, method: "GET", path: "/exercises/:id" },
    async ({ id }: { id: number }): Promise<ExerciseResponse> => {
        try {
            const exercise = await ExerciseService.findOne(id);
            const authData = getAuthData<AuthDataDto>();
            if (!authData) {
                return exercise;
            }

            if (!exercise.success || !exercise.result) {
                return exercise;
            }

            const lessonId = Array.isArray(exercise.result) 
                ? exercise.result[0]?.lesson_id 
                : exercise.result?.lesson_id;
                
            if (!lessonId) {
                return exercise;
            }

            const lesson = await LessonService.findOne(lessonId);
            if (!lesson.success || !lesson.result) {
                return exercise;
            }

            const chapterId = Array.isArray(lesson.result) 
                ? lesson.result[0]?.chapter_id 
                : lesson.result?.chapter_id;
                
            const chapter = await ChapterService.findOne(chapterId);
            if (!chapter.success || !chapter.result) {
                return exercise;
            }

            const courseId = Array.isArray(chapter.result) 
                ? chapter.result[0]?.course_id 
                : chapter.result?.course_id;

            const course = await CourseService.findOne(courseId);
            if (!course.success || !course.result) {
                return exercise;
            }

            const enrolled = await EnrollmentService.checkEnrollInCourse(parseInt(authData.userID), courseId);
            if (!enrolled.success || !enrolled.result) {
                return exercise;
            }

            const enrolledCourse = Array.isArray(enrolled.result) 
                ? enrolled.result[0]
                : enrolled.result;

            if (enrolledCourse.status === "active" || enrolledCourse.status === "trial") {
                return await ExerciseService.findOne(id, true);
            }

            return exercise;
        } catch (error) {
            throw APIError.aborted(error?.toString() || "Error getting exercise");
        }
    }
);

/**
 * Update exercise
 * @description Updates an existing exercise
 * @access Admin and Instructor only
 * @method PATCH
 * @route /exercises/:id
 * @auth Required
 * @param {number} id Exercise ID
 * @param {UpdateExerciseDto} data Exercise update data
 * @returns {Promise<ExerciseResponse>} Updated exercise details
 */
export const updateExercise = api(
    { expose: true, method: "PATCH", path: "/exercises/:id", auth: true },
    async ({ id, data }: { id: number; data: UpdateExerciseDto }): Promise<ExerciseResponse> => {
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

            return await ExerciseService.update(id, data);
        } catch (error) {
            throw APIError.aborted(error?.toString() || "Error updating exercise");
        }
    }
);

/**
 * Delete exercise
 * @description Deletes an existing exercise
 * @access Admin and Instructor only  
 * @method DELETE
 * @route /exercises/:id
 * @auth Required
 * @param {number} id Exercise ID
 * @returns {Promise<ExerciseResponse>} Deletion status
 */
export const deleteExercise = api(
    { expose: true, method: "DELETE", path: "/exercises/:id", auth: true },
    async ({ id }: { id: number }): Promise<ExerciseResponse> => {
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

            return await ExerciseService.delete(id);
        } catch (error) {
            throw APIError.aborted(error?.toString() || "Error deleting exercise");
        }
    }
);

/**
 * Create a new submission
 * @description Creates a new submission for an exercise with user tracking
 * @access Authenticated users
 * @method POST
 * @route /submissions-code
 * @auth Required
 * @param {CreateSubmissionDto} data Submission creation data with user_id
 * @returns {Promise<SubmissionResponse>} Created submission details
 */
export const createSubmission = api(
    { expose: true, method: "POST", path: "/submissions-code", auth: true },
    async (data: CreateSubmissionDto): Promise<SubmissionResponse> => {
        try {
            const authData = getAuthData<AuthDataDto>();
            if (!authData) {
                return await ExerciseService.createSubmission(data);
            }

            return await ExerciseService.createSubmission({
                ...data,
                user_id: parseInt(authData.userID)
            });
        } catch (error) {
            throw APIError.aborted(error?.toString() || "Error creating submission");
        }
    }
);



/**
 * Create a new user submission
 * @description Creates a new user submission record
 * @access Authenticated users
 * @method POST
 * @route /user-submissions
 * @auth Required
 * @param {CreateUserSubmissionDto} data User submission creation data
 * @returns {Promise<UserSubmissionResponse>} Created user submission details
 */
export const createUserSubmission = api(
    { expose: true, method: "POST", path: "/user-submissions", auth: true },
    async (data: CreateUserSubmissionDto): Promise<UserSubmissionResponse> => {
        try {
            const authData = getAuthData<AuthDataDto>();
            if (!authData) {
                throw APIError.unauthenticated("Authentication required");
            }

            return await ExerciseService.createUserSubmission(data);
        } catch (error) {
            throw APIError.aborted(error?.toString() || "Error creating user submission");
        }
    }
);
