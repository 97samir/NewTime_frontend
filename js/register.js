document.getElementById('registerForm').addEventListener('submit', async (event) => {
    event.preventDefault();

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