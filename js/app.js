// Enrutado por hash (#/<seccion>): cada sección es un fragmento HTML de pages/.
const PAGES = [
  { g: 'Empezar' },
  { slug: 'inicio', t: 'Inicio', i: 'house' },
  { slug: 'antes-de-empezar', t: 'Antes de empezar', i: 'star' },
  { slug: 'primeros-pasos', t: 'Primeros pasos', i: 'flower' },
  { slug: 'primer-anio', t: 'El primer año', i: 'leaf' },
  { slug: 'avanzado', t: 'Juego avanzado', i: 'palm' },
  { g: 'Cuándo' },
  { slug: 'ojo-al-reloj', t: 'Ojo al reloj', i: 'clock' },
  { slug: 'calendario', t: 'Calendario', i: 'cal' },
  { g: 'Consulta' },
  { slug: 'aldeanos', t: 'Aldeanos y regalos', i: 'heart' },
  { slug: 'lotes', t: 'Centro Cívico', i: 'chest' },
  { slug: 'cultivos', t: 'Cultivos', i: 'sprout' },
  { slug: 'animales', t: 'Animales y artesanía', i: 'egg' },
  { slug: 'pesca', t: 'Pesca', i: 'fish' },
  { slug: 'minas', t: 'Minas y combate', i: 'pick' },
  { slug: 'habilidades', t: 'Habilidades', i: 'book' },
  { slug: 'dinero', t: 'Dinero', i: 'coin' }
];

const main = document.getElementById('main');
const sidebar = document.getElementById('sidebar');
const toggle = document.getElementById('menu-toggle');
const cache = {};

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const ic = (name) => `<i class="px" data-i="${name}"></i>`;
const seasonTag = (s) => `<span class="tag s${s}">${SV.seasons[s]}</span>`;
const gold = (n) => n.toLocaleString('es-ES').replace(/\./g, ' ') + ' o';

// Marcas guardadas en localStorage (solo en este navegador)
const store = {
  get(k) { try { return localStorage.getItem('sv:' + k) === '1'; } catch (e) { return false; } },
  set(k, v) { try { v ? localStorage.setItem('sv:' + k, '1') : localStorage.removeItem('sv:' + k); } catch (e) { /* sin almacenamiento */ } }
};

function buildNav() {
  document.getElementById('nav-list').innerHTML = PAGES.map((p) => p.g
    ? `<li class="nav-group">${p.g}</li>`
    : `<li><a href="#/${p.slug}" data-slug="${p.slug}">${ic(p.i)}<span>${p.t}</span></a></li>`).join('');
}

function currentSlug() {
  const slug = location.hash.replace(/^#\/?/, '');
  return PAGES.some((p) => p.slug === slug) ? slug : 'inicio';
}

async function route() {
  const slug = currentSlug();
  document.querySelectorAll('.nav-list a').forEach((a) => a.classList.toggle('active', a.dataset.slug === slug));
  sidebar.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
  try {
    if (!cache[slug]) {
      const res = await fetch(`pages/${slug}.html`);
      if (!res.ok) throw new Error(res.status);
      cache[slug] = await res.text();
    }
    main.innerHTML = cache[slug];
  } catch (e) {
    main.innerHTML = '<h1>No se ha podido cargar la sección</h1><p>Prueba a recargar la página.</p>';
  }
  main.querySelectorAll('[data-widget]').forEach((el) => WIDGETS[el.dataset.widget](el));
  bindChecks(main);
  renderIcons(document);
  const page = PAGES.find((p) => p.slug === slug);
  document.title = slug === 'inicio' ? 'Nunca Stardew · Guía de Stardew Valley' : `${page.t} · Nunca Stardew`;
  window.scrollTo(0, 0);
}

function bindChecks(root) {
  root.querySelectorAll('input[type="checkbox"][data-k]').forEach((box) => {
    box.checked = store.get(box.dataset.k);
    if (box.dataset.bound) return;
    box.dataset.bound = '1';
    box.addEventListener('change', () => {
      store.set(box.dataset.k, box.checked);
      box.dispatchEvent(new CustomEvent('sv:check', { bubbles: true }));
    });
  });
}

const WIDGETS = {
  calendar(el) {
    const days = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
    let season = 0;
    const draw = () => {
      let cells = days.map((d) => `<div class="cal-head">${d}</div>`).join('');
      for (let d = 1; d <= 28; d++) {
        const evs = SV.events.filter((e) => e.s === season && e.d.includes(d));
        const bdays = SV.npcs.filter((n) => n.s === season && n.d === d);
        const cart = d % 7 === 5 || d % 7 === 0;
        cells += `<div class="cal-day${evs.some((e) => e.t === 'f') ? ' fest' : ''}">
          <span class="n"><span>${d}</span>${cart ? ic('cart') : ''}</span>
          ${evs.map((e) => `<span class="ev ${e.t}" title="${esc(e.h)}">${esc(e.n)}</span>`).join('')}
          ${bdays.map((n) => `<span class="ev b">${ic('gift')} ${esc(n.n.split(' ')[0])}</span>`).join('')}
        </div>`;
      }
      const list = SV.events.filter((e) => e.s === season).map((e) =>
        `<tr><td class="num">${e.d.length > 1 ? e.d[0] + '-' + e.d[e.d.length - 1] : e.d[0]}</td><td>${esc(e.n)}</td><td>${esc(e.h)}</td></tr>`).join('');
      const bl = SV.npcs.filter((n) => n.s === season).sort((a, b) => a.d - b.d).map((n) =>
        `<tr><td class="num">${n.d}</td><td>${esc(n.n)}</td><td>${esc(n.facil)}</td></tr>`).join('');
      el.innerHTML = `
        <div class="controls">${SV.seasons.map((s, i) =>
          `<button class="btn" data-s="${i}" aria-pressed="${i === season}">${ic(SV.seasonIcons[i])} ${s}</button>`).join('')}</div>
        <div class="legend"><span>${ic('cart')} Carro Ambulante (viernes y domingo)</span><span>${ic('gift')} Cumpleaños</span><span style="color:var(--red)">Festival</span><span style="color:var(--green-dark)">Ventana de recolección</span></div>
        <div class="cal">${cells}</div>
        <h3>Festivales y ventanas de ${SV.seasons[season].toLowerCase()}</h3>
        <div class="table-wrap"><table><thead><tr><th class="num">Día</th><th>Qué</th><th>Hora y lugar</th></tr></thead><tbody>${list}</tbody></table></div>
        <h3>Cumpleaños de ${SV.seasons[season].toLowerCase()}</h3>
        <div class="table-wrap"><table><thead><tr><th class="num">Día</th><th>Quién</th><th>Regalo cómodo</th></tr></thead><tbody>${bl}</tbody></table></div>`;
      el.querySelectorAll('[data-s]').forEach((b) => b.addEventListener('click', () => { season = +b.dataset.s; draw(); }));
      renderIcons(el);
    };
    draw();
  },

  npcs(el) {
    let filter = 'todos';
    let q = '';
    const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
    el.innerHTML = `
      <div class="controls">
        <input type="search" placeholder="Buscar aldeano o regalo…" aria-label="Buscar aldeano o regalo">
        <button class="btn" data-f="todos">Todos</button>
        <button class="btn" data-f="pareja">Casables</button>
        ${SV.seasons.map((s, i) => `<button class="btn" data-f="${i}">Cumple en ${s.toLowerCase()}</button>`).join('')}
      </div>
      <div class="cards" data-list></div>`;
    const list = el.querySelector('[data-list]');
    const draw = () => {
      el.querySelectorAll('[data-f]').forEach((b) => b.setAttribute('aria-pressed', b.dataset.f === filter));
      const rows = SV.npcs.filter((n) => {
        if (filter === 'pareja' && !n.pareja) return false;
        if (/^\d$/.test(filter) && n.s !== +filter) return false;
        return !q || norm(n.n + ' ' + n.ama.join(' ')).includes(norm(q));
      }).sort((a, b) => a.n.localeCompare(b.n, 'es'));
      list.innerHTML = rows.map((n) => `
        <article class="card npc">
          <h3><span>${esc(n.n)}${n.pareja ? ' ' + ic('heart') : ''}</span>${seasonTag(n.s).replace('</span>', ' ' + n.d + '</span>')}</h3>
          <p class="card-meta">${esc(n.casa)}</p>
          <p class="loves">${ic('gift')} ${n.ama.map(esc).join(', ')}</p>
          <p class="easy">Fácil: ${esc(n.facil)}</p>
        </article>`).join('') || '<p>Nadie coincide con la búsqueda.</p>';
      renderIcons(list);
    };
    el.querySelector('input').addEventListener('input', (e) => { q = e.target.value.trim(); draw(); });
    el.querySelectorAll('[data-f]').forEach((b) => b.addEventListener('click', () => { filter = b.dataset.f; draw(); }));
    draw();
  },

  bundles(el) {
    const key = (r, l, i) => `lote:${r}:${l}:${i}`;
    const count = (r, l) => SV.rooms[r].lotes[l].items.filter((_, i) => store.get(key(r, l, i))).length;
    const draw = () => {
      let total = 0;
      let done = 0;
      const html = SV.rooms.map((room, r) => {
        let roomDone = 0;
        const lotes = room.lotes.map((lote, l) => {
          const have = Math.min(count(r, l), lote.need);
          const ok = have >= lote.need;
          total++;
          if (ok) { done++; roomDone++; }
          return `<div class="card bundle${ok ? ' done' : ''}">
            <h4><span>${esc(lote.n)}</span><small>${have}/${lote.need}${lote.items.length > lote.need ? ' de ' + lote.items.length : ''}</small></h4>
            <ul>${lote.items.map((it, i) => `<li><label class="chk"><input type="checkbox" data-k="${key(r, l, i)}"><span>${esc(it[0])}${it[1] ? `<small>${esc(it[1])}</small>` : ''}</span></label></li>`).join('')}</ul>
            <p class="reward">${ic('gift')} ${esc(lote.premio)}</p>
          </div>`;
        }).join('');
        return `<section class="room"><h2>${esc(room.n)} <span class="tag ${roomDone === room.lotes.length ? 'green' : 'plain'}">${roomDone}/${room.lotes.length}</span></h2>
          <p>Al completarla: <strong>${esc(room.premio)}</strong>.</p><div class="bundles">${lotes}</div></section>`;
      }).join('');
      el.innerHTML = `<div class="bar"><span style="width:${(done / total) * 100}%"></span><em>${done} de ${total} lotes</em></div>${html}`;
      bindChecks(el);
      renderIcons(el);
    };
    el.addEventListener('sv:check', draw);
    draw();
  },

  crops(el) {
    let season = 0;
    const draw = () => {
      const rows = SV.crops.filter((c) => c.s.includes(season)).map((c) => `<tr>
        <td>${esc(c.n)}</td>
        <td class="num">${c.sem ? gold(c.sem) : '—'}</td>
        <td>${esc(c.donde)}</td>
        <td class="num">${c.dias}</td>
        <td class="num">${c.reb ? 'cada ' + c.reb : '—'}</td>
        <td class="num">${gold(c.venta)}</td>
        <td>${esc(c.nota)}</td></tr>`).join('');
      el.innerHTML = `
        <div class="controls">${SV.seasons.map((s, i) =>
          `<button class="btn" data-s="${i}" aria-pressed="${i === season}">${ic(SV.seasonIcons[i])} ${s}</button>`).join('')}</div>
        <div class="table-wrap"><table><thead><tr><th>Cultivo</th><th class="num">Semilla</th><th>Dónde</th><th class="num">Días</th><th class="num">Rebrota</th><th class="num">Venta</th><th>Notas</th></tr></thead><tbody>${rows}</tbody></table></div>`;
      el.querySelectorAll('[data-s]').forEach((b) => b.addEventListener('click', () => { season = +b.dataset.s; draw(); }));
      renderIcons(el);
    };
    draw();
  },

  legendary(el) {
    el.innerHTML = `<div class="table-wrap"><table><thead><tr><th>Pez</th><th>Cuándo</th><th>Dónde</th><th class="num">Nivel de pesca</th></tr></thead><tbody>${
      SV.legendary.map((f) => `<tr><td>${esc(f[0])}</td><td>${esc(f[1])}</td><td>${esc(f[2])}</td><td class="num">${esc(f[3])}</td></tr>`).join('')
    }</tbody></table></div>`;
  }
};

toggle.addEventListener('click', () => {
  const open = sidebar.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});
window.addEventListener('hashchange', route);
buildNav();
route();
