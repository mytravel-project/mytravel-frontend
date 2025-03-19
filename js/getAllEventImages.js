window.onload = async () => {
    try {
        let responseObj = await fetch('http://localhost:8080/getAllEventImages', { method: "GET" });
        let arr = await responseObj.json();

        let getBannerImages = "";
        let getMainImages = "";

        arr.forEach(e => {
            if (e.category === "banner") {
                getBannerImages += 
                `<swiper-slide><img src="img/${e.eventimg}" /></swiper-slide>`;
            } else if (e.category === "mainpage") {
                getMainImages += 
                `<div class="swiper-slide swiper-slide-duplicate">
                <img src="img/${e.eventimg}" alt="${e.eventname}" class="main-image"/></div>`;
            }
        });

        document.getElementById("getBannerImages").innerHTML = getBannerImages;
        document.getElementById("getMainImages").innerHTML = getMainImages;

        // Swiper 다시 초기화
        new Swiper(".mySwiper", {
            pagination: { el: ".swiper-pagination", clickable: true },
            loop: true,
            autoplay: { delay: 3000, disableOnInteraction: false }
        });

    } catch (error) {
        console.error("이미지 불러오는 중 오류 발생:", error);
    }
};