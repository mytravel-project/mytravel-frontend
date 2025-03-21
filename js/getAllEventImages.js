window.onload = async () => {
  try {
    let responseObj = await fetch("http://localhost:8080/getAllEventImages", {
      method: "GET",
    });
    let arr = await responseObj.json();

    let getBannerImages = "";
    let getMainImages = "";

    arr.forEach((e) => {
      if (e.category === "banner") {
        getBannerImages += `<div class="swiper-slide"><img src="img/${e.eventimg}" /></div>`;
      } else if (e.category === "mainpage") {
        getMainImages += `<div class="swiper-slide"><img src="img/${e.eventimg}" alt="${e.eventname}" class="main-image"/></div>`;
      }
    });

    // Swiper 컨테이너 내부의 swiper-wrapper에 삽입
    document.querySelector("#getBannerImages .swiper-wrapper").innerHTML =
      getBannerImages;

    document.querySelector("#getMainImages").innerHTML = getMainImages;

    // Swiper 다시 초기화
    new Swiper(".mySwiper", {
      pagination: { el: ".swiper-pagination", clickable: true },
      loop: true,
      autoplay: { delay: 3000, disableOnInteraction: false },
    });
  } catch (error) {
    console.error("이미지 불러오는 중 오류 발생:", error);
  }
};
