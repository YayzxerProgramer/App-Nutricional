function obtenerUsuario() {
    return JSON.parse(localStorage.getItem("usuarioActivo")) || {
        nombre: "Usuario",
        apellido: "",
        correo: "",
        usuario: "",
        edad: 0,
        altura: 0,
        peso: 0,
        meta: "Sin meta definida"
    };
}

function obtenerComidas() {
    return JSON.parse(localStorage.getItem("comidas")) ?? [];
}

function calcularResumen(comidas) {
    return comidas.reduce(
        function (acc, comida) {
            return {
                calorias: acc.calorias + (comida.calorias || 0),
                proteinas: acc.proteinas + (comida.proteinas || 0),
                carbohidratos: acc.carbohidratos + (comida.carbohidratos || 0),
                grasas: acc.grasas + (comida.grasas || 0),
            };
        },
        { calorias: 0, proteinas: 0, carbohidratos: 0, grasas: 0 }
    );
}

//calcular Indice de masa corporal
function calcularIMC(peso, altura) {
    if (!peso || !altura) return { imc: "—", estado: "—" };
    const alturaM = altura / 100;
    const imc = (peso / (alturaM * alturaM)).toFixed(1);

    let estado = "Normal";
    if (imc < 18.5) estado = "Bajo peso";
    else if (imc >= 25 && imc < 30) estado = "Sobrepeso";
    else if (imc >= 30) estado = "Obesidad";

    return { imc, estado };
}

function cargarPerfil() {
    const usuario = obtenerUsuario();
    const comidas = obtenerComidas();
    const resumen = calcularResumen(comidas);
    const { imc, estado } = calcularIMC(usuario.peso, usuario.altura);

    //Datos personales
    const elNombre = document.getElementById("perfil-nombre");
    const elUsuario = document.getElementById("perfil-usuario");
    const elCorreo = document.getElementById("perfil-correo");
    const elCorreo2 = document.getElementById("perfil-correo-2");
    const elMeta = document.getElementById("perfil-meta");

    if (elNombre) elNombre.textContent = (usuario.nombre + " " + usuario.apellido).trim();
    if (elUsuario) elUsuario.textContent = usuario.usuario ? "@" + usuario.usuario : "";
    if (elCorreo) elCorreo.textContent = usuario.correo || "—";
    if (elCorreo2) elCorreo2.textContent = usuario.correo || "—";
    if (elMeta) elMeta.textContent = usuario.meta || "Sin meta definida";

    const elEdad = document.getElementById("stat-edad");
    const elAltura = document.getElementById("stat-altura");
    const elPeso = document.getElementById("stat-peso");
    const elImc = document.getElementById("stat-imc");
    const elEstado = document.getElementById("stat-imc-estado");

    if (elEdad) elEdad.textContent = usuario.edad ? usuario.edad + " años" : "—";
    if (elAltura) elAltura.textContent = usuario.altura ? usuario.altura + " cm" : "—";
    if (elPeso) elPeso.textContent = usuario.peso ? usuario.peso + " kg" : "—";
    if (elImc) elImc.textContent = imc;
    if (elEstado) elEstado.textContent = estado;

    //Resumen nutricional
    const elCal = document.getElementById("nut-calorias");
    const elProt = document.getElementById("nut-proteinas");
    const elCarb = document.getElementById("nut-carbos");
    const elGras = document.getElementById("nut-grasas");

    if (elCal) elCal.textContent = resumen.calorias;
    if (elProt) elProt.textContent = resumen.proteinas + "g";
    if (elCarb) elCarb.textContent = resumen.carbohidratos + "g";
    if (elGras) elGras.textContent = resumen.grasas + "g";
}

function activarEdicion() {
    const btnEditar = document.getElementById("btn-editar");
    const btnGuardar = document.getElementById("btn-guardar");
    const formEdicion = document.getElementById("form-edicion");

    if (!btnEditar || !btnGuardar) return;

    const campos = ["nombre", "apellido", "edad", "altura", "peso", "meta", "correo"];

    // Abre el formulario y rellena los inputs con los datos actuales
    btnEditar.addEventListener("click", function () {
        const usuario = obtenerUsuario();

        campos.forEach(function (campo) {
            const input = document.getElementById("edit-" + campo);
            if (input) {
                input.value = usuario[campo] || "";
                input.disabled = false;
            }
        });

        formEdicion.classList.remove("oculto");
        btnEditar.classList.add("oculto");
        btnGuardar.classList.remove("oculto");
    });

    btnGuardar.addEventListener("click", function () {
        const usuario = obtenerUsuario();

        campos.forEach(function (campo) {
            const input = document.getElementById("edit-" + campo);
            if (input) {
                usuario[campo] = (input.value !== "" && !isNaN(input.value))
                    ? Number(input.value)
                    : input.value;
                input.disabled = true;
            }
        });

        localStorage.setItem("usuarioActivo", JSON.stringify(usuario));

        cargarPerfil();
        formEdicion.classList.add("oculto");
        btnEditar.classList.remove("oculto");
        btnGuardar.classList.add("oculto");
        mostrarMensajes("Perfil actualizado correctamente");

        if (window.dashboard) window.dashboard.actualizar();
    });
}

function activarLogout() {
    const btnLogout = document.getElementById("btn-logout");
    if (!btnLogout) return;

    btnLogout.addEventListener("click", function () {
        localStorage.removeItem("usuarioActivo");
        window.location.href = "../index.html";
    });
}

//alertas de mensaje cuando hay cambios
function mostrarMensajes(mensaje) {
    const toast = document.getElementById("toast");
    if (!toast) return;
    toast.textContent = mensaje;
    toast.classList.add("visible");
    setTimeout(function () { toast.classList.remove("visible"); }, 3000);
}

document.addEventListener("DOMContentLoaded", function () {
    cargarPerfil();
    activarEdicion();
    activarLogout();
});
