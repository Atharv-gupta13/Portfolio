// ===== MOBILE MENU TOGGLE =====
const menuIcon = document.getElementById('menu-icon');
const navbar = document.querySelector('.navbar');

menuIcon.addEventListener('click', () => {
    navbar.classList.toggle('active');
    menuIcon.classList.toggle('bx-x');
});

// Close menu when a nav link is clicked
document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', () => {
        navbar.classList.remove('active');
        menuIcon.classList.remove('bx-x');
    });
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.navbar a');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// ===== CONTACT FORM =====
// Contact: gatharv325@gmail.com | Phone: 9214744437
// Uses EmailJS — Free service to send emails from frontend
// Setup: Go to https://www.emailjs.com/
// 1. Create a free account
// 2. Add an Email Service (Gmail/Outlook etc.)
// 3. Create an Email Template — use these variables in your template:
//      {{from_name}}, {{from_email}}, {{phone}}, {{subject}}, {{message}}
// 4. Replace YOUR_PUBLIC_KEY, YOUR_SERVICE_ID, YOUR_TEMPLATE_ID below

// --- EMAILJS SETUP ---
// Uncomment and fill these after setting up EmailJS:
// const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';
// const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';
// const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
// emailjs.init(EMAILJS_PUBLIC_KEY);

// For now, form data is collected and logged to console
// Replace the sendForm() function body with EmailJS call when ready

const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
const submitBtn = document.getElementById('submitBtn');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Collect form data
    const formData = {
        from_name:  document.getElementById('fullName').value.trim(),
        from_email: document.getElementById('email').value.trim(),
        phone:      document.getElementById('phone').value.trim(),
        subject:    document.getElementById('subject').value.trim(),
        message:    document.getElementById('message').value.trim(),
    };

    // Basic validation
    if (!formData.from_name || !formData.from_email || !formData.subject || !formData.message) {
        showStatus('Please fill in all required fields.', 'error');
        return;
    }

    if (!isValidEmail(formData.from_email)) {
        showStatus('Please enter a valid email address.', 'error');
        return;
    }

    // Show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    try {
        // ---- OPTION 1: EmailJS (uncomment when ready) ----
        // await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formData);

        // ---- OPTION 2: Console log (for testing) ----
        console.log('📩 Contact Form Submission:', formData);
        await fakeDelay(1000); // Simulates network request — remove with real EmailJS

        // Success
        showStatus('✅ Message sent successfully! I will get back to you soon.', 'success');
        contactForm.reset();

    } catch (error) {
        console.error('EmailJS Error:', error);
        showStatus('❌ Something went wrong. Please try again or contact me directly.', 'error');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
    }
});

// ===== HELPER FUNCTIONS =====

function showStatus(message, type) {
    formStatus.textContent = message;
    formStatus.className = 'form-status ' + type;
    // Auto-clear after 5 seconds
    setTimeout(() => {
        formStatus.textContent = '';
        formStatus.className = 'form-status';
    }, 5000);
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function fakeDelay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// ===== SCROLL REVEAL ANIMATION (Simple) =====
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.service-box, .project-card, .about-content, .about-img').forEach(el => {
    el.classList.add('hidden');
    observer.observe(el);
});
