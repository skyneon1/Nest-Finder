// Custom carousel logic
let items = document.querySelectorAll('#carousel div');
let current = 3; 

function updateCarousel() {
    items.forEach(item => {
        item.className = 'hideRight';
    });

    items[(current - 2 + items.length) % items.length].className = 'prevLeftSecond';
    items[(current - 1 + items.length) % items.length].className = 'prev';
    items[current].className = 'selected';
    items[(current + 1) % items.length].className = 'next';
    items[(current + 2) % items.length].className = 'nextRightSecond';
}

function nextSlide() {
    current = (current + 1) % items.length;
    updateCarousel();
}

setInterval(nextSlide, 3000);



(function ($) {
    "use strict";

    // Header carousel
    $(".header-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        items: 1, // Fixed typo: Changed 'item' to 'items'
        dots: true,
        loop: true,
        nav: true,
        navText: [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });

    // Testimonial carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000, // Fixed typo
        margin: 24,
        dots: false,
        loop: true,
        nav: true,
        navText: [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsive: { // Fixed typo
            0: {
                items: 1
            },
            992: {
                items: 2
            }
        }
    });
})(jQuery);


