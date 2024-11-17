document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM completamente cargado");

  // Cambiar entre las vistas
  const container = document.querySelector(".container");
  const toggleSignUp = document.querySelector("#toggle-sign-up");
  const toggleSignIn = document.querySelector("#toggle-sign-in");

<<<<<<< Updated upstream
sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});
=======
  toggleSignUp.addEventListener("click", () => {
    container.classList.add("sign-up-mode");
  });

  toggleSignIn.addEventListener("click", () => {
    container.classList.remove("sign-up-mode");
  });

  // Manejador de registro
  const signUpForm = document.querySelector("#sign-up-form");
  signUpForm.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log("Evento de registro activado");

    const username = document.querySelector("#register-username").value.trim();
    const email = document.querySelector("#register-email").value.trim();
    const password = document.querySelector("#register-password").value;

    if (username && email && password) {
      if (localStorage.getItem(username)) {
        alert("Este usuario ya está registrado. Por favor, inicia sesión.");
      } else {
        localStorage.setItem(username, JSON.stringify({ email, password }));
        alert("Registro exitoso. Ahora puedes iniciar sesión.");
        signUpForm.reset();
      }
    } else {
      alert("Por favor, completa todos los campos.");
    }
  });

  // Manejador de inicio de sesión
  const signInForm = document.querySelector("#sign-in-form");
  signInForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const username = document.querySelector("#login-username").value.trim();
    const password = document.querySelector("#login-password").value.trim();

    const storedUser = localStorage.getItem(username);
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      if (userData.password === password) {
        localStorage.setItem("currentUser", username);
        alert("Inicio de sesión exitoso.");
        window.location.href = "menu.html";
      } else {
        alert("Contraseña incorrecta.");
      }
    } else {
      alert("Usuario no encontrado. Por favor, regístrate.");
    }
  });
});
>>>>>>> Stashed changes
