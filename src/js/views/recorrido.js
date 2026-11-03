// Formulario de "Buscar un viaje".
import { TIPOS } from '../componentes.js';
import { sugerirLocalidades, UNLAM } from '../core/localidades.js';
import { aHora, aMinutos } from '../core/matching.js';
import { fechasDisponibles } from '../core/recorrido.js';
import { campo, html, icono } from '../ui.js';

const proximaHora = (hora, ahora) => {
  const minutos = ahora.getHours() * 60 + ahora.getMinutes();
  if (aMinutos(hora) >= minutos) return hora;
  return minutos + 30 < 1440 ? aHora(Math.ceil((minutos + 30) / 15) * 15) : null;
};

/** Propone un horario que todavía no pasó, así el primer intento no da error. */
export function valoresIniciales(guardados = null, ahora = new Date()) {
  const [hoy, manana] = fechasDisponibles(ahora);
  if (guardados && fechasDisponibles(ahora).some((dia) => dia.iso === guardados.fecha)) return guardados;
  const horaIda = proximaHora('18:30', ahora);
  const horaVuelta = proximaHora('22:30', ahora);
  const valores = {
    tipo: 'ida',
    localidad: '',
    fecha: horaIda && horaVuelta ? hoy.iso : manana.iso,
    horaIda: horaIda ?? '18:30',
    horaVuelta: horaVuelta ?? '22:30',
    ...guardados,
  };
  if (guardados) valores.fecha = hoy.iso;
  return valores;
}

export function recorridoHtml(valores) {
  return html`<fieldset class="segmento">
      <legend class="etiqueta">Recorrido</legend>
      <div class="segmento-opciones">
        ${Object.entries(TIPOS).map(([valor, texto]) => html`<label><input type="radio" name="tipo" value="${valor}" ${valores.tipo === valor ? html`checked` : ''}><span>${texto}</span></label>`)}
      </div>
    </fieldset>
    <div class="ruta-form" id="ruta-form">
      <div class="campo combo" data-campo="localidad">
        <label class="etiqueta" for="localidad" id="etiqueta-localidad">Desde</label>
        <div class="input-con-icono">
          ${icono('pin')}
          <input id="localidad" name="localidad" role="combobox" aria-autocomplete="list" aria-expanded="false" aria-controls="sugerencias" autocomplete="off" placeholder="Tu localidad" value="${valores.localidad}">
        </div>
        <ul id="sugerencias" class="sugerencias" role="listbox" aria-label="Localidades" hidden></ul>
        <p class="error" id="localidad-error" hidden></p>
      </div>
      <button type="button" class="btn-invertir" id="invertir" aria-label="Intercambiar origen y destino">${icono('invertir')}</button>
      <div class="campo campo-unlam">
        <span class="etiqueta" id="etiqueta-unlam">Hasta</span>
        <div class="fijo">${icono('escudo')}${UNLAM}<small>siempre hacia o desde la facu</small></div>
      </div>
    </div>
    <fieldset class="dias">
      <legend class="etiqueta">Día</legend>
      <div class="dias-opciones">
        ${fechasDisponibles().map((dia) => html`<label><input type="radio" name="fecha" value="${dia.iso}" ${valores.fecha === dia.iso ? html`checked` : ''}><span><small>${dia.etiqueta}</small><b>${dia.numero}</b></span></label>`)}
      </div>
    </fieldset>
    <div class="fila">
      <div data-hora="ida">${campo({ nombre: 'horaIda', etiqueta: 'Hora de ida', control: html`<input id="horaIda" name="horaIda" type="time" value="${valores.horaIda}">` })}</div>
      <div data-hora="vuelta">${campo({ nombre: 'horaVuelta', etiqueta: 'Hora de vuelta', control: html`<input id="horaVuelta" name="horaVuelta" type="time" value="${valores.horaVuelta}">` })}</div>
    </div>`;
}

export function leerRecorrido(form) {
  return {
    tipo: form.tipo.value,
    localidad: form.localidad.value.trim(),
    fecha: form.fecha.value,
    horaIda: form.horaIda.value,
    horaVuelta: form.horaVuelta.value,
  };
}

function montarCombo(raiz, alCambiar) {
  const entrada = raiz.querySelector('#localidad');
  const lista = raiz.querySelector('#sugerencias');
  let activa = -1;

  const cerrar = () => {
    lista.hidden = true;
    entrada.setAttribute('aria-expanded', 'false');
    entrada.removeAttribute('aria-activedescendant');
    activa = -1;
  };
  const elegir = (nombre) => {
    entrada.value = nombre;
    cerrar();
    alCambiar();
  };
  const pintar = () => {
    const opciones = sugerirLocalidades(entrada.value);
    lista.innerHTML = opciones.length
      ? opciones.map((opcion, i) => html`<li id="sug-${i}" role="option" aria-selected="false" data-valor="${opcion.nombre}">${opcion.nombre}<small>~${opcion.km} km</small></li>`).join('')
      : '<li class="sin-opciones">No encontramos esa localidad todavía.</li>';
    lista.hidden = false;
    entrada.setAttribute('aria-expanded', 'true');
    activa = -1;
  };
  const marcar = (indice) => {
    const opciones = [...lista.querySelectorAll('[role=option]')];
    if (!opciones.length) return;
    activa = (indice + opciones.length) % opciones.length;
    opciones.forEach((opcion, i) => opcion.setAttribute('aria-selected', String(i === activa)));
    entrada.setAttribute('aria-activedescendant', opciones[activa].id);
    opciones[activa].scrollIntoView({ block: 'nearest' });
  };

  entrada.addEventListener('focus', pintar);
  entrada.addEventListener('input', () => { pintar(); alCambiar(); });
  entrada.addEventListener('blur', () => setTimeout(cerrar, 120));
  entrada.addEventListener('keydown', (evento) => {
    if (lista.hidden) return;
    if (evento.key === 'ArrowDown') { evento.preventDefault(); marcar(activa + 1); }
    if (evento.key === 'ArrowUp') { evento.preventDefault(); marcar(activa - 1); }
    if (evento.key === 'Escape') cerrar();
    if (evento.key === 'Enter' && activa >= 0) {
      evento.preventDefault();
      elegir(lista.querySelectorAll('[role=option]')[activa].dataset.valor);
    }
  });
  lista.addEventListener('pointerdown', (evento) => {
    const opcion = evento.target.closest('[role=option]');
    if (opcion) {
      evento.preventDefault();
      elegir(opcion.dataset.valor);
    }
  });
}

export function montarRecorrido(raiz, alCambiar = () => {}) {
  const form = raiz.querySelector('form');
  const contenedor = raiz.querySelector('#ruta-form');
  const campoLocalidad = contenedor.querySelector('[data-campo=localidad]');
  const campoUnlam = contenedor.querySelector('.campo-unlam');
  const boton = raiz.querySelector('#invertir');

  const aplicarTipo = () => {
    const tipo = form.tipo.value;
    const desdeUnlam = tipo === 'vuelta';
    boton.after(desdeUnlam ? campoLocalidad : campoUnlam);
    boton.before(desdeUnlam ? campoUnlam : campoLocalidad);
    raiz.querySelector('#etiqueta-localidad').textContent = desdeUnlam ? 'Hasta' : 'Desde';
    raiz.querySelector('#etiqueta-unlam').textContent = desdeUnlam ? 'Desde' : 'Hasta';
    boton.hidden = tipo === 'ida_vuelta';
    contenedor.classList.toggle('ambos-sentidos', tipo === 'ida_vuelta');
    raiz.querySelector('[data-hora=ida]').hidden = tipo === 'vuelta';
    raiz.querySelector('[data-hora=vuelta]').hidden = tipo === 'ida';
    alCambiar();
  };

  boton.addEventListener('click', () => {
    form.tipo.value = form.tipo.value === 'ida' ? 'vuelta' : 'ida';
    boton.classList.toggle('girado');
    aplicarTipo();
  });
  form.querySelectorAll('[name=tipo]').forEach((opcion) => opcion.addEventListener('change', aplicarTipo));
  form.querySelectorAll('[name=fecha], [type=time]').forEach((control) => control.addEventListener('change', alCambiar));
  montarCombo(raiz, alCambiar);
  aplicarTipo();
}
