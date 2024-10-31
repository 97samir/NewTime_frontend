//Al cargar la página (DOMContentLoaded), 
//se verifica si el token ya está en el localStorage.

document.addEventListener('DOMContentLoaded', () => {
    
    // Verificar si existe un token en el localStorage
    const token = localStorage.getItem('token');

    if (token) {
        // Redirigir al perfil si hay un token
        window.location.href = 'perfil.html'; 
    }


    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Evita el comportamiento por defecto del formulario

        // Verificar si existe un token antes de intentar iniciar sesión
        const token = localStorage.getItem('token');
        if (token) {
            // Si hay un token, muestra un SweetAlert y detiene el flujo
            Swal.fire({
                icon: "warning",
                title: "Ya hay un usuario registrado",
                text: "Debe cerrar la sesión de su cuenta.",
                //showCancelButton: true,
                confirmButtonText: "Ir a Perfil",
                //cancelButtonText: "Permanecer aquí"
                allowOutsideClick: false, // Desactiva clics fuera de la alerta
                allowEscapeKey: false // Desactiva tecla ESC para cerrar la alerta
            }).then((result) => {
                if (result.isConfirmed) {
                    // Redirigir al perfil si el usuario hace clic en "Ir a Perfil"
                    window.location.href = 'perfil.html';
                }
            });
            return; // Detener el flujo si ya hay un token
        }



        // Si no hay token, proceder con la solicitud de inicio de sesión

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

});