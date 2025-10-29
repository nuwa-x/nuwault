# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).


## [1.2.0] - 2025-10-30

### Added
- Password length preference persistence using localStorage for improved user experience
- Client-side URL validation and canonical redirect system for SEO optimization
- Early redirect mechanism in HTML head for faster invalid URL handling
- Environment-aware redirect logic (file://, localhost, custom domains, subdomains)

### Changed
- License updated from MIT to GNU GPLv3
- Logo symbol redesigned with updated visual identity
- Primary brand colors migrated to centralized CSS variable system
- Background color palette refined for improved light/dark theme contrast
- Service Worker cache list aligned with current logo assets
- Redirect logic changed from whitelist to blacklist approach for better compatibility
- Icon generation script modified for transparent backgrounds
- Form element styling migrated to CSS variables for consistent theming

### Fixed
- SEO duplicate content issue by redirecting invalid URLs to canonical URL
- Service Worker cache failure caused by obsolete logo file reference
- Custom domain hosting prevented by hardcoded redirect rules
- PWA offline functionality ensured by proper redirect handling
- Subdomain testing blocked by overly aggressive redirect logic
- CSS parsing issue with Tailwind class selector escape sequences

### Removed
- Hardcoded color values replaced with CSS variables
- Box shadows from UI components for flatter design aesthetic

### Style
- Header logo padding adjusted for responsive layouts
- Main navigation horizontal padding removed for consistent spacing
- Slider component refactored to use theme variables
- All brand colors migrated to teal-based palette with full scale (50-900)
- Icon assets regenerated with transparent backgrounds
- Favicon assets updated with redesigned symbol

### Security
- Canonical URL enforcement on production domain only
- Privacy-first approach maintained for self-hosted deployments

### Dependencies
- Multiple dependency updates via package-lock for latest compatibility


## [1.1.0] - 2025-07-16

### Added
- Enhanced password generation accuracy with character set validation
- Improved mobile keyboard UX by automatically closing keyboard after keyword input
- Added visual feedback for pending password updates during length adjustments

### Changed
- Improved entropy calculation algorithm for password strength analysis
- Updated password strength documentation to describe the new entropy algorithm
- Enhanced password generation responsiveness with 1.5-second delay for length slider changes

### Fixed
- Fixed password generation to ensure output matches required character set constraints
- Fixed mobile keyboard not closing when keyword input is cleared
- Fixed race conditions in password generation during length adjustments

### Security
- Added validation to ensure generated passwords contain all selected character types
- Implemented retry mechanism for password generation when validation fails

### Dependencies
- Updated @babel, sharp, rollup, vite, i18next and other dependencies to latest versions
- Applied multiple patch-level and minor version bumps for improved compatibility
- Ensures compatibility with latest upstream releases and security fixes

## [1.0.1] - 2025-07-08

### Fixed
- Fixed race condition in password generation on mobile devices that caused passwords to change unexpectedly after animation completion
- Fixed timing issues where password strength analysis would trigger new password generation during animation
- Fixed inconsistent password display behavior on mobile devices with touch interactions

## [1.0.0] - 2025-07-07

### Added

#### Core Features
- Advanced password generation system using [@nuwa-x/nuwault-core](https://github.com/nuwa-x/nuwault-core)
- Real-time password strength analysis with 5-level assessment
- Keyword-based deterministic password generation
- Customizable password options (length, character types, complexity)
- Password and keyword masking for enhanced privacy
- Auto-generation mode with debouncing

#### Security
- Client-side processing with no server communication
- SHA-512 cryptographic hashing with multiple iterations
- Deterministic generation ensuring consistent results
- Input validation and sanitization
- Timing attack prevention
- Memory security best practices

#### User Interface
- Responsive design with mobile-first approach
- Hero section with integrated password generator
- Interactive FAQ and user guide sections
- Theme selector (light/dark/system)
- Language selector with English/Turkish support
- Smooth scrolling and animations
- Toast notifications for user feedback

#### Progressive Web App
- Service worker implementation with caching strategies
- Offline functionality support
- PWA manifest with multiple icon sizes
- Install prompts and native app experience
- Automatic cache management and updates
- Cross-platform compatibility

#### Internationalization
- Multi-language support with i18next
- Dynamic language switching
- Comprehensive UI translations
- Language preference persistence

#### Development
- Vite 7.0.0 build system
- Tailwind CSS 4.1.11 for styling
- Automated icon and service worker generation
- Legacy browser support with polyfills
- Hot module replacement for development
- Production build optimization

#### Documentation
- Comprehensive README with setup instructions
- Contributing guidelines and code standards
- Security policy and vulnerability reporting
- Password strength analysis documentation
- PWA setup guide
- MIT license


[1.0.1]: https://github.com/nuwa-x/nuwault/releases/tag/v1.0.1
[1.0.0]: https://github.com/nuwa-x/nuwault/releases/tag/v1.0.0 