import config from "./config.js";
const { RECAPTCHA_KEY } = config;

document.getElementById("nickname").addEventListener("input", isValidNickname);
document.getElementById("nickname").addEventListener("blur", async () => {
  if (!isValidNickname()) return;
  const nickname = document.getElementById("nickname").value.trim();
  await checkNicknameDuplicate(nickname);
});

document.getElementById("signupEmail").addEventListener("input", isValidEmail);
document.getElementById("signupEmail").addEventListener("blur", async () => {
  if (!isValidEmail()) return;
  const email = document.getElementById("signupEmail").value.trim();
  await checkEmailDuplicate(email);
});

document
  .getElementById("signupPassword")
  .addEventListener("input", isValidPassword);
document
  .getElementById("signupPassword")
  .addEventListener("blur", isValidPassword);

document
  .getElementById("passwordCheck")
  .addEventListener("input", checkPassword);
document
  .getElementById("passwordCheck")
  .addEventListener("blur", checkPassword);

// 가입 버튼
document
  .getElementById("signupBtn")
  .addEventListener("click", async (event) => {
    event.preventDefault(); // 제출 시 새로고침 방지

    const nickname = document.getElementById("nickname").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value.trim();
    const passwordCheck = document.getElementById("passwordCheck").value.trim();

    const birthYearElement = document.getElementById("birth-year");
    const birth_year = birthYearElement ? birthYearElement.value : null;

    const genderElement = document.querySelector(
      'input[name="gender"]:checked'
    );
    const gender = genderElement ? genderElement.value : null;

    const residence_state = document.getElementById("residenceState").value;
    const residence_city = document.getElementById("residenceCity").value;

    // 필수 항목 입력 확인
    if (
      !nickname ||
      !email ||
      !password ||
      !passwordCheck ||
      !gender ||
      !birth_year ||
      !residence_state ||
      !residence_city
    ) {
      alert("모든 필드를 입력해야 합니다☹️");
      return;
    }

    // 유효성 검사 실행
    const isNicknameValid = isValidNickname();
    const isNicknameExists = await checkNicknameDuplicate(nickname);

    const isEmailValid = isValidEmail();
    const isEmailExists = await checkEmailDuplicate(email);

    const isPasswordValid = isValidPassword();
    const isPasswordMatch = checkPassword();

    // 모든 유효성 검사를 통과해야 회원가입 요청 보내기
    if (
      !isNicknameValid ||
      isNicknameExists ||
      !isEmailValid ||
      isEmailExists ||
      !isPasswordValid ||
      !isPasswordMatch
    ) {
      return; // 요청 차단
    }

    const data = {
      nickname,
      password,
      email,
      gender,
      birth_year,
      residence_state,
      residence_city,
    };

    try {
      const response = await axios.post("http://localhost:8080/register", data);

      if (response.data === "환영합니다") {
        const modalElement = document.getElementById("signupModal");
        let modal = bootstrap.Modal.getInstance(modalElement);
        if (!modal) {
          modal = new bootstrap.Modal(modalElement);
        }
        alert("대한민국 구석구석에 오신 것을 환영합니다✨");
        modal.hide();
      }
    } catch (error) {
      console.error("회원가입 요청 실패:", error);
      alert("회원가입 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  });

// 가입 취소 버튼
document.getElementById("signupCancelBtn").addEventListener("click", () => {
  const modalElement = document.getElementById("signupModal");
  let modal = bootstrap.Modal.getInstance(modalElement);
  if (!modal) {
    modal = new bootstrap.Modal(modalElement);
  }
  modal.hide();
});

document.getElementById("nickname").addEventListener("blur", async () => {
  const nickname = document.getElementById("nickname").value.trim();
  await checkNicknameDuplicate(nickname);
});

// 닉네임 중복 검사
let isCheckingNickname = false;

async function checkNicknameDuplicate(nickname) {
  const nicknameError = document.getElementById("nicknameError");
  const nicknameInput = document.getElementById("nickname");

  if (!nickname) return false;

  if (isCheckingNickname) return; // 중복 실행 방지
  isCheckingNickname = true;

  try {
    const response = await axios.post(
      "http://localhost:8080/isNicknameExists",
      { nickname }
    );

    if (response.data.exists) {
      nicknameError.textContent = "이미 사용 중인 닉네임입니다.";
      nicknameInput.style.border = "1px solid red";
      return false;
    } else {
      nicknameError.textContent = "";
      nicknameInput.style.border = "1px solid #ccc";
      return true;
    }
  } catch (error) {
    console.error("오류 발생:", error);
    return false;
  }
}

// 닉네임 유효성 검사
function isValidNickname() {
  const nicknameInput = document.getElementById("nickname");
  const nicknameError = document.getElementById("nicknameError");
  const nickname = nicknameInput.value.trim();

  const nicknamePattern = /^[a-zA-Z0-9가-힣]{2,15}$/; //2자리 이상 15자리 이하, 특수문자 X

  if (!nickname) {
    nicknameError.textContent = "닉네임을 입력해주세요.";
    nicknameInput.style.border = "1px solid red";
    return false;
  } else if (!nicknamePattern.test(nickname)) {
    nicknameError.textContent =
      "닉네임은 2자리 이상 15자리 이하이며, 특수문자를 포함할 수 없습니다.";
    nicknameInput.style.border = "1px solid red";
    return false;
  } else {
    nicknameError.textContent = "";
    nicknameInput.style.border = "1px solid #ccc";
    return true;
  }
}

//이메일 유효성 검사
function isValidEmail() {
  const emailInput = document.getElementById("signupEmail");
  const emailError = document.getElementById("emailError");
  const email = emailInput.value.trim();

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  if (!email) {
    emailError.textContent = "이메일을 입력해주세요.";
    emailInput.style.border = "1px solid red";
    return false;
  } else if (!emailPattern.test(email)) {
    emailError.textContent =
      "유효하지 않은 이메일 형식입니다. 다시 입력해주세요.";
    emailInput.style.border = "1px solid red";
    return false;
  } else {
    emailError.textContent = "";
    emailInput.style.border = "1px solid #ccc";
    return true;
  }
}

// 이메일 중복 검사
let isCheckingEmail = false;

async function checkEmailDuplicate(email) {
  const emailError = document.getElementById("emailError");
  const emailInput = document.getElementById("signupEmail");

  if (!email) return false;

  if (isCheckingEmail) return; // 중복 실행 방지
  isCheckingEmail = true;

  try {
    const response = await axios.post("http://localhost:8080/isEmailExists", {
      email,
    });

    if (response.data.exists) {
      emailError.textContent =
        "이미 가입된 이메일입니다. 다른 이메일을 입력해주세요.";
      emailInput.style.border = "1px solid red";
      return false;
    } else {
      emailError.textContent = "";
      emailInput.style.border = "1px solid #ccc";
      return true;
    }
  } catch (error) {
    console.error("이메일을 확인하는 중 오류가 발생하였습니다: ", error);
    return false;
  }
}

// 비밀번호 유효성 검사
function isValidPassword() {
  const passwordInput = document.getElementById("signupPassword");
  const passwordError = document.getElementById("passwordError");
  const password = passwordInput.value;

  const passwordPattern =
    /^(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;

  if (!password) {
    passwordError.textContent = "비밀번호를 입력해주세요.";
    passwordInput.style.border = "1px solid red";
    return false;
  } else if (!passwordPattern.test(password)) {
    passwordError.textContent =
      "비밀번호는 특수문자, 숫자 포함 8자리 이상이어야 합니다.";
    passwordInput.style.border = "1px solid red";
    return false;
  } else {
    passwordError.textContent = "";
    passwordInput.style.border = "1px solid #ccc";
    return true;
  }
}

// 비밀번호 일치 검사
function checkPassword() {
  const passwordInput = document.getElementById("signupPassword");
  const passwordCheckInput = document.getElementById("passwordCheck");
  const passwordCheckError = document.getElementById("passwordCheckError");

  if (passwordInput.value !== passwordCheckInput.value) {
    passwordCheckError.textContent = "비밀번호가 일치하지 않습니다.";
    passwordCheckInput.style.border = "1px solid red";
    return false;
  } else {
    passwordCheckError.textContent = "";
    passwordCheckInput.style.border = "1px solid #ccc";
    return true;
  }
}

let storedData;

async function fetchData() {
  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/cosmosfarm/korea-administrative-district/master/korea-administrative-district.json"
    );

    if (!response.ok) {
      throw new Error(response.status);
    }
    storedData = await response.json();
  } catch (error) {
    console.error(error);
  }
}

//거주지 필터링하기
function displayResidence() {
  const stateName = []; //도/광역시 저장 배열
  const cityName = {}; //시/군/구 저장 배열

  storedData.data.forEach((e) => {
    const state = Object.keys(e)[0]; //도/광역시
    const cityList = e[state]; //도/광역시에 매칭되는 시/군/구 배열

    stateName.push(state); //도/광역시 추가
    cityName[state] = cityList; //시/군/구 추가
  });

  const stateSelect = document.getElementById("residenceState");
  const citySelect = document.getElementById("residenceCity");

  stateSelect.innerHTML = `<option value="" disabled selected>도/광역시 선택</option>`;
  stateName.forEach((state) => {
    const option = document.createElement("option");
    option.value = state;
    option.textContent = state;
    stateSelect.appendChild(option);
  });

  citySelect.innerHTML = `<option value="" disabled selected>시/군/구 선택</option>`;

  stateSelect.addEventListener("change", function () {
    const selectedState = this.value;

    citySelect.innerHTML = `<option value="" disabled selected>시/군/구 선택</option>`;

    if (selectedState && cityName[selectedState]) {
      cityName[selectedState].forEach((city) => {
        const option = document.createElement("option");
        option.value = city;
        option.textContent = city;
        citySelect.appendChild(option);
      });
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  fetchData().then(() => {
    displayResidence();
  });

  const signupFooter = document.getElementById("signupFooter");
  const recaptchaDiv = document.createElement("div");
  recaptchaDiv.className = "g-recaptcha";
  recaptchaDiv.setAttribute("data-sitekey", RECAPTCHA_KEY);
  recaptchaDiv.setAttribute("data-callback", "recaptcha");
  signupFooter.prepend(recaptchaDiv);
});

document.addEventListener("DOMContentLoaded", () => {
  const birthYearElement = document.getElementById("birth-year");
  let isYearOptionExisted = false;

  //option 목록 생성 여부 확인
  birthYearElement.addEventListener("focus", () => {
    if (!isYearOptionExisted) {
      for (let i = 2025; i >= 1940; i--) {
        const birthOption = document.createElement("option");
        birthOption.setAttribute("value", i);
        birthOption.innerText = i;
        birthYearElement.appendChild(birthOption);
      }
      isYearOptionExisted = true; // 중복 추가 방지
    }
  });
});
