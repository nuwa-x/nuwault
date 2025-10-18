/**
 * @fileoverview Toast Notification System
 * Modern replacement for alert() with customizable types and animations
 * Supports success, error, warning, and info notifications with auto-dismiss
 * @author NuwaX
 */

/**
 * Toast notification types with semantic meanings
 */
const TOAST_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
};

/**
 * Toast system configuration
 */
const TOAST_CONFIG = {
  DURATION: 4000,
  MAX_TOASTS: 5,
  CONTAINER_ID: 'toast-container'
};

/**
 * Create toast container element if it doesn't exist
 * @returns {HTMLElement} Toast container element
 */
function createToastContainer() {
  let container = document.getElementById(TOAST_CONFIG.CONTAINER_ID);
  
  if (!container) {
    container = document.createElement('div');
    container.id = TOAST_CONFIG.CONTAINER_ID;
    container.className = 'fixed bottom-4 right-4 z-50 space-y-2 pointer-events-none';
    container.style.cssText = `
      position: fixed;
      bottom: 1rem;
      right: 1rem;
      z-index: 9999;
      display: flex;
      flex-direction: column-reverse;
      gap: 0.5rem;
      pointer-events: none;
      max-width: 400px;
    `;
    document.body.appendChild(container);
  }
  
  return container;
}

/**
 * Generate CSS styles for toast based on type
 * @param {string} type - Toast type
 * @returns {string} CSS style string
 */
function getToastStyles(type) {
  const baseStyles = `
    pointer-events: auto;
    padding: 1rem 1.25rem;
    border-radius: 0.5rem;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1.25rem;
    max-width: 100%;
    word-wrap: break-word;
    animation: slideIn 0.3s ease-out;
    transition: all 0.3s ease;
  `;

  const typeStyles = {
    [TOAST_TYPES.SUCCESS]: `
      background-color: #10b981;
      color: white;
      border-left: 4px solid #059669;
    `,
    [TOAST_TYPES.ERROR]: `
      background-color: #ef4444;
      color: white;
      border-left: 4px solid #dc2626;
    `,
    [TOAST_TYPES.WARNING]: `
      background-color: #f59e0b;
      color: white;
      border-left: 4px solid #d97706;
    `,
    [TOAST_TYPES.INFO]: `
      background-color: #3b82f6;
      color: white;
      border-left: 4px solid #2563eb;
    `
  };

  return baseStyles + (typeStyles[type] || typeStyles[TOAST_TYPES.INFO]);
}

/**
 * Get appropriate icon for toast type
 * @param {string} type - Toast type
 * @returns {string} Emoji icon
 */
function getToastIcon(type) {
  const icons = {
    [TOAST_TYPES.SUCCESS]: '✅',
    [TOAST_TYPES.ERROR]: '❌',
    [TOAST_TYPES.WARNING]: '⚠️',
    [TOAST_TYPES.INFO]: 'ℹ️'
  };
  
  return icons[type] || icons[TOAST_TYPES.INFO];
}

/**
 * Create and display toast notification
 * @param {string} message - Toast message content
 * @param {string} type - Toast type
 * @param {number} duration - Auto-dismiss duration in milliseconds
 * @returns {HTMLElement} Created toast element
 */
function createToast(message, type = TOAST_TYPES.INFO, duration = TOAST_CONFIG.DURATION) {
  const container = createToastContainer();
  
  const existingToasts = container.children;
  if (existingToasts.length >= TOAST_CONFIG.MAX_TOASTS) {
    existingToasts[0].remove();
  }
  
  const toast = document.createElement('div');
  toast.style.cssText = getToastStyles(type);
  
  const icon = document.createElement('span');
  icon.textContent = getToastIcon(type);
  icon.style.cssText = 'font-size: 1.125rem; flex-shrink: 0;';
  
  const messageEl = document.createElement('span');
  messageEl.textContent = message;
  messageEl.style.cssText = 'flex: 1; word-break: break-word;';
  
  const closeBtn = document.createElement('button');
  closeBtn.innerHTML = '×';
  closeBtn.style.cssText = `
    background: none;
    border: none;
    color: inherit;
    font-size: 1.25rem;
    font-weight: bold;
    cursor: pointer;
    padding: 0;
    margin-left: 0.5rem;
    opacity: 0.7;
    transition: opacity 0.2s;
    flex-shrink: 0;
  `;
  closeBtn.onmouseover = () => closeBtn.style.opacity = '1';
  closeBtn.onmouseout = () => closeBtn.style.opacity = '0.7';
  
  toast.appendChild(icon);
  toast.appendChild(messageEl);
  toast.appendChild(closeBtn);
  
  const style = document.createElement('style');
  if (!document.querySelector('#toast-animations')) {
    style.id = 'toast-animations';
    style.textContent = `
      @keyframes slideIn {
        from {
          transform: translateX(100%) translateY(20px);
          opacity: 0;
        }
        to {
          transform: translateX(0) translateY(0);
          opacity: 1;
        }
      }
      
      @keyframes slideOut {
        from {
          transform: translateX(0) translateY(0);
          opacity: 1;
        }
        to {
          transform: translateX(100%) translateY(20px);
          opacity: 0;
        }
      }
      
      .toast-exit {
        animation: slideOut 0.3s ease-in forwards;
      }
    `;
    document.head.appendChild(style);
  }
  
  const removeToast = () => {
    if (toast.parentNode) {
      toast.classList.add('toast-exit');
      setTimeout(() => {
        if (toast.parentNode) {
          toast.remove();
        }
      }, 300);
    }
  };
  
  closeBtn.onclick = removeToast;
  
  if (duration > 0) {
    setTimeout(removeToast, duration);
  }
  
  container.appendChild(toast);
  
  return toast;
}

/**
 * Toast notification API with typed methods
 */
export const toast = {
  /**
   * Show success toast
   * @param {string} message - Success message
   * @param {number} duration - Auto-dismiss duration
   * @returns {HTMLElement} Toast element
   */
  success: (message, duration) => createToast(message, TOAST_TYPES.SUCCESS, duration),
  
  /**
   * Show error toast
   * @param {string} message - Error message
   * @param {number} duration - Auto-dismiss duration
   * @returns {HTMLElement} Toast element
   */
  error: (message, duration) => createToast(message, TOAST_TYPES.ERROR, duration),
  
  /**
   * Show warning toast
   * @param {string} message - Warning message
   * @param {number} duration - Auto-dismiss duration
   * @returns {HTMLElement} Toast element
   */
  warning: (message, duration) => createToast(message, TOAST_TYPES.WARNING, duration),
  
  /**
   * Show info toast
   * @param {string} message - Info message
   * @param {number} duration - Auto-dismiss duration
   * @returns {HTMLElement} Toast element
   */
  info: (message, duration) => createToast(message, TOAST_TYPES.INFO, duration),
  
  /**
   * Show generic toast with custom type
   * @param {string} message - Toast message
   * @param {string} type - Toast type
   * @param {number} duration - Auto-dismiss duration
   * @returns {HTMLElement} Toast element
   */
  show: (message, type, duration) => createToast(message, type, duration),
  
  /**
   * Clear all active toasts
   */
  clear: () => {
    const container = document.getElementById(TOAST_CONFIG.CONTAINER_ID);
    if (container) {
      container.innerHTML = '';
    }
  }
};

export { TOAST_TYPES };
export default toast; 