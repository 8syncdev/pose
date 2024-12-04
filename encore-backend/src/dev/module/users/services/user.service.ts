import { CreateUserDto, UpdateUserDto, UserResponse, UserDto } from "../users.dto";
import { User, usersTable } from "../users.model";
import { db } from "../users.db";
import { eq, count, sql, asc } from "drizzle-orm";
import { getOffset, paginatedData, formatDateLocale } from "../../../../common/utility";
import { hashPassword, verifyPassword } from "../users.utils";
import validator from "validator";

const UserService = {
    count: async (): Promise<number> => {
        const [result] = await db.select({ count: count() }).from(usersTable);
        return result.count;
    },

    create: async (data: CreateUserDto): Promise<UserResponse> => {
        try {
            // Validate required fields
            if (!validator.isLength(data.username, { min: 3, max: 50 })) {
                return {
                    success: false,
                    message: "Username must be between 3 and 50 characters"
                };
            }

            if (!validator.isStrongPassword(data.password)) {
                return {
                    success: false,
                    message: "Password is not strong enough"
                };
            }

            // Check if username already exists
            const [existingUser] = await db
                .select()
                .from(usersTable)
                .where(eq(usersTable.username, validator.trim(data.username)));

            if (existingUser) {
                return {
                    success: false,
                    message: "Username already exists"
                };
            }

            const hashedPassword = await hashPassword(data.password);
            const userData = {
                ...data,
                username: validator.trim(data.username),
                password: hashedPassword,
                is_active: true,
                is_verified: false,
                date_joined: new Date()
            };

            const [user] = await db.insert(usersTable).values(userData).returning();

            const userDto: UserDto = {
                ...user,
                email: user.email ?? undefined,
                phone: user.phone ?? undefined,
                first_name: user.first_name ?? undefined,
                last_name: user.last_name ?? undefined,
                profile_picture: user.profile_picture ?? undefined,
                bio: user.bio ?? undefined,
                is_active: user.is_active ?? true,
                is_verified: user.is_verified ?? false,
                last_login: user.last_login ? formatDateLocale(user.last_login) : undefined,
                date_joined: user.date_joined ? formatDateLocale(user.date_joined) : undefined,
                preferred_language: user.preferred_language ?? undefined,
                timezone: user.timezone ?? undefined
            };

            return { success: true, result: userDto };
        } catch (error) {
            console.error("Failed to create user:", error);
            return { success: false, message: "Failed to create user" };
        }
    },

    update: async (id: number, data: UpdateUserDto): Promise<UserResponse> => {
        try {
            const [existingUser] = await db
                .select()
                .from(usersTable)
                .where(eq(usersTable.id, id));

            if (!existingUser) {
                return { success: false, message: "User not found" };
            }

            const updateData: Partial<Omit<User, "id" | "last_login" | "date_joined">> = {};

            // Only update if username is provided, not empty, and different from existing
            if (data.username && data.username.trim() && data.username !== existingUser.username) {
                if (!validator.isLength(data.username, { min: 3, max: 50 })) {
                    return { success: false, message: "Username must be between 3 and 50 characters" };
                }
                updateData.username = validator.trim(data.username);
            }

            // Only update if password is provided and not empty
            if (data.password && data.password.trim()) {
                if (!validator.isStrongPassword(data.password)) {
                    return { success: false, message: "Password is not strong enough" };
                }
                updateData.password = await hashPassword(data.password);
            }

            // Only update if email is provided, not empty, and different from existing
            if (data.email !== undefined && data.email !== null && data.email.trim() && data.email !== existingUser.email) {
                if (!validator.isEmail(data.email)) {
                    return { success: false, message: "Invalid email format" };
                }
                updateData.email = data.email;
            }

            // Handle other string fields - only update if provided, not empty, and different from existing
            const stringFields: (keyof UpdateUserDto)[] = [
                'phone', 'first_name', 'last_name', 'profile_picture', 
                'bio', 'preferred_language', 'timezone'
            ];
            
            stringFields.forEach(field => {
                const value = data[field];
                if (value !== undefined && value !== null && typeof value === 'string' && value.trim() && value !== existingUser[field]) {
                    updateData[field] = value.trim() as any;
                }
            });

            // Handle boolean fields - only update if explicitly provided and different from existing
            if (typeof data.is_active === 'boolean' && data.is_active !== existingUser.is_active) {
                updateData.is_active = data.is_active;
            }
            
            if (typeof data.is_verified === 'boolean' && data.is_verified !== existingUser.is_verified) {
                updateData.is_verified = data.is_verified;
            }

            // Only proceed with update if there are changes
            if (Object.keys(updateData).length === 0) {
                const userDto: UserDto = {
                    ...existingUser,
                    email: existingUser.email ?? undefined,
                    phone: existingUser.phone ?? undefined,
                    first_name: existingUser.first_name ?? undefined,
                    last_name: existingUser.last_name ?? undefined,
                    profile_picture: existingUser.profile_picture ?? undefined,
                    bio: existingUser.bio ?? undefined,
                    is_active: existingUser.is_active ?? true,
                    is_verified: existingUser.is_verified ?? false,
                    last_login: existingUser.last_login ? formatDateLocale(existingUser.last_login) : undefined,
                    date_joined: existingUser.date_joined ? formatDateLocale(existingUser.date_joined) : undefined,
                    preferred_language: existingUser.preferred_language ?? undefined,
                    timezone: existingUser.timezone ?? undefined
                };
                return { success: true, result: userDto };
            }

            const [updatedUser] = await db
                .update(usersTable)
                .set(updateData)
                .where(eq(usersTable.id, id))
                .returning()

            const userDto: UserDto = {
                ...updatedUser,
                email: updatedUser.email ?? undefined,
                phone: updatedUser.phone ?? undefined,
                first_name: updatedUser.first_name ?? undefined,
                last_name: updatedUser.last_name ?? undefined,
                profile_picture: updatedUser.profile_picture ?? undefined,
                bio: updatedUser.bio ?? undefined,
                is_active: updatedUser.is_active ?? true,
                is_verified: updatedUser.is_verified ?? false,
                last_login: updatedUser.last_login ? formatDateLocale(updatedUser.last_login) : undefined,
                date_joined: updatedUser.date_joined ? formatDateLocale(updatedUser.date_joined) : undefined,
                preferred_language: updatedUser.preferred_language ?? undefined,
                timezone: updatedUser.timezone ?? undefined
            };

            return { success: true, result: userDto };
        } catch (error) {
            console.error("Failed to update user:", error);
            return { success: false, message: "Failed to update user" };
        }
    },

    delete: async (id: number): Promise<UserResponse> => {
        try {
            const [deletedUser] = await db
                .delete(usersTable)
                .where(eq(usersTable.id, id))
                .returning();

            if (!deletedUser) {
                return { success: false, message: "User not found" };
            }

            return { success: true, message: "User deleted successfully" };
        } catch (error) {
            return { success: false, message: "Failed to delete user" };
        }
    },

    findOne: async (id: number): Promise<UserResponse> => {
        try {
            const [user] = await db
                .select()
                .from(usersTable)
                .where(eq(usersTable.id, id));

            if (!user) {
                return { success: false, message: "User not found" };
            }

            const userDto: UserDto = {
                ...user,
                email: user.email ?? undefined,
                phone: user.phone ?? undefined,
                first_name: user.first_name ?? undefined,
                last_name: user.last_name ?? undefined,
                profile_picture: user.profile_picture ?? undefined,
                bio: user.bio ?? undefined,
                is_active: user.is_active ?? true,
                is_verified: user.is_verified ?? false,
                last_login: user.last_login ? formatDateLocale(user.last_login) : undefined,
                date_joined: user.date_joined ? formatDateLocale(user.date_joined) : undefined,
                preferred_language: user.preferred_language ?? undefined,
                timezone: user.timezone ?? undefined
            };

            return { success: true, result: userDto };
        } catch (error) {
            return { success: false, message: "Failed to get user" };
        }
    },

    find: async (page: number, limit: number): Promise<UserResponse> => {
        try {
            const offset = getOffset(page, limit);
            const users = await db
                .select()
                .from(usersTable)
                .limit(limit)
                .offset(offset)
                .orderBy(asc(usersTable.id));

            const [{ count }] = await db
                .select({ count: sql`count(*)`.mapWith(Number) })
                .from(usersTable);

            const pagination = paginatedData({ size: limit, page, count });

            const userDtos: UserDto[] = users.map(user => ({
                ...user,
                email: user.email ?? undefined,
                phone: user.phone ?? undefined,
                first_name: user.first_name ?? undefined,
                last_name: user.last_name ?? undefined,
                profile_picture: user.profile_picture ?? undefined,
                bio: user.bio ?? undefined,
                is_active: user.is_active ?? true,
                is_verified: user.is_verified ?? false,
                last_login: user.last_login ? formatDateLocale(user.last_login) : undefined,
                date_joined: user.date_joined ? formatDateLocale(user.date_joined) : undefined,
                preferred_language: user.preferred_language ?? undefined,
                timezone: user.timezone ?? undefined
            }));

            return { success: true, result: userDtos, pagination };
        } catch (error) {
            return { success: false, message: "Failed to get users" };
        }
    },

    login: async (username: string, password: string): Promise<UserResponse> => {
        try {
            const [user] = await db
                .select()
                .from(usersTable)
                .where(eq(usersTable.username, username));

            if (!user) {
                return { success: false, message: "Invalid credentials" };
            }

            const isValidPassword = await verifyPassword(password, user.password);
            if (!isValidPassword) {
                return { success: false, message: "Invalid credentials" };
            }

            // Update last login
            const [updatedUser] = await db
                .update(usersTable)
                .set({ last_login: new Date() })
                .where(eq(usersTable.id, user.id))
                .returning();

            const userDto: UserDto = {
                ...updatedUser,
                email: updatedUser.email ?? undefined,
                phone: updatedUser.phone ?? undefined,
                first_name: updatedUser.first_name ?? undefined,
                last_name: updatedUser.last_name ?? undefined,
                profile_picture: updatedUser.profile_picture ?? undefined,
                bio: updatedUser.bio ?? undefined,
                is_active: updatedUser.is_active ?? true,
                is_verified: updatedUser.is_verified ?? false,
                last_login: updatedUser.last_login ? formatDateLocale(updatedUser.last_login) : undefined,
                date_joined: user.date_joined ? formatDateLocale(user.date_joined) : undefined,
                preferred_language: updatedUser.preferred_language ?? undefined,
                timezone: updatedUser.timezone ?? undefined
            };

            return { success: true, result: userDto };
        } catch (error) {
            return { success: false, message: "Failed to login" };
        }
    }
};

export default UserService;

