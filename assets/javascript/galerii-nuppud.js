document.addEventListener('DOMContentLoaded', function() {
    // Initsialiseeri slider kui DOM on laaditud
    initSlider();
});

function initSlider() {
    // Vali kõik slideri täpid, nooled ja wrapper element
    const dots = document.querySelectorAll('.slider-dot');
    const arrows = document.querySelectorAll('.arrow');
    const wrapper = document.querySelector('.wrapper');

    // Kui ükski elemente pole leitud, katkesta funktsioon
    if (!dots.length || !arrows.length || !wrapper) {
        return;
    }
    
    // Muutujad slideri hetkeseisu jaoks
    let currentSlide = 0; // Praeguse slaid indeks
    const totalSlides = 4; // Slaidide koguarv
    let autoSlideInterval; // Muutuja automaatse slaidivahetuse intervalli jaoks
    let resumeTimeout; // Muutuja automaatse taaskäivituse aja mõõtmiseks

    // Funktsioon täppide värskendamiseks vastavalt praegusele slaidile
    function updateDots() {
        dots.forEach((dot, index) => {
            // Lisa aktiivne klass praegusele täpile, eemalda teistelt
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    // Funktsioon konkreetse slaidini liikumiseks
    function goToSlide(slideIndex) {
        currentSlide = slideIndex;
        // Liiguta wrapperit horisontaalselt vastavalt slaidile
        wrapper.style.transform = `translateX(-${slideIndex * 25}%)`;
        updateDots(); // Värskenda täppe
    }

    // Funktsioon järgmise slaidile liikumiseks
    function nextSlide() {
        // Arvuta järgmise slaid indeks (läheb algusesse kui viimane)
        currentSlide = (currentSlide + 1) % totalSlides;
        goToSlide(currentSlide);
    }

    // Funktsioon automaatse slaidivahetuse käivitamiseks
    function startAutoSlide() {
        stopAutoSlide(); // Peata eelmine intervall
        autoSlideInterval = setInterval(nextSlide, 5000); // Käivita uus intervall
    }

    // Funktsioon automaatse slaidivahetuse peatamiseks
    function stopAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval); // Tühista intervall
            autoSlideInterval = null; // Nulli muutuja
        }
    }

    // Funktsioon automaatse vahetuse taaskäivitamise plaanimiseks
    function scheduleAutoSlideRestart() {
        if (resumeTimeout) {
            clearTimeout(resumeTimeout); // Tühista eelmine timeout
        }
        // Plaanis uus automaatne käivitamine 5 sek pärast
        resumeTimeout = setTimeout(startAutoSlide, 5000);
    }

    // Lisa klikk-kuulajad täppidele
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            stopAutoSlide(); // Peata automaatne vahetamine
            goToSlide(index); // Liigu valitud slaidile
            scheduleAutoSlideRestart(); // Plaanis automaatse taaskäivitamine
        });
    });

    // Lisa klikk-kuulajad nooltele
    arrows.forEach(arrow => {
        arrow.addEventListener('click', function() {
            stopAutoSlide(); // Peata automaatne vahetamine
            
            // Määra suund vastavalt noole klassile
            if (this.classList.contains('prev')) {
                currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            } else {
                currentSlide = (currentSlide + 1) % totalSlides;
            }
            goToSlide(currentSlide); // Liigu uuele slaidile
            scheduleAutoSlideRestart(); // Plaanis automaatse taaskäivitamine
        });
    });

    // Alustussätete rakendamine
    updateDots(); // Värskenda täpid
    startAutoSlide(); // Käivita automaatne slaidivahetamine
}

//allikas: https://www.w3schools.com/howto/howto_js_slideshow.asp