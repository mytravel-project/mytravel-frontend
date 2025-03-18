// 로그인 여부 확인하기
const checkLoginState = async () => {
    const likeBtn = document.querySelectorAll(".like-btn");

    let Authorization = sessionStorage.getItem("Authorization");
    const nickname = sessionStorage.getItem("nickname");

    likeBtn.forEach(button => {
        if (!(Authorization && nickname)) {      
            button.addEventListener("click", (event) => {
                event.preventDefault(); // 기본 동작 방지
                alert("로그인 후 이용이 가능합니다.");
            });
        }
    });
};

document.addEventListener("DOMContentLoaded", async () => {
    await checkLoginState();
});

//좋아요 등록 및 취소 처리하기
async function toggleLike(placeId, button) {
    const Authorization = sessionStorage.getItem("Authorization");
    if (!Authorization) return alert("로그인 후 이용이 가능합니다.");

    if (!placeId) {
        console.error("해당하는 장소가 존재하지 않습니다.");
        return;
    }

    try {
        const response = await axios.post("http://localhost:8080/toggleLike", 
            { placeId },
            { headers: { Authorization } }
        );

        console.log("좋아요 변경:", response.data);

        if (response.data.message === "좋아요를 눌렀습니다.") {
            button.classList.add("active");
        } else if (response.data.message === "좋아요가 취소되었습니다.") {
            button.classList.remove("active");
        }
    } catch (error) {
        console.error("좋아요 변경 중 오류 발생:", error);
    }
}

document.querySelectorAll(".like-btn").forEach(button => {
    button.addEventListener("click", async () => {
        const placeId = button.dataset.placeId;
        await toggleLike(placeId, button);
    });
});

//좋아요 상태 유지하기
const restoreLikeStatus = async () => {
    const likeBtn = document.querySelectorAll(".like-btn");
    let Authorization = sessionStorage.getItem("Authorization");

    if (!Authorization) return;

    likeBtn.forEach(async button => {
        const placeId = button.getAttribute("data-place-id");

        if (!placeId) {
            console.error("해당하는 장소가 존재하지 않습니다.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8080/checkMyPlaceLike", 
                { placeId },
                { headers: { Authorization } }
            );
    
            if (response.data.isLiked) {
                button.classList.add("active");
            } else  {
                button.classList.remove("active");
            }
        } catch (error) {
            console.error("좋아요 상태를 불러오는 중 오류 발생:", error);
        }
    });
};

document.addEventListener("DOMContentLoaded", async () => {
    await restoreLikeStatus();
});