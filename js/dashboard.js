// Dashboard de Vitality - Control de navegación y contenido dinámico

document.addEventListener('DOMContentLoaded', () => {
    console.log('🌿 Dashboard cargado correctamente');

    const navItems = document.querySelectorAll('nav ul li[data-section]');
    const headerTitle = document.querySelector('header h2');

    // Estado actual del dashboard
    let currentSection = 'inicio';

    // Mapeo de secciones
    const sections = {
        inicio: 'App Nutricional',
        registro: 'Registro de Alimentos',
        historial: 'Historial'
    };

    function navigateTo(section) {
        if (!sections[section]) return;

        currentSection = section;

        navItems.forEach(item => {
            item.classList.remove('activo');
            if (item.dataset.section === section) {
                item.classList.add('activo');
            }
        });

        if (headerTitle) {
            headerTitle.textContent = sections[section];
        }

        console.log(`Navegando a: ${sections[section]}`);

        window.dispatchEvent(new CustomEvent('sectionChange', { detail: section }));
    }

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navigateTo(item.dataset.section);
        });
    });

    navigateTo('inicio');

    console.log('Dashboard inicializado - Secciones disponibles:', Object.keys(sections));
});
