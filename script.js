// Wait for the page to fully load
document.addEventListener('DOMContentLoaded', function() {
    console.log('ePortfolio script loaded successfully!');
    
    // Create imperfection elements for background
    createImperfections();
    
    // Handle form submission
    setupForm();
    
    // Add hover effects to interactive elements
    setupHoverEffects();
    
    // Add scroll animations
    setupScrollAnimations();
});

function createImperfections() {
    const imperfections = [
        { className: 'imp-1', color: '#6495ED', top: '10%', left: '5%', size: 80, delay: '0s' },
        { className: 'imp-2', color: '#8AF1B6', top: '20%', right: '8%', size: 100, delay: '2s' },
        { className: 'imp-3', color: '#CCCCFF', top: '65%', left: '10%', size: 60, delay: '4s' }
    ];
    
    imperfections.forEach(imp => {
        const div = document.createElement('div');
        div.className = `imperfection ${imp.className}`;
        div.style.position = 'fixed';
        div.style.width = `${imp.size}px`;
        div.style.height = `${imp.size}px`;
        div.style.borderRadius = '50%';
        div.style.backgroundColor = imp.color;
        div.style.opacity = '0.05';
        div.style.zIndex = '-1';
        div.style.animation = `float 8s ease-in-out ${imp.delay} infinite`;
        
        if (imp.top) div.style.top = imp.top;
        if (imp.left) div.style.left = imp.left;
        if (imp.right) div.style.right = imp.right;
        
        document.body.appendChild(div);
    });
}

function setupForm() {
    const contactForm = document.getElementById('messageForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (name && email && subject && message) {
                // Simple validation
                if (!isValidEmail(email)) {
                    alert('Please enter a valid email address.');
                    return;
                }
                
                // Show success message
                alert(`Thank you, ${name}! Your message has been sent.\nI'll get back to you at ${email} as soon as possible.`);
                
                // Reset form
                contactForm.reset();
                
                // Add visual feedback
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                submitBtn.style.backgroundColor = '#8AF1B6';
                submitBtn.style.color = '#333';
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.backgroundColor = '';
                    submitBtn.style.color = '';
                }, 2000);
            } else {
                alert('Please fill in all required fields.');
            }
        });
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function setupHoverEffects() {
    // Project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.borderTopColor = '#6495ED';
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.borderTopColor = '#8AF1B6';
            this.style.transform = 'translateY(0)';
        });
    });
    
    // About cards
    const aboutCards = document.querySelectorAll('.about-card');
    aboutCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.borderTopColor = '#6495ED';
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.borderTopColor = '#8AF1B6';
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Skill chips
    const skillChips = document.querySelectorAll('.skill-chip');
    skillChips.forEach(chip => {
        chip.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.boxShadow = '0 4px 8px rgba(100, 149, 237, 0.3)';
        });
        
        chip.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

function setupScrollAnimations() {
    // Add animation to sections when they come into view
    const sections = document.querySelectorAll('.section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeIn 0.8s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        observer.observe(section);
    });
    
    // Animate profile image on home page
    const profileImg = document.querySelector('.profile-img');
    if (profileImg) {
        profileImg.style.animation = 'float 6s ease-in-out infinite';
    }
}
