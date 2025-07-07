/**
 * Language Selector Component
 * Provides a dropdown interface for switching between supported languages.
 * Features animated dropdown, click-outside handling, and synchronized state management.
 * 
 * @author NuwaX
 */
import { SUPPORTED_LANGUAGES, getCurrentLanguage, changeLanguage, t } from '../utils/i18n.js';

/**
 * Global dropdown manager to prevent multiple dropdowns from being open simultaneously
 * Shared with ThemeSelector to ensure proper coordination
 */
const dropdownManager = window.dropdownManager || (() => {
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
  
  window.dropdownManager = new DropdownManager();
  return window.dropdownManager;
})();

/**
 * Language Selector Class
 * Manages language selection dropdown with animations and state synchronization
 */
export class LanguageSelector {
  /**
   * Initialize Language Selector with current language state
   */
  constructor() {
    this.currentLanguage = getCurrentLanguage();
    this.isOpen = false;
    this.element = null;
    
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.closeDropdown = this.closeDropdown.bind(this);
    
    // Synchronize with global language changes
    window.addEventListener('languageChanged', (event) => {
      this.currentLanguage = event.detail.language;
      this.updateCurrentLanguageDisplay();
    });
  }

  /**
   * Render the language selector component
   * Creates dropdown with current language display and selectable options
   * @returns {HTMLElement} The language selector element
   */
  render() {
    const currentLangInfo = SUPPORTED_LANGUAGES[this.currentLanguage];
    
    const html = `
      <div class="relative language-selector-wrapper">
        <button id="language-toggle" 
                class="p-2.5 rounded-xl text-gray-700 dark:text-gray-400 transition-all duration-200 cursor-pointer"
                title="${t('common.languageSelector.title')}"
                aria-label="${t('common.languageSelector.title')}">
          <span class="language-code text-sm font-medium">${currentLangInfo.code.toUpperCase()}</span>
        </button>
        
        <div id="language-dropdown" 
             class="hidden absolute right-0 mt-3 w-40 card-bg border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl backdrop-blur-sm z-50 overflow-hidden">
          <ul class="py-2">
            ${Object.values(SUPPORTED_LANGUAGES).map(lang => `
              <li>
                <button data-language="${lang.code}" 
                        class="language-option w-full px-4 py-3 text-left text-sm text-gray-800 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 cursor-pointer ${lang.code === this.currentLanguage ? 'active bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300' : ''}">
                  <div class="flex items-center space-x-3">
                    <div class="flex-shrink-0 w-5 h-5 flex items-center justify-center flag-icon">
                      ${lang.flag}
                    </div>
                    <div class="flex-1">
                      <span class="font-medium">${lang.nativeName}</span>
                    </div>
                    ${lang.code === this.currentLanguage ? '<div class="flex-shrink-0"><svg class="w-4 h-4 text-primary-600 dark:text-primary-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg></div>' : ''}
                  </div>
                </button>
              </li>
            `).join('')}
          </ul>
        </div>
      </div>
    `;

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    this.element = tempDiv.firstElementChild;
    
    this.attachEventListeners();
    
    return this.element;
  }

  /**
   * Attach event listeners for dropdown interactions
   * Handles toggle clicks, language selection, and outside clicks
   */
  attachEventListeners() {
    if (!this.element) return;

    const toggle = this.element.querySelector('#language-toggle');
    const dropdown = this.element.querySelector('#language-dropdown');
    const options = this.element.querySelectorAll('.language-option');

    dropdownManager.register(dropdown, this.closeDropdown);

    // Toggle dropdown with entrance/exit animations
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isHidden = dropdown.classList.contains('hidden');
      
      if (isHidden) {
        dropdownManager.closeAll(dropdown);
        
        dropdown.classList.remove('hidden');
        this.isOpen = true;
        
        // Smooth entrance animation
        dropdown.style.opacity = '0';
        dropdown.style.transform = 'translateY(-10px) scale(0.95)';
        requestAnimationFrame(() => {
          dropdown.style.transition = 'all 0.2s ease-out';
          dropdown.style.opacity = '1';
          dropdown.style.transform = 'translateY(0) scale(1)';
        });
        
        setTimeout(() => {
          document.addEventListener('click', this.handleClickOutside);
        }, 0);
      } else {
        this.closeDropdown();
      }
    });

    // Handle language selection with state update
    options.forEach(option => {
      option.addEventListener('click', (e) => {
        e.stopPropagation();
        const languageCode = option.dataset.language;
        
        if (languageCode && languageCode !== this.currentLanguage) {
          changeLanguage(languageCode).then((success) => {
            if (success) {
              this.closeDropdown();
              this.updateActiveStates(languageCode);
            }
          });
        } else {
          this.closeDropdown();
        }
      });
    });
  }

  /**
   * Close dropdown with exit animation
   * Handles smooth transition and cleanup
   */
  closeDropdown() {
    if (!this.element) return;
    
    const dropdown = this.element.querySelector('#language-dropdown');
    if (!dropdown || dropdown.classList.contains('hidden')) return;
    
    dropdown.style.transition = 'all 0.15s ease-in';
    dropdown.style.opacity = '0';
    dropdown.style.transform = 'translateY(-10px) scale(0.95)';
    setTimeout(() => {
      dropdown.classList.add('hidden');
      dropdown.style.transition = '';
      dropdown.style.transform = '';
    }, 150);
    
    this.isOpen = false;
    document.removeEventListener('click', this.handleClickOutside);
  }

  /**
   * Handle clicks outside the dropdown
   * Closes dropdown when user clicks elsewhere
   * @param {Event} event - Click event
   */
  handleClickOutside(event) {
    if (!this.element || !this.element.contains(event.target)) {
      this.closeDropdown();
    }
  }

  /**
   * Update current language display
   * Synchronizes UI with language state changes
   */
  updateCurrentLanguageDisplay() {
    if (!this.element) return;
    
    const currentLangInfo = SUPPORTED_LANGUAGES[this.currentLanguage];
    const languageCode = this.element.querySelector('.language-code');
    
    if (languageCode) languageCode.textContent = currentLangInfo.code.toUpperCase();
    
    this.updateActiveStates(this.currentLanguage);
  }

  /**
   * Update active state styling for language options
   * Manages checkmarks and highlight styling
   * @param {string} selectedLanguage - The currently selected language code
   */
  updateActiveStates(selectedLanguage) {
    const options = this.element?.querySelectorAll('.language-option');
    if (!options) return;

    options.forEach(option => {
      const language = option.dataset.language;
      const isActive = language === selectedLanguage;
      
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
  }

  /**
   * Cleanup method for component destruction
   * Removes event listeners and unregisters from dropdown manager
   */
  destroy() {
    if (this.element) {
      const dropdown = this.element.querySelector('#language-dropdown');
      dropdownManager.unregister(dropdown);
    }
    
    document.removeEventListener('click', this.handleClickOutside);
    
    if (this.element) {
      this.element.remove();
      this.element = null;
    }
  }
} 