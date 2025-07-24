// APIError.ts
export class ApiError extends Error {
	statusCode: number;
	data: null;
	success: boolean;
	errors: any[];
	constructor(
		statusCode: number,
		message = "Something went wrong",
		errors: any[] = [],
		stack = ""
	) {
		super(message);
		this.statusCode = statusCode;
		this.data = null;
		this.message = message;
		this.success = false;
		this.errors = errors;

		if (stack) {
			this.stack = stack;
		} else {
			(Error as any).captureStackTrace(this, this.constructor);
		}
	}
}

