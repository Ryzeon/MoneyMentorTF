const calendar = document.querySelector(".calendar"),
  date = document.querySelector(".date"),
  daysContainer = document.querySelector(".days"),
  prev = document.querySelector(".prev"),
  next = document.querySelector(".next"),
  todayBtn = document.querySelector(".today-btn"),
  gotoBtn = document.querySelector(".goto-btn"),
  dateInput = document.querySelector(".date-input"),
  eventDay = document.querySelector(".event-day"),
  eventDate = document.querySelector(".event-date"),
  eventsContainer = document.querySelector(".events"),
  addEventBtn = document.querySelector(".add-event"),
  addEventWrapper = document.querySelector(".add-event-wrapper "),
  addEventCloseBtn = document.querySelector(".close "),
  addEventTitle = document.querySelector(".event-name "),
  addEventFrom = document.querySelector(".event-time-from "),
  addEventTo = document.querySelector(".event-time-to "),
  addEventSubmit = document.querySelector(".add-event-btn ");

let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();

const months = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

const eventsArr = [];
getEvents(); // Obtener eventos guardados en localStorage
console.log(eventsArr);

// Función para inicializar el calendario
function initCalendar() {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const prevLastDay = new Date(year, month, 0);
  const prevDays = prevLastDay.getDate();
  const lastDate = lastDay.getDate();
  const day = firstDay.getDay();
  const nextDays = 7 - lastDay.getDay() - 1;

  date.innerHTML = months[month] + " " + year;

  let days = "";

  // Agregar días del mes anterior
  for (let x = day; x > 0; x--) {
    days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
  }

  // Agregar días del mes actual
  for (let i = 1; i <= lastDate; i++) {
    // Verificar si hay eventos en ese día
    let event = false;
    eventsArr.forEach((eventObj) => {
      if (
        eventObj.day === i &&
        eventObj.month === month + 1 &&
        eventObj.year === year
      ) {
        event = true;
      }
    });

    // Marcar el día actual como activo
    if (
      i === new Date().getDate() &&
      year === new Date().getFullYear() &&
      month === new Date().getMonth()
    ) {
      activeDay = i;
      getActiveDay(i);
      updateEvents(i);
      if (event) {
        days += `<div class="day today active event">${i}</div>`;
      } else {
        days += `<div class="day today active">${i}</div>`;
      }
    } else {
      if (event) {
        days += `<div class="day event">${i}</div>`;
      } else {
        days += `<div class="day">${i}</div>`;
      }
    }
  }

  // Agregar días del siguiente mes
  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="day next-date">${j}</div>`;
  }

  daysContainer.innerHTML = days;
  addListner(); // Agregar listeners a los días
}

// Función para el mes anterior
function prevMonth() {
  month--;
  if (month < 0) {
    month = 11;
    year--;
  }
  initCalendar();
}

// Función para el siguiente mes
function nextMonth() {
  month++;
  if (month > 11) {
    month = 0;
    year++;
  }
  initCalendar();
}

prev.addEventListener("click", prevMonth);
next.addEventListener("click", nextMonth);

initCalendar();

// Función para añadir listener a los días del calendario
function addListner() {
  const days = document.querySelectorAll(".day");
  days.forEach((day) => {
    day.addEventListener("click", (e) => {
      getActiveDay(e.target.innerHTML);
      updateEvents(Number(e.target.innerHTML));
      activeDay = Number(e.target.innerHTML);

      // Quitar la clase 'active' de todos los días
      days.forEach((day) => {
        day.classList.remove("active");
      });

      // Si se hace clic en prev-date o next-date, cambiar al mes correspondiente
      if (e.target.classList.contains("prev-date")) {
        prevMonth();
        // Agregar 'active' al día clickeado después de cambiar el mes
        setTimeout(() => {
          const days = document.querySelectorAll(".day");
          days.forEach((day) => {
            if (
              !day.classList.contains("prev-date") &&
              day.innerHTML === e.target.innerHTML
            ) {
              day.classList.add("active");
            }
          });
        }, 100);
      } else if (e.target.classList.contains("next-date")) {
        nextMonth();
        // Agregar 'active' al día clickeado después de cambiar el mes
        setTimeout(() => {
          const days = document.querySelectorAll(".day");
          days.forEach((day) => {
            if (
              !day.classList.contains("next-date") &&
              day.innerHTML === e.target.innerHTML
            ) {
              day.classList.add("active");
            }
          });
        }, 100);
      } else {
        e.target.classList.add("active");
      }
    });
  });
}

// Botón para ir al día actual
todayBtn.addEventListener("click", () => {
  today = new Date();
  month = today.getMonth();
  year = today.getFullYear();
  initCalendar();
});

// Validar el formato de la fecha ingresada manualmente
dateInput.addEventListener("input", (e) => {
  dateInput.value = dateInput.value.replace(/[^0-9/]/g, "");
  if (dateInput.value.length === 2) {
    dateInput.value += "/";
  }
  if (dateInput.value.length > 7) {
    dateInput.value = dateInput.value.slice(0, 7);
  }
  if (e.inputType === "deleteContentBackward") {
    if (dateInput.value.length === 3) {
      dateInput.value = dateInput.value.slice(0, 2);
    }
  }
});

// Botón para ir a una fecha específica ingresada manualmente
gotoBtn.addEventListener("click", gotoDate);

function gotoDate() {
  const dateArr = dateInput.value.split("/");
  if (dateArr.length === 2) {
    if (dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4) {
      month = dateArr[0] - 1;
      year = dateArr[1];
      initCalendar();
      return;
    }
  }
  alert("Fecha no válida");
}

// Función para obtener el día activo y actualizar eventDay y eventDate
function getActiveDay(date) {
  const day = new Date(year, month, date);
  const dayName = day.toString().split(" ")[0];
  eventDay.innerHTML = dayName;
  eventDate.innerHTML = date + " " + months[month] + " " + year;
}

// Función para actualizar los eventos cuando se activa un día
function updateEvents(date) {
  let events = "";
  eventsArr.forEach((event) => {
    if (
      date === event.day &&
      month + 1 === event.month &&
      year === event.year
    ) {
      event.events.forEach((event) => {
        events += `<div class="event">
            <div class="title">
              <i class="fas fa-circle"></i>
              <h3 class="event-title">${event.title}</h3>
            </div>
            <div class="event-time">
              <span class="event-time">${event.time}</span>
            </div>
              <i class="check-icon fas fa-check">✔️</i>
              <i class="error-icon fas fa-check">❌</i>
        </div>`;
      });
    }
  });

  if (events === "") {
    events = `<div class="no-event">
            <h3>No hay eventos</h3>
        </div>`;
  }

  eventsContainer.innerHTML = events;
  saveEvents(); // Guardar eventos en localStorage
}

// Botón para añadir un evento
addEventBtn.addEventListener("click", () => {
  addEventWrapper.classList.toggle("active");
});

// Botón para cerrar el formulario de añadir evento
addEventCloseBtn.addEventListener("click", () => {
  addEventWrapper.classList.remove("active");
});

// Cerrar el formulario si se hace clic fuera del mismo
document.addEventListener("click", (e) => {
  if (e.target !== addEventBtn && !addEventWrapper.contains(e.target)) {
    addEventWrapper.classList.remove("active");
  }
});

// Limitar a 50 caracteres en el campo del título del evento
addEventTitle.addEventListener("input", (e) => {
  addEventTitle.value = addEventTitle.value.slice(0, 20);
});

// Permitir solo formato de hora en los campos de tiempo de evento
addEventFrom.addEventListener("input", (e) => {
  addEventFrom.value = addEventFrom.value.replace(/[^0-9:]/g, "");
  if (addEventFrom.value.length === 2) {
    addEventFrom.value += ":";
  }
  if (addEventFrom.value.length > 5) {
    addEventFrom.value = addEventFrom.value.slice(0, 5);
  }
});

addEventTo.addEventListener("input", (e) => {
  addEventTo.value = addEventTo.value.replace(/[^0-9:]/g, "");
  if (addEventTo.value.length === 2) {
    addEventTo.value += ":";
  }
  if (addEventTo.value.length > 5) {
    addEventTo.value = addEventTo.value.slice(0, 5);
  }
});

// Función para añadir un evento a eventsArr
addEventSubmit.addEventListener("click", () => {
  const eventTitle = addEventTitle.value;
  const eventTimeFrom = addEventFrom.value;
  const eventTimeTo = addEventTo.value;

  if (eventTitle === "" || eventTimeFrom === "" || eventTimeTo === "") {
    alert("Completa todos los campos");
    return;
  }

  // Verificar formato correcto de hora en formato 24 horas
  const timeFromArr = eventTimeFrom.split(":");
  const timeToArr = eventTimeTo.split(":");
  if (
    timeFromArr.length !== 2 ||
    timeToArr.length !== 2 ||
    timeFromArr[0] > 23 ||
    timeFromArr[1] > 59 ||
    timeToArr[0] > 23 ||
    timeToArr[1] > 59
  ) {
    alert("Hora inválida");
    return;
  }

  const timeFrom = convertTime(eventTimeFrom);
  const timeTo = convertTime(eventTimeTo);

  // Verificar si el evento ya está agregado
  let eventExist = false;
  eventsArr.forEach((event) => {
    if (
      event.day === activeDay &&
      event.month === month + 1 &&
      event.year === year
    ) {
      event.events.forEach((event) => {
        if (event.title === eventTitle) {
          eventExist = true;
        }
      });
    }
  });

  if (eventExist) {
    alert("Evento ya agregado");
    return;
  }

  const newEvent = {
    title: eventTitle,
    time: timeFrom + " - " + timeTo,
  };

  let eventAdded = false;
  if (eventsArr.length > 0) {
    eventsArr.forEach((item) => {
      if (
        item.day === activeDay &&
        item.month === month + 1 &&
        item.year === year
      ) {
        item.events.push(newEvent);
        eventAdded = true;
      }
    });
  }

  if (!eventAdded) {
    eventsArr.push({
      day: activeDay,
      month: month + 1,
      year: year,
      events: [newEvent],
    });
  }

  addEventWrapper.classList.remove("active");
  addEventTitle.value = "";
  addEventFrom.value = "";
  addEventTo.value = "";
  updateEvents(activeDay);

  // Seleccionar el día activo y añadir la clase 'event' si no está añadida
  const activeDayEl = document.querySelector(".day.active");
  if (activeDayEl && !activeDayEl.classList.contains("event")) {
    activeDayEl.classList.add("event");
  }
});

// Función para eliminar evento al hacer clic en un evento
eventsContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("check-icon")) { // Solo si se hace clic en el ícono de check
    if (confirm("¿Estás seguro de que deseas marcar este evento como completado?")) {
      const eventTitle = e.target.parentElement.querySelector(".event-title").innerHTML;
      eventsArr.forEach((event) => {
        if (
          event.day === activeDay &&
          event.month === month + 1 &&
          event.year === year
        ) {
          event.events = event.events.filter(
            (item) => item.title !== eventTitle
          );

          // Si no hay eventos restantes en ese día, quitar ese día de eventsArr
          if (event.events.length === 0) {
            eventsArr.splice(eventsArr.indexOf(event), 1);
            // Quitar la clase 'event' del día
            const activeDayEl = document.querySelector(".day.active");
            if (activeDayEl && activeDayEl.classList.contains("event")) {
              activeDayEl.classList.remove("event");
            }
          }
        }
      });
      updateEvents(activeDay);
    }
  } else {
    if (e.target.classList.contains("error-icon")) { // Solo si se hace clic en el ícono de check
      if (confirm("¿Estás seguro de que deseas borrar este evento?")) {
        const eventTitle = e.target.parentElement.querySelector(".event-title").innerHTML;
        eventsArr.forEach((event) => {
          if (
            event.day === activeDay &&
            event.month === month + 1 &&
            event.year === year
          ) {
            event.events = event.events.filter(
              (item) => item.title !== eventTitle
            );
  
            // Si no hay eventos restantes en ese día, quitar ese día de eventsArr
            if (event.events.length === 0) {
              eventsArr.splice(eventsArr.indexOf(event), 1);
              // Quitar la clase 'event' del día
              const activeDayEl = document.querySelector(".day.active");
              if (activeDayEl && activeDayEl.classList.contains("event")) {
                activeDayEl.classList.remove("event");
              }
            }
          }
        });
        updateEvents(activeDay);
      }
    } 
  } 
});

// Función para guardar eventos en localStorage
function saveEvents() {
  localStorage.setItem("events", JSON.stringify(eventsArr));
}

// Función para obtener eventos desde localStorage
function getEvents() {
  if (localStorage.getItem("events") === null) {
    return;
  }
  eventsArr.push(...JSON.parse(localStorage.getItem("events")));
}

// Función para convertir formato de hora
function convertTime(time) {
  let timeArr = time.split(":");
  let timeHour = timeArr[0];
  let timeMin = timeArr[1];
  let timeFormat = timeHour >= 12 ? "PM" : "AM";
  timeHour = timeHour % 12 || 12;
  time = timeHour + ":" + timeMin + " " + timeFormat;
  return time;
}
