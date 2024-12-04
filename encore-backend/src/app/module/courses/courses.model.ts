import { sql } from "drizzle-orm";
import * as t from "drizzle-orm/pg-core";

// Course table - Core course information
export const coursesTable = t.pgTable("courses", {
  id: t.serial("id").primaryKey(),
  name: t.varchar("name", { length: 255 }).notNull(),        // Course title, max 255 chars
  slug: t.varchar("slug", { length: 255 }).notNull(),        // URL-friendly identifier
  description: t.text("description"),                         // Course description, unlimited length
  img_url: t.varchar("img_url", { length: 255 }),            // Course thumbnail URL
  price: t.decimal("price", { precision: 10, scale: 2 }).notNull(), // Price with 2 decimal places
  discounted_price: t.decimal("discounted_price", { precision: 10, scale: 2 }), // Optional discounted price
  author_id: t.integer("author_id"),                         // Reference to author in Users service
  difficulty_level: t.varchar("difficulty_level", { length: 20 }), // Values: Beginner/Intermediate/Advanced
  duration_hours: t.integer("duration_hours"),               // Estimated total duration
  is_published: t.boolean("is_published").default(false),
  created_at: t.timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updated_at: t.timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

// Categories table - Course categorization
export const categoriesTable = t.pgTable("categories", {
  id: t.serial("id").primaryKey(),
  name: t.varchar("name", { length: 100 }).notNull(),        // Category name, max 100 chars
  slug: t.varchar("slug", { length: 100 }).notNull(),        // URL-friendly identifier
  description: t.text("description"),                        // Category description
  created_at: t.timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updated_at: t.timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

// Junction table for many-to-many course-category relationship
export const courseCategoriesTable = t.pgTable("course_categories", {
  course_id: t.integer("course_id").notNull(),
  category_id: t.integer("category_id").notNull(),
});

// Chapters table - Course content organization
export const chaptersTable = t.pgTable("chapters", {
  id: t.serial("id").primaryKey(),
  course_id: t.integer("course_id").notNull(),              // Reference to parent course
  name: t.varchar("name", { length: 255 }).notNull(),       // Chapter title
  description: t.text("description"),                       // Chapter description
  order: t.integer("order").notNull(),                     // Display order in course
  duration_minutes: t.integer("duration_minutes"),          // Chapter duration
  created_at: t.timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updated_at: t.timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

// Lessons table - Individual learning units
export const lessonsTable = t.pgTable("lessons", {
  id: t.serial("id").primaryKey(),
  chapter_id: t.integer("chapter_id").notNull(),           // Reference to parent chapter
  name: t.varchar("name", { length: 255 }).notNull(),      // Lesson title
  description: t.text("description"),                      // Lesson description
  order: t.integer("order").notNull(),                    // Display order in chapter
  content: t.text("content"),                             // Lesson content/materials
  video_url: t.varchar("video_url", { length: 255 }),     // Video content URL
  duration_minutes: t.integer("duration_minutes"),         // Lesson duration
  is_free: t.boolean("is_free").default(false),           // Preview availability
  created_at: t.timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updated_at: t.timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

// Exercises table - Practice problems
export const exercisesTable = t.pgTable("exercises", {
  id: t.serial("id").primaryKey(),
  lesson_id: t.integer("lesson_id"),                      // Reference to parent lesson
  name: t.varchar("name", { length: 255 }).notNull(),     // Exercise title
  level: t.varchar("level", { length: 20 }),              // Values: Easy/Medium/Hard
  content: t.text("content"),                            // Exercise content/question
  solution: t.text("solution"),                          // Exercise solution
  points: t.integer("points").default(0),                // Points value: 0-100 recommended
  created_at: t.timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updated_at: t.timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

// Vouchers table - Course discounts
export const vouchersTable = t.pgTable("vouchers", {
  id: t.serial("id").primaryKey(),
  code: t.varchar("code", { length: 20 }).notNull(),      // Unique voucher code
  discount: t.decimal("discount", { precision: 5, scale: 2 }).notNull(), // Discount amount
  discount_type: t.varchar("discount_type", { length: 10 }), // Values: Percentage/Fixed
  max_uses: t.integer("max_uses"),                       // Maximum redemption limit
  uses_count: t.integer("uses_count").default(0),        // Current usage count
  start_date: t.timestamp("start_date", { withTimezone: true }),
  expiration_date: t.timestamp("expiration_date", { withTimezone: true }).notNull(),
  course_id: t.integer("course_id"),                     // Optional specific course limitation
  is_active: t.boolean("is_active").default(true),
  created_at: t.timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updated_at: t.timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export interface Course {
  id?: number;
  name: string;
  slug: string;
  description?: string;
  img_url?: string;
  price: number;
  discounted_price?: number;
  author_id?: number;
  difficulty_level?: 'Beginner' | 'Intermediate' | 'Advanced';
  duration_hours?: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id?: number;
  name: string;
  slug: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface CourseCategory {
  course_id: number;
  category_id: number;
}

export interface Chapter {
  id?: number;
  course_id: number;
  name: string;
  description?: string | null;
  order: number;
  duration_minutes?: number;
  created_at: string;
  updated_at: string;
}

export interface Lesson {
  id?: number;
  chapter_id: number;
  name: string;
  description?: string;
  order: number;
  content?: string;
  video_url?: string;
  duration_minutes?: number;
  is_free: boolean;
  created_at: string;
  updated_at: string;
}


export interface Voucher {
  id?: number;
  code: string;
  discount: number;
  discount_type: 'Percentage' | 'Fixed';
  max_uses?: number;
  uses_count: number;
  start_date?: string;
  expiration_date: string;
  course_id?: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
