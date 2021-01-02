// variables
const btnSend = document.querySelector("#enviar");
const email = document.getElementById("email");
const asunto = document.getElementById("asunto");
const mensaje = document.getElementById("mensaje");
const formulario = document.getElementById("formulario");

const btnReset = document.querySelector('.reset')

const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

callListeners();
function callListeners() {
  document.addEventListener("DOMContentLoaded", iniciarApp);

  email.addEventListener("blur", validarFormulario);
  asunto.addEventListener("blur", validarFormulario);
  mensaje.addEventListener("blur", validarFormulario);

  btnReset.addEventListener('click', resetForm)
  formulario.addEventListener("submit", enviarFormulario);
}

// funciones
function iniciarApp() {
  btnSend.disabled = true;
  btnSend.classList.add("disable");
}

function validarFormulario(e) {
  if (e.target.value.length > 0) {
    if (document.querySelector(".alert-input")) {
      const error = document.querySelector(".alert-input");
      error.remove();
    }
    e.target.style.borderBottom = "2px solid #33FF5E";
  } else {
    e.target.style.borderBottom = "2px solid red";
    mostrarError("* Todos los campos son obligatorios");
  }

  if (e.target.type === "email") {
    if (er.test(e.target.value)) {
      if (document.querySelector(".alert-input")) {
        const error = document.querySelector(".alert-input");
        error.remove();
      }
      e.target.style.borderBottom = "2px solid #33FF5E";
    } else {
      mostrarError("El email no es valido");
      e.target.style.borderBottom = "2px solid red";
    }
  }

  if (er.test(email.value) && asunto.value !== "" && mensaje.value !== "") {
    btnSend.disabled = false;
    btnSend.classList.remove("disable");
  }
}
function mostrarError(mensaje) {
  let p = document.createElement("p");
  p.textContent = mensaje;
  p.className = "alert-input";
  const alert = document.querySelectorAll(".alert-input");
  if (alert.length === 0) {
    formulario.appendChild(p);
  }
}

function enviarFormulario(e) {
  e.preventDefault();
  const spinner = document.getElementById("spinner");
  spinner.style.display = "block";

  setTimeout(() => {
    spinner.style.display = "none";
    const p = document.createElement('p')
    p.className = "mensaje-enviado"
    p.textContent = "Mensaje enviado. ✨"
    formulario.insertBefore(p, formulario.childNodes[6])
    setTimeout(() => {
      p.remove()
      resetForm() 
    }, 3000);
  }, 2000);
}

function resetForm() {
  formulario.reset();
  iniciarApp();
}
