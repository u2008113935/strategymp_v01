/* ============================================================
   STRATEGY MP — registro.js
   Formulario de registro al taller de Power BI (index.html)
   ============================================================ */

(function () {
  'use strict';

  const form = document.getElementById('formRegistro');
  const ok   = document.getElementById('formRegistroOk');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      return;
    }

    const data = {
      nombre:   document.getElementById('regNombre').value.trim(),
      email:    document.getElementById('regEmail').value.trim(),
      celular:  document.getElementById('regCelular').value.trim(),
      ciudad:   document.getElementById('regCiudad').value,
      taller:   'Power BI desde cero',
      fecha:    new Date().toISOString()
    };

    /* ---- Guardar en localStorage como respaldo ---- */
    try {
      const previas = JSON.parse(localStorage.getItem('smp_registros') || '[]');
      previas.push(data);
      localStorage.setItem('smp_registros', JSON.stringify(previas));
    } catch (err) { /* sin almacenamiento, continuar */ }

    /* ---- Aquí conectarías con tu backend / Google Sheets / Formspree ----
       Ejemplo:
       fetch('https://formspree.io/f/xxxxxxxx', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
         body: JSON.stringify(data)
       }).then(r => r.ok ? mostrarExito() : mostrarError());
    -------------------------------------------------------------------- */

    mostrarExito();
    redirigirWhatsApp(data);
  });

  function mostrarExito () {
    form.classList.remove('was-validated');
    form.reset();
    if (ok) {
      ok.classList.remove('d-none');
      setTimeout(() => ok.classList.add('d-none'), 6000);
    }
    if (typeof window.showToast === 'function') {
      window.showToast('¡Cupo reservado! Revisa tu correo.');
    }
  }

  function redirigirWhatsApp (data) {
    const texto = encodeURIComponent(
      `Hola Guillermo, soy ${data.nombre} desde ${data.ciudad}. ` +
      `Me acabo de registrar al taller gratuito de Power BI. ¡Gracias!`
    );
    setTimeout(() => {
      window.open(`https://wa.me/51964733868?text=${texto}`, '_blank');
    }, 1200);
  }

})();
