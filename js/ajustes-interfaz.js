/* Acceso a la página ampliada de cada jurisdicción */
document.querySelectorAll("#departamentos .card").forEach(card => {
    const acciones = card.querySelector(".acciones");
    const titulo = card.querySelector("h3")?.textContent.trim();
    if (!acciones || !titulo || acciones.querySelector(".boton-mas-informacion")) return;
    const enlace = document.createElement("a");
    enlace.className = "boton boton-mas-informacion";
    enlace.href = "consulta.html?departamento=" + encodeURIComponent(titulo);
    enlace.rel = "noopener noreferrer";
    enlace.textContent = "Ver más información";
    enlace.setAttribute("aria-label", "Ver toda la información de " + titulo);
    acciones.appendChild(enlace);
});

document.querySelectorAll(".seguridad").forEach(function(aviso){aviso.remove();});
