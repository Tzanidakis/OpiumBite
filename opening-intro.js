// Loading screen animations
document.addEventListener('DOMContentLoaded', function() {
    let loadingScreen = document.getElementById('loading-screen');
    // A lifecycle loader owns its own reveal timing; never hide it from the intro.
    if (loadingScreen?.classList.contains('lifecycle-refresh-screen')) return;
    // A fresh link opening starts a new intro, even for a returning visitor.
    // Internal navigation and refreshes keep the current visit uninterrupted.
    const introSeenKey = 'opiumBiteIntroVisitV3';
    const navigationType = performance.getEntriesByType?.('navigation')[0]?.type || 'navigate';
    let internalNavigation = false;
    try {
        internalNavigation = Boolean(document.referrer) &&
            new URL(document.referrer).origin === window.location.origin;
    } catch (_) {}
    let introAlreadyShown = false;
    try {
        introAlreadyShown = sessionStorage.getItem(introSeenKey) === 'true' &&
            (internalNavigation || navigationType === 'reload' || navigationType === 'back_forward');
    } catch (_) {
        introAlreadyShown = internalNavigation || navigationType === 'reload' || navigationType === 'back_forward';
    }
    try { sessionStorage.setItem(introSeenKey, 'true'); } catch (_) {}
    if (!loadingScreen && introAlreadyShown) return;
    const hasHomepageLoader = Boolean(loadingScreen);
    if (!loadingScreen) {
        // Direct inner-page openings share the same opening image.
        loadingScreen = document.createElement('div');
        loadingScreen.id = 'loading-screen';
        loadingScreen.innerHTML = '<div class="opening-fog opening-fog-back" aria-hidden="true"></div><div class="opening-fog opening-fog-front" aria-hidden="true"></div><img id="opening-logo" src="media/intro-logo.png" width="1254" height="1254" alt="Opium Bite silver grillz emblem" fetchpriority="high" decoding="async"><div class="opening-caption"><button id="bite-button" type="button" aria-label="Enter the Opium Bite website">make them bite your dust</button></div>';
        document.body.prepend(loadingScreen);
    }
    const biteButton = document.getElementById('bite-button');
    const mainContent = document.getElementById('main-content') || document.querySelector('main');
    if (!loadingScreen || !biteButton || !mainContent) return;
    const isIPadOS = navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
    const isPhoneOrTablet = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent || '') ||
        isIPadOS ||
        (window.matchMedia('(max-width: 1024px)').matches && window.matchMedia('(pointer: coarse)').matches);
    let openingCaption = 'make them bite your dust';

    try {
        if (localStorage.getItem('opiumBiteLanguage') === 'el') {
            openingCaption = 'make them bite your dust';
        }
    } catch (error) {
        // Keep the English opening caption when preferences are unavailable.
    }

    loadingScreen.style.display = 'flex';
    loadingScreen.classList.remove('slide-up', 'device-loading');
    mainContent.style.visibility = 'hidden';

    // After the first opening image, phones and tablets use the lightweight
    // loading text and bar for every refresh in the same tab session.
    if (introAlreadyShown && isPhoneOrTablet && hasHomepageLoader) {
        loadingScreen.classList.add('device-loading');

        document.body.style.overflow = 'hidden';
        const loaderStartedAt = performance.now();

        let mobileLoadingFinished = false;
        function finishMobileLoading() {
            if (mobileLoadingFinished) return;
            mobileLoadingFinished = true;
            const minimumDisplayTime = 900;
            const remainingTime = Math.max(0, minimumDisplayTime - (performance.now() - loaderStartedAt));

            setTimeout(() => {
                let finished = false;

                function revealPage() {
                    if (finished) return;
                    finished = true;
                    loadingScreen.classList.add('slide-up');
                    mainContent.style.visibility = 'visible';
                    document.body.style.removeProperty('overflow');

                    setTimeout(() => {
                        loadingScreen.style.display = 'none';
                        document.body.classList.remove('mobile-lifecycle-locked');
                        window.dispatchEvent(new CustomEvent('opiumbite:loader-finished'));
                    }, 550);
                }

                if (loadingScreen.dataset.restorePending === 'true') {
                    window.addEventListener('opiumbite:restore-complete', revealPage, { once: true });
                    setTimeout(revealPage, 4500);
                } else {
                    revealPage();
                }
            }, remainingTime);
        }

        if (document.readyState === 'complete') {
            finishMobileLoading();
        } else {
            window.addEventListener('load', finishMobileLoading, { once: true });
            // A stalled remote resource must not keep the page locked.
            setTimeout(finishMobileLoading, 2500);
        }

        return;
    }

    // Desktop skips the loading overlay during the same visit.
    if (introAlreadyShown) {
        loadingScreen.style.display = 'none';
        mainContent.style.visibility = 'visible';
        document.body.style.removeProperty('overflow');
        return;
    }

    // Disable scrolling during loading animation
    document.body.style.overflow = 'hidden';
    
    biteButton.textContent = openingCaption;
    biteButton.classList.add('typing-complete');
    // Start the loading sequence
    setTimeout(() => {
        biteButton.classList.add('fade-in');
        setTimeout(() => {
            biteButton.textContent = openingCaption;
        }, 700);
    }, 500);
    
    // Handle click on "BITE ME" button
    biteButton.addEventListener('click', function() {
        // Ignore late timers and video events after the visitor has entered.
        if (loadingScreen.style.display === 'none' || loadingScreen.classList.contains('slide-up') || biteButton.classList.contains('clicked')) return;
        // Only allow click if typing is complete
        if (!biteButton.classList.contains('typing-complete')) {
            return;
        }
        
        // Add click effect
        biteButton.classList.add('clicked');
        
        // Start slide up animation after short delay
        setTimeout(() => {
            loadingScreen.classList.add('slide-up');
            
            // Show main content after slide animation starts
            setTimeout(() => {
                mainContent.style.visibility = 'visible';
                // Re-enable scrolling when main content is shown
                document.body.style.removeProperty('overflow');
                
                // Remove loading screen completely after animation
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    window.dispatchEvent(new CustomEvent('opiumbite:loader-finished'));
                }, 800); // Match the slide-up animation duration
                
            }, 200); // Small delay to ensure smooth transition
            
        }, 300); // Brief pause after click for visual feedback
    });
    
    // Add hover effects for the BITE ME button
    biteButton.addEventListener('mouseenter', function() {
        this.classList.add('hover');
    });
    
    biteButton.addEventListener('mouseleave', function() {
        this.classList.remove('hover');
    });
    
    // A finite presentation avoids trapping anyone behind an image download.
    setTimeout(() => biteButton.click(), 8000);
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') biteButton.click();
    });
});
