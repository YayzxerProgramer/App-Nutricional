const form = document.getElementById("registerForm");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(form);

    const usuario = {
        nombre: formData.get("nombre"),
        correo: formData.get("correo"),
        password: formData.get("contrasena")
    };

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    usuarios.push(usuario);

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    console.log("Usuarios guardados:", usuarios);

    alert("Cuenta creada con éxito");

    form.reset();
});