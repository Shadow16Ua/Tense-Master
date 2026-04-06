// ЗМІНА МОВИ ПО КЛІКУ (З плавною анімацією)
function changeLanguage(langCode, btnHtml) {
    const langBtn = document.getElementById('currentLang');
    if (langBtn) langBtn.innerHTML = btnHtml + ' ▾';
    
    localStorage.setItem('selectedLang', langCode);

    const elements = document.querySelectorAll(".translatable");
    elements.forEach(element => {
        element.style.opacity = 0; 
        setTimeout(() => {
            const key = element.getAttribute("data-key");
            // Перевіряємо, чи є на сторінці словник translations і чи є в ньому цей ключ
            if (typeof translations !== 'undefined' && translations[langCode] && translations[langCode][key] !== undefined) {
                element.innerHTML = translations[langCode][key]; 
            }
            element.style.opacity = 1; 
        }, 300);
    });
}

// АВТОМАТИЧНЕ ЗАВАНТАЖЕННЯ МОВИ ПРИ ВІДКРИТТІ СТОРІНКИ (Без анімації)
window.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('selectedLang') || 'en';
    
    // Якщо вибрана англійська, нічого не міняємо (вона і так в HTML)
    if (savedLang === 'en') return;

    // Відновлюємо правильний текст кнопки в шапці
    let langHtml = '<img src="https://flagcdn.com/w20/gb.png" class="flag-icon" alt="UK flag"> English';
    if(savedLang === 'uk') langHtml = '<img src="https://flagcdn.com/w20/ua.png" class="flag-icon" alt="UA flag"> Українська';
    if(savedLang === 'pl') langHtml = '<img src="https://flagcdn.com/w20/pl.png" class="flag-icon" alt="PL flag"> Polski';
    if(savedLang === 'ru') langHtml = '<span style="display:inline-block; width:20px;"></span> Русский';
    
    const langBtn = document.getElementById('currentLang');
    if (langBtn) langBtn.innerHTML = langHtml + ' ▾';

    // Миттєво перекладаємо всі тексти
    const elements = document.querySelectorAll(".translatable");
    elements.forEach(element => {
        const key = element.getAttribute("data-key");
        if (typeof translations !== 'undefined' && translations[savedLang] && translations[savedLang][key] !== undefined) {
            element.innerHTML = translations[savedLang][key];
        }
    });
});