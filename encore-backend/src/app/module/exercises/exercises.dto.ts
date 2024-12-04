import { DataResponse, Paginated } from "../../../common/dto";
import { Exercise, Submission, UserSubmission } from "./exercises.model";

export type ExerciseDto = Exercise;
export type SubmissionDto = Submission;
export type UserSubmissionDto = UserSubmission;


export interface TestResult {
  status: string;
  test: string;
  execution_time: number;
  memory_used: string;
  error: string | null;
  result: any;
  printed_output: string | null;
  expected_output: string | null;
  expected_result: any;
}

export interface TestSummary {
  total: number;
  passed: number;
  score: number;
  error: string | null;
}

export interface TestDetail {
  test_number: number;
  description?: string;
  status: string;
  error?: string | null;
  input?: any;
  expected?: any;
  actual_result?: any;
  execution_time?: number;
  memory_used?: string;
}

export interface EvalResult {
  tests: TestResult[];
  summary: TestSummary;
  test_details: TestDetail[];
}


export type CreateExerciseDto = Omit<Exercise, 'id' | 'created_at' | 'updated_at'>;
export type UpdateExerciseDto = Partial<Omit<Exercise, 'id' | 'created_at' | 'updated_at'>>;

export type CreateSubmissionDto = Omit<Submission, 'id' | 'created_at' | 'updated_at'> & {
  user_id?: number;
};
export type UpdateSubmissionDto = Partial<Omit<Submission, 'id' | 'created_at' | 'updated_at'>>;

export type CreateUserSubmissionDto = Omit<UserSubmission, 'id' | 'created_at' | 'updated_at'>;
export type UpdateUserSubmissionDto = Partial<Omit<UserSubmission, 'id' | 'created_at' | 'updated_at'>>;

export type ExerciseResponse = Omit<DataResponse, 'result'> & {
  result?: ExerciseDto | ExerciseDto[];
  pagination?: Paginated;
}

export type SubmissionWithTestDetails = SubmissionDto & {
  test_details: TestDetail[];
}

export type SubmissionResponse = Omit<DataResponse, 'result'> & {
  result?: SubmissionWithTestDetails;
  pagination?: Paginated;
}

export type UserSubmissionResponse = Omit<DataResponse, 'result'> & {
  result?: UserSubmissionDto | UserSubmissionDto[];
  pagination?: Paginated;
}


