import { DataResponse, Paginated } from "../../../common/dto";
import { Enrollment, Subscription, SubscriptionCourse } from "./enrollments.model";

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
