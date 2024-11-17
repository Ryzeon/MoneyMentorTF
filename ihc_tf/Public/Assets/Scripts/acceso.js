const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

// Manejador de registro
const signUpForm = document.querySelector("#sign-up-form");
signUpForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Evita recargar la página al enviar el formulario

  // Obtener datos del formulario de registro
  const username = document.querySelector("#register-username").value.trim();
  const email = document.querySelector("#register-email").value.trim();
  const password = document.querySelector("#register-password").value;

  if (username && email && password) {
    // Verificar si el usuario ya existe
    if (localStorage.getItem(username)) {
      alert("Este usuario ya está registrado. Por favor, inicia sesión.");
    } else {
      // Guardar datos en LocalStorage
      const userData = { email, password }; // Guardar correo y contraseña
      localStorage.setItem(username, JSON.stringify(userData));
      alert("Registro exitoso. Ahora puedes iniciar sesión.");
      signUpForm.reset(); // Limpiar el formulario
    }
  } else {
    alert("Por favor, completa todos los campos.");
  }
});

// Manejador de inicio de sesión
const signInForm = document.querySelector("#sign-in-form");
signInForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Evita recargar la página al enviar el formulario

  // Obtener datos del formulario de inicio de sesión
  const username = document.querySelector("#login-username").value.trim();
  const password = document.querySelector("#login-password").value;

  // Verificar si el usuario está registrado
  const storedUser = localStorage.getItem(username);
  if (storedUser) {
    const userData = JSON.parse(storedUser);
    if (userData.password === password) {
      alert("Inicio de sesión exitoso.");
      window.location.href = "menu.html"; // Redirige al menú principal
    } else {
      alert("Contraseña incorrecta.");
    }
  } else {
    alert("Usuario no encontrado. Por favor, regístrate.");
  }
});
