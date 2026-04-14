// registroComida.js

function obtenerComidas() {
    return JSON.parse(localStorage.getItem("comidas")) ?? [];
}

function guardarComidas(lista) {
    localStorage.setItem("comidas", JSON.stringify(lista));
}

function renderLista() {
    var contenedor = document.getElementById("registro-lista");
    if (!contenedor) return;

    var comidas = obtenerComidas();

    if (comidas.length === 0) {
        contenedor.innerHTML = '<p class="registro-vacio">No hay comidas registradas aún.</p>';
        return;
    }

    var html = '<p class="registro-lista-titulo">Comidas registradas</p>';
    html += comidas.map(function (c) {
        return '<div class="reg-item">' +
            '<span class="reg-item-tipo">' + c.tipo + '</span>' +
            '<span class="reg-item-nombre">' + c.nombre + '</span>' +
            '<span class="reg-item-kcal">' + c.calorias + ' kcal</span>' +
            '<button onclick="eliminarComida(' + c.id + ')">✕</button>' +
        '</div>';
    }).join("");

    contenedor.innerHTML = html;
}

function eliminarComida(id) {
    var lista = obtenerComidas().filter(function (c) { return c.id !== id; });
    guardarComidas(lista);
    renderLista();
}

document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("registroForm");
    if (!form) return;

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        var nombre = document.getElementById("reg-nombre").value.trim();
        if (!nombre) return;

        var comida = {
            id:            Date.now(),
            nombre:        nombre,
            tipo:          document.getElementById("reg-tipo").value,
            calorias:      Number(document.getElementById("reg-calorias").value) || 0,
            proteinas:     Number(document.getElementById("reg-proteinas").value) || 0,
            carbohidratos: Number(document.getElementById("reg-carbos").value)    || 0,
            grasas:        Number(document.getElementById("reg-grasas").value)    || 0,
            fecha:         new Date().toISOString()
        };

        var lista = obtenerComidas();
        lista.unshift(comida);
        guardarComidas(lista);
        form.reset();
        renderLista();
    });

    renderLista();
});