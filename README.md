# Acero Barber Co. — Sitio web de la barbería

Sitio web responsivo y en español para una barbería: identidad visual propia,
menú móvil, galería con lightbox, perfiles del equipo, formulario de reserva
validado con HTML5 y Bootstrap, asistente local de preguntas frecuentes y enlace
de confirmación a WhatsApp.

No requiere backend, base de datos ni instalación de dependencias: usa HTML, CSS
y JavaScript, con Bootstrap 5.3.3, AOS, Font Awesome y Google Fonts vía CDN.
El asistente responde en el navegador; no es una persona, no usa IA ni consulta
una agenda en tiempo real. Las solicitudes de cita solo quedan confirmadas cuando
el negocio responde por WhatsApp.

---

## 1. Cómo ejecutarlo en VS Code

1. Descomprime la carpeta `acero-barber-co` donde prefieras.
2. Ábrela en VS Code (`Archivo > Abrir carpeta…`).
3. Instala la extensión **Live Server** (de Ritwick Dey) si no la tienes.
4. Haz clic derecho sobre `index.html` → **"Open with Live Server"**.
   - También puedes abrir `index.html` directamente en el navegador con doble clic,
     pero Live Server evita problemas al cargar imágenes y recarga la página
     automáticamente cuando editas el código.

No necesitas `npm install` ni ningún paso adicional: las librerías se cargan desde
internet (CDN), así que necesitas conexión para verlas correctamente.

---

## 2. Estructura de archivos

```
acero-barber-co/
├── index.html          → Toda la estructura del sitio (una sola página)
├── css/
│   └── style.css        → Estilos, colores, tipografía y animaciones
├── js/
│   ├── config.js        → 🔧 Contenido, WhatsApp, barberos y respuestas frecuentes
│   └── script.js         → Lógica del sitio (no es necesario editarlo)
├── images/
│   ├── logo/             → Logo de la barbería
│   ├── barbers/          → Retratos propios de los 3 barberos
│   ├── gallery/          → Fotos del local y trabajos realizados
│   └── location/         → Fotos del local para la sección Ubicación
└── README.md            → Este archivo
```

---

## 3. Dónde poner tus imágenes (¡muy importante!)

Guarda las imágenes en las carpetas indicadas y usa estos nombres exactos para que
aparezcan automáticamente. Respeta también la extensión `.jpg` o `.png`. Si eliges
otro nombre, actualiza su ruta en `index.html` o en `js/config.js`, según se indica.

### 🖼️ Logo — carpeta `images/logo/`
| Archivo esperado | Carpeta | Dónde se usa | Medida sugerida |
|---|---|---|---|
| `logo.png` | `images/logo/` | Menú, footer, pestaña y chat | PNG transparente, mínimo 200×200 px |

> Si no subes ningún logo, el sitio muestra automáticamente un ícono de tijeras
> como respaldo — no se rompe el diseño.

### 💈 Barberos — carpeta `images/barbers/`
| Archivo esperado | Carpeta | Perfil |
|---|---|---|
| `barbero-01.jpg` | `images/barbers/` | Primer perfil |
| `barbero-02.jpg` | `images/barbers/` | Segundo perfil |
| `barbero-03.jpg` | `images/barbers/` | Tercer perfil |

- Medida sugerida: **800×920 px** (retrato, formato vertical 3:3.4), foto de cuerpo
  o busto con buena luz. Usa retratos propios del equipo, idealmente con iluminación
  y fondo coherentes entre sí.
- Para editar **nombre, cargo, biografía, foto y redes sociales**, modifica el perfil
  correspondiente en `barberos` dentro de `js/config.js`. Los enlaces sociales vacíos
  no se muestran.

### 🏙️ Local / Ubicación — carpeta `images/location/`
| Archivo esperado | Carpeta | Dónde se usa |
|---|---|---|
| `local-01.jpg` | `images/location/` | Estación de trabajo, sección Ubicación |
| `local-02.jpg` | `images/location/` | Sillas y herramientas, sección Ubicación |

- Medida sugerida: **900×600 px** (horizontal).

### 📸 Galería / trabajos — carpeta `images/gallery/`
Guarda las fotos en `images/gallery/`. Algunas se reutilizan entre la portada,
Nosotros, Servicios y la galería:

| Archivo | Dónde se muestra |
|---|---|
| `barberia-equipo.jpg` | Portada y galería; foto grupal de barberos |
| `barberia-interior-01.jpg` | Secciones Nosotros y Servicios |
| `barberia-interior-02.jpg` | Galería |

- Puedes agregar más fotos o quitar algunas editando el arreglo `galeria` en
  `js/config.js` (cada entrada es `{ src: "images/gallery/archivo.jpg", caption: "Texto" }`).
- Medida sugerida: **900×1200 px** (vertical) para que se vean bien en la cuadrícula.
- Las imágenes actuales son referencias de Pexels (fotos 1813272, 3998415 y 3993308) y
  no representan al equipo ni al local reales de Acero. Reemplázalas por fotos
  propias antes de publicar la página como sitio de un negocio real.
- Las tarjetas del equipo muestran un ícono mientras no estén disponibles los
  retratos `barbero-01.jpg` a `barbero-03.jpg`; agrega fotos propias en `images/barbers/`.

> 🔒 Si una imagen no existe todavía, esa tarjeta de la galería simplemente se
> oculta — no aparecen íconos rotos ni espacios en blanco raros.

### Formulario de reserva

El formulario combina Bootstrap 5 (`row`, `col-12`, `col-md-6`, `form-control`,
`form-select` y `form-check`) con estilos propios en `css/style.css`. Se adapta
a una columna en móvil y dos columnas en pantallas medianas o mayores. Incluye
texto, teléfono, listas de selección, fecha, hora, opciones de radio, casilla
de verificación y mensaje. Los campos obligatorios usan `required`; nombre y
teléfono también usan `pattern`; el teléfono debe contener entre 7 y 15 dígitos.
La validación HTML5 se completa con reglas del horario de atención y estados
visuales de Bootstrap. Al enviar, los datos
se preparan para WhatsApp; la reserva no se confirma hasta recibir respuesta.

---

## 4. Cómo agregar tus videos de YouTube

No necesitas ninguna API key. Solo copia el **ID** del video de YouTube (no la URL
completa) y pégalo en `js/config.js`, dentro del arreglo `videos`:

```js
videos: [
  {
    titulo: "Recorrido por la barbería",
    youtubeId: "AQUI_VA_EL_ID",   // https://www.youtube.com/watch?v=AQUI_VA_EL_ID
    miniatura: ""                  // déjalo vacío para usar la miniatura oficial de YouTube
  },
  // agrega tantos objetos como videos quieras
]
```

El ID es la parte de la URL después de `v=`. Por ejemplo, si tu video es
`https://www.youtube.com/watch?v=ABC12345XYZ`, el ID es `ABC12345XYZ`.

Al hacer clic en cualquier tarjeta de video, se abre una ventana emergente con el
video reproduciéndose directamente desde YouTube.

---

## 5. Cómo configurar tu número de WhatsApp

En `js/config.js`, al inicio del archivo:

```js
whatsapp: {
  numero: "573001234567",   // reemplázalo por tu número real; país + número, solo dígitos
  mensajeWidget: "Hola, quisiera más información sobre sus servicios 💈"
}
```

Este número se usa en dos lugares:
1. El **botón flotante** abre un asistente de preguntas frecuentes con respuestas
   automáticas de horarios, servicios, precios, ubicación y reservas. El botón
   inferior permite continuar la conversación con una persona por WhatsApp.
2. El **formulario de "Reservar cita"**: al enviarlo, se arma automáticamente un
   mensaje de WhatsApp con todos los datos (nombre, servicio, barbero, fecha y
   hora) para que el cliente solo tenga que pulsar "Enviar". Revisa que los
   horarios, precios y número de WhatsApp estén actualizados antes de publicarlo.

---

## 6. Otros textos que puedes personalizar fácilmente

- **Respuestas automáticas del chat**: `chatbot.respuestas` y `chatbot.sugerencias`
  en `js/config.js`. Ajusta las palabras clave y respuestas junto con los datos
  publicados. Las respuestas de horarios y precios deben mantenerse sincronizadas
  con el formulario y las secciones del sitio.
- **Precios y servicios**: búscalos directamente en `index.html`, dentro de la
  sección `<section class="pricing" id="servicios">` (lista `<ul class="price-list">`).
- **Dirección, teléfono, correo y horario**: sección `<section class="location">`
  en `index.html`, y el mapa (`iframe` de Google Maps) justo debajo — puedes
  reemplazar la URL del mapa por la de tu negocio desde Google Maps
  (botón "Compartir" → "Insertar un mapa").
- **Opiniones de clientes**: arreglo `opiniones` y `testimonioDestacado` en
  `js/config.js`.
- **Colores de marca**: al inicio de `css/style.css` encontrarás un bloque
  `:root { --gold: ...; --bg-1: ...; }` con todos los colores del sitio en un
  solo lugar.

### Antes de publicar

Verifica y reemplaza los datos de demostración que dependen del negocio: nombres y
biografías del equipo en `js/config.js`; teléfono de WhatsApp; dirección, teléfono,
correo y mapa en `index.html`; y precios y horarios. Agrega fotos propias usando
los nombres de las tablas. Videos, opiniones y redes sociales empiezan vacíos a
propósito: agrega enlaces y testimonios auténticos solo cuando los tengas.

---

## 7. Librerías utilizadas (vía CDN, no requieren instalación)

- **[AOS – Animate On Scroll](https://michalsnik.github.io/aos/)**: animaciones de
  aparición al hacer scroll por la página.
- **[Bootstrap 5.3.3](https://getbootstrap.com/)**: estilos base para campos del
  formulario y selects; los componentes visuales principales son CSS personalizado.
- **[Font Awesome](https://fontawesome.com/)**: iconos (WhatsApp, redes sociales,
  estrellas, ubicación, etc.).
- **Google Fonts**: tipografías `Bebas Neue` (títulos) y `Jost` (texto).
- **YouTube Embed**: reproducción de videos dentro de ventanas emergentes.
- **Google Maps Embed**: mapa de ubicación (sin necesidad de API key).

---

## 8. Secciones incluidas

1. Encabezado fijo con menú de navegación y menú móvil (hamburguesa)
2. Portada (hero) con imagen de fondo animada
3. Nosotros (propuesta y servicios)
4. Galería "Nuestro trabajo" con lightbox
5. Precios y servicios + espacio para testimonio destacado
6. Equipo de barberos con biografía en ventana emergente
7. Sección de videos preparada para agregar contenido propio
8. Formulario de reserva de citas conectado a WhatsApp
9. Sección preparada para publicar opiniones auténticas
10. Ubicación con fotos, datos de contacto y mapa
11. Pie de página con acceso a reservas y contacto
12. Asistente local de preguntas frecuentes con acceso a WhatsApp
13. Botón "subir arriba"

¡Listo! Solo agrega tus imágenes, ajusta `js/config.js` con tus datos reales y el
sitio queda funcionando de principio a fin.
