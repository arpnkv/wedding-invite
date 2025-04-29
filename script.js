document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    });

    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });

    const weddingDate = new Date("2025-09-06T00:00:00");
    const timerElements = {
        days: document.getElementById("days"),
        hours: document.getElementById("hours"),
        minutes: document.getElementById("minutes"),
        seconds: document.getElementById("seconds")
    };

    function updateTimer() {
        const now = new Date();
        const diff = weddingDate - now;

        if (diff <= 0) {
            clearInterval(timerInterval);
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor(diff / (1000 * 60 * 60) % 24);
        const minutes = Math.floor(diff / (1000 * 60) % 60);
        const seconds = Math.floor(diff / 1000 % 60);

        timerElements.days.textContent = days;
        timerElements.hours.textContent = hours;
        timerElements.minutes.textContent = minutes;
        timerElements.seconds.textContent = seconds;
    }

    const timerInterval = setInterval(updateTimer, 1000);
    updateTimer();
});
