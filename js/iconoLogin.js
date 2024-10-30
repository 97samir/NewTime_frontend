//==== verifica si el usuario esta logueado para canmbiar de icono =====

document.addEventListener('DOMContentLoaded', () => {
    const authIcon = document.getElementById('verificadorIcon');

    // Verifica si el usuario está logueado
    function checkAuthStatus() {
        const token = localStorage.getItem('token');
        
        if (token) {
            // Si está logueado, cambia el icono para indicar acceso al perfil
            authIcon.classList.remove('bi', 'bi-box-arrow-in-right'); // Icono de usuario sin login
            authIcon.classList.add('bi', 'bi-person-check');           // Icono de usuario logueado
        } else {
            // Si no está logueado, muestra el icono normal
            authIcon.classList.remove('bi', 'bi-person-check');        // Icono de usuario logueado
            authIcon.classList.add('bi', 'bi-box-arrow-in-right');     // Icono de usuario sin login
        }
    }

    // Función para manejar el clic en el icono
    authIcon.addEventListener('click', () => {
        const token = localStorage.getItem('token');
        
        if (token) {
            // Si está logueado, redirige a la página de perfil
            window.location.href = 'perfil.html';
        } else {
            // Si no está logueado, redirige a la página de login
            window.location.href = 'login.html';
        }
    });

    // Al cargar la página, verifica el estado de autenticación
    checkAuthStatus();
});




