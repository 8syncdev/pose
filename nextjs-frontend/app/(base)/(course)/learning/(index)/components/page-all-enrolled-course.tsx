'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { getEnrollmentsByUserId } from '@/lib/actions/enrollment/enrollment.action';
import { getCourseById, checkCourseIsFree } from '@/lib/actions/course/course.action';
import type { EnrollmentDto, EnrollmentResponse } from '@/lib/actions/enrollment/enrollment.dto';
import type { CourseDto, CourseResponse } from '@/lib/actions/course/course.dto';
import { useAuth } from '@/hooks/use-auth';
import { DotPattern } from '@/components/ui/bg/dot-bg';
import { SparklesText } from '@/components/ui/animation/text/sparkles-text';
import Image from 'next/image';
import { urlImageCourse } from '@/constants/firebase/image-course';

interface EnrolledCourse extends EnrollmentDto {
    course?: CourseDto;
    isFree?: boolean;
}

const EnrollmentCard = ({ enrollment }: { enrollment: EnrolledCourse }) => {
    const getEnrollmentAction = () => {
        // If course is free, allow access regardless of enrollment status
        if (enrollment.isFree) {
            return {
                href: `/learning/${enrollment.id}`,
                label: 'Vào học',
                variant: 'default' as const,
                disabled: false
            };
        }

        switch (enrollment.status) {
            case 'active':
            case 'trial':
                return {
                    href: `/learning/${enrollment.id}`,
                    label: 'Tiếp tục học',
                    variant: 'default' as const,
                    disabled: false
                };
            case 'pending':
                return {
                    href: `/payment`,
                    label: 'Hoàn tất thanh toán',
                    variant: 'secondary' as const,
                    disabled: false
                };
            case 'cancelled':
                return {
                    href: '#',
                    label: 'Khóa học đã hủy',
                    variant: 'destructive' as const,
                    disabled: true
                };
            case 'expired':
                return {
                    href: '#',
                    label: 'Khóa học đã hết hạn',
                    variant: 'outline' as const,
                    disabled: true
                };
            default:
                return {
                    href: '#',
                    label: 'Không khả dụng',
                    variant: 'outline' as const,
                    disabled: true
                };
        }
    };

    const action = getEnrollmentAction();

    return (
        <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="p-0">
                <div className="relative h-48 w-full">
                    <Image
                        src={enrollment.course?.img_url || urlImageCourse['react-ts']}
                        alt={enrollment.course?.name || 'Hình ảnh khóa học'}
                        fill
                        className="object-cover"
                    />
                </div>
            </CardHeader>
            <CardContent className="p-6">
                <CardTitle className="text-xl mb-4 text-gradient-purple-blue">
                    {enrollment.course?.name || 'Đang tải...'}
                </CardTitle>
                <div className="space-y-2 text-sm text-muted-foreground">
                    <p>Trạng thái: {enrollment.isFree ? 'Miễn phí' : {
                        'active': 'Đang học',
                        'trial': 'Dùng thử',
                        'pending': 'Chờ thanh toán',
                        'cancelled': 'Đã hủy',
                        'expired': 'Hết hạn'
                    }[enrollment.status]}</p>
                    {!enrollment.isFree && enrollment.expiration_date && (
                        <p>Hết hạn: {new Date(enrollment.expiration_date).toLocaleDateString('vi-VN')}</p>
                    )}
                </div>
            </CardContent>
            <CardFooter className="p-6 pt-0">
                {!action.disabled ? (
                    <Link href={action.href} className="w-full">
                        <Button 
                            variant={action.variant}
                            className="w-full"
                        >
                            {action.label}
                        </Button>
                    </Link>
                ) : (
                    <Button 
                        variant={action.variant}
                        className="w-full"
                        disabled
                    >
                        {action.label}
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
};

const PageAllEnrolledCourse = () => {
    const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([]);
    const [loading, setLoading] = useState(true);
    const { user, loading: authLoading } = useAuth();

    useEffect(() => {
        const fetchEnrollments = async () => {
            if (!user?.userID) return;

            try {
                const enrollmentsResponse: EnrollmentResponse = await getEnrollmentsByUserId(parseInt(user.userID));
                
                if (enrollmentsResponse.success && Array.isArray(enrollmentsResponse.result)) {
                    const enrichedEnrollments = await Promise.all(
                        enrollmentsResponse.result.map(async (enrollment) => {
                            const courseResponse: CourseResponse = await getCourseById(enrollment.course_id);
                            const isFreeResponse = await checkCourseIsFree(enrollment.course_id);
                            
                            return {
                                ...enrollment,
                                course: courseResponse.success && !Array.isArray(courseResponse.result) 
                                    ? courseResponse.result 
                                    : undefined,
                                isFree: isFreeResponse.success && isFreeResponse.result
                            };
                        })
                    );

                    setEnrolledCourses(enrichedEnrollments);
                }
            } catch (error) {
                console.error('Lỗi khi tải danh sách khóa học:', error);
            } finally {
                setLoading(false);
            }
        };

        if (!authLoading) {
            fetchEnrollments();
        }
    }, [user?.userID, authLoading]);

    if (loading || authLoading) {
        return (
            <div className="container mx-auto py-20 min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="container mx-auto py-20 min-h-screen">
                <div className="text-center space-y-4">
                    <h2 className="text-2xl font-bold">Vui lòng đăng nhập</h2>
                    <p className="text-muted-foreground">Bạn cần đăng nhập để xem các khóa học đã đăng ký</p>
                    <Link href="/auth/login">
                        <Button variant="default" size="lg">
                            Đăng nhập ngay
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <section className="py-20 relative">
            <DotPattern
                className="absolute inset-0 -z-10 h-full w-full"
                width={32}
                height={32}
                cx={1}
                cy={1}
                cr={1}
            />

            <div className="container mx-auto">
                <div className="text-center space-y-6 mb-16">
                    <SparklesText
                        text="Khóa Học Của Tôi"
                        className="text-glow !text-4xl"
                    />
                    <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
                        Theo dõi tiến độ và tiếp tục học tập với các khóa học đã đăng ký
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {enrolledCourses.map((enrollment) => (
                        <EnrollmentCard key={enrollment.id} enrollment={enrollment} />
                    ))}
                </div>

                {enrolledCourses.length === 0 && (
                    <div className="text-center py-8">
                        <h3 className="text-xl font-semibold mb-2">Chưa có khóa học nào</h3>
                        <p className="text-muted-foreground mb-4">Hãy bắt đầu hành trình học tập ngay hôm nay!</p>
                        <Link href="/course">
                            <Button variant="default" size="lg">
                                Khám phá khóa học
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
};

export default PageAllEnrolledCourse;
