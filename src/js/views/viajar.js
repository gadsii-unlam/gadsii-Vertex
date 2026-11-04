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
import { buscarLocalidad, UNLAM } from '../core/localidades.js';
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
import { aviso, confirmar, escapar, html, icono, mostrarErrores, Seguro } from '../ui.js';
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
  const tramos = tramosDeViaje(viaje, busqueda.tipo);
  const [ida, vuelta] = tramos;
  return html`<a class="tarjeta-viaje" href="#/viaje/${viaje.id}" aria-label="${busqueda.localidad} a ${UNLAM}, ${ida ? `sale ${ida.hora}` : ''}${vuelta ? `, vuelve ${vuelta.hora}` : ''}, costo estimado ${pesos(costoEstimado(viaje, busqueda.tipo))} por persona, con ${conductor.nombre}">
    <div class="tarjeta-cabecera">
      ${ida && html`<time class="via-hora">${ida.hora}</time>`}
      <b class="via-origen">${ida ? ida.origen : UNLAM}</b>
      ${html`<span class="via-flecha">${icono('flecha')}</span>`}
      <b class="via-destino">${ida ? ida.destino : UNLAM}</b>
      ${vuelta && html`<span class="via-vuelta">${icono('invertir')}vuelve <time>${vuelta.hora}</time></span>`}
      <span class="via-punto">${icono('pin')}${viaje.punto}</span>
    </div>
    <div class="tarjeta-accion">
      <span class="tarjeta-precio"><span class="tarjeta-precio-cifras"><i>≈</i><b>${pesos(costoEstimado(viaje, busqueda.tipo))}</b></span><small>por persona</small></span>
      <span class="tarjeta-ver">Ver viaje ${icono('flecha')}</span>
    </div>
    <div class="tarjeta-chips" role="list">
      ${resultado.cursada && html`<span class="cursan-juntos" role="listitem">${icono('persona')}Cursan juntos · ${resultado.cursada.materia}</span>`}
      <span class="coincidencia coincidencia-${nivelCoincidencia(resultado.puntaje).toLowerCase()}" role="listitem">Coincidencia ${nivelCoincidencia(resultado.puntaje).toLowerCase()}</span>
      ${tramos.some((parada) => esNocturno(parada.hora)) && html`<span class="nocturno" role="listitem">${icono('luna')}Noche</span>`}
      <span role="listitem">${viaje.lugaresLibres} ${viaje.lugaresLibres === 1 ? 'lugar disponible' : 'lugares disponibles'}</span>
    </div>
    <div class="tarjeta-conductor">
      ${avatar(conductor)}
      <b>${conductor.nombre}</b>${sello()}${puntaje(conductor)}
    </div>
  </a>`;
}

export function resultados() {
  const busqueda = estado.busqueda;
  if (!busqueda) return { redirigir: '#/buscar' };
  const cursada = estado.usuario.cursada ?? [];
  const encontrados = buscarViajes(estado.viajes, CONDUCTORES, busqueda, undefined, cursada);
  const cantidad = encontrados.length;
  const plural = cantidad === 1 ? 'viaje' : 'viajes';
  const horas = [
    busqueda.tipo !== 'vuelta' ? `salida ${busqueda.horaIda}` : null,
    busqueda.tipo !== 'ida' ? `vuelta ${busqueda.horaVuelta}` : null,
  ].filter(Boolean).join(' · ');
  const resumen = html`<section class="resumen-busqueda" aria-label="Resumen de tu búsqueda">
      <div class="resumen-recorrido" aria-label="De ${busqueda.localidad} a ${UNLAM}">
        <span class="resumen-punto">
          <i aria-hidden="true"></i>
          <b>${busqueda.localidad}</b>
        </span>
        <span class="resumen-flecha" aria-hidden="true">${icono('flecha')}</span>
        <span class="resumen-punto destino">
          <i aria-hidden="true"></i>
          <b>${UNLAM}</b>
        </span>
      </div>
      <div class="resumen-meta">
        <div class="resumen-fichas">
          <span class="resumen-ficha"><b>${cantidad}</b> ${plural}</span>
          <span class="resumen-ficha">${fechaLegible(busqueda.fecha)}</span>
          <span class="resumen-ficha">${TIPOS[busqueda.tipo]}</span>
          ${horas && html`<span class="resumen-ficha">${horas}</span>`}
        </div>
        ${cantidad > 0 && html`<a class="resumen-modificar btn btn-secundario" href="#/buscar" data-evento="modificar_busqueda">${icono('invertir')}Modificar búsqueda</a>`}
      </div>
    </section>`;
  // v11 · Frase del vacío: constante para no dejar tiempos sueltos ("20:00 .").
  const detalle = [busqueda.tipo !== 'vuelta' ? `con salida cerca de las ${busqueda.horaIda}` : '', busqueda.tipo !== 'ida' ? `vuelta cerca de las ${busqueda.horaVuelta}` : ''].filter(Boolean).join(' y ');
  return {
    titulo: 'Viajes',
    volver: '#/buscar',
    cuerpo: html`<h1 class="solo-lector" tabindex="-1">${cantidad ? `Resultados de tu búsqueda` : 'No hay viajes para esa búsqueda'}</h1>
      ${resumen}
      ${cantidad > 0 && html`<p class="nota">${icono('escudo')}Todos los conductores son estudiantes verificados. Primero van quienes cursan con vos ese día, en la misma comisión y turno; después, por horario y referencias.</p>
        ${!cursada.length && html`<p class="nota">${icono('persona')}<span>Para ver con quién cursás, <a href="#/cursada">cargá tu cursada</a>.</span>`}`}
      ${cantidad > 0 && html`<div class="lista-viajes">${encontrados.map((resultado) => tarjetaViaje(resultado, busqueda))}</div>`}
      ${!cantidad && html`<div class="vacio vacio-v7">
        ${icono('auto')}
        <h2>Sin viajes dentro de tu horario</h2>
        <p>
          No encontramos viajes de ${busqueda.localidad || 'tu localidad'}
          ${detalle}.
          Probá con otro horario o con otro día.
        </p>
        <div class="vacio-acciones">
          <a class="btn btn-primario" href="#/buscar">${icono('invertir')}Modificar búsqueda</a>
        </div>
      </div>`}`,
    montar() {
      if (!cantidad) track('sin_resultados');
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
  const tramos = tramosDeViaje(datos, busqueda.tipo);
  const anios = new Date().getFullYear() - conductor.desde;
  return {
    titulo: 'Detalle del viaje',
    volver: '#/resultados',
    cuerpo: html`<h1 class="solo-lector" tabindex="-1">Viaje con ${conductor.nombre}</h1>
      <div class="detalle">
        <section class="tarjeta-seccion viaje-heroe det-recorrido" aria-label="Recorrido del viaje">
            <div class="heroe-cabecera">
              <h2>Recorrido</h2>
              <span class="tipo-chip">${TIPOS[datos.tipo]}</span>
              ${tramos.some((tramo) => esNocturno(tramo.hora)) && html`<span class="nocturno">${icono('luna')}Noche</span>`}
            </div>
            ${tramos.map((tramo) => html`<div class="tramo"><span class="tramo-sentido">${tramo.sentido}</span>${tiraRecorrido(tramo, { punto: true })}</div>`)}
            <p class="dato-linea">${icono('persona')}<span>${datos.lugaresLibres} ${datos.lugaresLibres === 1 ? 'lugar disponible' : 'lugares disponibles'}</span></p>
          </section>

          <section class="tarjeta-seccion conductor det-conductor" aria-label="Conductor, auto y confianza">
            <div class="cred-cabecera">
              ${avatar(conductor, 'avatar-xl')}
              <div class="cred-identidad">
                <h2>${conductor.nombre}</h2>
                <p class="cred-estado">${icono('escudo')}Estudiante regular verificado</p>
              </div>
            </div>
            <p class="cred-carrera">${conductor.carrera} · en la UNLaM desde ${conductor.desde}</p>
            <ul class="cred-checks" aria-label="Verificaciones del conductor">
              <li>${icono('check')}Correo institucional</li>
              <li>${icono('check')}Certificado validado</li>
            </ul>
            <div class="cred-stats" aria-label="Track record">
              <div><b>${String(conductor.calificacion.toFixed(1)).replace('.', ',')}</b><span>calificación</span></div>
              <div><b>${conductor.viajes}</b><span>viajes hechos</span></div>
              <div><b>${anios || 'Menos de 1'}</b><span>${anios === 1 ? 'año' : 'años'} en la UNLaM</span></div>
            </div>
            <div class="cred-detalle">
              ${bloqueVehiculo(conductor.vehiculo)}
              ${cursada && html`<p class="aviso-cursada">${icono('persona')}<span><b>Cursan juntos</b>${cursada.materia} · comisión ${cursada.comision} (${cursada.dia.toLowerCase()}) · turno ${cursada.turno.toLowerCase()}</span></p>`}
            </div>
          </section>

          <section class="tarjeta-seccion det-referencias" aria-label="Opiniones de estudiantes">
            <h2>Qué dicen de sus viajes</h2>
            <ul class="referencias">
              ${conductor.referencias.map((referencia) => html`<li>
                <div class="referencia-cabecera"><b>${referencia.autor}</b>${estrellas(referencia.estrellas)}</div>
                <p>"${referencia.texto}"</p>
                <small>${referencia.cuando} · desde ${referencia.desde}</small>
              </li>`)}
            </ul>
          </section>

        <aside class="detalle-resumen det-resumen" aria-label="Resumen y acción">
          <section class="recibo resumen-accion">
            <div class="resumen-fila">${busqueda.fecha && html`<span>${fechaLegible(busqueda.fecha)}</span>`}${html`<span>${TIPOS[datos.tipo]}</span>`}</div>
            <div class="recibo-total">
              <div><span>Costo estimado por persona</span><strong>${pesos(costoEstimado(datos, busqueda.tipo))}</strong></div>
              <small>Es un estimado de la nafta dividida entre quienes viajan. Se arregla directamente con quien maneja.</small>
            </div>
            <div class="resumen-cta">
              ${activa
                ? html`<a class="btn btn-primario" href="#/pase/${activa.id}">Ver mi solicitud</a>`
                : datos.lugaresLibres > 0
                  ? html`<a class="btn btn-primario" href="#/confirmar/${id}">Quiero este viaje</a>`
                  : html`<button class="btn btn-secundario" disabled>Sin lugares</button>`}
            </div>
          </section>
        </aside>
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

// Último estado visto de cada pase: si pasa de pendiente a confirmada con la pantalla abierta, se celebra.
const estadoVisto = new Map();
const COLORES_CONFETI = ['#efae35', '#0d9463', '#5465d6', '#fffdf8', '#f6c96b', '#2fbf87'];

function lanzarConfeti(origen) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || !origen) return;
  const caja = origen.getBoundingClientRect();
  const capa = document.createElement('div');
  capa.className = 'confeti';
  capa.setAttribute('aria-hidden', 'true');
  capa.style.left = `${caja.left + caja.width / 2}px`;
  capa.style.top = `${caja.top + caja.height / 2}px`;
  for (let i = 0; i < 36; i += 1) {
    const pieza = document.createElement('i');
    const angulo = (Math.PI * 2 * i) / 36 + Math.random() * 0.4;
    const fuerza = 90 + Math.random() * 130;
    pieza.style.setProperty('--x', `${Math.cos(angulo) * fuerza}px`);
    pieza.style.setProperty('--y', `${Math.sin(angulo) * fuerza * 0.7 - 70}px`);
    pieza.style.setProperty('--r', `${Math.round(Math.random() * 720 - 360)}deg`);
    pieza.style.setProperty('--d', `${Math.round(Math.random() * 120)}ms`);
    pieza.style.setProperty('--c', COLORES_CONFETI[i % COLORES_CONFETI.length]);
    if (i % 3 === 0) pieza.classList.add('redondo');
    capa.append(pieza);
  }
  document.body.append(capa);
  setTimeout(() => capa.remove(), 1900);
  navigator.vibrate?.([18, 40, 28]);
}

export function pase({ id }) {
  const solicitud = solicitudPorId(id);
  if (!solicitud) return { redirigir: '#/viajes' };
  const datos = viajePorId(solicitud.viajeId);
  const conductor = conductorDe(datos);
  const situacion = estadoSolicitud(solicitud);
  const celebrar = estadoVisto.get(id) === 'pendiente' && situacion === 'confirmada';
  estadoVisto.set(id, situacion);
  const esperaMs = situacion === 'pendiente' ? Math.max(0, solicitud.aceptaEn - Date.now()) : 0;
  const tramos = tramosDeViaje(datos, solicitud.tipo);
  const hayNoche = tramos.some((tramo) => esNocturno(tramo.hora));
  // Etiqueta textual explícita + explicación real del estado (no se adelanta a confirmado si sigue pendiente).
  const encabezados = {
    pendiente: ['Pendiente', `Solicitud enviada. ${conductor.nombre.split(' ')[0]} todavía tiene que aceptar el lugar.`],
    confirmada: ['Confirmado', `${conductor.nombre.split(' ')[0]} aceptó tu solicitud. Tenés tu lugar.`],
    cancelada: ['Cancelado', 'Ya no tenés un lugar reservado. Le avisamos a la persona que maneja.'],
  };
  const icone = { pendiente: 'reloj', confirmada: 'check', cancelada: 'cerrar' };
  const marca = situacion === 'pendiente' ? 'Es una solicitud, todavía puede quedar sin confirmar.' : situacion === 'confirmada' ? 'Solicitado y aceptado por el conductor.' : 'Estado final de esta solicitud.';
  return {
    titulo: 'Tu viaje',
    volver: '#/viajes',
    cuerpo: html`
      <article class="credencial-viaje cred-${situacion} ${situacion === 'cancelada' ? 'cred-apagado' : ''} ${celebrar ? 'cred-celebrar' : ''}" style="--espera: ${esperaMs}ms" aria-label="Credencial de tu viaje">
        <div class="cred-cabecera-v" role="status" data-estado="${situacion}">
          <span class="cred-cabecera-marca" aria-hidden="true">UNLaM · Carpool</span>
          <span class="cred-estado-chip cred-estado-${situacion}">
            ${icono(icone[situacion])}
            <b>${encabezados[situacion][0]}</b>
          </span>
        </div>
        <p class="cred-descripcion">${encabezados[situacion][1]}</p>
        <hr class="cred-separador" />
        <div class="cred-cuerpo">
          <p class="cred-fecha">${fechaLegible(solicitud.fecha)}</p>
          ${tramos.map((tramo) => html`<div class="tramo"><span class="tramo-sentido">${tramo.sentido}</span>${tiraRecorrido(tramo, { punto: true })}</div>`)}
          <div class="cred-bloque">
            <div class="cred-bloque-cabecera">
              ${avatar(conductor)}
              <div class="tarjeta-persona">
                <b>${conductor.nombre}</b>${sello()}
                ${situacion === 'confirmada' && html`<span class="puntaje">${conductor.telefono}</span>`}
              </div>
            </div>
            ${bloqueVehiculo(conductor.vehiculo)}
          </div>
          <div class="cred-costo">
            <div><span>Costo estimado por persona</span><b>${pesos(costoEstimado(datos, solicitud.tipo))}</b></div>
            <small>Es un estimado de la nafta dividida entre quienes viajan. Se arregla directamente con quien maneja.</small>
          </div>
        </div>
        <p class="cred-pie">${marca}</p>
      </article>
      ${situacion !== 'cancelada' && html`<section class="seguridad ${hayNoche ? 'seguridad-noche' : ''}">
        <h2>${hayNoche ? html`${icono('luna')}Para viajar tranquilo de noche` : html`${icono('escudo')}Para viajar tranquilo`}</h2>
        <ul class="lista-chequeo">
          <li>${icono('check')}<span>Viajás con un estudiante verificado de la UNLaM</span></li>
          <li>${icono('check')}<span>Fijate que la patente sea ${patente(conductor.vehiculo.patente)}</span></li>
          <li>${icono('check')}<span>Compartí tu ubicación con alguien de confianza</span></li>
        </ul>
      </section>`}
      ${situacion !== 'cancelada' && html`<div class="cred-acciones">
        <a class="btn btn-secundario btn-acciones-nav" href="#/viajes">Listo</a>
        <span class="cred-acciones-divider" aria-hidden="true"></span>
        <button class="btn btn-sutil btn-peligro-texto" id="cancelar">Cancelar este viaje</button>
      </div>`}
      ${situacion === 'cancelada' && html`<a class="btn btn-primario cred-acciones-solo-primario" href="#/buscar">Buscar otro viaje</a>`}`,
    montar(raiz) {
      let espera;
      if (situacion === 'pendiente') espera = setTimeout(refrescar, Math.max(0, solicitud.aceptaEn - Date.now()));
      if (celebrar) setTimeout(() => lanzarConfeti(raiz.querySelector('.cred-estado-chip')), 220);
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
