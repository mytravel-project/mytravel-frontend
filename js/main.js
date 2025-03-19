window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");

  if (window.scrollY > 100) {
    // 100px 이상 스크롤 시
    navbar.style.backgroundColor = "#FFFFFF"; // 하얀색
    navbar.style.boxShadow = "0px 4px 10px rgba(0, 0, 0, 0.1)"; // 살짝 그림자 추가
    navbar.style.transition =
      "background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out";
  } else {
    navbar.style.backgroundColor = "transparent"; // 원래 투명 상태
    navbar.style.boxShadow = "none"; // 그림자 제거
  }
});
