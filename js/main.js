const tipos = ["Desayuno", "Almuerzo", "Merienda", "Cena"];
const horas = ["07:30 AM", "01:15 PM", "04:00 PM", "07:45 PM"];

let comidasHoy = comidas.slice(0, 4);
let comidasAyer = comidas.slice(4);

function renderCards(lista) {
  const cardsContainer = document.getElementById("cards-container");
  cardsContainer.innerHTML = "";

  const totalKcal = lista.reduce((acc, c) => acc + c.calorias, 0);
  const totalProteinas = lista.reduce((acc, c) => acc + c.proteinas, 0);
  document.getElementById("total-kcal").textContent = totalKcal.toLocaleString() + " kcal";
  document.getElementById("total-proteinas").textContent = totalProteinas;

  if (lista.length === 0) {
    cardsContainer.innerHTML = `<p style="color:#aaa; font-size:14px;">No hay comidas con ese filtro.</p>`;
    return;
  }

  lista.forEach((comida, i) => {
    const tipoIndex = i % tipos.length;
    cardsContainer.innerHTML += `
      <div class="comida-card">
        <div class="comida-card-top">
          <div class="comida-icon">
            <img src="imagenes/${comida.imagen}" alt="${comida.nombre}"
                onerror="this.style.display='none'">
          </div>
          <div class="comida-meta">
            <div class="tipo-comida">${tipos[tipoIndex]} • ${horas[tipoIndex]}</div>
            <div class="nombre-comida">${comida.nombre}</div>
            <div class="comida-detalle">
              <span>${comida.calorias} Kcal</span>
              <span>${comida.proteinas}g proteína</span>
            </div>
          </div>
          <div class="mas-btn">···</div>
        </div>
        <div class="desglose-row">
          <div class="desglose-toggle" onclick="toggleDesglose(this)">
            Desglose detallado <span>▾</span>
          </div>
          <div class="desglose-details" style="display:none">
            <div class="macro">
              <span class="macro-label">Carbohidratos</span>
              <span class="macro-valor">${comida.carbohidratos}g</span>
            </div>
            <div class="macro">
              <span class="macro-label">Proteínas</span>
              <span class="macro-valor">${comida.proteinas}g</span>
            </div>
            <div class="macro">
              <span class="macro-label">Gramos</span>
              <span class="macro-valor">${comida.gramos}g</span>
            </div>
          </div>
        </div>
      </div>`;
  });
}

function renderLista(lista) {
  const listaContainer = document.getElementById("lista-container");
  listaContainer.innerHTML = "";

  if (lista.length === 0) {
    listaContainer.innerHTML = `<p style="color:#aaa; font-size:14px; padding:16px;">No hay comidas con ese filtro.</p>`;
    return;
  }

  lista.forEach((comida, i) => {
    const tipoIndex = i % tipos.length;
    listaContainer.innerHTML += `
      <div class="comida-fila">
        <div class="comida-fila-icon">🍽️</div>
        <div class="comida-fila-info">
          <span class="comida-fila-nombre">${comida.nombre}</span>
          <span class="comida-fila-tipo">${tipos[tipoIndex]} • ${horas[tipoIndex]}</span>
        </div>
        <div class="comida-fila-kcal">
          <div>
            <span class="kcal-valor">${comida.calorias}</span>
            <span class="kcal-label">kcal</span>
          </div>
          ${comida.calorias > 200 ? '<div class="tag-alerta">Alto en calorías</div>' : ""}
        </div>
        <div class="comida-fila-arrow">›</div>
      </div>`;
  });
}


function toggleDesglose(toggle) {
  const detalles = toggle.nextElementSibling;
  const abierto = detalles.style.display === "grid";
  detalles.style.display = abierto ? "none" : "grid";
  toggle.querySelector("span").textContent = abierto ? "▾" : "▴";
  toggle.childNodes[0].textContent = abierto ? "Desglose detallado " : "Ocultar detalles ";
}

let filtroTipo = "todos";
let filtroRango = "todos";

function aplicarFiltros() {
  let filtradosHoy = comidas.slice(0, 4);
  let filtradosAyer = comidas.slice(4);


  if (filtroTipo !== "todos") {
    filtradosHoy = filtradosHoy.filter((_, i) => tipos[i % tipos.length].toLowerCase() === filtroTipo);
    filtradosAyer = filtradosAyer.filter((_, i) => tipos[i % tipos.length].toLowerCase() === filtroTipo);
  }

  if (filtroRango === "bajo") {
    filtradosHoy = filtradosHoy.filter(c => c.calorias <= 150);
    filtradosAyer = filtradosAyer.filter(c => c.calorias <= 150);
  } else if (filtroRango === "medio") {
    filtradosHoy = filtradosHoy.filter(c => c.calorias > 150 && c.calorias <= 250);
    filtradosAyer = filtradosAyer.filter(c => c.calorias > 150 && c.calorias <= 250);
  } else if (filtroRango === "alto") {
    filtradosHoy = filtradosHoy.filter(c => c.calorias > 250);
    filtradosAyer = filtradosAyer.filter(c => c.calorias > 250);
  }

  renderCards(filtradosHoy);
  renderLista(filtradosAyer);
}


function crearDropdown(opciones, onSelect) {
  const menu = document.createElement("div");
  menu.className = "dropdown-menu";
  opciones.forEach(({ label, valor }) => {
    const item = document.createElement("div");
    item.className = "dropdown-item";
    item.textContent = label;
    item.onclick = () => {
      onSelect(valor);
      menu.remove();
    };
    menu.appendChild(item);
  });
  return menu;
}

function cerrarDropdowns() {
  document.querySelectorAll(".dropdown-menu").forEach(m => m.remove());
}

document.querySelectorAll(".filtro-btn")[1].addEventListener("click", function (e) {
  cerrarDropdowns();
  const opciones = [
    { label: "Todos", valor: "todos" },
    { label: "Desayuno", valor: "desayuno" },
    { label: "Almuerzo", valor: "almuerzo" },
    { label: "Merienda", valor: "merienda" },
    { label: "Cena", valor: "cena" },
  ];
  const menu = crearDropdown(opciones, (valor) => {
    filtroTipo = valor;
    this.textContent = "≡ " + (valor === "todos" ? "Tipos de Comidas" : valor.charAt(0).toUpperCase() + valor.slice(1)) + " ▾";
    aplicarFiltros();
  });
  this.parentElement.appendChild(menu);
  posicionarDropdown(menu, this);
  e.stopPropagation();
});

document.querySelectorAll(".filtro-btn")[2].addEventListener("click", function (e) {
  cerrarDropdowns();
  const opciones = [
    { label: "Todos", valor: "todos" },
    { label: "Bajo (≤150 kcal)", valor: "bajo" },
    { label: "Medio (151–250 kcal)", valor: "medio" },
    { label: "Alto (>250 kcal)", valor: "alto" },
  ];
  const menu = crearDropdown(opciones, (valor) => {
    filtroRango = valor;
    const labels = { todos: "Rango de calorías", bajo: "≤150 kcal", medio: "151–250 kcal", alto: ">250 kcal" };
    this.textContent = "⚡ " + labels[valor] + " ▾";
    aplicarFiltros();
  });
  this.parentElement.appendChild(menu);
  posicionarDropdown(menu, this);
  e.stopPropagation();
});


function posicionarDropdown(menu, boton) {
  const rect = boton.getBoundingClientRect();
  const contenedor = boton.parentElement.getBoundingClientRect();
  menu.style.top = (rect.bottom - contenedor.top + 6) + "px";
  menu.style.left = (rect.left - contenedor.left) + "px";
}

document.addEventListener("click", cerrarDropdowns);

renderCards(comidasHoy);
renderLista(comidasAyer);