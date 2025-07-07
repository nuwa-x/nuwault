/**
 * @fileoverview Application Configuration Manager
 * Centralized configuration management for environment variables and application settings
 * @author NuwaX
 */

/**
 * Core application configuration
 */
export const APP_CONFIG = {
  name: import.meta.env.VITE_APP_NAME || 'Nuwault',
  version: import.meta.env.VITE_APP_VERSION || '0.0.0',
  environment: import.meta.env.VITE_NODE_ENV || 'development',
  mode: import.meta.env.MODE || 'development'
};

/**
 * Security configuration with defaults
 */
export const SECURITY_CONFIG = {
  minPasswordLength: parseInt(import.meta.env.VITE_MIN_PASSWORD_LENGTH) || 8,
  maxPasswordLength: parseInt(import.meta.env.VITE_MAX_PASSWORD_LENGTH) || 128,
  defaultPasswordLength: parseInt(import.meta.env.VITE_DEFAULT_PASSWORD_LENGTH) || 16,
  hashAlgorithm: import.meta.env.VITE_HASH_ALGORITHM || 'SHA-512',
  hashIterations: parseInt(import.meta.env.VITE_HASH_ITERATIONS) || 1000,
  appKey: import.meta.env.VITE_APP_KEY || 'nuwault-default-salt-key'
};

/**
 * User interface configuration
 */
export const UI_CONFIG = {
  defaultTheme: import.meta.env.VITE_DEFAULT_THEME || 'system'
};

/**
 * Progressive Web App configuration
 */
export const PWA_CONFIG = {
  enabled: import.meta.env.VITE_PWA_ENABLED !== 'false',
  shortName: import.meta.env.VITE_PWA_SHORT_NAME || 'Nuwault',
  themeColor: import.meta.env.VITE_PWA_THEME_COLOR || '#2ebba8'
};

/**
 * Feature flags for conditional functionality
 */
export const FEATURE_FLAGS = {
  enableDebugMode: import.meta.env.VITE_ENABLE_DEBUG_MODE === 'true',
  enablePasswordTests: import.meta.env.VITE_ENABLE_PASSWORD_TESTS === 'true'
};

/**
 * External social media links
 */
export const SOCIAL_LINKS = {
  github: import.meta.env.VITE_SOCIAL_GITHUB || 'https://github.com',
};

/**
 * Contact information
 */
export const CONTACT_INFO = {
  email: import.meta.env.VITE_CONTACT_MAIL || 'support@nuwault.com',
};

/**
 * Default password generation options
 */
export const DEFAULT_PASSWORD_OPTIONS = {
  includeUppercase: import.meta.env.VITE_DEFAULT_INCLUDE_UPPERCASE === 'true',
  includeLowercase: import.meta.env.VITE_DEFAULT_INCLUDE_LOWERCASE === 'true',
  includeNumbers: import.meta.env.VITE_DEFAULT_INCLUDE_NUMBERS === 'true',
  includeSymbols: import.meta.env.VITE_DEFAULT_INCLUDE_SYMBOLS === 'true'
};

/**
 * Keyword management behavior settings
 */
export const KEYWORD_MANAGEMENT_OPTIONS = {
  maskKeywords: import.meta.env.VITE_DEFAULT_MASK_KEYWORDS === 'true',
  autoGeneratePassword: import.meta.env.VITE_DEFAULT_AUTO_GENERATE_PASSWORD === 'true',
  maskPassword: import.meta.env.VITE_DEFAULT_MASK_PASSWORD === 'true'
};

/**
 * Character sets for password generation
 */
export const CHARACTER_SETS = {
  UPPERCASE: import.meta.env.VITE_CHARSET_UPPERCASE || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  LOWERCASE: import.meta.env.VITE_CHARSET_LOWERCASE || 'abcdefghijklmnopqrstuvwxyz',
  NUMBERS: import.meta.env.VITE_CHARSET_NUMBERS || '0123456789',
  SYMBOLS: import.meta.env.VITE_CHARSET_SYMBOLS || '!@#$%^&*()_+-=[]{}|;:,.<>?'
};

/**
 * Internationalization configuration
 */
export const I18N_CONFIG = {
  defaultLanguage: import.meta.env.VITE_DEFAULT_LANGUAGE || 'en',
  fallbackLanguage: import.meta.env.VITE_FALLBACK_LANGUAGE || 'en',
  enableLanguageDetection: import.meta.env.VITE_ENABLE_LANGUAGE_DETECTION !== 'false',
  storageKey: import.meta.env.VITE_I18N_STORAGE_KEY || 'nuwault-language'
};

/**
 * Check if application is running in development mode
 * @returns {boolean} True if in development mode
 */
export const isDevelopment = () => APP_CONFIG.environment === 'development' || APP_CONFIG.mode === 'development';

/**
 * Check if application is running in production mode
 * @returns {boolean} True if in production mode
 */
export const isProduction = () => APP_CONFIG.environment === 'production' || APP_CONFIG.mode === 'production';

/**
 * Development environment diagnostic logger
 * Outputs comprehensive configuration information to console during development
 */
export const logEnvironmentInfo = () => {
  if (isDevelopment()) {
    console.group('🔧 Environment Configuration');
    console.log('🚀 Current Mode:', import.meta.env.MODE);
    console.log('📁 Environment Files Priority:', [
      '.env.' + import.meta.env.MODE + '.local',
      '.env.local', 
      '.env.' + import.meta.env.MODE,
      '.env'
    ]);
    console.log('⚙️  App Config:', APP_CONFIG);
    console.log('🔒 Security Config:', SECURITY_CONFIG);
    console.log('🎨 UI Config:', UI_CONFIG);
    console.log('🎨 Default Theme from ENV:', import.meta.env.VITE_DEFAULT_THEME);
    console.log('📱 PWA Config:', PWA_CONFIG);
    console.log('🏴 Feature Flags:', FEATURE_FLAGS);
    console.log('🔤 Character Sets:', CHARACTER_SETS);
    console.log('🏷️ Keyword Management Options:', KEYWORD_MANAGEMENT_OPTIONS);
    
    if (FEATURE_FLAGS.enableDebugMode) {
      console.log('🔍 All Environment Variables:', import.meta.env);
    }
    console.groupEnd();
  }
};