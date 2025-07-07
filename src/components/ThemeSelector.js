/**
 * Theme Selector Component
 * Provides a modern dropdown interface for switching between light, dark, and system themes.
 * Features animated transitions, system theme detection, and coordinated dropdown management.
 * 
 * @author NuwaX
 */
import { THEMES, setTheme, getStoredTheme, getSystemTheme } from '../utils/theme.js';
import { t } from '../utils/i18n.js';

/**
 * Global Dropdown Manager Class
 * Ensures only one dropdown is open at a time across all components
 */
class DropdownManager {
  constructor() {
    this.activeDropdowns = new Set();
  }
  
  register(dropdown, closeCallback) {
    this.activeDropdowns.add({ dropdown, closeCallback });
  }
  
  unregister(dropdown) {
    this.activeDropdowns.forEach(item => {
      if (item.dropdown === dropdown) {
        this.activeDropdowns.delete(item);
      }
    });
  }
  
  closeAll(except = null) {
    this.activeDropdowns.forEach(item => {
      if (item.dropdown !== except) {
        item.closeCallback();
      }
    });
  }
}

// Global instance to avoid conflicts with other components
window.dropdownManager = window.dropdownManager || new DropdownManager();
const dropdownManager = window.dropdownManager;

/**
 * Creates and returns the Theme Selector component
 * @returns {HTMLElement} The theme selector element
 */
export const ThemeSelector = () => {
  const currentTheme = getStoredTheme();
  
  /**
   * Get appropriate icon based on theme selection
   * For system theme, shows icon matching actual system preference
   * @param {string} theme - The theme identifier
   * @returns {string} SVG icon HTML string
   */
  const getThemeIcon = (theme) => {
    if (theme === THEMES.SYSTEM) {
      const systemTheme = getSystemTheme();
      theme = systemTheme;
    }
    
    switch (theme) {
      case THEMES.LIGHT:
        return `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
        </svg>`;
      case THEMES.DARK:
      default:
        return `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
        </svg>`;
    }
  };
  
  /**
   * Close dropdown with exit animation
   * @param {HTMLElement} dropdown - The dropdown element to close
   */
  const closeDropdown = (dropdown) => {
    if (!dropdown || dropdown.classList.contains('hidden')) return;
    
    dropdown.style.transition = 'all 0.15s ease-in';
    dropdown.style.opacity = '0';
    dropdown.style.transform = 'translateY(-10px) scale(0.95)';
    setTimeout(() => {
      dropdown.classList.add('hidden');
      dropdown.style.transition = '';
      dropdown.style.transform = '';
    }, 150);
  };
  
  // Create the theme selector HTML structure
  const html = `
    <div class="relative theme-selector-wrapper">
      <button id="theme-toggle" class="p-2.5 rounded-xl text-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer" aria-label="${t('common.themeSelector.title')}">
        ${getThemeIcon(currentTheme)}
      </button>
      
      <div id="theme-dropdown" class="hidden absolute right-0 mt-3 w-40 card-bg border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl backdrop-blur-sm z-50 overflow-hidden">
        <ul class="py-2">
          <li>
            <button data-theme="${THEMES.SYSTEM}" class="theme-option w-full px-4 py-3 text-left text-sm text-gray-800 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 cursor-pointer ${currentTheme === THEMES.SYSTEM ? 'active bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300' : ''}">
              <div class="flex items-center space-x-3">
                <div class="flex-shrink-0 w-5 h-5 flex items-center justify-center">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <div class="flex-1">
                  <span class="font-medium">${t('common.themeSelector.themes.system')}</span>
                </div>
                ${currentTheme === THEMES.SYSTEM ? '<div class="flex-shrink-0"><svg class="w-4 h-4 text-primary-600 dark:text-primary-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg></div>' : ''}
              </div>
            </button>
          </li>
          <li>
            <button data-theme="${THEMES.LIGHT}" class="theme-option w-full px-4 py-3 text-left text-sm text-gray-800 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 cursor-pointer ${currentTheme === THEMES.LIGHT ? 'active bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300' : ''}">
              <div class="flex items-center space-x-3">
                <div class="flex-shrink-0 w-5 h-5 flex items-center justify-center">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
                  </svg>
                </div>
                <div class="flex-1">
                  <span class="font-medium">${t('common.themeSelector.themes.light')}</span>
                </div>
                ${currentTheme === THEMES.LIGHT ? '<div class="flex-shrink-0"><svg class="w-4 h-4 text-primary-600 dark:text-primary-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg></div>' : ''}
              </div>
            </button>
          </li>
          <li>
            <button data-theme="${THEMES.DARK}" class="theme-option w-full px-4 py-3 text-left text-sm text-gray-800 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 cursor-pointer ${currentTheme === THEMES.DARK ? 'active bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300' : ''}">
              <div class="flex items-center space-x-3">
                <div class="flex-shrink-0 w-5 h-5 flex items-center justify-center">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
                  </svg>
                </div>
                <div class="flex-1">
                  <span class="font-medium">${t('common.themeSelector.themes.dark')}</span>
                </div>
                ${currentTheme === THEMES.DARK ? '<div class="flex-shrink-0"><svg class="w-4 h-4 text-primary-600 dark:text-primary-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg></div>' : ''}
              </div>
            </button>
          </li>
        </ul>
      </div>
    </div>
  `;
  
  const container = document.createElement('div');
  container.innerHTML = html;
  
  const wrapper = container.firstElementChild;
  const toggle = wrapper.querySelector('#theme-toggle');
  const dropdown = wrapper.querySelector('#theme-dropdown');
  const options = wrapper.querySelectorAll('.theme-option');
  
  dropdownManager.register(dropdown, () => closeDropdown(dropdown));
  
  /**
   * Update toggle button icon based on current theme
   * @param {string} theme - The theme to display icon for
   */
  const updateToggleIcon = (theme) => {
    toggle.innerHTML = getThemeIcon(theme);
  };
  
  /**
   * Update active state styling for theme options
   * Manages checkmarks and highlight styling
   * @param {string} selectedTheme - The currently selected theme
   */
  const updateActiveStates = (selectedTheme) => {
    options.forEach(option => {
      const theme = option.dataset.theme;
      const isActive = theme === selectedTheme;
      
      if (isActive) {
        option.classList.add('active', 'bg-primary-50', 'dark:bg-primary-900/20', 'text-primary-700', 'dark:text-primary-300');
        // Add checkmark indicator
        const checkmark = '<div class="flex-shrink-0"><svg class="w-4 h-4 text-primary-600 dark:text-primary-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg></div>';
        const flexDiv = option.querySelector('.flex.items-center');
        if (!flexDiv.querySelector('.flex-shrink-0:last-child svg')) {
          flexDiv.insertAdjacentHTML('beforeend', checkmark);
        }
      } else {
        option.classList.remove('active', 'bg-primary-50', 'dark:bg-primary-900/20', 'text-primary-700', 'dark:text-primary-300');
        // Remove checkmark indicator
        const checkmark = option.querySelector('.flex-shrink-0:last-child');
        if (checkmark && checkmark.querySelector('svg')) {
          checkmark.remove();
        }
      }
    });
  };
  
  /**
   * Handle clicks outside the dropdown
   * @param {Event} e - Click event
   */
  const handleClickOutside = (e) => {
    if (!wrapper.contains(e.target)) {
      closeDropdown(dropdown);
      document.removeEventListener('click', handleClickOutside);
    }
  };
  
  // Toggle dropdown with entrance/exit animations
  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const isHidden = dropdown.classList.contains('hidden');
    
    if (isHidden) {
      dropdownManager.closeAll(dropdown);
      
      dropdown.classList.remove('hidden');
      // Smooth entrance animation
      dropdown.style.opacity = '0';
      dropdown.style.transform = 'translateY(-10px) scale(0.95)';
      requestAnimationFrame(() => {
        dropdown.style.transition = 'all 0.2s ease-out';
        dropdown.style.opacity = '1';
        dropdown.style.transform = 'translateY(0) scale(1)';
      });
      
      setTimeout(() => {
        document.addEventListener('click', handleClickOutside);
      }, 0);
    } else {
      closeDropdown(dropdown);
      document.removeEventListener('click', handleClickOutside);
    }
  });

  // Handle theme selection with immediate UI updates
  options.forEach(option => {
    option.addEventListener('click', (e) => {
      e.stopPropagation();
      const theme = option.dataset.theme;
      setTheme(theme);
      
      closeDropdown(dropdown);
      document.removeEventListener('click', handleClickOutside);
      
      updateToggleIcon(theme);
      updateActiveStates(theme);
    });
  });
  
  /**
   * Handle theme changes from external sources
   * Updates UI to reflect current theme state
   */
  const handleThemeChange = () => {
    const currentStoredTheme = getStoredTheme();
    updateToggleIcon(currentStoredTheme);
    updateActiveStates(currentStoredTheme);
  };
  
  // Watch for system theme changes when using system preference
  const systemMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  systemMediaQuery.addEventListener('change', () => {
    if (getStoredTheme() === THEMES.SYSTEM) {
      handleThemeChange();
    }
  });
  
  // Watch for DOM class changes indicating theme updates
  const observer = new MutationObserver(() => {
    handleThemeChange();
  });
  
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class']
  });
  
  return wrapper;
}; 