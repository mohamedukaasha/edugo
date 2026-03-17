document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navbar = document.querySelector('.navbar');
    if (menuToggle && navbar) {
        menuToggle.addEventListener('click', () => {
            navbar.classList.toggle('active');
            if (navbar.classList.contains('active')) {
                menuToggle.innerHTML = '<i data-lucide="x"></i>';
            } else {
                menuToggle.innerHTML = '<i data-lucide="menu"></i>';
            }
            lucide.createIcons();
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Simple scroll effect for navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = 'var(--shadow-lg)';
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            navbar.style.top = '1rem';
        } else {
            navbar.style.boxShadow = 'var(--shadow-sm)';
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.85)';
            navbar.style.top = '1.5rem';
        }
    });

    // Scroll Animation Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.section-header, .feature-card, .course-card, .analytics-card, .hero-content > *, .hero-visual, .about-grid > *, .cta-container > *, .footer-column, .community-stat-item, .testimonials > div > div > div, .story-large, .faq-minimal-item, .blog-card, .achievement-card');
    
    animatedElements.forEach((el) => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });

    // FAQ Accordion Minimal
    const faqItems = document.querySelectorAll('.faq-minimal-item');
    faqItems.forEach(item => {
        const toggle = item.querySelector('.faq-toggle');
        toggle.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other items for a clean experience
            faqItems.forEach(i => i.classList.remove('active'));
            
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Success Story Navigation
    const stories = document.querySelectorAll('.story-large');
    const prevBtn = document.querySelector('.nav-btn.prev');
    const nextBtn = document.querySelector('.nav-btn.next');
    let currentStoryIndex = 0;

    if (stories.length > 0 && prevBtn && nextBtn) {
        const updateStories = (newIndex) => {
            stories[currentStoryIndex].classList.remove('active');
            currentStoryIndex = newIndex;
            stories[currentStoryIndex].classList.add('active');
        };

        nextBtn.addEventListener('click', () => {
            let nextIndex = (currentStoryIndex + 1) % stories.length;
            updateStories(nextIndex);
        });

        prevBtn.addEventListener('click', () => {
            let prevIndex = (currentStoryIndex - 1 + stories.length) % stories.length;
            updateStories(prevIndex);
        });
    }
});
