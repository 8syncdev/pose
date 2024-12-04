import * as t from "drizzle-orm/pg-core";

export const usersTable = t.pgTable("users", {
  id: t.serial("id").primaryKey(),
  username: t.varchar("username", { length: 50 }).notNull().unique(),
  password: t.varchar("password", { length: 255 }).notNull(),
  email: t.varchar("email", { length: 100 }),
  phone: t.varchar("phone", { length: 20 }),
  first_name: t.varchar("first_name", { length: 50 }),
  last_name: t.varchar("last_name", { length: 50 }),
  profile_picture: t.varchar("profile_picture", { length: 255 }),
  bio: t.text("bio"),
  is_active: t.boolean("is_active").default(true),
  is_verified: t.boolean("is_verified").default(false),
  last_login: t.timestamp("last_login", { withTimezone: true }),
  date_joined: t.timestamp("date_joined", { withTimezone: true }).defaultNow(),
  preferred_language: t.varchar("preferred_language", { length: 10 }),
  timezone: t.varchar("timezone", { length: 50 }),
});

export const addressesTable = t.pgTable("addresses", {
  id: t.serial("id").primaryKey(),
  user_id: t.integer("user_id").notNull(), // Removed foreign key constraint for microservice flexibility
  type: t.varchar("type", { length: 20 }).notNull(),
  street: t.varchar("street", { length: 100 }).notNull(),
  city: t.varchar("city", { length: 50 }).notNull(),
  state: t.varchar("state", { length: 50 }).notNull(),
  zip: t.varchar("zip", { length: 20 }).notNull(),
  country: t.varchar("country", { length: 50 }).notNull(),
  is_default: t.boolean("is_default").default(false),
  created_at: t.timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updated_at: t.timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const rolesTable = t.pgTable("roles", {
  id: t.serial("id").primaryKey(),
  name: t.varchar("name", { length: 50 }).notNull().unique(),
  description: t.text("description"),
  created_at: t.timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updated_at: t.timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const userRolesTable = t.pgTable("user_roles", {
  user_id: t.integer("user_id").notNull(), // Removed foreign key constraint for microservice flexibility
  role_id: t.integer("role_id").notNull(), // Removed foreign key constraint for microservice flexibility
  created_at: t.timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
}, (table) => ({
  pk: t.primaryKey({ columns: [table.user_id, table.role_id] }),
}));

export const permissionsTable = t.pgTable("permissions", {
  id: t.serial("id").primaryKey(),
  name: t.varchar("name", { length: 100 }).notNull(),
  codename: t.varchar("codename", { length: 100 }).notNull(),
  description: t.text("description"),
  created_at: t.timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updated_at: t.timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const rolePermissionsTable = t.pgTable("role_permissions", {
  role_id: t.integer("role_id").notNull(), // Removed foreign key constraint for microservice flexibility
  permission_id: t.integer("permission_id").notNull(), // Removed foreign key constraint for microservice flexibility
  created_at: t.timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
}, (table) => ({
  pk: t.primaryKey({ columns: [table.role_id, table.permission_id] }),
}));

export interface User {
  id?: number;
  username: string;
  password: string;
  email?: string | null;
  phone?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  profile_picture?: string | null;
  bio?: string | null;
  is_active?: boolean;
  is_verified?: boolean;
  last_login?: string | null;
  date_joined?: string;
  preferred_language?: string | null;
  timezone?: string | null;
}

export interface Address {
  id?: number;
  user_id: number;
  type: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  is_default?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Role {
  id?: number;
  name: string;
  description?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface UserRole {
  user_id: number;
  role_id: number;
  created_at?: string;
}

export interface Permission {
  id?: number;
  name: string;
  codename: string;
  description?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface RolePermission {
  role_id: number;
  permission_id: number;
  created_at?: string;
}
