import { post, get, patch, del } from '../config';
import { DOMAIN_BE } from '../const';
import { getCookieToken } from '@/lib/cookie';
import {
    UserResponse,
    RoleResponse,
    CreateUserDto,
    UpdateUserDto,
    CreateRoleDto,
    UpdateRoleDto
} from './user.dto';

/**
 * Create a new user
 * @access Public - Anyone can register
 */
export async function createUser(data: CreateUserDto): Promise<UserResponse> {
    const response = await post<CreateUserDto, UserResponse>(
        `${DOMAIN_BE}/users`,
        data
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

/**
 * Get all users with pagination
 * @access Admin only - Requires authentication and admin role
 */
export async function getAllUsers(page = 1, limit = 10): Promise<UserResponse> {
    const token = await getCookieToken();
    
    const response = await get<UserResponse>(
        `${DOMAIN_BE}/users?page=${page}&limit=${limit}`,
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

/**
 * Get user by ID
 * @access Authenticated - Users can view their own profile or admin can view any profile
 */
export async function getUserById(id: number): Promise<UserResponse> {
    const token = await getCookieToken();

    const response = await get<UserResponse>(
        `${DOMAIN_BE}/users/${id}`,
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

/**
 * Update user
 * @access Authenticated - Users can update their own profile or admin can update any profile
 */
export async function updateUser(id: number, data: UpdateUserDto): Promise<UserResponse> {
    const token = await getCookieToken();

    const response = await patch<{data: UpdateUserDto}, UserResponse>(
        `${DOMAIN_BE}/users/${id}`,
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

/**
 * Delete user
 * @access Admin only
 */
export async function deleteUser(id: number): Promise<UserResponse> {
    const token = await getCookieToken();

    const response = await del<UserResponse>(
        `${DOMAIN_BE}/users/${id}`,
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

/**
 * Create new role
 * @access Admin only
 */
export async function createRole(data: CreateRoleDto): Promise<RoleResponse> {
    const token = await getCookieToken();

    const response = await post<CreateRoleDto, RoleResponse>(
        `${DOMAIN_BE}/roles`,
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

/**
 * Get all roles with pagination
 * @access Admin only
 */
export async function getAllRoles(page = 1, limit = 10): Promise<RoleResponse> {
    const token = await getCookieToken();

    const response = await get<RoleResponse>(
        `${DOMAIN_BE}/roles?page=${page}&limit=${limit}`,
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

/**
 * Get role by ID
 * @access Admin only
 */
export async function getRoleById(id: number): Promise<RoleResponse> {
    const token = await getCookieToken();

    const response = await get<RoleResponse>(
        `${DOMAIN_BE}/roles/${id}`,
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

/**
 * Update role
 * @access Admin only
 */
export async function updateRole(id: number, data: UpdateRoleDto): Promise<RoleResponse> {
    const token = await getCookieToken();

    const response = await patch<{data: UpdateRoleDto}, RoleResponse>(
        `${DOMAIN_BE}/roles/${id}`,
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

/**
 * Delete role
 * @access Admin only
 */
export async function deleteRole(id: number): Promise<RoleResponse> {
    const token = await getCookieToken();

    const response = await del<RoleResponse>(
        `${DOMAIN_BE}/roles/${id}`,
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

/**
 * Get user roles
 * @access Authenticated - Users can view their own roles or admin can view any user's roles
 */
export async function getUserRoles(userId: number): Promise<RoleResponse> {
    const token = await getCookieToken();

    const response = await get<RoleResponse>(
        `${DOMAIN_BE}/users/${userId}/roles`,
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

/**
 * Assign role to user
 * @access Admin only
 */
export async function assignRoleToUser(userId: number, roleId: number): Promise<RoleResponse> {
    const token = await getCookieToken();

    const response = await post<void, RoleResponse>(
        `${DOMAIN_BE}/users/${userId}/roles/${roleId}`,
        undefined,
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

/**
 * Remove role from user
 * @access Admin only
 */
export async function removeRoleFromUser(userId: number, roleId: number): Promise<RoleResponse> {
    const token = await getCookieToken();

    const response = await del<RoleResponse>(
        `${DOMAIN_BE}/users/${userId}/roles/${roleId}`,
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

/**
 * Check if role exists for user
 * @access Admin only
 */
export async function checkRoleExistInUserRoles(userId: number, roleId: number): Promise<RoleResponse> {
    const token = await getCookieToken();

    const response = await get<RoleResponse>(
        `${DOMAIN_BE}/users/${userId}/roles/${roleId}/check`,
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
