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
const scrim = document.getElementById('scrim');
const searchPanel = document.getElementById('search');
const searchToggle = document.getElementById('search-toggle');
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');
const cache = {};

// Duración de los fundidos; tiene que coincidir con --fade en el CSS
const FADE = matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 200;
const wait = (ms) => new Promise((done) => setTimeout(done, ms));

// Destino pendiente al llegar desde el buscador: { slug, season, sel, block }
let jump = null;

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const ic = (name) => `<i class="px" data-i="${name}"></i>`;
const seasonTag = (s) => `<span class="tag s${s}">${SV.seasons[s]}</span>`;
const gold = (n) => n.toLocaleString('es-ES').replace(/\./g, ' ') + ' o';
const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
const dayOf = (s, d) => `${d} de ${SV.seasons[s].toLowerCase()}`;

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

function load(slug) {
  if (!cache[slug]) {
    cache[slug] = fetch(`pages/${slug}.html`).then((res) => {
      if (!res.ok) throw new Error(res.status);
      return res.text();
    }).catch((e) => { delete cache[slug]; throw e; });
  }
  return cache[slug];
}

// Menús flotantes (secciones en móvil y buscador): solo uno abierto a la vez
const FLOATS = { menu: [sidebar, toggle], search: [searchPanel, searchToggle] };
function setFloat(name) {
  Object.keys(FLOATS).forEach((k) => {
    FLOATS[k][0].classList.toggle('open', k === name);
    FLOATS[k][1].setAttribute('aria-expanded', String(k === name));
  });
  scrim.classList.toggle('on', !!name);
}
const openFloat = () => Object.keys(FLOATS).find((k) => FLOATS[k][0].classList.contains('open'));

// Funde el contenedor, lo repinta y lo vuelve a mostrar. Si llegan más cambios
// durante el fundido se pinta solo el último.
function fadeSwap(el, render) {
  el._render = render;
  if (el._busy) return;
  el._busy = true;
  el.classList.add('fading');
  setTimeout(() => {
    el._busy = false;
    el._render();
    el.classList.remove('fading');
  }, FADE);
}

// Trozos de texto de una sección (fuera de los widgets); el buscador los numera igual
const blocks = (root) => [...root.querySelectorAll('h2, h3, p, li, tr')]
  .filter((el) => !el.closest('[data-widget], thead') && !el.querySelector('p, li, tr'));

let routeId = 0;
async function route() {
  const id = ++routeId;
  const slug = currentSlug();
  document.querySelectorAll('.nav-list a').forEach((a) => a.classList.toggle('active', a.dataset.slug === slug));
  setFloat(null);
  main.classList.add('leaving');
  let html;
  try {
    [html] = await Promise.all([load(slug), wait(FADE)]);
  } catch (e) {
    html = '<h1>No se ha podido cargar la sección</h1><p>Prueba a recargar la página.</p>';
  }
  if (id !== routeId) return;
  const to = jump && jump.slug === slug ? jump : null;
  main.innerHTML = html;
  main.querySelectorAll('[data-widget]').forEach((el) => WIDGETS[el.dataset.widget](el));
  jump = null;
  bindChecks(main);
  renderIcons(document);
  const page = PAGES.find((p) => p.slug === slug);
  document.title = slug === 'inicio' ? 'Nunca Stardew · Guía de Stardew Valley' : `${page.t} · Nunca Stardew`;
  const target = to && (to.block != null ? blocks(main)[to.block] : to.sel && main.querySelector(to.sel));
  if (target) {
    target.scrollIntoView({ block: 'center', behavior: 'instant' });
    target.classList.add('hit');
  } else {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
  main.classList.remove('leaving');
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

// Widget con pestañas de estación: los botones se quedan y solo se funde el cuerpo
function seasonWidget(el, extra, body) {
  let season = jump && jump.season != null ? jump.season : 0;
  el.innerHTML = `
    <div class="controls">${SV.seasons.map((s, i) =>
      `<button class="btn" data-s="${i}">${ic(SV.seasonIcons[i])} ${s}</button>`).join('')}</div>
    ${extra}<div class="swap" data-body></div>`;
  const box = el.querySelector('[data-body]');
  const btns = el.querySelectorAll('[data-s]');
  const press = () => btns.forEach((b) => b.setAttribute('aria-pressed', +b.dataset.s === season));
  const draw = () => { box.innerHTML = body(season); renderIcons(box); };
  btns.forEach((b) => b.addEventListener('click', () => { season = +b.dataset.s; press(); fadeSwap(box, draw); }));
  press();
  draw();
}

const WIDGETS = {
  calendar(el) {
    const days = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
    const legend = `<div class="legend"><span>${ic('cart')} Carro Ambulante (viernes y domingo)</span><span>${ic('gift')} Cumpleaños</span><span style="color:var(--red)">Festival</span><span style="color:var(--green-dark)">Ventana de recolección</span></div>`;
    seasonWidget(el, legend, (season) => {
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
      return `
        <div class="cal">${cells}</div>
        <h3>Festivales y ventanas de ${SV.seasons[season].toLowerCase()}</h3>
        <div class="table-wrap"><table><thead><tr><th class="num">Día</th><th>Qué</th><th>Hora y lugar</th></tr></thead><tbody>${list}</tbody></table></div>
        <h3>Cumpleaños de ${SV.seasons[season].toLowerCase()}</h3>
        <div class="table-wrap"><table><thead><tr><th class="num">Día</th><th>Quién</th><th>Regalo cómodo</th></tr></thead><tbody>${bl}</tbody></table></div>`;
    });
  },

  npcs(el) {
    let filter = 'todos';
    let q = '';
    el.innerHTML = `
      <div class="controls">
        <input type="search" placeholder="Buscar aldeano o regalo…" aria-label="Buscar aldeano o regalo">
        <button class="btn" data-f="todos">Todos</button>
        <button class="btn" data-f="pareja">Casables</button>
        ${SV.seasons.map((s, i) => `<button class="btn" data-f="${i}">Cumple en ${s.toLowerCase()}</button>`).join('')}
      </div>
      <div class="cards swap" data-list></div>`;
    const list = el.querySelector('[data-list]');
    const press = () => el.querySelectorAll('[data-f]').forEach((b) => b.setAttribute('aria-pressed', b.dataset.f === filter));
    const draw = () => {
      const rows = SV.npcs.filter((n) => {
        if (filter === 'pareja' && !n.pareja) return false;
        if (/^\d$/.test(filter) && n.s !== +filter) return false;
        return !q || norm(n.n + ' ' + n.ama.join(' ')).includes(norm(q));
      }).sort((a, b) => a.n.localeCompare(b.n, 'es'));
      list.innerHTML = rows.map((n) => `
        <article class="card npc" data-id="npc-${SV.npcs.indexOf(n)}">
          <h3><span>${esc(n.n)}${n.pareja ? ' ' + ic('heart') : ''}</span>${seasonTag(n.s).replace('</span>', ' ' + n.d + '</span>')}</h3>
          <p class="card-meta">${esc(n.casa)}</p>
          <p class="loves">${ic('gift')} ${n.ama.map(esc).join(', ')}</p>
          <p class="easy">Fácil: ${esc(n.facil)}</p>
        </article>`).join('') || '<p>Nadie coincide con la búsqueda.</p>';
      renderIcons(list);
    };
    el.querySelector('input').addEventListener('input', (e) => { q = e.target.value.trim(); fadeSwap(list, draw); });
    el.querySelectorAll('[data-f]').forEach((b) => b.addEventListener('click', () => { filter = b.dataset.f; press(); fadeSwap(list, draw); }));
    press();
    draw();
  },

  bundles(el) {
    const key = (r, l, i) => `lote:${r}:${l}:${i}`;
    const count = (r, l) => SV.rooms[r].lotes[l].items.filter((_, i) => store.get(key(r, l, i))).length;
    el.innerHTML = `<div class="bar"><span></span><em></em></div>${SV.rooms.map((room, r) => `
      <section class="room" data-id="room-${r}"><h2>${esc(room.n)} <span class="tag" data-room="${r}"></span></h2>
        <p>Al completarla: <strong>${esc(room.premio)}</strong>.</p>
        <div class="bundles">${room.lotes.map((lote, l) => `<div class="card bundle" data-id="lote-${r}-${l}">
          <h4><span>${esc(lote.n)}</span><small data-count></small></h4>
          <ul>${lote.items.map((it, i) => `<li><label class="chk"><input type="checkbox" data-k="${key(r, l, i)}"><span>${esc(it[0])}${it[1] ? `<small>${esc(it[1])}</small>` : ''}</span></label></li>`).join('')}</ul>
          <p class="reward">${ic('gift')} ${esc(lote.premio)}</p>
        </div>`).join('')}</div></section>`).join('')}`;
    // Se actualiza sin repintar para que la barra y las tarjetas cambien con transición
    const update = () => {
      let total = 0;
      let done = 0;
      SV.rooms.forEach((room, r) => {
        let roomDone = 0;
        room.lotes.forEach((lote, l) => {
          const have = Math.min(count(r, l), lote.need);
          const ok = have >= lote.need;
          total++;
          if (ok) { done++; roomDone++; }
          const card = el.querySelector(`[data-id="lote-${r}-${l}"]`);
          card.classList.toggle('done', ok);
          card.querySelector('[data-count]').textContent = `${have}/${lote.need}${lote.items.length > lote.need ? ' de ' + lote.items.length : ''}`;
        });
        const tag = el.querySelector(`[data-room="${r}"]`);
        tag.textContent = `${roomDone}/${room.lotes.length}`;
        tag.className = `tag ${roomDone === room.lotes.length ? 'green' : 'plain'}`;
      });
      el.querySelector('.bar > span').style.width = `${(done / total) * 100}%`;
      el.querySelector('.bar > em').textContent = `${done} de ${total} lotes`;
    };
    el.addEventListener('sv:check', update);
    update();
  },

  crops(el) {
    seasonWidget(el, '', (season) => {
      const rows = SV.crops.map((c, i) => (c.s.includes(season) ? `<tr data-id="crop-${i}">
        <td>${esc(c.n)}</td>
        <td class="num">${c.sem ? gold(c.sem) : '—'}</td>
        <td>${esc(c.donde)}</td>
        <td class="num">${c.dias}</td>
        <td class="num">${c.reb ? 'cada ' + c.reb : '—'}</td>
        <td class="num">${gold(c.venta)}</td>
        <td>${esc(c.nota)}</td></tr>` : '')).join('');
      return `<div class="table-wrap"><table><thead><tr><th>Cultivo</th><th class="num">Semilla</th><th>Dónde</th><th class="num">Días</th><th class="num">Rebrota</th><th class="num">Venta</th><th>Notas</th></tr></thead><tbody>${rows}</tbody></table></div>`;
    });
  },

  legendary(el) {
    el.innerHTML = `<div class="table-wrap"><table><thead><tr><th>Pez</th><th>Cuándo</th><th>Dónde</th><th class="num">Nivel de pesca</th></tr></thead><tbody>${
      SV.legendary.map((f) => `<tr><td>${esc(f[0])}</td><td>${esc(f[1])}</td><td>${esc(f[2])}</td><td class="num">${esc(f[3])}</td></tr>`).join('')
    }</tbody></table></div>`;
  }
};

// Buscador: mira en los datos (cultivos, aldeanos, lotes, calendario, peces) y en el texto de las secciones
const STOP = new Set(['a', 'al', 'de', 'del', 'el', 'en', 'la', 'las', 'lo', 'los', 'para', 'por', 'que', 'un', 'una', 'y']);
// "fresas" y "fresa", "peces" y "pez" tienen que encontrar lo mismo
const stem = (w) => {
  if (w.length > 4 && w.endsWith('ces')) return w.slice(0, -3) + 'z';
  if (w.length > 4 && w.endsWith('es')) return w.slice(0, -2);
  if (w.length > 3 && w.endsWith('s')) return w.slice(0, -1);
  return w;
};

// Una expresión por palabra buscada: casa con las palabras que empiezan así
function terms(q) {
  const all = norm(q).split(/[^a-z0-9]+/).filter(Boolean);
  const words = all.filter((w) => !STOP.has(w));
  return (words.length ? words : all).map((w) => new RegExp('(^|[^a-z0-9])' + stem(w) + '[a-z0-9]*', 'g'));
}
const hasN = (res, n) => res.every((re) => { re.lastIndex = 0; return re.test(n); });
const has = (res, s) => hasN(res, norm(s));

function mark(text, res) {
  const n = norm(text);
  const ranges = [];
  res.forEach((re) => {
    re.lastIndex = 0;
    let m;
    while ((m = re.exec(n))) ranges.push([m.index + m[1].length, m.index + m[0].length]);
  });
  ranges.sort((a, b) => a[0] - b[0]);
  let out = '';
  let pos = 0;
  ranges.forEach(([a, b]) => {
    if (a < pos) return;
    out += esc(text.slice(pos, a)) + '<mark>' + esc(text.slice(a, b)) + '</mark>';
    pos = b;
  });
  return out + esc(text.slice(pos));
}

// Recorta un texto largo alrededor de la primera coincidencia
function snippet(text, res) {
  const MAX = 190;
  if (text.length <= MAX) return mark(text, res);
  const n = norm(text);
  const first = Math.min(...res.map((re) => { re.lastIndex = 0; const m = re.exec(n); return m ? m.index : Infinity; }));
  let a = Math.max(0, (Number.isFinite(first) ? first : 0) - 60);
  if (a > 0) a = text.indexOf(' ', a) + 1;
  let b = Math.min(text.length, a + MAX);
  if (b < text.length) b = text.lastIndexOf(' ', b);
  return (a > 0 ? '… ' : '') + mark(text.slice(a, b), res) + (b < text.length ? ' …' : '');
}

// Índice del texto de todas las secciones; se construye la primera vez que se abre el buscador
let entries = [];
let indexing = null;
function buildIndex() {
  if (!indexing) {
    indexing = Promise.all(PAGES.filter((p) => p.slug).map(async (p) => {
      try {
        const doc = new DOMParser().parseFromString(await load(p.slug), 'text/html');
        let head = '';
        return blocks(doc.body).map((el, block) => {
          const raw = el.tagName === 'TR' ? [...el.cells].map((c) => c.textContent.trim()).join(' · ') : el.textContent;
          const text = raw.replace(/\s+/g, ' ').trim().normalize('NFC');
          const isHead = /^H[23]$/.test(el.tagName);
          if (isHead) head = text;
          return { slug: p.slug, page: p.t, block, head: isHead ? '' : head, text, n: norm(text), hn: norm(isHead ? '' : head) };
        });
      } catch (e) {
        return [];
      }
    })).then((lists) => { entries = lists.flat(); });
  }
  return indexing;
}

const SUGGEST = ['Fresa', 'Abigail', 'Aspersor', 'Lluvia', 'Diamante', 'Invernadero'];

function searchHtml(q) {
  const res = terms(q);
  if (q.length < 2 || !res.length) {
    return `<p class="search-hint">Busca un objeto, un aldeano, un lugar… y verás todo lo que la guía dice sobre ello.</p>
      <div class="controls">${SUGGEST.map((s) => `<button class="btn" data-q="${s}">${s}</button>`).join('')}</div>`;
  }
  const row = (j, html) => `<a class="result" href="#/${j.slug}" data-jump="${esc(JSON.stringify(j))}">${html}</a>`;
  const m = (s) => mark(s, res);
  const groups = [];
  const add = (title, icon, rows) => { if (rows.length) groups.push({ title, icon, rows }); };

  add('Cultivos', 'sprout', SV.crops
    .map((c, i) => ({ c, i, top: has(res, c.n) }))
    .filter((x) => x.top || has(res, `${x.c.n} ${x.c.donde} ${x.c.nota}`))
    .sort((a, b) => b.top - a.top)
    .map(({ c, i }) => row({ slug: 'cultivos', season: c.s[0], sel: `[data-id="crop-${i}"]` }, `
      <h4>${m(c.n)} ${c.s.map(seasonTag).join(' ')}</h4>
      <dl class="stats">
        <div><dt>Semilla</dt><dd>${c.sem ? gold(c.sem) : 'No se vende'} · ${m(c.donde)}</dd></div>
        <div><dt>Crece en</dt><dd>${c.dias} días${c.reb ? `, y rebrota cada ${c.reb === 1 ? 'día' : c.reb + ' días'}` : ''}</dd></div>
        <div><dt>Venta</dt><dd>${gold(c.venta)}</dd></div>
        <div><dt>Riego</dt><dd>A diario, salvo lluvia o aspersor</dd></div>
      </dl>${c.nota ? `<p>${m(c.nota)}</p>` : ''}`)));

  const people = [];
  const gifts = [];
  SV.npcs.forEach((n, i) => {
    const j = { slug: 'aldeanos', sel: `[data-id="npc-${i}"]` };
    const bday = `Cumple el ${dayOf(n.s, n.d)}`;
    const loved = n.ama.filter((g) => has(res, g));
    if (has(res, n.n)) {
      people.push(row(j, `<h4>${m(n.n)}${n.pareja ? ' ' + ic('heart') : ''}</h4>
        <p class="card-meta">${bday} · ${esc(n.casa)}</p>
        <p>${ic('gift')} Le encanta: ${n.ama.map(esc).join(', ')}</p>
        <p class="easy">Fácil: ${esc(n.facil)}</p>`));
    } else if (loved.length) {
      gifts.push(row(j, `<h4>${esc(n.n)}</h4><p>${ic('gift')} Le encanta: ${loved.map(m).join(', ')}</p><p class="card-meta">${bday}</p>`));
    } else if (has(res, n.facil)) {
      gifts.push(row(j, `<h4>${esc(n.n)}</h4><p>${m(n.facil)}</p><p class="card-meta">${bday}</p>`));
    }
  });
  add('Aldeanos', 'heart', people);
  add('A quién regalárselo', 'gift', gifts);

  const lotes = [];
  SV.rooms.forEach((room, r) => {
    if (has(res, `${room.n} ${room.premio}`)) {
      lotes.push(row({ slug: 'lotes', sel: `[data-id="room-${r}"]` }, `<h4>${m(room.n)}</h4><p>Al completarla: ${m(room.premio)}</p>`));
    }
    room.lotes.forEach((lote, l) => {
      const items = lote.items.filter((it) => has(res, `${it[0]} ${it[1]}`));
      if (!items.length && !has(res, `${lote.n} ${lote.premio}`)) return;
      lotes.push(row({ slug: 'lotes', sel: `[data-id="lote-${r}-${l}"]` }, `
        <h4>Lote «${m(lote.n)}» <span class="tag plain">${esc(room.n)}</span></h4>
        ${items.length ? `<ul>${items.map((it) => `<li>${m(it[0])}${it[1] ? ` <small>${m(it[1])}</small>` : ''}</li>`).join('')}</ul>` : ''}
        <p class="card-meta">Premio del lote: ${m(lote.premio)}</p>`));
    });
  });
  add('Centro Cívico', 'chest', lotes);

  add('Calendario', 'cal', SV.events.filter((e) => has(res, `${e.n} ${e.h}`)).map((e) =>
    row({ slug: 'calendario', season: e.s }, `<h4>${m(e.n)} ${seasonTag(e.s)}</h4>
      <p>${e.d.length > 1 ? `Días ${e.d[0]}-${e.d[e.d.length - 1]}` : `Día ${e.d[0]}`} · ${m(e.h)}</p>`)));

  add('Peces legendarios', 'fish', SV.legendary.filter((f) => has(res, f.join(' '))).map((f) =>
    row({ slug: 'pesca', sel: '[data-widget="legendary"]' }, `<h4>${m(f[0])}</h4><p>${m(f[1])} · ${m(f[2])} · Nivel de pesca ${esc(f[3])}</p>`)));

  // Texto de las secciones: primero donde aparece todo, luego donde lo completa el título del apartado
  const own = entries.filter((e) => hasN(res, e.n));
  const ctx = res.length > 1
    ? entries.filter((e) => e.hn && !hasN(res, e.n) && res.some((re) => hasN([re], e.n)) && hasN(res, `${e.hn} ${e.n}`))
    : [];
  const texts = own.concat(ctx);
  const MAX = 30;
  add('En la guía', 'book', texts.slice(0, MAX).map((e) =>
    row({ slug: e.slug, block: e.block }, `<h4>${esc(e.page)}${e.head ? ` <span class="crumb">› ${m(e.head)}</span>` : ''}</h4><p>${snippet(e.text, res)}</p>`)));

  if (!groups.length) return `<p class="search-hint">Nada sobre «${esc(q)}». Prueba con otra palabra.</p>`;
  return groups.map((g) => `<section class="result-group"><h3>${ic(g.icon)} ${g.title} <small>${g.rows.length}</small></h3>${g.rows.join('')}</section>`).join('')
    + (texts.length > MAX ? `<p class="search-hint">Y ${texts.length - MAX} menciones más: afina la búsqueda.</p>` : '');
}

function runSearch() {
  buildIndex().then(() => fadeSwap(searchResults, () => {
    searchResults.innerHTML = searchHtml(searchInput.value.trim());
    searchResults.scrollTop = 0;
    renderIcons(searchResults);
  }));
}

function openSearch() {
  setFloat('search');
  searchInput.focus();
  searchInput.select();
  if (!searchResults.firstChild) runSearch();
}

searchInput.addEventListener('input', runSearch);
searchResults.addEventListener('click', (e) => {
  const chip = e.target.closest('[data-q]');
  if (chip) {
    searchInput.value = chip.dataset.q;
    searchInput.focus();
    runSearch();
    return;
  }
  const link = e.target.closest('[data-jump]');
  if (!link) return;
  e.preventDefault();
  jump = JSON.parse(link.dataset.jump);
  // Si ya estamos en esa sección no hay hashchange: se repinta a mano
  if (currentSlug() === jump.slug) route();
  else location.hash = '#/' + jump.slug;
});

searchToggle.addEventListener('click', () => (openFloat() === 'search' ? setFloat(null) : openSearch()));
toggle.addEventListener('click', () => setFloat(openFloat() === 'menu' ? null : 'menu'));
scrim.addEventListener('click', () => setFloat(null));
document.getElementById('nav-list').addEventListener('click', (e) => { if (e.target.closest('a')) setFloat(null); });
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && openFloat()) {
    FLOATS[openFloat()][1].focus();
    setFloat(null);
  } else if ((e.key === 'k' && (e.ctrlKey || e.metaKey)) || (e.key === '/' && !/^(INPUT|TEXTAREA)$/.test(e.target.tagName))) {
    e.preventDefault();
    openSearch();
  }
});

// Alto visible real (con el teclado del móvil abierto) para que los menús flotantes no queden tapados
if (window.visualViewport) {
  const fit = () => document.documentElement.style.setProperty('--vh', visualViewport.height + 'px');
  visualViewport.addEventListener('resize', fit);
  fit();
}

window.addEventListener('hashchange', route);
buildNav();
route();
