// Loading screen animations
document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.getElementById('loading-screen');
    const loadingLogo = document.getElementById('loading-logo');
    const biteButton = document.getElementById('bite-button');
    const mainContent = document.getElementById('main-content');
    
    // Check if user has already seen the animation in this session
    const hasSeenAnimation = sessionStorage.getItem('hasSeenLoadingAnimation');
    
    if (hasSeenAnimation) {
        // Skip animation - show main content immediately
        loadingScreen.style.display = 'none';
        mainContent.style.visibility = 'visible';
        return; // Exit early, don't set up animation
    }
    
    // Disable scrolling during loading animation
    document.body.style.overflow = 'hidden';
    
    // Initially hide main content
    mainContent.style.visibility = 'hidden';
    
    // Create floating blobs
    createFloatingBlobs();
    
    // Start the loading sequence
    setTimeout(() => {
        // Show floating blobs
        showFloatingBlobs();
        
        // Fade in the logo
        loadingLogo.classList.add('fade-in');
        
        // Show the "BITE ME" button and start typewriter after logo appears
        setTimeout(() => {
            biteButton.classList.add('fade-in');
            // Start typewriter effect after button fades in
            setTimeout(() => {
                startTypewriterEffect(biteButton, '[make them bite your dust]');
            }, 1000); // Wait for fade-in to complete
        }, 2000); // 2 seconds after logo starts fading in (increased delay)
        
    }, 500); // Half second delay before starting
    
    // Handle click on "BITE ME" button
    biteButton.addEventListener('click', function() {
        // Only allow click if typing is complete
        if (!biteButton.classList.contains('typing-complete')) {
            return;
        }
        
        // Mark that user has seen the animation
        sessionStorage.setItem('hasSeenLoadingAnimation', 'true');
        
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
            // Mark that user has seen the animation
            sessionStorage.setItem('hasSeenLoadingAnimation', 'true');
            biteButton.click();
        }
    }, 20000); // 20 seconds timeout
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
            
            // Auto-advance carousel
            setInterval(() => {
                currentIndex++;
                updateCarousel();
            }, 5000);
        }
    }, 2000); // Wait 2 seconds for loading animation to potentially complete
});