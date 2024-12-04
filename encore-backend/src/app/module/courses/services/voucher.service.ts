import { CreateVoucherDto, UpdateVoucherDto, VoucherResponse, VoucherDto } from "../courses.dto";
import { vouchersTable, Voucher } from "../courses.model";
import { db } from "../courses.db";
import { eq, sql } from "drizzle-orm";
import { getOffset, paginatedData, formatDateLocale } from "../../../../common/utility";
import validator from "validator";

const VoucherService = {
    create: async (data: CreateVoucherDto): Promise<VoucherResponse> => {
        try {
            // Validate code
            if (!data.code || !validator.isLength(data.code, { min: 1, max: 20 })) {
                return {
                    success: false,
                    message: "Code must be between 1 and 20 characters"
                };
            }
            data.code = validator.trim(data.code);

            // Validate discount
            if (data.discount === undefined || !Number.isFinite(data.discount) || data.discount <= 0) {
                return {
                    success: false,
                    message: "Discount must be a positive number"
                };
            }

            // Validate discount_type
            if (!data.discount_type || !['Percentage', 'Fixed'].includes(data.discount_type)) {
                return {
                    success: false,
                    message: "Discount type must be either 'Percentage' or 'Fixed'"
                };
            }

            // Additional validation for percentage discount
            if (data.discount_type === 'Percentage' && data.discount > 100) {
                return {
                    success: false,
                    message: "Percentage discount cannot exceed 100%"
                };
            }

            // Validate max_uses if provided
            if (data.max_uses !== undefined) {
                if (!Number.isInteger(data.max_uses) || data.max_uses < 0) {
                    return {
                        success: false,
                        message: "Max uses must be a non-negative integer"
                    };
                }
            }

            // Validate uses_count if provided
            if (data.uses_count !== undefined) {
                if (!Number.isInteger(data.uses_count) || data.uses_count < 0) {
                    return {
                        success: false,
                        message: "Uses count must be a non-negative integer"
                    };
                }
            }

            // Validate dates
            if (data.start_date) {
                const startTimestamp = Number(data.start_date);
                if (isNaN(startTimestamp)) {
                    return {
                        success: false,
                        message: "Start date must be a valid timestamp"
                    };
                }
            }

            if (!data.expiration_date) {
                return {
                    success: false,
                    message: "Expiration date is required"
                };
            }

            const expirationTimestamp = Number(data.expiration_date);
            if (isNaN(expirationTimestamp)) {
                return {
                    success: false,
                    message: "Expiration date must be a valid timestamp"
                };
            }

            // Validate course_id if provided
            if (data.course_id !== undefined) {
                if (!Number.isInteger(data.course_id) || data.course_id <= 0) {
                    return {
                        success: false,
                        message: "Course ID must be a positive integer"
                    };
                }
            }

            // Create insert data with defaults
            const insertData = {
                code: data.code,
                discount: data.discount.toString(),
                discount_type: data.discount_type,
                max_uses: data.max_uses || null,
                uses_count: data.uses_count || 0,
                start_date: data.start_date ? new Date(Number(data.start_date)) : null,
                expiration_date: new Date(Number(data.expiration_date)),
                course_id: data.course_id || null,
                is_active: data.is_active ?? false
            };

            const [voucher] = await db.insert(vouchersTable)
                .values(insertData)
                .returning();

            const voucherDto: VoucherDto = {
                ...voucher,
                discount: parseFloat(voucher.discount),
                discount_type: voucher.discount_type as 'Percentage' | 'Fixed',
                max_uses: voucher.max_uses ?? undefined,
                uses_count: voucher.uses_count ?? 0,
                start_date: voucher.start_date ? formatDateLocale(voucher.start_date) : undefined,
                expiration_date: formatDateLocale(voucher.expiration_date),
                course_id: voucher.course_id ?? undefined,
                is_active: voucher.is_active ?? false,
                created_at: formatDateLocale(voucher.created_at),
                updated_at: formatDateLocale(voucher.updated_at),
            };

            return {
                success: true,
                result: voucherDto,
            };
        } catch (error) {
            console.error("Failed to create voucher:", error);
            return {
                success: false,
                message: "Failed to create voucher"
            };
        }
    },

    update: async (id: number, data: UpdateVoucherDto): Promise<VoucherResponse> => {
        try {
            const updateData: UpdateVoucherDto = { ...data };

            // Validate code if provided and not empty
            if (updateData.code !== undefined && updateData.code !== "") {
                if (!validator.isLength(updateData.code, { min: 1, max: 20 })) {
                    return {
                        success: false,
                        message: "Code must be between 1 and 20 characters"
                    };
                }
            } else {
                delete updateData.code;
            }

            // Validate discount if provided and not 0
            if (updateData.discount !== undefined && updateData.discount !== 0) {
                if (isNaN(updateData.discount) || updateData.discount <= 0) {
                    return {
                        success: false,
                        message: "Discount must be a positive number"
                    };
                }
            } else {
                delete updateData.discount;
            }

            // Validate discount_type if provided and not default
            if (updateData.discount_type !== undefined && updateData.discount_type !== "Percentage") {
                if (!["Percentage", "Fixed"].includes(updateData.discount_type)) {
                    return {
                        success: false,
                        message: "Discount type must be either Percentage or Fixed"
                    };
                }
            } else {
                delete updateData.discount_type;
            }

            // Validate max_uses if provided and not 0
            if (updateData.max_uses !== undefined && updateData.max_uses !== 0) {
                if (!Number.isInteger(updateData.max_uses) || updateData.max_uses < 0) {
                    return {
                        success: false,
                        message: "Max uses must be a non-negative integer"
                    };
                }
            } else {
                delete updateData.max_uses;
            }

            // Validate uses_count if provided and not 0
            if (updateData.uses_count !== undefined && updateData.uses_count !== 0) {
                if (!Number.isInteger(updateData.uses_count) || updateData.uses_count < 0) {
                    return {
                        success: false,
                        message: "Uses count must be a non-negative integer"
                    };
                }
            } else {
                delete updateData.uses_count;
            }

            // Validate dates if provided and not empty
            if (updateData.start_date !== undefined && updateData.start_date !== "") {
                const startDate = new Date(Number(updateData.start_date));
                if (isNaN(startDate.getTime())) {
                    return {
                        success: false,
                        message: "Invalid start date"
                    };
                }
            } else {
                delete updateData.start_date;
            }

            if (updateData.expiration_date !== undefined && updateData.expiration_date !== "") {
                const expirationDate = new Date(Number(updateData.expiration_date));
                if (isNaN(expirationDate.getTime())) {
                    return {
                        success: false,
                        message: "Invalid expiration date"
                    };
                }
            } else {
                delete updateData.expiration_date;
            }

            // Validate course_id if provided and not 0
            if (updateData.course_id !== undefined && updateData.course_id !== 0) {
                if (!Number.isInteger(updateData.course_id) || updateData.course_id <= 0) {
                    return {
                        success: false,
                        message: "Course ID must be a positive integer"
                    };
                }
            } else {
                delete updateData.course_id;
            }

            // Validate is_active if provided and false (default)
            if (updateData.is_active !== undefined && updateData.is_active === false) {
                delete updateData.is_active;
            }

            // Prepare data for database update
            const dbUpdateData: any = {
                ...updateData,
                discount: updateData.discount?.toString(),
            };

            // Convert dates for database
            if (updateData.start_date) {
                dbUpdateData.start_date = new Date(Number(updateData.start_date));
            }
            if (updateData.expiration_date) {
                dbUpdateData.expiration_date = new Date(Number(updateData.expiration_date));
            }

            const [updatedVoucher] = await db
                .update(vouchersTable)
                .set(dbUpdateData)
                .where(eq(vouchersTable.id, id))
                .returning();

            if (!updatedVoucher) {
                return {
                    success: false,
                    message: "Voucher not found"
                };
            }

            const voucherDto: VoucherDto = {
                ...updatedVoucher,
                discount: parseFloat(updatedVoucher.discount),
                discount_type: updatedVoucher.discount_type as 'Percentage' | 'Fixed',
                max_uses: updatedVoucher.max_uses ?? undefined,
                uses_count: updatedVoucher.uses_count ?? 0,
                start_date: updatedVoucher.start_date ? formatDateLocale(updatedVoucher.start_date) : undefined,
                expiration_date: formatDateLocale(updatedVoucher.expiration_date),
                course_id: updatedVoucher.course_id ?? undefined,
                is_active: updatedVoucher.is_active ?? false,
                created_at: formatDateLocale(updatedVoucher.created_at),
                updated_at: formatDateLocale(updatedVoucher.updated_at),
            };

            return {
                success: true,
                result: voucherDto
            };
        } catch (error) {
            console.error("Failed to update voucher:", error);
            return {
                success: false,
                message: "Failed to update voucher"
            };
        }
    },

    delete: async (id: number): Promise<VoucherResponse> => {
        try {
            const [deletedVoucher] = await db
                .delete(vouchersTable)
                .where(eq(vouchersTable.id, id))
                .returning();

            if (!deletedVoucher) {
                return {
                    success: false,
                    message: "Voucher not found"
                };
            }

            return {
                success: true,
                message: "Voucher deleted successfully"
            };
        } catch (error) {
            console.error("Failed to delete voucher:", error);
            return {
                success: false,
                message: "Failed to delete voucher"
            };
        }
    },

    findOne: async (id: number): Promise<VoucherResponse> => {
        try {
            const [voucher] = await db
                .select()
                .from(vouchersTable)
                .where(eq(vouchersTable.id, id));

            if (!voucher) {
                return {
                    success: false,
                    message: "Voucher not found"
                };
            }

            const voucherDto: VoucherDto = {
                ...voucher,
                discount: parseFloat(voucher.discount),
                discount_type: voucher.discount_type as 'Percentage' | 'Fixed',
                max_uses: voucher.max_uses ?? undefined,
                uses_count: voucher.uses_count ?? 0,
                start_date: voucher.start_date ? formatDateLocale(voucher.start_date) : undefined,
                expiration_date: formatDateLocale(voucher.expiration_date),
                course_id: voucher.course_id ?? undefined,
                is_active: voucher.is_active ?? false,
                created_at: formatDateLocale(voucher.created_at),
                updated_at: formatDateLocale(voucher.updated_at),
            };

            return {
                success: true,
                result: voucherDto
            };
        } catch (error) {
            console.error("Failed to find voucher:", error);
            return {
                success: false,
                message: "Failed to find voucher"
            };
        }
    },

    find: async (page: number = 1, limit: number = 10): Promise<VoucherResponse> => {
        try {
            const offset = getOffset(page, limit);
            const vouchers = await db
                .select()
                .from(vouchersTable)
                .limit(limit)
                .offset(offset);

            const [{ count }] = await db
                .select({ count: sql`count(*)`.mapWith(Number) })
                .from(vouchersTable);

            const pagination = paginatedData({ size: limit, page, count });

            const voucherDtos: VoucherDto[] = vouchers.map(voucher => ({
                ...voucher,
                discount: parseFloat(voucher.discount),
                discount_type: voucher.discount_type as 'Percentage' | 'Fixed',
                max_uses: voucher.max_uses ?? undefined,
                uses_count: voucher.uses_count ?? 0,
                start_date: voucher.start_date ? formatDateLocale(voucher.start_date) : undefined,
                expiration_date: formatDateLocale(voucher.expiration_date),
                course_id: voucher.course_id ?? undefined,
                is_active: voucher.is_active ?? false,
                created_at: formatDateLocale(voucher.created_at),
                updated_at: formatDateLocale(voucher.updated_at),
            }));

            return {
                success: true,
                result: voucherDtos,
                pagination
            };
        } catch (error) {
            console.error("Failed to find vouchers:", error);
            return {
                success: false,
                message: "Failed to find vouchers"
            };
        }
    },

    findByCourseId: async (courseId: number, page: number = 1, limit: number = 10): Promise<VoucherResponse> => {
        try {
            const offset = getOffset(page, limit);
            const vouchers = await db
                .select()
                .from(vouchersTable)
                .where(eq(vouchersTable.course_id, courseId))
                .limit(limit)
                .offset(offset);

            const [{ count }] = await db
                .select({ count: sql`count(*)`.mapWith(Number) })
                .from(vouchersTable)
                .where(eq(vouchersTable.course_id, courseId));

            const pagination = paginatedData({ size: limit, page, count });

            const voucherDtos: VoucherDto[] = vouchers.map(voucher => ({
                ...voucher,
                discount: parseFloat(voucher.discount),
                discount_type: voucher.discount_type as 'Percentage' | 'Fixed',
                max_uses: voucher.max_uses ?? undefined,
                uses_count: voucher.uses_count ?? 0,
                start_date: voucher.start_date ? formatDateLocale(voucher.start_date) : undefined,
                expiration_date: formatDateLocale(voucher.expiration_date),
                course_id: voucher.course_id ?? undefined,
                is_active: voucher.is_active ?? true,
                created_at: formatDateLocale(voucher.created_at),
                updated_at: formatDateLocale(voucher.updated_at),
            }));

            return {
                success: true,
                result: voucherDtos,
                pagination
            };
        } catch (error) {
            console.error("Failed to find vouchers by course:", error);
            return {
                success: false,
                message: "Failed to find vouchers by course"
            };
        }
    },

    findByCode: async (code: string): Promise<VoucherResponse> => {
        try {
            const [voucher] = await db
                .select()
                .from(vouchersTable)
                .where(eq(vouchersTable.code, code));

            if (!voucher) {
                return {
                    success: false,
                    message: "Voucher not found"
                };
            }

            const voucherDto: VoucherDto = {
                ...voucher,
                discount: parseFloat(voucher.discount),
                discount_type: voucher.discount_type as 'Percentage' | 'Fixed',
                max_uses: voucher.max_uses ?? undefined,
                uses_count: voucher.uses_count ?? 0,
                start_date: voucher.start_date ? formatDateLocale(voucher.start_date) : undefined,
                expiration_date: formatDateLocale(voucher.expiration_date),
                course_id: voucher.course_id ?? undefined,
                is_active: voucher.is_active ?? false,
                created_at: formatDateLocale(voucher.created_at),
                updated_at: formatDateLocale(voucher.updated_at),
            };

            return {
                success: true,
                result: voucherDto
            };
        } catch (error) {
            console.error("Failed to find voucher by code:", error);
            return {
                success: false,
                message: "Failed to find voucher by code"
            };
        }
    }
};

export default VoucherService;