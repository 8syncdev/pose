import { sql } from "drizzle-orm";
import * as t from "drizzle-orm/pg-core";

// Exercises table - Practice problems and coding challenges
export const exercisesTable = t.pgTable("exercises", {
  id: t.serial("id").primaryKey(),
  lesson_id: t.integer("lesson_id"),                      // Reference to parent lesson
  category_id: t.integer("category_id"),                  // Reference to category
  name: t.varchar("name", { length: 255 }).notNull(),     // Exercise title
  level: t.varchar("level", { length: 20 }),              // Values: Easy/Medium/Hard
  content: t.text("content"),                             // Exercise content/question
  solution: t.text("solution"),                           // Exercise solution
  points: t.integer("points").default(0),                 // Points value: 0-100 recommended
  function_name: t.varchar("function_name", { length: 100 }).notNull().default('solve'),
  param_style: t.varchar("param_style", { length: 20 }).notNull().default('args'), // args, list
  time_limit: t.decimal("time_limit", { precision: 4, scale: 2 }).default('1.00'), // seconds
  memory_limit: t.decimal("memory_limit", { precision: 4, scale: 2 }).default('0.50'), // mb
  test_cases: t.text("test_cases"),                       // JSON array of test cases
  content_visibility: t.varchar("content_visibility", { length: 20 }).notNull().default('public'), // Values: public/premium/enterprise
  solution_visibility: t.varchar("solution_visibility", { length: 20 }).notNull().default('premium'), // Values: public/premium/enterprise
  created_at: t.timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updated_at: t.timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

// Submissions table - Student exercise submissions
export const submissionsTable = t.pgTable("submissions", {
  id: t.serial("id").primaryKey(),
  user_id: t.integer("user_id").notNull(),               // Reference to user
  exercise_id: t.integer("exercise_id").notNull(),       // Reference to exercise
  code: t.text("code").notNull(),                        // Submitted code
  grade: t.decimal("grade", { precision: 5, scale: 2 }), // Grade: 0.00-100.00
  status: t.varchar("status", { length: 20 }).notNull(), // Values: pending/completed/failed
  total_tests: t.integer("total_tests").default(0),
  passed_tests: t.integer("passed_tests").default(0),
  max_execution_time: t.decimal("max_execution_time", { precision: 8, scale: 6 }),
  max_memory_used: t.decimal("max_memory_used", { precision: 8, scale: 2 }),
  error_message: t.text("error_message"),
  created_at: t.timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updated_at: t.timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

// User Submissions table - Track submission status
export const userSubmissionsTable = t.pgTable("user_submissions", {
  id: t.serial("id").primaryKey(),
  user_id: t.integer("user_id").notNull(),               // Reference to user
  submission_id: t.integer("submission_id").notNull(),    // Reference to submission
  status: t.varchar("status", { length: 20 }),           // Values: pending/graded/failed
  created_at: t.timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updated_at: t.timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export interface Exercise {
  id?: number;
  lesson_id?: number;
  category_id?: number;
  name: string;
  level?: 'Easy' | 'Medium' | 'Hard';
  content?: string;
  solution?: string;
  points: number;
  function_name: string;
  param_style: 'args' | 'list';
  time_limit: number;
  memory_limit: number;
  test_cases?: string;
  content_visibility: 'public' | 'premium' | 'enterprise';
  solution_visibility: 'public' | 'premium' | 'enterprise';
  created_at: string;
  updated_at: string;
}

export interface Submission {
  id?: number;
  user_id?: number;
  exercise_id: number;
  code: string;
  grade?: number;
  status: 'pending' | 'completed' | 'failed';
  total_tests: number;
  passed_tests: number;
  max_execution_time?: number;
  max_memory_used?: number;
  error_message?: string;
  created_at: string;
  updated_at: string;
}

export interface UserSubmission {
  id?: number;
  user_id: number;
  submission_id: number;
  status?: 'pending' | 'graded' | 'failed';
  created_at: string;
  updated_at: string;
}
