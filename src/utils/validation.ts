export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export interface ValidationErrors {
  email?: string;
  password?: string;
}

export const validateAuthForm = (
  email: string,
  password: string,
  t: (key: string) => string
): { isValid: boolean; errors: ValidationErrors } => {
  const errors: ValidationErrors = {};
  
  if (!email) {
    errors.email = t('auth.email') + ' jest wymagany';
  } else if (!validateEmail(email)) {
    errors.email = 'Podaj prawidłowy adres email';
  }
  
  if (!password) {
    errors.password = t('auth.password') + ' jest wymagane';
  } else if (password.length < 6) {
    errors.password = 'Hasło musi mieć minimum 6 znaków';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
