/* ============================================================
   STRATEGY MP — cursos.js
   Filtros del catálogo de cursos
   ============================================================ */

(function () {
  'use strict';

  const filtros = document.querySelectorAll('#filtros .smp-filter');
  const items   = document.querySelectorAll('.smp-item');
  const vacio   = document.getElementById('gridVacio');

  if (!filtros.length) return;

  filtros.forEach(btn => {
    btn.addEventListener('click', () => {
      filtros.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filtro = btn.dataset.filter;
      let visibles = 0;

      items.forEach(item => {
        const cats = item.dataset.cat.split(' ');
        const match = filtro === 'all' || cats.includes(filtro);

        if (match) {
          item.style.display = '';
          requestAnimationFrame(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          });
          visibles++;
        } else {
          item.style.opacity = '0';
          item.style.transform = 'translateY(10px)';
          setTimeout(() => { item.style.display = 'none'; }, 250);
        }
      });

      if (vacio) {
        vacio.classList.toggle('d-none', visibles > 0);
      }
    });
  });

  // Estilo de transición inicial
  items.forEach(item => {
    item.style.transition = 'opacity .25s ease, transform .25s ease';
  });

})();
