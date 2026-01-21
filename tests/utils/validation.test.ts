import { describe, it, expect } from 'vitest';
import { validateEmail, validateAuthForm } from '../../src/utils/validation';

describe('validation', () => {
  describe('validateEmail', () => {
    it('should return true for valid email', () => {
      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('user.name@domain.co.uk')).toBe(true);
    });

    it('should return false for invalid email', () => {
      expect(validateEmail('invalid-email')).toBe(false);
      expect(validateEmail('@example.com')).toBe(false);
      expect(validateEmail('test@')).toBe(false);
      expect(validateEmail('')).toBe(false);
    });
  });

  describe('validateAuthForm', () => {
    const mockT = (key: string) => key;

    it('should validate correct form data', () => {
      const result = validateAuthForm('test@example.com', 'password123', mockT);
      expect(result.isValid).toBe(true);
      expect(Object.keys(result.errors).length).toBe(0);
    });

    it('should return error for empty email', () => {
      const result = validateAuthForm('', 'password123', mockT);
      expect(result.isValid).toBe(false);
      expect(result.errors.email).toBeDefined();
    });

    it('should return error for invalid email format', () => {
      const result = validateAuthForm('invalid-email', 'password123', mockT);
      expect(result.isValid).toBe(false);
      expect(result.errors.email).toBeDefined();
    });

    it('should return error for empty password', () => {
      const result = validateAuthForm('test@example.com', '', mockT);
      expect(result.isValid).toBe(false);
      expect(result.errors.password).toBeDefined();
    });

    it('should return error for short password', () => {
      const result = validateAuthForm('test@example.com', '12345', mockT);
      expect(result.isValid).toBe(false);
      expect(result.errors.password).toBeDefined();
    });

    it('should return multiple errors for invalid form', () => {
      const result = validateAuthForm('invalid', '123', mockT);
      expect(result.isValid).toBe(false);
      expect(result.errors.email).toBeDefined();
      expect(result.errors.password).toBeDefined();
    });
  });
});
