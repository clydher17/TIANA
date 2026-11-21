document.addEventListener("DOMContentLoaded", function () {
    const carrusel = document.querySelector(".carrusel");
    if (!carrusel) return;
    const diapositivas = Array.from(carrusel.querySelectorAll(".carrusel-slide"));
    const indicadores = carrusel.querySelector(".carrusel-indicadores");
    let actual = 0;
    let temporizador;

    diapositivas.forEach((_, indice) => {
        const punto = document.createElement("button");
        punto.type = "button";
        punto.className = "carrusel-punto";
        punto.setAttribute("aria-label", "Ver imagen " + (indice + 1));
        punto.addEventListener("click", () => { mostrar(indice); reiniciar(); });
        indicadores.appendChild(punto);
    });
    const puntos = Array.from(indicadores.querySelectorAll("button"));

    function mostrar(indice) {
        actual = (indice + diapositivas.length) % diapositivas.length;
        diapositivas.forEach((slide, i) => {
            slide.classList.toggle("activo", i === actual);
            slide.setAttribute("aria-hidden", i !== actual ? "true" : "false");
        });
        puntos.forEach((punto, i) => {
            punto.classList.toggle("activo", i === actual);
            punto.setAttribute("aria-current", i === actual ? "true" : "false");
        });
    }
    function reiniciar() {
        clearInterval(temporizador);
        if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            temporizador = setInterval(() => mostrar(actual + 1), 3000);
        }
    }
    carrusel.querySelector(".anterior").addEventListener("click", () => { mostrar(actual - 1); reiniciar(); });
    carrusel.querySelector(".siguiente").addEventListener("click", () => { mostrar(actual + 1); reiniciar(); });
    carrusel.addEventListener("mouseenter", () => clearInterval(temporizador));
    carrusel.addEventListener("mouseleave", reiniciar);
    carrusel.addEventListener("focusin", () => clearInterval(temporizador));
    carrusel.addEventListener("focusout", (e) => { if (!carrusel.contains(e.relatedTarget)) reiniciar(); });
    mostrar(0);
    reiniciar();
});
