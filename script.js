// Form handling
/*const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Here you would typically send the form data to a server
        console.log('Form submitted:', { name, email, message });
        
        // Clear form
        contactForm.reset();
        
        // Show success message
        alert('Thank you for your message! I will get back to you soon.');
    });
};*/

// DOM Elements
const navbar = document.querySelector('.navbar');
const menuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelectorAll('.nav-link');

// Variables for scroll handling
let lastScroll = 0;
const scrollThreshold = 50;

// Toggle menu function
function toggleMenu() {
    document.body.classList.toggle('menu-open');
}

// Close menu function
function closeMenu() {
    document.body.classList.remove('menu-open');
}

// Event Listeners
menuBtn.addEventListener('click', toggleMenu);

// Close menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
});

// Handle scroll behavior
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Only trigger if we've scrolled more than the threshold
    if (Math.abs(currentScroll - lastScroll) > scrollThreshold) {
        // Scrolling down
        if (currentScroll > lastScroll && currentScroll > 100) {
            navbar.classList.add('nav-hidden');
        }
        // Scrolling up
        else {
            navbar.classList.remove('nav-hidden');
        }
        lastScroll = currentScroll;
    }
});

// Close menu on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeMenu();
    }
});

// Set active link based on current page
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
    }
});

// Handle touch events for better mobile experience
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
});

document.addEventListener('touchmove', (e) => {
    if (document.body.classList.contains('menu-open')) {
        e.preventDefault();
    }
}, { passive: false });

document.addEventListener('touchend', (e) => {
    touchEndY = e.changedTouches[0].clientY;
    
    // If swipe up is detected while menu is open, close it
    if (document.body.classList.contains('menu-open') && touchStartY - touchEndY > 50) {
        closeMenu();
    }
});



// Project slide
const projectsContainer = document.querySelector('.projects');
const prevButton = document.querySelector('.nav-button.prev');
const nextButton = document.querySelector('.nav-button.next');
        
let scrollPosition = 0;
const cardWidth = 300 + 24; // card width + gap
const totalCards = document.querySelectorAll('.project-card').length;
const containerWidth = document.querySelector('.projects-wrapper').offsetWidth;
const maxScroll = (totalCards * cardWidth) - containerWidth;

function updateNavButtons() {
    prevButton.classList.toggle('hidden', scrollPosition <= 0);
    nextButton.classList.toggle('hidden', scrollPosition >= maxScroll);
}

prevButton.addEventListener('click', () => {
    scrollPosition = Math.max(scrollPosition - cardWidth, 0);
    projectsContainer.style.transform = `translateX(-${scrollPosition}px)`;
    updateNavButtons();
});

nextButton.addEventListener('click', () => {
    scrollPosition = Math.min(scrollPosition + cardWidth, maxScroll);
    projectsContainer.style.transform = `translateX(-${scrollPosition}px)`;
    updateNavButtons();
});

// Initialize button states
updateNavButtons();

// Handle touch events for mobile swipe
let touchStartX = 0;
let touchEndX = 0;

projectsContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

projectsContainer.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0 && scrollPosition < maxScroll) {
            // Swipe left
            nextButton.click();
        } else if (diff < 0 && scrollPosition > 0) {
            // Swipe right
            prevButton.click();
        }
    }
}

// Handle window resize
window.addEventListener('resize', () => {
    // Recalculate dimensions
    const newContainerWidth = document.querySelector('.projects-wrapper').offsetWidth;
    const newMaxScroll = (totalCards * cardWidth) - newContainerWidth;
    
    // Adjust scroll position if needed
    scrollPosition = Math.min(scrollPosition, newMaxScroll);
    projectsContainer.style.transform = `translateX(-${scrollPosition}px)`;
    updateNavButtons();
});