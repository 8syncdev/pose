import { db } from "../courses.db";
import { categoriesTable, Category } from "../courses.model";
import { CreateCategoryDto, UpdateCategoryDto, CategoryResponse, CategoryDto } from "../courses.dto";
import { eq, sql } from "drizzle-orm";
import { getOffset, paginatedData, formatDateLocale } from "../../../../common/utility";
import slugify from "slugify";

const CategoryService = {
    create: async (data: CreateCategoryDto): Promise<CategoryResponse> => {
        try {
            // Validate required fields
            if (!data.name || !data.name.trim()) {
                return { success: false, message: "Name is required" };
            }

            // Validate field lengths based on model constraints
            if (data.name.length > 100) {
                return { success: false, message: "Name must be 100 characters or less" };
            }

            const slug = slugify(data.name.trim(), { lower: true });
            if (slug.length > 100) {
                return { success: false, message: "Generated slug is too long" };
            }

            const [category] = await db.insert(categoriesTable).values({
                name: data.name.trim(),
                slug,
                description: data.description?.trim() || null
            }).returning();

            const categoryDto: CategoryDto = {
                ...category,
                created_at: formatDateLocale(category.created_at),
                updated_at: formatDateLocale(category.updated_at),
                description: category.description || undefined,
            };
            return { success: true, result: categoryDto };
        } catch (error) {
            // Check for unique constraint violation on slug
            if (error instanceof Error && error.message.includes('unique')) {
                return { success: false, message: "Category slug must be unique" };
            }
            return { success: false, message: "Failed to create category" };
        }
    },

    update: async (id: number, data: UpdateCategoryDto): Promise<CategoryResponse> => {
        try {
            // Get existing category first
            const [existingCategory] = await db
                .select()
                .from(categoriesTable)
                .where(eq(categoriesTable.id, id));

            if (!existingCategory) {
                return { success: false, message: "Category not found" };
            }

            // Clean and prepare update data
            const updateData = {} as {
                name?: string;
                slug?: string;
                description?: string | null;
            };

            // Only update if value is provided and different from existing
            if (data.name !== undefined && data.name !== "") {
                if (data.name === existingCategory.name) {
                    // Skip if same as existing
                } else {
                    if (!data.name.trim()) {
                        return { success: false, message: "Name cannot be empty" };
                    }
                    if (data.name.length > 100) {
                        return { success: false, message: "Name must be 100 characters or less" };
                    }
                    updateData.name = data.name.trim();
                    const slug = slugify(data.name.trim(), { lower: true });
                    if (slug.length > 100) {
                        return { success: false, message: "Generated slug is too long" };
                    }
                    updateData.slug = slug;
                }
            }

            if (data.description !== undefined && data.description !== "") {
                if (data.description === existingCategory.description) {
                    // Skip if same as existing
                } else {
                    updateData.description = data.description.trim() || null;
                }
            }

            // Only update if there are changes
            if (Object.keys(updateData).length === 0) {
                const categoryDto: CategoryDto = {
                    ...existingCategory,
                    created_at: formatDateLocale(existingCategory.created_at),
                    updated_at: formatDateLocale(existingCategory.updated_at),
                    description: existingCategory.description || undefined,
                };
                return { success: true, result: categoryDto };
            }

            const [updatedCategory] = await db
                .update(categoriesTable)
                .set(updateData)
                .where(eq(categoriesTable.id, id))
                .returning();

            const categoryDto: CategoryDto = {
                ...updatedCategory,
                created_at: formatDateLocale(updatedCategory.created_at),
                updated_at: formatDateLocale(updatedCategory.updated_at),
                description: updatedCategory.description || undefined,
            };
            return { success: true, result: categoryDto };
        } catch (error) {
            // Check for unique constraint violation on slug
            if (error instanceof Error && error.message.includes('unique')) {
                return { success: false, message: "Category slug must be unique" };
            }
            return { success: false, message: "Failed to update category" };
        }
    },

    delete: async (id: number): Promise<CategoryResponse> => {
        try {
            const [deletedCategory] = await db
                .delete(categoriesTable)
                .where(eq(categoriesTable.id, id))
                .returning();
            if (!deletedCategory) {
                return { success: false, message: "Category not found" };
            }
            return { success: true, message: "Category deleted successfully" };
        } catch (error) {
            return { success: false, message: "Failed to delete category" };
        }
    },

    findOne: async (id: number): Promise<CategoryResponse> => {
        try {
            const [category] = await db
                .select()
                .from(categoriesTable)
                .where(eq(categoriesTable.id, id));
            if (!category) {
                return { success: false, message: "Category not found" };
            }
            const categoryDto: CategoryDto = {
                ...category,
                created_at: formatDateLocale(category.created_at),
                updated_at: formatDateLocale(category.updated_at),
                description: category.description || undefined,
            };
            return { success: true, result: categoryDto };
        } catch (error) {
            return { success: false, message: "Failed to get category" };
        }
    },

    find: async (page: number, limit: number): Promise<CategoryResponse> => {
        try {
            const offset = getOffset(page, limit);
            const categories = await db
                .select()
                .from(categoriesTable)
                .limit(limit)
                .offset(offset);
            const [{ count }] = await db
                .select({ count: sql`count(*)`.mapWith(Number) })
                .from(categoriesTable);
            const pagination = paginatedData({ size: limit, page, count });
            const categoryDtos: CategoryDto[] = categories.map(category => ({
                ...category,
                created_at: formatDateLocale(category.created_at),
                updated_at: formatDateLocale(category.updated_at),
                description: category.description || undefined,
            }));
            return { success: true, result: categoryDtos, pagination };
        } catch (error) {
            return { success: false, message: "Failed to get categories" };
        }
    },
};

export default CategoryService;