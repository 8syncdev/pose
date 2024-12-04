import { sql } from "drizzle-orm";
import * as t from "drizzle-orm/pg-core";

export const enrollmentsTable = t.pgTable("enrollments", {
  id: t.serial("id").primaryKey(),
  user_id: t.integer("user_id").notNull(),
  course_id: t.integer("course_id").notNull(),
  status: t.varchar("status", { length: 20 }).notNull(),
  created_at: t.timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updated_at: t.timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  expiration_date: t.timestamp("expiration_date", { withTimezone: true }),
}, (table) => ({
  statusCheck: t.check("status_check", sql`${table.status} IN ('active', 'trial', 'expired', 'cancelled', 'pending')`),
  userIdIndex: t.index("idx_enrollments_user_id").on(table.user_id),
  courseIdIndex: t.index("idx_enrollments_course_id").on(table.course_id),
  statusIndex: t.index("idx_enrollments_status").on(table.status),
  expirationDateIndex: t.index("idx_enrollments_expiration_date").on(table.expiration_date),
}));

export const subscriptionsTable = t.pgTable("subscriptions", {
  id: t.serial("id").primaryKey(),
  user_id: t.integer("user_id").notNull(),
  start_date: t.timestamp("start_date", { withTimezone: true }).notNull(),
  end_date: t.timestamp("end_date", { withTimezone: true }).notNull(),
  status: t.varchar("status", { length: 20 }).notNull(),
  created_at: t.timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updated_at: t.timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
}, (table) => ({
  statusCheck: t.check("status_check", sql`${table.status} IN ('active', 'expired', 'cancelled', 'pending')`),
  userIdIndex: t.index("idx_subscriptions_user_id").on(table.user_id),
  statusIndex: t.index("idx_subscriptions_status").on(table.status),
  endDateIndex: t.index("idx_subscriptions_end_date").on(table.end_date),
}));

export const subscriptionCoursesTable = t.pgTable("subscription_courses", {
  id: t.serial("id").primaryKey(),
  subscription_id: t.integer("subscription_id").notNull().references(() => subscriptionsTable.id, { onDelete: "cascade" }),
  course_id: t.integer("course_id").notNull(),
}, (table) => ({
  subscriptionIdIndex: t.index("idx_subscription_courses_subscription_id").on(table.subscription_id),
  courseIdIndex: t.index("idx_subscription_courses_course_id").on(table.course_id),
}));

export interface Enrollment {
  id?: number;
  user_id: number;
  course_id: number;
  status: 'active' | 'trial' | 'expired' | 'cancelled' | 'pending';
  created_at: string;
  updated_at: string;
  expiration_date?: string;
}

export interface Subscription {
  id?: number;
  user_id: number;
  start_date: string;
  end_date: string;
  status: 'active' | 'expired' | 'cancelled' | 'pending';
  created_at: string;
  updated_at: string;
}

export interface SubscriptionCourse {
  id?: number;
  subscription_id: number;
  course_id: number;
}
