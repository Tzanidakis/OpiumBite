// Loading screen animations
document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.getElementById('loading-screen');
    const biteButton = document.getElementById('bite-button');
    const mainContent = document.getElementById('main-content');
    const openingVideo = document.getElementById('opening-video');
    const introSessionKey = 'opiumBiteIntroShownV2';
    let openingCaption = '[make them bite your dust]';
    let introAlreadyShown = false;

    try {
        if (localStorage.getItem('opiumBiteLanguage') === 'el') {
            openingCaption = '[κάν’ τους να φάνε τη σκόνη σου]';
        }
    } catch (error) {
        // Keep the English opening caption when preferences are unavailable.
    }

    try {
        introAlreadyShown = sessionStorage.getItem(introSessionKey) === 'true';
    } catch (error) {
        // If session storage is unavailable, showing the intro is the safe fallback.
    }

    if (introAlreadyShown) {
        loadingScreen.style.display = 'none';
        mainContent.style.visibility = 'visible';
        document.body.style.overflow = 'auto';
        return;
    }

    // Mark this tab's visit immediately so returning to Home does not replay the intro.
    try {
        sessionStorage.setItem(introSessionKey, 'true');
    } catch (error) {
        // The opening sequence still works when storage is blocked.
    }

    // Show the opening sequence on the first homepage load in this tab.
    loadingScreen.style.display = 'flex';
    loadingScreen.classList.remove('slide-up');
    mainContent.style.visibility = 'hidden';

    function playOpeningVideo() {
        if (!openingVideo || loadingScreen.classList.contains('slide-up')) return;
        openingVideo.muted = true;
        openingVideo.defaultMuted = true;
        openingVideo.setAttribute('muted', '');
        const playAttempt = openingVideo.play();
        if (playAttempt) playAttempt.catch(() => {});
    }

    // iOS can reject autoplay in Low Power Mode and after a phone unlock. A touch
    // is a valid user gesture, so retry immediately when the visitor interacts.
    playOpeningVideo();
    loadingScreen.addEventListener('touchstart', playOpeningVideo, { passive: true });
    loadingScreen.addEventListener('pointerdown', playOpeningVideo, { passive: true });
    window.addEventListener('focus', playOpeningVideo);
    window.addEventListener('pageshow', playOpeningVideo);
    document.addEventListener('visibilitychange', function() {
        if (!document.hidden) playOpeningVideo();
    });
    
    // Disable scrolling during loading animation
    document.body.style.overflow = 'hidden';
    
    // Start the loading sequence
    setTimeout(() => {
        biteButton.classList.add('fade-in');
        setTimeout(() => {
            startTypewriterEffect(biteButton, openingCaption);
        }, 700);
    }, 500);
    
    // Handle click on "BITE ME" button
    biteButton.addEventListener('click', function() {
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
                document.body.style.overflow = 'auto';
                
                // Remove loading screen completely after animation
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
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
    
    // Optional: Auto-hide loading screen after 10 seconds if user doesn't click
    setTimeout(() => {
        if (!loadingScreen.classList.contains('slide-up')) {
            biteButton.click();
        }
    }, 20000); // 20 seconds timeout
});

// Scroll-controlled homepage film. Kept separate from the opening-screen flow so
// it initializes whether the intro is shown or skipped for a returning visitor.
document.addEventListener('DOMContentLoaded', function() {
    const film = document.querySelector('.hero-film');
    if (!film) return;

    const videos = Array.from(film.querySelectorAll('.hero-film__video'));
    const copies = {
        one: film.querySelector('.hero-film__copy--one'),
        two: film.querySelector('.hero-film__copy--two'),
        three: film.querySelector('.hero-film__copy--three'),
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
        seekTimer: 0
    }));
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
        || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    const minimumFrameInterval = 1000 / 30;
    let playbackFallback = false;
    let filmInView = false;
    let ticking = false;
    let lastFrameTime = 0;
    let renderFrame = 0;
    let targetUpdateFrame = 0;
    let resumeTimer = 0;

    const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
    const mix = (start, end, amount) => start + (end - start) * amount;
    const ease = value => value * value * (3 - (2 * value));

    function playVideo(video) {
        video.muted = true;
        video.defaultMuted = true;
        video.playsInline = true;
        const playAttempt = video.play();
        if (playAttempt) playAttempt.catch(() => {});
    }

    function syncPlaybackVideos() {
        if (!playbackFallback) return;
        videos.forEach((video, index) => {
            if (filmInView && state[index].visible && !document.hidden) {
                playVideo(video);
            } else {
                video.pause();
            }
        });
    }

    function enablePlaybackFallback() {
        if (playbackFallback) return;
        playbackFallback = true;
        film.classList.add('uses-playback-fallback');
        state.forEach(item => {
            window.clearTimeout(item.seekTimer);
            item.seekTimer = 0;
            item.current = item.target;
        });
        videos.forEach(video => {
            video.loop = true;
            video.muted = true;
            video.defaultMuted = true;
            video.setAttribute('muted', '');
            video.setAttribute('playsinline', '');
        });
        syncPlaybackVideos();
    }

    function watchSeek(video, item) {
        window.clearTimeout(item.seekTimer);
        item.seekTimer = window.setTimeout(() => {
            if (video.seeking) enablePlaybackFallback();
        }, 700);
    }

    function requestTick() {
        if (ticking) return;
        ticking = true;
        renderFrame = window.requestAnimationFrame(render);
    }

    function updateTargets() {
        const viewport = window.innerHeight;
        const rect = film.getBoundingClientRect();
        filmInView = rect.bottom > 0 && rect.top < viewport;
        const travel = Math.max(1, rect.height - viewport);
        const progress = clamp(-rect.top / travel);

        const blendOne = ease(clamp((progress - .23) / .04));
        const blendTwo = ease(clamp((progress - .48) / .04));
        const blendThree = ease(clamp((progress - .73) / .04));
        const clipProgress = [
            clamp(progress / .27),
            clamp((progress - .23) / .29),
            clamp((progress - .48) / .29),
            clamp((progress - .73) / .23) * .88
        ];

        state.forEach((item, index) => {
            item.target = reducedMotion ? Math.round(clipProgress[index]) : clipProgress[index];
        });

        const videoOpacities = [
            1 - blendOne,
            blendOne * (1 - blendTwo),
            blendTwo * (1 - blendThree),
            blendThree
        ];

        videos.forEach((video, index) => {
            const opacity = videoOpacities[index];
            state[index].visible = opacity > .001;
            video.style.setProperty('--video-opacity', opacity);
            video.classList.toggle('is-visible', state[index].visible);
        });

        syncPlaybackVideos();

        const firstCopyOut = ease(clamp((progress - .16) / .05));
        const secondCopyIn = ease(clamp((progress - .255) / .035));
        const secondCopyOut = ease(clamp((progress - .41) / .05));
        const thirdCopyIn = ease(clamp((progress - .505) / .035));
        const thirdCopyOut = ease(clamp((progress - .66) / .05));
        const fireCopyIn = ease(clamp((progress - .755) / .035));
        const fireCopyOut = ease(clamp((progress - .94) / .015));
        const handCopyIn = ease(clamp((progress - .955) / .015));

        copies.one.style.setProperty('--copy-opacity', 1 - firstCopyOut);
        copies.one.style.setProperty('--copy-y', mix(0, -28, firstCopyOut) + 'px');
        copies.two.style.setProperty('--copy-opacity', secondCopyIn * (1 - secondCopyOut));
        copies.two.style.setProperty('--copy-y', mix(22, -22, secondCopyIn) + 'px');
        copies.three.style.setProperty('--copy-opacity', thirdCopyIn * (1 - thirdCopyOut));
        copies.three.style.setProperty('--copy-y', mix(22, -22, thirdCopyIn) + 'px');
        copies.fire.style.setProperty('--copy-opacity', fireCopyIn * (1 - fireCopyOut));
        copies.fire.style.setProperty('--copy-y', mix(22, -22, fireCopyIn) + 'px');
        copies.hand.style.setProperty('--copy-opacity', handCopyIn);
        copies.hand.style.setProperty('--copy-y', mix(22, 0, handCopyIn) + 'px');
        requestTick();
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

            if (playbackFallback) {
                item.current = item.target;
                return;
            }

            item.current += (item.target - item.current) * (reducedMotion ? 1 : .22);
            if (Math.abs(item.target - item.current) > .0005) moving = true;

            if (item.ready && item.visible && !video.seeking && Number.isFinite(video.duration)) {
                const targetTime = clamp(item.current, 0, .9995) * video.duration;
                if (Math.abs(video.currentTime - targetTime) > .04) {
                    try {
                        video.currentTime = targetTime;
                        watchSeek(video, item);
                    } catch (error) {
                        enablePlaybackFallback();
                    }
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
        renderFrame = 0;
        targetUpdateFrame = 0;
        resumeTimer = 0;
        ticking = false;
        lastFrameTime = 0;
        state.forEach(item => {
            window.clearTimeout(item.seekTimer);
            item.seekTimer = 0;
        });
        if (playbackFallback) videos.forEach(video => video.pause());
    }

    function restoreVisibleFrame(video, index) {
        const item = state[index];
        if (!item.visible) return;

        if (playbackFallback) {
            if (filmInView) playVideo(video);
            return;
        }

        const seekToScrollPosition = () => {
            item.recovering = false;
            if (!Number.isFinite(video.duration)) return;
            item.ready = true;
            item.current = item.target;
            const targetTime = clamp(item.target, 0, .9995) * video.duration;
            const nudge = Math.abs(video.currentTime - targetTime) < .002 ? .002 : 0;

            try {
                // Assigning currentTime again aborts stale seeks left behind when
                // iOS or Android suspends the media decoder while the phone is locked.
                video.currentTime = Math.min(targetTime + nudge, video.duration * .9995);
                watchSeek(video, item);
            } catch (error) {
                // A later loadeddata event will retry if the decoder is not ready yet.
            }

            requestTick();
        };

        video.pause();
        if (video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) {
            if (item.recovering) return;
            item.ready = false;
            item.recovering = true;
            video.addEventListener('loadeddata', seekToScrollPosition, { once: true });
            video.addEventListener('error', function resetRecovery() {
                item.recovering = false;
            }, { once: true });
            video.load();
        } else {
            seekToScrollPosition();
        }
    }

    function restoreFilm() {
        if (document.hidden) return;
        suspendFilm();
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
            if (Number.isFinite(video.duration)) video.currentTime = Math.min(.01, video.duration);
            updateTargets();
        };

        if (video.readyState >= HTMLMediaElement.HAVE_METADATA) {
            markReady();
        } else {
            video.addEventListener('loadedmetadata', markReady, { once: true });
            video.addEventListener('error', markReady, { once: true });
        }

        video.addEventListener('seeked', function() {
            window.clearTimeout(state[index].seekTimer);
            state[index].seekTimer = 0;
            if (state[index].visible) requestTick();
        });
    });

    if (isIOS) enablePlaybackFallback();

    document.addEventListener('touchstart', syncPlaybackVideos, { passive: true });
    document.addEventListener('pointerdown', syncPlaybackVideos, { passive: true });

    window.addEventListener('scroll', queueTargetUpdate, { passive: true });
    window.addEventListener('resize', queueTargetUpdate, { passive: true });
    window.addEventListener('pageshow', scheduleFilmRestore);
    window.addEventListener('pagehide', suspendFilm);
    window.addEventListener('focus', scheduleFilmRestore);
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
        // Make logo clickable to scroll to hero section
        const logo = document.getElementById('logo');
        if (logo) {
            logo.addEventListener('click', function() {
                document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
                updateActiveNav('home-link');
            });
        }

        // Update active nav link based on scroll position
        function updateActiveNav(activeId) {
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
            });
            const activeLink = document.getElementById(activeId);
            if (activeLink) {
                activeLink.classList.add('active');
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
        updateActiveNav('home-link');

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
                    target.scrollIntoView({ behavior: 'smooth' });
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
                    currentIndex++;
                    updateCarousel();
                });
            }
            
            if (prevBtn) {
                prevBtn.addEventListener('click', function() {
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
