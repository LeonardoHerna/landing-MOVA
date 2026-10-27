/* ==========================================================
   MOVA – LÓGICA DE LA PÁGINA
   Índice:
   1. Configuración (tu número y tus tarifas)
   2. Atajo para seleccionar elementos
   3. Cálculo del total y mensaje de WhatsApp
   4. Eventos del formulario
   5. Tarjetas de tarifa (elegir zona con un toque)
   6. Inicio (año del pie y primer cálculo)
   ========================================================== */


/* ----------------------------------------------------------
   1. CONFIGURACIÓN
   Esto es lo único que normalmente necesitás editar.
   ---------------------------------------------------------- */

// Tu número de WhatsApp: con código de país, sin espacios ni signos.
// Ejemplo para Uruguay: "59899123456"
var WA = "59898903605";

// Precio por paquete según la zona (en pesos uruguayos).
// Si cambiás un precio acá, cambialo también en index.html.
var T = {
  cercana: 130,
  intermedia: 160,
  afueras: 230
};

// Cómo se nombra cada zona dentro del mensaje de WhatsApp
var Z = {
  cercana: "zona cercana",
  intermedia: "zona intermedia",
  afueras: "afueras de Montevideo"
};


/* ----------------------------------------------------------
   2. ATAJO PARA SELECCIONAR ELEMENTOS
   $("#n") equivale a document.querySelector("#n")
   ---------------------------------------------------------- */
var $ = function (selector) {
  return document.querySelector(selector);
};


/* ----------------------------------------------------------
   3. CÁLCULO DEL TOTAL Y MENSAJE DE WHATSAPP
   Se ejecuta cada vez que el cliente cambia un dato.
   ---------------------------------------------------------- */
function update() {

  // Cantidad de paquetes: mínimo 1, máximo 200
  var n = Math.min(200, Math.max(1, parseInt($("#n").value, 10) || 1));

  // Zona elegida y total = precio de la zona × cantidad
  var z = $("#z").value;
  var total = T[z] * n;

  // Mostrar el total en pantalla, con formato uruguayo (ej: $1.040)
  $("#tot").textContent = "$" + total.toLocaleString("es-UY");

  // Armar el mensaje que se enviará por WhatsApp
  var nom = $("#nom").value.trim();
  var msg =
    "Hola MOVA, " + (nom ? "soy " + nom + " y " : "") + "quiero cotizar un servicio.\n" +
    "Tipo: " + $("#tipo").value + "\n" +
    "Zona: " + Z[z] + "\n" +
    "Cantidad: " + n + "\n" +
    "Total estimado: $" + total.toLocaleString("es-UY");

  // Poner el mensaje en el enlace del botón "Enviar por WhatsApp"
  $("#send").href = "https://wa.me/" + WA + "?text=" + encodeURIComponent(msg);
}


/* ----------------------------------------------------------
   4. EVENTOS DEL FORMULARIO
   Recalcula cada vez que se escribe o se cambia un campo.
   ---------------------------------------------------------- */
["#nom", "#tipo", "#z", "#n"].forEach(function (selector) {
  $(selector).addEventListener("input", update);
  $(selector).addEventListener("change", update);
});


/* ----------------------------------------------------------
   5. TARJETAS DE TARIFA
   Al tocar una tarjeta (la que tiene data-z), se elige esa zona
   en el formulario y la página baja hasta el cotizador.
   ---------------------------------------------------------- */
document.querySelectorAll("[data-z]").forEach(function (card) {
  card.addEventListener("click", function () {
    $("#z").value = card.getAttribute("data-z");
    update();
    $("#cotizar").scrollIntoView({ behavior: "smooth" });
  });
});


/* ----------------------------------------------------------
   6. INICIO
   ---------------------------------------------------------- */

// Año actual en el pie de página
$("#yr").textContent = new Date().getFullYear();

// Primer cálculo al cargar la página
update();
