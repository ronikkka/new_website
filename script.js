// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initScrollEffects();
    initScrollTop();
    initWhatsApp();
    initCookieBanner();
    initSmoothScroll();
    initForm();
    initHeaderVisibility();
    initScrollArrow();
});

// 1. ПОЯВЛЕНИЕ ШАПКИ ПРИ СКРОЛЛЕ
function initHeaderVisibility() {
    const header = document.getElementById('nav');
    const heroSection = document.querySelector('.hero-cover');
    const heroHeight = heroSection.offsetHeight;
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        
        // Шапка появляется при скролле ниже первого экрана
        if (scrolled > heroHeight - 100) {
            header.classList.add('visible');
        } else {
            header.classList.remove('visible');
        }
    });
}

// 2. СТРЕЛКА СКРОЛЛА
function initScrollArrow() {
    const scrollArrow = document.querySelector('.scroll-arrow');
    
    scrollArrow.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });
        }
    });
}

// 3. ЭФФЕКТЫ СКРОЛЛА ДЛЯ ФОНА
function initScrollEffects() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        
        // Эффект параллакса для фона
        const heroBg = document.querySelector('.hero-bg');
        const heroFilter = document.querySelector('.hero-filter');
        
        if (heroBg) {
            heroBg.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
        
        if (heroFilter) {
            heroFilter.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
        
        // Кнопка "наверх"
        const scrollTop = document.querySelector('.scroll-top');
        if (scrolled > 300) {
            scrollTop.classList.add('show');
        } else {
            scrollTop.classList.remove('show');
        }
    });
}

// 4. МОБИЛЬНОЕ МЕНЮ
function initMobileMenu() {
    const burger = document.querySelector('.burger');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (burger) {
        burger.addEventListener('click', function() {
            burger.classList.toggle('opened');
            mobileMenu.classList.toggle('opened');
        });
    }
}

// 5. КНОПКА НАВЕРХ
function initScrollTop() {
    const scrollTop = document.querySelector('.scroll-top');
    if (scrollTop) {
        scrollTop.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

// 6. WHATSAPP
function initWhatsApp() {
    const chat = document.querySelector('.whatsapp-chat');
    const btn = document.querySelector('.whatsapp-btn');
    
    if (btn && chat) {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            // Просто открываем ссылку WhatsApp
            window.open('https://wa.me/79217775060', '_blank');
        });
    }
}

// 7. COOKIE БАННЕР
function initCookieBanner() {
    const banner = document.querySelector('.cookie-banner');
    const closeBtn = document.querySelector('.cookie-close');
    
    if (!banner || !closeBtn) return;
    
    if (localStorage.getItem('cookiesAccepted')) {
        banner.style.display = 'none';
        return;
    }
    
    closeBtn.addEventListener('click', function() {
        banner.style.display = 'none';
        localStorage.setItem('cookiesAccepted', 'true');
    });
}

// 8. ПЛАВНЫЙ СКРОЛЛ
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 9. ФОРМА
function initForm() {
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Заявка отправлена! Наш менеджер скоро свяжется с вами.');
            form.reset();
        });
    }
}

// 10. АНИМАЦИЯ ПРИ СКРОЛЛЕ
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, { threshold: 0.1 });

// Наблюдаем за элементами
document.querySelectorAll('.service-card, .why-us-item, .client-logo').forEach(el => {
    observer.observe(el);
});

// 11. АДАПТИВ ПРИ ИЗМЕНЕНИИ РАЗМЕРА
window.addEventListener('resize', function() {
    // Обновляем высоту героя при ресайзе
    const heroSection = document.querySelector('.hero-cover');
    if (heroSection) {
        heroSection.style.height = window.innerHeight + 'px';
    }
});

// Инициализация высоты героя
window.dispatchEvent(new Event('resize'));