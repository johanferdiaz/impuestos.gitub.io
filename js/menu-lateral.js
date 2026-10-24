/* Interacciones accesibles del menú lateral */
(() => {
    const menu = document.getElementById("menu-lateral");
    const abrir = document.querySelector(".menu-toggle");
    const cerrar = document.querySelector(".menu-cerrar");
    const overlay = document.querySelector(".menu-overlay");
    if (!menu || !abrir || !cerrar || !overlay) return;

    let focoAnterior = null;

    function abrirMenu() {
        focoAnterior = document.activeElement;
        overlay.hidden = false;
        requestAnimationFrame(() => overlay.classList.add("visible"));
        menu.classList.add("abierto");
        menu.removeAttribute("inert");
        menu.setAttribute("aria-hidden", "false");
        abrir.setAttribute("aria-expanded", "true");
        abrir.setAttribute("aria-label", "Cerrar menú de navegación");
        document.body.classList.add("menu-abierto");
        cerrar.focus();
    }

    function cerrarMenu() {
        menu.classList.remove("abierto");
        overlay.classList.remove("visible");
        menu.setAttribute("aria-hidden", "true");
        menu.setAttribute("inert", "");
        abrir.setAttribute("aria-expanded", "false");
        abrir.setAttribute("aria-label", "Abrir menú de navegación");
        document.body.classList.remove("menu-abierto");
        window.setTimeout(() => { if (!menu.classList.contains("abierto")) overlay.hidden = true; }, 240);
        if (focoAnterior && typeof focoAnterior.focus === "function") focoAnterior.focus();
    }

    abrir.addEventListener("click", () => {
        if (menu.classList.contains("abierto")) cerrarMenu();
        else abrirMenu();
    });
    cerrar.addEventListener("click", cerrarMenu);
    overlay.addEventListener("click", cerrarMenu);
    menu.querySelectorAll("a[href]").forEach(enlace => enlace.addEventListener("click", cerrarMenu));
    document.addEventListener("keydown", evento => {
        if (evento.key === "Escape" && menu.classList.contains("abierto")) cerrarMenu();
        if (evento.key === "Tab" && menu.classList.contains("abierto")) {
            const elementos = [...menu.querySelectorAll('a[href], button:not([disabled])')];
            if (!elementos.length) return;
            const primero = elementos[0];
            const ultimo = elementos[elementos.length - 1];
            if (evento.shiftKey && document.activeElement === primero) {
                evento.preventDefault(); ultimo.focus();
            } else if (!evento.shiftKey && document.activeElement === ultimo) {
                evento.preventDefault(); primero.focus();
            }
        }
    });
})();
