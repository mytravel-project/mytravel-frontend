const tabBtns = document.querySelectorAll(".menu .swiper-slide");
const tabContents = document.querySelectorAll(".swiper-container-content");

tabBtns.forEach((btn, index) => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();

        tabBtns.forEach((btn) => {
            btn.classList.remove("active");
        });

        tabContents.forEach((content) => {
            content.classList.remove("active");
        });

        tabBtns[index].classList.add("active");
        tabContents[index].classList.add("active");
    })
})