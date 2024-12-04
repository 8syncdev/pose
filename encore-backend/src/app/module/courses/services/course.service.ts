import { db } from "../courses.db";
import { coursesTable, categoriesTable, courseCategoriesTable, chaptersTable, lessonsTable } from "../courses.model";
import { CreateCourseDto, UpdateCourseDto, CourseResponse, CourseDto, CourseWithCategoriesResponse } from "../courses.dto";
import { eq, sql } from "drizzle-orm";
import { getOffset, paginatedData, formatDateLocale } from "../../../../common/utility";
import validator from "validator";
import slugify from "slugify";
import { DataResponse } from "../../../../common/dto";

const CourseService = {
    create: async (data: CreateCourseDto): Promise<CourseResponse> => {
        try {
            // Validate required fields
            if (!validator.isLength(data.name, { min: 1, max: 255 })) {
                return {
                    success: false,
                    message: "Name must be between 1 and 255 characters"
                };
            }

            // Generate slug from name
            const slug = slugify(data.name, {
                lower: true,
                strict: true,
                trim: true
            });

            // Validate price is non-negative number
            if (data.price < 0) {
                return {
                    success: false,
                    message: "Price cannot be negative"
                };
            }

            // Validate discounted price if provided
            if (data.discounted_price !== undefined) {
                if (data.discounted_price < 0) {
                    return {
                        success: false,
                        message: "Discounted price cannot be negative"
                    };
                }
                if (data.discounted_price > data.price) {
                    return {
                        success: false,
                        message: "Discounted price cannot be greater than regular price"
                    };
                }
            }

            // Validate difficulty level
            if (data.difficulty_level && !['Beginner', 'Intermediate', 'Advanced'].includes(data.difficulty_level)) {
                return {
                    success: false,
                    message: "Invalid difficulty level. Must be Beginner, Intermediate or Advanced"
                };
            }

            // Validate duration hours if provided
            if (data.duration_hours !== undefined && data.duration_hours < 0) {
                return {
                    success: false,
                    message: "Duration hours cannot be negative"
                };
            }

            const courseData = {
                ...data,
                slug,
                price: data.price.toString(),
                discounted_price: data.discounted_price?.toString(),
                is_published: data.is_published ?? false
            };

            const [course] = await db.insert(coursesTable).values(courseData).returning();

            const courseDto: CourseDto = {
                ...course,
                price: parseFloat(course.price),
                discounted_price: course.discounted_price ? parseFloat(course.discounted_price) : undefined,
                created_at: formatDateLocale(course.created_at),
                updated_at: formatDateLocale(course.updated_at),
                description: course.description || undefined,
                img_url: course.img_url || undefined,
                difficulty_level: course.difficulty_level as 'Beginner' | 'Intermediate' | 'Advanced' | undefined,
                duration_hours: course.duration_hours || undefined,
                is_published: course.is_published ?? false,
                author_id: course.author_id || undefined
            };

            return { success: true, result: courseDto };

        } catch (error) {
            console.error("Failed to create course:", error);
            return { success: false, message: "Failed to create course" };
        }
    },

    update: async (id: number, data: UpdateCourseDto): Promise<CourseResponse> => {
        try {
            // Get existing course first
            const [existingCourse] = await db
                .select()
                .from(coursesTable)
                .where(eq(coursesTable.id, id));

            if (!existingCourse) {
                return { success: false, message: "Course not found" };
            }

            // Clean and prepare update data
            const updateData = {} as {
                name?: string;
                slug?: string;
                description?: string | null;
                img_url?: string | null;
                price?: string;
                discounted_price?: string | null;
                author_id?: number | null;
                difficulty_level?: string | null;
                duration_hours?: number | null;
                is_published?: boolean;
            };

            // Only update non-falsy values that are different from existing
            if (data.name && data.name !== existingCourse.name) {
                if (data.name.length > 255) {
                    return { success: false, message: "Name must be 255 characters or less" };
                }
                updateData.name = data.name.trim();
                const slug = slugify(data.name.trim(), { lower: true });
                if (slug.length > 255) {
                    return { success: false, message: "Generated slug is too long" };
                }
                updateData.slug = slug;
            }

            if (data.description) {
                updateData.description = data.description.trim();
            }

            if (data.img_url) {
                if (data.img_url.length > 255) {
                    return { success: false, message: "Image URL must be 255 characters or less" };
                }
                updateData.img_url = data.img_url.trim();
            }

            if (data.price && data.price > 0) {
                if (data.price < 0) {
                    return { success: false, message: "Price cannot be negative" };
                }
                updateData.price = data.price.toString();
            }

            if (data.discounted_price !== undefined) {
                if (data.discounted_price < 0) {
                    return { success: false, message: "Discounted price cannot be negative" };
                }
                if (data.price && data.discounted_price > data.price) {
                    return { success: false, message: "Discounted price cannot be greater than price" };
                }
                updateData.discounted_price = data.discounted_price === 0 ? '0' : data.discounted_price.toString();
            }

            if (data.difficulty_level) {
                if (!['Beginner', 'Intermediate', 'Advanced'].includes(data.difficulty_level)) {
                    return { success: false, message: "Invalid difficulty level. Must be Beginner, Intermediate or Advanced" };
                }
                updateData.difficulty_level = data.difficulty_level;
            }

            if (data.duration_hours && data.duration_hours > 0) {
                if (data.duration_hours < 0) {
                    return { success: false, message: "Duration hours cannot be negative" };
                }
                updateData.duration_hours = data.duration_hours;
            }

            if (data.author_id && data.author_id > 0) {
                updateData.author_id = data.author_id;
            }

            if (data.is_published !== undefined && data.is_published !== null) {
                updateData.is_published = data.is_published;
            }

            // Only update if there are changes
            if (Object.keys(updateData).length === 0) {
                const courseDto: CourseDto = {
                    ...existingCourse,
                    price: parseFloat(existingCourse.price),
                    discounted_price: existingCourse.discounted_price ? parseFloat(existingCourse.discounted_price) : undefined,
                    created_at: formatDateLocale(existingCourse.created_at),
                    updated_at: formatDateLocale(existingCourse.updated_at),
                    description: existingCourse.description || undefined,
                    img_url: existingCourse.img_url || undefined,
                    difficulty_level: existingCourse.difficulty_level as 'Beginner' | 'Intermediate' | 'Advanced' | undefined,
                    duration_hours: existingCourse.duration_hours || undefined,
                    is_published: existingCourse.is_published ?? false,
                    author_id: existingCourse.author_id || undefined
                };
                return { success: true, result: courseDto };
            }

            const [updatedCourse] = await db
                .update(coursesTable)
                .set(updateData)
                .where(eq(coursesTable.id, id))
                .returning();

            const courseDto: CourseDto = {
                ...updatedCourse,
                price: parseFloat(updatedCourse.price),
                discounted_price: updatedCourse.discounted_price ? parseFloat(updatedCourse.discounted_price) : undefined,
                created_at: formatDateLocale(updatedCourse.created_at),
                updated_at: formatDateLocale(updatedCourse.updated_at),
                description: updatedCourse.description || undefined,
                img_url: updatedCourse.img_url || undefined,
                difficulty_level: updatedCourse.difficulty_level as 'Beginner' | 'Intermediate' | 'Advanced' | undefined,
                duration_hours: updatedCourse.duration_hours || undefined,
                is_published: updatedCourse.is_published ?? false,
                author_id: updatedCourse.author_id || undefined
            };
            return { success: true, result: courseDto };
        } catch (error) {
            console.error("Failed to update course:", error);
            if (error instanceof Error && error.message.includes('unique')) {
                return { success: false, message: "Course slug must be unique" };
            }
            return { success: false, message: "Failed to update course" };
        }
    },

    delete: async (id: number): Promise<CourseResponse> => {
        try {
            const [deletedCourse] = await db
                .delete(coursesTable)
                .where(eq(coursesTable.id, id))
                .returning();
            if (!deletedCourse) {
                return { success: false, message: "Course not found" };
            }
            return { success: true, message: "Course deleted successfully" };
        } catch (error) {
            return { success: false, message: "Failed to delete course" };
        }
    },

    findOne: async (id: number): Promise<CourseResponse> => {
        try {
            const [course] = await db
                .select()
                .from(coursesTable)
                .where(eq(coursesTable.id, id));
            if (!course) {
                return { success: false, message: "Course not found" };
            }
            const courseDto: CourseDto = {
                ...course,
                price: parseFloat(course.price),
                discounted_price: course.discounted_price ? parseFloat(course.discounted_price) : undefined,
                created_at: formatDateLocale(course.created_at),
                updated_at: formatDateLocale(course.updated_at),
                description: course.description || undefined,
                img_url: course.img_url || undefined,
                difficulty_level: course.difficulty_level as 'Beginner' | 'Intermediate' | 'Advanced' | undefined,
                duration_hours: course.duration_hours || undefined,
                is_published: course.is_published ?? false,
                author_id: course.author_id || undefined
            };
            return { success: true, result: courseDto };
        } catch (error) {
            return { success: false, message: "Failed to get course" };
        }
    },

    find: async (page: number, limit: number): Promise<CourseResponse> => {
        try {
            const offset = getOffset(page, limit);
            const courses = await db
                .select()
                .from(coursesTable)
                .limit(limit)
                .offset(offset);
            const [{ count }] = await db
                .select({ count: sql`count(*)`.mapWith(Number) })
                .from(coursesTable);
            const pagination = paginatedData({ size: limit, page, count });
            const courseDtos: CourseDto[] = courses.map(course => ({
                ...course,
                price: parseFloat(course.price),
                discounted_price: course.discounted_price ? parseFloat(course.discounted_price) : undefined,
                created_at: formatDateLocale(course.created_at),
                updated_at: formatDateLocale(course.updated_at),
                description: course.description || undefined,
                img_url: course.img_url || undefined,
                difficulty_level: course.difficulty_level as 'Beginner' | 'Intermediate' | 'Advanced' | undefined,
                duration_hours: course.duration_hours || undefined,
                is_published: course.is_published ?? false,
                author_id: course.author_id || undefined
            }));
            return { success: true, result: courseDtos, pagination };
        } catch (error) {
            return { success: false, message: "Failed to get courses" };
        }
    },

    findWithCategories: async (page: number, limit: number): Promise<CourseWithCategoriesResponse> => {
        try {
            const offset = getOffset(page, limit);
            const coursesWithCategories = await db
                .select({
                    course: coursesTable,
                    categories: sql<string[]>`array_agg(${categoriesTable.name})`
                })
                .from(coursesTable)
                .leftJoin(courseCategoriesTable, eq(coursesTable.id, courseCategoriesTable.course_id))
                .leftJoin(categoriesTable, eq(courseCategoriesTable.category_id, categoriesTable.id))
                .groupBy(coursesTable.id)
                .limit(limit)
                .offset(offset);

            const [{ count }] = await db
                .select({ count: sql`count(distinct ${coursesTable.id})`.mapWith(Number) })
                .from(coursesTable);
            const pagination = paginatedData({ size: limit, page, count });

            const result = coursesWithCategories.map(({ course, categories }) => ({
                course: {
                    ...course,
                    price: parseFloat(course.price),
                    discounted_price: course.discounted_price ? parseFloat(course.discounted_price) : undefined,
                    created_at: formatDateLocale(course.created_at),
                    updated_at: formatDateLocale(course.updated_at),
                    description: course.description || undefined,
                    img_url: course.img_url || undefined,
                    difficulty_level: course.difficulty_level as 'Beginner' | 'Intermediate' | 'Advanced' | undefined,
                    duration_hours: course.duration_hours || undefined,
                    is_published: course.is_published ?? false,
                    author_id: course.author_id || undefined
                },
                categories: categories.filter(Boolean),
            }));

            return { success: true, result, pagination };
        } catch (error) {
            return { success: false, message: "Failed to get courses with categories" };
        }
    },

    checkCourseIsFree: async (courseId: number): Promise<DataResponse> => {
        try {
            const course = await db
                .select()
                .from(coursesTable)
                .where(eq(coursesTable.id, courseId))
                .limit(1);

            if (!course || course.length === 0) {
                return { success: false, message: "Course not found" };
            }

            const isFree = parseFloat(course[0].price) === 0 ||
                (course[0].discounted_price && parseFloat(course[0].discounted_price) === 0);

            return {
                success: true,
                message: `isFree: ${isFree}`,
                result: isFree
            };
        } catch (error) {
            return { success: false, message: "Failed to check if course is free" };
        }
    },

};

export default CourseService;