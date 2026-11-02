// Scroll-controlled homepage film. Kept separate from the opening-screen flow so
// it initializes whether the intro is shown or skipped for a returning visitor.
document.addEventListener('DOMContentLoaded', function() {
    const film = document.querySelector('.hero-film');
    if (!film) return;

    const videos = Array.from(film.querySelectorAll('.hero-film__video'));
    const copies = {
        one: film.querySelector('.hero-film__copy--one'),
        two: film.querySelector('.hero-film__copy--two'),
        fire: film.querySelector('.hero-film__copy--four-fire'),
        hand: film.querySelector('.hero-film__copy--four-hand')
    };
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const state = videos.map(() => ({
        target: 0,
        current: 0,
        ready: false,
        visible: false,
        recovering: false,
        stalledChecks: 0,
        retries: 0,
        primed: false,
        priming: false
    }));
    const playControl = document.getElementById?.('film-play');
    const minimumFrameInterval = 1000 / 30;
    let ticking = false;
    let lastFrameTime = 0;
    let renderFrame = 0;
    let targetUpdateFrame = 0;
    let resumeTimer = 0;
    let healthTimer = 0;

    const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
    const mix = (start, end, amount) => start + (end - start) * amount;
    const ease = value => value * value * (3 - (2 * value));

    // Safari can expose metadata while keeping its paused decoder uninitialized.
    // Brief muted playback paints the first frame before scroll seeking takes over.
    function primeVideo(video, index) {
        const item = state[index];
        if (item.priming || document.hidden || typeof video.play !== 'function') return;
        item.priming = true;
        video.muted = video.defaultMuted = true;
        video.playsInline = true;
        let playback;
        try { playback = video.play(); } catch (error) { playback = Promise.reject(error); }
        Promise.resolve(playback).then(() => {
            video.pause();
            item.priming = false;
            item.primed = true;
            item.ready = Number.isFinite(video.duration);
            if (playControl) playControl.hidden = true;
            requestTick();
        }).catch(() => {
            item.priming = false;
            // Wait for an actual touch/click instead of looping blocked autoplay.
            item.primed = true;
            if (playControl) playControl.hidden = false;
        });
    }
    const enableFilm = () => {
        videos.forEach((video, index) => {
            if (state[index].visible && (!state[index].primed || (playControl && !playControl.hidden))) primeVideo(video, index);
        });
    };
    playControl?.addEventListener('click', enableFilm);
    document.addEventListener('touchstart', enableFilm, { passive: true });
    document.addEventListener('pointerdown', enableFilm, { passive: true });

    function requestTick() {
        if (ticking || document.hidden) return;
        ticking = true;
        renderFrame = window.requestAnimationFrame(render);
    }

    function updateTargets() {
        if (document.hidden) { suspendFilm(); return; }
        const viewport = window.innerHeight;
        const rect = film.getBoundingClientRect();
        // No media seeking or animation writes while the film is off screen.
        if (rect.top >= viewport || rect.bottom <= 0) {
            state.forEach(item => { item.visible = false; });
            suspendFilm();
            return;
        }
        const travel = Math.max(1, rect.height - viewport);
        const progress = clamp(-rect.top / travel);

        const blendOne = ease(clamp((progress - .30) / .05));
        const blendTwo = ease(clamp((progress - .63) / .05));
        const clipProgress = [
            clamp(progress / .35),
            clamp((progress - .30) / .38),
            clamp((progress - .63) / .37) * .88
        ];

        state.forEach((item, index) => {
            item.target = reducedMotion ? Math.round(clipProgress[index]) : clipProgress[index];
        });

        const videoOpacities = [
            1 - blendOne,
            blendOne * (1 - blendTwo),
            blendTwo
        ];

        videos.forEach((video, index) => {
            const opacity = videoOpacities[index];
            state[index].visible = opacity > .001;
            video.style.setProperty('--video-opacity', opacity);
            video.classList.toggle('is-visible', state[index].visible);
            if (state[index].visible && !state[index].primed) primeVideo(video, index);
        });

        const firstCopyOut = ease(clamp((progress - .23) / .06));
        const secondCopyIn = ease(clamp((progress - .33) / .04));
        const secondCopyOut = ease(clamp((progress - .56) / .05));
        const fireCopyIn = ease(clamp((progress - .66) / .04));
        const fireCopyOut = ease(clamp((progress - .88) / .04));
        const handCopyIn = ease(clamp((progress - .91) / .04));

        copies.one.style.setProperty('--copy-opacity', 1 - firstCopyOut);
        copies.one.style.setProperty('--copy-y', mix(0, -28, firstCopyOut) + 'px');
        copies.two.style.setProperty('--copy-opacity', secondCopyIn * (1 - secondCopyOut));
        copies.two.style.setProperty('--copy-y', mix(22, -22, secondCopyIn) + 'px');
        copies.fire.style.setProperty('--copy-opacity', fireCopyIn * (1 - fireCopyOut));
        copies.fire.style.setProperty('--copy-y', mix(22, -22, fireCopyIn) + 'px');
        copies.hand.style.setProperty('--copy-opacity', handCopyIn);
        copies.hand.style.setProperty('--copy-y', mix(22, 0, handCopyIn) + 'px');
        requestTick();
        monitorFilm();
    }

    function monitorFilm() {
        if (healthTimer || document.hidden || !state.some(item => item.visible)) return;
        healthTimer = window.setTimeout(() => {
            healthTimer = 0;
            videos.forEach((video, index) => {
                const item = state[index];
                if (!item.visible) return;
                if (video.seeking || !item.ready) item.stalledChecks++;
                else item.stalledChecks = 0;
                if (item.stalledChecks >= 3 && item.retries < 2) {
                    item.stalledChecks = 0;
                    item.retries++;
                    item.recovering = false;
                    if (item.retries === 2) { item.ready = false; video.load(); }
                    restoreVisibleFrame(video, index);
                }
            });
            monitorFilm();
        }, 1000);
    }

    function render(timestamp) {
        if (timestamp - lastFrameTime < minimumFrameInterval) {
            renderFrame = window.requestAnimationFrame(render);
            return;
        }

        lastFrameTime = timestamp;
        let moving = false;

        videos.forEach((video, index) => {
            const item = state[index];

            if (!item.visible) {
                item.current = item.target;
                return;
            }

            item.current += (item.target - item.current) * (reducedMotion ? 1 : .22);
            if (Math.abs(item.target - item.current) > .0005) moving = true;

            if (item.ready && item.visible && !video.seeking && Number.isFinite(video.duration)) {
                const targetTime = clamp(item.current, 0, .9995) * video.duration;
                if (Math.abs(video.currentTime - targetTime) > .04) {
                    try { video.currentTime = targetTime; }
                    catch (error) { item.ready = false; }
                }
            }
        });

        if (moving) {
            renderFrame = window.requestAnimationFrame(render);
        } else {
            ticking = false;
            renderFrame = 0;
        }
    }

    function queueTargetUpdate() {
        if (targetUpdateFrame) return;
        targetUpdateFrame = window.requestAnimationFrame(() => {
            targetUpdateFrame = 0;
            updateTargets();
        });
    }

    function suspendFilm() {
        if (renderFrame) window.cancelAnimationFrame(renderFrame);
        if (targetUpdateFrame) window.cancelAnimationFrame(targetUpdateFrame);
        window.clearTimeout(resumeTimer);
        window.clearTimeout(healthTimer);
        healthTimer = 0;
        renderFrame = 0;
        targetUpdateFrame = 0;
        resumeTimer = 0;
        ticking = false;
        lastFrameTime = 0;
    }

    function restoreVisibleFrame(video, index) {
        const item = state[index];
        if (!item.visible) return;

        const seekToScrollPosition = () => {
            item.recovering = false;
            if (document.hidden || !item.visible || !Number.isFinite(video.duration)) return;
            item.ready = true;
            item.current = item.target;
            const targetTime = clamp(item.target, 0, .9995) * video.duration;
            const nudge = Math.abs(video.currentTime - targetTime) < .002 ? .002 : 0;

            try {
                // Assigning currentTime again aborts stale seeks left behind when
                // iOS or Android suspends the media decoder while the phone is locked.
                video.currentTime = Math.min(targetTime + nudge, video.duration * .9995);
            } catch (error) {
                item.ready = false;
            }

            requestTick();
        };

        video.pause();
        // Metadata is enough to seek. Waiting for loadeddata here can deadlock on
        // iOS when preload="metadata": Safari often fetches the first frame only
        // after currentTime is assigned.
        if (video.readyState < HTMLMediaElement.HAVE_METADATA || !Number.isFinite(video.duration)) {
            if (item.recovering) return;
            item.ready = false;
            item.recovering = true;

            const resetRecovery = () => {
                item.recovering = false;
                video.removeEventListener('loadedmetadata', metadataReady);
                video.removeEventListener('error', resetRecovery);
            };
            const metadataReady = () => {
                resetRecovery();
                updateTargets();
                seekToScrollPosition();
            };

            video.addEventListener('loadedmetadata', metadataReady, { once: true });
            video.addEventListener('error', resetRecovery, { once: true });
            video.load();
        } else {
            seekToScrollPosition();
        }
    }

    function restoreFilm() {
        if (document.hidden) return;
        suspendFilm();
        state.forEach(item => { item.retries = 0; item.stalledChecks = 0; item.primed = false; });
        updateTargets();
        videos.forEach(restoreVisibleFrame);
    }

    function scheduleFilmRestore() {
        window.clearTimeout(resumeTimer);
        resumeTimer = window.setTimeout(restoreFilm, 80);
    }

    videos.forEach((video, index) => {
        video.pause();
        const markReady = () => {
            if (state[index].ready) return;
            state[index].ready = true;
            // Do not seek hidden clips: phones can exhaust their video decoders.
            updateTargets();
        };

        if (video.readyState >= HTMLMediaElement.HAVE_METADATA) {
            markReady();
        } else {
            video.addEventListener('loadedmetadata', markReady, { once: true });

        }

        video.addEventListener('loadedmetadata', () => {
            state[index].ready = Number.isFinite(video.duration);
            updateTargets();
        });
        video.addEventListener('error', () => {
            state[index].ready = false;
            if (playControl) playControl.hidden = false;
            monitorFilm();
        });
        video.addEventListener('seeked', function() {
            state[index].stalledChecks = 0;
            if (state[index].visible) requestTick();
        });
    });

    window.addEventListener('scroll', queueTargetUpdate, { passive: true });
    window.addEventListener('resize', queueTargetUpdate, { passive: true });
    window.addEventListener('pageshow', scheduleFilmRestore);
    window.addEventListener('pagehide', suspendFilm);
    window.addEventListener('focus', scheduleFilmRestore);
    window.addEventListener('orientationchange', scheduleFilmRestore);
    // The mobile lifecycle restores the saved scroll position after dynamic
    // content is ready. Re-sync the visible scrubbed clip at that final position,
    // then once more after the loading overlay has completed its transition.
    window.addEventListener('opiumbite:restore-complete', scheduleFilmRestore);
    window.addEventListener('opiumbite:loader-finished', scheduleFilmRestore);
    document.addEventListener('resume', scheduleFilmRestore);
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            suspendFilm();
        } else {
            scheduleFilmRestore();
        }
    });
    updateTargets();
});

// Typewriter effect function
function startTypewriterEffect(element, text) {
    element.textContent = '';
    element.classList.add('typing');
    
    let currentIndex = 0;
    
    function typeNextCharacter() {
        if (currentIndex < text.length) {
            element.textContent += text[currentIndex];
            currentIndex++;
            setTimeout(typeNextCharacter, 80); // 80ms delay between characters (faster)
        } else {
            // Typing complete
            element.classList.remove('typing');
            element.classList.add('typing-complete');
        }
    }
    
    // Start typing after a brief delay
    setTimeout(typeNextCharacter, 200);
}

// Enhanced scroll header functionality (keeps existing functionality)
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit to ensure loading animation completes
    setTimeout(() => {
        // Update active nav link based on scroll position
        function updateActiveNav(activeId) {
            if (!document.querySelector('.atelier-home')) return;
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
                link.removeAttribute('aria-current');
            });
            const activeLink = document.getElementById(activeId);
            if (activeLink) {
                activeLink.classList.add('active');
                activeLink.setAttribute('aria-current', activeId === 'home-link' ? 'page' : 'location');
            }
        }

        // Set up intersection observer to detect which section is in view
        const sections = {
            'home': 'home-link',
            'collections': 'collections-link'
        };

        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        };

        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const sectionId = entry.target.id;
                        if (sections[sectionId]) {
                            updateActiveNav(sections[sectionId]);
                        }
                    }
                });
            }, observerOptions);

            // Observe each section
            Object.keys(sections).forEach(sectionId => {
                const section = document.getElementById(sectionId);
                if (section) {
                    observer.observe(section);
                }
            });
        }

        // Set home as active by default
        updateActiveNav(location.hash === '#collections' ? 'collections-link' : 'home-link');

        // Add click event listeners to nav links for smooth scrolling
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', function(e) {
                const destination = new URL(this.href, window.location.href);
                const isCurrentPage = destination.pathname === window.location.pathname;
                const target = isCurrentPage && destination.hash
                    ? document.querySelector(destination.hash)
                    : null;

                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
                    history.pushState(null, '', destination.hash);
                }
            });
        });

        // Carousel functionality
        const carousel = document.getElementById('carousel');
        const items = document.querySelectorAll('.carousel-item');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        
        if (carousel && items.length > 0) {
            items.forEach(item => {
                carousel.appendChild(item.cloneNode(true));
            });
            
            const itemCount = items.length;
            let currentIndex = 0;
            let isAnimating = false;

            function getItemWidth() {
                return carousel.querySelector('.carousel-item').getBoundingClientRect().width;
            }
            
            function updateCarousel(animate = true) {
                if (isAnimating) return;
                isAnimating = true;
                
                if (animate) {
                    carousel.style.transition = 'transform 0.5s ease';
                } else {
                    carousel.style.transition = 'none';
                }
                
                carousel.style.transform = `translateX(-${currentIndex * getItemWidth()}px)`;
                
                setTimeout(() => {
                    isAnimating = false;
                    if (currentIndex >= itemCount) {
                        currentIndex = 0;
                        updateCarousel(false);
                    } else if (currentIndex < 0) {
                        currentIndex = itemCount - 1;
                        updateCarousel(false);
                    }
                    isAnimating = false;
                }, 500);
            }
            
            if (nextBtn) {
                nextBtn.addEventListener('click', function() {
                    if (isAnimating) return;
                    currentIndex++;
                    updateCarousel();
                });
            }
            
            if (prevBtn) {
                prevBtn.addEventListener('click', function() {
                    if (isAnimating) return;
                    currentIndex--;
                    updateCarousel();
                });
            }

            window.addEventListener('resize', function() {
                carousel.style.transition = 'none';
                carousel.style.transform = `translateX(-${currentIndex * getItemWidth()}px)`;
            }, { passive: true });
            
            updateCarousel(false);
        }
    }, 2000); // Wait 2 seconds for loading animation to potentially complete
});
