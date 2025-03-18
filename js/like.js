// 로그인 여부 체크 후 버튼 활성화/비활성화
function checkLoginState() {
    const Authorization = sessionStorage.getItem("Authorization");
    const nickname = sessionStorage.getItem("nickname");
    const likeButtons = document.querySelectorAll(".like-btn");

    if (Authorization && nickname) {
        likeButtons.forEach(button => {
            button.onclick = function() {
                toggleLike(this);
            };
        });
    } else {
        likeButtons.forEach(button => {
            button.onclick = function() {
                alert("로그인 후 좋아요를 누를 수 있습니다.");
            };
        });
    }
}

// 좋아요 토글 기능
function toggleLike(button) {
    if (button.classList.contains("active")) {
        // 좋아요 취소 (비활성 이미지로 변경)
        button.classList.remove("active");
    } else {
        // 좋아요 누름 (활성 이미지로 변경)
        button.classList.add("active");
    }
}