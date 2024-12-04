import { DataResponse, Paginated } from "../../../common/dto";
import { User, Address, Role, UserRole, Permission, RolePermission } from "./users.model";

// Represents a user in the system
export type UserDto = User;

// Data required to create a new user
export type CreateUserDto = Pick<User, 'username' | 'password'>;

// Data that can be updated for an existing user
export type UpdateUserDto = Partial<Omit<User, 'id' | 'last_login' | 'date_joined'>>;

// Represents an address associated with a user
export type AddressDto = Address;

// Represents a role in the system
export type RoleDto = Role;

// Represents the association between a user and a role
export type UserRoleDto = UserRole;

// Represents a permission in the system
export type PermissionDto = Permission;

// Represents the association between a role and a permission
export type RolePermissionDto = RolePermission;

// Response type for user-related operations
export type UserResponse = Omit<DataResponse, 'result'> & {
  result?: UserDto | UserDto[]; // The user(s) returned by the operation
  pagination?: Paginated; // Pagination information, if applicable
}

// Data required to create a new address
export type CreateAddressDto = Omit<Address, 'id' | 'created_at' | 'updated_at'>;

// Data that can be updated for an existing address
export type UpdateAddressDto = Partial<Omit<Address, 'id' | 'user_id' | 'created_at' | 'updated_at'>>;

// Data required to create a new role
export type CreateRoleDto = Omit<Role, 'id' | 'created_at' | 'updated_at'>;

// Data that can be updated for an existing role
export type UpdateRoleDto = Partial<Omit<Role, 'id' | 'created_at' | 'updated_at'>>;

// Data required to create a new permission
export type CreatePermissionDto = Omit<Permission, 'id' | 'created_at' | 'updated_at'>;

// Data that can be updated for an existing permission
export type UpdatePermissionDto = Partial<Omit<Permission, 'id' | 'created_at' | 'updated_at'>>;

// Response types for other entities
export type AddressResponse = Omit<DataResponse, 'result'> & {
  result?: AddressDto | AddressDto[];
  pagination?: Paginated;
}

export type RoleResponse = Omit<DataResponse, 'result'> & {
  result?: RoleDto | RoleDto[];
  pagination?: Paginated;
}

export type PermissionResponse = Omit<DataResponse, 'result'> & {
  result?: PermissionDto | PermissionDto[];
  pagination?: Paginated;
}