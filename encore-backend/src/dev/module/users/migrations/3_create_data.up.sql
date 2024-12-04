-- Insert admin user with full details
INSERT INTO "users" (
    "username",
    "password",
    "email",
    "phone",
    "first_name",
    "last_name",
    "is_active",
    "is_verified",
    "date_joined",
    "last_login"
) VALUES (
    'admin',
    '$2b$12$zEb/JcYm9Khik0Ms7TG9w.s/kl4oij8rjA/zn5zh2J/YJC6.pGFYW',
    '8sync.dev.1111@gmail.com',
    '0767449819',
    'Nguyễn Phương Anh',
    'Tú',
    true,
    true,
    '2024-01-01T00:00:00.000Z',
    '2024-01-01T00:00:00.000Z'
);

-- Assign admin role to admin user
INSERT INTO "user_roles" ("user_id", "role_id")
SELECT u.id, r.id
FROM "users" u, "roles" r
WHERE u.username = 'admin'
AND r.name = 'admin';

-- Insert test users without roles
INSERT INTO "users" (
    "username",
    "password", 
    "email",
    "first_name",
    "last_name",
    "is_active",
    "is_verified",
    "date_joined",
    "last_login"
) VALUES 
('nguyen.phuong.nam', '$2b$12$zEb/JcYm9Khik0Ms7TG9w.s/kl4oij8rjA/zn5zh2J/YJC6.pGFYW', 'nguyenphuongnam@gmail.com', 'Nguyễn Phương', 'Nam', true, false, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('tran.minh.duc', '$2b$12$zEb/JcYm9Khik0Ms7TG9w.s/kl4oij8rjA/zn5zh2J/YJC6.pGFYW', 'tranminhduc@gmail.com', 'Trần Minh', 'Đức', true, false, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('le.thanh.huyen', '$2b$12$zEb/JcYm9Khik0Ms7TG9w.s/kl4oij8rjA/zn5zh2J/YJC6.pGFYW', 'lethanhhuyen@gmail.com', 'Lê Thanh', 'Huyền', true, false, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('pham.thu.trang', '$2b$12$zEb/JcYm9Khik0Ms7TG9w.s/kl4oij8rjA/zn5zh2J/YJC6.pGFYW', 'phamthutrang@gmail.com', 'Phạm Thu', 'Trang', true, false, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('hoang.minh.tuan', '$2b$12$zEb/JcYm9Khik0Ms7TG9w.s/kl4oij8rjA/zn5zh2J/YJC6.pGFYW', 'hoangminhtuan@gmail.com', 'Hoàng Minh', 'Tuấn', true, false, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('vu.thi.hong', '$2b$12$zEb/JcYm9Khik0Ms7TG9w.s/kl4oij8rjA/zn5zh2J/YJC6.pGFYW', 'vuthihong@gmail.com', 'Vũ Thị', 'Hồng', true, false, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('do.van.hung', '$2b$12$zEb/JcYm9Khik0Ms7TG9w.s/kl4oij8rjA/zn5zh2J/YJC6.pGFYW', 'dovanhung@gmail.com', 'Đỗ Văn', 'Hùng', true, false, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('nguyen.thi.mai', '$2b$12$zEb/JcYm9Khik0Ms7TG9w.s/kl4oij8rjA/zn5zh2J/YJC6.pGFYW', 'nguyenthimai@gmail.com', 'Nguyễn Thị', 'Mai', true, false, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('tran.van.long', '$2b$12$zEb/JcYm9Khik0Ms7TG9w.s/kl4oij8rjA/zn5zh2J/YJC6.pGFYW', 'tranvanlong@gmail.com', 'Trần Văn', 'Long', true, false, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('phan.thi.thu', '$2b$12$zEb/JcYm9Khik0Ms7TG9w.s/kl4oij8rjA/zn5zh2J/YJC6.pGFYW', 'phanthithu@gmail.com', 'Phan Thị', 'Thu', true, false, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('bui.quang.minh', '$2b$12$zEb/JcYm9Khik0Ms7TG9w.s/kl4oij8rjA/zn5zh2J/YJC6.pGFYW', 'buiquangminh@gmail.com', 'Bùi Quang', 'Minh', true, false, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('ngo.thanh.van', '$2b$12$zEb/JcYm9Khik0Ms7TG9w.s/kl4oij8rjA/zn5zh2J/YJC6.pGFYW', 'ngothanhvan@gmail.com', 'Ngô Thanh', 'Vân', true, false, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('dang.quoc.anh', '$2b$12$zEb/JcYm9Khik0Ms7TG9w.s/kl4oij8rjA/zn5zh2J/YJC6.pGFYW', 'dangquocanh@gmail.com', 'Đặng Quốc', 'Anh', true, false, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('ho.ngoc.linh', '$2b$12$zEb/JcYm9Khik0Ms7TG9w.s/kl4oij8rjA/zn5zh2J/YJC6.pGFYW', 'hongoclinh@gmail.com', 'Hồ Ngọc', 'Linh', true, false, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z'),
('ly.hoang.nam', '$2b$12$zEb/JcYm9Khik0Ms7TG9w.s/kl4oij8rjA/zn5zh2J/YJC6.pGFYW', 'lyhoangnam@gmail.com', 'Lý Hoàng', 'Nam', true, false, '2024-01-01T00:00:00.000Z', '2024-01-01T00:00:00.000Z');


