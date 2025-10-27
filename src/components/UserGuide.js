/**
 * UserGuide Component
 * 
 * Renders an interactive step-by-step guide with navigation controls,
 * swipe gestures, keyboard navigation, and responsive design.
 * Features progress indicators, smooth animations, and multi-language support.
 * 
 * @author NuwaX
 */
import { t } from '../utils/i18n.js';

/**
 * Creates the main UserGuide component with interactive step navigation
 * 
 * @returns {HTMLElement} The complete user guide section
 */
export const UserGuide = () => {
  const guide = document.createElement("section");
  guide.className = "py-16 px-4 sm:px-6 lg:px-8 section-odd-bg";
  guide.id = "user-guide";

  guide.innerHTML = `
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-8">
        <h2 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
          ${t('userGuide.title')}
        </h2>
        <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-base">
          ${t('userGuide.subtitle')}
        </p>
      </div>
      
      <div class="mb-8">
        <div class="flex justify-center">
          <div class="flex space-x-2" id="progress-indicators">
          </div>
        </div>
      </div>
      
      <div class="max-w-4xl mx-auto">
        <div id="guide-container" class="relative min-h-[400px]">
        </div>
        
        <div class="flex justify-between items-center mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <button id="prev-step" class="btn-secondary flex items-center space-x-2 opacity-50 cursor-not-allowed text-sm" disabled>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
            <span class="hidden sm:inline">${t('userGuide.navigation.previous')}</span>
            <span class="sm:hidden">${t('userGuide.navigation.previous')}</span>
          </button>
          
          <div class="flex items-center">
             <div class="flex space-x-1" id="mini-indicators">
             </div>
           </div>
          
          <button id="next-step" class="btn-secondary flex items-center space-x-2 text-sm">
            <span class="hidden sm:inline">${t('userGuide.navigation.next')}</span>
            <span class="sm:hidden">${t('userGuide.navigation.next')}</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `;

  const guideInstance = new UserGuideController(guide);
  guideInstance.init();

  return guide;
};

/**
 * UserGuideController Class
 * 
 * Manages the interactive user guide with step navigation, swipe gestures,
 * keyboard controls, and responsive behavior. Handles state management
 * and smooth animations between steps.
 */
class UserGuideController {
  /**
   * Initialize the UserGuide controller
   * 
   * @param {HTMLElement} element - The guide container element
   */
  constructor(element) {
    this.element = element;
    this.currentStep = 0;
    this.totalSteps = 6;
    this.steps = this.getStepsData();
    this.swipeState = null;
  }

  /**
   * Initialize the guide with all components and event listeners
   */
  init() {
    this.renderStepIndicators();
    this.renderCurrentStep();
    this.attachEventListeners();
  }

  /**
   * Retrieve localized step data from i18n system
   * 
   * @returns {Array} Array of step objects with titles, content, and examples
   */
  getStepsData() {
    return [1, 2, 3, 4, 5, 6].map(stepNum => ({
      id: `step-${stepNum}`,
      title: t(`userGuide.steps.step${stepNum}.title`),
      subtitle: t(`userGuide.steps.step${stepNum}.subtitle`),
      content: {
        left: {
          title: t(`userGuide.steps.step${stepNum}.left.title`),
          items: t(`userGuide.steps.step${stepNum}.left.items`, { returnObjects: true })
        },
        right: {
          title: t(`userGuide.steps.step${stepNum}.right.title`),
          items: t(`userGuide.steps.step${stepNum}.right.items`, { returnObjects: true })
        }
      },
      example: {
        title: t(`userGuide.steps.step${stepNum}.example.title`),
        text: t(`userGuide.steps.step${stepNum}.example.text`),
        color: "text-primary-600 dark:text-primary-400"
      }
    }));
  }

  /**
   * Render both top progress indicators and bottom mini indicators
   * with click-to-navigate functionality
   */
  renderStepIndicators() {
    const progressContainer = this.element.querySelector("#progress-indicators");
    progressContainer.innerHTML = "";

    for (let i = 0; i < this.totalSteps; i++) {
      const indicator = document.createElement("div");
      indicator.className = `relative`;

      const circle = document.createElement("div");
      circle.className = `w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-medium transition-all duration-300 cursor-pointer ${
        i === this.currentStep
          ? "bg-primary-500 border-primary-500 text-white scale-110"
          : i < this.currentStep
          ? "bg-primary-100 border-primary-500 text-primary-600 dark:bg-primary-900 dark:text-primary-400"
          : "bg-gray-100 border-gray-300 text-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400"
      }`;
      circle.textContent = i + 1;

      circle.addEventListener("click", () => {
        if (i !== this.currentStep) {
          const direction = i > this.currentStep ? "next" : "previous";
          this.navigateToStep(i, direction);
        }
      });

      indicator.appendChild(circle);

      if (i < this.totalSteps - 1) {
        const line = document.createElement("div");
        line.className = `absolute top-4 left-8 w-8 h-0.5 transition-colors duration-300 ${
          i < this.currentStep
            ? "bg-primary-500"
            : "bg-gray-300 dark:bg-gray-600"
        }`;
        indicator.appendChild(line);
      }

      progressContainer.appendChild(indicator);
    }

    const miniContainer = this.element.querySelector("#mini-indicators");
    miniContainer.innerHTML = "";

    for (let i = 0; i < this.totalSteps; i++) {
      const dot = document.createElement("div");
      dot.className = `w-2 h-2 rounded-full transition-colors duration-300 cursor-pointer ${
        i === this.currentStep
          ? "bg-primary-500"
          : i < this.currentStep
          ? "bg-primary-300 dark:bg-primary-500"
          : "bg-gray-300 dark:bg-gray-600"
      }`;

      dot.addEventListener("click", () => {
        if (i !== this.currentStep) {
          const direction = i > this.currentStep ? "next" : "previous";
          this.navigateToStep(i, direction);
        }
      });

      miniContainer.appendChild(dot);
    }
  }

  /**
   * Render the current step content with responsive grid layout
   * and structured information presentation
   */
  renderCurrentStep() {
    const step = this.steps[this.currentStep];
    const container = this.element.querySelector("#guide-container");

    container.innerHTML = `
      <div class="card-bg rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div class="flex items-center mb-6">
          <div class="flex items-center justify-center w-10 h-10 bg-primary-500 rounded-lg mr-4 shadow-sm">
            <span class="text-white font-bold text-sm">${
              this.currentStep + 1
            }</span>
          </div>
          <div class="flex-1">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-1">${
              step.title
            }</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">${
              step.subtitle
            }</p>
          </div>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div class="space-y-3">
            <h4 class="text-base font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">${
              step.content.left.title
            }</h4>
            <ul class="space-y-1.5">
              ${step.content.left.items
                .map(
                  (item) => `
                <li class="text-sm text-gray-700 dark:text-gray-300 flex items-start leading-relaxed">
                  ${item}
                </li>
              `
                )
                .join("")}
            </ul>
          </div>
          
          <div class="space-y-3">
            <h4 class="text-base font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">${
              step.content.right.title
            }</h4>
            <ul class="space-y-1.5">
              ${step.content.right.items
                .map(
                  (item) => `
                <li class="text-sm text-gray-700 dark:text-gray-300 flex items-start leading-relaxed">
                  ${item}
                </li>
              `
                )
                .join("")}
            </ul>
          </div>
        </div>
        
        <div class="bg-gray-50 dark:bg-slate-800 rounded-lg p-4 border-l-4 border-primary-500">
          <div class="flex items-start">
            <svg class="w-4 h-4 text-primary-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <div>
              <p class="text-sm font-medium text-gray-900 dark:text-white">${
                step.example.title
              }</p>
              <p class="text-sm ${step.example.color} mt-1">${
      step.example.text
    }</p>
            </div>
          </div>
        </div>
      </div>
    `;

    this.updateNavigation();
  }

  /**
   * Update navigation button states and content based on current step
   */
  updateNavigation() {
    const prevBtn = this.element.querySelector("#prev-step");
    const nextBtn = this.element.querySelector("#next-step");

    if (this.currentStep === 0) {
      prevBtn.disabled = true;
      prevBtn.className =
        "btn-secondary flex items-center space-x-2 opacity-50 cursor-not-allowed text-sm";
    } else {
      prevBtn.disabled = false;
      prevBtn.className = "btn-secondary flex items-center space-x-2 text-sm";
    }

    if (this.currentStep === this.totalSteps - 1) {
      nextBtn.innerHTML = `
        <span class="hidden sm:inline">${t('userGuide.navigation.getStarted')}</span>
        <span class="sm:hidden">${t('userGuide.navigation.getStarted')}</span>
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      `;
    } else {
      nextBtn.innerHTML = `
        <span class="hidden sm:inline">${t('userGuide.navigation.next')}</span>
        <span class="sm:hidden">${t('userGuide.navigation.next')}</span>
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      `;
    }
  }

  /**
   * Update all translatable text elements when language changes
   */
  updateHeaderTexts() {
    const titleElement = this.element.querySelector('h2');
    const subtitleElement = this.element.querySelector('p');
    
    if (titleElement) {
      titleElement.textContent = t('userGuide.title');
    }
    
    if (subtitleElement) {
      subtitleElement.textContent = t('userGuide.subtitle');
    }
    
    const prevBtn = this.element.querySelector("#prev-step");
    if (prevBtn) {
      prevBtn.innerHTML = `
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
        <span class="hidden sm:inline">${t('userGuide.navigation.previous')}</span>
        <span class="sm:hidden">${t('userGuide.navigation.previous')}</span>
      `;
    }
    
    this.updateNavigation();
  }

  /**
   * Attach all event listeners for navigation, swipe gestures, and keyboard controls
   */
  attachEventListeners() {
    const prevBtn = this.element.querySelector("#prev-step");
    const nextBtn = this.element.querySelector("#next-step");
    const guideContainer = this.element.querySelector("#guide-container");

    prevBtn.addEventListener("click", () => {
      this.navigateToStep(this.currentStep - 1);
    });

    nextBtn.addEventListener("click", () => {
      if (this.currentStep < this.totalSteps - 1) {
        this.navigateToStep(this.currentStep + 1);
      } else {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      }
    });

    this.initSwipeSystem(guideContainer);

    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft" && this.currentStep > 0) {
        this.navigateToStep(this.currentStep - 1);
      } else if (
        e.key === "ArrowRight" &&
        this.currentStep < this.totalSteps - 1
      ) {
        this.navigateToStep(this.currentStep + 1);
      }
    });

    guideContainer.style.cursor = "grab";
    guideContainer.style.userSelect = "none";

    window.addEventListener('languageChanged', () => {
      this.steps = this.getStepsData();
      this.renderCurrentStep();
      this.renderStepIndicators();
      this.updateHeaderTexts();
    });
  }

  /**
   * Initialize advanced swipe gesture system for touch and mouse interactions
   * Supports both touch devices and mouse drag with configurable sensitivity
   * 
   * @param {HTMLElement} container - The container element to attach swipe listeners
   */
  initSwipeSystem(container) {
    this.swipeState = {
      isActive: false,
      startX: 0,
      startY: 0,
      currentX: 0,
      currentY: 0,
      startTime: 0,
      isDragging: false
    };

    const config = {
      minDistance: 40,
      maxTime: 500,
      maxVerticalDistance: 120,
      velocityThreshold: 0.3
    };

    container.addEventListener("mousedown", (e) => {
      this.startSwipe(e.clientX, e.clientY, container);
      e.preventDefault();
    });

    container.addEventListener("mousemove", (e) => {
      this.updateSwipe(e.clientX, e.clientY);
      if (this.swipeState.isDragging) {
        e.preventDefault();
      }
    });

    container.addEventListener("mouseup", (e) => {
      this.endSwipe(e.clientX, e.clientY, config, container);
    });

    container.addEventListener("mouseleave", () => {
      this.cancelSwipe(container);
    });

    container.addEventListener("touchstart", (e) => {
      if (e.touches.length === 1) {
        const touch = e.touches[0];
        this.startSwipe(touch.clientX, touch.clientY, container);
      }
    }, { passive: true });

    container.addEventListener("touchmove", (e) => {
      if (e.touches.length === 1) {
        const touch = e.touches[0];
        this.updateSwipe(touch.clientX, touch.clientY);
      }
    }, { passive: true });

    container.addEventListener("touchend", (e) => {
      if (e.changedTouches.length === 1) {
        const touch = e.changedTouches[0];
        this.endSwipe(touch.clientX, touch.clientY, config, container);
      }
    }, { passive: true });

    container.addEventListener("touchcancel", () => {
      this.cancelSwipe(container);
    }, { passive: true });
  }

  /**
   * Initialize swipe gesture tracking
   * 
   * @param {number} x - Starting X coordinate
   * @param {number} y - Starting Y coordinate
   * @param {HTMLElement} container - Container element
   */
  startSwipe(x, y, container) {
    this.swipeState = {
      isActive: true,
      startX: x,
      startY: y,
      currentX: x,
      currentY: y,
      startTime: Date.now(),
      isDragging: false
    };
    
    container.style.cursor = "grabbing";
    container.classList.add("swipe-active");
  }

  /**
   * Update swipe gesture coordinates during movement
   * 
   * @param {number} x - Current X coordinate
   * @param {number} y - Current Y coordinate
   */
  updateSwipe(x, y) {
    if (!this.swipeState.isActive) return;

    this.swipeState.currentX = x;
    this.swipeState.currentY = y;

    const deltaX = Math.abs(x - this.swipeState.startX);
    const deltaY = Math.abs(y - this.swipeState.startY);

    if (!this.swipeState.isDragging && (deltaX > 5 || deltaY > 5)) {
      this.swipeState.isDragging = true;
    }
  }

  /**
   * Process swipe gesture completion and determine navigation action
   * 
   * @param {number} x - End X coordinate
   * @param {number} y - End Y coordinate
   * @param {Object} config - Swipe configuration parameters
   * @param {HTMLElement} container - Container element
   */
  endSwipe(x, y, config, container) {
    if (!this.swipeState.isActive) return;

    const deltaX = x - this.swipeState.startX;
    const deltaY = Math.abs(y - this.swipeState.startY);
    const deltaTime = Date.now() - this.swipeState.startTime;
    const distance = Math.abs(deltaX);
    const velocity = distance / deltaTime;

    container.style.cursor = "grab";
    container.classList.remove("swipe-active");

    const isValidSwipe = 
      distance >= config.minDistance &&
      deltaY <= config.maxVerticalDistance &&
      (deltaTime <= config.maxTime || velocity >= config.velocityThreshold);

    if (isValidSwipe) {
      if (deltaX > 0) {
        if (this.currentStep > 0) {
          this.navigateToStep(this.currentStep - 1, "previous");
        }
      } else {
        if (this.currentStep < this.totalSteps - 1) {
          this.navigateToStep(this.currentStep + 1, "next");
        } else {
          window.scrollTo({
            top: 0,
            behavior: "smooth"
          });
        }
      }
    }

    this.swipeState.isActive = false;
  }

  /**
   * Cancel active swipe gesture and reset state
   * 
   * @param {HTMLElement} container - Container element
   */
  cancelSwipe(container) {
    if (!this.swipeState.isActive) return;

    container.style.cursor = "grab";
    container.classList.remove("swipe-active");
    this.swipeState.isActive = false;
  }

  /**
   * Navigate to specific step with smooth slide animation
   * 
   * @param {number} newStep - Target step index
   * @param {string} direction - Animation direction ("next" or "previous")
   */
  navigateToStep(newStep, direction = null) {
    if (newStep < 0 || newStep >= this.totalSteps || newStep === this.currentStep) {
      return;
    }

    const container = this.element.querySelector("#guide-container");
    const currentCard = container.querySelector(".card-bg");
    const isNext = newStep > this.currentStep;
    const animationDirection = direction || (isNext ? "next" : "previous");
    
    if (currentCard) {
      currentCard.classList.add(`slide-out-${animationDirection}`);
      currentCard.offsetHeight;
    }
    
    setTimeout(() => {
      this.currentStep = newStep;
      this.renderCurrentStep();
      this.renderStepIndicators();
      
      const newCard = container.querySelector(".card-bg");
      if (newCard) {
        newCard.style.opacity = '0';
        newCard.style.transform = animationDirection === 'next' ? 'translateX(100%)' : 'translateX(-100%)';
        newCard.offsetHeight;
        
        newCard.classList.add(`slide-in-${animationDirection}`);
        
        setTimeout(() => {
          newCard.classList.remove(`slide-in-${animationDirection}`);
          newCard.style.opacity = '';
          newCard.style.transform = '';
        }, 600);
      }
    }, 250);
  }
}
