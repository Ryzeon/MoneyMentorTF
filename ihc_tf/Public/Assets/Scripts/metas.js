
const inicioSidebar = document.getElementById('inicio_sidebar');
    const calculadoraSidebar = document.querySelector('a[href="calculadora.html"]');
    const calendarioSidebar = document.querySelector('a[href="calendario.html"]');
    const analisisSidebar = document.querySelector('a[href="analisis.html"]');
    const gestionSidebar = document.querySelector('a[href="Gestion.html"]');
    const metasSidebar = document.querySelector('a[href="Metas.html"]');
    const consejosSidebar = document.querySelector('a[href="Consejos.html"]');
    const foroSidebar = document.querySelector('a[href="Foro.html"]');

const addGoalBtn = document.getElementById("addGoalBtn");
const goalModal = document.getElementById("goalModal");
const closeModal = document.querySelector(".close");
const saveGoalBtn = document.getElementById("saveGoalBtn");

const goalDescription = document.getElementById("goalDescription");
const goalAmount = document.getElementById("goalAmount");
const goalPriority = document.getElementById("goalPriority");
const goalStatus = document.getElementById("goalStatus");
const goalDeadline = document.getElementById("goalDeadline");

const goalsTableBody = document.getElementById("goalsTable").querySelector("tbody");

// Mostrar el modal
addGoalBtn.addEventListener("click", () => {
  goalModal.style.display = "block";
});

// Cerrar el modal
closeModal.addEventListener("click", () => {
  goalModal.style.display = "none";
});

// Guardar la meta y agregarla a la tabla
saveGoalBtn.addEventListener("click", () => {
  const description = goalDescription.value;
  const amount = goalAmount.value;
  const priority = goalPriority.value;
  const status = goalStatus.value;
  const deadline = goalDeadline.value;

  if (description && amount && priority && status && deadline) {
    // Determinar la clase de prioridad basada en el valor seleccionado
    let priorityClass = "";
    if (priority === "1era prioridad") {
      priorityClass = "priority-1";
    } else if (priority === "2da prioridad") {
      priorityClass = "priority-2";
    } else if (priority === "3era prioridad") {
      priorityClass = "priority-3";
    }

    // Crear una nueva fila en la tabla
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td>${description}</td>
      <td>${amount}</td>
      <td class="${priorityClass}">${priority}</td> <!-- Aquí aplicamos la clase -->
      <td>${status}</td>
      <td>${deadline}</td>
    `;
    
    // Agregar la fila a la tabla
    goalsTableBody.appendChild(newRow);

    // Limpiar el formulario y cerrar el modal
    goalDescription.value = "";
    goalAmount.value = "";
    goalPriority.value = "1era prioridad";
    goalStatus.value = "Pendiente";
    goalDeadline.value = "";
    goalModal.style.display = "none";
  } else {
    alert("Por favor, completa todos los campos.");
  }
});


