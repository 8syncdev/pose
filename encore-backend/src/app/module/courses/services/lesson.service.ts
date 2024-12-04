import { CreateLessonDto, UpdateLessonDto, LessonResponse, LessonDto } from "../courses.dto";
import { lessonsTable } from "../courses.model";
import { db } from "../courses.db";
import { eq, sql } from "drizzle-orm";
import { getOffset, paginatedData, formatDateLocale } from "../../../../common/utility";
import { DataResponse } from "../../../../common/dto";
import validator from "validator";

const LessonService = {
    create: async (data: CreateLessonDto): Promise<LessonResponse> => {
        try {
            // Validate chapter_id
            if (!data.chapter_id || !Number.isInteger(data.chapter_id) || data.chapter_id <= 0) {
                return {
                    success: false,
                    message: "Chapter ID must be a positive integer"
                };
            }

            // Validate name
            if (!data.name || !validator.isLength(data.name, { min: 1, max: 255 })) {
                return {
                    success: false, 
                    message: "Name must be between 1 and 255 characters"
                };
            }
            data.name = validator.trim(data.name);

            // Validate description if provided
            if (data.description && !validator.isLength(data.description, { max: 65535 })) {
                return {
                    success: false,
                    message: "Description is too long"
                };
            }

            // Validate order
            if (!Number.isInteger(data.order) || data.order < 0) {
                return {
                    success: false,
                    message: "Order must be a non-negative integer"
                };
            }

            // Validate content if provided
            if (data.content && !validator.isLength(data.content, { max: 65535 })) {
                return {
                    success: false,
                    message: "Content is too long"
                };
            }

            // Validate video_url if provided
            if (data.video_url && !validator.isURL(data.video_url)) {
                return {
                    success: false,
                    message: "Invalid video URL"
                };
            }

            // Validate duration_minutes if provided
            if (data.duration_minutes !== undefined) {
                if (!Number.isInteger(data.duration_minutes) || data.duration_minutes < 0) {
                    return {
                        success: false,
                        message: "Duration minutes must be a non-negative integer"
                    };
                }
            }

            // Create insert data with defaults
            const insertData = {
                chapter_id: data.chapter_id,
                name: data.name,
                description: data.description?.trim() || null,
                order: data.order,
                content: data.content?.trim() || null,
                video_url: data.video_url?.trim() || null,
                duration_minutes: data.duration_minutes || null,
                is_free: data.is_free ?? false
            };

            const [lesson] = await db.insert(lessonsTable)
                .values(insertData)
                .returning();

            const lessonDto: LessonDto = {
                ...lesson,
                created_at: formatDateLocale(lesson.created_at),
                updated_at: formatDateLocale(lesson.updated_at),
                description: lesson.description || undefined,
                content: lesson.content || undefined,
                video_url: lesson.video_url || undefined,
                duration_minutes: lesson.duration_minutes || undefined,
                is_free: lesson.is_free ?? false,
            };
            return { success: true, result: lessonDto };
        } catch (error) {
            console.error("Failed to create lesson:", error);
            return { success: false, message: "Failed to create lesson" };
        }
    },

    update: async (id: number, data: UpdateLessonDto): Promise<LessonResponse> => {
        try {
            const updateData: UpdateLessonDto = { ...data };

            // Get existing lesson to compare values
            const [existingLesson] = await db
                .select()
                .from(lessonsTable)
                .where(eq(lessonsTable.id, id))
                .limit(1);

            if (!existingLesson) {
                return { success: false, message: "Lesson not found" };
            }

            // Only update if value is different from existing and not empty/zero
            if (updateData.chapter_id === 0 || updateData.chapter_id === existingLesson.chapter_id) {
                delete updateData.chapter_id;
            }

            if (!updateData.name || updateData.name === existingLesson.name) {
                delete updateData.name;
            }

            if (!updateData.description || updateData.description === existingLesson.description) {
                delete updateData.description;
            }

            if (updateData.order === 0 || updateData.order === existingLesson.order) {
                delete updateData.order;
            }

            if (!updateData.content || updateData.content === existingLesson.content) {
                delete updateData.content;
            }

            if (!updateData.video_url || updateData.video_url === existingLesson.video_url) {
                delete updateData.video_url;
            }

            if (updateData.duration_minutes === 0 || updateData.duration_minutes === existingLesson.duration_minutes) {
                delete updateData.duration_minutes;
            }

            if (updateData.is_free === existingLesson.is_free) {
                delete updateData.is_free;
            }

            // If no valid updates, return early
            if (Object.keys(updateData).length === 0) {
                return {
                    success: false,
                    message: "No valid update data provided"
                };
            }

            // Validate remaining fields
            if (updateData.chapter_id && (!Number.isInteger(updateData.chapter_id) || updateData.chapter_id <= 0)) {
                return {
                    success: false,
                    message: "Chapter ID must be a positive integer"
                };
            }

            if (updateData.name && !validator.isLength(updateData.name, { min: 1, max: 255 })) {
                return {
                    success: false,
                    message: "Name must be between 1 and 255 characters"
                };
            }

            if (updateData.description && !validator.isLength(updateData.description, { min: 0, max: 2000 })) {
                return {
                    success: false,
                    message: "Description is too long"
                };
            }

            if (updateData.order && (!Number.isFinite(updateData.order) || updateData.order < 0)) {
                return {
                    success: false,
                    message: "Order must be a non-negative number"
                };
            }

            if (updateData.content && !validator.isLength(updateData.content, { min: 0, max: 65535 })) {
                return {
                    success: false,
                    message: "Content is too long"
                };
            }

            if (updateData.video_url && !validator.isURL(updateData.video_url)) {
                return {
                    success: false,
                    message: "Invalid video URL"
                };
            }

            if (updateData.duration_minutes && (!Number.isFinite(updateData.duration_minutes) || updateData.duration_minutes < 0)) {
                return {
                    success: false,
                    message: "Duration minutes must be a non-negative number"
                };
            }

            // Convert numeric fields to integers
            if (updateData.order) {
                updateData.order = Math.floor(updateData.order);
            }
            if (updateData.duration_minutes) {
                updateData.duration_minutes = Math.floor(updateData.duration_minutes);
            }

            const [updatedLesson] = await db
                .update(lessonsTable)
                .set(updateData)
                .where(eq(lessonsTable.id, id))
                .returning();

            const lessonDto: LessonDto = {
                ...updatedLesson,
                created_at: formatDateLocale(updatedLesson.created_at),
                updated_at: formatDateLocale(updatedLesson.updated_at),
                description: updatedLesson.description || undefined,
                content: updatedLesson.content || undefined,
                video_url: updatedLesson.video_url || undefined,
                duration_minutes: updatedLesson.duration_minutes || undefined,
                is_free: updatedLesson.is_free ?? false,
            };
            return { success: true, result: lessonDto };
        } catch (error) {
            console.error("Failed to update lesson:", error);
            return { success: false, message: "Failed to update lesson" };
        }
    },

    delete: async (id: number): Promise<LessonResponse> => {
        try {
            const [deletedLesson] = await db
                .delete(lessonsTable)
                .where(eq(lessonsTable.id, id))
                .returning();

            if (!deletedLesson) {
                return { success: false, message: "Lesson not found" };
            }

            const lessonDto: LessonDto = {
                ...deletedLesson,
                created_at: formatDateLocale(deletedLesson.created_at),
                updated_at: formatDateLocale(deletedLesson.updated_at),
                description: deletedLesson.description || undefined,
                content: deletedLesson.content || undefined,
                video_url: deletedLesson.video_url || undefined,
                duration_minutes: deletedLesson.duration_minutes || undefined,
                is_free: deletedLesson.is_free ?? false,
            };

            return { success: true, result: lessonDto };
        } catch (error) {
            console.error("Failed to delete lesson:", error);
            return { success: false, message: "Failed to delete lesson" };
        }
    },

    findOne: async (id: number, allowAccessAllFields: boolean = false): Promise<LessonResponse> => {
        try {
            const lesson = await db
                .select()
                .from(lessonsTable)
                .where(eq(lessonsTable.id, id))
                .limit(1);

            if (!lesson || lesson.length === 0) {
                return { success: false, message: "Lesson not found" };
            }

            const lessonDto: LessonDto = {
                ...lesson[0],
                created_at: formatDateLocale(lesson[0].created_at),
                updated_at: formatDateLocale(lesson[0].updated_at),
                description: (lesson[0].is_free || allowAccessAllFields) ? lesson[0].description || undefined : undefined,
                content: (lesson[0].is_free || allowAccessAllFields) ? lesson[0].content || undefined : undefined,
                video_url: (lesson[0].is_free || allowAccessAllFields) ? lesson[0].video_url || undefined : undefined,
                duration_minutes: lesson[0].duration_minutes || undefined,
                is_free: lesson[0].is_free ?? false,
            };

            return { success: true, result: lessonDto };
        } catch (error) {
            console.error("Failed to get lesson:", error);
            return { success: false, message: "Failed to get lesson" };
        }
    },

    find: async (page: number = 1, limit: number = 10, allowAccessAllFields: boolean = false): Promise<LessonResponse> => {
        try {
            const offset = getOffset(page, limit);
            const lessons = await db
                .select()
                .from(lessonsTable)
                .limit(limit)
                .offset(offset)
                .orderBy(lessonsTable.id);
            const [{ count }] = await db
                .select({ count: sql`count(*)`.mapWith(Number) })
                .from(lessonsTable);

            const pagination = paginatedData({ size: limit, page, count });

            const lessonDtos: LessonDto[] = lessons.map(lesson => ({
                ...lesson,
                created_at: formatDateLocale(lesson.created_at),
                updated_at: formatDateLocale(lesson.updated_at),
                description: (lesson.is_free || allowAccessAllFields) ? lesson.description || undefined : undefined,
                content: (lesson.is_free || allowAccessAllFields) ? lesson.content || undefined : undefined,
                video_url: (lesson.is_free || allowAccessAllFields) ? lesson.video_url || undefined : undefined,
                duration_minutes: lesson.duration_minutes || undefined,
                is_free: lesson.is_free ?? false,
            }));

            return { success: true, result: lessonDtos, pagination };
        } catch (error) {
            console.error("Failed to get lessons:", error);
            return { success: false, message: "Failed to get lessons" };
        }
    },

    findByChapter: async (chapterId: number, page: number = 1, limit: number = 10, allowAccessAllFields: boolean = false): Promise<LessonResponse> => {
        try {
            const offset = getOffset(page, limit);
            const lessons = await db
                .select()
                .from(lessonsTable)
                .where(eq(lessonsTable.chapter_id, chapterId))
                .limit(limit)
                .offset(offset)
            
            const [{ count }] = await db
                .select({ count: sql`count(*)`.mapWith(Number) })
                .from(lessonsTable)
                .where(eq(lessonsTable.chapter_id, chapterId));

            const pagination = paginatedData({ size: limit, page, count });

            const lessonDtos: LessonDto[] = lessons.map(lesson => ({
                ...lesson,
                created_at: formatDateLocale(lesson.created_at),
                updated_at: formatDateLocale(lesson.updated_at),
                description: (lesson.is_free || allowAccessAllFields) ? lesson.description || undefined : undefined,
                content: (lesson.is_free || allowAccessAllFields) ? lesson.content || undefined : undefined,
                video_url: (lesson.is_free || allowAccessAllFields) ? lesson.video_url || undefined : undefined,
                duration_minutes: lesson.duration_minutes || undefined,
                is_free: lesson.is_free ?? false,
            }));

            return { success: true, result: lessonDtos, pagination };
        } catch (error) {
            console.error("Failed to get lessons by chapter:", error);
            return { success: false, message: "Failed to get lessons by chapter" };
        }
    },

    trackProgress: async (userId: number, lessonId: number): Promise<DataResponse> => {
        // Implement lesson progress tracking logic here
        // This might involve creating a new table for user progress and updating it
        return { success: true, message: "Lesson progress tracked successfully" };
    },
};

export default LessonService;