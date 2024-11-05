const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

const usernameInput = document.querySelector(".sign-in-form input[type='text']");
const passwordInput = document.querySelector(".sign-in-form input[type='password']");
const loginBtn = document.querySelector("#login-btn");

function toggleLoginButton() {
  if (usernameInput.value.trim() && passwordInput.value.trim()) {
    loginBtn.disabled = false;
  } else {
    loginBtn.disabled = true;
  }
}

usernameInput.addEventListener("input", toggleLoginButton);
passwordInput.addEventListener("input", toggleLoginButton);

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});
