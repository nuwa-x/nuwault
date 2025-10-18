/**
 * Scroll To Top Component
 * Provides a floating action button that appears when user scrolls down
 * and smoothly scrolls back to the top when clicked.
 * 
 * @author NuwaX
 */

/**
 * Creates and returns the scroll-to-top button component
 * Features auto-hide/show based on scroll position and smooth scroll behavior
 * @returns {HTMLElement} The scroll-to-top button element
 */
export const ScrollToTop = () => {
  const scrollButton = document.createElement('button');
  scrollButton.id = 'scroll-to-top';
  scrollButton.className = 'scroll-to-top fixed bottom-6 right-6 z-50 w-12 h-12 rounded-lg flex items-center justify-center shadow-sm hover:shadow-lg transition-all duration-300 opacity-0 pointer-events-none cursor-pointer';
  scrollButton.setAttribute('aria-label', 'Scroll to top');
  
  scrollButton.innerHTML = `
    <svg class="w-6 h-6 text-white transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 15l7-7 7 7"></path>
    </svg>
  `;
  
  /**
   * Smooth scroll to top functionality
   * Uses native smooth scrolling behavior
   */
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  /**
   * Toggle button visibility based on scroll position
   * Shows button after scrolling 300px from top
   */
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      scrollButton.classList.remove('opacity-0', 'pointer-events-none');
      scrollButton.classList.add('opacity-100');
    } else {
      scrollButton.classList.add('opacity-0', 'pointer-events-none');
      scrollButton.classList.remove('opacity-100');
    }
  };

  // Initialize event listeners
  scrollButton.addEventListener('click', scrollToTop);
  window.addEventListener('scroll', toggleVisibility);
  
  // Set initial visibility state
  toggleVisibility();
  
  return scrollButton;
}; 