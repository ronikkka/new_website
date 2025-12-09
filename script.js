// ============================================
// ГЛАВНЫЙ СКРИПТ ДЛЯ САЙТА
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    initHeaderVisibility();
    initScrollEffects();
    initScrollTop();
    initSmoothScroll();
    initForm();
    initScrollArrow();
    initAnimations();
    centerAllContent();
    initHeroHeight();
    
    console.log('Сайт загружен и готов! 🚀');
});

// ============================================
// 1. ЦЕНТРИРОВАНИЕ ВСЕГО КОНТЕНТА
// ============================================
function centerAllContent() {
    // Центрирование Hero секции
    const heroSection = document.querySelector('.hero-cover');
    const heroContent = document.querySelector('.hero-content');
    
    if (heroSection && heroContent) {
        heroSection.style.display = 'flex';
        heroSection.style.alignItems = 'center';
        heroSection.style.justifyContent = 'center';
        
        heroContent.style.textAlign = 'center';
        heroContent.style.maxWidth = '90%';
        heroContent.style.margin = '0 auto';
    }
    
    // Центрирование контейнеров в секциях
    document.querySelectorAll('section .container').forEach(container => {
        if (!container.closest('.hero-cover')) {
            container.style.display = 'flex';
            container.style.flexDirection = 'column';
            container.style.alignItems = 'center';
            container.style.justifyContent = 'center';
            container.style.minHeight = 'calc(100vh - 100px)';
        }
    });
    
    // Центрирование меню
    const headerNav = document.querySelector('.header-nav');
    if (headerNav) {
        headerNav.style.display = 'flex';
        headerNav.style.justifyContent = 'center';
        headerNav.style.alignItems = 'center';
    }
    
    // Центрирование карточек услуг
    const servicesGrid = document.querySelector('.services-grid');
    if (servicesGrid) {
        servicesGrid.style.display = 'flex';
        servicesGrid.style.justifyContent = 'center';
        servicesGrid.style.flexWrap = 'wrap';
        servicesGrid.style.gap = '40px';
    }
}

// ============================================
// 2. ВЫСОТА HERO СЕКЦИИ
// ============================================
function initHeroHeight() {
    function setHeroHeight() {
        const heroSection = document.querySelector('.hero-cover');
        if (heroSection) {
            heroSection.style.height = window.innerHeight + 'px';
        }
    }
    
    setHeroHeight();
    window.addEventListener('resize', setHeroHeight);
    window.addEventListener('orientationchange', setHeroHeight);
}

// ============================================
// 3. ПОЯВЛЕНИЕ ШАПКИ ПРИ СКРОЛЛЕ
// ============================================
function initHeaderVisibility() {
    const header = document.getElementById('nav');
    if (!header) return;
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroHeight = document.querySelector('.hero-cover')?.offsetHeight || 700;
        
        // Показываем шапку при скролле ниже первого экрана
        if (scrolled > heroHeight - 150) {
            header.classList.add('visible');
        } else {
            header.classList.remove('visible');
        }
    });
}

// ============================================
// 4. СТРЕЛКА ДЛЯ СКРОЛЛА
// ============================================
function initScrollArrow() {
    const scrollArrows = document.querySelectorAll('.scroll-arrow, .hero-arrow');
    
    scrollArrows.forEach(arrow => {
        arrow.addEventListener('click', function(e) {
            e.preventDefault();
            
            let targetId;
            if (this.classList.contains('hero-arrow')) {
                targetId = '#services'; // Для стрелки на первом экране
            } else {
                targetId = this.getAttribute('href');
            }
            
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// 5. ЭФФЕКТЫ ПРИ СКРОЛЛЕ
// ============================================
function initScrollEffects() {
    // Параллакс эффект для фона
    const heroBg = document.querySelector('.hero-bg');
    const heroFilter = document.querySelector('.hero-filter');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        
        // Параллакс для фона
        if (heroBg) {
            heroBg.style.transform = `translateY(${scrolled * 0.4}px)`;
        }
        
        if (heroFilter) {
            heroFilter.style.transform = `translateY(${scrolled * 0.4}px)`;
        }
        
        // Показ/скрытие кнопки "наверх"
        const scrollTopBtn = document.querySelector('.scroll-top');
        if (scrollTopBtn) {
            if (scrolled > 500) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        }
    });
}

// ============================================
// 6. КНОПКА "НАВЕРХ"
// ============================================
function initScrollTop() {
    const scrollTopBtn = document.querySelector('.scroll-top');
    
    if (!scrollTopBtn) return;
    
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================
// 7. ПЛАВНЫЙ СКРОЛЛ ДЛЯ ССЫЛОК
// ============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        if (anchor.getAttribute('href') === '#') return;
        
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// 8. ФОРМА ОБРАТНОЙ СВЯЗИ
// ============================================
function initForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (!contactForm) return;
    
    // Маска для телефона
    const phoneInput = contactForm.querySelector('input[type="tel"]');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = this.value.replace(/\D/g, '');
            
            if (value.length > 0) {
                value = '+7(' + value;
                
                if (value.length > 6) {
                    value = value.slice(0, 6) + ')' + value.slice(6);
                }
                if (value.length > 10) {
                    value = value.slice(0, 10) + '-' + value.slice(10);
                }
                if (value.length > 13) {
                    value = value.slice(0, 13) + '-' + value.slice(13);
                }
                if (value.length > 16) {
                    value = value.slice(0, 16);
                }
            }
            
            this.value = value;
        });
    }
    
    // Отправка формы
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Валидация
        if (!data.name || !data.phone) {
            showNotification('Пожалуйста, заполните обязательные поля', 'error');
            return;
        }
        
        showNotification('Заявка отправлена! Мы свяжемся с вами в ближайшее время.', 'success');
        this.reset();
    });
}

// ============================================
// 9. АНИМАЦИИ ПРИ СКРОЛЛЕ
// ============================================
function initAnimations() {
    const animatedElements = [
        '.service-card',
        '.why-us-item',
        '.client-logo',
        '.section-title',
        '.section-subtitle'
    ];
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                if (entry.target.classList.contains('service-card')) {
                    const index = Array.from(entry.target.parentElement.children).indexOf(entry.target);
                    entry.target.style.transitionDelay = `${index * 0.1}s`;
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    });
}

// ============================================
// 10. ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
// ============================================

// Показ уведомлений
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 9999;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
        max-width: 400px;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 10);

    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// ============================================
// 11. ОБРАБОТЧИКИ СОБЫТИЙ ОКНА
// ============================================
window.addEventListener('resize', function() {
    initHeroHeight();
    setTimeout(centerAllContent, 100);
});

window.addEventListener('orientationchange', function() {
    setTimeout(() => {
        initHeroHeight();
        centerAllContent();
    }, 300);
});

window.addEventListener('load', function() {
    setTimeout(() => {
        document.querySelectorAll('.service-card, .why-us-item, .client-logo').forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                el.classList.add('animated');
            }
        });
        
        const heroBg = document.querySelector('.hero-bg');
        if (heroBg) {
            heroBg.style.transition = 'transform 0.5s ease-out';
        }
        
        console.log('Все анимации инициализированы! ✨');
    }, 500);
});