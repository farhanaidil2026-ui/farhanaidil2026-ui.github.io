// ===== DYNAMIC BLACK & ORANGE PORTFOLIO JAVASCRIPT =====

// DOM Elements
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const contactForm = document.getElementById('contactForm');
const skillProgressBars = document.querySelectorAll('.skill-progress');
const scrollIndicator = document.querySelector('.scroll-indicator');
const currentYearElement = document.getElementById('current-year');
const pageLoader = document.querySelector('.page-loader');

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
        
        // Add pulse animation to button
        submitBtn.style.animation = 'pulse 1s infinite';
        
        // Simulate sending delay
        setTimeout(() => {
            // Show success message
            showNotification(`Thank you, ${name}! Your message has been sent. I'll get back to you soon.`);
            
            // Reset the form
            contactForm.reset();
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            submitBtn.style.animation = '';
        }, 1500);
    });
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message) {
    // Remove any existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) existingNotification.remove();
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
            <button class="notification-close"><i class="fas fa-times"></i></button>
        </div>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Add CSS for notification
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 100px;
            right: 20px;
            background-color: #222222;
            border-left: 4px solid #ff6600;
            border-radius: 8px;
            padding: 15px 20px;
            z-index: 10000;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            transform: translateX(120%);
            animation: slideIn 0.5s forwards, fadeOut 0.5s forwards 4.5s;
            max-width: 400px;
        }
        
        @keyframes slideIn {
            to { transform: translateX(0); }
        }
        
        @keyframes fadeOut {
            to { opacity: 0; }
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 10px;
            color: #ffffff;
        }
        
        .notification-content i.fa-check-circle {
            color: #ff6600;
        }
        
        .notification-close {
            background: transparent;
            border: none;
            color: #aaaaaa;
            cursor: pointer;
            margin-left: 10px;
        }
        
        .notification-close:hover {
            color: #ff6600;
        }
    `;
    document.head.appendChild(style);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) notification.remove();
        if (style.parentNode) style.remove();
    }, 5000);
    
    // Close button functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.remove();
        style.remove();
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
                skillBar.style.transition = 'width 1.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
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
        navbar.style.borderBottomColor = 'rgba(255, 102, 0, 0.5)';
    } else {
        navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
        navbar.style.boxShadow = 'none';
        navbar.style.borderBottomColor = 'rgba(51, 51, 51, 1)';
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

// ===== CREATE PROFILE PARTICLES =====
function createProfileParticles() {
    const particlesContainer = document.querySelector('.profile-particles');
    
    // Create 12 particles in a circle
    for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Position particles in a circle
        const angle = (i / 12) * Math.PI * 2;
        const radius = 180;
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);
        
        particle.style.left = `calc(50% + ${x}px)`;
        particle.style.top = `calc(50% + ${y}px)`;
        
        // Add animation with different speeds
        const duration = 15 + i;
        particle.style.animation = `particleOrbit ${duration}s linear infinite`;
        
        particlesContainer.appendChild(particle);
    }
}

// ===== CREATE FLOATING SHAPES =====
function createFloatingShapes() {
    const floatingShapesContainer = document.querySelector('.floating-shapes');
    
    // Create 8 floating shapes
    for (let i = 1; i <= 8; i++) {
        const shape = document.createElement('div');
        shape.className = `floating-shape shape-${i}`;
        
        // Random properties
        const size = Math.random() * 80 + 40;
        const top = Math.random() * 100;
        const left = Math.random() * 100;
        const duration = Math.random() * 20 + 15;
        const delay = Math.random() * 5;
        
        // Set shape properties
        shape.style.width = `${size}px`;
        shape.style.height = `${size}px`;
        shape.style.top = `${top}%`;
        shape.style.left = `${left}%`;
        shape.style.opacity = '0.1';
        shape.style.border = '1px solid #ff6600';
        shape.style.position = 'absolute';
        shape.style.borderRadius = Math.random() > 0.5 ? '50%' : '10px';
        shape.style.animation = `float ${duration}s infinite ease-in-out ${delay}s`;
        
        if (i > 4) {
            shape.style.transform = `rotate(${Math.random() * 45}deg)`;
        }
        
        floatingShapesContainer.appendChild(shape);
    }
}

// ===== INITIALIZE CURSOR FOLLOWER =====
function initCursorFollower() {
    const cursor = document.querySelector('.cursor-follower');
    
    // Hide cursor on touch devices
    if ('ontouchstart' in window) {
        cursor.style.display = 'none';
        document.body.style.cursor = 'auto';
        return;
    }
    
    // Move cursor with mouse
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    });
    
    // Enlarge on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .trait-box, .stat-card, .social-link, .project-link, .skill-item, .skill-category');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('active');
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('active');
        });
    });
    
    // Click effect
    document.addEventListener('click', () => {
        cursor.classList.add('click');
        setTimeout(() => {
            cursor.classList.remove('click');
        }, 300);
    });
}

// ===== INITIALIZE SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.stat-card, .project-card, .skill-category, .trait-box, .edu-card');
    
    animatedElements.forEach((element, index) => {
        element.classList.add('animate-on-scroll');
        element.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Special effect for trait boxes - stagger them
                if (entry.target.classList.contains('trait-box')) {
                    setTimeout(() => {
                        entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease, background-color 0.3s, color 0.3s';
                    }, 100);
                }
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => observer.observe(element));
}

// ===== TYPEWRITER EFFECT FOR HERO ROLE =====
function initTypewriterEffect() {
    const roleText = document.querySelector('.hero-role');
    const originalText = roleText.textContent;
    const texts = [
        'Uprising Data Engineer',
        'UTM Student',
        'Future Professor',
        'Creative Problem-Solver',
        'Detail-oriented Developer'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isPaused = false;
    
    function typeWriter() {
        if (isPaused) return;
        
        const currentText = texts[textIndex];
        
        if (!isDeleting && charIndex <= currentText.length) {
            roleText.textContent = currentText.substring(0, charIndex);
            charIndex++;
            setTimeout(typeWriter, 100);
        } else if (isDeleting && charIndex >= 0) {
            roleText.textContent = currentText.substring(0, charIndex);
            charIndex--;
            setTimeout(typeWriter, 50);
        } else {
            isDeleting = !isDeleting;
            
            if (!isDeleting) {
                textIndex = (textIndex + 1) % texts.length;
            }
            
            // Pause at the end of each cycle
            isPaused = true;
            setTimeout(() => {
                isPaused = false;
                typeWriter();
            }, 1500);
            
            return;
        }
    }
    
    // Start after a delay
    setTimeout(typeWriter, 2000);
}

// ===== INTERACTIVE SKILL HOVER EFFECTS =====
function initSkillHoverEffects() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const progressBar = item.querySelector('.skill-progress');
            const width = progressBar.getAttribute('data-width');
            
            // Animate the width change with bounce effect
            progressBar.style.width = `${width}%`;
            progressBar.style.transition = 'width 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
            
            // Add a subtle bounce to the percentage
            const percentage = item.querySelector('.skill-info span:last-child');
            percentage.style.transform = 'scale(1.2)';
            percentage.style.color = '#ff6600';
            
            setTimeout(() => {
                percentage.style.transform = 'scale(1)';
                percentage.style.color = '';
            }, 300);
        });
    });
}

// ===== PARALLAX EFFECT FOR BACKGROUND =====
function initParallaxEffect() {
    const gridBackground = document.querySelector('.grid-background');
    
    window.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 10;
        const y = (e.clientY / window.innerHeight - 0.5) * 10;
        
        gridBackground.style.transform = `translate(${x}px, ${y}px)`;
    });
}

// ===== KEYBOARD NAVIGATION =====
function initKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        // Add visual feedback for arrow keys
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            document.body.style.transform = 'translateY(-5px)';
            setTimeout(() => {
                document.body.style.transform = 'translateY(0)';
                document.body.style.transition = 'transform 0.3s';
            }, 300);
        }
        
        // Number keys to navigate sections
        if (e.key >= '1' && e.key <= '5') {
            e.preventDefault();
            const sections = ['home', 'about', 'skills', 'projects', 'contact'];
            const index = parseInt(e.key) - 1;
            
            if (sections[index]) {
                const section = document.getElementById(sections[index]);
                
                // Add visual feedback
                section.style.outline = '2px solid #ff6600';
                setTimeout(() => {
                    section.style.outline = 'none';
                }, 1000);
                
                // Scroll to section
                section.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
}

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

// ===== REMOVE PAGE LOADER =====
function removePageLoader() {
    setTimeout(() => {
        pageLoader.style.opacity = '0';
        setTimeout(() => {
            pageLoader.remove();
            
            // Initialize animations after page loads
            initAnimations();
        }, 500);
    }, 1000);
}

// ===== INITIALIZE ALL ANIMATIONS =====
function initAnimations() {
    createProfileParticles();
    createFloatingShapes();
    initCursorFollower();
    initScrollAnimations();
    initTypewriterEffect();
    initSkillHoverEffects();
    initParallaxEffect();
    initKeyboardNavigation();
    
    // Initialize with navbar background
    window.dispatchEvent(new Event('scroll'));
    highlightNavLink();
    
    console.log('🎬 All animations initialized!');
    console.log('🚀 Portfolio is now dynamically moving!');
}

// ===== PAGE LOAD =====
window.addEventListener('load', removePageLoader);

// ===== FALLBACK IF PAGE ALREADY LOADED =====
if (document.readyState === 'complete') {
    removePageLoader();
}
