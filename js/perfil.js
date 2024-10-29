//----funcion menu lateral---

function setActive(element) {
  // Remover la clase active de todos los enlaces
  const links = document.querySelectorAll(".nav-link");
  links.forEach((link) => {
    link.classList.remove("active");
  });

  // Agregar la clase active al enlace que se ha clicado
  element.classList.add("active");
}

//----funcion para la verificacion del usuario---

// Obtener el token JWT del localStorage
const token = localStorage.getItem("token");

if (!token) {
  alert("No has iniciado sesión");
  window.location.href = "login.html"; // Redirigir al login si no hay token
}

// Solicitar los datos del usuario al backend
async function getUserProfile() {
  try {
    const response = await fetch("/auth/perfil", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const user = await response.json();
      displayUserInfo(user);
    } else {
      alert("Error al obtener los datos del usuario");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

// Mostrar los datos del usuario en la página
//nombres, apellidos, son variables de register.html
function displayUserInfo(user) {
  document.getElementById("nombres").value = user.nombres;
  document.getElementById("nombreTitulo").value = user.nombres;
  document.getElementById("apellidos").value = user.apellidos;
  document.getElementById("correo").value = user.email;

  // Convertir la fecha a formato "YYYY-MM-DD" : valor real "2024-09-04T00:00:00.000Z"
  const fechaNacimiento = new Date(user.fechaNacimiento)
    .toISOString()
    .split("T")[0];
  document.getElementById("fechaN").value = fechaNacimiento;

  document.getElementById("genero").value = user.genero;
}

function logout() {
  // Lógica para cerrar sesión
  localStorage.removeItem("token");
  window.location.href = "login.html"; // Redirigir al login
}
// Llamar a la función para obtener el perfil del usuario
getUserProfile();
