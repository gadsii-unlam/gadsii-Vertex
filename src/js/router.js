import { estadoRevision, puedeViajar } from './core/verificacion.js';
import { estado, track } from './store.js';
import { html, icono } from './ui.js';
import * as acceso from './views/acceso.js';
import * as generales from './views/generales.js';
import * as viajar from './views/viajar.js';

const RUTAS = [
  ['/', acceso.bienvenida, 'publica'],
  ['/ingresar', acceso.ingresar, 'publica'],
  ['/codigo', acceso.codigo, 'publica'],
  ['/_sesion', generales.sesion, 'libre'],
  ['/viajes', generales.viajes, 'verificada'],
  ['/perfil', generales.perfil, 'verificada'],
  ['/cursada', generales.cursada, 'verificada'],
  ['/buscar', viajar.buscar, 'verificada'],
  ['/resultados', viajar.resultados, 'verificada'],
  ['/viaje/:id', viajar.viaje, 'verificada'],
  ['/confirmar/:id', viajar.confirmarViaje, 'verificada'],
  ['/pase/:id', viajar.pase, 'verificada'],
];

function resolver(ruta) {
  for (const [patron, vista, acceso_] of RUTAS) {
    const nombres = [];
    const expresion = new RegExp(`^${patron.replace(/:(\w+)/g, (_, nombre) => { nombres.push(nombre); return '([^/]+)'; })}$`);
    const coincidencia = ruta.match(expresion);
    if (coincidencia) {
      return { vista, acceso: acceso_, parametros: Object.fromEntries(nombres.map((nombre, i) => [nombre, decodeURIComponent(coincidencia[i + 1])])) };
    }
  }
  return null;
}

/** Las verificaciones se exigen acá, así que escribir una dirección a mano no las saltea. */
function controlDeAcceso(tipo) {
  if (tipo === 'libre') return null;
  const logueado = estado.sesionActiva && estado.usuario;
  if (tipo === 'publica') return logueado ? '#/buscar' : null;
  if (!logueado) return '#/';
  const { usuario } = estado;
  if (!usuario.nombre) return acceso.datos;
  if (estadoRevision(usuario.certificado) === 'faltante' || !puedeViajar(usuario)) return acceso.certificado;
  return null;
}

let limpiarVista = null;
let rutaAnterior = null;

const navegacion = (ruta) => html`<nav class="navegacion" aria-label="Principal">
  <span class="navegacion-marca">UNLaM Carpool</span>
  ${[['#/buscar', 'pin', 'Buscar', '/buscar'], ['#/viajes', 'ticket', 'Mis viajes', '/viajes'], ['#/cursada', 'libro', 'Mi cursada', '/cursada'], ['#/perfil', 'persona', 'Perfil', '/perfil']].map(([destino, nombre, texto, actual]) => html`<a href="${destino}" ${ruta === actual ? html`aria-current="page"` : ''}>${icono(nombre)}<span>${texto}</span></a>`)}
</nav>`;

const cabecera = (vista) => html`<header class="cabecera">
  ${vista.volver ? html`<a class="cabecera-boton" href="${vista.volver}" data-evento="volver">${icono('atras')}<span>Volver</span></a>` : html`<span></span>`}
  <p>${vista.titulo}</p>
  ${vista.cancelar ? html`<a class="cabecera-boton cabecera-cancelar" href="${vista.cancelar}" data-evento="cancelar_flujo">Cancelar</a>` : html`<span></span>`}
</header>`;

const reducirMovimiento = matchMedia('(prefers-reduced-motion: reduce)');
let finEntrada;

// Credencial que se inclina siguiendo el mouse (solo con puntero real y sin "reducir movimiento").
if (matchMedia('(hover: hover)').matches) {
  document.addEventListener('pointermove', (evento) => {
    const tarjeta = evento.target.closest?.('.credencial');
    document.querySelectorAll('.credencial.inclinada').forEach((otra) => {
      if (otra !== tarjeta) {
        otra.classList.remove('inclinada');
        otra.style.removeProperty('--rx');
        otra.style.removeProperty('--ry');
      }
    });
    if (!tarjeta || reducirMovimiento.matches) return;
    const caja = tarjeta.getBoundingClientRect();
    const x = (evento.clientX - caja.left) / caja.width - 0.5;
    const y = (evento.clientY - caja.top) / caja.height - 0.5;
    tarjeta.classList.add('inclinada');
    tarjeta.style.setProperty('--rx', `${(-y * 8).toFixed(2)}deg`);
    tarjeta.style.setProperty('--ry', `${(x * 10).toFixed(2)}deg`);
  });
}

// Orden del flujo de búsqueda: ir a un paso anterior desliza la transición hacia atrás.
const ORDEN_FLUJO = ['/buscar', '/resultados', '/viaje', '/confirmar', '/pase'];
let pasoAnterior = -1;
function esVolver(ruta) {
  const paso = ORDEN_FLUJO.findIndex((inicio) => ruta === inicio || ruta.startsWith(`${inicio}/`));
  const volver = paso !== -1 && pasoAnterior !== -1 && paso < pasoAnterior;
  pasoAnterior = paso;
  return volver;
}

export function navegar(destino) {
  if (location.hash === destino) renderizar();
  else location.hash = destino;
}

export const refrescar = () => renderizar();

export function renderizar() {
  const ruta = location.hash.slice(1) || '/';
  const encontrada = resolver(ruta);
  if (!encontrada) {
    navegar('#/');
    return;
  }
  const control = controlDeAcceso(encontrada.acceso);
  if (typeof control === 'string') {
    navegar(control);
    return;
  }
  const crearVista = control ?? encontrada.vista;
  const vista = crearVista(encontrada.parametros);
  if (vista.redirigir) {
    navegar(vista.redirigir);
    return;
  }
  limpiarVista?.();
  limpiarVista = null;
  const cambioDeRuta = ruta !== rutaAnterior;
  const primeraVez = rutaAnterior === null;
  const volviendo = esVolver(ruta);
  rutaAnterior = ruta;
  const raiz = document.getElementById('app');
  const pintar = () => {
    raiz.className = `app ${vista.conNavegacion ? 'con-navegacion' : ''} ${vista.conPieFijo ? 'con-pie-fijo' : ''} ${cambioDeRuta ? 'entrando' : ''}`;
    // La cascada de entrada se reproduce solo al llegar; un refresco de la misma pantalla no la repite.
    clearTimeout(finEntrada);
    if (cambioDeRuta) finEntrada = setTimeout(() => raiz.classList.remove('entrando'), 1400);
    raiz.innerHTML = html`${!vista.sinCabecera && cabecera(vista)}<main id="contenido">${vista.cuerpo}</main>${vista.conNavegacion && navegacion(ruta)}`.toString();
    document.title = `${vista.titulo} · UNLaM Carpool`;
    limpiarVista = vista.montar?.(raiz) ?? null;
    if (cambioDeRuta) {
      window.scrollTo(0, 0);
      raiz.querySelector('h1')?.focus({ preventScroll: true });
      if (ruta !== '/_sesion') track('pantalla', { ruta: ruta.replace(/\/[a-z]\w{6,}$/, '/:id') });
    }
  };
  // Cambio de pantalla con View Transitions: la vieja se va y la nueva entra (ver "Animaciones" en app.css).
  // Sin soporte o con "reducir movimiento", se pinta directo.
  if (cambioDeRuta && !primeraVez && document.startViewTransition && !reducirMovimiento.matches) {
    document.documentElement.dataset.direccion = volviendo ? 'atras' : 'adelante';
    document.startViewTransition(pintar);
  } else {
    pintar();
  }
}

document.addEventListener('click', (evento) => {
  const enlace = evento.target.closest('[data-evento]');
  if (enlace) track(enlace.dataset.evento, { desde: location.hash.slice(1) });
});
const limpiarError = (evento) => {
  const contenedor = evento.target.closest?.('[data-campo]');
  if (!contenedor) return;
  const parrafo = contenedor.querySelector('.error');
  if (parrafo) parrafo.hidden = true;
  evento.target.removeAttribute('aria-invalid');
};
document.addEventListener('input', limpiarError);
document.addEventListener('change', limpiarError);
window.addEventListener('hashchange', renderizar);
