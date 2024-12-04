import { db } from "../users.db";
import { rolesTable, rolePermissionsTable, userRolesTable } from "../users.model";
import { CreateRoleDto, UpdateRoleDto, RoleResponse, RoleDto, UserRoleDto } from "../users.dto";
import { eq, sql, and, inArray } from "drizzle-orm";
import { getOffset, paginatedData, formatDateLocale } from "../../../../common/utility";
import validator from "validator";
import { DataResponse } from "../../../../common/dto";

const RoleService = {
    create: async (data: CreateRoleDto): Promise<RoleResponse> => {
        try {
            // Validate required fields
            if (!validator.isLength(data.name, { min: 1, max: 50 })) {
                return {
                    success: false,
                    message: "Name must be between 1 and 50 characters"
                };
            }

            const roleData = {
                ...data,
                name: validator.trim(data.name)
            };

            const [role] = await db.insert(rolesTable).values(roleData).returning();

            const roleDto: RoleDto = {
                ...role,
                created_at: formatDateLocale(role.created_at),
                updated_at: formatDateLocale(role.updated_at),
                description: role.description || undefined
            };

            return { success: true, result: roleDto };
        } catch (error) {
            console.error("Failed to create role:", error);
            if (error instanceof Error && error.message.includes('unique')) {
                return { success: false, message: "Role name already exists" };
            }
            return { success: false, message: "Failed to create role" };
        }
    },

    update: async (id: number, data: UpdateRoleDto): Promise<RoleResponse> => {
        try {
            const [existingRole] = await db
                .select()
                .from(rolesTable)
                .where(eq(rolesTable.id, id));

            if (!existingRole) {
                return { success: false, message: "Role not found" };
            }

            // Clean and prepare update data
            const updateData = {} as {
                name?: string;
                description?: string | null;
            };

            if (data.name !== undefined) {
                if (data.name === existingRole.name) {
                    // Skip if same as existing
                } else {
                    if (!data.name.trim()) {
                        return { success: false, message: "Name cannot be empty" };
                    }
                    if (data.name.length > 50) {
                        return { success: false, message: "Name must be 50 characters or less" };
                    }
                    updateData.name = data.name.trim();
                }
            }

            if (data.description !== undefined) {
                if (data.description === existingRole.description) {
                    // Skip if same as existing
                } else {
                    updateData.description = data.description?.trim() || null;
                }
            }

            // Only update if there are changes
            if (Object.keys(updateData).length === 0) {
                const roleDto: RoleDto = {
                    ...existingRole,
                    created_at: formatDateLocale(existingRole.created_at),
                    updated_at: formatDateLocale(existingRole.updated_at),
                    description: existingRole.description || undefined
                };
                return { success: true, result: roleDto };
            }

            const [updatedRole] = await db
                .update(rolesTable)
                .set(updateData)
                .where(eq(rolesTable.id, id))
                .returning();

            const roleDto: RoleDto = {
                ...updatedRole,
                created_at: formatDateLocale(updatedRole.created_at),
                updated_at: formatDateLocale(updatedRole.updated_at),
                description: updatedRole.description || undefined
            };

            return { success: true, result: roleDto };
        } catch (error) {
            console.error("Failed to update role:", error);
            if (error instanceof Error && error.message.includes('unique')) {
                return { success: false, message: "Role name must be unique" };
            }
            return { success: false, message: "Failed to update role" };
        }
    },

    delete: async (id: number): Promise<RoleResponse> => {
        try {
            const [deletedRole] = await db
                .delete(rolesTable)
                .where(eq(rolesTable.id, id))
                .returning();

            if (!deletedRole) {
                return { success: false, message: "Role not found" };
            }
            return { success: true, message: "Role deleted successfully" };
        } catch (error) {
            console.error("Failed to delete role:", error);
            return { success: false, message: "Failed to delete role" };
        }
    },

    findOne: async (id: number): Promise<RoleResponse> => {
        try {
            const [role] = await db
                .select()
                .from(rolesTable)
                .where(eq(rolesTable.id, id));

            if (!role) {
                return { success: false, message: "Role not found" };
            }

            const roleDto: RoleDto = {
                ...role,
                created_at: formatDateLocale(role.created_at),
                updated_at: formatDateLocale(role.updated_at),
                description: role.description || undefined
            };

            return { success: true, result: roleDto };
        } catch (error) {
            console.error("Failed to get role:", error);
            return { success: false, message: "Failed to get role" };
        }
    },

    find: async (page: number, limit: number): Promise<RoleResponse> => {
        try {
            const offset = getOffset(page, limit);
            const roles = await db
                .select()
                .from(rolesTable)
                .limit(limit)
                .offset(offset);

            const [{ count }] = await db
                .select({ count: sql`count(*)`.mapWith(Number) })
                .from(rolesTable);

            const pagination = paginatedData({ size: limit, page, count });

            const roleDtos: RoleDto[] = roles.map(role => ({
                ...role,
                created_at: formatDateLocale(role.created_at),
                updated_at: formatDateLocale(role.updated_at),
                description: role.description || undefined
            }));

            return { success: true, result: roleDtos, pagination };
        } catch (error) {
            console.error("Failed to get roles:", error);
            return { success: false, message: "Failed to get roles" };
        }
    },

    // User-Role related operations
    assignRoleToUser: async (userId: number, roleId: number): Promise<RoleResponse> => {
        try {
            const userRole = {
                user_id: userId,
                role_id: roleId,
                created_at: new Date()
            };

            // Check if assignment already exists
            const [existing] = await db
                .select()
                .from(userRolesTable)
                .where(
                    and(
                        eq(userRolesTable.user_id, userId),
                        eq(userRolesTable.role_id, roleId)
                    )
                );

            if (existing) {
                return { success: false, message: "User already has this role" };
            }

            await db.insert(userRolesTable).values(userRole);

            return { success: true, message: "Role assigned successfully" };
        } catch (error) {
            console.error("Failed to assign role to user:", error);
            return { success: false, message: "Failed to assign role to user" };
        }
    },

    removeRoleFromUser: async (userId: number, roleId: number): Promise<RoleResponse> => {
        try {
            const result = await db
                .delete(userRolesTable)
                .where(
                    and(
                        eq(userRolesTable.user_id, userId),
                        eq(userRolesTable.role_id, roleId)
                    )
                )
                .returning();

            if (!result.length) {
                return { success: false, message: "User does not have this role" };
            }

            return { success: true, message: "Role removed successfully" };
        } catch (error) {
            console.error("Failed to remove role from user:", error);
            return { success: false, message: "Failed to remove role from user" };
        }
    },

    getUserRoles: async (userId: number, page: number = 1, limit: number = 10): Promise<RoleResponse> => {
        try {
            // Get total count first
            const [{ count }] = await db
                .select({ count: sql<number>`count(*)` })
                .from(userRolesTable)
                .where(eq(userRolesTable.user_id, userId));

            // Get paginated roles
            const roles = await db
                .select({
                    role: rolesTable
                })
                .from(userRolesTable)
                .innerJoin(rolesTable, eq(userRolesTable.role_id, rolesTable.id))
                .where(eq(userRolesTable.user_id, userId))
                .limit(limit)
                .offset(getOffset(page, limit));

            const roleDtos: RoleDto[] = roles.map(({ role }) => ({
                ...role,
                created_at: formatDateLocale(role.created_at),
                updated_at: formatDateLocale(role.updated_at),
                description: role.description || undefined
            }));

            return {
                success: true,
                result: roleDtos,
                pagination: paginatedData({
                    count: Number(count),
                    page,
                    size: limit
                })
            };
        } catch (error) {
            console.error("Failed to get user roles:", error);
            return { success: false, message: "Failed to get user roles" };
        }
    },

    checkRoleExistInUserRoles: async (userId: number, roleIds: number[]): Promise<DataResponse> => {
        try {
            // Check if user has ANY of the specified roles
            const existingRoles = await db
                .select()
                .from(userRolesTable)
                .where(
                    and(
                        eq(userRolesTable.user_id, userId),
                        inArray(userRolesTable.role_id, roleIds)
                    )
                );

            // If user has at least one of the specified roles, return true
            if (existingRoles.length > 0) {
                return { 
                    success: true, 
                    message: "User has at least one of the specified roles",
                    result: true
                };
            }

            return { 
                success: false, 
                message: "User has none of the specified roles",
                result: false 
            };
        } catch (error) {
            console.error("Failed to check roles existence:", error);
            return { 
                success: false, 
                message: "Failed to check roles existence",
                result: false
            };
        }
    }
};

export default RoleService;
