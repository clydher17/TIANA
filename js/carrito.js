// Carrito de compras TIANA: funciona en Productos y en Carrito.
document.addEventListener("DOMContentLoaded", function () {
    const CLAVE = "tiana_carrito";
    const leer = () => JSON.parse(localStorage.getItem(CLAVE) || "[]");
    const guardar = (productos) => localStorage.setItem(CLAVE, JSON.stringify(productos));
    const moneda = (numero) => "$" + numero.toLocaleString("es-AR");

    // En la página Productos, cada botón añade la ficha seleccionada.
    document.querySelectorAll(".catalogo-preview .preview").forEach(function (ficha) {
        const boton = ficha.querySelector(".carrito");
        const comprar = ficha.querySelector(".comprar");
        function agregar(evento) {
            evento.preventDefault();
            const id = ficha.dataset.target;
            const nombre = ficha.querySelector("h3").textContent.trim();
            const precio = Number(ficha.querySelector(".precio").textContent.replace(/[^0-9]/g, ""));
            const imagen = ficha.querySelector("img").getAttribute("src");
            const productos = leer();
            const existente = productos.find(p => p.id === id);
            if (existente) existente.cantidad++;
            else productos.push({id, nombre, precio, imagen, cantidad: 1});
            guardar(productos);
            if (evento.currentTarget === comprar) window.location.href = "compratotal.html";
            else alert(nombre + " se agregó al carrito.");
        }
        if (boton) boton.addEventListener("click", agregar);
        if (comprar) comprar.addEventListener("click", agregar);
    });

    // En la página Carrito, mostrar lo guardado y calcular el total.
    const contenedor = document.getElementById("carrito-productos");
    if (!contenedor) return;
    const vacio = document.getElementById("carrito-vacio");
    const acciones = document.getElementById("carrito-acciones");
    const comprado = document.getElementById("carrito-comprado");
    const total = document.getElementById("total");
    function mostrar() {
        const productos = leer();
        contenedor.replaceChildren();
        const hayProductos = productos.length > 0;
        vacio.style.display = hayProductos ? "none" : "block";
        contenedor.classList.toggle("disabled", !hayProductos);
        acciones.classList.toggle("disabled", !hayProductos);
        contenedor.style.display = hayProductos ? "block" : "none";
        acciones.style.display = hayProductos ? "flex" : "none";
        total.textContent = moneda(productos.reduce((suma, p) => suma + p.precio * p.cantidad, 0));
        productos.forEach(function (producto) {
            const fila = document.createElement("div");
            fila.className = "producto-en-carrito";
            fila.style.cssText = "display:flex;align-items:center;gap:15px;padding:12px;border-bottom:1px solid #ccc;flex-wrap:wrap";
            const imagen = document.createElement("img");
            imagen.src = producto.imagen;
            imagen.alt = producto.nombre;
            imagen.style.cssText = "width:75px;height:75px;object-fit:contain";
            const detalle = document.createElement("span");
            detalle.textContent = producto.nombre + " — " + moneda(producto.precio) + " × " + producto.cantidad + " = " + moneda(producto.precio * producto.cantidad);
            const quitar = document.createElement("button");
            quitar.textContent = "Eliminar";
            quitar.addEventListener("click", function () {
                guardar(leer().filter(p => p.id !== producto.id));
                mostrar();
            });
            fila.append(imagen, detalle, quitar);
            contenedor.append(fila);
        });
    }
    document.getElementById("carrito-acciones-vaciar").addEventListener("click", function () {
        guardar([]); comprado.style.display = "none"; mostrar();
    });
    document.querySelector(".carrito-acciones-comprar").addEventListener("click", function () {
        if (!leer().length) return;
        guardar([]); mostrar();
        comprado.style.display = "block";
        comprado.textContent = "¡Gracias por elegir TIANA! Compra simulada correctamente.";
    });
    comprado.style.display = "none";
    mostrar();
});
