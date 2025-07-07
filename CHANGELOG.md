# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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

[1.0.0]: https://github.com/nuwa-x/nuwault/releases/tag/v1.0.0 