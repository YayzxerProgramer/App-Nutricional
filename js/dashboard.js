// Dashboard de Vitality - Control de navegación y contenido dinámico

document.addEventListener('DOMContentLoaded', () => {
    console.log('🌿 Dashboard cargado correctamente');

    // Elementos del DOM
    const navItems = document.querySelectorAll('nav ul li[data-section]');
    const headerTitle = document.querySelector('header h2');
    const inicioSection = document.getElementById('inicio-section');
    const comidasSection = document.getElementById('comidas-section');

    // Estado actual del dashboard
    let currentSection = 'inicio';

    // Mapeo de secciones
    const sections = {
        inicio: 'App Nutricional',
        registro: 'Registro de Alimentos',
        historial: 'Historial'
    };

    // Función para cambiar de sección
    function navigateTo(section) {
        if (!sections[section]) return;

        currentSection = section;

        // Actualizar clase activa en navegación
        navItems.forEach(item => {
            item.classList.remove('activo');
            if (item.dataset.section === section) {
                item.classList.add('activo');
            }
        });

        // Actualizar título principal
        if (headerTitle) {
            headerTitle.textContent = sections[section];
        }

        // Mostrar/ocultar secciones
        if (inicioSection && comidasSection) {
            if (section === 'inicio') {
                inicioSection.style.display = 'block';
                comidasSection.style.display = 'none';
            } else {
                inicioSection.style.display = 'none';
                comidasSection.style.display = 'block';
            }
        }

        console.log(`Navegando a: ${sections[section]}`);

        // Disparar evento personalizado
        window.dispatchEvent(new CustomEvent('sectionChange', { detail: section }));
    }

    // Agregar listeners a items de navegación
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navigateTo(item.dataset.section);
        });
    });

    // Inicializar primera sección (inicio)
    navigateTo('inicio');

    console.log('Dashboard inicializado - Secciones disponibles:', Object.keys(sections));
});
