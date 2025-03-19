const progressLine = document.querySelector(".fill");

const swiper1 = new Swiper(".gallery-thumbs", {
  spaceBetween: 10,
  centeredSlides: true,
  pagination: {
    // 호출(pager) 여부
    el: ".swiper-pagination", //버튼을 담을 태그 설정
    clickable: true, // 버튼 클릭 여부
  },
});

const swiper2 = new Swiper(".gallery-top", {
  slidesPerView: 1.2,
  spaceBetween: 20,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination-fraction",
    clickable: true,
    type: "custom",
    renderCustom: function (swiper, current, total) {
      return (
        '<span class="current">' +
        0 +
        current +
        "</span>" +
        "/" +
        '<span class="total">' +
        0 +
        total +
        "</span>"
      );
    },
  },
  on: {
    slideChange: function () {
      var colors = [
        "rgb(255, 255, 222)",
        "rgb(254, 242, 245)",
        "rgb(232, 250, 208)",
        "rgb(174, 229, 252)",
      ];

      var activeIndex = this.realIndex; // 현재 슬라이드 인덱스

      document.querySelector(".main_showcase").style.backgroundColor =
        colors[activeIndex];
    },
    autoplayTimeLeft(s, time, progress) {
      progressLine.style.width = 100 - progress * 100 + "%";
    },
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

swiper1.controller.control = swiper2;
swiper2.controller.control = swiper1;
