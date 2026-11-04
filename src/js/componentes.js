import { costoEstimado, pesos } from './core/costo.js';
import { minutosDeViaje, PUNTO_UNLAM, UNLAM } from './core/localidades.js';
import { aHora, aMinutos } from './core/matching.js';
import { html, icono } from './ui.js';

export const TIPOS = { ida: 'Solo ida', ida_vuelta: 'Ida y vuelta', vuelta: 'Solo vuelta' };

export const avatar = (persona, clase = '') =>
  html`<span class="avatar ${clase}" style="--tono:${persona.tono}" aria-hidden="true">${persona.iniciales}</span>`;

export const sello = (texto = 'Verificado') => html`<span class="sello">${icono('check')}${texto}</span>`;

export function puntaje(persona) {
  return html`<span class="puntaje">${icono('estrella', 'estrella')}<b>${persona.calificacion.toFixed(1).replace('.', ',')}</b> en ${persona.viajes} viajes</span>`;
}

export function patente(valor) {
  const nueva = valor.length === 7;
  return html`<span class="patente ${nueva ? 'patente-nueva' : ''}" aria-label="Patente ${valor}">
    ${nueva && html`<span class="patente-franja">ARGENTINA</span>`}<b>${valor}</b>
  </span>`;
}

/** Datos del conductor y su auto juntos, como se aceptó en el TP4. */
export function bloqueVehiculo(vehiculo) {
  return html`<div class="vehiculo">
    ${icono('auto')}
    <div><b>${vehiculo.marca} ${vehiculo.modelo}</b><span>${vehiculo.color} · ${vehiculo.anio}</span></div>
    ${patente(vehiculo.patente)}
  </div>`;
}

export function credencial(conductor, { vivo = false, checks = null } = {}) {
  const lista = checks ?? ['Correo institucional confirmado', 'Certificado de alumno regular validado'];
  return html`<section class="credencial" aria-label="Credencial de ${conductor.nombre}">
    <div class="credencial-brillo" aria-hidden="true"></div>
    <div class="credencial-cabecera">
      <span class="credencial-marca">UNLaM Carpool</span>
      <span class="credencial-estado"><i></i>${vivo ? html`Activa · <time data-reloj>--:--:--</time>` : 'Activa'}</span>
    </div>
    <div class="credencial-persona">
      ${avatar(conductor, 'avatar-xl')}
      <div>
        <h2>${conductor.nombre}</h2>
        <p>${conductor.carrera}</p>
        <p>En la UNLaM desde ${conductor.desde}</p>
      </div>
    </div>
    <p class="credencial-titulo">${icono('escudo')}Estudiante regular verificado</p>
    <ul class="credencial-checks">${lista.map((texto) => html`<li>${icono('check')}${texto}</li>`)}</ul>
  </section>`;
}

export const horaLlegada = (hora, km) => aHora(aMinutos(hora) + minutosDeViaje(km));

/** Datos de un sentido del viaje según el tramo que pidió el pasajero. */
export function tramosDeViaje(viaje, tipo) {
  const tramos = [];
  if (tipo !== 'vuelta' && viaje.horaIda) {
    tramos.push({ sentido: 'Ida', hora: viaje.horaIda, llegada: horaLlegada(viaje.horaIda, viaje.km), origen: viaje.localidad, destino: UNLAM, punto: viaje.punto });
  }
  if (tipo !== 'ida' && viaje.horaVuelta) {
    tramos.push({ sentido: 'Vuelta', hora: viaje.horaVuelta, llegada: horaLlegada(viaje.horaVuelta, viaje.km), origen: UNLAM, destino: viaje.localidad, punto: PUNTO_UNLAM });
  }
  return tramos;
}

export function tiraRecorrido(tramo, { punto = false } = {}) {
  return html`<div class="tira">
    <div class="tira-linea" aria-hidden="true"><i></i><span></span><i></i></div>
    <div class="tira-paradas">
      <p><time>${tramo.hora}</time><span>${tramo.origen}</span></p>
      <p><time>~${tramo.llegada}</time><span>${tramo.destino}</span></p>
    </div>
  </div>
  ${punto && html`<p class="dato-linea">${icono('pin')}<span><b>Punto de encuentro</b>${tramo.punto}</span></p>`}`;
}

export const esNocturno = (hora) => Boolean(hora) && (aMinutos(hora) >= 1200 || aMinutos(hora) < 360);

export function reciboCosto(viaje, tipo) {
  return html`<section class="recibo" aria-label="Costo estimado">
    <div class="recibo-total">
      <div><span>Costo estimado por persona</span><strong>${pesos(costoEstimado(viaje, tipo))}</strong></div>
      <small>Es un estimado de la nafta dividida entre quienes viajan. Se arregla directamente con quien maneja.</small>
    </div>
  </section>`;
}

export const estrellas = (cantidad) =>
  html`<span class="estrellas" aria-label="${cantidad} de 5 estrellas">${Array.from({ length: 5 }, (_, i) => icono('estrella', i < cantidad ? 'on' : 'off'))}</span>`;
