import { post, get, patch, del } from '../config';
import { DOMAIN_BE } from '../const';
import { getCookieToken } from '@/lib/cookie';
import {
    CreateExerciseDto,
    UpdateExerciseDto,
    ExerciseResponse,
    CreateSubmissionDto,
    SubmissionResponse,
    CreateUserSubmissionDto,
    UserSubmissionResponse
} from './exercise.dto';

// Exercise APIs
export async function createExercise(data: CreateExerciseDto): Promise<ExerciseResponse> {
    const token = await getCookieToken();

    const response = await post<CreateExerciseDto, ExerciseResponse>(
        `${DOMAIN_BE}/exercises`,
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    if (response.error) {
        return {
            success: false,
            message: response.error
        };
    }

    return response.data || {
        success: false,
        message: 'Invalid response format'
    };
}

export async function getAllExercises(page = 1, limit = 10): Promise<ExerciseResponse> {
    const response = await get<ExerciseResponse>(
        `${DOMAIN_BE}/exercises?page=${page}&limit=${limit}`,
        {
            cache: 'no-store'
        }
    );

    if (response.error) {
        return {
            success: false,
            message: response.error
        };
    }

    return response.data || {
        success: false,
        message: 'Invalid response format'
    };
}

export async function getExerciseById(id: number): Promise<ExerciseResponse> {
    const token = await getCookieToken();

    const response = await get<ExerciseResponse>(
        `${DOMAIN_BE}/exercises/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
            cache: 'no-store'
        }
    );

    if (response.error) {
        return {
            success: false,
            message: response.error
        };
    }

    return response.data || {
        success: false,
        message: 'Invalid response format'
    };
}

export async function updateExercise(id: number, data: UpdateExerciseDto): Promise<ExerciseResponse> {
    const token = await getCookieToken();

    const response = await patch<{data: UpdateExerciseDto}, ExerciseResponse>(
        `${DOMAIN_BE}/exercises/${id}`,
        {
            data
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    if (response.error) {
        return {
            success: false,
            message: response.error
        };
    }

    return response.data || {
        success: false,
        message: 'Invalid response format'
    };
}

export async function deleteExercise(id: number): Promise<ExerciseResponse> {
    const token = await getCookieToken();

    const response = await del<ExerciseResponse>(
        `${DOMAIN_BE}/exercises/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    if (response.error) {
        return {
            success: false,
            message: response.error
        };
    }

    return response.data || {
        success: false,
        message: 'Invalid response format'
    };
}



export async function createSubmission(data: CreateSubmissionDto): Promise<SubmissionResponse> {
    const token = await getCookieToken();
    
    const response = await post<CreateSubmissionDto, SubmissionResponse>(
        `${DOMAIN_BE}/submissions-code`,
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
            cache: 'no-store'
        }
    );

    if (response.error) {
        return {
            success: false,
            message: response.error
        };
    }

    return response.data || {
        success: false,
        message: 'Invalid response format'
    };
}

export async function createUserSubmission(data: CreateUserSubmissionDto): Promise<UserSubmissionResponse> {
    const token = await getCookieToken();

    const response = await post<CreateUserSubmissionDto, UserSubmissionResponse>(
        `${DOMAIN_BE}/user-submissions`,
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    if (response.error) {
        return {
            success: false,
            message: response.error
        };
    }

    return response.data || {
        success: false,
        message: 'Invalid response format'
    };
}
