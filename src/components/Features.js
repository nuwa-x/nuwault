/**
 * Features Section Component
 * Renders the application features showcase with icons, titles, and descriptions.
 * Supports internationalization and responsive design.
 * 
 * @author NuwaX
 */
import { t } from '../utils/i18n.js';

/**
 * Creates and returns the Features section component
 * @returns {HTMLElement} The Features section element
 */
export const Features = () => {
  const features = document.createElement('section');
  features.className = 'py-16 px-4 sm:px-6 lg:px-8 section-even-bg';
  features.id = 'features';
  
  // Initialize the features
  const featuresInstance = new FeaturesController(features);
  featuresInstance.init();
  
  return features;
};

/**
 * Features Controller Class
 * Manages feature data, rendering, and internationalization support
 */
class FeaturesController {
  /**
   * Initialize Features controller with element reference
   * @param {HTMLElement} element - The Features section element
   */
  constructor(element) {
    this.element = element;
    this.features = this.getFeaturesData();
  }

  /**
   * Initialize the Features component
   * Sets up rendering and event listeners
   */
  init() {
    this.render();
    this.attachEventListeners();
  }

  /**
   * Generate features data configuration
   * Returns array of feature objects with IDs and SVG icons
   * @returns {Array} Array of feature objects with id and icon properties
   */
  getFeaturesData() {
    return [
      {
        id: 'clientSide',
        icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
        </svg>`
      },
      {
        id: 'deterministic',
        icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
        </svg>`
      },
      {
        id: 'sha512',
        icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
        </svg>`
      },
      {
        id: 'customizable',
        icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
        </svg>`
      },
      {
        id: 'offline',
        icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path>
        </svg>`
      },
      {
        id: 'pwa',
        icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
        </svg>`
      }
    ];
  }

  /**
   * Render the Features section
   * Creates responsive grid layout with feature cards
   */
  render() {
    this.element.innerHTML = `
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            ${t('features.title')}
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            ${t('features.subtitle')}
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          ${this.features.map(feature => `
            <div class="card-bg rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div class="icon-container w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                ${feature.icon}
              </div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                ${t(`features.items.${feature.id}.title`)}
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                ${t(`features.items.${feature.id}.description`)}
              </p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  /**
   * Attach event listeners for component interactions
   * Handles language change events for internationalization
   */
  attachEventListeners() {
    // Re-render features when language changes
    window.addEventListener('languageChanged', () => {
      this.render();
    });
  }
} 