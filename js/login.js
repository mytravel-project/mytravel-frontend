const openLoginButton = document.getElementById("openLoginButton");
const logoutButton = document.getElementById("logoutButton");
const submitLoginButton = document.getElementById("submitLoginButton");
const loginMessage = document.getElementById("loginMessage");
const openSignupButton = document.getElementById("openSignupButton");

submitLoginButton.addEventListener("click", async () => {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  if (!email || !password) {
    loginMessage.textContent = "이메일 또는 비밀번호를 입력하세요.";
    return;
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!emailRegex.test(email)) {
    loginMessage.textContent =
      "유효하지 않은 이메일 형식입니다. 다시 입력해주세요.";
    return;
  }

  let Authorization = sessionStorage.getItem("Authorization");

  let response = await axios.post(
    "http://localhost:8080/tokenLogin",
    {
      email,
      password,
    },
    {
      headers: {
        Authorization: Authorization,
        "Content-Type": "application/json", // JSON 형식
      },
    }
  );

  const token = response.data.Authorization;
  const nickname = response.data.nickname;

  if (token && nickname) {
    alert("로그인되었습니다.");
    sessionStorage.setItem("Authorization", token);
    sessionStorage.setItem("nickname", nickname);
    axios.defaults.headers.common["Authorization"] = token;
    openLoginButton.classList.add("hidden");
    openSignupButton.classList.add("hidden");
    logoutButton.classList.remove("hidden");

    const modal = bootstrap.Modal.getInstance(
      document.getElementById("loginModal")
    );
    loginModal.setAttribute("aria-hidden", "true");
    modal.hide();
    window.location.reload();
  } else {
    loginMessage.textContent = response.data.msg;
  }
});

logoutButton.addEventListener("click", async () => {
  let Authorization = sessionStorage.getItem("Authorization");
  console.log(Authorization);
  await axios.post(
    "http://localhost:8080/logout",
    {},
    {
      headers: {
        Authorization: Authorization,
        "Content-Type": "application/json", // JSON 형식
      },
    }
  );
  sessionStorage.removeItem("nickname");
  sessionStorage.removeItem("Authorization");
  axios.defaults.headers.common["Authorization"] = "";
  window.location.reload();
});

const setLoginState = () => {
  let Authorization = sessionStorage.getItem("Authorization");
  const nickname = sessionStorage.getItem("nickname");

  if (Authorization && nickname) {
    // axios.defaults.headers.common["Authorization"] = Authorization;
    document.getElementById("loginSpan").innerHTML = `${nickname}`;
    openLoginButton.classList.add("hidden");
    openSignupButton.classList.add("hidden");
    logoutButton.classList.remove("hidden");
  }
};

setLoginState();
