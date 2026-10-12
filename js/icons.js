// Iconos pixel propios: cada letra es un color de PALETTE, "." es transparente.
const PALETTE = {
  k: '#2b1608', w: '#ffffff', y: '#f0a81c', Y: '#ffd84a', r: '#a3231d', R: '#e8483c',
  g: '#2a6321', G: '#5fbf3f', b: '#6b3a14', B: '#b5651d', s: '#7d8a96', S: '#d5dde4',
  u: '#2456a8', U: '#5aa6f2', p: '#7a2f9c', P: '#d07be6', n: '#c9541a', N: '#f79a3c',
  c: '#f6dfae'
};

const ICONS = {
  search: `
..kkkk....
.kUUUUk...
kUwUUUUk..
kUwUUUUk..
kUUUUUUk..
kUUUUUUk..
.kUUUUk...
..kkkkbk..
......kBbk
.......kBk
........kk`,
  star: `
.....k.....
....kYk....
....kYk....
kkkkYYYkkkk
kyYYYYYYYyk
.kyYYYYYyk.
..kYYYYYk..
..kYYyYYk..
.kYykkkyYk.
.kkk...kkk.`,
  heart: `
.kk...kk.
kRRk.kRRk
kRwRkRRRk
kRRRRRRRk
.kRRRRRk.
..kRRRk..
...kRk...
....k....`,
  coin: `
..kkkk..
.kYYYYk.
kYYyyYYk
kYyYYYyk
kYyYYYyk
kYYyyYYk
.kYYYYk.
..kkkk..`,
  sprout: `
.gg...gg.
gGGg.gGGg
gGGGgGGGg
.gGGGGGg.
..ggGgg..
....g....
.bbbgbbb.
bBBBBBBBb
.bbbbbbb.`,
  fish: `
...kkkk....
..kUUUUk..k
.kUwUUUUkku
kUUkUUUUUUu
.kUUUUUUkku
..kUUUUk..k
...kkkk....`,
  pick: `
.ssss....
sSSSSss..
.ss..BSs.
....B.sSs
...B...ss
..B.....s
.B.......
B........`,
  sword: `
.......kk
......kSk
.....kSk.
....kSk..
k..kSk...
.kkSk....
..Bk.....
.B.k.....
B........`,
  clock: `
..kkkk..
.kwwwwk.
kwwkwwwk
kwwkwwwk
kwwkkkwk
kwwwwwwk
.kwwwwk.
..kkkk..`,
  cal: `
.k.kk.k.
RRRRRRRR
RRRRRRRR
cccccccc
ckckckcc
cccccccc
ckckcccc
cccccccc`,
  gift: `
.RR...RR.
R..R.R..R
.RRRRRRR.
pPPPRPPPp
pppprpppp
.PPPRPPP.
.PPPRPPP.
.PPPRPPP.
.ppprppp.`,
  house: `
....r....
...rRr...
..rRRRr..
.rRRRRRr.
rrrrrrrrr
.ccccccc.
.cbbcUUc.
.cbbcccc.`,
  sun: `
....y....
.y..y..y.
..yYYYy..
..YYYYY..
yyYYYYYyy
..YYYYY..
..yYYYy..
.y..y..y.
....y....`,
  snow: `
....U....
.U..U..U.
..U.U.U..
...UUU...
UUUUwUUUU
...UUU...
..U.U.U..
.U..U..U.
....U....`,
  flower: `
...PPP...
..PPPPP..
.PPPyPPP.
.PPyYyPP.
.PPPyPPP.
..PPPPP..
...PgP...
..gGg....
...g.....`,
  leaf: `
......nn.
....nnNn.
...nNNNn.
..nNNNNn.
.nNNnNn..
.nNnNNn..
.nnNNn...
.bnnn....
b........`,
  book: `
.kkkkkkk.
kuUUUUUUk
kuUYYYYUk
kuUUUUUUk
kuUYYUUUk
kuUUUUUUk
kuwwwwwwk
.kkkkkkk.`,
  palm: `
.gg...gg.
gGGg.gGGg
.gGGgGGg.
gGgGBGgGg
g.g.B.g.g
....B....
...B.....
...B.....
.YYYYYYY.`,
  chest: `
.kkkkkkk.
kBBBBBBBk
kBBBBBBBk
kkkkYkkkk
kBBBYBBBk
kBBBBBBBk
kBBBBBBBk
.kkkkkkk.`,
  egg: `
..kkk..
.kwwck.
kwwccck
kwcccck
kcccccy
kccccyk
.kcyyk.
..kkk..`,
  cart: `
.RRRRRRR.
RwRwRwRwR
.k.....k.
.BBBBBBB.
.BBBBBBB.
.bbbbbbb.
.kk...kk.
.kk...kk.`
};

function iconSvg(name) {
  const rows = (ICONS[name] || ICONS.star).trim().split('\n');
  const w = Math.max(...rows.map((r) => r.length));
  let rects = '';
  rows.forEach((row, y) => {
    let x = 0;
    while (x < row.length) {
      const ch = row[x];
      let run = 1;
      while (row[x + run] === ch) run++;
      const fill = PALETTE[ch] || PALETTE[ch.toLowerCase()];
      if (fill) rects += `<rect x="${x}" y="${y}" width="${run}" height="1" fill="${fill}"/>`;
      x += run;
    }
  });
  return `<svg viewBox="0 0 ${w} ${rows.length}" shape-rendering="crispEdges" aria-hidden="true">${rects}</svg>`;
}

function renderIcons(root) {
  root.querySelectorAll('.px[data-i]').forEach((el) => {
    if (!el.firstChild) el.innerHTML = iconSvg(el.dataset.i);
  });
}
