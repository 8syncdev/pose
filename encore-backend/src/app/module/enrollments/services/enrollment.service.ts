import { db } from "../enrollments.db";
import { enrollmentsTable } from "../enrollments.model";
import { CreateEnrollmentDto, UpdateEnrollmentDto, EnrollmentResponse, EnrollmentDto } from "../enrollments.dto";
import { eq, sql } from "drizzle-orm";
import { getOffset, paginatedData, formatDateLocale } from "../../../../common/utility";
import validator from "validator";
import UserService from "../../../../dev/module/users/services/user.service";
import RoleService from "../../../../dev/module/users/services/role.service";

const EnrollmentService = {
    create: async (data: CreateEnrollmentDto): Promise<EnrollmentResponse> => {
        try {
            // Set default values
            const enrollmentRequest = {
                user_id: data.user_id || 0,
                course_id: data.course_id || 0,
                status: data.status || 'pending',
                expiration_date: data.expiration_date || ''
            };

            // Validate user_id
            if (!validator.isInt(enrollmentRequest.user_id.toString()) || enrollmentRequest.user_id <= 0) {
                return {
                    success: false,
                    message: "User ID is required and must be a positive integer"
                };
            }

            // Check if user exists
            const userResponse = await UserService.findOne(enrollmentRequest.user_id);
            if (!userResponse.success) {
                return {
                    success: false,
                    message: "User not found"
                };
            }

            // Check if user is admin
            const isAdmin = await RoleService.checkRoleExistInUserRoles(enrollmentRequest.user_id, [1]); // Assuming admin role_id is 1
            const isUserAdmin = isAdmin.result;

            // Validate course_id
            if (!validator.isInt(enrollmentRequest.course_id.toString()) || enrollmentRequest.course_id <= 0) {
                return {
                    success: false,
                    message: "Course ID is required and must be a positive integer"
                };
            }

            // Initialize enrollment data
            const enrollmentData: {
                user_id: number;
                course_id: number;
                status: 'active' | 'trial' | 'expired' | 'cancelled' | 'pending';
                expiration_date: Date | null;
            } = {
                user_id: enrollmentRequest.user_id,
                course_id: enrollmentRequest.course_id,
                status: (isUserAdmin) ? enrollmentRequest.status : 'pending',
                expiration_date: null
            };

            if (isUserAdmin) {
                // Validate status
                const validStatuses = ['active', 'trial', 'expired', 'cancelled', 'pending'];
                if (!validStatuses.includes(enrollmentRequest.status)) {
                    return {
                        success: false,
                        message: "Invalid enrollment status. Must be one of: active, trial, expired, cancelled, pending"
                    };
                }

                // Handle expiration date
                if (enrollmentRequest.expiration_date === '') {
                    enrollmentData.expiration_date = null;
                } else if (enrollmentRequest.expiration_date) {
                    const timestamp = parseInt(enrollmentRequest.expiration_date.toString());
                    if (isNaN(timestamp)) {
                        return {
                            success: false,
                            message: "Expiration date must be a valid timestamp"
                        };
                    }

                    const date = new Date(timestamp * 1000);
                    if (isNaN(date.getTime())) {
                        return {
                            success: false,
                            message: "Invalid expiration date timestamp"
                        };
                    }

                    if (date <= new Date()) {
                        return {
                            success: false,
                            message: "Expiration date must be in the future"
                        };
                    }

                    enrollmentData.expiration_date = date;
                }
            } else {
                // Non-admin users cannot set status or expiration date
                if (enrollmentRequest.status === 'active' || enrollmentRequest.expiration_date !== '') {
                    return {
                        success: false,
                        message: "Only administrators can set enrollment status and expiration date"
                    };
                }
            }

            const [enrollment] = await db.insert(enrollmentsTable)
                .values(enrollmentData)
                .returning();

            const enrollmentDto: EnrollmentDto = {
                ...enrollment,
                created_at: formatDateLocale(enrollment.created_at),
                updated_at: formatDateLocale(enrollment.updated_at),
                expiration_date: enrollment.expiration_date ? formatDateLocale(enrollment.expiration_date) : undefined,
                status: enrollment.status as 'active' | 'trial' | 'expired' | 'cancelled' | 'pending',
            };

            return { success: true, result: enrollmentDto };

        } catch (error) {
            console.error("Failed to create enrollment:", error);
            return { success: false, message: "Failed to create enrollment" };
        }
    },

    update: async (id: number, data: UpdateEnrollmentDto): Promise<EnrollmentResponse> => {
        try {
            // Validate user_id if provided
            if (data.user_id !== undefined && data.user_id !== 0) {
                if (!Number.isInteger(data.user_id) || data.user_id < 1) {
                    return {
                        success: false,
                        message: "Invalid user ID"
                    };
                }
            }

            // Validate course_id if provided 
            if (data.course_id !== undefined && data.course_id !== 0) {
                if (!Number.isInteger(data.course_id) || data.course_id < 1) {
                    return {
                        success: false,
                        message: "Invalid course ID"
                    };
                }
            }

            // Validate status if provided
            if (data.status !== undefined && data.status !== 'active') {
                const validStatuses = ['active', 'trial', 'expired', 'cancelled', 'pending'];
                if (!validStatuses.includes(data.status)) {
                    return {
                        success: false,
                        message: "Invalid enrollment status"
                    };
                }
            }

            // Validate expiration_date if provided
            if (data.expiration_date !== undefined && data.expiration_date !== '') {
                const timestamp = parseInt(data.expiration_date.toString());
                if (isNaN(timestamp)) {
                    return {
                        success: false,
                        message: "Expiration date must be a valid timestamp"
                    };
                }

                const date = new Date(timestamp * 1000);
                if (isNaN(date.getTime())) {
                    return {
                        success: false,
                        message: "Invalid expiration date timestamp"
                    };
                }

                if (date.getTime() < Date.now()) {
                    return {
                        success: false,
                        message: "Expiration date must be in the future"
                    };
                }
            }

            // Filter out default values
            const filteredData = Object.fromEntries(
                Object.entries(data).filter(([key, value]) => {
                    if (key === 'user_id' && value === 0) return false;
                    if (key === 'course_id' && value === 0) return false;
                    // if (key === 'status' && value === 'active') return false;
                    if (key === 'expiration_date' && value === '') return false;
                    return true;
                })
            );

            // Only update if there are non-default values
            if (Object.keys(filteredData).length === 0) {
                return { success: false, message: "No valid update data provided" };
            }

            const updateData = {
                ...filteredData,
                expiration_date: filteredData.expiration_date 
                    ? new Date(parseInt(String(filteredData.expiration_date)) * 1000)
                    : undefined,
            };

            const [updatedEnrollment] = await db
                .update(enrollmentsTable)
                .set(updateData)
                .where(eq(enrollmentsTable.id, id))
                .returning();
            
            if (!updatedEnrollment) {
                return { success: false, message: "Enrollment not found" };
            }

            const enrollmentDto: EnrollmentDto = {
                ...updatedEnrollment,
                created_at: formatDateLocale(updatedEnrollment.created_at),
                updated_at: formatDateLocale(updatedEnrollment.updated_at),
                expiration_date: updatedEnrollment.expiration_date ? formatDateLocale(updatedEnrollment.expiration_date) : undefined,
                status: updatedEnrollment.status as 'active' | 'trial' | 'expired' | 'cancelled' | 'pending',
            };
            return { success: true, result: enrollmentDto };
        } catch (error) {
            console.error("Failed to update enrollment:", error);
            return { success: false, message: "Failed to update enrollment" };
        }
    },

    delete: async (id: number): Promise<EnrollmentResponse> => {
        try {
            const [deletedEnrollment] = await db
                .delete(enrollmentsTable)
                .where(eq(enrollmentsTable.id, id))
                .returning();
            
            if (!deletedEnrollment) {
                return { success: false, message: "Enrollment not found" };
            }
            return { success: true, message: "Enrollment deleted successfully" };
        } catch (error) {
            return { success: false, message: "Failed to delete enrollment" };
        }
    },

    findOne: async (id: number): Promise<EnrollmentResponse> => {
        try {
            const [enrollment] = await db
                .select()
                .from(enrollmentsTable)
                .where(eq(enrollmentsTable.id, id));

            if (!enrollment) {
                return { success: false, message: "Enrollment not found" };
            }

            const enrollmentDto: EnrollmentDto = {
                ...enrollment,
                created_at: formatDateLocale(enrollment.created_at),
                updated_at: formatDateLocale(enrollment.updated_at),
                expiration_date: enrollment.expiration_date ? formatDateLocale(enrollment.expiration_date) : undefined,
                status: enrollment.status as 'active' | 'trial' | 'expired' | 'cancelled' | 'pending',
            };
            return { success: true, result: enrollmentDto };
        } catch (error) {
            return { success: false, message: "Failed to get enrollment" };
        }
    },

    find: async (page: number, limit: number): Promise<EnrollmentResponse> => {
        try {
            const offset = getOffset(page, limit);
            const enrollments = await db
                .select()
                .from(enrollmentsTable)
                .limit(limit)
                .offset(offset);

            const [{ count }] = await db
                .select({ count: sql`count(*)`.mapWith(Number) })
                .from(enrollmentsTable);

            const pagination = paginatedData({ size: limit, page, count });

            const enrollmentDtos: EnrollmentDto[] = enrollments.map(enrollment => ({
                ...enrollment,
                created_at: formatDateLocale(enrollment.created_at),
                updated_at: formatDateLocale(enrollment.updated_at),
                expiration_date: enrollment.expiration_date ? formatDateLocale(enrollment.expiration_date) : undefined,
                status: enrollment.status as 'active' | 'trial' | 'expired' | 'cancelled' | 'pending',
            }));

            return { success: true, result: enrollmentDtos, pagination };
        } catch (error) {
            return { success: false, message: "Failed to get enrollments" };
        }
    },

    findByUser: async (userId: number, page: number, limit: number): Promise<EnrollmentResponse> => {
        try {
            const offset = getOffset(page, limit);
            const enrollments = await db
                .select()
                .from(enrollmentsTable)
                .where(eq(enrollmentsTable.user_id, userId))
                .limit(limit)
                .offset(offset);

            const [{ count }] = await db
                .select({ count: sql`count(*)`.mapWith(Number) })
                .from(enrollmentsTable)
                .where(eq(enrollmentsTable.user_id, userId));

            const pagination = paginatedData({ size: limit, page, count });

            const enrollmentDtos: EnrollmentDto[] = enrollments.map(enrollment => ({
                ...enrollment,
                created_at: formatDateLocale(enrollment.created_at),
                updated_at: formatDateLocale(enrollment.updated_at),
                expiration_date: enrollment.expiration_date ? formatDateLocale(enrollment.expiration_date) : undefined,
                status: enrollment.status as 'active' | 'trial' | 'expired' | 'cancelled' | 'pending',
            }));

            return { success: true, result: enrollmentDtos, pagination };
        } catch (error) {
            return { success: false, message: "Failed to get user enrollments" };
        }
    },

    findByCourse: async (courseId: number, page: number, limit: number): Promise<EnrollmentResponse> => {
        try {
            const offset = getOffset(page, limit);
            const enrollments = await db
                .select()
                .from(enrollmentsTable)
                .where(eq(enrollmentsTable.course_id, courseId))
                .limit(limit)
                .offset(offset);

            const [{ count }] = await db
                .select({ count: sql`count(*)`.mapWith(Number) })
                .from(enrollmentsTable)
                .where(eq(enrollmentsTable.course_id, courseId));

            const pagination = paginatedData({ size: limit, page, count });

            const enrollmentDtos: EnrollmentDto[] = enrollments.map(enrollment => ({
                ...enrollment,
                created_at: formatDateLocale(enrollment.created_at),
                updated_at: formatDateLocale(enrollment.updated_at),
                expiration_date: enrollment.expiration_date ? formatDateLocale(enrollment.expiration_date) : undefined,
                status: enrollment.status as 'active' | 'trial' | 'expired' | 'cancelled' | 'pending',
            }));

            return { success: true, result: enrollmentDtos, pagination };
        } catch (error) {
            return { success: false, message: "Failed to get course enrollments" };
        }
    }
    ,

    checkEnrollInCourse: async (userId: number, courseId: number): Promise<EnrollmentResponse> => {
        try {
            const enrollment = await db
                .select()
                .from(enrollmentsTable)
                .where(sql`${enrollmentsTable.user_id} = ${userId} AND ${enrollmentsTable.course_id} = ${courseId}`)
                .limit(1);

            if (!enrollment || enrollment.length === 0) {
                return { 
                    success: false, 
                    message: "User is not enrolled in this course",
                    result: undefined,
                    pagination: undefined
                };
            }

            const enrollmentDto: EnrollmentDto = {
                ...enrollment[0],
                created_at: formatDateLocale(enrollment[0].created_at),
                updated_at: formatDateLocale(enrollment[0].updated_at),
                expiration_date: enrollment[0].expiration_date ? formatDateLocale(enrollment[0].expiration_date) : undefined,
                status: enrollment[0].status as 'active' | 'trial' | 'expired' | 'cancelled' | 'pending'
            };

            // Check expiration if exists
            if (enrollment[0].expiration_date) {
                const expirationDate = new Date(enrollment[0].expiration_date);
                const now = new Date();
                
                if (expirationDate < now) {
                    return { 
                        success: true, 
                        message: "Enrollment has expired",
                        result: enrollmentDto,
                        pagination: undefined
                    };
                }
            }
            
            // Check enrollment status and expiration for trial period
            if (enrollment[0].status === 'trial') {
                if (!enrollment[0].expiration_date) {
                    return { 
                        success: true, 
                        message: "Trial period requires an expiration date",
                        result: enrollmentDto,
                        pagination: undefined
                    };
                }
                const trialExpiration = new Date(enrollment[0].expiration_date);
                const now = new Date();
                if (trialExpiration < now) {
                    return { 
                        success: true, 
                        message: "Trial period has expired",
                        result: enrollmentDto,
                        pagination: undefined
                    };
                }
            } else if (enrollment[0].status !== 'active') {
                return { 
                    success: true, 
                    message: "Enrollment is not active or in valid trial period",
                    result: enrollmentDto,
                    pagination: undefined
                };
            }
            
            return { 
                success: true,
                message: "Successfully retrieved enrollment",
                result: enrollmentDto,
                pagination: undefined
            };
        } catch (error) {
            return { 
                success: false, 
                message: "Failed to check course enrollment",
                result: undefined,
                pagination: undefined
            };
        }
    }
};

export default EnrollmentService;
