// ========== MOBILE MENU TOGGLE ==========
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ========== SMOOTH SCROLLING ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========== SCROLL TO TOP BUTTON ==========
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
    
    // Active nav link on scroll
    updateActiveNav();
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ========== ACTIVE NAV ON SCROLL ==========
function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);

        if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-menu a').forEach(link => {
                link.classList.remove('active');
            });
            navLink.classList.add('active');
        }
    });
}

// ========== QUICK TRACK FORM (Hero Section) ==========
const quickTrackForm = document.getElementById('quickTrackForm');
if (quickTrackForm) {
    quickTrackForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const trackingNumber = document.getElementById('trackingNumber').value;
        trackShipment(trackingNumber);
        // Scroll to tracking section
        document.querySelector('#track').scrollIntoView({ behavior: 'smooth' });
    });
}

// ========== MAIN TRACK FORM ==========
const mainTrackForm = document.getElementById('mainTrackForm');
if (mainTrackForm) {
    mainTrackForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const trackingNumber = document.getElementById('mainTrackingNumber').value;
        trackShipment(trackingNumber);
    });
}

// ========== TRACKING FUNCTION ==========
function trackShipment(trackingNumber) {
    // Validate tracking number
    if (!trackingNumber || trackingNumber.trim() === '') {
        alert('Please enter a valid tracking number');
        return;
    }

    // Show tracking result
    const trackingResult = document.getElementById('trackingResult');
    trackingResult.style.display = 'block';

    // Simulate API call - Replace with actual API
    // For demo, using sample data
    const sampleData = {
        trackingNumber: trackingNumber.toUpperCase(),
        status: 'In Transit',
        from: 'Mumbai, Maharashtra',
        to: 'Gorakhpur, Uttar Pradesh',
        expectedDelivery: '15 Feb 2025',
        timeline: [
            {
                status: 'Order Placed',
                location: 'Mumbai Hub',
                timestamp: '12 Feb 2025, 10:30 AM',
                completed: true
            },
            {
                status: 'Picked Up',
                location: 'Mumbai Warehouse',
                timestamp: '12 Feb 2025, 2:45 PM',
                completed: true
            },
            {
                status: 'In Transit',
                location: 'Delhi Hub',
                timestamp: '13 Feb 2025, 8:20 AM',
                completed: true
            },
            {
                status: 'Out for Delivery',
                location: 'Gorakhpur Local Office',
                timestamp: 'Expected: 15 Feb 2025',
                completed: false
            },
            {
                status: 'Delivered',
                location: 'Gorakhpur, UP',
                timestamp: 'Pending',
                completed: false
            }
        ]
    };

    // Update tracking details
    document.getElementById('resultTrackingNo').textContent = sampleData.trackingNumber;
    document.getElementById('resultStatus').textContent = sampleData.status;
    document.getElementById('resultFrom').textContent = sampleData.from;
    document.getElementById('resultTo').textContent = sampleData.to;
    document.getElementById('resultDelivery').textContent = sampleData.expectedDelivery;

    // Update timeline
    const timelineContainer = document.getElementById('timelineSteps');
    timelineContainer.innerHTML = '';

    sampleData.timeline.forEach(step => {
        const stepDiv = document.createElement('div');
        stepDiv.className = 'timeline-step';
        stepDiv.innerHTML = `
            <div class="step-icon ${step.completed ? '' : 'pending'}">
                ${step.completed ? '<i class="fas fa-check"></i>' : ''}
            </div>
            <div class="step-content">
                <h5>${step.status}</h5>
                <p>${step.location}</p>
                <span class="timestamp">${step.timestamp}</span>
            </div>
        `;
        timelineContainer.appendChild(stepDiv);
    });

    // Scroll to result
    trackingResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Close tracking result
function closeTracking() {
    document.getElementById('trackingResult').style.display = 'none';
}

// ========== RATE CALCULATOR ==========
const rateCalculatorForm = document.getElementById('rateCalculatorForm');
if (rateCalculatorForm) {
    rateCalculatorForm.addEventListener('submit', (e) => {
        e.preventDefault();
        calculateRate();
    });
}

function calculateRate() {
    const fromCity = document.getElementById('fromCity').value;
    const toCity = document.getElementById('toCity').value;
    const weight = parseFloat(document.getElementById('weight').value);
    const serviceType = document.getElementById('serviceType').value;

    if (!fromCity || !toCity || !weight || !serviceType) {
        alert('Please fill all fields');
        return;
    }

    // Calculate rates - Sample calculation
    const baseRates = {
        express: 80,
        standard: 50,
        economy: 30
    };

    const baseRate = 100;
    const weightRate = weight * baseRates[serviceType];
    const serviceCharge = 50;
    const total = baseRate + weightRate + serviceCharge;

    // Display results
    document.getElementById('baseRate').textContent = `₹${baseRate}`;
    document.getElementById('weightCharges').textContent = `₹${weightRate.toFixed(2)}`;
    document.getElementById('serviceCharges').textContent = `₹${serviceCharge}`;
    document.getElementById('calculatedRate').textContent = total.toFixed(2);
    document.getElementById('totalRate').textContent = `₹${total.toFixed(2)}`;

    // Show result
    document.getElementById('rateResult').style.display = 'block';
    
    // Scroll to result
    setTimeout(() => {
        document.getElementById('rateResult').scrollIntoView({ 
            behavior: 'smooth', 
            block: 'nearest' 
        });
    }, 100);
}

// ========== CONTACT FORM ==========
// Form is handled by FormSubmit.co (sends email directly to whosammr@gmail.com)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

        const formData = new FormData(contactForm);

        fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        })
        .then(response => {
            contactForm.style.display = 'none';
            document.getElementById('formSuccess').style.display = 'block';

            // Reset and show form again after 5 seconds
            setTimeout(() => {
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
                contactForm.style.display = 'block';
                document.getElementById('formSuccess').style.display = 'none';
            }, 5000);
        })
        .catch(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
            alert('Something went wrong. Please try again.');
        });
    });
}

// ========== STATS COUNTER ANIMATION ==========
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.ceil(current).toLocaleString();
        }
    }, 20);
}

// Trigger counter animation on scroll
const statsSection = document.querySelector('.about');
let statsAnimated = false;

const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
            document.querySelectorAll('.stat-number').forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                animateCounter(stat, target);
            });
            statsAnimated = true;
        }
    });
}, observerOptions);

if (statsSection) {
    observer.observe(statsSection);
}

// ========== SERVICE CARD ANIMATIONS ==========
const serviceCards = document.querySelectorAll('.service-card');

const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, { threshold: 0.1 });

serviceCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.5s ease';
    cardObserver.observe(card);
});

// ========== PLACEHOLDER IMAGE HANDLER ==========
// If actual images are missing, set colored background
const aboutImage = document.getElementById('aboutImage');
if (aboutImage && !aboutImage.complete) {
    aboutImage.addEventListener('error', function() {
        this.style.background = 'linear-gradient(135deg, #004E89, #006bb3)';
        this.style.minHeight = '400px';
    });
}

// ========== FORM VALIDATION ==========
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[0-9]{10}$/;
    return re.test(phone.replace(/\s/g, ''));
}

// Add real-time validation to email and phone fields
const emailInputs = document.querySelectorAll('input[type="email"]');
emailInputs.forEach(input => {
    input.addEventListener('blur', function() {
        if (this.value && !validateEmail(this.value)) {
            this.style.borderColor = 'var(--danger-color)';
            showError(this, 'Please enter a valid email');
        } else {
            this.style.borderColor = '#ddd';
            hideError(this);
        }
    });
});

const phoneInputs = document.querySelectorAll('input[type="tel"]');
phoneInputs.forEach(input => {
    input.addEventListener('blur', function() {
        if (this.value && !validatePhone(this.value)) {
            this.style.borderColor = 'var(--danger-color)';
            showError(this, 'Please enter a valid 10-digit phone number');
        } else {
            this.style.borderColor = '#ddd';
            hideError(this);
        }
    });
});

function showError(input, message) {
    let errorDiv = input.nextElementSibling;
    if (!errorDiv || !errorDiv.classList.contains('error-message')) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.color = 'var(--danger-color)';
        errorDiv.style.fontSize = '0.85rem';
        errorDiv.style.marginTop = '5px';
        input.parentNode.insertBefore(errorDiv, input.nextSibling);
    }
    errorDiv.textContent = message;
}

function hideError(input) {
    const errorDiv = input.nextElementSibling;
    if (errorDiv && errorDiv.classList.contains('error-message')) {
        errorDiv.remove();
    }
}

// ========== PAGE LOAD ANIMATION ==========
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.3s ease';
        document.body.style.opacity = '1';
    }, 100);
});

console.log('Nagpur Delhi Transport Co. Rewa - website loaded successfully!');
