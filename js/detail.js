import config from "./config.js";
const { API_KEY } = config;

const getImageList = async (placeId) => {
  const swiperWrapper = document.querySelector(".swiper-wrapper");
  console.log(swiperWrapper);
  // const url = `https://apis.data.go.kr/B551011/KorService1/detailIntro1?serviceKey=${API_KEY}&MobileOS=ETC&MobileApp=AppTest&_type=json&contentId=${2037031}&contentTypeId=${12}`;
  const url = `https://apis.data.go.kr/B551011/KorService1/detailImage1?serviceKey=${API_KEY}&MobileOS=ETC&MobileApp=AppTest&_type=json&contentId=${placeId}&imageYN=Y&subImageYN=Y&numOfRows=10&pageNo=1`;

  try {
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);

    const imageList = response.data.response.body.items.item;
    imageList.forEach((image) => {
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
  } catch (error) {
    console.error("API 요청 실패:", error);
  }
};

const getQueryParam = (name) => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
};

const id = getQueryParam("id");

if (id) {
  getImageList(id);
} else {
}
