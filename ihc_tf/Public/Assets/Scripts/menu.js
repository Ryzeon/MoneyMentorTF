const sideMenu = document.querySelector('aside');
const menuBtn = document.getElementById('menu-btn');


const darkMode = document.querySelector('.dark-mode');

menuBtn.addEventListener('click', () => {
    sideMenu.style.display = 'block';
});



darkMode.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode-variables');
    darkMode.querySelector('span:nth-child(1)').classList.toggle('active');
    darkMode.querySelector('span:nth-child(2)').classList.toggle('active');
})

document.addEventListener("DOMContentLoaded", () => {
    // Obtener el nombre del usuario actual desde LocalStorage
    const currentUser = localStorage.getItem("currentUser");
  
    if (currentUser) {
      // Mostrar el nombre del usuario en la página
      
        
      const usernameDisplay = document.getElementById("username-display");
        
      
      if (usernameDisplay) {
        usernameDisplay.textContent = currentUser;
      }
    } else {
      // Si no hay usuario activo, redirigir al inicio de sesión
      alert("No has iniciado sesión.");
      window.location.href = "acceso.html";
    }
});
  



