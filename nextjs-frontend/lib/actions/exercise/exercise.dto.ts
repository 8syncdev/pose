import { DataResponse, Paginated } from '../base.dto';

export interface Exercise {
  id?: number;
  lesson_id?: number;
  category_id?: number;
  name: string;
  level?: 'Easy' | 'Medium' | 'Hard';
  content?: string;
  solution?: string;
  points: number;
  function_name: string;
  param_style: 'args' | 'list';
  time_limit: number;
  memory_limit: number;
  test_cases?: string; // JSON array of test cases with format: [{'input': '1, 2', 'expected': '3', 'description': 'Test description'}]
  content_visibility: 'public' | 'premium' | 'enterprise';
  solution_visibility: 'public' | 'premium' | 'enterprise';
  created_at: string;
  updated_at: string;
}

export interface Submission {
  id?: number;
  user_id?: number;
  exercise_id: number;
  code: string;
  grade?: number;
  status: 'pending' | 'completed' | 'failed';
  total_tests: number;
  passed_tests: number;
  max_execution_time?: number;
  max_memory_used?: number;
  error_message?: string;
  created_at: string;
  updated_at: string;
}

export interface UserSubmission {
  id?: number;
  user_id: number;
  submission_id: number;
  status?: 'pending' | 'graded' | 'failed';
  created_at: string;
  updated_at: string;
}

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
