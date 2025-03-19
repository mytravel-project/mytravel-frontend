window.onload = async () => {

    let responseObj = await fetch('http://localhost:8080/getAllEventImages', {method: "GET"});
    let arr = await responseObj.json();
    
    let getBannerImages =``;
    
    arr.forEach(e => {
        if(e.category === "banner") {
            getBannerImages +=
            `<swiper-slide><img src="img/${e.eventimg}" /></swiper-slide>`;
        }; //else if() {

        // } else if() {

        // } else if() {

        // } else if() {

        // };
    
    document.getElementById("getBannerImages").innerHTML = getBannerImages; 
        
    });
    
}