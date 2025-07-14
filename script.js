document.addEventListener("DOMContentLoaded", () => {
  const ramos = document.querySelectorAll(".ramo");
  const resetBtn = document.getElementById("resetBtn");

  const estadoRamos = {};

  // Cargar datos guardados
  const aprobadosGuardados = JSON.parse(localStorage.getItem("ramosAprobados")) || [];

  // Inicializar ramos
  ramos.forEach(boton => {
    const id = boton.dataset.id;
    const requisitos = boton.dataset.prerreq ? boton.dataset.prerreq.split(",") : [];
    const aprobado = aprobadosGuardados.includes(id);

    estadoRamos[id] = {
      boton,
      aprobado,
      requisitos
    };

    if (requisitos.length > 0 && !aprobado) {
      boton.classList.add("bloqueado");
    }

    if (aprobado) {
      boton.classList.add("aprobado");
    }
  });

  function actualizarEstado() {
    Object.values(estadoRamos).forEach(ramo => {
      if (!ramo.aprobado && ramo.requisitos.length > 0) {
        const desbloqueado = ramo.requisitos.every(req => estadoRamos[req]?.aprobado);
        if (desbloqueado) {
          ramo.boton.classList.remove("bloqueado");
        }
      }
    });

    // Guardar estado actualizado
    const aprobados = Object.keys(estadoRamos).filter(id => estadoRamos[id].aprobado);
    localStorage.setItem("ramosAprobados", JSON.stringify(aprobados));
  }

  // Clic en ramos
  ramos.forEach(boton => {
    boton.addEventListener("click", () => {
      const id = boton.dataset.id;
      const ramo = estadoRamos[id];

      if (!ramo.aprobado && !boton.classList.contains("bloqueado")) {
        ramo.aprobado = true;
        boton.classList.add("aprobado");
        actualizarEstado();
      }
    });
  });

  // Botón reset
  resetBtn.addEventListener("click", () => {
    Object.values(estadoRamos).forEach(ramo => {
      ramo.aprobado = false;
      ramo.boton.classList.remove("aprobado");

      if (ramo.requisitos.length > 0) {
        ramo.boton.classList.add("bloqueado");
      } else {
        ramo.boton.classList.remove("bloqueado");
      }
    });

    localStorage.removeItem("ramosAprobados");
  });

  actualizarEstado();
});
