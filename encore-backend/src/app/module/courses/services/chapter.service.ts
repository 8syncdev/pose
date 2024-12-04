import { CreateChapterDto, UpdateChapterDto, ChapterResponse, ChapterDto, LessonDto } from "../courses.dto";
import { chaptersTable, lessonsTable, Chapter } from "../courses.model";
import { db } from "../courses.db";
import { eq, sql } from "drizzle-orm";
import { getOffset, paginatedData, formatDateLocale } from "../../../../common/utility";
import validator from "validator";

const ChapterService = {
    create: async (data: CreateChapterDto): Promise<ChapterResponse> => {
        try {
            // Validate required fields
            if (!validator.isLength(data.name, { min: 1, max: 255 })) {
                return {
                    success: false,
                    message: "Name must be between 1 and 255 characters"
                };
            }

            // Validate course_id exists and is positive
            if (!data.course_id || data.course_id <= 0) {
                return {
                    success: false,
                    message: "Valid course_id is required"
                };
            }

            // Validate order is non-negative
            if (data.order < 0) {
                return {
                    success: false,
                    message: "Order cannot be negative"
                };
            }

            // Validate duration_minutes if provided
            if (data.duration_minutes !== undefined && data.duration_minutes < 0) {
                return {
                    success: false,
                    message: "Duration minutes cannot be negative"
                };
            }

            // Convert order and duration_minutes to integers
            const chapterData = {
                ...data,
                order: Math.floor(data.order),
                duration_minutes: data.duration_minutes ? Math.floor(data.duration_minutes) : undefined
            };

            const [chapter] = await db.insert(chaptersTable).values(chapterData).returning();

            const chapterDto: ChapterDto = {
                ...chapter,
                created_at: formatDateLocale(chapter.created_at),
                updated_at: formatDateLocale(chapter.updated_at),
                description: chapter.description || undefined,
                duration_minutes: chapter.duration_minutes || undefined,
            };
            return { success: true, result: chapterDto };
        } catch (error) {
            console.error("Failed to create chapter:", error);
            return { success: false, message: "Failed to create chapter" };
        }
    },

    update: async (id: number, data: UpdateChapterDto): Promise<ChapterResponse> => {
        try {
            const updateData: UpdateChapterDto = { ...data };

            // Validate name if provided and not empty string
            if (updateData.name !== undefined && updateData.name !== "") {
                if (!validator.isLength(updateData.name, { min: 1, max: 255 })) {
                    return {
                        success: false,
                        message: "Name must be between 1 and 255 characters"
                    };
                }
            } else {
                delete updateData.name;
            }

            // Validate course_id if provided and not 0
            if (updateData.course_id !== undefined && updateData.course_id !== 0) {
                if (!Number.isInteger(updateData.course_id) || updateData.course_id <= 0) {
                    return {
                        success: false,
                        message: "Course ID must be a positive integer"
                    };
                }
            } else {
                delete updateData.course_id;
            }

            // Validate order if provided and not 0
            if (updateData.order !== undefined && updateData.order !== 0) {
                if (!Number.isFinite(updateData.order) || updateData.order < 0) {
                    return {
                        success: false,
                        message: "Order must be a non-negative number"
                    };
                }
                updateData.order = Math.floor(updateData.order);
            } else {
                delete updateData.order;
            }

            // Validate duration_minutes if provided and not 0
            if (updateData.duration_minutes !== undefined && updateData.duration_minutes !== 0) {
                if (!Number.isFinite(updateData.duration_minutes) || updateData.duration_minutes < 0) {
                    return {
                        success: false,
                        message: "Duration minutes must be a non-negative number"
                    };
                }
                updateData.duration_minutes = Math.floor(updateData.duration_minutes);
            } else {
                delete updateData.duration_minutes;
            }

            // Validate description if provided and not empty string or null
            if (updateData.description !== undefined && updateData.description !== "" && updateData.description !== null) {
                if (!validator.isLength(updateData.description, { min: 0, max: 65535 })) {
                    return {
                        success: false,
                        message: "Description is too long"
                    };
                }
            } else {
                delete updateData.description;
            }

            // If no valid updates, return early
            if (Object.keys(updateData).length === 0) {
                return {
                    success: false,
                    message: "No valid update data provided"
                };
            }

            const [updatedChapter] = await db
                .update(chaptersTable)
                .set(updateData)
                .where(eq(chaptersTable.id, id))
                .returning();

            if (!updatedChapter) {
                return { success: false, message: "Chapter not found" };
            }

            const chapterDto: ChapterDto = {
                ...updatedChapter,
                created_at: formatDateLocale(updatedChapter.created_at),
                updated_at: formatDateLocale(updatedChapter.updated_at),
                description: updatedChapter.description || undefined,
                duration_minutes: updatedChapter.duration_minutes || undefined,
            };
            return { success: true, result: chapterDto };
        } catch (error) {
            console.error("Failed to update chapter:", error);
            return { success: false, message: "Failed to update chapter" };
        }
    },

    delete: async (id: number): Promise<ChapterResponse> => {
        try {
            // Delete associated lessons first
            await db
                .delete(lessonsTable)
                .where(eq(lessonsTable.chapter_id, id));

            // Then delete the chapter
            const [deletedChapter] = await db
                .delete(chaptersTable)
                .where(eq(chaptersTable.id, id))
                .returning();

            if (!deletedChapter) {
                return { success: false, message: "Chapter not found" };
            }

            return { success: true, message: "Chapter and associated lessons deleted successfully" };
        } catch (error) {
            console.error("Failed to delete chapter:", error);
            return { success: false, message: "Failed to delete chapter" };
        }
    },

    findOne: async (chapterId: number): Promise<ChapterResponse> => {
        try {
            const chapters = await db.select().from(chaptersTable).where(eq(chaptersTable.id, chapterId)).limit(1);

            if (!chapters.length) {
                return { success: false, message: "Chapter not found" };
            }

            const chapterDto: ChapterDto = {
                ...chapters[0],
                created_at: formatDateLocale(chapters[0].created_at),
                updated_at: formatDateLocale(chapters[0].updated_at),
                description: chapters[0].description || undefined,
                duration_minutes: chapters[0].duration_minutes || undefined
            };

            return { success: true, result: chapterDto };
        } catch (error) {
            return { success: false, message: "Failed to get chapter" };
        }
    },

    find: async (page: number = 1, limit: number = 10): Promise<ChapterResponse> => {
        try {
            const offset = getOffset(page, limit);
            const chapters = await db
                .select()
                .from(chaptersTable)
                .limit(limit)
                .offset(offset)
                .orderBy(chaptersTable.id);

            const [{ count }] = await db
                .select({ count: sql`count(*)`.mapWith(Number) })
                .from(chaptersTable);

            const pagination = paginatedData({ size: limit, page, count });

            const chapterDtos: ChapterDto[] = chapters.map(chapter => ({
                ...chapter,
                created_at: formatDateLocale(chapter.created_at),
                updated_at: formatDateLocale(chapter.updated_at),
                description: chapter.description || undefined,
                duration_minutes: chapter.duration_minutes || undefined,
            }));

            return { success: true, result: chapterDtos, pagination };
        } catch (error) {
            console.error("Failed to get chapters:", error);
            return { success: false, message: "Failed to get chapters" };
        }
    },

    findByCourseId: async (courseId: number, page: number = 1, limit: number = 10): Promise<ChapterResponse> => {
        try {
            const offset = getOffset(page, limit);
            const chapters = await db
                .select()
                .from(chaptersTable)
                .where(eq(chaptersTable.course_id, courseId))
                .limit(limit)
                .offset(offset);

            const [{ count }] = await db
                .select({ count: sql`count(*)`.mapWith(Number) })
                .from(chaptersTable)
                .where(eq(chaptersTable.course_id, courseId));

            const pagination = paginatedData({ size: limit, page, count });

            const chapterDtos: ChapterDto[] = chapters.map(chapter => ({
                ...chapter,
                created_at: formatDateLocale(chapter.created_at),
                updated_at: formatDateLocale(chapter.updated_at),
                description: chapter.description || undefined,
                duration_minutes: chapter.duration_minutes || undefined,
            }));

            return { success: true, result: chapterDtos, pagination };
        } catch (error) {
            console.error("Failed to get chapters by course:", error);
            return { success: false, message: "Failed to get chapters" };
        }
    },

    findWithLessons: async (chapterId: number): Promise<ChapterResponse> => {
        try {
            const chapters = await db
                .select()
                .from(chaptersTable)
                .where(eq(chaptersTable.id, chapterId))
                .limit(1);

            if (!chapters.length) {
                return { success: false, message: "Chapter not found" };
            }

            const lessons = await db
                .select()
                .from(lessonsTable)
                .where(eq(lessonsTable.chapter_id, chapterId))
                .orderBy(lessonsTable.order);

            const lessonDtos: LessonDto[] = lessons.map(lesson => ({
                ...lesson,
                created_at: formatDateLocale(lesson.created_at),
                updated_at: formatDateLocale(lesson.updated_at),
                description: lesson.description || undefined,
                content: lesson.content || undefined,
                video_url: lesson.video_url || undefined,
                duration_minutes: lesson.duration_minutes || undefined,
                is_free: lesson.is_free ?? false // Set default value to false if null
            }));

            const chapterDto: ChapterDto & { lessons?: LessonDto[] } = {
                ...chapters[0],
                created_at: formatDateLocale(chapters[0].created_at),
                updated_at: formatDateLocale(chapters[0].updated_at),
                description: chapters[0].description || undefined,
                duration_minutes: chapters[0].duration_minutes || undefined,
                lessons: lessonDtos
            };

            return { success: true, result: chapterDto };
        } catch (error) {
            console.error("Failed to get chapter with lessons:", error);
            return { success: false, message: "Failed to get chapter details" };
        }
    }
};

export default ChapterService;