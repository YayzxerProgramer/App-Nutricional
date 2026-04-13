import { usuarios } from "../Datos/Datos.js";

const form = document.getElementById("registerForm");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(form);
    const correo = formData.get("correo");

    const existe = usuarios.find(u => u.usuario === correo);
    if (existe) {
        alert("Usuario ya registrado");
        return;
    }

    usuarios.push({
        id: usuarios.length + 1,
        nombre: formData.get("nombre"),
        usuario: correo,
        contrasena: formData.get("contrasena")
    });

    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    alert("Cuenta creada con éxito");
    form.reset();
});