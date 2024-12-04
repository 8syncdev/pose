-- Exercise difficulty levels: Easy, Medium, Hard
-- Points range: 0-100 recommended
CREATE TABLE "exercises" (
  "id" SERIAL PRIMARY KEY,
  "lesson_id" INTEGER,
  "category_id" INTEGER,
  "name" VARCHAR(255) NOT NULL,
  "level" VARCHAR(20), -- Recommended values: Easy, Medium, Hard
  "content" TEXT,
  "solution" TEXT,
  "points" INTEGER DEFAULT 0,
  "function_name" VARCHAR(100) NOT NULL DEFAULT 'solve',
  "param_style" VARCHAR(20) NOT NULL DEFAULT 'args', -- args, list
  "time_limit" DECIMAL(4,2) DEFAULT 1.00, -- seconds
  "memory_limit" DECIMAL(4,2) DEFAULT 0.50, -- mb
  "test_cases" TEXT, -- JSON array of test cases with format: [{'input': '1, 2', 'expected': '3', 'description': 'Test description'}]
  "content_visibility" VARCHAR(20) NOT NULL DEFAULT 'public', -- Values: public, premium, enterprise
  "solution_visibility" VARCHAR(20) NOT NULL DEFAULT 'premium', -- Values: public, premium, enterprise
  "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Grade scale: 0.00-100.00
CREATE TABLE "submissions" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INTEGER NOT NULL,
  "exercise_id" INTEGER NOT NULL,
  "code" TEXT NOT NULL,
  "grade" DECIMAL(5, 2),
  "status" VARCHAR(20) NOT NULL, -- pending, completed, failed
  "total_tests" INTEGER DEFAULT 0,
  "passed_tests" INTEGER DEFAULT 0,
  "max_execution_time" DECIMAL(8,6), -- max time across all tests
  "max_memory_used" DECIMAL(8,2), -- max memory across all tests
  "error_message" TEXT, -- Store any error messages
  "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Submission status values: pending, graded, failed
CREATE TABLE "user_submissions" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INTEGER NOT NULL,
  "submission_id" INTEGER NOT NULL,
  "status" VARCHAR(20), -- Recommended values: pending, graded, failed
  "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance optimization
CREATE INDEX "idx_exercises_level" ON "exercises" ("level");
CREATE INDEX "idx_exercises_lesson_id" ON "exercises" ("lesson_id");
CREATE INDEX "idx_exercises_param_style" ON "exercises" ("param_style");

CREATE INDEX "idx_submissions_exercise_id" ON "submissions" ("exercise_id");
CREATE INDEX "idx_submissions_status" ON "submissions" ("status");
CREATE INDEX "idx_submissions_created_at" ON "submissions" ("created_at");
CREATE INDEX "idx_submissions_grade" ON "submissions" ("grade");

CREATE INDEX "idx_user_submissions_user_id" ON "user_submissions" ("user_id");
CREATE INDEX "idx_user_submissions_submission_id" ON "user_submissions" ("submission_id");
CREATE INDEX "idx_user_submissions_status" ON "user_submissions" ("status");
CREATE INDEX "idx_user_submissions_created_at" ON "user_submissions" ("created_at");