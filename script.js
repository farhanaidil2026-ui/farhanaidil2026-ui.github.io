// ===== CLEAN BLACK & ORANGE PORTFOLIO JAVASCRIPT =====

// DOM Elements
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const contactForm = document.getElementById('contactForm');
const skillProgressBars = document.querySelectorAll('.skill-progress');
const scrollIndicator = document.querySelector('.scroll-indicator');
const currentYearElement = document.getElementById('current-year');

// ===== SET CURRENT YEAR IN FOOTER =====
if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
}

// ===== MOBILE MENU TOGGLE =====
menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const lines = document.querySelectorAll('.hamburger .line');
    
    // Animate hamburger to X
    if (navLinks.classList.contains('active')) {
        lines[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        lines[1].style.opacity = '0';
        lines[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        lines[0].style.transform = 'none';
        lines[1].style.opacity = '1';
        lines[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const lines = document.querySelectorAll('.hamburger .line');
        lines[0].style.transform = 'none';
        lines[1].style.opacity = '1';
        lines[2].style.transform = 'none';
    });
});

// ===== CONTACT FORM SUBMISSION =====
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const subject = contactForm.querySelector('input[placeholder="Subject"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        // Create button effect
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Show sending animation
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate sending delay (in real app, this would be an API call)
        setTimeout(() => {
            // Show success message
            alert(`Thank you, ${name}! Your message has been sent. I'll get back to you soon.`);
            
            // Reset the form
            contactForm.reset();
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

// ===== ANIMATE SKILL BARS ON SCROLL =====
const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px'
};

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillBar = entry.target;
            const targetWidth = skillBar.getAttribute('data-width');
            
            // Reset width to 0
            skillBar.style.width = '0%';
            
            // Trigger reflow to restart animation
            void skillBar.offsetWidth;
            
            // Animate to target width
            setTimeout(() => {
                skillBar.style.width = `${targetWidth}%`;
                skillBar.style.transition = 'width 1.5s ease';
            }, 100);
            
            // Unobserve after animation
            skillObserver.unobserve(skillBar);
        }
    });
}, observerOptions);

// Observe each skill bar
skillProgressBars.forEach(bar => {
    skillObserver.observe(bar);
});

// ===== NAVBAR BACKGROUND ON SCROLL =====
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.98)';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
        navbar.style.boxShadow = 'none';
    }
    
    // Hide scroll indicator when scrolled
    if (scrollIndicator && window.scrollY > 100) {
        scrollIndicator.style.opacity = '0';
        scrollIndicator.style.pointerEvents = 'none';
    } else if (scrollIndicator) {
        scrollIndicator.style.opacity = '1';
        scrollIndicator.style.pointerEvents = 'auto';
    }
});

// ===== ACTIVE NAV LINK HIGHLIGHTING =====
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

function highlightNavLink() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
            item.style.color = '#ff6600';
        } else {
            item.style.color = '';
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

// ===== ANIMATE ELEMENTS ON SCROLL =====
const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            
            // Add delay for staggered animations
            if (entry.target.classList.contains('stat-card')) {
                const index = Array.from(entry.target.parentNode.children).indexOf(entry.target);
                entry.target.style.animationDelay = `${index * 0.1}s`;
            }
            
            if (entry.target.classList.contains('project-card')) {
                const index = Array.from(entry.target.parentNode.children).indexOf(entry.target);
                entry.target.style.animationDelay = `${index * 0.15}s`;
            }
            
            // Unobserve after animation
            animateOnScroll.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
});

// Observe elements to animate
document.querySelectorAll('.stat-card, .project-card, .trait-box, .edu-card, .skill-category').forEach(el => {
    animateOnScroll.observe(el);
});

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// ===== INITIALIZE =====
window.dispatchEvent(new Event('scroll'));
highlightNavLink();

// ===== ADD CONSOLE LOG =====
console.log('🚀 Welcome to Aidil Farhan\'s Portfolio!');
console.log('🎨 Clean Black & Orange Design');
console.log('👨‍💻 Developer: Muhammad Aidil Farhan');
console.log('🎓 UTM First Year Student | Uprising Data Engineer');
