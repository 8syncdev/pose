import { db } from "../exercises.db";
import { exercisesTable, submissionsTable, userSubmissionsTable } from "../exercises.model";
import { CreateExerciseDto, UpdateExerciseDto, ExerciseResponse, ExerciseDto, CreateSubmissionDto, SubmissionResponse, CreateUserSubmissionDto, UserSubmissionResponse, SubmissionDto, EvalResult } from "../exercises.dto";
import { eq, sql } from "drizzle-orm";
import { getOffset, paginatedData, formatDateLocale } from "../../../../common/utility";
import validator from "validator";
import { API_URL_EVAL_CODE, post } from "../../../../dev/external_apis";

const ExerciseService = {
    create: async (data: CreateExerciseDto): Promise<ExerciseResponse> => {
        try {
            // Validate required fields
            if (!validator.isLength(data.name || '', { min: 1, max: 255 })) {
                return {
                    success: false,
                    message: "Name must be between 1 and 255 characters"
                };
            }

            // Validate points range
            if ((data.points || 0) < 0 || (data.points || 0) > 100) {
                return {
                    success: false,
                    message: "Points must be between 0 and 100"
                };
            }

            // Validate level if provided
            if (data.level && !['Easy', 'Medium', 'Hard'].includes(data.level)) {
                return {
                    success: false,
                    message: "Invalid level. Must be Easy, Medium or Hard"
                };
            }

            // Validate param_style
            if (data.param_style && !['args', 'list'].includes(data.param_style)) {
                return {
                    success: false,
                    message: "Invalid param_style. Must be args or list"
                };
            }

            const exerciseData = {
                lesson_id: data.lesson_id || 0,
                category_id: data.category_id || 0,
                name: data.name || '',
                level: data.level || 'Easy',
                content: data.content || '',
                solution: data.solution || '',
                points: data.points || 0,
                function_name: data.function_name || '',
                param_style: data.param_style || 'args',
                time_limit: data.time_limit?.toString() || '0.0',
                memory_limit: data.memory_limit?.toString() || '0.0',
                test_cases: data.test_cases || '',
                content_visibility: data.content_visibility || 'public',
                solution_visibility: data.solution_visibility || 'public'
            };

            const [exercise] = await db.insert(exercisesTable).values(exerciseData).returning();

            const exerciseDto: ExerciseDto = {
                ...exercise,
                points: exercise.points || 0,
                lesson_id: exercise.lesson_id || 0,
                category_id: exercise.category_id || 0,
                level: exercise.level as 'Easy' | 'Medium' | 'Hard',
                content: exercise.content || '',
                solution: exercise.solution || '',
                test_cases: exercise.test_cases || '',
                time_limit: exercise.time_limit ? parseFloat(exercise.time_limit) : 0.0,
                memory_limit: exercise.memory_limit ? parseFloat(exercise.memory_limit) : 0.0,
                function_name: exercise.function_name || '',
                param_style: exercise.param_style as 'args' | 'list',
                content_visibility: exercise.content_visibility as 'public' | 'premium' | 'enterprise',
                solution_visibility: exercise.solution_visibility as 'public' | 'premium' | 'enterprise',
                created_at: formatDateLocale(exercise.created_at),
                updated_at: formatDateLocale(exercise.updated_at)
            };

            return { success: true, result: exerciseDto };

        } catch (error) {
            console.error("Failed to create exercise:", error);
            return { success: false, message: "Failed to create exercise" };
        }
    },

    update: async (id: number, data: UpdateExerciseDto): Promise<ExerciseResponse> => {
        try {
            const [existingExercise] = await db
                .select()
                .from(exercisesTable)
                .where(eq(exercisesTable.id, id));

            if (!existingExercise) {
                return { success: false, message: "Exercise not found" };
            }

            // Only update fields that are different from existing values and not empty/default
            const updateData: UpdateExerciseDto = {};

            if (data.name !== undefined && data.name.trim() !== '' && data.name !== existingExercise.name) {
                updateData.name = data.name;
            }

            if (data.lesson_id !== undefined && data.lesson_id > 0 && data.lesson_id !== existingExercise.lesson_id) {
                updateData.lesson_id = data.lesson_id;
            }

            if (data.category_id !== undefined && data.category_id > 0 && data.category_id !== existingExercise.category_id) {
                updateData.category_id = data.category_id;
            }

            if (data.level !== undefined && ['Easy', 'Medium', 'Hard'].includes(data.level) && data.level !== existingExercise.level) {
                updateData.level = data.level;
            }

            if (data.content !== undefined && data.content.trim() !== '' && data.content !== existingExercise.content) {
                updateData.content = data.content;
            }

            if (data.solution !== undefined && data.solution.trim() !== '' && data.solution !== existingExercise.solution) {
                updateData.solution = data.solution;
            }

            if (data.points !== undefined && data.points > 0 && data.points !== existingExercise.points) {
                updateData.points = data.points;
            }

            if (data.function_name !== undefined && data.function_name.trim() !== '' && data.function_name !== existingExercise.function_name) {
                updateData.function_name = data.function_name;
            }

            if (data.param_style !== undefined && ['args', 'list'].includes(data.param_style) && data.param_style !== existingExercise.param_style) {
                updateData.param_style = data.param_style;
            }

            if (data.time_limit !== undefined && data.time_limit > 0 && data.time_limit !== parseFloat(existingExercise.time_limit || '0.0')) {
                updateData.time_limit = data.time_limit;
            }

            if (data.memory_limit !== undefined && data.memory_limit > 0 && data.memory_limit !== parseFloat(existingExercise.memory_limit || '0.0')) {
                updateData.memory_limit = data.memory_limit;
            }

            if (data.test_cases !== undefined && data.test_cases.trim() !== '' && data.test_cases !== existingExercise.test_cases) {
                updateData.test_cases = data.test_cases;
            }

            if (data.content_visibility !== undefined && 
                ['public', 'premium', 'enterprise'].includes(data.content_visibility) && 
                data.content_visibility !== existingExercise.content_visibility) {
                updateData.content_visibility = data.content_visibility;
            }

            if (data.solution_visibility !== undefined && 
                ['public', 'premium', 'enterprise'].includes(data.solution_visibility) && 
                data.solution_visibility !== existingExercise.solution_visibility) {
                updateData.solution_visibility = data.solution_visibility;
            }

            // If no fields to update
            if (Object.keys(updateData).length === 0) {
                const exerciseDto: ExerciseDto = {
                    ...existingExercise,
                    points: existingExercise.points || 0,
                    lesson_id: existingExercise.lesson_id || 0,
                    category_id: existingExercise.category_id || 0,
                    level: existingExercise.level ? (existingExercise.level as 'Easy' | 'Medium' | 'Hard') : 'Easy',
                    content: existingExercise.content || '',
                    solution: existingExercise.solution || '',
                    test_cases: existingExercise.test_cases || '',
                    time_limit: existingExercise.time_limit ? parseFloat(existingExercise.time_limit) : 0.0,
                    memory_limit: existingExercise.memory_limit ? parseFloat(existingExercise.memory_limit) : 0.0,
                    function_name: existingExercise.function_name || '',
                    param_style: existingExercise.param_style as 'args' | 'list',
                    content_visibility: existingExercise.content_visibility as 'public' | 'premium' | 'enterprise',
                    solution_visibility: existingExercise.solution_visibility as 'public' | 'premium' | 'enterprise',
                    created_at: formatDateLocale(existingExercise.created_at),
                    updated_at: formatDateLocale(existingExercise.updated_at)
                };
                return { success: true, result: exerciseDto };
            }

            const [updatedExercise] = await db
                .update(exercisesTable)
                .set({
                    ...updateData,
                    time_limit: updateData.time_limit?.toString(),
                    memory_limit: updateData.memory_limit?.toString()
                })
                .where(eq(exercisesTable.id, id))
                .returning();

            const exerciseDto: ExerciseDto = {
                ...updatedExercise,
                points: updatedExercise.points || 0,
                lesson_id: updatedExercise.lesson_id || 0,
                category_id: updatedExercise.category_id || 0,
                level: updatedExercise.level ? (updatedExercise.level as 'Easy' | 'Medium' | 'Hard') : 'Easy',
                content: updatedExercise.content || '',
                solution: updatedExercise.solution || '',
                test_cases: updatedExercise.test_cases || '',
                time_limit: updatedExercise.time_limit ? parseFloat(updatedExercise.time_limit) : 0.0,
                memory_limit: updatedExercise.memory_limit ? parseFloat(updatedExercise.memory_limit) : 0.0,
                function_name: updatedExercise.function_name || '',
                param_style: updatedExercise.param_style as 'args' | 'list',
                content_visibility: updatedExercise.content_visibility as 'public' | 'premium' | 'enterprise',
                solution_visibility: updatedExercise.solution_visibility as 'public' | 'premium' | 'enterprise',
                created_at: formatDateLocale(updatedExercise.created_at),
                updated_at: formatDateLocale(updatedExercise.updated_at)
            };

            return { success: true, result: exerciseDto };

        } catch (error) {
            console.error("Failed to update exercise:", error);
            return { success: false, message: "Failed to update exercise" };
        }
    },

    delete: async (id: number): Promise<ExerciseResponse> => {
        try {
            const [deletedExercise] = await db
                .delete(exercisesTable)
                .where(eq(exercisesTable.id, id))
                .returning();

            if (!deletedExercise) {
                return { success: false, message: "Exercise not found" };
            }

            return { success: true, message: "Exercise deleted successfully" };
        } catch (error) {
            return { success: false, message: "Failed to delete exercise" };
        }
    },

    findOne: async (id: number, allowAccessAllFields: boolean = false): Promise<ExerciseResponse> => {
        try {
            const [exercise] = await db
                .select()
                .from(exercisesTable)
                .where(eq(exercisesTable.id, id));

            if (!exercise) {
                return { success: false, message: "Exercise not found" };
            }

            const exerciseDto: ExerciseDto = {
                ...exercise,
                points: exercise.points || 0,
                lesson_id: exercise.lesson_id || undefined,
                category_id: exercise.category_id || undefined,
                level: exercise.level ? (exercise.level as 'Easy' | 'Medium' | 'Hard') : undefined,
                content: (exercise.content_visibility === 'public' || allowAccessAllFields) ? exercise.content || undefined : undefined,
                solution: (exercise.solution_visibility === 'public' || allowAccessAllFields) ? exercise.solution || undefined : undefined,
                test_cases: exercise.test_cases || undefined,
                time_limit: exercise.time_limit ? parseFloat(exercise.time_limit) : 1.00,
                memory_limit: exercise.memory_limit ? parseFloat(exercise.memory_limit) : 0.50,
                function_name: exercise.function_name,
                param_style: exercise.param_style as 'args' | 'list',
                content_visibility: exercise.content_visibility as 'public' | 'premium' | 'enterprise',
                solution_visibility: exercise.solution_visibility as 'public' | 'premium' | 'enterprise',
                created_at: formatDateLocale(exercise.created_at),
                updated_at: formatDateLocale(exercise.updated_at)
            };

            return { success: true, result: exerciseDto };
        } catch (error) {
            return { success: false, message: "Failed to get exercise" };
        }
    },

    find: async (page: number = 1, limit: number = 10, allowAccessAllFields: boolean = false): Promise<ExerciseResponse> => {
        try {
            const offset = getOffset(page, limit);
            const exercises = await db
                .select()
                .from(exercisesTable)
                .limit(limit)
                .offset(offset);

            const [{ count }] = await db
                .select({ count: sql`count(*)`.mapWith(Number) })
                .from(exercisesTable);

            const pagination = paginatedData({ size: limit, page, count });

            const exerciseDtos: ExerciseDto[] = exercises.map(exercise => ({
                ...exercise,
                points: exercise.points || 0,
                lesson_id: exercise.lesson_id || undefined,
                category_id: exercise.category_id || undefined,
                level: exercise.level ? (exercise.level as 'Easy' | 'Medium' | 'Hard') : undefined,
                content: (exercise.content_visibility === 'public' || allowAccessAllFields) ? exercise.content || undefined : undefined,
                solution: (exercise.solution_visibility === 'public' || allowAccessAllFields) ? exercise.solution || undefined : undefined,
                test_cases: exercise.test_cases || undefined,
                time_limit: exercise.time_limit ? parseFloat(exercise.time_limit) : 1.00,
                memory_limit: exercise.memory_limit ? parseFloat(exercise.memory_limit) : 0.50,
                function_name: exercise.function_name,
                param_style: exercise.param_style as 'args' | 'list',
                content_visibility: exercise.content_visibility as 'public' | 'premium' | 'enterprise',
                solution_visibility: exercise.solution_visibility as 'public' | 'premium' | 'enterprise',
                created_at: formatDateLocale(exercise.created_at),
                updated_at: formatDateLocale(exercise.updated_at)
            }));

            return { success: true, result: exerciseDtos, pagination };
        } catch (error) {
            return { success: false, message: "Failed to get exercises" };
        }
    },

    createSubmission: async (data: CreateSubmissionDto): Promise<SubmissionResponse> => {
        try {
            // Get exercise details to get test cases
            const [exercise] = await db
                .select()
                .from(exercisesTable)
                .where(eq(exercisesTable.id, data.exercise_id));

            if (!exercise) {
                return { success: false, message: "Exercise not found" };
            }

            // Call grader API to evaluate code
            const evalResult = await post<EvalResult>(API_URL_EVAL_CODE, '/grader/eval?eval_type=func', {
                code: data.code,
                test_cases: JSON.parse(exercise.test_cases || '[]'),
                param_style: exercise.param_style,
                time_limit: exercise.time_limit,
                memory_limit: exercise.memory_limit
            });

            // Process evaluation results
            const submissionData = {
                exercise_id: data.exercise_id,
                code: data.code,
                total_tests: evalResult.summary.total,
                passed_tests: evalResult.summary.passed,
                grade: evalResult.summary.score.toString(),
                status: evalResult.summary.error ? 'failed' : 'completed',
                error_message: evalResult.summary.error || undefined,
                max_execution_time: Math.max(...evalResult.tests.map(t => t.execution_time)).toString(),
                max_memory_used: Math.max(...evalResult.tests.map(t => parseFloat(t.memory_used))).toString()
            } as const;

            let submissionDto: SubmissionDto;

            // Only save to database if user_id is provided
            if (data.user_id) {
                const [submission] = await db.insert(submissionsTable).values({
                    ...submissionData,
                    user_id: data.user_id
                }).returning();

                submissionDto = {
                    ...submission,
                    total_tests: submission.total_tests || 0,
                    passed_tests: submission.passed_tests || 0,
                    grade: submission.grade ? parseFloat(submission.grade) : undefined,
                    max_execution_time: submission.max_execution_time ? parseFloat(submission.max_execution_time) : undefined,
                    max_memory_used: submission.max_memory_used ? parseFloat(submission.max_memory_used) : undefined,
                    error_message: submission.error_message || undefined,
                    status: submission.status as 'pending' | 'completed' | 'failed',
                    created_at: formatDateLocale(submission.created_at),
                    updated_at: formatDateLocale(submission.updated_at)
                };
            } else {
                // Return evaluation results without saving
                const now = new Date();
                submissionDto = {
                    ...submissionData,
                    id: undefined,
                    user_id: undefined,
                    grade: parseFloat(submissionData.grade),
                    max_execution_time: parseFloat(submissionData.max_execution_time),
                    max_memory_used: parseFloat(submissionData.max_memory_used),
                    created_at: formatDateLocale(now),
                    updated_at: formatDateLocale(now)
                };
            }

            return { success: true, result: { ...submissionDto, test_details: evalResult.test_details } };
        } catch (error) {
            console.error("Failed to create submission:", error);
            return { success: false, message: "Failed to create submission" };
        }
    },

    createUserSubmission: async (data: CreateUserSubmissionDto): Promise<UserSubmissionResponse> => {
        try {
            const [userSubmission] = await db.insert(userSubmissionsTable).values(data).returning();

            const userSubmissionDto = {
                ...userSubmission,
                status: (userSubmission.status || 'pending') as 'pending' | 'graded' | 'failed',
                created_at: formatDateLocale(userSubmission.created_at),
                updated_at: formatDateLocale(userSubmission.updated_at)
            };

            return { success: true, result: userSubmissionDto };
        } catch (error) {
            console.error("Failed to create user submission:", error);
            return { success: false, message: "Failed to create user submission" };
        }
    }
};

export default ExerciseService;
