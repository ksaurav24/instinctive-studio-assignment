/* eslint-disable @typescript-eslint/no-explicit-any */
// packages/common/src/utils/asyncHandler.ts
import { ApiResponse } from './ApiResponse.js'

export const asyncHandler =
  (fn: (req:any, res:any, next:any) => Promise<void>) =>
  (req:any, res:any, next:any) => {
    Promise.resolve(fn(req, res, next)).catch((error) => {
      const statusCode = error?.statusCode || 500
      const message = error?.message || 'Internal Server Error'
      const errors = error?.errors || ['An unexpected error occurred']

      const apiError = new ApiResponse({
        success: false,
        message,
        code: statusCode,
        errors,
        timestamp: new Date(),
      })

      res.status(statusCode).json(apiError)
    })
  }
