// Plantillas con escape automático: todo valor interpolado se trata como texto.
class Seguro {
  constructor(texto) {
    this.texto = texto;
  }
  toString() {
    return this.texto;
  }
}

const escapar = (valor) =>
  String(valor).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

const convertir = (valor) => {
  if (valor === null || valor === undefined || valor === false) return '';
  if (valor instanceof Seguro) return valor.texto;
  if (Array.isArray(valor)) return valor.map(convertir).join('');
  return escapar(valor);
};

export const html = (partes, ...valores) =>
  new Seguro(partes.reduce((salida, parte, i) => salida + parte + (i < valores.length ? convertir(valores[i]) : ''), ''));

export const ICONOS = {
  atras: '<path d="M15 5l-7 7 7 7"/>',
  cerrar: '<path d="M6 6l12 12M18 6L6 18"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  escudo: '<path d="M12 3l7.5 3v5.5c0 4.6-3.1 8-7.5 9.5-4.4-1.5-7.5-4.9-7.5-9.5V6z"/><path d="M8.8 12l2.2 2.2 4.2-4.4"/>',
  auto: '<path d="M4 16v-3.5L6 7.5A2 2 0 0 1 7.9 6h8.2A2 2 0 0 1 18 7.5l2 5V16"/><path d="M3.5 12.5h17"/><path d="M4 16h16v2.5h-3V17H7v1.5H4z"/>',
  ticket: '<path d="M4 7.5h16v3a2 2 0 0 0 0 3v3H4v-3a2 2 0 0 0 0-3z"/><path d="M14 8v2M14 12v.5M14 15v1.5"/>',
  persona: '<circle cx="12" cy="8" r="3.8"/><path d="M4.5 20.5c1-4 4-5.8 7.5-5.8s6.5 1.8 7.5 5.8"/>',
  invertir: '<path d="M8 4v15M8 19l-3.5-3.5M8 19l3.5-3.5"/><path d="M16 20V5M16 5l-3.5 3.5M16 5l3.5 3.5"/>',
  reloj: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
  pin: '<path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
  archivo: '<path d="M7 3h7l4.5 4.5V21H7z"/><path d="M14 3v5h4.5"/>',
  luna: '<path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5z"/>',
  estrella: '<path fill="currentColor" stroke="none" d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.9L12 16.9l-5.2 2.8 1-5.9-4.3-4.1 5.9-.8z"/>',
  flecha: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  libro: '<path d="M5 5a2 2 0 0 1 2-2h12v14H7a2 2 0 0 0-2 2z"/><path d="M5 19a2 2 0 0 0 2 2h12v-4"/>',
  mas: '<path d="M12 5v14M5 12h14"/>',
};

export const icono = (nombre, clase = '') =>
  new Seguro(`<svg class="ico ${clase}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONOS[nombre]}</svg>`);

export function campo({ nombre, etiqueta, ayuda, control }) {
  return html`<div class="campo" data-campo="${nombre}">
    <label class="etiqueta" for="${nombre}">${etiqueta}</label>
    ${control}
    ${ayuda && html`<p class="ayuda" id="${nombre}-ayuda">${ayuda}</p>`}
    <p class="error" id="${nombre}-error" hidden></p>
  </div>`;
}

export function mostrarErrores(raiz, errores) {
  raiz.querySelectorAll('[data-campo]').forEach((contenedor) => {
    const mensaje = errores[contenedor.dataset.campo];
    const parrafo = contenedor.querySelector('.error');
    const control = contenedor.querySelector('input, select, textarea');
    if (parrafo) {
      parrafo.hidden = !mensaje;
      parrafo.textContent = mensaje ?? '';
    }
    if (control) {
      control.toggleAttribute('aria-invalid', Boolean(mensaje));
      if (mensaje) control.setAttribute('aria-describedby', `${contenedor.dataset.campo}-error`);
      else control.removeAttribute('aria-describedby');
    }
  });
  const nombre = Object.keys(errores)[0];
  if (nombre) raiz.querySelector(`[data-campo="${nombre}"] input, [data-campo="${nombre}"] select`)?.focus();
  return Object.keys(errores).length === 0;
}

export function confirmar({ titulo, texto, aceptar, rechazar = 'Volver', peligro = false }) {
  return new Promise((resolver) => {
    const dialogo = document.createElement('dialog');
    dialogo.className = 'dialogo';
    dialogo.innerHTML = html`<h2>${titulo}</h2><p>${texto}</p>
      <div class="dialogo-acciones">
        <button class="btn ${peligro ? 'btn-peligro' : 'btn-primario'}" value="si">${aceptar}</button>
        <button class="btn btn-sutil" value="no">${rechazar}</button>
      </div>`.toString();
    dialogo.addEventListener('click', (evento) => {
      const boton = evento.target.closest('button');
      if (boton) dialogo.close(boton.value);
      else if (evento.target === dialogo) dialogo.close('no');
    });
    dialogo.addEventListener('close', () => {
      resolver(dialogo.returnValue === 'si');
      dialogo.remove();
    });
    document.body.append(dialogo);
    dialogo.showModal();
  });
}

let temporizadorAviso;
export function aviso(texto) {
  const region = document.getElementById('avisos');
  region.textContent = texto;
  region.classList.add('visible');
  clearTimeout(temporizadorAviso);
  temporizadorAviso = setTimeout(() => region.classList.remove('visible'), 3200);
}
