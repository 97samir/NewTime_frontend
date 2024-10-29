document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita el comportamiento por defecto del formulario

    //fetch('https://newtimee.up.railway.app/auth/login', {
    fetch('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: document.querySelector('input[type="email"]').value,
            password: document.querySelector('input[type="password"]').value
        })
    })
    //.then(response => {response.json()}) //antes de agregar funcion "verificar usuario logueado"
    .then(response => {
        // Verificar si la respuesta es exitosa
        if (!response.ok){
            throw new Error('Error en la respuesta del servidor');
        }
        //convertir la respuesta a JSON
        return response.json();
    })
    .then(data => {

        if (data.message === 'Inicio de sesión exitoso') {
            
            Swal.fire({
                icon: "success",
                title: "Inicio de sesión exitoso.",
                showConfirmButton: false,
                timer: 1800
            });

            // Guardar el token de inicio de sesión en el localStorage
            localStorage.setItem('token', data.token);
            
            // Redirigir a otra página después del sweet alert
            setTimeout(() => {
                window.location.href = 'perfil.html';
            }, 1800);

            document.getElementById('loginForm').reset();
            
        }else {
            // alert(data.message || 'Error en el inicio de sesión');
            Swal.fire({
                icon: "error",
                title: data.error || 'Correo o contraseña incorrectos, error de servidor.',
                showConfirmButton: true
            });
        }
        
    })
    .catch(error => {
        console.error('Error en la petición:', error);
        //alert('Error en la solicitud');
        Swal.fire({
            icon: "error",
            title: 'Correo o contraseña incorrectos.',
            //text: 'Hubo un problema con el servidor. Intenta de nuevo más tarde.',
            showConfirmButton: true
        });
    });
});