const tabBtns = document.querySelectorAll(".menu .swiper-slide-spring");
const tabContents = document.querySelectorAll(".spring-content");

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