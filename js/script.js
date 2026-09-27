/* =====================================================
   ACERO BARBER CO. — Lógica principal del sitio
   No es necesario editar este archivo para personalizar
   contenido: usa js/config.js para eso.
===================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- LIBRERÍA AOS (animaciones al hacer scroll) ---------- */
  if (window.AOS) {
    AOS.init({
      duration: 700,
      easing: 'ease-out-cubic',
      once: true,
      offset: 60
    });
  }

  /* ---------- PRELOADER ---------- */
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => preloader && preloader.classList.add('is-hidden'), 350);
  });

  /* ---------- BARRA DE PROGRESO + HEADER AL HACER SCROLL ---------- */
  const header = document.getElementById('header');
  const progressBar = document.getElementById('scrollProgress');
  const toTopBtn = document.getElementById('toTop');

  function onScroll() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (progressBar) progressBar.style.width = pct + '%';

    if (header) header.classList.toggle('is-scrolled', scrollTop > 40);
    if (toTopBtn) toTopBtn.classList.toggle('is-visible', scrollTop > 500);
  }
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  toTopBtn && toTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- MENÚ MÓVIL (hamburguesa) ---------- */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  function closeMobileMenu() {
    hamburger && hamburger.classList.remove('is-active');
    mobileMenu && mobileMenu.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  hamburger && hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('is-open');
    hamburger.classList.toggle('is-active', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  /* ---------- MODAL GENÉRICO (lightbox / bio / confirmación) ---------- */
  const modalOverlay = document.getElementById('modalOverlay');
  const modalContent = document.getElementById('modalContent');
  const modalClose = document.getElementById('modalClose');

  function openModal(html) {
    modalContent.innerHTML = html;
    modalOverlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    modalOverlay.classList.remove('is-open');
    document.body.style.overflow = '';
    // Detiene cualquier video reproduciéndose dentro del modal
    modalContent.innerHTML = '';
  }
  modalClose && modalClose.addEventListener('click', closeModal);
  modalOverlay && modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  /* ---------- GALERÍA: inyectar imágenes + lightbox ---------- */
  const galleryGrid = document.getElementById('galleryGrid');
  if (galleryGrid && window.CONFIG) {
    CONFIG.galeria.forEach((item, index) => {
      const el = document.createElement('div');
      el.className = 'gallery__item';
      el.setAttribute('data-aos', 'fade-up');
      el.setAttribute('data-aos-delay', String((index % 4) * 80));
      el.innerHTML = `
        <img src="${item.src}" alt="${item.caption}" loading="lazy"
             onerror="this.closest('.gallery__item').style.display='none'">
        <span class="gallery__zoom"><i class="fa-solid fa-expand"></i></span>
        <div class="gallery__caption">${item.caption}</div>
      `;
      el.addEventListener('click', () => {
        openModal(`<img class="modal-lightbox-img" src="${item.src}" alt="${item.caption}">
                   <p style="margin-top:16px;color:var(--ink-muted);text-align:center;">${item.caption}</p>`);
      });
      galleryGrid.appendChild(el);
    });
  }

  /* ---------- EQUIPO: inyectar barberos + modal de biografía ---------- */
  const teamGrid = document.getElementById('teamGrid');
  const barberoSelect = document.getElementById('barberoSelect');

  if (teamGrid && window.CONFIG) {
    const socialLink = (url, label, icon) => url && url !== '#'
      ? `<a href="${url}" target="_blank" rel="noopener noreferrer" aria-label="${label}" onclick="event.stopPropagation()"><i class="${icon}"></i></a>`
      : '';

    CONFIG.barberos.forEach((b, index) => {
      const card = document.createElement('div');
      card.className = 'team-card';
      card.setAttribute('data-aos', 'fade-up');
      card.setAttribute('data-aos-delay', String(index * 100));
      card.innerHTML = `
        <div class="team-card__photo ${b.foto ? '' : 'team-card__photo--placeholder'}">
          ${b.foto ? `<img src="${b.foto}" alt="${b.nombre}" loading="lazy"
               onerror="this.style.display='none'; this.parentElement.classList.add('team-card__photo--placeholder')">` : ''}
          <div class="team-card__socials">${socialLink(b.instagram, 'Instagram', 'fa-brands fa-instagram')}${socialLink(b.facebook, 'Facebook', 'fa-brands fa-facebook-f')}</div>
        </div>
        <div class="team-card__body">
          <h3 class="team-card__name">${b.nombre}</h3>
          <span class="team-card__role">${b.rol}</span>
          <p class="team-card__bio">${b.bio.slice(0, 80)}${b.bio.length > 80 ? '…' : ''}</p>
        </div>
      `;
      card.addEventListener('click', () => {
        openModal(`
          <div class="bio-modal">
            ${b.foto ? `<img src="${b.foto}" alt="${b.nombre}" onerror="this.style.display='none'">` : ''}
            <div>
              <h3>${b.nombre}</h3>
              <span class="role">${b.rol}</span>
              <p>${b.bio}</p>
              <div class="socials">${socialLink(b.instagram, 'Instagram', 'fa-brands fa-instagram')}${socialLink(b.facebook, 'Facebook', 'fa-brands fa-facebook-f')}</div>
            </div>
          </div>
        `);
      });
      teamGrid.appendChild(card);

      if (barberoSelect) {
        const opt = document.createElement('option');
        opt.textContent = b.nombre;
        barberoSelect.appendChild(opt);
      }
    });
  }

  /* ---------- VIDEOS: inyectar tarjetas + reproducir en modal ---------- */
  const videosGrid = document.getElementById('videosGrid');
  if (videosGrid && window.CONFIG) {
    if (!CONFIG.videos.length) {
      const emptyState = document.createElement('p');
      emptyState.className = 'content-empty-state';
      emptyState.textContent = 'Pronto compartiremos videos propios del trabajo y el espacio.';
      videosGrid.appendChild(emptyState);
    }

    CONFIG.videos.forEach((v, index) => {
      const thumb = v.miniatura && v.miniatura.trim() !== ''
        ? v.miniatura
        : `https://img.youtube.com/vi/${v.youtubeId}/hqdefault.jpg`;

      const card = document.createElement('div');
      card.className = 'video-card';
      card.setAttribute('data-aos', 'zoom-in');
      card.setAttribute('data-aos-delay', String(index * 100));
      card.innerHTML = `
        <img src="${thumb}" alt="${v.titulo}" loading="lazy">
        <div class="video-card__overlay">
          <div class="video-card__play"><i class="fa-solid fa-play"></i></div>
        </div>
        <div class="video-card__title">${v.titulo}</div>
      `;
      card.addEventListener('click', () => {
        openModal(`
          <iframe class="modal-video-frame"
            src="https://www.youtube.com/embed/${v.youtubeId}?autoplay=1&rel=0"
            title="${v.titulo}"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen>
          </iframe>
          <p style="margin-top:16px;color:var(--ink-muted);text-align:center;">${v.titulo}</p>
        `);
      });
      videosGrid.appendChild(card);
    });
  }

  /* ---------- OPINIONES: inyectar tarjetas ---------- */
  const reviewsGrid = document.getElementById('reviewsGrid');
  if (reviewsGrid && window.CONFIG) {
    if (!CONFIG.opiniones.length) {
      const emptyState = document.createElement('p');
      emptyState.className = 'content-empty-state';
      emptyState.textContent = 'Aquí publicaremos opiniones reales de nuestros clientes.';
      reviewsGrid.appendChild(emptyState);
    }

    CONFIG.opiniones.forEach((r) => {
      const initials = r.nombre.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
      const card = document.createElement('div');
      card.className = 'review-card';
      card.innerHTML = `
        <div class="review-card__stars">
          <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
        </div>
        <p class="review-card__text">"${r.texto}"</p>
        <div class="review-card__author">
          <div class="review-card__avatar">${initials}</div>
          <div>
            <div class="review-card__name">${r.nombre}</div>
            <div class="review-card__role">${r.rol}</div>
          </div>
        </div>
      `;
      reviewsGrid.appendChild(card);
    });
  }

  /* ---------- TESTIMONIO DESTACADO: carrusel simple junto a precios ---------- */
  const testimonialText = document.getElementById('testimonialText');
  const testimonialAuthor = document.getElementById('testimonialAuthor');
  const testimonialDots = document.getElementById('testimonialDots');

  if (testimonialText && window.CONFIG && CONFIG.testimonioDestacado.length) {
    const items = CONFIG.testimonioDestacado;
    let current = 0;

    function renderTestimonial(i) {
      testimonialText.style.opacity = 0;
      setTimeout(() => {
        testimonialText.textContent = `"${items[i].texto}"`;
        testimonialAuthor.textContent = `— ${items[i].autor}`;
        testimonialText.style.opacity = 1;
      }, 200);

      if (testimonialDots) {
        [...testimonialDots.children].forEach((dot, idx) => dot.classList.toggle('is-active', idx === i));
      }
    }

    testimonialDots.innerHTML = '';
    items.forEach((_, i) => {
      const dot = document.createElement('span');
      dot.addEventListener('click', () => { current = i; renderTestimonial(current); resetAutoplay(); });
      testimonialDots.appendChild(dot);
    });

    renderTestimonial(current);

    let autoplayTimer;
    function resetAutoplay() {
      clearInterval(autoplayTimer);
      autoplayTimer = setInterval(() => {
        current = (current + 1) % items.length;
        renderTestimonial(current);
      }, 5500);
    }
    resetAutoplay();
  }

  /* ---------- WIDGET FLOTANTE DE WHATSAPP ---------- */
  const whatsappFab = document.getElementById('whatsappFab');
  const whatsappChat = document.getElementById('whatsappChat');
  const closeWhatsappChat = document.getElementById('closeWhatsappChat');
  const whatsappSendBtn = document.getElementById('whatsappSendBtn');
  const chatMessages = document.getElementById('chatMessages');
  const chatForm = document.getElementById('chatForm');
  const chatInput = document.getElementById('chatInput');
  const chatSuggestions = document.getElementById('chatSuggestions');

  if (whatsappSendBtn && window.CONFIG) {
    const numero = CONFIG.whatsapp.numero.replace(/\D/g, '');
    const mensaje = encodeURIComponent(CONFIG.whatsapp.mensajeWidget);
    whatsappSendBtn.href = `https://wa.me/${numero}?text=${mensaje}`;
  }

  whatsappFab && whatsappFab.addEventListener('click', () => {
    const isOpen = whatsappChat.classList.toggle('is-open');
    whatsappFab.setAttribute('aria-expanded', String(isOpen));
    if (isOpen) chatInput && chatInput.focus();
  });
  closeWhatsappChat && closeWhatsappChat.addEventListener('click', () => {
    whatsappChat.classList.remove('is-open');
    whatsappFab && whatsappFab.setAttribute('aria-expanded', 'false');
  });

  /* ---------- ASISTENTE DE PREGUNTAS FRECUENTES ---------- */
  if (window.CONFIG && chatMessages && chatForm && chatInput) {
    const normalizeText = (text) => text
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();

    function addChatMessage(text, isUser = false) {
      const message = document.createElement('div');
      message.className = `whatsapp-bubble${isUser ? ' is-user' : ''}`;
      message.textContent = text;
      chatMessages.appendChild(message);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function getChatReply(question) {
      const normalizedQuestion = normalizeText(question);
      const matches = CONFIG.chatbot.respuestas
        .map((faq) => ({
          faq,
          score: Math.max(0, ...faq.palabras
            .map((word) => normalizeText(word))
            .filter((word) => normalizedQuestion.includes(word))
            .map((word) => word.length))
        }))
        .filter((match) => match.score > 0)
        .sort((a, b) => b.score - a.score);

      return matches[0]?.faq.texto || CONFIG.chatbot.respuestaPredeterminada;
    }

    function askAssistant(question) {
      const cleanQuestion = question.trim();
      if (!cleanQuestion) return;
      addChatMessage(cleanQuestion, true);
      chatInput.value = '';
      window.setTimeout(() => addChatMessage(getChatReply(cleanQuestion)), 350);
    }

    chatForm.addEventListener('submit', (event) => {
      event.preventDefault();
      askAssistant(chatInput.value);
      chatInput.focus();
    });

    if (chatSuggestions) {
      CONFIG.chatbot.sugerencias.forEach((suggestion) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'chat-suggestion';
        button.textContent = suggestion;
        button.addEventListener('click', () => askAssistant(suggestion));
        chatSuggestions.appendChild(button);
      });
    }
  }

  /* ---------- FORMULARIO DE RESERVA -> abre WhatsApp con los datos ---------- */
  const bookingForm = document.getElementById('bookingForm');
  const bookingName = bookingForm && bookingForm.elements.namedItem('nombre');
  const bookingPhone = bookingForm && bookingForm.elements.namedItem('telefono');
  const bookingDate = document.getElementById('bookingDate');
  const bookingTime = document.getElementById('bookingTime');

  function localDateValue(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  function validateBookingDateTime() {
    if (!bookingDate || !bookingTime) return;
    bookingDate.setCustomValidity('');
    bookingTime.setCustomValidity('');
    if (!bookingDate.value) return;

    const [year, month, day] = bookingDate.value.split('-').map(Number);
    const selectedDate = new Date(year, month - 1, day);
    if (selectedDate.getDay() === 0) {
      bookingDate.setCustomValidity('No atendemos los domingos. Elige otro día.');
      return;
    }

    if (!bookingTime.value) return;
    const saturday = selectedDate.getDay() === 6;
    const closingTime = saturday ? '18:00' : '20:00';
    if (bookingTime.value < '09:00' || bookingTime.value >= closingTime) {
      bookingTime.setCustomValidity(
        `Elige una hora entre las 09:00 y antes de las ${closingTime}.`
      );
      return;
    }

    if (bookingDate.value === localDateValue(new Date())) {
      const now = new Date();
      const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      if (bookingTime.value <= currentTime) {
        bookingTime.setCustomValidity('Elige una hora posterior a la hora actual.');
      }
    }
  }

  function validateBookingContact() {
    if (bookingName instanceof HTMLInputElement) {
      bookingName.setCustomValidity(
        bookingName.value.trim().length < 2 ? 'Escribe tu nombre (mínimo 2 caracteres).' : ''
      );
    }
    if (bookingPhone instanceof HTMLInputElement) {
      const digitCount = bookingPhone.value.replace(/\D/g, '').length;
      const phoneError = digitCount < 7
        ? 'Escribe un teléfono con al menos 7 dígitos.'
        : digitCount > 15
          ? 'El teléfono no puede tener más de 15 dígitos.'
          : '';
      bookingPhone.setCustomValidity(
        bookingPhone.value ? phoneError : ''
      );
    }
  }

  bookingName && bookingName.addEventListener('input', validateBookingContact);
  bookingPhone && bookingPhone.addEventListener('input', validateBookingContact);

  if (bookingDate && bookingTime) {
    bookingDate.min = localDateValue(new Date());
    bookingDate.addEventListener('input', validateBookingDateTime);
    bookingDate.addEventListener('change', validateBookingDateTime);
    bookingTime.addEventListener('input', validateBookingDateTime);
    bookingTime.addEventListener('change', validateBookingDateTime);
  }

  if (bookingForm && bookingDate && bookingTime) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      validateBookingContact();
      validateBookingDateTime();
      bookingForm.classList.add('was-validated');
      if (!bookingForm.reportValidity()) return;

      const data = new FormData(bookingForm);
      const nombre = String(data.get('nombre')).trim();
      const telefono = String(data.get('telefono')).trim();
      const servicio = String(data.get('servicio')).trim();
      const barbero = String(data.get('barbero')).trim();
      const fecha = String(data.get('fecha'));
      const hora = String(data.get('hora'));
      const contactoPreferido = String(data.get('contactoPreferido'));
      const primeraVisita = data.has('primeraVisita') ? 'Sí' : 'No';
      const mensaje = String(data.get('mensaje')).trim();

      const texto =
        `Hola, quiero solicitar una cita en Acero Barber Co.\n\n` +
        `Nombre: ${nombre}\nTeléfono: ${telefono}\nServicio: ${servicio}\n` +
        `Barbero: ${barbero}\nFecha: ${fecha}\nHora: ${hora}\n` +
        `Contacto preferido: ${contactoPreferido}\nPrimera visita: ${primeraVisita}` +
        (mensaje ? `\nMensaje: ${mensaje}` : '');

      const numero = CONFIG.whatsapp.numero.replace(/\D/g, '');
      const url = `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;

      openModal(`
        <div class="confirm-modal">
          <i class="fa-solid fa-circle-check"></i>
          <h3>Solicitud lista para enviar</h3>
          <p>Tu solicitud para el <strong id="confirmationDate"></strong> a las
          <strong id="confirmationTime"></strong> aún no está confirmada. Envíala por WhatsApp
          y espera la respuesta del equipo.</p>
          <a id="confirmationWhatsapp" target="_blank" rel="noopener noreferrer" class="btn btn--gold">
            <i class="fa-brands fa-whatsapp"></i> Abrir WhatsApp
          </a>
        </div>
      `);
      document.getElementById('confirmationDate').textContent = fecha;
      document.getElementById('confirmationTime').textContent = hora;
      document.getElementById('confirmationWhatsapp').href = url;

      bookingForm.reset();
      bookingDate.setCustomValidity('');
      bookingTime.setCustomValidity('');
      bookingForm.classList.remove('was-validated');
    });
  }

  /* ---------- AÑO DINÁMICO EN EL FOOTER ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- CIERRE DE MENÚ MÓVIL AL CRECER LA VENTANA ---------- */
  window.addEventListener('resize', () => {
    if (window.innerWidth > 980) closeMobileMenu();
  });

});
