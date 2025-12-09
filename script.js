// Main JavaScript for Teni Scribes Website

// DOM Elements
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
const themeToggle = document.getElementById('themeToggle');
const darkModeStyle = document.getElementById('dark-mode-style');
const newsletterForm = document.getElementById('newsletterForm');
const formSuccess = document.getElementById('formSuccess');
const videoShareBtn = document.getElementById('video-share');
const currentYearSpan = document.getElementById('currentYear');

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
    
    // Initialize mobile menu toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // Initialize dark mode toggle
    if (themeToggle) {
        // Check for saved theme preference or respect OS preference
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            enableDarkMode();
        }
        
        themeToggle.addEventListener('click', toggleDarkMode);
    }
    
    // Initialize newsletter form
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }
    
    // Initialize video share button
    if (videoShareBtn) {
        videoShareBtn.addEventListener('click', shareVideo);
    }
    
    // Close mobile menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mainNav.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });
    
    // Add active class to current page in navigation
    highlightCurrentPage();
    
    // Initialize lazy loading for images
    initLazyLoading();
    
    // Add scroll effect to header
    window.addEventListener('scroll', handleHeaderScroll);
});

// Mobile Menu Toggle
function toggleMobileMenu() {
    menuToggle.classList.toggle('active');
    mainNav.classList.toggle('active');
    
    // Animate hamburger menu
    const spans = menuToggle.querySelectorAll('span');
    if (menuToggle.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
}

// Dark Mode Toggle
function toggleDarkMode() {
    if (document.body.classList.contains('dark-mode')) {
        disableDarkMode();
    } else {
        enableDarkMode();
    }
}

function enableDarkMode() {
    document.body.classList.add('dark-mode');
    darkModeStyle.disabled = false;
    localStorage.setItem('theme', 'dark');
}

function disableDarkMode() {
    document.body.classList.remove('dark-mode');
    darkModeStyle.disabled = true;
    localStorage.setItem('theme', 'light');
}

// Newsletter Form Handler
function handleNewsletterSubmit(e) {
    e.preventDefault();
    
    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    
    // In a real implementation, you would send this data to your backend
    // For now, we'll simulate a successful submission
    console.log('Newsletter signup:', { name, email });
    
    // Show success message
    newsletterForm.style.display = 'none';
    formSuccess.style.display = 'flex';
    
    // Reset form
    newsletterForm.reset();
    
    // In a real implementation, you would connect to an email service
    // like Mailchimp, ConvertKit, etc.
    
    // For demo purposes, log the subscription
    logSubscription(name, email);
}

function logSubscription(name, email) {
    // This is where you would integrate with your email service
    // Example with a fictional API endpoint:
    /*
    fetch('https://api.yourservice.com/subscribe', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name,
            email: email,
            list: 'teni-scribbles-newsletter'
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Subscription successful:', data);
    })
    .catch(error => {
        console.error('Subscription error:', error);
    });
    */
    
    // For now, just log to console
    console.log(`Subscribed ${name} (${email}) to newsletter`);
}

// Video Share Functionality
function shareVideo() {
    const videoTitle = document.getElementById('video-title').textContent;
    const pageUrl = window.location.href;
    
    if (navigator.share) {
        // Use Web Share API if available
        navigator.share({
            title: videoTitle,
            text: `Check out this video from Teni Scribes: ${videoTitle}`,
            url: pageUrl,
        })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing:', error));
    } else {
        // Fallback: copy to clipboard
        const shareText = `${videoTitle} - ${pageUrl}`;
        navigator.clipboard.writeText(shareText)
            .then(() => {
                // Show a temporary notification
                const originalText = videoShareBtn.innerHTML;
                videoShareBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
                setTimeout(() => {
                    videoShareBtn.innerHTML = originalText;
                }, 2000);
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
                // Fallback to opening a new window with share URLs
                window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(videoTitle)}&url=${encodeURIComponent(pageUrl)}`, '_blank');
            });
    }
}

// Highlight Current Page in Navigation
function highlightCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        
        // Remove active class from all links
        link.classList.remove('active');
        
        // Check if this link matches the current page
        if (linkHref === currentPage || 
            (currentPage === '' && linkHref === 'index.html') ||
            (linkHref.includes(currentPage.replace('.html', '')) && !linkHref.startsWith('#'))) {
            link.classList.add('active');
        }
    });
}

// Lazy Loading for Images
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for browsers without IntersectionObserver
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    }
}

// Header Scroll Effect
function handleHeaderScroll() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

// Add CSS for scrolled header
const style = document.createElement('style');
style.textContent = `
    .header.scrolled {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    
    img[data-src] {
        opacity: 0;
        transition: opacity 0.3s;
    }
    
    img.loaded {
        opacity: 1;
    }
`;
document.head.appendChild(style);