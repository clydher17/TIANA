document.addEventListener('DOMContentLoaded', () => {
  const fondo = document.querySelector('.catalogo-preview');
  if (!fondo) return;
  const vistas = [...fondo.querySelectorAll('.preview')];
  document.querySelectorAll('.productos-container .productos').forEach(producto => {
    producto.addEventListener('click', () => {
      const codigo = producto.dataset.name;
      let encontrada = false;
      vistas.forEach(vista => {
        const coincide = vista.dataset.target === codigo;
        vista.classList.toggle('active', coincide);
        if (coincide) encontrada = true;
      });
      fondo.style.display = encontrada ? 'flex' : 'none';
    });
  });
  fondo.querySelectorAll('.fa-times').forEach(cerrar => {
    cerrar.addEventListener('click', () => {
      fondo.style.display = 'none';
      vistas.forEach(v => v.classList.remove('active'));
    });
  });
  fondo.addEventListener('click', e => {
    if (e.target === fondo) {
      fondo.style.display = 'none';
      vistas.forEach(v => v.classList.remove('active'));
    }
  });
});
