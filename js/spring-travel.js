const tabButtonElements = document.querySelectorAll(".menu .tab-btn");
const tabContentElements = document.querySelectorAll(".spring-content");

tabButtonElements.forEach((btn, index) => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();

        tabButtonElements.forEach((btn) => {
            btn.classList.remove("on");
        });

        tabContentElements.forEach((content) => {
            content.classList.remove("on");
        });

        tabButtonElements[index].classList.add("on");
        tabContentElements[index].classList.add("on");
    })
})