document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.getElementById("formMayoristas");
    const respuesta = document.getElementById("respuestaMayoristas");

    if (!formulario || !respuesta) {
        console.error("No se encontró el formulario de Mayoristas.");
        return;
    }

    formulario.addEventListener("submit", function (evento) {
        evento.preventDefault();

        const nombre = document.getElementById("nombreMayorista").value.trim();
        const email = document.getElementById("emailMayorista").value.trim();
        const telefono = document.getElementById("telefonoMayorista").value.trim();
        const mensaje = document.getElementById("mensajeMayorista").value.trim();

        if (!nombre || !email || !telefono) {
            respuesta.textContent = "Completá los campos obligatorios.";
            respuesta.style.color = "red";
            return;
        }

        const solicitud = { nombre, email, telefono, mensaje };

        try {
            const solicitudes = JSON.parse(localStorage.getItem("mayoristasTiana") || "[]");
            if (!Array.isArray(solicitudes)) throw new Error("Datos guardados inválidos");
            solicitudes.push(solicitud);
            localStorage.setItem("mayoristasTiana", JSON.stringify(solicitudes));
            respuesta.textContent = "¡Gracias " + nombre + "! Tu solicitud se guardó correctamente.";
            respuesta.style.color = "green";
            formulario.reset();
        } catch (error) {
            respuesta.textContent = "No se pudo guardar la solicitud en este navegador.";
            respuesta.style.color = "red";
            console.error("Error al guardar Mayoristas:", error);
        }
    });
});
