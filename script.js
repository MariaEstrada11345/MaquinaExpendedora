document.addEventListener("DOMContentLoaded", () => {

  /* Botones de categorías */
  const botonesCategorias = document.querySelectorAll(".btn-categoria");

  botonesCategorias.forEach((btn) => {
    btn.addEventListener("click", () => {
      botonesCategorias.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");document.addEventListener("DOMContentLoaded", () => {

  /* VARIABLES GLOBALES */
  let contador = 0;
  let total = 0;
  const precioProducto = 10.00;
  let carrito = []; // { nombre, precio, imagen, cantidad }

  /* ELEMENTOS */
  const txtContador = document.getElementById("contadorCarrito");
  const txtTotal = document.getElementById("totalCarrito");
  const popup = document.getElementById("popupAgregado");

  const modalDetalle = document.getElementById("modalDetalleProducto");
  const btnCerrarModal = document.getElementById("cerrarModal");
  const btnAgregarModal = document.getElementById("agregarDesdeModal");

  const modalCarrito = document.getElementById("modalCarrito");
  const btnCarrito = document.querySelector(".btn-productos");
  const btnCerrarCarrito = document.getElementById("cerrarCarrito");
  const listaCarrito = document.getElementById("listaCarrito");
  const totalCarritoModal = document.getElementById("totalCarritoModal");

  const modalPago = document.getElementById("modalPago");
  const btnPagar = document.getElementById("btnPagar");
  const btnCerrarPago = document.getElementById("cerrarPago");
  const listaPago = document.getElementById("listaPago");
  const totalPago = document.getElementById("totalPago");

  /* UTILIDAD: CERRAR TODOS LOS MODALES */
  function cerrarTodosLosModales() {
    modalDetalle.classList.remove("mostrar");
    modalCarrito.classList.remove("mostrar");
    modalPago.classList.remove("mostrar");
  }

  /* POPUP */
  function mostrarPopup() {
    popup.classList.add("popup-show");
    setTimeout(() => popup.classList.remove("popup-show"), 2000);
  }

  /* CARRITO - ACTUALIZACIONES*/
  function actualizarCarrito() {
    txtContador.textContent = contador;
    txtTotal.textContent = `Q${total.toFixed(2)}`;
  }

  function agregarProducto(nombre, precio, imagen) {
    const prod = carrito.find((p) => p.nombre === nombre);

    if (prod) {
      prod.cantidad++;
    } else {
      carrito.push({ nombre, precio, imagen, cantidad: 1 });
    }

    contador++;
    total += precio;

    actualizarCarrito();
    mostrarPopup();
  }

  /* CATEGORÍAS */
  document.querySelectorAll(".btn-categoria").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelector(".btn-categoria.active")?.classList.remove("active");
      btn.classList.add("active");
    });
  });

  /* AÑADIR DESDE LAS CARDS */
  document.querySelectorAll(".Card-Product-Preview .btn-dark").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();

      const card = e.target.closest(".Card-Product-Preview");
      agregarProducto(
        card.querySelector(".nombre-producto").textContent,
        precioProducto,
        card.querySelector("img").src
      );
    });
  });

  /* MODAL DETALLE PRODUCTO */
  document.querySelectorAll(".Card-Product-Preview").forEach((producto) => {
    producto.addEventListener("click", () => {
      cerrarTodosLosModales();

      modalDetalle.querySelector("#modalNombre").textContent =
        producto.querySelector(".nombre-producto").textContent;

      modalDetalle.querySelector("#modalPrecio").textContent =
        producto.querySelector(".precio").textContent;

      modalDetalle.querySelector("#modalImagen").src =
        producto.querySelector("img").src;

      modalDetalle.querySelector("#modalDescripcion").textContent =
        "Este es un delicioso producto de alta calidad, ideal para disfrutar en cualquier momento del día.";

      modalDetalle.classList.add("mostrar");
    });
  });

  btnCerrarModal.addEventListener("click", () => {
    modalDetalle.classList.remove("mostrar");
  });

  btnAgregarModal.addEventListener("click", () => {
    agregarProducto(
      modalDetalle.querySelector("#modalNombre").textContent,
      precioProducto,
      modalDetalle.querySelector("#modalImagen").src
    );
    modalDetalle.classList.remove("mostrar");
  });

  window.addEventListener("click", (e) => {
    if (e.target === modalDetalle) modalDetalle.classList.remove("mostrar");
  });

  /* MODAL CARRITO */
  function renderizarCarrito() {
    listaCarrito.innerHTML = "";

    if (carrito.length === 0) {
      listaCarrito.innerHTML =
        "<p class='text-center text-muted'>No hay productos en el carrito.</p>";
      totalCarritoModal.textContent = "Q0.00";
      return;
    }

    carrito.forEach((prod, index) => {
      const subtotal = prod.precio * prod.cantidad;

      listaCarrito.innerHTML += `
        <div class="item-carrito">
          <div class="item-info">
            <img src="${prod.imagen}">
            <div>
              <p class="m-0 fw-semibold">${prod.nombre}</p>
              <small class="text-muted">Q${prod.precio.toFixed(2)} c/u</small><br>
              <small class="fw-semibold">Cantidad: ${prod.cantidad}</small><br>
              <small class="fw-semibold">Subtotal: Q${subtotal.toFixed(2)}</small>
            </div>
          </div>

          <div class="item-actions">
            <button class="btn-restar" data-index="${index}">-</button>
            <button class="btn-sumar" data-index="${index}">+</button>
            <button class="btn-eliminar" data-index="${index}">
              <i class="bi bi-trash-fill"></i>
            </button>
          </div>
        </div>
      `;
    });

    totalCarritoModal.textContent = `Q${total.toFixed(2)}`;
  }

  btnCarrito.addEventListener("click", () => {
    cerrarTodosLosModales();
    renderizarCarrito();
    modalCarrito.classList.add("mostrar");
  });

  btnCerrarCarrito.addEventListener("click", () => {
    modalCarrito.classList.remove("mostrar");
  });

  listaCarrito.addEventListener("click", (e) => {
    const index = e.target.closest("button")?.dataset.index;
    if (index === undefined) return;

    if (e.target.closest(".btn-eliminar")) {
      contador -= carrito[index].cantidad;
      total -= carrito[index].precio * carrito[index].cantidad;
      carrito.splice(index, 1);
    }

    if (e.target.closest(".btn-sumar")) {
      carrito[index].cantidad++;
      contador++;
      total += carrito[index].precio;
    }

    if (e.target.closest(".btn-restar")) {
      if (carrito[index].cantidad > 1) {
        carrito[index].cantidad--;
        contador--;
        total -= carrito[index].precio;
      }
    }

    actualizarCarrito();
    renderizarCarrito();
  });

  window.addEventListener("click", (e) => {
    if (e.target === modalCarrito) modalCarrito.classList.remove("mostrar");
  });

  /* MODAL PAGO FINAL */
  function renderizarPago() {
    listaPago.innerHTML = "";

    if (carrito.length === 0) {
      listaPago.innerHTML =
        "<p class='text-center text-muted'>El carrito está vacío.</p>";
      totalPago.textContent = "Q0.00";
      return;
    }

    carrito.forEach((prod) => {
      listaPago.innerHTML += `
        <div class="item-pago">
          <div class="d-flex align-items-center gap-2">
            <img src="${prod.imagen}">
            <span>${prod.nombre} (x${prod.cantidad})</span>
          </div>
          <strong>Q${(prod.precio * prod.cantidad).toFixed(2)}</strong>
        </div>
      `;
    });

    totalPago.textContent = `Q${total.toFixed(2)}`;
  }

  btnPagar.addEventListener("click", () => {
    cerrarTodosLosModales();
    renderizarPago();
    modalPago.classList.add("mostrar");
  });

  btnCerrarPago.addEventListener("click", () => {
    modalPago.classList.remove("mostrar");
  });

  window.addEventListener("click", (e) => {
    if (e.target === modalPago) modalPago.classList.remove("mostrar");
  });

});

    });
  });

  /* Pop up producto agregado */
  function mostrarPopup() {
    const popup = document.getElementById("popupAgregado");
    popup.classList.add("popup-show");

    setTimeout(() => {
      popup.classList.remove("popup-show");
    }, 2000);
  }

  /* Carrito: Sumar, contador y total */
  let contador = 0;
  let total = 0;
  const precioProducto = 10.00;

  const txtContador = document.getElementById("contadorCarrito");
  const txtTotal = document.getElementById("totalCarrito");

  function actualizarCarrito() {
    txtContador.textContent = contador;
    txtTotal.textContent = `Q${total.toFixed(2)}`;
  }

  /* ---------- Modal del Carrito ---------- */
  const modalCarrito = document.getElementById("modalCarrito");
  const btnCarrito = document.querySelector(".btn-productos");
  const btnCerrarCarrito = document.getElementById("cerrarCarrito");
  const listaCarrito = document.getElementById("listaCarrito");
  const totalCarritoModal = document.getElementById("totalCarritoModal");

  let carrito = []; // {nombre, precio, imagen, cantidad}

  /* Función para agregar productos al carrito */
  function agregarProducto(nombre, precio, imagen) {
    const productoExistente = carrito.find(p => p.nombre === nombre);

    if (productoExistente) {
      productoExistente.cantidad++;
    } else {
      carrito.push({ nombre, precio, imagen, cantidad: 1 });
    }

    contador++;
    total += precio;
    actualizarCarrito();
    mostrarPopup();
  }

  /* Botones añadir de las cards */
  const botonesAñadir = document.querySelectorAll(".Card-Product-Preview .btn-dark");

  botonesAñadir.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const card = e.target.closest(".Card-Product-Preview");
      const nombre = card.querySelector(".nombre-producto").textContent;
      const imagen = card.querySelector("img").src;
      agregarProducto(nombre, precioProducto, imagen);
    });
  });

  /* Modal de detalle del producto */
  const modal = document.getElementById("modalDetalleProducto");
  const btnCerrarModal = modal.querySelector("#cerrarModal");
  const btnAgregarModal = modal.querySelector("#agregarDesdeModal");

  const productos = document.querySelectorAll(".Card-Product-Preview");

  productos.forEach((producto) => {
    producto.addEventListener("click", () => {
      const nombre = producto.querySelector(".nombre-producto").textContent;
      const precio = producto.querySelector(".precio").textContent;
      const imagen = producto.querySelector("img").src;

      const categoria = "Bebidas";
      const descripcion = "Este es un delicioso producto de alta calidad, ideal para disfrutar en cualquier momento del día.";

      modal.querySelector("#modalNombre").textContent = nombre;
      modal.querySelector("#modalPrecio").textContent = precio;
      modal.querySelector("#modalCategoria").textContent = categoria;
      modal.querySelector("#modalDescripcion").textContent = descripcion;
      modal.querySelector("#modalImagen").src = imagen;

      modal.classList.add("mostrar");
    });
  });

  /* Cerrar modal */
  btnCerrarModal.addEventListener("click", () => {
    modal.classList.remove("mostrar");
  });

  /* Agregar desde el modal */
  btnAgregarModal.addEventListener("click", () => {
    const nombre = modal.querySelector("#modalNombre").textContent;
    const imagen = modal.querySelector("#modalImagen").src;
    agregarProducto(nombre, precioProducto, imagen);
    modal.classList.remove("mostrar");
  });

  /* Cerrar modal al hacer clic fuera */
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("mostrar");
    }
  });

  /* Renderizar carrito */
  function renderizarCarrito() {
    listaCarrito.innerHTML = "";

    if (carrito.length === 0) {
      listaCarrito.innerHTML = "<p class='text-center text-muted'>No hay productos en el carrito.</p>";
      totalCarritoModal.textContent = "Q0.00";
      return;
    }

    carrito.forEach((prod, index) => {
      const item = document.createElement("div");
      item.classList.add("item-carrito");

      item.innerHTML = `
        <div class="item-info">
          <img src="${prod.imagen}" alt="${prod.nombre}">
          <div>
            <p class="m-0 fw-semibold">${prod.nombre}</p>
            <small class="text-muted">Q${prod.precio.toFixed(2)} c/u</small><br>
            <small class="fw-semibold">Cantidad: ${prod.cantidad}</small><br>
            <small class="fw-semibold">Subtotal: Q${(prod.precio * prod.cantidad).toFixed(2)}</small>
          </div>
        </div>
        <div class="item-actions">
          <button class="btn-restar" data-index="${index}">-</button>
          <button class="btn-sumar" data-index="${index}">+</button>
          <button class="btn-eliminar" data-index="${index}">
            <i class="bi bi-trash-fill"></i>
          </button>
        </div>
      `;
      listaCarrito.appendChild(item);
    });

    totalCarritoModal.textContent = `Q${total.toFixed(2)}`;
  }

  // Mostrar modal carrito
  btnCarrito.addEventListener("click", () => {
    renderizarCarrito();
    modalCarrito.classList.add("mostrar");
  });

  // Cerrar modal carrito
  btnCerrarCarrito.addEventListener("click", () => {
    modalCarrito.classList.remove("mostrar");
  });

  // Eliminar / sumar / restar productos del carrito
  listaCarrito.addEventListener("click", (e) => {
    const btnEliminar = e.target.closest(".btn-eliminar");
    const btnSumar = e.target.closest(".btn-sumar");
    const btnRestar = e.target.closest(".btn-restar");

    if (btnEliminar) {
      const index = btnEliminar.dataset.index;
      total -= carrito[index].precio * carrito[index].cantidad;
      contador -= carrito[index].cantidad;
      carrito.splice(index, 1);
    }

    if (btnSumar) {
      const index = btnSumar.dataset.index;
      carrito[index].cantidad++;
      total += carrito[index].precio;
      contador++;
    }

    if (btnRestar) {
      const index = btnRestar.dataset.index;
      if (carrito[index].cantidad > 1) {
        carrito[index].cantidad--;
        total -= carrito[index].precio;
        contador--;
      }
    }

    actualizarCarrito();
    renderizarCarrito();
  });

  // Continuar con el pago
  document.getElementById("continuarPagoCarrito").addEventListener("click", () => {
    alert("Redirigiendo a la pantalla de pago...");
    modalCarrito.classList.remove("mostrar");
  });

  // Cerrar modal al hacer clic fuera
  window.addEventListener("click", (e) => {
    if (e.target === modalCarrito) {
      modalCarrito.classList.remove("mostrar");
    }
  });
  /* ---------- Modal Finalizar Pago ---------- */
  const modalPago = document.getElementById("modalPago");
  const btnPagar = document.getElementById("btnPagar");
  const btnCerrarPago = document.getElementById("cerrarPago");
  const listaPago = document.getElementById("listaPago");
  const totalPago = document.getElementById("totalPago");

  /* Renderizar listado de pago (sin eliminar) */
  function renderizarPago() {
    listaPago.innerHTML = "";

    if (carrito.length === 0) {
      listaPago.innerHTML = "<p class='text-center text-muted'>El carrito está vacío.</p>";
      totalPago.textContent = "Q0.00";
      return;
    }

    carrito.forEach((prod) => {
      const item = document.createElement("div");
      item.classList.add("item-pago");

      item.innerHTML = `
      <div class="d-flex align-items-center gap-2">
        <img src="${prod.imagen}">
        <span>${prod.nombre} (x${prod.cantidad})</span>
      </div>
      <strong>Q${(prod.precio * prod.cantidad).toFixed(2)}</strong>
    `;

      listaPago.appendChild(item);
    });

    totalPago.textContent = `Q${total.toFixed(2)}`;
  }

  /* Abrir modal de pago */
  btnPagar.addEventListener("click", () => {
    renderizarPago();
    modalPago.classList.add("mostrar");
  });

  /* Cerrar modal */
  btnCerrarPago.addEventListener("click", () => {
    modalPago.classList.remove("mostrar");
  });

  /* Cerrar clic fuera */
  window.addEventListener("click", (e) => {
    if (e.target === modalPago) {
      modalPago.classList.remove("mostrar");
    }
  });

});