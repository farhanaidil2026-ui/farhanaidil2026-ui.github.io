// ===== TRON LEGACY PORTFOLIO JAVASCRIPT =====

// DOM Elements
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const contactForm = document.getElementById('contactForm');
const skillProgressBars = document.querySelectorAll('.skill-progress');
const scrollIndicator = document.querySelector('.scroll-indicator');
const heroTitle = document.querySelector('.hero-title');
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
        menuToggle.style.boxShadow = '0 0 15px rgba(0, 255, 255, 0.8)';
    } else {
        lines[0].style.transform = 'none';
        lines[1].style.opacity = '1';
        lines[2].style.transform = 'none';
        menuToggle.style.boxShadow = 'none';
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
        menuToggle.style.boxShadow = 'none';
    });
});

// ===== CONTACT FORM SUBMISSION =====
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const subject = contactForm.querySelector('input[placeholder="SUBJECT"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        // Create glowing effect on button
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Show sending animation
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> SENDING...';
        submitBtn.disabled = true;
        submitBtn.style.boxShadow = '0 0 30px rgba(0, 255, 255, 0.8)';
        
        // Simulate sending delay (in real app, this would be an API call)
        setTimeout(() => {
            // Show success message with Tron-style alert
            showTronAlert(`THANK YOU, ${name.toUpperCase()}! YOUR MESSAGE HAS BEEN TRANSMITTED. I'LL RESPOND SOON.`);
            
            // Reset the form
            contactForm.reset();
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            submitBtn.style.boxShadow = '0 0 15px rgba(0, 255, 255, 0.5)';
            
            // Create particle effect
            createFormParticles(submitBtn);
        }, 1500);
    });
}

// ===== TRON-STYLE ALERT =====
function showTronAlert(message) {
    // Remove any existing alert
    const existingAlert = document.querySelector('.tron-alert');
    if (existingAlert) existingAlert.remove();
    
    // Create alert element
    const alertDiv = document.createElement('div');
    alertDiv.className = 'tron-alert';
    alertDiv.innerHTML = `
        <div class="alert-content">
            <i class="fas fa-check-circle"></i>
            <p>${message}</p>
            <button class="alert-close"><i class="fas fa-times"></i></button>
        </div>
    `;
    
    // Add to page
    document.body.appendChild(alertDiv);
    
    // Add CSS for alert
    const style = document.createElement('style');
    style.textContent = `
        .tron-alert {
            position: fixed;
            top: 100px;
            right: 20px;
            background: rgba(0, 0, 0, 0.95);
            border: 2px solid #00ffff;
            border-radius: 8px;
            padding: 20px;
            z-index: 10000;
            box-shadow: 0 0 30px rgba(0, 255, 255, 0.5);
            transform: translateX(120%);
            animation: slideIn 0.5s forwards, glowPulse 2s infinite alternate;
            max-width: 400px;
            backdrop-filter: blur(10px);
            font-family: 'Orbitron', monospace;
        }
        
        @keyframes slideIn {
            to { transform: translateX(0); }
        }
        
        @keyframes glowPulse {
            0% { box-shadow: 0 0 20px rgba(0, 255, 255, 0.5); }
            100% { box-shadow: 0 0 40px rgba(0, 255, 255, 0.8); }
        }
        
        .alert-content {
            display: flex;
            align-items: center;
            gap: 15px;
            color: white;
        }
        
        .alert-content i.fa-check-circle {
            color: #00ff00;
            font-size: 1.5rem;
            text-shadow: 0 0 10px #00ff00;
        }
        
        .alert-content p {
            margin: 0;
            flex: 1;
            color: white;
            font-family: 'Exo 2', sans-serif;
            font-size: 0.9rem;
            letter-spacing: 0.5px;
        }
        
        .alert-close {
            background: transparent;
            border: none;
            color: #00ffff;
            cursor: pointer;
            font-size: 1rem;
            transition: all 0.3s;
        }
        
        .alert-close:hover {
            color: white;
            transform: scale(1.2);
            text-shadow: 0 0 10px #00ffff;
        }
    `;
    document.head.appendChild(style);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.style.transform = 'translateX(120%)';
            setTimeout(() => {
                if (alertDiv.parentNode) alertDiv.remove();
                if (style.parentNode) style.remove();
            }, 500);
        }
    }, 5000);
    
    // Close button functionality
    alertDiv.querySelector('.alert-close').addEventListener('click', () => {
        alertDiv.style.transform = 'translateX(120%)';
        setTimeout(() => {
            if (alertDiv.parentNode) alertDiv.remove();
            if (style.parentNode) style.remove();
        }, 500);
    });
}

// ===== PARTICLE EFFECT FOR FORM SUBMISSION =====
function createFormParticles(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const colors = ['#00ffff', '#ff6600']; // Tron blue and orange
    
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'form-particle';
        
        // Random properties
        const size = Math.random() * 6 + 4;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 100 + 50;
        const distance = Math.random() * 80 + 40;
        
        // Set initial position
        particle.style.position = 'fixed';
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.backgroundColor = color;
        particle.style.borderRadius = '50%';
        particle.style.left = `${centerX}px`;
        particle.style.top = `${centerY}px`;
        particle.style.zIndex = '10000';
        particle.style.pointerEvents = 'none';
        particle.style.boxShadow = `0 0 10px ${color}`;
        
        document.body.appendChild(particle);
        
        // Animate particle
        const animation = particle.animate([
            { 
                transform: 'translate(0, 0) scale(1)',
                opacity: 1 
            },
            { 
                transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0)`,
                opacity: 0 
            }
        ], {
            duration: 1000,
            easing: 'cubic-bezier(0.22, 0.61, 0.36, 1)'
        });
        
        // Remove particle after animation
        animation.onfinish = () => {
            if (particle.parentNode) particle.remove();
        };
    }
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
                
                // Add glow effect
                skillBar.parentElement.classList.add('animated');
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
        navbar.style.backdropFilter = 'blur(15px)';
        navbar.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.7)';
        navbar.style.borderBottomColor = 'rgba(0, 255, 255, 0.5)';
    } else {
        navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.5)';
        navbar.style.borderBottomColor = 'rgba(0, 255, 255, 0.3)';
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
            
            // Add glow effect to active link
            item.style.textShadow = '0 0 15px rgba(0, 255, 255, 0.9)';
            item.style.color = '#00ffff';
        } else {
            item.style.textShadow = 'none';
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

// ===== HERO TITLE GLOW ANIMATION =====
if (heroTitle) {
    // Simple white glow animation for Tron style
    let glowIntensity = 0;
    let increasing = true;
    
    setInterval(() => {
        if (increasing) {
            glowIntensity += 0.5;
            if (glowIntensity >= 20) increasing = false;
        } else {
            glowIntensity -= 0.5;
            if (glowIntensity <= 10) increasing = true;
        }
        
        heroTitle.style.textShadow = `0 0 ${glowIntensity}px rgba(255, 255, 255, 0.8)`;
    }, 100);
}

// ===== GENERATE ADDITIONAL TRON-STYLE FLOATING SHAPES =====
function generateFloatingShapes() {
    const floatingShapesContainer = document.querySelector('.floating-shapes');
    const colors = ['rgba(0, 255, 255, 0.05)', 'rgba(255, 102, 0, 0.05)'];
    
    // Create grid lines
    for (let i = 0; i < 20; i++) {
        const gridLine = document.createElement('div');
        gridLine.className = `grid-line grid-line-${i}`;
        
        if (i % 2 === 0) {
            // Horizontal lines
            gridLine.style.position = 'fixed';
            gridLine.style.width = '100%';
            gridLine.style.height = '1px';
            gridLine.style.top = `${i * 5}%`;
            gridLine.style.left = '0';
            gridLine.style.background = 'linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.1), transparent)';
            gridLine.style.zIndex = '1';
            gridLine.style.opacity = '0.1';
        } else {
            // Vertical lines
            gridLine.style.position = 'fixed';
            gridLine.style.width = '1px';
            gridLine.style.height = '100%';
            gridLine.style.left = `${i * 5}%`;
            gridLine.style.top = '0';
            gridLine.style.background = 'linear-gradient(180deg, transparent, rgba(0, 255, 255, 0.1), transparent)';
            gridLine.style.zIndex = '1';
            gridLine.style.opacity = '0.1';
        }
        
        floatingShapesContainer.appendChild(gridLine);
    }
    
    // Add more Tron-style geometric shapes
    for (let i = 0; i < 10; i++) {
        const shape = document.createElement('div');
        shape.className = `tron-shape tron-shape-${i}`;
        
        // Random properties
        const size = Math.random() * 60 + 20;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const top = Math.random() * 100;
        const left = Math.random() * 100;
        const duration = Math.random() * 40 + 20;
        const delay = Math.random() * 10;
        
        // Set shape properties
        shape.style.width = `${size}px`;
        shape.style.height = `${size}px`;
        shape.style.backgroundColor = 'transparent';
        shape.style.border = '1px solid rgba(0, 255, 255, 0.1)';
        shape.style.top = `${top}%`;
        shape.style.left = `${left}%`;
        shape.style.opacity = '0.05';
        shape.style.position = 'absolute';
        shape.style.zIndex = '1';
        shape.style.boxShadow = '0 0 5px rgba(0, 255, 255, 0.1)';
        
        // Random shape type
        const shapeType = Math.floor(Math.random() * 4);
        if (shapeType === 0) {
            // Square
            shape.style.borderRadius = '0';
            shape.style.transform = `rotate(${Math.random() * 45}deg)`;
        } else if (shapeType === 1) {
            // Circle
            shape.style.borderRadius = '50%';
        } else if (shapeType === 2) {
            // Triangle
            shape.style.clipPath = 'polygon(50% 0%, 0% 100%, 100% 100%)';
            shape.style.border = 'none';
            shape.style.borderLeft = '1px solid rgba(0, 255, 255, 0.1)';
            shape.style.borderRight = '1px solid rgba(0, 255, 255, 0.1)';
            shape.style.borderBottom = '1px solid rgba(0, 255, 255, 0.1)';
        } else {
            // Diamond
            shape.style.clipPath = 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)';
        }
        
        // Set animation
        shape.style.animation = `tronFloat ${duration}s infinite ease-in-out ${delay}s`;
        
        // Add to container
        floatingShapesContainer.appendChild(shape);
    }
}

// Add Tron float animation to CSS
const tronFloatStyle = document.createElement('style');
tronFloatStyle.textContent = `
    @keyframes tronFloat {
        0%, 100% {
            transform: translate(0, 0) rotate(0deg);
        }
        25% {
            transform: translate(15px, -20px) rotate(5deg);
        }
        50% {
            transform: translate(-10px, 15px) rotate(-5deg);
        }
        75% {
            transform: translate(20px, 10px) rotate(3deg);
        }
    }
`;
document.head.appendChild(tronFloatStyle);

// Generate additional floating shapes
window.addEventListener('load', generateFloatingShapes);

// ===== TYPING EFFECT FOR ROLE =====
const roleText = document.querySelector('.role-text');
if (roleText) {
    const originalText = roleText.textContent;
    const texts = ['UPRISING DATA ENGINEER', 'UTM STUDENT', 'FUTURE PROFESSOR', 'CREATIVE PROBLEM-SOLVER'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isPaused = false;
    
    function typeEffect() {
        if (isPaused) return;
        
        const currentText = texts[textIndex];
        
        if (!isDeleting && charIndex <= currentText.length) {
            roleText.textContent = currentText.substring(0, charIndex);
            charIndex++;
            setTimeout(typeEffect, 100);
        } else if (isDeleting && charIndex >= 0) {
            roleText.textContent = currentText.substring(0, charIndex);
            charIndex--;
            setTimeout(typeEffect, 50);
        } else {
            isDeleting = !isDeleting;
            
            if (!isDeleting) {
                textIndex = (textIndex + 1) % texts.length;
            }
            
            // Pause at the end of each cycle
            isPaused = true;
            setTimeout(() => {
                isPaused = false;
                typeEffect();
            }, 1500);
            
            return;
        }
    }
    
    // Start typing effect after a delay
    setTimeout(typeEffect, 2000);
}

// ===== ADD KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', (e) => {
    // Ctrl + / to toggle menu
    if (e.ctrlKey && e.key === '/') {
        e.preventDefault();
        menuToggle.click();
    }
    
    // Escape to close menu
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        const lines = document.querySelectorAll('.hamburger .line');
        lines[0].style.transform = 'none';
        lines[1].style.opacity = '1';
        lines[2].style.transform = 'none';
        menuToggle.style.boxShadow = 'none';
    }
    
    // Number keys 1-5 to navigate sections
    if (e.key >= '1' && e.key <= '5') {
        e.preventDefault();
        const sections = ['home', 'about', 'skills', 'projects', 'contact'];
        const index = parseInt(e.key) - 1;
        
        if (sections[index]) {
            document.getElementById(sections[index]).scrollIntoView({
                behavior: 'smooth'
            });
        }
    }
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

// ===== ADD TRON-STYLE CURSOR EFFECT =====
document.addEventListener('DOMContentLoaded', () => {
    // Create cursor glow
    const cursorGlow = document.createElement('div');
    cursorGlow.className = 'cursor-glow';
    document.body.appendChild(cursorGlow);
    
    // Add CSS for cursor glow
    const cursorStyle = document.createElement('style');
    cursorStyle.textContent = `
        .cursor-glow {
            position: fixed;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(0,255,255,0.8) 0%, rgba(0,255,255,0) 70%);
            pointer-events: none;
            z-index: 10000;
            transform: translate(-50%, -50%);
            mix-blend-mode: screen;
            transition: width 0.3s, height 0.3s, opacity 0.3s;
        }
        
        .cursor-glow.active {
            width: 40px;
            height: 40px;
            background: radial-gradient(circle, rgba(0,255,255,0.9) 0%, rgba(0,255,255,0) 70%);
        }
        
        .cursor-glow.hidden {
            opacity: 0;
        }
    `;
    document.head.appendChild(cursorStyle);
    
    // Hide cursor on touch devices
    if ('ontouchstart' in window) {
        cursorGlow.classList.add('hidden');
    }
    
    // Move cursor glow with mouse
    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = `${e.clientX}px`;
        cursorGlow.style.top = `${e.clientY}px`;
    });
    
    // Enlarge on clickable elements
    document.querySelectorAll('a, button, .project-card, .trait-box, .stat-card, .social-link, .project-link').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorGlow.classList.add('active');
        });
        
        el.addEventListener('mouseleave', () => {
            cursorGlow.classList.remove('active');
        });
    });
});

// ===== INITIALIZE WITH NAVBAR BACKGROUND =====
window.dispatchEvent(new Event('scroll'));
highlightNavLink();

// ===== ADD PAGE LOAD ANIMATION =====
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
        
        // Add Tron-style loading completion effect
        const loadingEffect = document.createElement('div');
        loadingEffect.className = 'loading-complete';
        loadingEffect.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(45deg, #00ffff, #ff6600, #00ffff);
            z-index: 10001;
            opacity: 0.1;
            pointer-events: none;
            animation: fadeOut 1s forwards;
        `;
        
        const keyframes = `
            @keyframes fadeOut {
                from { opacity: 0.1; }
                to { opacity: 0; }
            }
        `;
        
        const styleSheet = document.createElement('style');
        styleSheet.textContent = keyframes;
        document.head.appendChild(styleSheet);
        
        document.body.appendChild(loadingEffect);
        
        // Remove after animation
        setTimeout(() => {
            if (loadingEffect.parentNode) loadingEffect.remove();
            if (styleSheet.parentNode) styleSheet.remove();
        }, 1000);
    }, 100);
});

// ===== TRON DISC INTERACTIVITY =====
const tronDisc = document.querySelector('.tron-disc');
if (tronDisc) {
    tronDisc.addEventListener('mouseenter', () => {
        const rings = document.querySelectorAll('.disc-ring');
        rings.forEach(ring => {
            const currentSpeed = parseFloat(getComputedStyle(ring).animationDuration);
            ring.style.animationDuration = `${currentSpeed / 2}s`;
        });
    });
    
    tronDisc.addEventListener('mouseleave', () => {
        const rings = document.querySelectorAll('.disc-ring');
        rings.forEach(ring => {
            const currentSpeed = parseFloat(getComputedStyle(ring).animationDuration);
            ring.style.animationDuration = `${currentSpeed * 2}s`;
        });
    });
}

// ===== ADD TRON-LEGACY STYLE CONSOLE LOG =====
console.log('%c🚀 WELCOME TO AIDIL FARHAN\'S TRON LEGACY PORTFOLIO!', 'color: #00ffff; font-size: 18px; font-weight: bold; text-shadow: 0 0 10px #00ffff;');
console.log('%c👨‍💻 DEVELOPER: MUHAMMAD AIDIL FARHAN', 'color: #ffffff; font-size: 14px;');
console.log('%c🎓 UTM FIRST YEAR STUDENT | UPRISING DATA ENGINEER', 'color: #ff6600; font-size: 12px;');
console.log('%c🔵🟠 TRON LEGACY COLOR SCHEME: BLUE & ORANGE', 'background: linear-gradient(90deg, #00ffff, #ff6600); color: black; padding: 5px; border-radius: 3px; font-weight: bold;');
console.log('%c⚡ PORTFOLIO INITIALIZED... ALL SYSTEMS OPERATIONAL', 'color: #00ff00; font-size: 11px;');
