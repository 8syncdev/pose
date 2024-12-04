-- Enrollment table with minimal constraints for microservice flexibility
CREATE TABLE "enrollments" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INTEGER NOT NULL,
  "course_id" INTEGER NOT NULL,
  -- Trạng thái của việc ghi danh khóa học:
  -- Các trạng thái:
  -- - active: đang hoạt động, được phép sử dụng khóa học
  -- - trial: đang dùng thử, được phép sử dụng khóa học trong thời gian giới hạn
  -- - expired: đã hết hạn, không được phép sử dụng khóa học
  -- - cancelled: đã hủy, không được phép sử dụng khóa học  
  -- - pending: đang chờ xử lý, chưa được phép sử dụng khóa học
  "status" VARCHAR(20),
  "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "expiration_date" TIMESTAMP WITH TIME ZONE
);

-- Indexes for performance optimization while maintaining flexibility
CREATE INDEX "idx_enrollments_user_id" ON "enrollments" ("user_id");
CREATE INDEX "idx_enrollments_course_id" ON "enrollments" ("course_id");
CREATE INDEX "idx_enrollments_status" ON "enrollments" ("status");
CREATE INDEX "idx_enrollments_expiration_date" ON "enrollments" ("expiration_date");

-- Subscription table with minimal constraints for microservice flexibility
CREATE TABLE "subscriptions" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INTEGER NOT NULL,
  "start_date" TIMESTAMP WITH TIME ZONE NOT NULL,
  "end_date" TIMESTAMP WITH TIME ZONE NOT NULL,
  -- Trạng thái của việc đăng ký:
  -- Các trạng thái:
  -- - active: đang hoạt động, được phép sử dụng dịch vụ
  -- - expired: đã hết hạn, không được phép sử dụng dịch vụ
  -- - cancelled: đã hủy, không được phép sử dụng dịch vụ  
  -- - pending: đang chờ xử lý, chưa được phép sử dụng dịch vụ
  "status" VARCHAR(20),
  "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance optimization while maintaining flexibility
CREATE INDEX "idx_subscriptions_user_id" ON "subscriptions" ("user_id");
CREATE INDEX "idx_subscriptions_status" ON "subscriptions" ("status");
CREATE INDEX "idx_subscriptions_end_date" ON "subscriptions" ("end_date");

-- Subscription-Course mapping table without strict foreign key constraints
CREATE TABLE "subscription_courses" (
  "id" SERIAL PRIMARY KEY,
  "subscription_id" INTEGER NOT NULL,
  "course_id" INTEGER NOT NULL,
  UNIQUE ("subscription_id", "course_id")
);

-- Indexes for performance optimization while maintaining flexibility
CREATE INDEX "idx_subscription_courses_subscription_id" ON "subscription_courses" ("subscription_id");
CREATE INDEX "idx_subscription_courses_course_id" ON "subscription_courses" ("course_id");
