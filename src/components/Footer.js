/**
 * Footer Component
 * Renders the application footer with about section, navigation links, license info,
 * and social media links. Includes dynamic copyright year calculation.
 * 
 * @author NuwaX
 */
import { SOCIAL_LINKS, CONTACT_INFO } from '../utils/config.js';
import { t } from '../utils/i18n.js';

/**
 * Creates and returns the Footer component
 * @returns {HTMLElement} The Footer element
 */
export const Footer = () => {
  const footer = document.createElement("footer");
  footer.className =
    "section-odd-bg border-t border-gray-200 dark:border-gray-800";

  // Initialize the footer
  const footerInstance = new FooterController(footer);
  footerInstance.init();

  return footer;
};

/**
 * Footer Controller Class
 * Manages footer content rendering, social links, and dynamic copyright
 */
class FooterController {
  /**
   * Initialize Footer controller with element reference
   * @param {HTMLElement} element - The Footer element
   */
  constructor(element) {
    this.element = element;
  }

  /**
   * Initialize the Footer component
   * Sets up rendering and event listeners
   */
  init() {
    this.render();
    this.attachEventListeners();
  }

  /**
   * Render the Footer content
   * Creates three-column layout with about, navigation, and license sections
   */
  render() {
    this.element.innerHTML = `
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              ${t('footer.sections.about.title')}
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
              ${t('footer.sections.about.description')}
            </p>
            <div class="flex items-center space-x-2">
              <a href="${SOCIAL_LINKS.github}" target="_blank" rel="noopener noreferrer" 
                 class="footer-link text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                 title="${t('footer.sections.about.social.github')}">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              
              <a href="mailto:${CONTACT_INFO.email}" 
                 class="footer-link text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                 title="${t('footer.sections.about.social.email')}">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              ${t('footer.sections.navigation.title')}
            </h3>
            <ul class="space-y-2">
              <li>
                <a href="#generator" class="footer-link text-sm text-gray-600 dark:text-gray-400 transition-colors">
                  ${t('footer.sections.navigation.links.generator')}
                </a>
              </li>
              <li>
                <a href="#features" class="footer-link text-sm text-gray-600 dark:text-gray-400 transition-colors">
                  ${t('footer.sections.navigation.links.features')}
                </a>
              </li>
              <li>
                <a href="#user-guide" class="footer-link text-sm text-gray-600 dark:text-gray-400 transition-colors">
                  ${t('footer.sections.navigation.links.userGuide')}
                </a>
              </li>
              <li>
                <a href="#faq" class="footer-link text-sm text-gray-600 dark:text-gray-400 transition-colors">
                  ${t('footer.sections.navigation.links.faq')}
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              ${t('footer.sections.license.title')}
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
              <a href="https://opensource.org/licenses/MIT" target="_blank" rel="noopener noreferrer" class="license-link underline">
                ${t('footer.sections.license.mitLicense')}
              </a>
            </p>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              ${t('footer.sections.license.description')}
            </p>
          </div>
        </div>
        
        <div class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p class="text-center text-sm text-gray-600 dark:text-gray-400">
            ${t('footer.copyright', { 
              year: (() => {
                // Dynamic copyright year calculation: shows "2025" or "2025-XXXX" format
                const currentYear = new Date().getFullYear();
                return currentYear === 2025 ? "2025" : `2025-${currentYear}`;
              })()
            })}
          </p>
        </div>
      </div>
    `;
  }

  /**
   * Attach event listeners for component interactions
   * Handles language change events for internationalization
   */
  attachEventListeners() {
    // Re-render footer when language changes
    window.addEventListener('languageChanged', () => {
      this.render();
    });
  }
}
