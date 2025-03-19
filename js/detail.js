import config from "./config.js";
const { API_KEY } = config;

const getList = async (placeId) => {
  const swiperWrapper = document.querySelector(".swiper-wrapper");
  console.log(swiperWrapper);

  const response = await axios.get(
    `https://apis.data.go.kr/B551011/KorService1/detailImage1?serviceKey=${API_KEY}&MobileOS=ETC&MobileApp=AppTest&_type=json&contentId=1095732&imageYN=Y&subImageYN=Y&numOfRows=10&pageNo=1`
  );

  console.log();

  const imageList = response.data.response.body.items.item;
  imageList.forEach((image) => {
    console.log(image);
    const slide = document.createElement("div");
    slide.classList.add("swiper-slide");
    const img = document.createElement("img");
    img.src = image.originimgurl;
    img.alt = image.name;
    slide.appendChild(img);
    swiperWrapper.appendChild(slide);
  });

  new Swiper(".mySwiper", {
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
};

getList();
