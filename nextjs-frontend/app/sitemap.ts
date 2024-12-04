import { MetadataRoute } from 'next'
import { MY_INFO } from '@/constants/my-info'

export default function sitemap(): MetadataRoute.Sitemap {
    // Sử dụng URL cơ sở từ biến môi trường vì siteUrl không có trong MY_INFO
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://syncdev8.com'

    // Các đường dẫn từ thanh điều hướng header
    const routes = [
        {
            path: '',           // Trang chủ
            priority: 1.0,      // Ưu tiên cao nhất cho trang chủ
            description: 'Trang chủ của 8Sync - Nơi chia sẻ kiến thức lập trình và công nghệ'
        },
        {
            path: 'course',     // Trang khóa học
            priority: 0.8,      // Ưu tiên thấp hơn trang chủ
            description: 'Các khóa học lập trình chất lượng cao từ cơ bản đến nâng cao'
        },
        {
            path: 'exercise',   // Trang bài tập thực hành
            priority: 0.8,      // Ưu tiên như trang khóa học
            description: 'Bài tập thực hành giúp củng cố kiến thức và kỹ năng lập trình'
        },
        {
            path: 'info',       // Trang thông tin cá nhân
            priority: 0.8,      // Ưu tiên như trang khóa học
            description: `Thông tin về ${MY_INFO.name} - ${MY_INFO.major} tại ${MY_INFO.company}`
        },
        {
            path: 'resource',   // Trang tài nguyên học tập miễn phí
            priority: 0.8,      // Ưu tiên như trang khóa học
            description: 'Tài nguyên học tập miễn phí cho cộng đồng lập trình viên'
        }
    ]

    // Tạo sitemap với thông tin chi tiết cho từng trang
    return routes.map((route) => ({
        url: `${baseUrl}/${route.path}`,          // URL đầy đủ của trang
        lastModified: new Date(),                 // Ngày cập nhật gần nhất
        changeFrequency: 'daily' as const,        // Tần suất thay đổi: hàng ngày
        priority: route.priority,                 // Mức độ ưu tiên của trang
        description: route.description           // Mô tả chi tiết về nội dung trang
    }))
}