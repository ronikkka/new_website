// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initSubmenu();
    initScrollEffects();
    initScrollTop();
    initWhatsApp();
    initCookieBanner();
    initSmoothScroll();
    initForm();
});

// Мобильное меню
function initMobileMenu() {
    const burger = document.querySelector('.burger');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    burger.addEventListener('click', function() {
        burger.classList.toggle('opened');
        mobileMenu.classList.toggle('opened');
    });
}

// Подменю
function initSubmenu() {
    const triggers = document.querySelectorAll('.submenu-trigger');
    triggers.forEach(trigger => {
        trigger.addEventListener('mouseenter', function() {
            const submenu = this.nextElementSibling;
            submenu.style.opacity = '1';
            submenu.style.visibility = 'visible';
        });
        
        trigger.parentElement.addEventListener('mouseleave', function() {
            const submenu = this.querySelector('.submenu');
            submenu.style.opacity = '0';
            submenu.style.visibility = 'hidden';
        });
    });
}

// Эффекты скролла
function initScrollEffects() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        
        // Header opacity
        const header = document.getElementById('nav');
        const opacity = Math.min(1, 0.8 + scrolled * 0.0002);
        header.style.background = `rgba(255,255,255,${opacity})`;
        
        // Scroll top button
        const scrollTop = document.querySelector('.scroll-top');
        if (scrolled > 300) {
            scrollTop.classList.add('show');
        } else {
            scrollTop.classList.remove('show');
        }
    });
}

// Кнопка наверх
function initScrollTop() {
    const scrollTop = document.querySelector('.scroll-top');
    scrollTop.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// WhatsApp чат
function initWhatsApp() {
    const chat = document.querySelector('.whatsapp-chat');
    const btn = document.querySelector('.whatsapp-btn');
    
    btn.addEventListener('click', function(e) {
        e.stopPropagation();
        chat.classList.toggle('active');
    });
    
    document.addEventListener('click', function() {
        chat.classList.remove('active');
    });
    
    const closeMobile = document.querySelector('.whatsapp-close-mobile');
    closeMobile.addEventListener('click', function(e) {
        e.stopPropagation();
        chat.classList.remove('active');
    });
}

// Cookie баннер
function initCookieBanner() {
    const banner = document.querySelector('.cookie-banner');
    const closeBtn = document.querySelector('.cookie-close');
    
    if (localStorage.getItem('cookiesAccepted')) {
        banner.style.display = 'none';
        return;
    }
    
    closeBtn.addEventListener('click', function() {
        banner.style.display = 'none';
        localStorage.setItem('cookiesAccepted', 'true');
    });
}

// Плавный скролл
function initSmoothScroll() {
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
}

// Форма
function initForm() {
    const form = document.querySelector('.contact-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Заявка отправлена! Наш менеджер скоро свяжется с вами.');
        form.reset();
    });
}

// Анимация элементов при скролле
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.service-card, .why-us-item, .client-logo').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Адаптив
window.addEventListener('resize', function() {
    // Пересчет размеров при изменении окна
});
[attached_file:1]
