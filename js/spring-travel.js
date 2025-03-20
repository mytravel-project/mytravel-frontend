const tabBtns = document.querySelectorAll(".menu .swiper-slide");
const tabContents = document.querySelectorAll(".swiper-container-content");

tabBtns.forEach((btn, index) => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();

        tabBtns.forEach((btn) => {
            btn.classList.remove("on");
        });

        tabContents.forEach((content) => {
            content.classList.remove("on");
        });

        tabBtns[index].classList.add("on");
        tabContents[index].classList.add("on");
    })
})