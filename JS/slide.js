const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const slidesContainer = document.querySelector('.slides');

let currentSlide = 0;

function showSlide(index) {
    const totalSlides = slides.length;
    currentSlide = (index + totalSlides) % totalSlides;

    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === currentSlide);
    });

    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
    });
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index);
    });
});

slidesContainer.addEventListener('click', nextSlide);
slidesContainer.addEventListener('dblclick', prevSlide);

setInterval(() => {
    nextSlide();
}, 10000);
