import {
  avatar,
  bloqueVehiculo,
  credencial,
  esNocturno,
  estrellas,
  patente,
  puntaje,
  reciboCosto,
  sello,
  TIPOS,
  tiraRecorrido,
  tramosDeViaje,
} from '../componentes.js';
import { costoEstimado, pesos } from '../core/costo.js';
import { cursadaCompartida } from '../core/cursada.js';
import { buscarLocalidad } from '../core/localidades.js';
import { buscarViajes, nivelCoincidencia } from '../core/matching.js';
import { fechaLegible, validarRecorrido } from '../core/recorrido.js';
import { CONDUCTORES } from '../data.js';
import { navegar, refrescar } from '../router.js';
import {
  cancelarSolicitud,
  conductorDe,
  estado,
  estadoSolicitud,
  guardar,
  inicialesDe,
  solicitarLugar,
  solicitudActivaDe,
  solicitudPorId,
  track,
  viajePorId,
} from '../store.js';
import { aviso, confirmar, html, icono, mostrarErrores } from '../ui.js';
import { leerRecorrido, montarRecorrido, recorridoHtml, valoresIniciales } from './recorrido.js';

export function buscar() {
  const valores = valoresIniciales(estado.busqueda);
  return {
    titulo: 'Buscar un viaje',
    conNavegacion: true,
    sinCabecera: true,
    cuerpo: html`<header class="saludo">
        <div><p>Hola, ${estado.usuario.nombre}</p><span class="sello sello-grande">${icono('check')}Estudiante verificado</span></div>
        <a href="#/perfil" aria-label="Ver mi perfil">${avatar({ iniciales: inicialesDe(estado.usuario), tono: 40 })}</a>
      </header>
      <h1 tabindex="-1">¿Qué viaje necesitás?</h1>
      <form id="form" novalidate>
        ${recorridoHtml(valores)}
        <button class="btn btn-primario">Buscar viajes${icono('flecha')}</button>
      </form>`,
    montar(raiz) {
      montarRecorrido(raiz);
      raiz.querySelector('#form').addEventListener('submit', (evento) => {
        evento.preventDefault();
        const busqueda = leerRecorrido(evento.target);
        const errores = validarRecorrido(busqueda);
        if (!mostrarErrores(raiz, errores)) {
          track('error_validacion', { campo: Object.keys(errores)[0], pantalla: 'buscar' });
          return;
        }
        busqueda.localidad = buscarLocalidad(busqueda.localidad).nombre;
        estado.busqueda = busqueda;
        track('busqueda', { tipo: busqueda.tipo, localidad: busqueda.localidad });
        guardar();
        navegar('#/resultados');
      });
    },
  };
}

function tarjetaViaje(resultado, busqueda) {
  const { viaje, conductor } = resultado;
  const [tramo] = tramosDeViaje(viaje, busqueda.tipo);
  return html`<a class="tarjeta-viaje" href="#/viaje/${viaje.id}">
    <div class="tarjeta-cabecera">
      ${resultado.cursada && html`<span class="cursan-juntos">${icono('persona')}Cursan juntos</span>`}
      <span class="coincidencia coincidencia-${nivelCoincidencia(resultado.puntaje).toLowerCase()}">Coincidencia ${nivelCoincidencia(resultado.puntaje).toLowerCase()}</span>
      ${esNocturno(tramo.hora) && html`<span class="nocturno">${icono('luna')}Noche</span>`}
      <span class="tipo-chip">${TIPOS[viaje.tipo]}</span>
    </div>
    ${tiraRecorrido(tramo)}
    <ul class="motivos">${resultado.motivos.map((motivo) => html`<li>${motivo}</li>`)}</ul>
    <div class="tarjeta-conductor">
      ${avatar(conductor)}
      <div class="tarjeta-persona"><b>${conductor.nombre}</b>${sello()}${puntaje(conductor)}</div>
    </div>
    <div class="tarjeta-pie">
      <span>${viaje.lugaresLibres} ${viaje.lugaresLibres === 1 ? 'lugar' : 'lugares'}</span>
      <span class="tarjeta-precio">≈ <b>${pesos(costoEstimado(viaje, busqueda.tipo))}</b> por persona</span>
    </div>
  </a>`;
}

export function resultados() {
  const busqueda = estado.busqueda;
  if (!busqueda) return { redirigir: '#/buscar' };
  const cursada = estado.usuario.cursada ?? [];
  const encontrados = buscarViajes(estado.viajes, CONDUCTORES, busqueda, undefined, cursada);
  const horario = [busqueda.tipo !== 'vuelta' && busqueda.horaIda, busqueda.tipo !== 'ida' && busqueda.horaVuelta].filter(Boolean).join(' y ');
  return {
    titulo: 'Viajes',
    volver: '#/buscar',
    cancelar: '#/buscar',
    cuerpo: html`<h1 tabindex="-1">${encontrados.length ? `${encontrados.length} ${encontrados.length === 1 ? 'viaje compatible' : 'viajes compatibles'}` : 'No hay viajes para esa búsqueda'}</h1>
      <p class="bajada">${TIPOS[busqueda.tipo]} · ${busqueda.localidad} · ${horario} · ${fechaLegible(busqueda.fecha)}</p>
      ${encontrados.length > 0 && html`<p class="nota">${icono('escudo')}Todos los conductores son estudiantes verificados. Primero van quienes cursan con vos ese día, en la misma comisión y turno; después, por horario y referencias.</p>
        ${!cursada.length && html`<p class="nota">${icono('persona')}<span>Para ver con quién cursás, <a href="#/cursada">cargá tu cursada</a>.</span></p>`}
        <div class="lista-viajes">${encontrados.map((resultado) => tarjetaViaje(resultado, busqueda))}</div>`}
      ${!encontrados.length && html`<div class="vacio">
        ${icono('auto')}
        <p>No encontramos viajes dentro de la hora que pediste. Probá con otro horario o con "Solo ida" o "Solo vuelta".</p>
        <a class="btn btn-secundario" href="#/buscar">Cambiar la búsqueda</a>
      </div>`}`,
    montar() {
      if (!encontrados.length) track('sin_resultados');
    },
  };
}

export function viaje({ id }) {
  const datos = viajePorId(id);
  if (!datos) return { redirigir: '#/buscar' };
  const busqueda = estado.busqueda ?? { tipo: datos.tipo };
  const conductor = conductorDe(datos);
  const activa = solicitudActivaDe(id);
  const cursada = cursadaCompartida(estado.usuario.cursada, conductor.cursada, busqueda.fecha);
  return {
    titulo: 'Detalle del viaje',
    volver: '#/resultados',
    cancelar: '#/buscar',
    conPieFijo: true,
    cuerpo: html`<h1 class="solo-lector" tabindex="-1">Viaje con ${conductor.nombre}</h1>
      ${credencial(conductor)}
      ${cursada && html`<p class="aviso-cursada">${icono('persona')}<span><b>Cursan juntos</b>${cursada.materia} · comisión ${cursada.comision} (${cursada.dia.toLowerCase()}) · turno ${cursada.turno.toLowerCase()}</span></p>`}
      <div class="tarjeta-seccion resumen-confianza">
        <div><b>${String(conductor.calificacion.toFixed(1)).replace('.', ',')}</b><span>calificación</span></div>
        <div><b>${conductor.viajes}</b><span>viajes hechos</span></div>
        <div><b>${new Date().getFullYear() - conductor.desde || 'Menos de 1'}</b><span>${new Date().getFullYear() - conductor.desde === 1 ? 'año' : 'años'} en la UNLaM</span></div>
      </div>
      <section class="tarjeta-seccion"><h2>Auto</h2>${bloqueVehiculo(conductor.vehiculo)}</section>
      <section class="tarjeta-seccion"><h2>Viaje</h2>
        ${tramosDeViaje(datos, busqueda.tipo).map((tramo) => html`<div class="tramo"><span class="tramo-sentido">${tramo.sentido}</span>${tiraRecorrido(tramo, { punto: true })}</div>`)}
        <p class="dato-linea">${icono('persona')}<span>${datos.lugaresLibres} ${datos.lugaresLibres === 1 ? 'lugar disponible' : 'lugares disponibles'}</span></p>
      </section>
      ${reciboCosto(datos, busqueda.tipo)}
      <section class="tarjeta-seccion">
        <h2>Qué dicen de sus viajes</h2>
        <ul class="referencias">
          ${conductor.referencias.map((referencia) => html`<li>
            <div class="referencia-cabecera"><b>${referencia.autor}</b>${estrellas(referencia.estrellas)}</div>
            <p>"${referencia.texto}"</p>
            <small>${referencia.cuando} · desde ${referencia.desde}</small>
          </li>`)}
        </ul>
      </section>
      <div class="pie-fijo">
        ${activa
          ? html`<a class="btn btn-secundario" href="#/pase/${activa.id}">Ver mi solicitud</a>`
          : datos.lugaresLibres > 0
            ? html`<a class="btn btn-primario" href="#/confirmar/${id}">Quiero este viaje</a>`
            : html`<button class="btn btn-secundario" disabled>Sin lugares</button>`}
      </div>`,
    montar() {
      track('perfil_conductor', { conductorId: datos.conductorId, viajeId: id });
    },
  };
}

export function confirmarViaje({ id }) {
  const datos = viajePorId(id);
  if (!datos) return { redirigir: '#/buscar' };
  const activa = solicitudActivaDe(id);
  if (activa) return { redirigir: `#/pase/${activa.id}` };
  const busqueda = estado.busqueda ?? { tipo: datos.tipo, fecha: datos.fecha };
  const conductor = conductorDe(datos);
  return {
    titulo: 'Confirmar',
    volver: `#/viaje/${id}`,
    cancelar: '#/buscar',
    conPieFijo: true,
    cuerpo: html`<h1 tabindex="-1">Revisá antes de solicitar</h1>
      <section class="tarjeta-seccion"><h2>Viaje · ${fechaLegible(busqueda.fecha)}</h2>
        ${tramosDeViaje(datos, busqueda.tipo).map((tramo) => html`<div class="tramo"><span class="tramo-sentido">${tramo.sentido}</span>${tiraRecorrido(tramo, { punto: true })}</div>`)}
      </section>
      <section class="tarjeta-seccion"><h2>Conductor y auto</h2>
        <div class="tarjeta-conductor sin-borde">${avatar(conductor)}<div class="tarjeta-persona"><b>${conductor.nombre}</b>${sello()}${puntaje(conductor)}</div></div>
        ${bloqueVehiculo(conductor.vehiculo)}
      </section>
      <section class="tarjeta-seccion total-confirmar">
        <span>Costo estimado por persona</span><strong>${pesos(costoEstimado(datos, busqueda.tipo))}</strong>
        <small>Se arregla directamente con quien maneja.</small>
      </section>
      <div class="pie-fijo">
        <button class="btn btn-primario" id="solicitar">Solicitar lugar</button>
        <a class="btn btn-sutil" href="#/viaje/${id}">Volver</a>
      </div>`,
    montar(raiz) {
      raiz.querySelector('#solicitar').addEventListener('click', () => {
        try {
          const solicitud = solicitarLugar(id, busqueda.tipo, busqueda.fecha);
          guardar();
          navegar(`#/pase/${solicitud.id}`);
        } catch (error) {
          aviso(error.message);
        }
      });
    },
  };
}

export function pase({ id }) {
  const solicitud = solicitudPorId(id);
  if (!solicitud) return { redirigir: '#/viajes' };
  const datos = viajePorId(solicitud.viajeId);
  const conductor = conductorDe(datos);
  const situacion = estadoSolicitud(solicitud);
  const tramos = tramosDeViaje(datos, solicitud.tipo);
  const hayNoche = tramos.some((tramo) => esNocturno(tramo.hora));
  const encabezados = {
    pendiente: ['Solicitud enviada', `Le avisamos a ${conductor.nombre.split(' ')[0]}. Te respondemos en un momento.`],
    confirmada: ['¡Tu lugar está confirmado!', `${conductor.nombre.split(' ')[0]} aceptó tu solicitud.`],
    cancelada: ['Cancelaste este viaje', 'Ya no tenés un lugar reservado. Le avisamos a la persona que maneja.'],
  };
  return {
    titulo: 'Tu viaje',
    volver: '#/viajes',
    cuerpo: html`<div class="pase-estado pase-${situacion}" role="status">
        <span class="pase-icono">${situacion === 'confirmada' ? icono('check') : situacion === 'pendiente' ? icono('reloj') : icono('cerrar')}</span>
        <h1 tabindex="-1">${encabezados[situacion][0]}</h1>
        <p>${encabezados[situacion][1]}</p>
      </div>
      <article class="pase ${situacion === 'cancelada' ? 'pase-apagado' : ''}">
        <header>
          <div>${avatar(conductor)}<div class="tarjeta-persona"><b>${conductor.nombre}</b>${sello()}${situacion === 'confirmada' && html`<span class="puntaje">${conductor.telefono}</span>`}</div></div>
        </header>
        <div class="pase-cuerpo">
          <p class="pase-fecha">${fechaLegible(solicitud.fecha)}</p>
          ${tramos.map((tramo) => html`<div class="tramo"><span class="tramo-sentido">${tramo.sentido}</span>${tiraRecorrido(tramo, { punto: true })}</div>`)}
          ${bloqueVehiculo(conductor.vehiculo)}
          <p class="pase-costo"><span>Costo estimado por persona</span><b>${pesos(costoEstimado(datos, solicitud.tipo))}</b></p>
        </div>
      </article>
      ${situacion !== 'cancelada' && html`<section class="seguridad ${hayNoche ? 'seguridad-noche' : ''}">
        <h2>${hayNoche ? html`${icono('luna')}Para viajar tranquilo de noche` : html`${icono('escudo')}Para viajar tranquilo`}</h2>
        <ul class="lista-chequeo">
          <li>${icono('check')}<span>Viajás con un estudiante verificado de la UNLaM</span></li>
          <li>${icono('check')}<span>Fijate que la patente sea ${patente(conductor.vehiculo.patente)}</span></li>
          <li>${icono('check')}<span>Compartí tu ubicación con alguien de confianza</span></li>
        </ul>
      </section>`}
      ${situacion !== 'cancelada' && html`<a class="btn btn-secundario" href="#/viajes">Listo</a>
        <button class="btn btn-sutil btn-peligro-texto" id="cancelar">Cancelar este viaje</button>`}
      ${situacion === 'cancelada' && html`<a class="btn btn-primario" href="#/buscar">Buscar otro viaje</a>`}`,
    montar(raiz) {
      let espera;
      if (situacion === 'pendiente') espera = setTimeout(refrescar, Math.max(0, solicitud.aceptaEn - Date.now()));
      raiz.querySelector('#cancelar')?.addEventListener('click', async () => {
        const seguro = await confirmar({
          titulo: '¿Cancelar este viaje?',
          texto: `Vas a liberar tu lugar y le vamos a avisar a ${conductor.nombre.split(' ')[0]}.`,
          aceptar: 'Sí, cancelar viaje',
          rechazar: 'No, mantenerlo',
          peligro: true,
        });
        if (seguro) {
          cancelarSolicitud(id);
          guardar();
          refrescar();
        }
      });
      return () => clearTimeout(espera);
    },
  };
}
