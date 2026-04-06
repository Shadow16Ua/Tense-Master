// Функція для завантаження теми з кешу браузера
function loadTheme() {
    const savedTheme = localStorage.getItem('tense_theme');
    
    // Шукаємо кнопку теми на сторінці (використовуємо клас, щоб точно знайти)
    const themeBtn = document.querySelector('.theme-toggle');
    
    if (savedTheme === 'light') {
        document.body.setAttribute('data-theme', 'light');
        if(themeBtn) themeBtn.textContent = '🌙';
    } else {
        document.body.removeAttribute('data-theme');
        if(themeBtn) themeBtn.textContent = '☀️';
    }
}

// Функція для перемикання теми (вішається на клік по кнопці)
function toggleTheme() {
    const isLight = document.body.getAttribute('data-theme') === 'light';
    const themeBtn = document.querySelector('.theme-toggle');

    if (isLight) {
        // Вмикаємо темну
        document.body.removeAttribute('data-theme');
        localStorage.setItem('tense_theme', 'dark');
        if(themeBtn) themeBtn.textContent = '☀️';
    } else {
        // Вмикаємо світлу
        document.body.setAttribute('data-theme', 'light');
        localStorage.setItem('tense_theme', 'light');
        if(themeBtn) themeBtn.textContent = '🌙';
    }
}

// Запускаємо логіку щойно завантажиться HTML (щоб тема застосувалася миттєво)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadTheme);
} else {
    loadTheme();
}

// 1. Функція зміни мови по кліку (працює завжди)
window.changeLanguage = function(langCode, btnHtml) {
    const langBtn = document.getElementById('currentLang');
    if (langBtn) langBtn.innerHTML = btnHtml + ' ▾';
    
    localStorage.setItem('selectedLang', langCode);

    const elements = document.querySelectorAll(".translatable");
    elements.forEach(element => {
        element.style.opacity = 0; 
        setTimeout(() => {
            const key = element.getAttribute("data-key");
            if (window.translations && window.translations[langCode] && window.translations[langCode][key]) {
                element.innerHTML = window.translations[langCode][key]; 
            }
            element.style.opacity = 1; 
        }, 300);
    });
};

// 2. Команда для перевірки пам'яті і стартового перекладу
window.applySavedLanguage = function() {
    const savedLang = localStorage.getItem('selectedLang') || 'en';
    
    if (savedLang === 'en') return;

    let langHtml = '<img src="https://flagcdn.com/w20/gb.png" class="flag-icon" alt="UK flag"> English';
    if(savedLang === 'uk') langHtml = '<img src="https://flagcdn.com/w20/ua.png" class="flag-icon" alt="UA flag"> Українська';
    if(savedLang === 'pl') langHtml = '<img src="https://flagcdn.com/w20/pl.png" class="flag-icon" alt="PL flag"> Polski';
    if(savedLang === 'ru') langHtml = '<span style="display:inline-block; width:20px;"></span> Русский';
    
    const langBtn = document.getElementById('currentLang');
    if (langBtn) langBtn.innerHTML = langHtml + ' ▾';

    const elements = document.querySelectorAll(".translatable");
    elements.forEach(element => {
        const key = element.getAttribute("data-key");
        if (window.translations && window.translations[savedLang] && window.translations[savedLang][key]) {
            element.innerHTML = window.translations[savedLang][key];
        }
    });
};

