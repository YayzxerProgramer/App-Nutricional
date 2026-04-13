import { usuarios } from "../Datos/Datos.js";

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("loginForm");
    const usuarioInput = document.getElementById("usuario");
    const contrasenaInput = document.getElementById("contrasena");
    const usuarioError = document.getElementById("usuarioError");
    const contrasenaError = document.getElementById("contrasenaError");
    const mensaje = document.getElementById("mensaje");
    const verContra = document.getElementById("contrasenaVer");

    function limpiarErrores() {
        usuarioError.textContent = "";
        contrasenaError.textContent = "";
        mensaje.textContent = "";
    }

    // VALIDACIÓN USUARIO
    usuarioInput.addEventListener("input", function () {
        usuarioError.textContent =
            this.value.trim() === "" ? "El usuario es obligatorio." : "";
    });

    // 👁️ MOSTRAR / OCULTAR
    verContra.addEventListener("click", function () {
        const tipo = contrasenaInput.type === "password" ? "text" : "password";
        contrasenaInput.type = tipo;
        this.textContent = tipo === "password" ? "👁️" : "🙈";
    });

    // VALIDACIÓN CONTRASEÑA
    contrasenaInput.addEventListener("input", function () {
        contrasenaError.textContent =
            this.value.length < 4 ? "Mínimo 4 caracteres." : "";
    });

    // SUBMIT
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        limpiarErrores();

        const usuario = usuarioInput.value.trim();
        const contrasena = contrasenaInput.value;

        let hayErrores = false;

        if (usuario === "") {
            usuarioError.textContent = "El usuario es obligatorio.";
            hayErrores = true;
        }

        if (contrasena === "") {
            contrasenaError.textContent = "La contraseña es obligatoria.";
            hayErrores = true;
        } else if (contrasena.length < 4) {
            contrasenaError.textContent = "Mínimo 4 caracteres.";
            hayErrores = true;
        }

        if (hayErrores) return;

        const usuarioEncontrado = usuarios.find(u =>
            u.usuario.toLowerCase() === usuario.toLowerCase() &&
            u.contrasena === contrasena
        );

        if (usuarioEncontrado) {

            // alerta visual
            alert(`✅ Inicio de sesión exitoso\nBienvenido ${usuarioEncontrado.nombre}`);

            // mensaje en pantalla
            mensaje.style.color = "green";
            mensaje.textContent = `Bienvenido ${usuarioEncontrado.nombre}`;

            // guardar sesión
            localStorage.setItem("usuarioActivo", JSON.stringify(usuarioEncontrado));

            form.reset();

            // redirigir después de iniciar sesión
            setTimeout(() => {
                window.location.href = "index.html";
            }, 800);

        } else {

            alert("❌ Usuario o contraseña incorrectos");

            mensaje.style.color = "red";
            mensaje.textContent = "Usuario o contraseña incorrectos";
        }
    });

});