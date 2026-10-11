# Nunca Stardew — Guía de Stardew Valley

Guía en español de **Stardew Valley 1.6** para empezar una partida y para seguirla cuando ya
está avanzada: primeros pasos, primer año, juego avanzado, todo lo que depende del reloj o de la
estación, calendario, aldeanos y regalos, lotes del Centro Cívico, cultivos, animales, pesca,
minas, habilidades y dinero.

Publicada en <https://nunca-stardew.wanderingcode.dev>.

Web estática sin dependencias ni build: HTML + CSS + JS.

## Arrancar en local

```bash
python -m http.server 8090 --bind 0.0.0.0
```

Y abrir `http://<ip-lan>:8090` (con la IP LAN funciona también desde el móvil). Hace falta un
servidor: las secciones se cargan con `fetch`, así que abrir `index.html` como archivo no sirve.

## Estructura

```
index.html           # marco: cabecera, menú lateral y pie
css/style.css
js/app.js            # enrutado por hash (#/<seccion>), widgets y casillas guardadas
js/data.js           # aldeanos, festivales, lotes, cultivos y peces legendarios
js/icons.js          # iconos pixel propios, dibujados como rejillas de texto
pages/<seccion>.html # el texto de cada sección
tools/make_icons.py  # genera img/ a partir de la estrella de icons.js
```

Para añadir una sección: crear `pages/<slug>.html` y añadirla a `PAGES` en `js/app.js`.

Las casillas (tareas, lotes entregados) se guardan en `localStorage`: solo en ese navegador.

## Despliegue

GitHub Pages sirviendo la raíz de la rama principal; no hay paso de build. El dominio sale del
archivo `CNAME` y de un registro CNAME `nunca-stardew` → `wandering-code.github.io` en Cloudflare
(solo DNS, sin proxy).

## Datos y créditos

Datos contrastados con la [wiki de Stardew Valley](https://es.stardewvalleywiki.com)
(CC BY-NC-SA). Proyecto de fans sin relación con ConcernedApe. No se usa arte del juego: los
iconos y el fondo son dibujos propios.
