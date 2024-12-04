-- Core tables
CREATE TABLE "courses" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(255) NOT NULL,        -- Course title, max 255 chars
  "slug" VARCHAR(255) NOT NULL UNIQUE, -- URL-friendly identifier
  "description" TEXT,                  -- Course description, unlimited length
  "img_url" VARCHAR(255),             -- Course thumbnail URL
  "price" DECIMAL(10, 2) NOT NULL,    -- Price with 2 decimal places
  "discounted_price" DECIMAL(10, 2),  -- Optional discounted price
  "author_id" INTEGER,                -- Reference to author in Users service
  "difficulty_level" VARCHAR(20),      -- Beginner/Intermediate/Advanced
  "duration_hours" INTEGER,           -- Estimated total duration
  "is_published" BOOLEAN DEFAULT FALSE,
  "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "categories" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(100) NOT NULL,       -- Category name, max 100 chars
  "slug" VARCHAR(100) NOT NULL UNIQUE, -- URL-friendly identifier
  "description" TEXT,                 -- Category description
  "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Junction table for many-to-many relationship
CREATE TABLE "course_categories" (
  "course_id" INTEGER NOT NULL,
  "category_id" INTEGER NOT NULL,
  PRIMARY KEY ("course_id", "category_id")
);

CREATE TABLE "chapters" (
  "id" SERIAL PRIMARY KEY,
  "course_id" INTEGER NOT NULL,       -- Reference to parent course
  "name" VARCHAR(255) NOT NULL,       -- Chapter title
  "description" TEXT,                 -- Chapter description
  "order" INTEGER NOT NULL,           -- Display order in course
  "duration_minutes" INTEGER,         -- Chapter duration
  "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "lessons" (
  "id" SERIAL PRIMARY KEY,
  "chapter_id" INTEGER NOT NULL,      -- Reference to parent chapter
  "name" VARCHAR(255) NOT NULL,       -- Lesson title
  "description" TEXT,                 -- Lesson description
  "order" INTEGER NOT NULL,           -- Display order in chapter
  "content" TEXT,                     -- Lesson content/materials
  "video_url" VARCHAR(255),          -- Video content URL
  "duration_minutes" INTEGER,         -- Lesson duration
  "is_free" BOOLEAN DEFAULT FALSE,    -- Preview availability
  "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "vouchers" (
  "id" SERIAL PRIMARY KEY,
  "code" VARCHAR(20) NOT NULL UNIQUE, -- Unique voucher code
  "discount" DECIMAL(5, 2) NOT NULL,  -- Discount amount
  "discount_type" VARCHAR(10),        -- Percentage/Fixed
  "max_uses" INTEGER,                -- Maximum redemption limit
  "uses_count" INTEGER DEFAULT 0,     -- Current usage count
  "start_date" TIMESTAMP WITH TIME ZONE,
  "expiration_date" TIMESTAMP WITH TIME ZONE NOT NULL,
  "course_id" INTEGER,               -- Optional specific course limitation
  "is_active" BOOLEAN DEFAULT TRUE,
  "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Performance indexes
CREATE INDEX "idx_courses_slug" ON "courses" ("slug");
CREATE INDEX "idx_courses_price" ON "courses" ("price");
CREATE INDEX "idx_courses_difficulty_level" ON "courses" ("difficulty_level");
CREATE INDEX "idx_categories_slug" ON "categories" ("slug");
CREATE INDEX "idx_course_categories_course_id" ON "course_categories" ("course_id");
CREATE INDEX "idx_course_categories_category_id" ON "course_categories" ("category_id");
CREATE INDEX "idx_chapters_course_id" ON "chapters" ("course_id");
CREATE INDEX "idx_chapters_order" ON "chapters" ("order");
CREATE INDEX "idx_lessons_chapter_id" ON "lessons" ("chapter_id");
CREATE INDEX "idx_lessons_order" ON "lessons" ("order");
CREATE INDEX "idx_vouchers_code" ON "vouchers" ("code");
CREATE INDEX "idx_vouchers_course_id" ON "vouchers" ("course_id");
CREATE INDEX "idx_vouchers_expiration_date" ON "vouchers" ("expiration_date");