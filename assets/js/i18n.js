/**
 * Internationalization (i18n) Logic
 */

const LANG_KEY = 'portfolio_language';

function initI18n() {
    const savedLang = localStorage.getItem(LANG_KEY);
    const browserLang = navigator.language.split('-')[0];
    const defaultLang = savedLang || (translations[browserLang] ? browserLang : 'fr');

    setLanguage(defaultLang);

    // Add event listeners to language toggle buttons if they exist
    document.querySelectorAll('[data-switch-lang]').forEach(button => {
        button.addEventListener('click', (e) => {
            const lang = e.currentTarget.getAttribute('data-switch-lang');
            setLanguage(lang);
        });
    });
}

function setLanguage(lang) {
    if (!translations[lang]) return;

    document.documentElement.lang = lang;
    localStorage.setItem(LANG_KEY, lang);

    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = translations[lang][key];

        if (translation) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                if (element.hasAttribute('placeholder')) {
                    // Check if there is a specific placeholder key
                    const placeholderKey = element.getAttribute('data-i18n-placeholder');
                    if (placeholderKey && translations[lang][placeholderKey]) {
                        element.placeholder = translations[lang][placeholderKey];
                    } else if (key.includes('placeholder')) {
                        element.placeholder = translation;
                    }
                }
            } else {
                element.innerHTML = translation;
            }
        }
    });

    // Handle attributes like placeholders specifically if needed
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        const translation = translations[lang][key];
        if (translation) {
            element.placeholder = translation;
        }
    });

    // Update active state of language buttons
    document.querySelectorAll('[data-switch-lang]').forEach(button => {
        if (button.getAttribute('data-switch-lang') === lang) {
            button.classList.add('active', 'text-white', 'bg-dark-700/50');
            button.classList.remove('text-dark-400');
        } else {
            button.classList.remove('active', 'text-white', 'bg-dark-700/50');
            button.classList.add('text-dark-400');
        }

    });

    // Refresh UI components
    if (typeof updateSectionSidebar === 'function') {
        updateSectionSidebar();
    }

    if (typeof updateDateTime === 'function') {
        updateDateTime();
    }

    // Re-initialize text splitting for elements that were updated
    if (typeof window.initTextAnimations === 'function') {
        const updatedElements = document.querySelectorAll('.reveal-text');
        updatedElements.forEach(el => window.initTextAnimations(el));
    }

    // Refresh ScrollTrigger if it exists
    if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initI18n);
