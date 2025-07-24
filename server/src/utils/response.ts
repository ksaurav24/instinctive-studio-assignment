// packages/common/src/utils/response.ts

import { ApiResponse } from './ApiResponse.js'

export const successResponse = <T>(data: T, message = 'Success', code = 200): ApiResponse<T> => {
  return new ApiResponse({ success: true, message, data, code })
}

export const errorResponse = (message = 'Something went wrong', code = 500, errors: string[] = []): ApiResponse<null> => {
  return new ApiResponse({ success: false, message, code, errors })
}
