import React from 'react';
import { useTranslation } from 'react-i18next';

interface RegisterFormProps {
  email: string;
  password: string;
  firstName: string;
  onEmailChange: (email: string) => void;
  onPasswordChange: (password: string) => void;
  onFirstNameChange: (firstName: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  fieldErrors: { email?: string; password?: string };
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  email,
  password,
  firstName,
  onEmailChange,
  onPasswordChange,
  onFirstNameChange,
  onSubmit,
  loading,
  fieldErrors
}) => {
  const { t } = useTranslation();

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block text-gray-300 text-sm font-medium mb-2">
          {t('auth.firstNameOptional')}
        </label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => onFirstNameChange(e.target.value)}
          placeholder="Jan Kowalski"
          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-gray-300 text-sm font-medium mb-2">
          {t('auth.email')}
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          placeholder="twoj@email.com"
          className={`w-full px-4 py-2 bg-gray-800 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
            fieldErrors.email ? 'border-red-500' : 'border-gray-700'
          }`}
          required
        />
        {fieldErrors.email && (
          <p className="text-sm text-red-400 mt-1">{fieldErrors.email}</p>
        )}
      </div>

      <div>
        <label className="block text-gray-300 text-sm font-medium mb-2">
          {t('auth.password')}
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => onPasswordChange(e.target.value)}
          placeholder="••••••••"
          className={`w-full px-4 py-2 bg-gray-800 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
            fieldErrors.password ? 'border-red-500' : 'border-gray-700'
          }`}
          required
          minLength={6}
        />
        {fieldErrors.password && (
          <p className="text-sm text-red-400 mt-1">{fieldErrors.password}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-500 hover:bg-green-600 text-black py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {loading ? t('auth.registering') : t('auth.createAccount')}
      </button>
    </form>
  );
};

export default RegisterForm;
