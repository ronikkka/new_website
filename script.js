// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');

hamburger.addEventListener('click', () => {
    nav.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on link
document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scrolling
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

// Header появляется после 1 экрана (100vh) + active nav link
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    const scrolledOneScreen = window.scrollY > window.innerHeight; // ← 1 ЭКРАН ВНИЗ
    
    if (scrolledOneScreen) {
        header.style.top = '0px';  // ← ПОКАЗЫВАЕТСЯ
    } else {
        header.style.top = '-100px'; // ← СКРЫВАЕТСЯ
    }
    
    // Active nav link
    const sections = document.querySelectorAll('section[id]');
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Service cards animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service cards and features
document.querySelectorAll('.service-card, .feature').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Form handling
const form = document.getElementById('contactForm');
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    const submitBtn = form.querySelector('button[type="submit"]');
    
    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.textContent = 'Отправляем...';
    
    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Show success
        alert('✅ Заявка отправлена! Наш менеджер уже звонит вам :)');
        form.reset();
    } catch (error) {
        alert('❌ Произошла ошибка. Попробуйте еще раз.');
    } finally {
        submitBtn.classList.remove('loading');
        submitBtn.textContent = 'Отправить заявку';
    }
});

// Phone input mask
document.querySelector('input[name="phone"]').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.startsWith('8')) value = '7' + value.slice(1);
    if (!value.startsWith('7')) value = '7' + value;
    
    let result = '+7 ';
    if (value.length > 1) result += '(' + value.slice(1,4);
    if (value.length >= 5) result += ') ' + value.slice(4,7);
    if (value.length >= 8) result += '-' + value.slice(7,9);
    if (value.length >= 10) result += '-' + value.slice(9,11);
    
    e.target.value = result.slice(0, 16);
});

// Initialize animations on load
document.addEventListener('DOMContentLoaded', () => {
    // Hero title animation
    const titleParts = document.querySelectorAll('.hero-title-part1, .hero-title-part2, .hero-subtitle');
    titleParts.forEach((part, index) => {
        part.style.opacity = '0';
        part.style.transform = 'translateY(30px)';
        setTimeout(() => {
            part.style.transition = 'all 0.8s ease';
            part.style.opacity = '1';
            part.style.transform = 'translateY(0)';
        }, index * 200);
    });
});
