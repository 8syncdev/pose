-- User table with minimal constraints for microservice flexibility
-- is_verified: Indicates whether the user has verified their email/phone number
-- This helps prevent spam accounts and ensures user authenticity
CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "username" VARCHAR(50) NOT NULL UNIQUE,
  "password" VARCHAR(255) NOT NULL,
  "email" VARCHAR(100),
  "phone" VARCHAR(20),
  "first_name" VARCHAR(50),
  "last_name" VARCHAR(50),
  "profile_picture" VARCHAR(255),
  "bio" TEXT,
  "is_active" BOOLEAN DEFAULT true,
  "is_verified" BOOLEAN DEFAULT false,
  "last_login" TIMESTAMP WITH TIME ZONE,
  "date_joined" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  "preferred_language" VARCHAR(10),
  "timezone" VARCHAR(50)
);

-- Address table without strict foreign key constraints
CREATE TABLE "addresses" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INTEGER NOT NULL,
  "type" VARCHAR(20) NOT NULL,
  "street" VARCHAR(100) NOT NULL,
  "city" VARCHAR(50) NOT NULL,
  "state" VARCHAR(50) NOT NULL,
  "zip" VARCHAR(20) NOT NULL,
  "country" VARCHAR(50) NOT NULL,
  "is_default" BOOLEAN DEFAULT false,
  "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
  -- Removed foreign key constraint for microservice flexibility
);

-- Role table with minimal constraints
CREATE TABLE "roles" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(50) NOT NULL UNIQUE,
  "description" TEXT,
  "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- User-Role mapping table without strict foreign key constraints
CREATE TABLE "user_roles" (
  "user_id" INTEGER NOT NULL,
  "role_id" INTEGER NOT NULL,
  "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY ("user_id", "role_id")
  -- Removed foreign key constraints for microservice flexibility
);

-- Permission table with minimal constraints
CREATE TABLE "permissions" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(100) NOT NULL,
  "codename" VARCHAR(100) NOT NULL,
  "description" TEXT,
  "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
  -- Removed unique constraint for microservice flexibility
);

-- Role-Permission mapping table without strict foreign key constraints
CREATE TABLE "role_permissions" (
  "role_id" INTEGER NOT NULL,
  "permission_id" INTEGER NOT NULL,
  "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY ("role_id", "permission_id")
  -- Removed foreign key constraints for microservice flexibility
);

-- Indexes for performance optimization while maintaining flexibility
CREATE INDEX "idx_users_username" ON "users" ("username");
CREATE INDEX "idx_users_email" ON "users" ("email");
CREATE INDEX "idx_users_last_login" ON "users" ("last_login");
CREATE INDEX "idx_addresses_user_id" ON "addresses" ("user_id");
CREATE INDEX "idx_user_roles_user_id" ON "user_roles" ("user_id");
CREATE INDEX "idx_user_roles_role_id" ON "user_roles" ("role_id");
CREATE INDEX "idx_role_permissions_role_id" ON "role_permissions" ("role_id");
CREATE INDEX "idx_role_permissions_permission_id" ON "role_permissions" ("permission_id");
