import { api, APIError } from "encore.dev/api";
import {
  CreateUserDto,
  UpdateUserDto,
  UserResponse,
  CreateRoleDto,
  UpdateRoleDto,
  RoleResponse
} from "./users.dto";
import UserService from "./services/user.service";
import RoleService from "./services/role.service";
import { DataResponse } from "../../../common/dto";
import { getAuthData } from "encore.dev/internal/codegen/auth";
import type { AuthDataDto } from "./users.module";

/**
 * Counts and returns the number of existing users
 * @access Admin only
 */
export const countUsers = api(
  { expose: true, method: "GET", path: "/count/users", auth: true },
  async (): Promise<DataResponse> => {
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

      const result = await UserService.count();
      return { success: true, result };
    } catch (error) {
      throw APIError.aborted(error?.toString() || "Error counting existing users");
    }
  }
);

/**
 * Creates a new user
 * @access Public - For user registration
 */
export const createUser = api(
  { expose: true, method: "POST", path: "/users" },
  async (data: CreateUserDto): Promise<UserResponse> => {
    try {
      if (!data.username || !data.password) {
        throw APIError.invalidArgument("Missing required fields");
      }
      const result = await UserService.create(data);
      return result;
    } catch (error) {
      throw APIError.aborted(error?.toString() || "Error creating user");
    }
  }
);

/**
 * Gets all users with pagination
 * @access Admin only
 */
export const getAllUsers = api(
  { expose: true, method: "GET", path: "/users", auth: true },
  async ({ page, limit }: { page?: number; limit?: number }): Promise<UserResponse> => {
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

      const result = await UserService.find(page || 1, limit || 10);
      return result;
    } catch (error) {
      throw APIError.aborted(error?.toString() || "Error getting users");
    }
  }
);

/**
 * Gets a single user by ID
 * @access Public - Users can view their own profile
 */
export const getUserById = api(
  { expose: true, method: "GET", path: "/users/:id", auth: true },
  async ({ id }: { id: number }): Promise<UserResponse> => {
    try {
      const authData = getAuthData<AuthDataDto>();
      if (!authData) {
        throw APIError.unauthenticated("Authentication required");
      }

      // Allow if admin or if user is requesting their own data
      const isAdmin = await RoleService.checkRoleExistInUserRoles(parseInt(authData.userID), [1]);
      if ((!isAdmin.success || !isAdmin.result) && parseInt(authData.userID) !== id) {
        throw APIError.permissionDenied("Unauthorized access");
      }

      const result = await UserService.findOne(id);
      return result;
    } catch (error) {
      throw APIError.aborted(error?.toString() || "Error getting user");
    }
  }
);

/**
 * Updates a user
 * @access Public - Users can update their own profile
 */
export const updateUser = api(
  { expose: true, method: "PATCH", path: "/users/:id", auth: true },
  async ({ id, data }: { id: number; data: UpdateUserDto }): Promise<UserResponse> => {
    try {
      const authData = getAuthData<AuthDataDto>();
      if (!authData) {
        throw APIError.unauthenticated("Authentication required");
      }

      // Allow if admin or if user is updating their own data
      const isAdmin = await RoleService.checkRoleExistInUserRoles(parseInt(authData.userID), [1]);
      if ((!isAdmin.success || !isAdmin.result) && parseInt(authData.userID) !== id) {
        throw APIError.permissionDenied("Unauthorized access");
      }

      const result = await UserService.update(id, data);
      return result;
    } catch (error) {
      throw APIError.aborted(error?.toString() || "Error updating user");
    }
  }
);

/**
 * Deletes a user
 * @access Admin only
 */
export const deleteUser = api(
  { expose: true, method: "DELETE", path: "/users/:id", auth: true },
  async ({ id }: { id: number }): Promise<DataResponse> => {
    try {
      const authData = getAuthData<AuthDataDto>();
      if (!authData) {
        throw APIError.unauthenticated("Authentication required");
      }

      // Check if user has admin role
      const hasRole = await RoleService.checkRoleExistInUserRoles(parseInt(authData.userID), [1]);
      if (!hasRole.success || !hasRole.result) {
        throw APIError.permissionDenied("Requires admin role");
      }

      // Prevent deleting own account
      if (parseInt(authData.userID) === id) {
        throw APIError.permissionDenied("Cannot delete your own account");
      }

      const result = await UserService.delete(id);
      return result;
    } catch (error) {
      throw APIError.aborted(error?.toString() || "Error deleting user");
    }
  }
);

/**
 * Creates a new role
 * @access Admin only
 */
export const createRole = api(
  { expose: true, method: "POST", path: "/roles", auth: true },
  async (data: CreateRoleDto): Promise<RoleResponse> => {
    try {
      const authData = getAuthData<AuthDataDto>();
      if (!authData) {
        throw APIError.unauthenticated("Authentication required");
      }

      // Check if user has admin role
      const hasRole = await RoleService.checkRoleExistInUserRoles(parseInt(authData.userID), [1]);
      if (!hasRole.success || !hasRole.result) {
        throw APIError.permissionDenied("Requires admin role");
      }

      const result = await RoleService.create(data);
      return result;
    } catch (error) {
      throw APIError.aborted(error?.toString() || "Error creating role");
    }
  }
);

/**
 * Gets all roles with pagination
 * @access Admin only
 */
export const getAllRoles = api(
  { expose: true, method: "GET", path: "/roles", auth: true },
  async ({ page, limit }: { page?: number; limit?: number }): Promise<RoleResponse> => {
    try {
      const authData = getAuthData<AuthDataDto>();
      if (!authData) {
        throw APIError.unauthenticated("Authentication required");
      }

      // Check if user has admin role
      const hasRole = await RoleService.checkRoleExistInUserRoles(parseInt(authData.userID), [1]);
      if (!hasRole.success || !hasRole.result) {
        throw APIError.permissionDenied("Requires admin role");
      }

      const result = await RoleService.find(page || 1, limit || 10);
      return result;
    } catch (error) {
      throw APIError.aborted(error?.toString() || "Error getting roles");
    }
  }
);

/**
 * Gets a single role by ID
 * @access Admin only
 */
export const getRoleById = api(
  { expose: true, method: "GET", path: "/roles/:id", auth: true },
  async ({ id }: { id: number }): Promise<RoleResponse> => {
    try {
      const authData = getAuthData<AuthDataDto>();
      if (!authData) {
        throw APIError.unauthenticated("Authentication required");
      }

      // Check if user has admin role
      const hasRole = await RoleService.checkRoleExistInUserRoles(parseInt(authData.userID), [1]);
      if (!hasRole.success || !hasRole.result) {
        throw APIError.permissionDenied("Requires admin role");
      }

      const result = await RoleService.findOne(id);
      return result;
    } catch (error) {
      throw APIError.aborted(error?.toString() || "Error getting role");
    }
  }
);

/**
 * Updates a role
 * @access Admin only
 */
export const updateRole = api(
  { expose: true, method: "PATCH", path: "/roles/:id", auth: true },
  async ({ id, data }: { id: number; data: UpdateRoleDto }): Promise<RoleResponse> => {
    try {
      const authData = getAuthData<AuthDataDto>();
      if (!authData) {
        throw APIError.unauthenticated("Authentication required");
      }

      // Check if user has admin role
      const hasRole = await RoleService.checkRoleExistInUserRoles(parseInt(authData.userID), [1]);
      if (!hasRole.success || !hasRole.result) {
        throw APIError.permissionDenied("Requires admin role");
      }

      const result = await RoleService.update(id, data);
      return result;
    } catch (error) {
      throw APIError.aborted(error?.toString() || "Error updating role");
    }
  }
);

/**
 * Deletes a role
 * @access Admin only
 */
export const deleteRole = api(
  { expose: true, method: "DELETE", path: "/roles/:id", auth: true },
  async ({ id }: { id: number }): Promise<RoleResponse> => {
    try {
      const authData = getAuthData<AuthDataDto>();
      if (!authData) {
        throw APIError.unauthenticated("Authentication required");
      }

      // Check if user has admin role
      const hasRole = await RoleService.checkRoleExistInUserRoles(parseInt(authData.userID), [1]);
      if (!hasRole.success || !hasRole.result) {
        throw APIError.permissionDenied("Requires admin role");
      }

      const result = await RoleService.delete(id);
      return result;
    } catch (error) {
      throw APIError.aborted(error?.toString() || "Error deleting role");
    }
  }
);

/**
 * Assigns a role to a user
 * @access Admin only
 */
export const assignRoleToUser = api(
  { expose: true, method: "POST", path: "/users/:userId/roles/:roleId", auth: true },
  async ({ userId, roleId }: { userId: number; roleId: number }): Promise<RoleResponse> => {
    try {
      const authData = getAuthData<AuthDataDto>();
      if (!authData) {
        throw APIError.unauthenticated("Authentication required");
      }

      // Check if user has admin role
      const hasRole = await RoleService.checkRoleExistInUserRoles(parseInt(authData.userID), [1]);
      if (!hasRole.success || !hasRole.result) {
        throw APIError.permissionDenied("Requires admin role");
      }

      const result = await RoleService.assignRoleToUser(userId, roleId);
      return result;
    } catch (error) {
      throw APIError.aborted(error?.toString() || "Error assigning role to user");
    }
  }
);

/**
 * Removes a role from a user
 * @access Admin only
 */
export const removeRoleFromUser = api(
  { expose: true, method: "DELETE", path: "/users/:userId/roles/:roleId", auth: true },
  async ({ userId, roleId }: { userId: number; roleId: number }): Promise<RoleResponse> => {
    try {
      const authData = getAuthData<AuthDataDto>();
      if (!authData) {
        throw APIError.unauthenticated("Authentication required");
      }

      // Check if user has admin role
      const hasRole = await RoleService.checkRoleExistInUserRoles(parseInt(authData.userID), [1]);
      if (!hasRole.success || !hasRole.result) {
        throw APIError.permissionDenied("Requires admin role");
      }

      const result = await RoleService.removeRoleFromUser(userId, roleId);
      return result;
    } catch (error) {
      throw APIError.aborted(error?.toString() || "Error removing role from user");
    }
  }
);

/**
 * Gets all roles for a user
 * @access Public - Users can view their own roles
 */
export const getUserRoles = api(
  { expose: true, method: "GET", path: "/users/:userId/roles", auth: true },
  async ({ userId }: { userId: number }): Promise<RoleResponse> => {
    try {
      const authData = getAuthData<AuthDataDto>();
      if (!authData) {
        throw APIError.unauthenticated("Authentication required");
      }

      // Allow if admin or if user is requesting their own roles
      const isAdmin = await RoleService.checkRoleExistInUserRoles(parseInt(authData.userID), [1]);
      if ((!isAdmin.success || !isAdmin.result) && parseInt(authData.userID) !== userId) {
        throw APIError.permissionDenied("Unauthorized access");
      }

      const result = await RoleService.getUserRoles(userId);
      return result;
    } catch (error) {
      throw APIError.aborted(error?.toString() || "Error getting user roles");
    }
  }
);

/**
 * Checks if a role exists for a user
 * @access Admin only
 */
export const checkRoleExistInUserRoles = api(
  { expose: true, method: "GET", path: "/users/:userId/roles/:roleId/check", auth: true },
  async ({ userId, roleId }: { userId: number; roleId: number }): Promise<DataResponse> => {
    try {
      const authData = getAuthData<AuthDataDto>();
      if (!authData) {
        throw APIError.unauthenticated("Authentication required");
      }

      // Check if user has admin role
      const hasRole = await RoleService.checkRoleExistInUserRoles(parseInt(authData.userID), [1]);
      if (!hasRole.success || !hasRole.result) {
        throw APIError.permissionDenied("Requires admin role");
      }

      const result = await RoleService.checkRoleExistInUserRoles(userId, [roleId]);
      return result;
    } catch (error) {
      throw APIError.aborted(error?.toString() || "Error checking role existence");
    }
  }
);
