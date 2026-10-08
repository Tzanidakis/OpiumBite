// Loading screen animations
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger-menu');
    const navigation = document.getElementById('primary-navigation');

    if (hamburger && navigation) {
        function setMenuOpen(isOpen) {
            navigation.classList.toggle('active', isOpen);
            document.body.classList.toggle('menu-open', isOpen);
            hamburger.setAttribute('aria-expanded', String(isOpen));
            hamburger.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
            hamburger.textContent = isOpen ? 'close' : 'menu';
        }

        hamburger.addEventListener('click', function() {
            setMenuOpen(!navigation.classList.contains('active'));
        });

        navigation.addEventListener('click', function(event) {
            if (event.target.closest('a')) {
                setMenuOpen(false);
            }
        });

        document.addEventListener('click', function(event) {
            if (!event.target.closest('#main-header')) {
                setMenuOpen(false);
            }
        });

        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                setMenuOpen(false);
                hamburger.focus();
            }
        });

        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                setMenuOpen(false);
            }
        });
    }

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

    // Explicitly start playback for the initial visit.
    // The video is muted and inline, which keeps this compatible with autoplay rules.
    if (openingVideo) {
        openingVideo.muted = true;
        openingVideo.currentTime = 0;
        openingVideo.play().catch(() => {
            // Some browsers wait until the page becomes visible before allowing playback.
            document.addEventListener('visibilitychange', function playWhenVisible() {
                if (!document.hidden) {
                    openingVideo.play().catch(() => {});
                    document.removeEventListener('visibilitychange', playWhenVisible);
                }
            });
        });
    }
    
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
    const state = videos.map(() => ({ target: 0, current: 0, ready: false }));
    let ticking = false;

    const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
    const mix = (start, end, amount) => start + (end - start) * amount;
    const ease = value => value * value * (3 - (2 * value));

    function requestTick() {
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(render);
    }

    function updateTargets() {
        const viewport = window.innerHeight;
        const rect = film.getBoundingClientRect();
        const travel = Math.max(1, rect.height - viewport);
        const progress = clamp(-rect.top / travel);

        const blendOne = ease(clamp((progress - .23) / .04));
        const blendTwo = ease(clamp((progress - .48) / .04));
        const blendThree = ease(clamp((progress - .73) / .04));
        const clipProgress = [
            clamp(progress / .27),
            clamp((progress - .23) / .29),
            clamp((progress - .48) / .29),
            clamp((progress - .73) / .21)
        ];

        state.forEach((item, index) => {
            item.target = reducedMotion ? Math.round(clipProgress[index]) : clipProgress[index];
        });

        videos[0].style.setProperty('--video-opacity', 1 - blendOne);
        videos[1].style.setProperty('--video-opacity', blendOne * (1 - blendTwo));
        videos[2].style.setProperty('--video-opacity', blendTwo * (1 - blendThree));
        videos[3].style.setProperty('--video-opacity', blendThree);

        const firstCopyOut = ease(clamp((progress - .16) / .05));
        const secondCopyIn = ease(clamp((progress - .255) / .035));
        const secondCopyOut = ease(clamp((progress - .41) / .05));
        const thirdCopyIn = ease(clamp((progress - .505) / .035));
        const thirdCopyOut = ease(clamp((progress - .66) / .05));
        const fireCopyIn = ease(clamp((progress - .755) / .035));
        const fireCopyOut = ease(clamp((progress - .85) / .035));
        const handCopyIn = ease(clamp((progress - .865) / .03));

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

    function render() {
        let moving = false;

        videos.forEach((video, index) => {
            const item = state[index];
            item.current += (item.target - item.current) * (reducedMotion ? 1 : .22);
            if (Math.abs(item.target - item.current) > .0005) moving = true;

            if (item.ready && Number.isFinite(video.duration)) {
                const targetTime = clamp(item.current, 0, .9995) * video.duration;
                if (Math.abs(video.currentTime - targetTime) > .01) {
                    video.currentTime = targetTime;
                }
            }
        });

        if (moving) window.requestAnimationFrame(render);
        else ticking = false;
    }

    videos.forEach((video, index) => {
        video.pause();
        const markReady = () => {
            state[index].ready = true;
            if (Number.isFinite(video.duration)) video.currentTime = Math.min(.01, video.duration);
            updateTargets();
        };
        video.addEventListener('loadedmetadata', markReady, { once: true });
        video.addEventListener('error', markReady, { once: true });
        video.load();
    });

    window.addEventListener('scroll', updateTargets, { passive: true });
    window.addEventListener('resize', updateTargets, { passive: true });
    window.addEventListener('pageshow', updateTargets);
    updateTargets();
});

// Functions for floating blobs
function createFloatingBlobs() {
    const loadingScreen = document.getElementById('loading-screen');
    
    // Create 3 floating blobs
    for (let i = 1; i <= 3; i++) {
        const blob = document.createElement('div');
        blob.className = `floating-blob blob-${i}`;
        blob.id = `blob-${i}`;
        loadingScreen.appendChild(blob);
    }
}

function showFloatingBlobs() {
    // Show blobs with staggered timing for more natural appearance
    setTimeout(() => {
        document.getElementById('blob-1').classList.add('visible');
    }, 200);
    
    setTimeout(() => {
        document.getElementById('blob-2').classList.add('visible');
    }, 800);
    
    setTimeout(() => {
        document.getElementById('blob-3').classList.add('visible');
    }, 1400);
}

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
            'collections': 'collections-link',
            'custom': 'custom-link'
        };

        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        };

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

        // Set home as active by default
        updateActiveNav('home-link');

        // Add click event listeners to nav links for smooth scrolling
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', function(e) {
                if (this.hash && this.hash !== '#') {
                    e.preventDefault();
                    const target = document.querySelector(this.hash);
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            });
        });

        // Shrinking header on scroll
        const header = document.getElementById('main-header');
        let lastScrollPosition = 0;

        window.addEventListener('scroll', function() {
            const currentScrollPosition = window.pageYOffset;
            
            // Only trigger if scrolled more than 50px
            if (Math.abs(currentScrollPosition - lastScrollPosition) > 50) {
                if (currentScrollPosition > lastScrollPosition && currentScrollPosition > 100) {
                    // Scrolling down
                    header.classList.add('shrink');
                } else {
                    // Scrolling up
                    if (currentScrollPosition < 100) {
                        header.classList.remove('shrink');
                    } else {
                        header.classList.add('shrink');
                    }
                }
                lastScrollPosition = currentScrollPosition;
            }
        });

        // Hero Carousel functionality (Mobile Only)
        const heroCarousel = document.querySelector('.hero-carousel');
        if (heroCarousel) {
            const slides = document.querySelectorAll('.carousel-slide');
            const indicators = document.querySelectorAll('.indicator');
            
            let currentSlide = 0;
            let slideInterval;
            
            function showSlide(index) {
                // Hide all slides
                slides.forEach(slide => slide.classList.remove('active'));
                indicators.forEach(indicator => indicator.classList.remove('active'));
                
                // Show current slide
                slides[index].classList.add('active');
                indicators[index].classList.add('active');
                
                currentSlide = index;
            }
            
            function nextSlide() {
                currentSlide = (currentSlide + 1) % slides.length;
                showSlide(currentSlide);
            }
            
            function startAutoSlide() {
                slideInterval = setInterval(nextSlide, 4000); // Change slide every 4 seconds
            }
            
            function stopAutoSlide() {
                clearInterval(slideInterval);
            }
            
            // Indicator click handlers
            indicators.forEach((indicator, index) => {
                indicator.addEventListener('click', () => {
                    showSlide(index);
                    stopAutoSlide();
                    startAutoSlide(); // Restart auto-slide
                });
            });
            
            // Start with first slide and auto-slide
            showSlide(0);
            startAutoSlide();
            
            // Pause auto-slide on hover
            heroCarousel.addEventListener('mouseenter', stopAutoSlide);
            heroCarousel.addEventListener('mouseleave', startAutoSlide);
        }

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
            const itemWidth = 100 / (itemCount / 2);
            let currentIndex = 0;
            let isAnimating = false;
            
            function updateCarousel(animate = true) {
                if (isAnimating) return;
                isAnimating = true;
                
                if (animate) {
                    carousel.style.transition = 'transform 0.5s ease';
                } else {
                    carousel.style.transition = 'none';
                }
                
                carousel.style.transform = `translateX(-${currentIndex * itemWidth}%)`;
                
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
            
            updateCarousel(false);
        }
    }, 2000); // Wait 2 seconds for loading animation to potentially complete
});
