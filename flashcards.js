let activeLang = 'en';

window.translations = {
    en: {
        backBtn: "← Back to Home",
        title: "Active Recall",
        desc: "Read the sentence, guess the correct verb form and tense, then click the card to flip and check your answer!",
        clickHint: "👆 Click to flip",
        nextBtn: "Next Card ➔",
        footerText: "All rights reserved."
    },
    uk: {
        backBtn: "← На головну",
        title: "Тренування пам'яті",
        desc: "Прочитай речення, вгадай правильну форму дієслова та час, а потім клікни на картку, щоб перевірити себе!",
        clickHint: "👆 Клікни, щоб перевернути",
        nextBtn: "Наступна картка ➔",
        footerText: "Всі права захищено."
    },
    pl: {
        backBtn: "← Do strony głównej",
        title: "Trening Pamięci",
        desc: "Przeczytaj zdanie, odgadnij poprawną formę czasownika i czas, a następnie kliknij kartę, aby sprawdzić odpowiedź!",
        clickHint: "👆 Kliknij, aby obrócić",
        nextBtn: "Następna karta ➔",
        footerText: "Wszelkie prawa zastrzeżone."
    },
    ru: {
        backBtn: "← На главную",
        title: "Тренировка памяти",
        desc: "Прочитай предложение, угадай правильную форму глагола и время, а затем кликни на карточку, чтобы проверить!",
        clickHint: "👆 Кликни, чтобы перевернуть",
        nextBtn: "Следующая карточка ➔",
        footerText: "Все права защищены."
    }
};

// function changeLanguage(langCode, langName) {
//     activeLang = langCode;
//     document.getElementById('currentLang').innerHTML = langName + ' ▾';
//     const elements = document.querySelectorAll(".translatable");

//     elements.forEach(element => {
//         element.style.opacity = 0;
//         setTimeout(() => {
//             const key = element.getAttribute("data-key");
//             if (translations[langCode] && translations[langCode][key] !== undefined) {
//                 element.innerHTML = translations[langCode][key];
//             }
//             element.style.opacity = 1;
//         }, 300);
//     });
// }
window.addEventListener('DOMContentLoaded', () => {
    if (typeof window.applySavedLanguage === 'function') {
        window.applySavedLanguage();
    }
});

// БАЗА КАРТОК (Всі 12 часів)
const cardsData = [
    { q: "Water ___ (boil) at 100°C.", a: "boils", t: "Present Simple" },
    { q: "Shh! The baby ___ (sleep).", a: "is sleeping", t: "Present Continuous" },
    { q: "I ___ (never / eat) sushi before.", a: "have never eaten", t: "Present Perfect" },
    { q: "I'm tired because I ___ (run) for an hour.", a: "have been running", t: "Present Perfect Continuous" },
    
    { q: "I ___ (see) him at the mall yesterday.", a: "saw", t: "Past Simple" },
    { q: "I ___ (read) a book when the phone rang.", a: "was reading", t: "Past Continuous" },
    { q: "By the time I arrived, the train ___ (leave).", a: "had left", t: "Past Perfect" },
    { q: "The ground was wet because it ___ (rain) all night.", a: "had been raining", t: "Past Perfect Continuous" },
    
    { q: "I promise I ___ (help) you tomorrow.", a: "will help", t: "Future Simple" },
    { q: "This time next week, I ___ (lie) on the beach.", a: "will be lying", t: "Future Continuous" },
    { q: "By 2030, they ___ (build) the new airport.", a: "will have built", t: "Future Perfect" },
    { q: "By December, she ___ (work) here for 5 years.", a: "will have been working", t: "Future Perfect Continuous" },

    // Ще кілька карток для різноманітності
    { q: "Look! The bus ___ (come).", a: "is coming", t: "Present Continuous" },
    { q: "We ___ (not / go) to the beach last weekend.", a: "didn't go", t: "Past Simple" },
    { q: "___ (you / ever / be) to Paris?", a: "Have you ever been", t: "Present Perfect" },
    { q: "He usually ___ (wake up) at 7 AM.", a: "wakes up", t: "Present Simple" },
    { q: "While I ___ (cook), she was watching TV.", a: "was cooking", t: "Past Continuous" },
    { q: "Don't call me at 9 PM, I ___ (watch) a movie.", a: "will be watching", t: "Future Continuous" },
    { q: "I couldn't pay because I ___ (lose) my wallet.", a: "had lost", t: "Past Perfect" },
    { q: "By next year, I ___ (save) enough money.", a: "will have saved", t: "Future Perfect" }
];

let currentCardIndex = -1;

// Функція перевороту картки
function flipCard() {
    const card = document.getElementById('flashcard');
    card.classList.toggle('flipped');
}

// Завантаження нової картки
function loadNextCardData() {
    let newIndex;
    // Шукаємо нову картку так, щоб вона не повторювала попередню
    do {
        newIndex = Math.floor(Math.random() * cardsData.length);
    } while (newIndex === currentCardIndex);
    
    currentCardIndex = newIndex;
    const cardInfo = cardsData[currentCardIndex];

    document.getElementById('cardQuestion').innerHTML = cardInfo.q;
    document.getElementById('cardAnswer').innerHTML = cardInfo.a;
    document.getElementById('cardTense').innerHTML = cardInfo.t;
}

// Логіка кнопки "Next Card"
function nextCard() {
    const card = document.getElementById('flashcard');
    
    // Якщо картка перевернута (показує відповідь)
    if (card.classList.contains('flipped')) {
        // Спочатку перевертаємо назад
        card.classList.remove('flipped');
        
        // Чекаємо, поки закінчиться анімація перевороту (300мс), і міняємо текст
        setTimeout(() => {
            loadNextCardData();
        }, 300);
    } else {
        // Якщо картка не перевернута, можна додати ефект зникання-появи
        card.style.opacity = 0;
        setTimeout(() => {
            loadNextCardData();
            card.style.opacity = 1;
        }, 200);
    }
}

// Завантажуємо першу картку при відкритті сторінки
window.onload = () => {
    loadNextCardData();
};