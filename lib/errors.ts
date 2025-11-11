/**
 * Error Handling Utilities
 * 
 * Standardized error handling and response formatting for API routes and components.
 */

export enum ErrorCode {
  // Client Errors (4xx)
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  NOT_FOUND = 'NOT_FOUND',
  RATE_LIMITED = 'RATE_LIMITED',
  BAD_REQUEST = 'BAD_REQUEST',
  
  // Server Errors (5xx)
  SERVER_ERROR = 'SERVER_ERROR',
  SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE',
  TIMEOUT = 'TIMEOUT',
  DATABASE_ERROR = 'DATABASE_ERROR',
  EXTERNAL_API_ERROR = 'EXTERNAL_API_ERROR',
}

export interface APIError {
  success: false;
  error: ErrorCode;
  message: string;
  code: string;
  timestamp: string;
  details?: Record<string, unknown>;
  statusCode: number;
}

export interface APIResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: APIError;
  timestamp: string;
}

/**
 * Get HTTP status code for error code
 */
export function getStatusCodeForError(errorCode: ErrorCode): number {
  const statusMap: Record<ErrorCode, number> = {
    [ErrorCode.VALIDATION_ERROR]: 400,
    [ErrorCode.UNAUTHORIZED]: 401,
    [ErrorCode.FORBIDDEN]: 403,
    [ErrorCode.NOT_FOUND]: 404,
    [ErrorCode.RATE_LIMITED]: 429,
    [ErrorCode.BAD_REQUEST]: 400,
    [ErrorCode.SERVER_ERROR]: 500,
    [ErrorCode.SERVICE_UNAVAILABLE]: 503,
    [ErrorCode.TIMEOUT]: 504,
    [ErrorCode.DATABASE_ERROR]: 500,
    [ErrorCode.EXTERNAL_API_ERROR]: 502,
  };
  
  return statusMap[errorCode] || 500;
}

/**
 * Create standardized API error response
 */
export function createErrorResponse(
  errorCode: ErrorCode,
  message: string,
  details?: Record<string, unknown>
): APIError {
  return {
    success: false,
    error: errorCode,
    message,
    code: errorCode,
    timestamp: new Date().toISOString(),
    details,
    statusCode: getStatusCodeForError(errorCode),
  };
}

/**
 * Create standardized API success response
 */
export function createSuccessResponse<T>(
  data: T,
  message?: string
): APIResponse<T> {
  return {
    success: true,
    data,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Handle and format errors from try-catch blocks
 */
export function handleError(error: unknown): APIError {
  // Handle known error types
  if (error instanceof Error) {
    // Check for specific error patterns
    if (error.message.includes('validation') || error.message.includes('invalid')) {
      return createErrorResponse(ErrorCode.VALIDATION_ERROR, error.message);
    }
    
    if (error.message.includes('not found') || error.message.includes('404')) {
      return createErrorResponse(ErrorCode.NOT_FOUND, error.message);
    }
    
    if (error.message.includes('unauthorized') || error.message.includes('401')) {
      return createErrorResponse(ErrorCode.UNAUTHORIZED, error.message);
    }
    
    if (error.message.includes('timeout') || error.message.includes('ETIMEDOUT')) {
      return createErrorResponse(ErrorCode.TIMEOUT, 'Request timeout');
    }
    
    if (error.message.includes('rate limit') || error.message.includes('429')) {
      return createErrorResponse(ErrorCode.RATE_LIMITED, 'Rate limit exceeded');
    }
    
    // For Error instances that don't match patterns, return the error message
    return createErrorResponse(
      ErrorCode.SERVER_ERROR,
      error.message,
      { originalError: error.message }
    );
  }
  
  // Default to server error for unknown error types
  return createErrorResponse(
    ErrorCode.SERVER_ERROR,
    'An unexpected error occurred',
    { originalError: String(error) }
  );
}

/**
 * Validate email format
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate required fields
 */
export function validateRequiredFields<T extends Record<string, unknown>>(
  data: T,
  requiredFields: (keyof T)[]
): { isValid: boolean; missingFields: string[] } {
  const missingFields: string[] = [];
  
  for (const field of requiredFields) {
    const value = data[field];
    if (!value || (typeof value === 'string' && value.trim() === '')) {
      missingFields.push(String(field));
    }
  }
  
  return {
    isValid: missingFields.length === 0,
    missingFields,
  };
}

