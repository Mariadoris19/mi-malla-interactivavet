document.querySelectorAll('.ramo').forEach(ramo => {
  ramo.addEventListener('click', () => {
    if (ramo.classList.contains('bloqueado')) return;

    ramo.classList.toggle('aprobado');
    actualizarEstado();
  });
});

function actualizarEstado() {
  document.querySelectorAll('.ramo').forEach(ramo => {
    const requisitos = ramo.dataset.requisitos.split(',').map(r => r.trim()).filter(Boolean);
    const aprobados = requisitos.every(reqId =>
      document.querySelector(`.ramo[data-id="${reqId}"]`)?.classList.contains('aprobado')
    );

    if (requisitos.length === 0 || aprobados) {
      ramo.classList.remove('bloqueado');
    } else {
      if (!ramo.classList.contains('aprobado')) {
        ramo.classList.add('bloqueado');
      }
    }
  });
}
