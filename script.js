document.addEventListener("DOMContentLoaded", () => {
  const ramos = document.querySelectorAll(".ramo");
  const resetBtn = document.getElementById("resetBtn");

  const estadoRamos = {};

  // Inicializa cada ramo
  ramos.forEach(boton => {
    const id = boton.dataset.id;
    const requisitos = boton.dataset.prerreq ? boton.dataset.prerreq.split(",") : [];
    estadoRamos[id] = {
      boton,
      aprobado: false,
      requisitos
    };

    // Si tiene prerrequisitos, parte bloqueado
    if (requisitos.length > 0) {
      boton.classList.add("bloqueado");
    }
  });

  function actualizarEstado() {
    // Revisa qué ramos ahora pueden desbloquearse
    Object.values(estadoRamos).forEach(ramo => {
      if (!ramo.aprobado && ramo.requisitos.length > 0) {
        const desbloqueado = ramo.requisitos.every(req => estadoRamos[req]?.aprobado);
        if (desbloqueado) {
          ramo.boton.classList.remove("bloqueado");
        }
      }
    });
  }

  // Clic en ramos para aprobarlos
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

  // Clic en botón reset para reiniciar progreso
  resetBtn.addEventListener("click", () => {
    Object.values(estadoRamos).forEach(ramo => {
      ramo.aprobado = false;
      ramo.boton.classList.remove("aprobado");

      // Reinicia el bloqueo de los que tienen prerrequisitos
      if (ramo.requisitos.length > 0) {
        ramo.boton.classList.add("bloqueado");
      } else {
        ramo.boton.classList.remove("bloqueado");
      }
    });
  });

  actualizarEstado(); // Activar desbloqueo inicial
});
