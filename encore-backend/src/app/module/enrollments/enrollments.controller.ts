import { api, APIError } from "encore.dev/api";
import { CreateEnrollmentDto, UpdateEnrollmentDto, EnrollmentResponse, EnrollmentDto } from "./enrollments.dto";
import { EnrollmentService } from "./services";
import { getAuthData } from "encore.dev/internal/codegen/auth";
import type { AuthDataDto } from "../courses/courses.module";
import { RoleService } from "../courses/courses.module";

// Enrollment APIs

/**
 * Create a new enrollment
 * @description Creates a new enrollment in the system
 * @access Authenticated users only
 * @method POST
 * @route /enrollments
 * @auth Required
 * @param {CreateEnrollmentDto} data Enrollment creation data
 * @returns {Promise<EnrollmentResponse>} Created enrollment details
 */
export const createEnrollment = api(
    { expose: true, method: "POST", path: "/enrollments", auth: true },
    async (data: CreateEnrollmentDto): Promise<EnrollmentResponse> => {
        try {
            const authData = getAuthData<AuthDataDto>();
            if (!authData) {
                throw APIError.unauthenticated("Authentication required");
            }
            return await EnrollmentService.create(data);
        } catch (error) {
            throw APIError.aborted(error?.toString() || "Error creating enrollment");
        }
    }
);

/**
 * Get all enrollments
 * @description Retrieves a paginated list of all enrollments
 * @access Admin only
 * @method GET
 * @route /enrollments
 * @auth Required
 * @param {number} page Page number (optional)
 * @param {number} limit Items per page (optional)
 * @returns {Promise<EnrollmentResponse>} Paginated list of enrollments
 */
export const getAllEnrollments = api(
    { expose: true, method: "GET", path: "/enrollments", auth: true },
    async ({ page, limit }: { page?: number; limit?: number }): Promise<EnrollmentResponse> => {
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

            return await EnrollmentService.find(page || 1, limit || 10);
        } catch (error) {
            throw APIError.aborted(error?.toString() || "Error getting enrollments");
        }
    }
);

/**
 * Get enrollment by ID
 * @description Retrieves details of a specific enrollment
 * @access Admin and enrolled user
 * @method GET
 * @route /enrollments/:id
 * @auth Required
 * @param {number} id Enrollment ID
 * @returns {Promise<EnrollmentResponse>} Enrollment details
 */
export const getEnrollmentById = api(
    { expose: true, method: "GET", path: "/enrollments/:id", auth: true },
    async ({ id }: { id: number }): Promise<EnrollmentResponse> => {
        try {
            const authData = getAuthData<AuthDataDto>();
            if (!authData) {
                throw APIError.unauthenticated("Authentication required");
            }

            const enrollment = await EnrollmentService.findOne(id);
            
            // Allow access if user is admin or the enrolled user
            const hasAdminRole = await RoleService.checkRoleExistInUserRoles(parseInt(authData.userID), [1]); // 1=admin
            if (!hasAdminRole.success || !hasAdminRole.result) {
                const enrollmentData = enrollment.result as EnrollmentDto;
                if (enrollmentData.user_id !== parseInt(authData.userID)) {
                    throw APIError.permissionDenied("Access denied");
                }
            }

            return enrollment;
        } catch (error) {
            throw APIError.aborted(error?.toString() || "Error getting enrollment");
        }
    }
);

/**
 * Update enrollment
 * @description Updates an existing enrollment
 * @access Admin only
 * @method PATCH
 * @route /enrollments/:id
 * @auth Required
 * @param {number} id Enrollment ID
 * @param {UpdateEnrollmentDto} data Enrollment update data
 * @returns {Promise<EnrollmentResponse>} Updated enrollment details
 */
export const updateEnrollment = api(
    { expose: true, method: "PATCH", path: "/enrollments/:id", auth: true },
    async ({ id, data }: { id: number; data: UpdateEnrollmentDto }): Promise<EnrollmentResponse> => {
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

            return await EnrollmentService.update(id, data);
        } catch (error) {
            throw APIError.aborted(error?.toString() || "Error updating enrollment");
        }
    }
);

/**
 * Delete enrollment
 * @description Deletes an existing enrollment
 * @access Admin only
 * @method DELETE
 * @route /enrollments/:id
 * @auth Required
 * @param {number} id Enrollment ID
 * @returns {Promise<EnrollmentResponse>} Deletion confirmation
 */
export const deleteEnrollment = api(
    { expose: true, method: "DELETE", path: "/enrollments/:id", auth: true },
    async ({ id }: { id: number }): Promise<EnrollmentResponse> => {
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

            return await EnrollmentService.delete(id);
        } catch (error) {
            throw APIError.aborted(error?.toString() || "Error deleting enrollment");
        }
    }
);

/**
 * Get enrollments by user ID
 * @description Retrieves all enrollments for a specific user
 * @access Admin and enrolled user
 * @method GET
 * @route /users/:userId/enrollments
 * @auth Required
 * @param {number} userId User ID
 * @param {number} page Page number (optional)
 * @param {number} limit Items per page (optional)
 * @returns {Promise<EnrollmentResponse>} Paginated list of user's enrollments
 */
export const getEnrollmentsByUserId = api(
    { expose: true, method: "GET", path: "/users/:userId/enrollments", auth: true },
    async ({ userId, page, limit }: { userId: number; page?: number; limit?: number }): Promise<EnrollmentResponse> => {
        try {
            const authData = getAuthData<AuthDataDto>();
            if (!authData) {
                throw APIError.unauthenticated("Authentication required");
            }

            // Allow access if user is admin or requesting their own enrollments
            const hasAdminRole = await RoleService.checkRoleExistInUserRoles(parseInt(authData.userID), [1]); // 1=admin
            if (!hasAdminRole.success || !hasAdminRole.result) {
                if (userId !== parseInt(authData.userID)) {
                    throw APIError.permissionDenied("Access denied");
                }
            }

            return await EnrollmentService.findByUser(userId, page || 1, limit || 10);
        } catch (error) {
            throw APIError.aborted(error?.toString() || "Error getting user enrollments");
        }
    }
);

/**
 * Get enrollments by course ID
 * @description Retrieves all enrollments for a specific course
 * @access Admin and instructor only
 * @method GET
 * @route /courses/:courseId/enrollments
 * @auth Required
 * @param {number} courseId Course ID
 * @param {number} page Page number (optional)
 * @param {number} limit Items per page (optional)
 * @returns {Promise<EnrollmentResponse>} Paginated list of course enrollments
 */
export const getEnrollmentsByCourseId = api(
    { expose: true, method: "GET", path: "/courses/:courseId/enrollments", auth: true },
    async ({ courseId, page, limit }: { courseId: number; page?: number; limit?: number }): Promise<EnrollmentResponse> => {
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

            return await EnrollmentService.findByCourse(courseId, page || 1, limit || 10);
        } catch (error) {
            throw APIError.aborted(error?.toString() || "Error getting course enrollments");
        }
    }
);

/**
 * Check enrollment in course
 * @description Checks if a user is enrolled in a specific course
 * @access Admin and enrolled user
 * @method GET
 * @route /courses/:courseId/users/:userId/enrollment
 * @auth Required
 * @param {number} courseId Course ID
 * @param {number} userId User ID
 * @returns {Promise<EnrollmentResponse>} Enrollment status
 */
export const checkEnrollInCourse = api(
    { expose: true, method: "GET", path: "/courses/:courseId/users/:userId/enrollment", auth: true },
    async ({ courseId, userId }: { courseId: number; userId: number }): Promise<EnrollmentResponse> => {
        try {
            const authData = getAuthData<AuthDataDto>();
            if (!authData) {
                throw APIError.unauthenticated("Authentication required");
            }

            // Allow access if user is admin or checking their own enrollment
            const hasAdminRole = await RoleService.checkRoleExistInUserRoles(parseInt(authData.userID), [1]); // 1=admin
            if (!hasAdminRole.success || !hasAdminRole.result) {
                if (userId !== parseInt(authData.userID)) {
                    throw APIError.permissionDenied("Access denied");
                }
            }

            return await EnrollmentService.checkEnrollInCourse(userId, courseId);
        } catch (error) {
            throw APIError.aborted(error?.toString() || "Error checking course enrollment");
        }
    }
);
