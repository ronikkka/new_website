document.addEventListener('DOMContentLoaded', function() {
    // Инициализация всех функций
    initMobileMenu();
    initHeaderVisibility();
    initScrollEffects();
    initScrollTop();
    initWhatsApp();
    initCookieBanner();
    initSmoothScroll();
    initForm();
    initScrollArrow();
    initAnimations();
    centerAllContent();
    initHeroHeight();
    
    console.log('Сайт загружен и готов! 🚀');
});


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

function initHeaderVisibility() {
    const header = document.getElementById('nav');
    if (!header) return;
    
    // Прячем шапку изначально
    header.style.transform = 'translateY(-100%)';
    header.style.opacity = '0';
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroHeight = document.querySelector('.hero-cover')?.offsetHeight || 700;
        
        // Показываем шапку при скролле ниже первого экрана
        if (scrolled > heroHeight - 150) {
            header.classList.add('visible');
            header.style.transform = 'translateY(0)';
            header.style.opacity = '1';
        } else {
            header.classList.remove('visible');
            header.style.transform = 'translateY(-100%)';
            header.style.opacity = '0';
        }
    });
}

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
                    top: targetSection.offsetTop - 80, // Учитываем высоту шапки
                    behavior: 'smooth'
                });
            }
        });
    });
}

function initMobileMenu() {
    const burger = document.querySelector('.burger');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (!burger || !mobileMenu) return;
    
    burger.addEventListener('click', function(e) {
        e.stopPropagation();
        this.classList.toggle('opened');
        mobileMenu.classList.toggle('opened');
        
        // Блокируем скролл при открытом меню
        if (mobileMenu.classList.contains('opened')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // Закрытие меню при клике вне его
    document.addEventListener('click', function(e) {
        if (!mobileMenu.contains(e.target) && !burger.contains(e.target)) {
            burger.classList.remove('opened');
            mobileMenu.classList.remove('opened');
            document.body.style.overflow = '';
        }
    });
    
    // Закрытие меню при клике на ссылку
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            burger.classList.remove('opened');
            mobileMenu.classList.remove('opened');
            document.body.style.overflow = '';
        });
    });
}

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
        
        // Плавное появление шапки
        const header = document.getElementById('nav');
        if (header) {
            const opacity = Math.min(1, scrolled * 0.003);
            if (scrolled > 100) {
                header.style.backgroundColor = `rgba(255, 255, 255, ${opacity})`;
            } else {
                header.style.backgroundColor = 'rgba(255, 255, 255, 0)';
            }
        }
    });
}

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


function initWhatsApp() {
    const whatsappBtn = document.querySelector('.whatsapp-btn');
    
    if (!whatsappBtn) return;
    
    whatsappBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Открываем WhatsApp в новом окне
        const phone = '79217775060'; // Ваш номер
        const message = encodeURIComponent('Здравствуйте! Заинтересовался вашими услугами.');
        const url = `https://wa.me/${phone}?text=${message}`;
        
        window.open(url, '_blank');
        
        // Анимация нажатия
        this.style.transform = 'scale(0.9)';
        setTimeout(() => {
            this.style.transform = '';
        }, 200);
    });
}


function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        // Исключаем якоря с #, которые не ведут к элементам
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
                
                // Закрываем мобильное меню если открыто
                const mobileMenu = document.querySelector('.mobile-menu');
                const burger = document.querySelector('.burger');
                if (mobileMenu?.classList.contains('opened')) {
                    mobileMenu.classList.remove('opened');
                    burger?.classList.remove('opened');
                    document.body.style.overflow = '';
                }
            }
        });
    });
}


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
        
        // Собираем данные формы
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

function initAnimations() {
    // Элементы для анимации
    const animatedElements = [
        '.service-card',
        '.why-us-item',
        '.client-logo',
        '.section-title',
        '.section-subtitle'
    ];
    
    // Создаем наблюдатель
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Для карточек услуг - добавляем задержку
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
    
    // Наблюдаем за всеми элементами
    animatedElements.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    });
}


// Показ уведомлений
function showNotification(message, type = 'info') {
    // Создаем элемент уведомления
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

function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function fixMobileHeight() {
    if (isMobile()) {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
        
        const heroSection = document.querySelector('.hero-cover');
        if (heroSection) {
            heroSection.style.height = `calc(var(--vh, 1vh) * 100)`;
        }
    }
}

window.addEventListener('resize', function() {

    initHeroHeight();

    fixMobileHeight();
    
    setTimeout(centerAllContent, 100);
});

window.addEventListener('orientationchange', function() {
    setTimeout(() => {
        initHeroHeight();
        centerAllContent();
        fixMobileHeight();
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
        fixMobileHeight();
        console.log('Все анимации инициализированы! ✨');
    }, 500);
});
