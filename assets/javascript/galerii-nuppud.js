document.addEventListener('DOMContentLoaded', function() {
    initSlider();
});

function initSlider() {
    const dots = document.querySelectorAll('.slider-dot');
    const arrows = document.querySelectorAll('.arrow');
    const wrapper = document.querySelector('.wrapper');

    if (!dots.length || !arrows.length || !wrapper) {
        return;
    }
    
    let currentSlide = 0;
    const totalSlides = 4;
    let autoSlideInterval;
    let resumeTimeout;

    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    function goToSlide(slideIndex) {
        currentSlide = slideIndex;
        wrapper.style.transform = `translateX(-${slideIndex * 25}%)`;
        updateDots();
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        goToSlide(currentSlide);
    }

    function startAutoSlide() {
        stopAutoSlide();
        autoSlideInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
            autoSlideInterval = null;
        }
    }

    function scheduleAutoSlideRestart() {
        if (resumeTimeout) {
            clearTimeout(resumeTimeout);
        }
        resumeTimeout = setTimeout(startAutoSlide, 15000);
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            stopAutoSlide();
            goToSlide(index);
            scheduleAutoSlideRestart();
        });
    });

    arrows.forEach(arrow => {
        arrow.addEventListener('click', function() {
            stopAutoSlide();
            
            if (this.classList.contains('prev')) {
                currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            } else {
                currentSlide = (currentSlide + 1) % totalSlides;
            }
            goToSlide(currentSlide);
            scheduleAutoSlideRestart();
        });
    });

    updateDots();
    startAutoSlide();
}