import { 
  createErrorResponse, 
  createSuccessResponse, 
  handleError, 
  validateEmail, 
  validateRequiredFields,
  ErrorCode 
} from '@/lib/errors';

describe('Error Utilities', () => {
  describe('createErrorResponse', () => {
    it('should create a standardized error response', () => {
      const error = createErrorResponse(ErrorCode.VALIDATION_ERROR, 'Test error');
      
      expect(error.success).toBe(false);
      expect(error.error).toBe(ErrorCode.VALIDATION_ERROR);
      expect(error.message).toBe('Test error');
      expect(error.statusCode).toBe(400);
    });

    it('should include details when provided', () => {
      const error = createErrorResponse(ErrorCode.VALIDATION_ERROR, 'Test error', { field: 'email' });
      
      expect(error.details).toEqual({ field: 'email' });
    });
  });

  describe('createSuccessResponse', () => {
    it('should create a standardized success response', () => {
      const response = createSuccessResponse({ data: 'test' });
      
      expect(response.success).toBe(true);
      expect(response.data).toEqual({ data: 'test' });
      expect(response.timestamp).toBeDefined();
    });
  });

  describe('validateEmail', () => {
    it('should validate correct email addresses', () => {
      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('user.name@domain.co.uk')).toBe(true);
    });

    it('should reject invalid email addresses', () => {
      expect(validateEmail('invalid')).toBe(false);
      expect(validateEmail('@example.com')).toBe(false);
      expect(validateEmail('test@')).toBe(false);
    });
  });

  describe('validateRequiredFields', () => {
    it('should validate all required fields are present', () => {
      const data = { name: 'John', email: 'john@example.com', message: 'Hello' };
      const result = validateRequiredFields(data, ['name', 'email', 'message']);
      
      expect(result.isValid).toBe(true);
      expect(result.missingFields).toEqual([]);
    });

    it('should detect missing fields', () => {
      const data: { name?: string; email?: string; message?: string } = { name: 'John', email: '' };
      const result = validateRequiredFields(data, ['name', 'email', 'message']);
      
      expect(result.isValid).toBe(false);
      expect(result.missingFields).toContain('message');
    });
  });

  describe('handleError', () => {
    it('should handle Error instances', () => {
      const error = new Error('Test error');
      const result = handleError(error);
      
      expect(result.success).toBe(false);
      expect(result.message).toBe('Test error');
    });

    it('should handle unknown error types', () => {
      const result = handleError('String error');
      
      expect(result.success).toBe(false);
      expect(result.error).toBe(ErrorCode.SERVER_ERROR);
    });
  });
});

