// Navigation scroll behavior
let lastScroll = 0;
const navbar = document.querySelector('.navbar');
const scrollThreshold = 50; // Minimum scroll amount before showing/hiding

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

// Form handling
const contactForm = document.getElementById('contact-form');

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
}