// ---------------------------
// Inicialización del DOM
// ---------------------------

const usuariosDB = {
    "Eleanor Villanueva": "user1.png",
    "Alejandro Almonte": "user2.png",
    "Carlos Rodriguez": "user3.png",
    "Sonia Soto": "user4.png",
    "Roberto Saenz": "user5.png",
    "Kenji Nakamura": "user6.png"
};

document.addEventListener('DOMContentLoaded', function () {
    console.log("DOM completamente cargado y parseado");

    // Inicializar funcionalidades
    inicializarSidebar();
    inicializarBotonesResponder();
    inicializarPopup();
});

// ---------------------------
// Función: Manejo del Sidebar
// ---------------------------
function inicializarSidebar() {
    // Mapear enlaces del sidebar
    const sidebarLinks = {
        inicio: { element: 'inicio_sidebar', href: 'menu.html' },
        calculadora: { href: 'calculadora.html' },
        calendario: { href: 'calendario.html' },
        analisis: { href: 'analisis.html' },
        gestion: { href: 'Gestion.html' },
        metas: { href: 'metas.html' },
        consejos: { href: 'Consejos.html' },
        foro: { href: 'foro.html' },
        añadir: { href: '#', message: 'Funcionalidad de añadir aún no implementada' },
        logout: { href: '#', message: 'Cerrando sesión...' },
    };

    // Añadir eventos a cada enlace del sidebar
    for (const key in sidebarLinks) {
        const link = sidebarLinks[key];
        const element = link.element
            ? document.getElementById(link.element)
            : document.querySelector(`a[href="${link.href}"]`);

        if (element) {
            element.addEventListener('click', () => {
                if (link.href === '#') {
                    alert(link.message || 'Función no implementada');
                } else {
                    window.location.href = link.href;
                }
            });
        } else {
            console.warn(`Elemento del sidebar no encontrado: ${key}`);
        }
    }
}

// ---------------------------
// Función: Botones "Responder"
// ---------------------------
function inicializarBotonesResponder() {
    // Seleccionar todos los botones con clase 'responder-btn'
    const buttons = document.querySelectorAll('.responder-btn');
    console.log("Botones encontrados:", buttons.length);

    buttons.forEach((button) => {
        button.addEventListener('click', () => manejarRespuesta(button));
    });
}

// Función para manejar la acción de responder
function manejarRespuesta(button) {
    console.log("Botón clickeado");
    const post = button.closest('.post');

    if (post) {
        const userName = post.querySelector('.user-info h4')?.textContent || 'Usuario desconocido';
        const question = post.querySelector('p')?.textContent || 'Sin pregunta';

        console.log("Usuario:", userName, "Pregunta:", question);
        mostrarPopup(userName, question);
    } else {
        console.error("El botón no está dentro de un post válido.");
    }
}

// ---------------------------
// Función: Manejo del Popup
// ---------------------------
// Base de datos simulada para comentarios
let comentariosDB = {
    "¿Cuál es su estrategia de ahorro favorita?": [
        {
            usuario: "Alejandro Almonte",
            texto: "A mí por lo general me gusta usar aplicaciones de ahorro.",
            imagen: "user2.png"
        },
        {
            usuario: "Sonia Soto",
            texto: "Registro mis ingresos y gastos en Excel.",
            imagen: "user4.png"
        }
    ],
    "¿Cuándo es el momento adecuado para empezar a planificar para la jubilación?": [
        {
            usuario: "Carlos Rodriguez",
            texto: "Lo ideal es empezar desde joven, pero nunca es tarde para empezar.",
            imagen: "user3.png"
        }
    ]
};

// Mostrar el popup con datos dinámicos
function mostrarPopup(userName, question) {
    const popup = document.getElementById('popup');
    const popupName = document.getElementById('popup-name');
    const popupQuestion = document.getElementById('popup-question');
    const popupComments = document.getElementById('popup-comments');
    const commentInput = document.getElementById('comment-input');
    const userImg = document.querySelector('.header .user-img'); // Imagen del usuario que pregunta

    if (popup && popupName && popupQuestion && popupComments && commentInput && userImg) {
        popupName.textContent = userName;
        popupQuestion.textContent = question;
        commentInput.value = ""; // Limpiar el campo de texto

        // Asignar imagen al usuario que pregunta
        if (usuariosDB[userName]) {
            userImg.src = `ihc_tf/Public/Assets/Img/${usuariosDB[userName]}`;
        } else {
            userImg.src = "ihc_tf/Public/Assets/Img/default_user.png"; // Imagen predeterminada si no se encuentra
        }

        // Limpiar comentarios anteriores
        popupComments.innerHTML = "";

        // Agregar comentarios relacionados a la pregunta
        if (comentariosDB[question]) {
            comentariosDB[question].forEach(comment => {
                const commentElement = document.createElement("div");
                commentElement.className = "comment";

                // Crear el comentario con la imagen dinámica
                commentElement.innerHTML = `
                    <img src="ihc_tf/Public/Assets/Img/${comment.imagen}" alt="${comment.usuario}" class="comment-img">
                    <div class="comment-body">
                        <h4 class="comment-user">${comment.usuario}</h4>
                        <p>${comment.texto}</p>
                    </div>
                `;
                popupComments.appendChild(commentElement);
            });
        } else {
            popupComments.innerHTML = "<p>No hay comentarios para esta pregunta.</p>";
        }

        popup.classList.remove('hidden');
        console.log("Popup mostrado");
    } else {
        console.error("Elementos del popup no encontrados.");
    }
}


// Cerrar el popup
function cerrarPopup() {
    const popup = document.getElementById('popup');
    if (popup) {
        popup.classList.add('hidden');
        console.log("Popup cerrado");
    } else {
        console.error("Elemento del popup no encontrado.");
    }
}

// Enviar comentario
function enviarComentario() {
    const commentInput = document.getElementById('comment-input');
    const popupQuestion = document.getElementById('popup-question');
    const popupComments = document.getElementById('popup-comments');

    const question = popupQuestion.textContent.trim();
    const newComment = commentInput.value.trim();

    if (newComment === "") {
        alert("El comentario no puede estar vacío.");
        return;
    }

    // Agregar comentario a la base de datos
    if (!comentariosDB[question]) {
        comentariosDB[question] = [];
    }

    comentariosDB[question].push({ usuario: "Usuario Actual", texto: newComment });

    // Actualizar la UI
    const commentElement = document.createElement("div");
    commentElement.className = "comment";

    commentElement.innerHTML = `
        <img src="ihc_tf/Public/Assets/Img/daf.jpg" alt="Usuario Actual" class="comment-img">
        <div class="comment-body">
            <h4 class="comment-user">Usuario Actual</h4>
            <p>${newComment}</p>
        </div>
    `;
    popupComments.appendChild(commentElement);

    // Limpiar el campo de texto
    commentInput.value = "";
    console.log("Comentario enviado y guardado:", newComment);
}

// Inicializar eventos
document.addEventListener('DOMContentLoaded', () => {
    const closePopup = document.getElementById('close-popup');
    const sendComment = document.getElementById('send-comment');

    if (closePopup) {
        closePopup.addEventListener('click', cerrarPopup);
    }

    if (sendComment) {
        sendComment.addEventListener('click', enviarComentario);
    }
});

