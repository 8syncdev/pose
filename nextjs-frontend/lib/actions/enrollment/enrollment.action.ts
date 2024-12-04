'use server';

import { DOMAIN_BE } from '../const';
import { get, post, patch, del } from '../config';
import { getCookieToken } from '@/lib/cookie';
import { EnrollmentResponse, CreateEnrollmentDto, UpdateEnrollmentDto } from './enrollment.dto';

/**
 * Create a new enrollment
 */
export async function createEnrollment(data: CreateEnrollmentDto): Promise<EnrollmentResponse> {
  const token = await getCookieToken();

  const response = await post<CreateEnrollmentDto, EnrollmentResponse>(
    `${DOMAIN_BE}/enrollments`,
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

/**
 * Update an existing enrollment
 */
export async function updateEnrollment(
  id: number,
  data: UpdateEnrollmentDto
): Promise<EnrollmentResponse> {
  const token = await getCookieToken();

  const response = await patch<{data: UpdateEnrollmentDto}, EnrollmentResponse>(
    `${DOMAIN_BE}/enrollments/${id}`,
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

/**
 * Delete an enrollment
 */
export async function deleteEnrollment(id: number): Promise<EnrollmentResponse> {
  const token = await getCookieToken();

  const response = await del<EnrollmentResponse>(
    `${DOMAIN_BE}/enrollments/${id}`,
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

/**
 * Get enrollment by ID
 */
export async function getEnrollmentById(id: number): Promise<EnrollmentResponse> {
  const token = await getCookieToken();

  const response = await get<EnrollmentResponse>(
    `${DOMAIN_BE}/enrollments/${id}`,
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

/**
 * Get enrollments with pagination
 */
export async function getEnrollments(
  page: number = 1,
  limit: number = 10
): Promise<EnrollmentResponse> {
  const token = await getCookieToken();

  const response = await get<EnrollmentResponse>(
    `${DOMAIN_BE}/enrollments?page=${page}&limit=${limit}`,
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

/**
 * Get enrollments by user ID
 */
export async function getEnrollmentsByUserId(
  userId: number,
  page: number = 1,
  limit: number = 10
): Promise<EnrollmentResponse> {
  const token = await getCookieToken();

  const response = await get<EnrollmentResponse>(
    `${DOMAIN_BE}/users/${userId}/enrollments?page=${page}&limit=${limit}`,
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

/**
 * Get enrollments by course ID
 */
export async function getEnrollmentsByCourseId(
  courseId: number,
  page: number = 1,
  limit: number = 10
): Promise<EnrollmentResponse> {
  const token = await getCookieToken();

  const response = await get<EnrollmentResponse>(
    `${DOMAIN_BE}/courses/${courseId}/enrollments?page=${page}&limit=${limit}`,
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

/**
 * Check if user is enrolled in a course
 */
export async function checkEnrollmentInCourse(
  userId: number,
  courseId: number
): Promise<EnrollmentResponse> {
  const token = await getCookieToken();

  const response = await get<EnrollmentResponse>(
    `${DOMAIN_BE}/courses/${courseId}/users/${userId}/enrollment`,
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
