document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.getElementById("formContacto");
    const respuesta = document.getElementById("respuestaContacto");
    if (!formulario || !respuesta) return;

    formulario.addEventListener("submit", function (evento) {
        evento.preventDefault();
        const solicitud = {
            nombre: document.getElementById("nombreContacto").value.trim(),
            email: document.getElementById("emailContacto").value.trim(),
            asunto: document.getElementById("asuntoContacto").value.trim(),
            mensaje: document.getElementById("mensajeContacto").value.trim()
        };
        try {
            const guardadas = JSON.parse(localStorage.getItem("contactosTiana") || "[]");
            if (!Array.isArray(guardadas)) throw new Error("Formato de almacenamiento inválido");
            guardadas.push(solicitud);
            localStorage.setItem("contactosTiana", JSON.stringify(guardadas));
            respuesta.textContent = "¡Gracias, " + solicitud.nombre + "! Tu mensaje se guardó correctamente.";
            respuesta.style.color = "green";
            formulario.reset();
        } catch (error) {
            respuesta.textContent = "No se pudo guardar el mensaje en este navegador.";
            respuesta.style.color = "red";
            console.error(error);
        }
    });
});
