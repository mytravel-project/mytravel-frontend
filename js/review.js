const placeId = 1;

// 로그인 여부 체크
const checkLoginState = () => {
  const reviewInput = document.getElementById("reviewText");
  const submitBtn = document.querySelector(".submitBtn");

  let Authorization = sessionStorage.getItem("Authorization");
  const nickname = sessionStorage.getItem("nickname");

  if (Authorization && nickname) {
    reviewInput.disabled = false; // 입력 활성화
    reviewInput.placeholder = "소중한 리뷰를 남겨주세요.";
    submitBtn.textContent = "등록"; // 버튼 변경
    submitBtn.onclick = insertReview; // 등록 버튼 기능 추가
  } else {
    reviewInput.disabled = true;
    submitBtn.textContent = "로그인";
    submitBtn.onclick = () => alert("로그인 후 댓글을 작성할 수 있습니다.");
  }
};

// 리뷰 가져오기
const renderReviews = async () => {
  let Authorization = sessionStorage.getItem("Authorization");

  try {
    const response = await axios.post(
      "http://localhost:8080/getRecentReviews",
      { placeId },
      {
        headers: {
          Authorization: Authorization,
          "Content-Type": "application/json", // JSON 형식
        },
      }
    );

    const reviews = response.data;
    const container = document.getElementById("reviewList");
    container.innerHTML = "";
    if (!reviews || reviews.length === 0) {
      container.innerHTML += "<p>리뷰가 없습니다.</p>";
      return;
    }

    reviews.forEach((review) => {
      const reviewElement = document.createElement("div");
      reviewElement.classList.add("review");
      const nickname = sessionStorage.getItem("nickname");

      // 진위여부 더 강화하면 좋을듯!
      const isMyReview = review.userNickname === nickname;
      const editButton = isMyReview
        ? `<button onclick="updateReview(${review.id}, event)" data-review-id=${review.id}><i class="ri-pencil-fill"></i></button>`
        : "";
      const deleteButton = isMyReview
        ? `<button onclick="deleteReview(${review.id})"><i class="ri-delete-bin-line"></i></button>`
        : "";

      reviewElement.innerHTML = `
                    <div class="reviewContent" data-review-id=${review.id}>
                        <div class="reviewName">${review.userNickname}</div>
                        <div class="reviewText">${review.reviewText}</div>
                        <div class="reviewDate">${review.updatedAt.substring(
                          0,
                          10
                        )}</div>
                    </div>
                    <div class="reviewActions">
                        ${editButton}
                        ${deleteButton}
                    </div>
                `;
      container.appendChild(reviewElement);
    });

    document.getElementById("reviewCount").textContent = reviews.length;
  } catch (error) {
    console.error("데이터 가져오기 실패:", error);
    document.getElementById("reviewList").innerHTML = "<p>리뷰 로드 실패</p>";
  }
};

// 리뷰 등록 기능
const insertReview = async () => {
  const reviewTextElement = document.getElementById("reviewText");
  let reviewText = reviewTextElement.value.trim();

  if (!reviewText) {
    alert("리뷰를 입력해주세요.");
    return;
  }

  function escapeHTML(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  reviewText = escapeHTML(reviewText);

  try {
    let Authorization = sessionStorage.getItem("Authorization");

    const response = await axios.post(
      "http://localhost:8080/insertReview",
      {
        placeId,
        reviewText,
      },
      {
        headers: {
          Authorization: Authorization,
          "Content-Type": "application/json", // JSON 형식
        },
      }
    );

    if (response.status === 200) {
      alert("리뷰가 등록되었습니다.");
      document.getElementById("reviewText").value = ""; // 입력창 초기화
      renderReviews(); // 댓글 새로고침
    }
  } catch (error) {
    console.error("리뷰 등록 실패:", error);
    alert("리뷰 등록에 실패했습니다.");
  }
};

// 리뷰 수정 기능
const updateReview = async (reviewId, event) => {
  // 클릭된 버튼이 속한 리뷰 요소 찾기
  const review = event.target.closest(".review");
  console.log(review);

  if (!review) {
    console.error("리뷰 요소를 찾을 수 없습니다.");
    return;
  }

  // 기존 리뷰 텍스트 가져오기
  let reviewTextElement = review.querySelector(".reviewText");
  const oldText = reviewTextElement.textContent;

  // 입력 필드로 변경
  reviewTextElement.innerHTML = `
        <input type="text" value="${oldText}" id="editInput">
        <div class="btnWrap">
          <button onclick="saveReview(${reviewId})" class="editBtn">저장</button>
        </div>
    `;
};

const saveReview = async (id) => {
  const editInput = document.getElementById("editInput");
  const reviewText = editInput.value.trim();

  if (!reviewText) {
    alert("수정할 내용을 입력하세요.");
    return;
  }

  try {
    let Authorization = sessionStorage.getItem("Authorization");

    const response = await axios.post(
      "http://localhost:8080/updateReview",
      {
        id,
        reviewText,
      },
      {
        headers: {
          Authorization: Authorization,
          "Content-Type": "application/json", // JSON 형식
        },
      }
    );

    if (response.status === 200) {
      alert("리뷰가 수정되었습니다.");
      window.location.reload();
    }
  } catch (error) {
    console.error("리뷰 수정 실패:", error);
    alert("리뷰 수정에 실패했습니다.");
  }
};

// 리뷰 삭제 기능
const deleteReview = async (id) => {
  if (!confirm("정말 삭제하겠습니까?")) return;

  try {
    let Authorization = sessionStorage.getItem("Authorization");

    const response = await axios.post(
      "http://localhost:8080/deleteReview",
      {
        id,
      },
      {
        headers: {
          Authorization: Authorization,
          "Content-Type": "application/json", // JSON 형식
        },
      }
    );

    console.log(response);

    if (response.status === 200) {
      alert("리뷰가 삭제되었습니다.");
    }
  } catch (error) {
    console.error("리뷰 삭제 실패:", error);
    alert("리뷰 삭제에 실패했습니다.");
  }

  window.location.reload();
};

document.addEventListener("DOMContentLoaded", () => {
  const submitBtn = document.querySelector(".submitBtn");

  if (submitBtn) {
    submitBtn.addEventListener("click", () => {
      let Authorization = sessionStorage.getItem("Authorization");
      let nickname = sessionStorage.getItem("nickname");

      if (
        !Authorization ||
        Authorization === "" ||
        !nickname ||
        nickname === ""
      ) {
        const modal = new bootstrap.Modal(
          document.getElementById("loginModal")
        );
        modal.show();
      }
    });
  }
});

checkLoginState();
renderReviews();
