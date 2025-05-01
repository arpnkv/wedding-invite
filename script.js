// Анимация с использованием Intersection Observer
const sections = document.querySelectorAll('.section');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.5 });

sections.forEach(section => observer.observe(section));

// Таймер до свадьбы
const weddingDate = new Date("2025-09-06T00:00:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = String(days).padStart(2, "0");
    document.getElementById("hours").textContent = String(hours).padStart(2, "0");
    document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
    document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}

setInterval(updateCountdown, 1000);
updateCountdown();

// Локация
const mapContainer = document.querySelector('.map-container');

mapContainer.addEventListener('mouseenter', () => {
    mapContainer.classList.add('active');
});

mapContainer.addEventListener('mouseleave', () => {
    mapContainer.classList.remove('active');
});

// Отправка формы в Telegram
    const BOT_TOKEN = 'AAG9IPJvwenee1iaQhn0cFHFB99jeVvdWkI';
    const CHAT_ID = '-1002326818571';
    const API_URL = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

    document.getElementById('rsvpForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const form = e.target;
    const data = new FormData(form);

    const attendance = data.get('attendance') || 'Не указан';
    const name = data.get('name') || 'Не указано';
    const drinks = data.getAll('drinks').join(', ') || 'Не выбрано';
    const food = data.getAll('food').join(', ') || 'Не выбрано';
    const comments = data.get('comments') || 'Без комментариев';

    const message = `
<b>📩 Новый ответ на приглашение</b>\n
👤 <b>Имя:</b> ${name}
🎉 <b>Присутствие:</b> ${attendance}
🍷 <b>Напитки:</b> ${drinks}
🍽️ <b>Еда:</b> ${food}
📝 <b>Комментарий:</b> ${comments}
    `.trim();

    try {
    const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
},
    body: JSON.stringify({
    chat_id: CHAT_ID,
    text: message,
    parse_mode: 'HTML'
})
});

    if (response.ok) {
    alert('Спасибо! Ваш ответ отправлен ❤️');
    form.reset();
} else {
    alert('Ошибка при отправке. Попробуйте позже.');
}
} catch (error) {
    alert('Ошибка соединения с Telegram API');
    console.error(error);
}
});
