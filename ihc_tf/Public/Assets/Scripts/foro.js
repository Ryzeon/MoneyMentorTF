document.addEventListener('DOMContentLoaded', function () {
    // Obtener los elementos de los enlaces del sidebar
    const inicioSidebar = document.getElementById('inicio_sidebar');
    const calculadoraSidebar = document.querySelector('a[href="calculadora.html"]');
    const calendarioSidebar = document.querySelector('a[href="calendario.html"]');
    const analisisSidebar = document.querySelector('a[href="analisis.html"]');
    const gestionSidebar = document.querySelector('a[href="Gestion.html"]');
    const metasSidebar = document.querySelector('a[href="Metas.html"]');
    const consejosSidebar = document.querySelector('a[href="Consejos.html"]');
    const foroSidebar = document.querySelector('a[href="Foro.html"]');
    const añadirSidebar = document.querySelector('a[href="#"]'); // Cambia esta ruta si tienes una página para "Añadir"
    const logoutSidebar = document.querySelector('a[href="#"]'); // Cambia esta ruta si tienes una página de "Logout"

    // Agregar eventos para redirigir a cada página correspondiente
    inicioSidebar.addEventListener('click', function () {
        window.location.href = 'menu.html'; // Redirige al menú
    });

    calculadoraSidebar.addEventListener('click', function () {
        window.location.href = 'calculadora.html'; // Redirige a la página de calculadora
    });

    calendarioSidebar.addEventListener('click', function () {
        window.location.href = 'calendario.html'; // Redirige al calendario
    });

    analisisSidebar.addEventListener('click', function () {
        window.location.href = 'analisis.html'; // Redirige al análisis
    });

    gestionSidebar.addEventListener('click', function () {
        window.location.href = 'Gestion.html'; // Redirige a la gestión
    });

    metasSidebar.addEventListener('click', function () {
        window.location.href = 'Metas.html'; // Redirige a las metas
    });

    consejosSidebar.addEventListener('click', function () {
        window.location.href = 'Consejos.html'; // Redirige a consejos
    });

    foroSidebar.addEventListener('click', function () {
        window.location.href = 'Foro.html'; // Redirige al foro
    });

    añadirSidebar.addEventListener('click', function () {
        // Redirige a la página de añadir (cambia si tienes una URL específica)
        alert('Funcionalidad de añadir aún no implementada');
    });

    logoutSidebar.addEventListener('click', function () {
        // Aquí puedes añadir la funcionalidad para cerrar sesión
        alert('Cerrando sesión...');
        // Si tienes una página de logout, redirige allí:
        // window.location.href = 'logout.html';
    });
});
