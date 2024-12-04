-- Thêm ràng buộc duy nhất cho bảng enrollments để đảm bảo một người dùng không thể ghi danh vào cùng một khóa học nhiều lần
-- Điều này ngăn chặn việc một học viên đăng ký trùng lặp vào cùng một khóa học
-- Tương tự như Udemy, khi học viên đã mua khóa học, họ không thể mua lại khóa học đó
ALTER TABLE "enrollments"
ADD CONSTRAINT "unique_user_course_enrollment" UNIQUE ("user_id", "course_id");

-- Thêm ràng buộc để đảm bảo ngày hết hạn (expiration_date) phải lớn hơn ngày tạo (created_at)
-- Điều này đảm bảo tính hợp lý về mặt thời gian của khóa học
-- Ví dụ: Khi học viên đăng ký khóa học có thời hạn (trial), thời gian hết hạn phải nằm sau thời điểm đăng ký
ALTER TABLE "enrollments"
ADD CONSTRAINT "check_expiration_date_after_created"
CHECK (expiration_date IS NULL OR expiration_date > created_at);

-- Thêm ràng buộc cho bảng subscriptions để đảm bảo ngày kết thúc phải sau ngày bắt đầu
-- Điều này áp dụng cho các gói đăng ký (subscription) có thời hạn
-- Tương tự như các gói Premium/Pro của Udemy
ALTER TABLE "subscriptions"
ADD CONSTRAINT "check_end_date_after_start_date"
CHECK (end_date > start_date);

-- Thêm ràng buộc cho bảng subscription_courses để đảm bảo không có khóa học trùng lặp trong cùng một gói đăng ký
-- Điều này ngăn chặn việc thêm cùng một khóa học vào gói đăng ký nhiều lần
-- Ràng buộc này đã được tạo trong file trước với UNIQUE ("subscription_id", "course_id")
ALTER TABLE "subscription_courses"
ADD CONSTRAINT "unique_subscription_course" UNIQUE ("subscription_id", "course_id");



