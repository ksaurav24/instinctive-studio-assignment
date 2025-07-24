// packages/common/src/utils/ApiResponse.ts

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class ApiResponse<T = any> {
  status: 'success' | 'error';
  message: string;
  data?: T;
  errors?: string[];
  code?: number;
  timestamp?: Date;

  constructor({
    success = true,
    message,
    data,
    errors,
    code,
  }: {
    success: boolean;
    message: string;
    data?: T;
    errors?: string[];
    code?: number; 
    timestamp?: Date;
  }) {
    this.status = success ? 'success' : 'error';
    this.message = message;
    this.code = code;
    if (success && data !== undefined) this.data = data;
    if (!success && errors) this.errors = errors;
    this.timestamp = new Date();
  }
}
