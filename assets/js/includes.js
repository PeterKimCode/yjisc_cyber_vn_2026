(() => {
    const INCLUDE_ATTR = 'data-include';

    const ensureStylesheet = (href, key) => {
        if (document.querySelector(`link[data-dynamic-style="${key}"]`)) {
            return;
        }

        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        link.dataset.dynamicStyle = key;
        document.head.appendChild(link);
    };

    const ensureScript = (src, id) => {
        if (document.getElementById(id)) {
            return;
        }
        const script = document.createElement('script');
        script.src = src;
        script.id = id;
        document.head.appendChild(script);
    };

    const configureTailwind = () => {
        if (window.tailwindConfigured) return;
        window.tailwindConfigured = true;

        const script = document.createElement('script');
        script.textContent = `
            try {
                tailwind.config = {
                    theme: {
                        extend: {
                            fontFamily: {
                                sans: ['Pretendard', 'Noto Sans KR', 'sans-serif'],
                            },
                            colors: {
                                glass: 'rgba(255, 255, 255, 0.05)',
                                'glass-border': 'rgba(255, 255, 255, 0.1)',
                                'glass-text': 'rgba(255, 255, 255, 0.9)',
                                'glass-text-muted': 'rgba(255, 255, 255, 0.6)',
                                primary: '#3a6ff7',
                                'primary-dark': '#254fba',
                                darkbg: '#0f172a',
                            },
                            backdropBlur: {
                                xs: '2px',
                            }
                        }
                    }
                }
            } catch(e) { console.log('Tailwind config error', e); }
        `;
        document.head.appendChild(script);
    };

    const injectThemeClasses = () => {
        // Add Tailwind base classes to body if not present
        document.body.classList.add(
            'antialiased',
            'bg-slate-50',
            'text-slate-900',
            'transition-colors',
            'duration-300'
        );
    };

    // Preload modern assets
    ensureStylesheet('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css', 'pretendard');
    ensureScript('https://cdn.tailwindcss.com', 'tailwindcss');
    configureTailwind();

    const loadIncludes = async () => {
        injectThemeClasses();
        const elements = Array.from(document.querySelectorAll(`[${INCLUDE_ATTR}]`));

        if (elements.length === 0) {
            window.__includesReady = true;
            document.dispatchEvent(new CustomEvent('includes:ready'));
            return;
        }

        await Promise.all(
            elements.map(async (element) => {
                const url = element.getAttribute(INCLUDE_ATTR);
                if (!url) {
                    return;
                }

                try {
                    const response = await fetch(url, { cache: 'no-cache' });
                    if (!response.ok) {
                        throw new Error(`Failed to load include: ${url}`);
                    }

                    const html = await response.text();
                    element.innerHTML = html;

                    if (url.includes('header.html')) {
                        // Navigation CSS removed in favor of Tailwind
                        // ensureStylesheet('assets/css/navigation.css', 'navigation-css');
                    }
                    if (url.includes('google_translate')) {
                        // handled dynamically
                    }

                    // Force header/footer re-initialization scripts if needed
                    if (element.querySelector('[data-mobile-menu-toggle]')) {
                        if (window.initMainHeader) window.initMainHeader();
                    }

                    element.removeAttribute(INCLUDE_ATTR);
                } catch (error) {
                    console.error(`Failed to load include: ${url}`, error);
                }
            })
        );

        // Google Translate Init
        const includedLanguages = 'en,zh-CN,zh-TW,ja,th,vi,tl,fr,de,id,ru,es';
        if (!window.googleTranslateElementInit) {
            window.googleTranslateElementInit = function () {
                new google.translate.TranslateElement({
                    pageLanguage: 'ko',
                    includedLanguages: includedLanguages,
                    layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
                    autoDisplay: false
                }, 'google_translate_element');
            }
            ensureScript('https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit', 'google-translate-script');
        }

        window.__includesReady = true;
        document.dispatchEvent(new CustomEvent('includes:ready'));
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadIncludes);
    } else {
        loadIncludes();
    }
})();
