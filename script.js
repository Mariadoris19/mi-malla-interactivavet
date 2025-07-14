document.addEventListener("DOMContentLoaded", () => {
  const ramos = document.querySelectorAll(".ramo");

  const estadoRamos = {};

  ramos.forEach(boton => {
    const id = boton.dataset.id;
    const requisitos = boton.dataset.prerreq ? boton.dataset.prerreq.split(",") : [];
    estadoRamos[id] = {
      boton,
      aprobado: false,
      requisitos
    };
    if (requisitos.length > 0) {
      boton.classList.add("bloqueado");
    }
  });

  function actualizarEstado() {
    ramos.forEach(boton => {
      const id = boton.dataset.id;
      const ramo = estadoRamos[id];
      if (!ramo.aprobado && ramo.requisitos.length > 0) {
        const desbloqueado = ramo.requisitos.every(req => estadoRamos[req]?.aprobado);
        if (desbloqueado) {
          boton.classList.remove("bloqueado");
        }
      }
    });
  }

  ramos.forEach(boton => {
    boton.addEventListener("click", () => {
      const id = boton.dataset.id;
      const ramo = estadoRamos[id];
      if (!ramo.aprobado && !boton.classList.contains("bloqueado")) {
        boton.classList.add("aprobado");
        ramo.aprobado = true;
        actualizarEstado();
      }
    });
  });

  actualizarEstado();
});
const resetBtn = document.getElementById("resetBtn");

resetBtn.addEventListener("click", () => {
  Object.values(estadoRamos).forEach(({ boton, aprobado }) => {
    boton.classList.remove("aprobado");
    estadoRamos[boton.dataset.id].aprobado = false;
    // Bloqueamos todos los que tienen prerequisitos
    if (boton.dataset.prerreq && boton.dataset.prerreq.length > 0) {
      boton.classList.add("bloqueado");
    } else {
      boton.classList.remove("bloqueado");
    }
  });
});
