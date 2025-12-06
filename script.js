document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Generic Scroll Reveal Animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                scrollObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Targets to animate
    const animatedElements = document.querySelectorAll('.program-card, .section-padding h2, .about-text, .about-image');
    animatedElements.forEach(el => {
        // el.style.opacity = '0'; // Removed opacity hiding to prevent issues
        el.classList.remove('fade-in-up');
        scrollObserver.observe(el);
    });

    // Specific Impact Counter Animation logic (keep existing but improved)
    const counters = document.querySelectorAll('.counter-item h3');
    const speed = 200;

    const animateCounters = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText.replace('+', '').replace(',', ''); // handle commas if any

            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc) + '+';
                setTimeout(animateCounters, 20);
            } else {
                counter.innerText = target + '+';
            }
        });
    };

    // Observer for counters
    const counterSection = document.querySelector('.impact-counter');
    if (counterSection) {
        new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 }).observe(counterSection);
    }
});
