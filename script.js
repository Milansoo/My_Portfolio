// Navigation Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        }
    });

    // Text reveal animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observe all sections for animations
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Hero scroll button functionality
    const heroScroll = document.querySelector('.hero-scroll');
    if (heroScroll) {
        heroScroll.addEventListener('click', function() {
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                aboutSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    }

    // Project card interactions
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', function() {
            this.classList.toggle('flipped');
        });
    });

    // Skill items animation delay
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });

    // Form validation for contact forms
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const inputs = form.querySelectorAll('input[required], textarea[required]');
            let isValid = true;

            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('error');
                } else {
                    input.classList.remove('error');
                }
            });

            if (!isValid) {
                e.preventDefault();
                alert('Please fill in all required fields.');
            }
        });
    });

    // Typing effect for hero title
    const heroTitle = document.querySelector('.hero-title span');
    if (heroTitle) {
        const text = 'Milan Kuiry';
        heroTitle.textContent = '';
        let i = 0;

        function typeWriter() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 150);
            }
        }

        setTimeout(typeWriter, 1000);
    }

    // Parallax effect for hero background
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.hero::before');
        if (parallax) {
            const speed = scrolled * 0.5;
            parallax.style.transform = `translateY(${speed}px)`;
        }
    });

    // Copy email functionality
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const email = this.getAttribute('href').replace('mailto:', '');
            
            if (navigator.clipboard) {
                navigator.clipboard.writeText(email).then(() => {
                    showNotification('Email copied to clipboard!');
                });
            }
            
            // Still open email client
            window.location.href = this.getAttribute('href');
        });
    });

    // Notification system
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--primary-color);
            color: var(--bg-color);
            padding: 1rem 2rem;
            border-radius: 5px;
            z-index: 10000;
            animation: slideInRight 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Add CSS for notifications
    const notificationCSS = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;

    const style = document.createElement('style');
    style.textContent = notificationCSS;
    document.head.appendChild(style);

    // Loading screen
    // window.addEventListener('load', function() {
    //     const loader = document.createElement('div');
    //     loader.id = 'loader';
    //     loader.innerHTML = `
    //         <div class="loader-content">
    //             <div class="loader-spinner"></div>
    //             <p>Loading Portfolio...</p>
    //         </div>
    //     `;
    //     loader.style.cssText = `
    //         position: fixed;
    //         top: 0;
    //         left: 0;
    //         width: 100%;
    //         height: 100%;
    //         background: var(--bg-color);
    //         display: flex;
    //         justify-content: center;
    //         align-items: center;
    //         z-index: 9999;
    //         opacity: 1;
    //         transition: opacity 0.5s ease;
    //     `;

    //     const loaderContent = `
    //         .loader-content {
    //             text-align: center;
    //             color: var(--text-color);
    //         }
    //         .loader-spinner {
    //             width: 50px;
    //             height: 50px;
    //             border: 3px solid var(--border-color);
    //             border-top: 3px solid var(--primary-color);
    //             border-radius: 50%;
    //             animation: spin 1s linear infinite;
    //             margin: 0 auto 1rem;
    //         }
    //         @keyframes spin {
    //             0% { transform: rotate(0deg); }
    //             100% { transform: rotate(360deg); }
    //         }
    //     `;

    //     const loaderStyle = document.createElement('style');
    //     loaderStyle.textContent = loaderContent;
    //     document.head.appendChild(loaderStyle);
    //     document.body.appendChild(loader);

    //     setTimeout(() => {
    //         loader.style.opacity = '0';
    //         setTimeout(() => {
    //             document.body.removeChild(loader);
    //             document.head.removeChild(loaderStyle);
    //         }, 500);
    //     }, 1500);
    // });
});

class Carousel3D {
    constructor() {
        this.carousel = document.getElementById('carousel');
        this.cards = document.querySelectorAll('.card');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.playPauseBtn = document.getElementById('playPause');
        this.indicatorsContainer = document.getElementById('indicators');
        
        this.currentIndex = 0;
        this.totalCards = this.cards.length;
        this.isPlaying = true;
        this.autoplayInterval = null;
        this.isDragging = false;
        this.startX = 0;
        this.currentX = 0;
        this.startY = 0;
        this.currentY = 0;
        this.threshold = 50;
        this.isVerticalScroll = false;
        
        // Responsive settings
        this.isMobile = window.innerWidth <= 768;
        this.isTouch = 'ontouchstart' in window;
        
        this.init();
    }
    
    init() {
        this.setupCards();
        this.createIndicators();
        this.setupEventListeners();
        this.updateCarousel();
        this.startAutoplay();
        this.handleResize();
    }
    
    setupCards() {
        const angleStep = 360 / this.totalCards;
        const radius = this.isMobile ? 250 : 350;
        
        this.cards.forEach((card, index) => {
            const angle = angleStep * index;
            const radian = (angle * Math.PI) / 180;
            
            const x = Math.sin(radian) * radius;
            const z = Math.cos(radian) * radius;
            
            card.style.transform = `rotateY(${angle}deg) translateZ(${radius}px)`;
            card.dataset.index = index;
        });
    }
    
    createIndicators() {
        this.indicatorsContainer.innerHTML = '';
        for (let i = 0; i < this.totalCards; i++) {
            const indicator = document.createElement('div');
            indicator.className = 'indicator';
            if (i === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => this.goToSlide(i));
            indicator.setAttribute('aria-label', `Go to slide ${i + 1}`);
            indicator.setAttribute('role', 'button');
            indicator.setAttribute('tabindex', '0');
            this.indicatorsContainer.appendChild(indicator);
        }
    }
    
    setupEventListeners() {
        // Navigation buttons
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        this.playPauseBtn.addEventListener('click', () => this.toggleAutoplay());
        
        // Mouse drag events
        this.carousel.addEventListener('mousedown', (e) => this.startDrag(e));
        document.addEventListener('mousemove', (e) => this.drag(e));
        document.addEventListener('mouseup', () => this.endDrag());
        
        // Touch events with improved mobile handling
        this.carousel.addEventListener('touchstart', (e) => this.startDrag(e.touches[0]), { passive: false });
        document.addEventListener('touchmove', (e) => this.drag(e.touches[0]), { passive: false });
        document.addEventListener('touchend', () => this.endDrag());
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                this.prevSlide();
            }
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                this.nextSlide();
            }
            if (e.key === ' ') {
                e.preventDefault();
                this.toggleAutoplay();
            }
        });
        
        // Indicator keyboard navigation
        this.indicatorsContainer.addEventListener('keydown', (e) => {
            const indicators = Array.from(this.indicatorsContainer.querySelectorAll('.indicator'));
            const currentIndex = indicators.findIndex(ind => ind.classList.contains('active'));
            
            if (e.key === 'ArrowLeft' && currentIndex > 0) {
                e.preventDefault();
                this.goToSlide(currentIndex - 1);
                indicators[currentIndex - 1].focus();
            }
            if (e.key === 'ArrowRight' && currentIndex < indicators.length - 1) {
                e.preventDefault();
                this.goToSlide(currentIndex + 1);
                indicators[currentIndex + 1].focus();
            }
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                e.target.click();
            }
        });
        
        // Pause on hover (desktop only)
        if (!this.isTouch) {
            this.carousel.addEventListener('mouseenter', () => this.pauseAutoplay());
            this.carousel.addEventListener('mouseleave', () => {
                if (this.isPlaying) this.startAutoplay();
            });
        }
        
        // Window resize handler
        window.addEventListener('resize', () => this.handleResize());
        
        // Visibility change handler
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseAutoplay();
            } else if (this.isPlaying) {
                this.startAutoplay();
            }
        });
    }
    
    startDrag(e) {
        this.isDragging = true;
        this.startX = e.clientX || e.pageX;
        this.startY = e.clientY || e.pageY;
        this.isVerticalScroll = false;
        this.carousel.style.cursor = 'grabbing';
        this.pauseAutoplay();
        
        // Prevent text selection
        document.body.style.userSelect = 'none';
    }
    
    drag(e) {
        if (!this.isDragging) return;
        
        this.currentX = e.clientX || e.pageX;
        this.currentY = e.clientY || e.pageY;
        
        const deltaX = this.currentX - this.startX;
        const deltaY = this.currentY - this.startY;
        
        // Determine if this is a vertical scroll gesture
        if (!this.isVerticalScroll && Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 10) {
            this.isVerticalScroll = true;
            this.endDrag();
            return;
        }
        
        // Prevent vertical scrolling during horizontal drag
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            e.preventDefault();
        }
        
        // Add visual feedback during drag
        const dragRotation = deltaX * 0.3;
        const currentRotation = -(this.currentIndex * (360 / this.totalCards));
        this.carousel.style.transform = `rotateY(${currentRotation + dragRotation}deg)`;
    }
    
    endDrag() {
        if (!this.isDragging) return;
        
        this.isDragging = false;
        this.carousel.style.cursor = 'grab';
        document.body.style.userSelect = '';
        
        if (this.isVerticalScroll) {
            this.updateCarousel();
            return;
        }
        
        const deltaX = this.currentX - this.startX;
        const adjustedThreshold = this.isMobile ? 30 : this.threshold;
        
        if (Math.abs(deltaX) > adjustedThreshold) {
            if (deltaX > 0) {
                this.prevSlide();
            } else {
                this.nextSlide();
            }
        } else {
            this.updateCarousel();
        }
        
        // Resume autoplay after a delay
        if (this.isPlaying) {
            setTimeout(() => this.startAutoplay(), 1500);
        }
    }
    
    nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.totalCards;
        this.updateCarousel();
        this.announceSlideChange();
    }
    
    prevSlide() {
        this.currentIndex = (this.currentIndex - 1 + this.totalCards) % this.totalCards;
        this.updateCarousel();
        this.announceSlideChange();
    }
    
    goToSlide(index) {
        this.currentIndex = index;
        this.updateCarousel();
        this.announceSlideChange();
    }
    
    updateCarousel() {
        const angle = -(this.currentIndex * (360 / this.totalCards));
        this.carousel.style.transform = `rotateY(${angle}deg)`;
        
        // Update active card
        this.cards.forEach((card, index) => {
            card.classList.toggle('active', index === this.currentIndex);
            
            // Update ARIA attributes
            card.setAttribute('aria-hidden', index !== this.currentIndex);
            if (index === this.currentIndex) {
                card.setAttribute('aria-current', 'true');
            } else {
                card.removeAttribute('aria-current');
            }
        });
        
        // Update indicators
        const indicators = this.indicatorsContainer.querySelectorAll('.indicator');
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentIndex);
            indicator.setAttribute('aria-pressed', index === this.currentIndex);
        });
    }
    
    startAutoplay() {
        if (this.autoplayInterval) return;
        
        const interval = this.isMobile ? 4000 : 3000;
        this.autoplayInterval = setInterval(() => {
            this.nextSlide();
        }, interval);
    }
    
    pauseAutoplay() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
            this.autoplayInterval = null;
        }
    }
    
    toggleAutoplay() {
        this.isPlaying = !this.isPlaying;
        
        if (this.isPlaying) {
            this.playPauseBtn.textContent = '⏸️';
            this.playPauseBtn.setAttribute('aria-label', 'Pause autoplay');
            this.startAutoplay();
        } else {
            this.playPauseBtn.textContent = '▶️';
            this.playPauseBtn.setAttribute('aria-label', 'Start autoplay');
            this.pauseAutoplay();
        }
    }
    
    handleResize() {
        const wasMobile = this.isMobile;
        this.isMobile = window.innerWidth <= 768;
        
        // Recalculate card positions if mobile state changed
        if (wasMobile !== this.isMobile) {
            this.setupCards();
            this.updateCarousel();
        }
        
        // Restart autoplay with new interval if needed
        if (this.isPlaying) {
            this.pauseAutoplay();
            this.startAutoplay();
        }
    }
    
    announceSlideChange() {
        // For screen readers
        const currentCard = this.cards[this.currentIndex];
        const title = currentCard.querySelector('h3').textContent;
        
        // Create or update live region for announcements
        let liveRegion = document.getElementById('carousel-live-region');
        if (!liveRegion) {
            liveRegion = document.createElement('div');
            liveRegion.id = 'carousel-live-region';
            liveRegion.setAttribute('aria-live', 'polite');
            liveRegion.setAttribute('aria-atomic', 'true');
            liveRegion.style.position = 'absolute';
            liveRegion.style.left = '-10000px';
            liveRegion.style.width = '1px';
            liveRegion.style.height = '1px';
            liveRegion.style.overflow = 'hidden';
            document.body.appendChild(liveRegion);
        }
        
        liveRegion.textContent = `Slide ${this.currentIndex + 1} of ${this.totalCards}: ${title}`;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Carousel3D();
});

// Prevent context menu on long press for mobile
document.addEventListener('contextmenu', (e) => {
    if (e.target.closest('.carousel')) {
        e.preventDefault();
    }
});

// Handle orientation change
window.addEventListener('orientationchange', () => {
    setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
    }, 100);
});

// Preload images for better performance
window.addEventListener('load', () => {
    const images = document.querySelectorAll('.card img');
    images.forEach(img => {
        if (img.dataset.src) {
            img.src = img.dataset.src;
        }
    });
});