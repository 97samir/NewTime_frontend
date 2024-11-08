// Establecer el max en la fecha de nacimiento al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    const fechaNacimiento = document.getElementById('fechaNacimiento');
    const today = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD
    const minDate = '1905-01-01'
    fechaNacimiento.setAttribute('max', today); // Solo permite seleccionar fechas hasta hoy
    fechaNacimiento.setAttribute('min', minDate); // Hasta el rango establecido

    // Validaciones en tiempo real

    document.getElementById('nombres').addEventListener('input', validateNombres);
    document.getElementById('apellidos').addEventListener('input', validateApellidos);
    document.getElementById('email').addEventListener('input', validateEmail);
    document.getElementById('password').addEventListener('input', validatePassword);
    fechaNacimiento.addEventListener('input', validateFechaNacimiento);
});

function validateNombres() {
    const nombres = document.getElementById('nombres');
    // const warning = document.getElementById('nombresWarning');
    const regex = /^[A-Za-z\s]+$/; // Solo letras y espacios
    if (!regex.test(nombres.value) && nombres.value.length > 0) {
        // warning.style.display = 'block';
        nombres.classList.add('is-invalid');
        nombres.classList.remove('is-valid'); // Eliminar clase válida si hay error
        // nombres.setCustomValidity('Ingrese solo letras.');
    } else {
        // warning.style.display = 'none';
        nombres.classList.remove('is-invalid');
        nombres.setCustomValidity('');
    }
}

function validateApellidos(){
    const apellidos = document.getElementById('apellidos');
    const regex = /^[A-Za-z\s]+$/; //solo letras y espacios
    if (!regex.test(apellidos.value) && apellidos.value.length > 0){
        apellidos.classList.add('is-invalid');
        apellidos.classList.remove('is-valid');
    } else {
        apellidos.classList.remove('is-invalid');
        apellidos.setCustomValidity('');
    }
}

function validateEmail(){
    const email = document.getElementById('email');
    const regex = /^[a-zA-Z0-9._-]+@(gmail\.com|hotmail\.com)$/; //solo letras y espacios
    if (!regex.test(email.value) && email.value.length > 0){
        email.classList.add('is-invalid');
        email.classList.remove('is-valid');
    } else {
        email.classList.remove('is-invalid');
        email.setCustomValidity('');
    }
}

function validatePassword() {
    const password = document.getElementById('password');
    if (password.value.length < 6 && password.value.length > 0) {
        password.classList.add('is-invalid');
        email.classList.remove('is-valid');
    } else {
        password.classList.remove('is-invalid');
        password.setCustomValidity('');
    }
}

function validateFechaNacimiento() {
    const fechaNacimiento = document.getElementById('fechaNacimiento');
    //const warning = document.getElementById('fechaNacimientoWarning');
    const today = new Date().toISOString().split('T')[0];
    const minDate = '1905-01-01';

    if (fechaNacimiento.value < minDate || fechaNacimiento.value > today) {
        //warning.style.display = 'block';
        fechaNacimiento.classList.add('is-invalid');
        fechaNacimiento.classList.remove('is-valid');
        
    } else {
        //warning.style.display = 'none';
        fechaNacimiento.classList.remove('is-invalid');
        fechaNacimiento.setCustomValidity('');
    }
}

function isValidDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Los meses empiezan desde 0
    const year = date.getFullYear();

    const [inputYear, inputMonth, inputDay] = dateString.split('-').map(Number);
    return (
        year === inputYear &&
        month === inputMonth &&
        day === inputDay
    );
}

// Envio de datos y consulta con el backend

document.getElementById('registerForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    // Asegurarse de validar todos los campos antes de enviar
    validateNombres();
    validateApellidos();
    validateEmail();
    validatePassword();
    validateFechaNacimiento();

    // Solo si todos los campos son válidos, proceder con la solicitud
    if (document.querySelector('.is-invalid')) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Debes ingresar valores válidos.",
            allowOutsideClick: false, // Desactiva clics fuera de la alerta
            allowEscapeKey: false // Desactiva tecla ESC para cerrar la alerta
        });
        return; // Evitar el envío si hay campos inválidos
    }
    const userData = {
        nombres : document.getElementById('nombres').value,
        apellidos : document.getElementById('apellidos').value,
        email : document.getElementById('email').value,
        password : document.getElementById('password').value,
        fechaNacimiento : document.getElementById('fechaNacimiento').value,
        genero : document.querySelector('input[name="genero"]:checked')?.value
    }
        
    try {
        //const response = await fetch('https://newtimee.up.railway.app/auth/register', {
        const response = await fetch('http://localhost:3000/auth/register', {
            //url navegador: http://localhost:3000/register.html
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        });

        const data = await response.json();
        if (response.ok && data.message === 'Usuario registrado con éxito') {

            Swal.fire({
                icon: "success",
                title: "Usuario registrado con éxito",
                showConfirmButton: false,
                timer: 1800
                });
            
            document.getElementById('registerForm').reset();
            
        } else {
            // alert('Mensaje: ' + (data.message || 'El correo ya se encuentra registrado.'));
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "El correo ya se encuentra registrado.",
            });

        }
    } catch (error) {
        console.error('Error en la petición:', error);
        alert('Hubo un problema con la solicitud.');
    }
});