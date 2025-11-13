document.addEventListener("DOMContentLoaded", () => {

  /* Botones de categorías */
  const botonesCategorias = document.querySelectorAll(".btn-categoria");

  botonesCategorias.forEach((btn) => {
    btn.addEventListener("click", () => {
      botonesCategorias.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
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

  // Actualiza los valores visuales
  function actualizarCarrito() {
    txtContador.textContent = contador;
    txtTotal.textContent = `Q${total.toFixed(2)}`;
  }

    /* Botones añadir de las cards */
  
  const botonesAñadir = document.querySelectorAll(
    ".Card-Product-Preview .btn-dark"
  );

  botonesAñadir.forEach((btn) => {
    btn.addEventListener("click", () => {
      contador++;
      total += precioProducto;

      actualizarCarrito();
      mostrarPopup();
    });
  });

  
  

});
