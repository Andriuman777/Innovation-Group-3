/* =====================================================
   CONFIGURACIÓN DE LA PLATAFORMA — Acero Barber Co.
   -----------------------------------------------------
   Edita SOLO este archivo para personalizar el contenido:
   número de WhatsApp, barberos, galería, videos y opiniones.
   No necesitas tocar script.js ni el HTML para estos cambios.
===================================================== */

window.CONFIG = {

  /* ---------- WHATSAPP ----------
     Número en formato internacional, SIN "+", SIN espacios ni guiones.
     Ejemplo Colombia: 57 3001234567  ->  "573001234567"           */
  whatsapp: {
    numero: "573001234567",
    mensajeWidget: "Hola, quisiera más información sobre sus servicios 💈"
  },

  /* ---------- ASISTENTE DEL CHAT ----------
     Las respuestas deben coincidir con los horarios, precios y políticas publicados. */
  chatbot: {
    sugerencias: ["¿Qué horario tienen?", "¿Cuánto cuesta un corte?", "¿Cómo reservo?"],
    respuestas: [
      {
        palabras: ["horario", "abren", "abierto", "cierran", "atienden", "disponible", "disponibilidad", "hoy"],
        texto: "Nuestro horario publicado es de lunes a viernes, de 9:00 a. m. a 8:00 p. m., y los sábados, de 9:00 a. m. a 6:00 p. m. Los domingos estamos cerrados. ¿Buscas una hora para un día específico? La disponibilidad real se confirma por WhatsApp; este chat no consulta una agenda en vivo."
      },
      {
        palabras: ["precio", "precios", "cuesta", "cuanto", "costo", "valor", "tarifa"],
        texto: "Estos son los precios publicados: corte clásico $40.000; afeitado con navaja $35.000; corte + afeitado $70.000; perfilado de barba $15.000; diseño o línea de barba $20.000; y corte infantil $30.000. Si buscas otro servicio o quieres confirmar un precio, escríbenos por WhatsApp."
      },
      {
        palabras: ["servicio", "servicios", "hacen", "ofrecen", "barba", "afeitado", "corte"],
        texto: "Ofrecemos corte clásico, afeitado con navaja, corte combinado con afeitado, perfilado y diseño de barba, y corte infantil. En la sección Servicios puedes consultar los precios publicados. Cuéntanos qué estilo buscas y te orientamos por WhatsApp."
      },
      {
        palabras: ["reservar", "reserva", "cita", "agendar", "agenda", "turno"],
        texto: "Puedes solicitar una cita en el formulario de Reservar cita: completa tu nombre y teléfono, elige servicio, barbero, fecha y hora, y continúa a WhatsApp. La solicitud no queda confirmada hasta que el equipo te responda. También puedes escribirnos directamente con el botón de WhatsApp."
      },
      {
        palabras: ["direccion", "ubicacion", "donde", "llegar", "mapa"],
        texto: "La dirección publicada en esta página es Calle 10 # 20-30, Cali, Valle del Cauca. Puedes ver el mapa en la sección Ubicación. Si necesitas confirmar indicaciones antes de salir, contáctanos por WhatsApp."
      },
      {
        palabras: ["barbero", "barberos", "equipo", "profesional", "quien"],
        texto: "En la sección Barberos puedes conocer al equipo y escoger a quién prefieres en el formulario. Si no tienes preferencia, selecciona “Cualquiera disponible” y coordinaremos contigo al confirmar la cita."
      },
      {
        palabras: ["cancelar", "cancelacion", "cambiar", "reprogramar", "modificar"],
        texto: "Para cancelar o cambiar una cita, escríbenos directamente por WhatsApp indicando el nombre y la fecha de la solicitud. Como las citas se coordinan por mensaje, el equipo debe confirmar el cambio."
      },
      {
        palabras: ["pago", "pagar", "efectivo", "tarjeta", "transferencia", "duracion", "cuanto dura", "parqueadero"],
        texto: "No tenemos esta información detallada publicada todavía. Para confirmar métodos de pago, duración de un servicio u otros detalles de la visita, escríbenos por WhatsApp y te responderemos directamente."
      }
    ],
    respuestaPredeterminada: "Puedo ayudarte con horarios, disponibilidad, precios, servicios, barberos, ubicación y reservas. Si tu pregunta es más específica, escríbenos por WhatsApp para que el equipo te confirme los detalles."
  },

  /* ---------- BARBEROS ----------
     "foto" debe apuntar al archivo dentro de images/barbers/
     (ver README.md para nombres exactos y medidas recomendadas). */
  barberos: [
    {
      nombre: "Camilo Restrepo",
      rol: "Barbero fundador",
      foto: "",
      bio: "Con más de 10 años de trayectoria, Camilo es especialista en cortes clásicos y afeitado con navaja tradicional. Fundó Acero Barber Co. con la idea de devolverle el ritual al corte de cabello.",
      instagram: "",
      facebook: ""
    },
    {
      nombre: "Andrés Gómez",
      rol: "Especialista en fade",
      foto: "",
      bio: "Andrés se formó en barberías urbanas y domina las técnicas de degradado (fade) y diseño de líneas. Le apasiona combinar tendencias modernas con acabados impecables.",
      instagram: "",
      facebook: ""
    },
    {
      nombre: "Julián Torres",
      rol: "Especialista en barba",
      foto: "",
      bio: "Julián se enfoca en el cuidado y diseño de barba: perfilado, hidratación y tratamientos con toalla caliente. Cada sesión con él es una experiencia de barbería clásica.",
      instagram: "",
      facebook: ""
    }
  ],

  /* ---------- GALERÍA "Descubre nuestro trabajo" ----------
     "src" apunta a images/gallery/. Puedes agregar o quitar objetos. */
  galeria: [
    { src: "images/gallery/barberia-equipo.jpg", caption: "Barberos trabajando en equipo" },
    { src: "images/gallery/barberia-interior-01.jpg", caption: "Estación de barbería" },
    { src: "images/gallery/barberia-interior-02.jpg", caption: "Sillas y herramientas de trabajo" }
  ],

  /* ---------- VIDEOS DE YOUTUBE ----------
     Pega aquí el ID del video de YouTube (NO la URL completa).
     Ejemplo: en https://www.youtube.com/watch?v=dQw4w9WgXcQ
     el id es "dQw4w9WgXcQ".
     "miniatura" es opcional: si no existe, se usa automáticamente
     la miniatura oficial de YouTube para ese video.               */
  videos: [],

  /* ---------- TESTIMONIO DESTACADO (tarjeta junto a precios) ---------- */
  testimonioDestacado: [],

  /* ---------- OPINIONES (grid completo de la sección Opiniones) ---------- */
  opiniones: []
};
