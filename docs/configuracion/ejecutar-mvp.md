# Cómo se publica el MVP

El MVP es una página estática: la carpeta `src/` tiene todo lo que necesita (`index.html`, `js/` y `styles/`). No usa base de datos ni dependencias.

## Dónde está

Publicado en el NAS del equipo con Docker, en <https://carpool.timecore.com.ar>. Se abre desde el navegador, en la computadora o en el celular.

## Cómo se actualiza

Se copia el contenido de `src/` a la carpeta que sirve el contenedor en el NAS.

No funciona abriendo `index.html` con doble clic: el navegador bloquea el código si la página no se abre desde una dirección web.
