/* ============================================================
   STRATEGY MP — contacto.js
   Formulario general de contacto
   ============================================================ */

(function () {
  'use strict';

  const form = document.getElementById('formContacto');
  const ok   = document.getElementById('formContactoOk');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      return;
    }

    const data = {
      nombre:   document.getElementById('cNombre').value.trim(),
      email:    document.getElementById('cEmail').value.trim(),
      celular:  document.getElementById('cCelular').value.trim(),
      ciudad:   document.getElementById('cCiudad').value.trim(),
      tipo:     document.getElementById('cTipo').value,
      mensaje:  document.getElementById('cMensaje').value.trim(),
      fecha:    new Date().toISOString()
    };

    try {
      const previas = JSON.parse(localStorage.getItem('smp_contactos') || '[]');
      previas.push(data);
      localStorage.setItem('smp_contactos', JSON.stringify(previas));
    } catch (err) { /* sin almacenamiento, continuar */ }

    /* ---- Conexión a backend o servicio externo ----
       Ejemplos: Formspree, EmailJS, Google Apps Script, Brevo.
       Reemplaza este bloque por tu integración.
    ------------------------------------------------- */

    form.classList.remove('was-validated');
    form.reset();
    if (ok) {
      ok.classList.remove('d-none');
      setTimeout(() => ok.classList.add('d-none'), 6000);
    }
    if (typeof window.showToast === 'function') {
      window.showToast('Mensaje enviado. Te responderemos pronto.');
    }

    // Abrir WhatsApp como complemento (opcional)
    const texto = encodeURIComponent(
      `Hola Guillermo, soy ${data.nombre} (${data.ciudad}).\n` +
      `Asunto: ${data.tipo}\n\n${data.mensaje}`
    );
    setTimeout(() => window.open(`https://wa.me/51964733868?text=${texto}`, '_blank'), 1200);
  });

})();
