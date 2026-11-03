import { avatar, credencial, sello, TIPOS, tiraRecorrido, tramosDeViaje } from '../componentes.js';
import { carreraPorNombre, comisionesDeMateria, materiasDeCarrera, TURNOS, validarCursada } from '../core/cursada.js';
import { fechaLegible } from '../core/recorrido.js';
import { navegar, refrescar } from '../router.js';
import {
  conductorDe,
  estado,
  estadoSolicitud,
  guardar,
  inicialesDe,
  reiniciarTodo,
  resumenSesion,
  track,
  viajePorId,
} from '../store.js';
import { aviso, confirmar, html, icono } from '../ui.js';

const ETIQUETAS = { pendiente: 'Esperando respuesta', confirmada: 'Confirmado', cancelada: 'Cancelado' };

function tarjetaSolicitud(solicitud) {
  const viaje = viajePorId(solicitud.viajeId);
  const conductor = conductorDe(viaje);
  const situacion = estadoSolicitud(solicitud);
  const [tramo] = tramosDeViaje(viaje, solicitud.tipo);
  return html`<a class="tarjeta-viaje ${situacion === 'cancelada' ? 'apagada' : ''}" href="#/pase/${solicitud.id}">
    <div class="tarjeta-cabecera"><span class="estado estado-${situacion}">${ETIQUETAS[situacion]}</span><span class="tipo-chip">${TIPOS[solicitud.tipo]}</span></div>
    <p class="tarjeta-fecha">${fechaLegible(solicitud.fecha)}</p>
    ${tiraRecorrido(tramo)}
    <div class="tarjeta-conductor">${avatar(conductor)}<div class="tarjeta-persona"><b>${conductor.nombre}</b>${sello()}</div></div>
  </a>`;
}

export function viajes() {
  const { solicitudes } = estado;
  return {
    titulo: 'Mis viajes',
    conNavegacion: true,
    sinCabecera: true,
    cuerpo: html`<h1 class="titulo-pagina" tabindex="-1">Mis viajes</h1>
      ${solicitudes.length
        ? html`<div class="lista-viajes">${[...solicitudes].reverse().map(tarjetaSolicitud)}</div>`
        : html`<div class="vacio">${icono('ticket')}<p>Todavía no pediste ningún viaje.</p><a class="btn btn-secundario" href="#/buscar">Buscar un viaje</a></div>`}`,
    montar() {
      const momentos = solicitudes.filter((solicitud) => estadoSolicitud(solicitud) === 'pendiente').map((solicitud) => solicitud.aceptaEn);
      if (!momentos.length) return undefined;
      const espera = setTimeout(refrescar, Math.max(0, Math.min(...momentos) - Date.now()));
      return () => clearTimeout(espera);
    },
  };
}

export function perfil() {
  const { usuario } = estado;
  const persona = {
    nombre: `${usuario.nombre} ${usuario.apellido}`,
    iniciales: inicialesDe(usuario),
    tono: 40,
    carrera: usuario.carrera,
    desde: usuario.anioIngreso,
  };
  return {
    titulo: 'Mi perfil',
    conNavegacion: true,
    sinCabecera: true,
    cuerpo: html`<h1 class="titulo-pagina" tabindex="-1">Mi perfil</h1>
      ${credencial(persona, { vivo: true })}
      <section class="tarjeta-seccion"><h2>Tu privacidad</h2><p class="bajada">Tu correo no se muestra a otros estudiantes.</p></section>
      <button class="btn btn-sutil" id="salir">Cerrar sesión</button>`,
    montar(raiz) {
      const reloj = raiz.querySelector('[data-reloj]');
      const pintar = () => { reloj.textContent = new Date().toLocaleTimeString('es-AR', { hour12: false }); };
      pintar();
      const intervalo = setInterval(pintar, 1000);
      raiz.querySelector('#salir').addEventListener('click', () => {
        estado.sesionActiva = false;
        guardar();
        navegar('#/');
      });
      return () => clearInterval(intervalo);
    },
  };
}

const opcionesComision = (materia, elegida = '') => html`<option value="">${materia ? 'Elegí una comisión' : 'Primero elegí la materia'}</option>
  ${comisionesDeMateria(materia).map(({ codigo, dia }) => html`<option value="${codigo}" ${codigo === elegida ? html`selected` : ''}>${codigo} · ${dia}</option>`)}`;

// Cada fila necesita su propio grupo de turnos, porque se elige uno solo.
let filasCreadas = 0;

const filaCursada = (materias, { materia = '', comision = '', turno = '' } = {}) => {
  filasCreadas += 1;
  return html`<li class="fila-cursada" data-fila>
  <label class="fila-cursada-materia"><span class="etiqueta">Materia</span>
    <select name="materia">
      <option value="">Elegí una materia</option>
      ${materias.map(({ id, nombre }) => html`<option value="${id}" ${id === materia ? html`selected` : ''}>${nombre}</option>`)}
    </select>
  </label>
  <label class="fila-cursada-comision"><span class="etiqueta">Comisión</span>
    <select name="comision" ${materia ? '' : html`disabled`}>${opcionesComision(materia, comision)}</select>
  </label>
  <fieldset class="turnos"><legend class="etiqueta">Turno</legend>
    <div class="turnos-opciones">${Object.entries(TURNOS).map(([id, texto]) => html`<label class="turno"><input type="radio" name="turno-${filasCreadas}" value="${id}" ${id === turno ? html`checked` : ''}><span>${icono('check')}${texto}</span></label>`)}</div>
  </fieldset>
  <button class="btn-quitar" type="button" data-quitar aria-label="Quitar esta materia">${icono('cerrar')}</button>
  <p class="error" hidden></p>
</li>`;
};

export function cursada() {
  const { usuario } = estado;
  const materias = materiasDeCarrera(usuario.carrera);
  const filas = usuario.cursada?.length ? usuario.cursada : [{}];
  return {
    titulo: 'Mi cursada',
    conNavegacion: true,
    sinCabecera: true,
    cuerpo: html`<h1 class="titulo-pagina" tabindex="-1">Mi cursada</h1>
      <p class="bajada">Cargá las materias que cursás este cuatrimestre, con su comisión y su turno. Así te mostramos primero a quienes cursan con vos.</p>
      ${!carreraPorNombre(usuario.carrera) && html`<p class="nota">${icono('libro')}Tu carrera no está en la lista, así que te mostramos todas las materias.</p>`}
      <form id="form" novalidate>
        <ul class="lista-filas-cursada" id="filas">${filas.map((fila) => filaCursada(materias, fila))}</ul>
        <button class="btn btn-secundario" type="button" id="agregar">${icono('mas')}Agregar otra materia</button>
        <button class="btn btn-primario">Guardar mi cursada</button>
      </form>
      <p class="nota">${icono('escudo')}Las demás personas solo ven si cursan juntos, no tu cursada completa.</p>`,
    montar(raiz) {
      const lista = raiz.querySelector('#filas');
      raiz.querySelector('#agregar').addEventListener('click', () => {
        lista.insertAdjacentHTML('beforeend', filaCursada(materias).toString());
        lista.lastElementChild.querySelector('select').focus();
      });
      lista.addEventListener('click', (evento) => {
        const fila = evento.target.closest('[data-quitar]')?.closest('[data-fila]');
        if (!fila) return;
        if (lista.children.length > 1) fila.remove();
        else fila.outerHTML = filaCursada(materias).toString();
      });
      lista.addEventListener('change', (evento) => {
        const fila = evento.target.closest('[data-fila]');
        if (!fila) return;
        fila.querySelector('.error').hidden = true;
        if (evento.target.name === 'materia') {
          const comision = fila.querySelector('[name=comision]');
          comision.innerHTML = opcionesComision(evento.target.value).toString();
          comision.disabled = !evento.target.value;
        }
      });
      raiz.querySelector('#form').addEventListener('submit', (evento) => {
        evento.preventDefault();
        const elementos = [...lista.children];
        const leidas = elementos.map((fila) => ({
          materia: fila.querySelector('[name=materia]').value,
          comision: fila.querySelector('[name=comision]').value,
          turno: fila.querySelector('input:checked')?.value ?? '',
        }));
        const usadas = leidas.map((fila, i) => [fila, elementos[i]]).filter(([fila]) => fila.materia || fila.comision || fila.turno);
        const errores = validarCursada(usadas.map(([fila]) => fila));
        usadas.forEach(([, elemento], i) => {
          const parrafo = elemento.querySelector('.error');
          parrafo.hidden = !errores[i];
          parrafo.textContent = errores[i] ?? '';
        });
        if (errores.some(Boolean)) {
          track('error_validacion', { campo: 'cursada' });
          return;
        }
        usuario.cursada = usadas.map(([fila]) => fila);
        track('cursada', { materias: usuario.cursada.length });
        guardar();
        refrescar();
        aviso(usuario.cursada.length ? 'Guardamos tu cursada.' : 'Tu cursada quedó vacía.');
      });
    },
  };
}

// Pantalla interna del equipo para la prueba: no tiene enlaces desde la aplicación.
export function sesion() {
  const resumen = resumenSesion();
  return {
    titulo: 'Sesión de prueba',
    volver: '#/',
    cuerpo: html`<h1 tabindex="-1">Registro de la sesión</h1>
      <p class="bajada">Solo para el equipo. No registra nombres ni correos.</p>
      <form id="form">
        <div class="campo"><label class="etiqueta" for="participante">Participante</label>
          <select id="participante">
            ${['', 'U1', 'U2', 'U3'].map((valor) => html`<option value="${valor}" ${estado.participante === valor ? html`selected` : ''}>${valor || 'Elegir…'}</option>`)}
          </select>
        </div>
      </form>
      <pre class="resumen-sesion">${JSON.stringify(resumen, null, 2)}</pre>
      <button class="btn btn-primario" id="descargar">Descargar registro</button>
      <button class="btn btn-sutil btn-peligro-texto" id="reiniciar">Borrar todo y preparar otra sesión</button>`,
    montar(raiz) {
      raiz.querySelector('#participante').addEventListener('change', (evento) => {
        estado.participante = evento.target.value;
        guardar();
        refrescar();
      });
      raiz.querySelector('#descargar').addEventListener('click', () => {
        const contenido = JSON.stringify({ resumen: resumenSesion(), eventos: estado.eventos }, null, 2);
        const enlace = document.createElement('a');
        enlace.href = URL.createObjectURL(new Blob([contenido], { type: 'application/json' }));
        enlace.download = `eventos-${estado.participante || 'sin-participante'}.json`;
        enlace.click();
        URL.revokeObjectURL(enlace.href);
      });
      raiz.querySelector('#reiniciar').addEventListener('click', async () => {
        const seguro = await confirmar({
          titulo: '¿Borrar todo?',
          texto: 'Se borran la cuenta, los viajes y el registro de esta sesión. Descargá el registro antes.',
          aceptar: 'Borrar todo',
          peligro: true,
        });
        if (seguro) {
          reiniciarTodo();
          navegar('#/');
        }
      });
    },
  };
}
