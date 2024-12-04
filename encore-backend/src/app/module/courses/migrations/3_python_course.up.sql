-- Insert data into the courses table
INSERT INTO "courses" ("name", "slug", "description", "img_url", "price", "discounted_price", "author_id", "difficulty_level", "duration_hours", "is_published")
VALUES (
  'Khóa học Python Cơ bản đến Nâng cao',
  'course-python-foundation',
  'Khóa học lập trình Python từ cơ bản đến nâng cao, cung cấp các kiến thức về chuỗi, hàm, các module, file, cơ sở dữ liệu, OOP cơ bản và nâng cao, thực hiện các project, tìm hiểu các framework (Django).',
  'https://firebasestorage.googleapis.com/v0/b/nextjs-djninex-store.appspot.com/o/image-upload%2Fpython.webp?alt=media&token=4da2d9fb-d7ae-42c7-8ee2-bc5805a4b1cd',
  5500000,
  3300000,
  1,
  'Intermediate',
  108,
  TRUE
);

-- Insert data into the categories table
INSERT INTO "categories" ("name", "slug", "description")
VALUES ('foundation', 'foundation', 'Foundational courses for beginners');

-- Link the course to the category
INSERT INTO "course_categories" ("course_id", "category_id")
VALUES (
  (SELECT "id" FROM "courses" WHERE "slug" = 'course-python-foundation'),
  (SELECT "id" FROM "categories" WHERE "slug" = 'foundation')
);


-- Insert a voucher for the course
INSERT INTO "vouchers" ("code", "discount", "discount_type", "max_uses", "expiration_date", "course_id")
VALUES ('PYTHON2023', 20.00, 'Percentage', 100, '2023-12-31 23:59:59', (SELECT "id" FROM "courses" WHERE "slug" = 'course-python-foundation'));
