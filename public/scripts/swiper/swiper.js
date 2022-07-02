const swiper = new Swiper(".swiper-container", {
  initialSlide: 1,
  direction: "horizontal",
  autoHeight: true,
  mousewheel: 1,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  loop: true,
  loopedSlides: 30,
  breakpoints: {
    320: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    480: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    640: {
      slidesPerView: 4,
      spaceBetween: 40,
    },
    1200: {
      slidesPerView: 1,
      spaceBetween: 10
    }
  },
});
