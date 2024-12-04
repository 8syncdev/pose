import { DataResponse, Paginated } from "../base.dto";

export interface Enrollment {
  id?: number;
  user_id: number;
  course_id: number;
  status: 'active' | 'trial' | 'expired' | 'cancelled' | 'pending';
  created_at: string;
  updated_at: string;
  expiration_date?: string;
}

export interface Subscription {
  id?: number;
  user_id: number;
  start_date: string;
  end_date: string;
  status: 'active' | 'expired' | 'cancelled' | 'pending';
  created_at: string;
  updated_at: string;
}

export interface SubscriptionCourse {
  id?: number;
  subscription_id: number;
  course_id: number;
}

export type EnrollmentDto = Enrollment;
export type SubscriptionDto = Subscription;
export type SubscriptionCourseDto = SubscriptionCourse;

export type CreateEnrollmentDto = Omit<Enrollment, 'id' | 'created_at' | 'updated_at'>;
export type UpdateEnrollmentDto = Partial<Omit<Enrollment, 'id' | 'created_at' | 'updated_at'>>;

export type CreateSubscriptionDto = Omit<Subscription, 'id' | 'created_at' | 'updated_at'>;
export type UpdateSubscriptionDto = Partial<Omit<Subscription, 'id' | 'created_at' | 'updated_at'>>;

export type CreateSubscriptionCourseDto = Omit<SubscriptionCourse, 'id'>;

export type EnrollmentResponse = Omit<DataResponse, 'result'> & {
  result?: EnrollmentDto | EnrollmentDto[];
  pagination?: Paginated;
}

export type SubscriptionResponse = Omit<DataResponse, 'result'> & {
  result?: SubscriptionDto | SubscriptionDto[];
  pagination?: Paginated;
}

export type SubscriptionCourseResponse = Omit<DataResponse, 'result'> & {
  result?: SubscriptionCourseDto | SubscriptionCourseDto[];
  pagination?: Paginated;
}
