"use client";

import { useCallback, useEffect, useMemo, useState, memo } from "react";
import { motion, useInView } from "framer-motion";
import { Search, Star, Sparkles, Tag } from "lucide-react";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";

import { Input } from "@/components/ui/input"; 
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SparklesText } from "@/components/ui/animation/text/sparkles-text";
import { GridPattern } from "@/components/ui/bg/grid-bg";
import { TimelineContent } from "@/components/ui/animation/scroll/framer-timeline";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { getCoursesWithCategories } from "@/lib/actions/course/course.action";
import type { CourseWithCategoriesResponse, CourseWithCategories } from "@/lib/actions/course/course.dto";
import { formatVNDCurrency } from "@/lib/currency.util";

// Custom debounce implementation
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Price Display Component
const PriceDisplay = memo(({ price, discounted_price }: { price: number, discounted_price?: number }) => {
  if (discounted_price === undefined || discounted_price === price) {
    return (
      <span className="text-glow font-bold text-lg">
        {formatVNDCurrency(price)}
      </span>
    );
  }

  if (discounted_price === 0) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-glow font-bold text-lg">MIỄN PHÍ</span>
        <Badge variant="destructive" className="animate-bounce">-100%</Badge>
      </div>
    );
  }

  const discount = Math.round(((price - discounted_price) / price) * 100);
  const isHighDiscount = discount >= 30;

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2">
        <span className={`text-glow font-bold text-lg ${isHighDiscount ? 'text-red-500' : ''}`}>
          {formatVNDCurrency(discounted_price)}
        </span>
        <Badge 
          variant={isHighDiscount ? "destructive" : "secondary"}
          className={isHighDiscount ? "animate-bounce" : ""}
        >
          -{discount}%
        </Badge>
      </div>
      <span className="text-sm text-muted-foreground line-through">
        {formatVNDCurrency(price)}
      </span>
    </div>
  );
});

PriceDisplay.displayName = 'PriceDisplay';

// Course Card Component
const CourseCard = memo(({ course, animNum, timelineRef }: { 
  course: CourseWithCategories, 
  animNum: number, 
  timelineRef: React.RefObject<HTMLDivElement> 
}) => {
  return (
    <TimelineContent 
      timelineRef={timelineRef}
      animationNum={animNum}
      effect="combined"
      duration={0.5}
      delay={0.2}
    >
      <Link href={`/course/${course.course.slug}?id=${course.course.id}`}>
        <Card className="h-full glass-effect overflow-hidden hover-scale">
          <CardHeader className="p-0 relative aspect-video">
            <Image
              src={course.course.img_url || '/placeholder.jpg'}
              alt={course.course.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover"
              priority
            />
            {course.course.difficulty_level && (
              <Badge className="absolute top-2 right-2 badge-gradient">
                {course.course.difficulty_level}
              </Badge>
            )}
          </CardHeader>
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-2 mb-3">
              {course.categories.map((category, idx) => (
                <Badge key={idx} variant="outline" className="text-xs">
                  {category}
                </Badge>
              ))}
            </div>
            <h3 className="text-lg md:text-xl font-semibold line-clamp-1 text-gradient">
              {course.course.name}
            </h3>
            <p className="text-muted-foreground mt-2 text-sm line-clamp-2">
              {course.course.description}
            </p>
            <div className="mt-4 flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-500" />
              <span className="text-sm">{course.course.duration_hours || 0} giờ học</span>
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0 flex justify-between items-center">
            <PriceDisplay 
              price={course.course.price} 
              discounted_price={course.course.discounted_price} 
            />
          </CardFooter>
        </Card>
      </Link>
    </TimelineContent>
  );
});

CourseCard.displayName = 'CourseCard';

// Custom Pagination Component
const CustomPagination = memo(({ currentPage, totalPages, onPageChange }: { 
  currentPage: number, 
  totalPages: number, 
  onPageChange: (page: number) => void 
}) => {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => onPageChange(currentPage - 1)}
            className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              onClick={() => onPageChange(page)}
              isActive={currentPage === page}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            onClick={() => onPageChange(currentPage + 1)}
            className={currentPage >= totalPages ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
});

CustomPagination.displayName = 'CustomPagination';

// Main component
export default function PageAllCourse() {
  const [courses, setCourses] = useState<CourseWithCategories[]>([]);
  const [allCourses, setAllCourses] = useState<CourseWithCategories[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [pagination, setPagination] = useState({ count: 0, pageSize: 9, totalPages: 1, current: 1 });
  const [loading, setLoading] = useState(false);
  const [isInitialFetch, setIsInitialFetch] = useState(true);
  const timelineRef = useRef<HTMLDivElement>(null);

  const fetchCourses = useCallback(async (page: number) => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await getCoursesWithCategories(page, pagination.pageSize);
      if (response.success && response.result && response.pagination) {
        setAllCourses(response.result);
        setCourses(response.result);
        setPagination({
          count: response.pagination.count,
          pageSize: response.pagination.pageSize,
          totalPages: response.pagination.totalPages,
          current: response.pagination.current
        });
      }
    } catch (error) {
      console.error('Error loading courses:', error);
    } finally {
      setLoading(false);
      setIsInitialFetch(false);
    }
  }, [loading, pagination.pageSize]);

  useEffect(() => {
    if (isInitialFetch) {
      fetchCourses(1);
    }
  }, [fetchCourses, isInitialFetch]);

  // Local search implementation
  const handleSearch = useMemo(
    () => debounce((value: string) => {
      setSearchQuery(value);
      if (!value.trim()) {
        setCourses(allCourses);
        return;
      }
      
      const searchResults = allCourses.filter(course => {
        const searchStr = value.toLowerCase();
        return (
          course.course.name.toLowerCase().includes(searchStr) ||
          (course.course.description?.toLowerCase().includes(searchStr)) ||
          course.categories.some(cat => cat.toLowerCase().includes(searchStr))
        );
      });
      
      setCourses(searchResults);
    }, 500),
    [allCourses]
  );

  return (
    <div className="min-h-screen relative backdrop-blur" ref={timelineRef}>
      <div className="container py-8 px-4 md:px-6 lg:px-8">
        <TimelineContent timelineRef={timelineRef} animationNum={0} effect="fade">
          <div className="text-center mb-12">
            <SparklesText text="Khám Phá Các Khóa Học" className="text-3xl md:text-4xl font-bold mb-4" />
            <p className="text-muted-foreground">Khám phá thế giới kiến thức với danh mục khóa học đa dạng của chúng tôi</p>
          </div>
        </TimelineContent>

        <TimelineContent timelineRef={timelineRef} animationNum={1} effect="fade">
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Tìm kiếm khóa học..."
                className="pl-10 glass-effect"
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
          </div>
        </TimelineContent>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <CourseCard 
              key={course.course.id} 
              course={course} 
              animNum={index + 2}
              timelineRef={timelineRef}
            />
          ))}
        </div>

        {pagination.totalPages > 1 && !searchQuery && (
          <TimelineContent timelineRef={timelineRef} animationNum={courses.length + 2} effect="fade">
            <div className="flex justify-center mt-8">
              <CustomPagination
                currentPage={pagination.current}
                totalPages={pagination.totalPages}
                onPageChange={(page) => fetchCourses(page)}
              />
            </div>
          </TimelineContent>
        )}

        {loading && (
          <div className="text-center mt-8">
            <Button variant="outline" disabled className="glass-effect">
              Đang tải khóa học...
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
