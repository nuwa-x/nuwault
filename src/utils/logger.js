/**
 * @fileoverview Conditional Logger Utility
 * Environment-aware logging system that automatically disables logs in production
 * while providing comprehensive debugging capabilities in development
 * @author NuwaX
 */

/**
 * Logger class with environment-aware conditional logging
 * Automatically detects development/production environment and adjusts logging behavior
 */
export class Logger {
  constructor() {
    // Detect if we're in development mode
    this.isDevelopment = this.detectDevelopment();
  }
  
  /**
   * Multi-environment development detection
   * @returns {boolean} True if running in development environment
   */
  detectDevelopment() {
    if (import.meta.env?.PROD === true) {
      return false;
    }
    
    if (typeof window === 'undefined') {
      return (
        import.meta.env?.DEV === true ||
        process.env.NODE_ENV === 'development' ||
        process.env.NODE_ENV !== 'production'
      );
    }
    
    return (
      import.meta.env?.DEV === true ||
      window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1' ||
      window.location.protocol === 'file:' ||
      window.location.port === '5173' ||
      window.location.port === '4173'
    );
  }
  
  /**
   * Standard logging (development only)
   * @param {...any} args - Arguments to log
   */
  log(...args) {
    if (this.isDevelopment) {
      console.log(...args);
    }
  }
  
  /**
   * Information logging (development only)
   * @param {...any} args - Arguments to log
   */
  info(...args) {
    if (this.isDevelopment) {
      console.info(...args);
    }
  }
  
  /**
   * Warning logging (development only)
   * @param {...any} args - Arguments to log
   */
  warn(...args) {
    if (this.isDevelopment) {
      console.warn(...args);
    }
  }
  
  /**
   * Error logging (always enabled for production debugging)
   * @param {...any} args - Arguments to log
   */
  error(...args) {
    console.error(...args);
  }
  
  /**
   * Debug logging (development only)
   * @param {...any} args - Arguments to log
   */
  debug(...args) {
    if (this.isDevelopment) {
      console.debug(...args);
    }
  }
  
  /**
   * Group logging with fallback support
   * @param {string} label - Group label
   */
  group(label) {
    if (this.isDevelopment && console.group) {
      console.group(label);
    }
  }
  
  /**
   * End group logging with fallback support
   */
  groupEnd() {
    if (this.isDevelopment && console.groupEnd) {
      console.groupEnd();
    }
  }
  
  /**
   * Table logging with fallback support
   * @param {any} data - Data to display in table format
   */
  table(data) {
    if (this.isDevelopment && console.table) {
      console.table(data);
    }
  }
}

/**
 * Singleton logger instance for global use
 */
export const logger = new Logger();

export default logger; 