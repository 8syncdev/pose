-- -- Add constraints for input validation
-- ALTER TABLE "courses" ADD CONSTRAINT "check_course_name_length" CHECK (length(name) >= 3 AND length(name) <= 255);
-- ALTER TABLE "lessons" ADD CONSTRAINT "check_lesson_name_length" CHECK (length(name) >= 3 AND length(name) <= 255);
-- ALTER TABLE "exercises" ADD CONSTRAINT "check_exercise_name_length" CHECK (length(name) >= 3 AND length(name) <= 255);

-- -- Add constraint to ensure discounted_price is less than price
-- ALTER TABLE "courses" ADD CONSTRAINT "check_discounted_price" CHECK (discounted_price IS NULL OR discounted_price <= price);

-- -- Add constraint to ensure start_date is before expiration_date for vouchers
-- ALTER TABLE "vouchers" ADD CONSTRAINT "check_voucher_dates" CHECK (start_date IS NULL OR start_date < expiration_date);
