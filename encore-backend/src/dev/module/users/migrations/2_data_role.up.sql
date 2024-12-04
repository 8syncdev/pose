-- Insert basic roles for IT online course platform based on system design
INSERT INTO "roles" ("name", "description") VALUES
('admin', 'System administrator with full platform access and management capabilities'),
('instructor', 'Course creator and teacher who manages course content and students'),
('student', 'Enrolled learner with access to purchased courses'),
('content_manager', 'Manages course categories and content quality'),
('support_staff', 'Customer support and student assistance');

-- Insert permissions aligned with system features
INSERT INTO "permissions" ("name", "codename", "description") VALUES
-- Course Management
('Create Course', 'create_course', 'Can create and publish new courses'),
('Edit Course', 'edit_course', 'Can modify course content and structure'),
('Delete Course', 'delete_course', 'Can remove courses from platform'),
('Manage Categories', 'manage_categories', 'Can manage course categories'),
('Manage Vouchers', 'manage_vouchers', 'Can create and manage course vouchers'),

-- Content Management 
('Create Chapter', 'create_chapter', 'Can create course chapters'),
('Create Lesson', 'create_lesson', 'Can create lessons within chapters'),
('Create Exercise', 'create_exercise', 'Can create exercises for lessons'),
('Review Content', 'review_content', 'Can review and moderate course content'),

-- Student Management
('Enroll Students', 'enroll_students', 'Can process student enrollments'),
('Track Progress', 'track_progress', 'Can view and track student progress'),
('Grade Submissions', 'grade_submissions', 'Can grade student exercise submissions'),
('Manage Reviews', 'manage_reviews', 'Can moderate course reviews'),

-- User Management
('Manage Users', 'manage_users', 'Can manage user accounts'),
('Manage Subscriptions', 'manage_subscriptions', 'Can manage course subscriptions'),
('Process Payments', 'process_payments', 'Can handle payment processing'),
('Send Notifications', 'send_notifications', 'Can send notifications to users');

-- Assign permissions to admin role
INSERT INTO "role_permissions" ("role_id", "permission_id")
SELECT r.id, p.id 
FROM "roles" r, "permissions" p
WHERE r.name = 'admin';

-- Assign instructor permissions
INSERT INTO "role_permissions" ("role_id", "permission_id")
SELECT r.id, p.id
FROM "roles" r, "permissions" p 
WHERE r.name = 'instructor'
AND p.codename IN (
    'create_course', 'edit_course', 'create_chapter',
    'create_lesson', 'create_exercise', 'track_progress',
    'grade_submissions', 'manage_reviews', 'send_notifications',
    'manage_vouchers'
);

-- Assign content manager permissions
INSERT INTO "role_permissions" ("role_id", "permission_id")
SELECT r.id, p.id
FROM "roles" r, "permissions" p
WHERE r.name = 'content_manager'
AND p.codename IN (
    'review_content', 'manage_categories',
    'manage_reviews', 'edit_course'
);

-- Assign support staff permissions
INSERT INTO "role_permissions" ("role_id", "permission_id")
SELECT r.id, p.id
FROM "roles" r, "permissions" p
WHERE r.name = 'support_staff'
AND p.codename IN (
    'track_progress', 'manage_subscriptions',
    'process_payments', 'send_notifications',
    'enroll_students'
);

-- Student role doesn't need explicit permissions as their access
-- is controlled through enrollments and subscriptions


