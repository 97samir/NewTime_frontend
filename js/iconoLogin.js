//==== verifica si el usuario esta logueado para canmbiar de icono =====

document.addEventListener('DOMContentLoaded', () => {
    const authIcon = document.getElementById('verificadorIcon');

    // Función para decodificar el token y verificar su expiración
    function isTokenExpired(token) {
        const payload = JSON.parse(atob(token.split('.')[1])); // Decodifica el payload
        const expirationTime = payload.exp * 1000; // Convierte a milisegundos

        // Compara el tiempo actual con el tiempo de expiración
        return Date.now() > expirationTime;
    }

    // Verifica si el usuario está logueado y si el token ha expirado
    function checkAuthStatus() {
        const token = localStorage.getItem('token');
        
        if (token) {
            if (isTokenExpired(token)) {
                // Si el token ha expirado, elimínalo y redirige al login
                
                localStorage.removeItem('token');
                
                
                // SweetAlert para sesión expirada con opciones
                Swal.fire({
                    icon: "warning",
                    title: "Sesión expirada",
                    text: "Tu sesión ha expirado. ¿Deseas iniciar sesión nuevamente?",
                    showDenyButton: true,
                    confirmButtonText: "Iniciar Sesión",
                    denyButtonText: "Permanecer en la Página",
                    allowOutsideClick: false, // Desactiva clics fuera de la alerta
                    allowEscapeKey: false // Desactiva tecla ESC para cerrar la alerta
                }).then((result) => {
                    if (result.isConfirmed) {
                        // Si el usuario elige "Iniciar Sesión", redirigir a login
                        window.location.href = 'login.html';
                    } 
                    else if (result.isDenied) {
                         // Si el usuario elige "Permanecer en la Página", no hace nada
                        return;
                    }
                });


            } else {
                // Cambia el icono para indicar que el usuario está logueado
                authIcon.classList.remove('bi', 'bi-box-arrow-in-right');
                authIcon.classList.add('bi', 'bi-person-check');
            }
        } else {
            // Si no hay token, muestra el icono de usuario sin login
            authIcon.classList.remove('bi', 'bi-person-check');
            authIcon.classList.add('bi', 'bi-box-arrow-in-right');
        }
    }

    // Maneja el clic en el icono de autenticación
    authIcon.addEventListener('click', () => {
        const token = localStorage.getItem('token');
        
        if (token && !isTokenExpired(token)) {
            // Si el usuario está logueado y el token es válido, redirige a perfil
            window.location.href = 'perfil.html';
        } else {
            // Si no está logueado o el token ha expirado, redirige a login
            window.location.href = 'login.html';
            
        }
    });

    // Al cargar la página, verifica el estado de autenticación
    checkAuthStatus();
});




