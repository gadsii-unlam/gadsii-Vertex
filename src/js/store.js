import { DEMORA_ACEPTACION_MS, DEMORA_REVISION_MS } from './core/config.js';
import { enteroAleatorio, puedeViajar } from './core/verificacion.js';
import { CONDUCTORES, VIAJES } from './data.js';

const CLAVE = 'unlam-carpool-scope-v1';

const estadoInicial = () => ({
  sesionActiva: false,
  usuario: null,
  emailPendiente: null,
  codigo: null,
  busqueda: null,
  viajes: structuredClone(VIAJES),
  solicitudes: [],
  participante: '',
  eventos: [],
});

function cargar() {
  try {
    const guardado = localStorage.getItem(CLAVE);
    return guardado ? { ...estadoInicial(), ...JSON.parse(guardado) } : estadoInicial();
  } catch {
    return estadoInicial();
  }
}

export let estado = cargar();

export function guardar() {
  try {
    localStorage.setItem(CLAVE, JSON.stringify(estado));
  } catch {
    // Sin almacenamiento la sesión sigue funcionando en memoria.
  }
}

export function reiniciarTodo() {
  estado = estadoInicial();
  guardar();
}

export function track(evento, datos = {}) {
  estado.eventos.push({ ...datos, t: Date.now(), evento });
  guardar();
}

const nuevoId = (prefijo) => `${prefijo}${Date.now().toString(36)}${enteroAleatorio(100, 999)}`;

export const viajePorId = (id) => estado.viajes.find((viaje) => viaje.id === id) ?? null;
export const solicitudPorId = (id) => estado.solicitudes.find((solicitud) => solicitud.id === id) ?? null;

export const conductorDe = (viaje) => CONDUCTORES[viaje.conductorId];

export const inicialesDe = (usuario) => `${usuario.nombre[0]}${usuario.apellido[0]}`.toUpperCase();

export function crearOContinuarCuenta(email) {
  if (estado.usuario?.email !== email) {
    estado.usuario = { email, emailVerificado: true };
    estado.solicitudes = [];
    estado.viajes = structuredClone(VIAJES);
  }
  estado.usuario.emailVerificado = true;
  estado.sesionActiva = true;
  estado.codigo = null;
  estado.emailPendiente = null;
  guardar();
}

/** El archivo no se guarda ni sale del navegador: solo se conservan su nombre, tipo y tamaño. */
export function enviarCertificado(archivo) {
  estado.usuario.certificado = { archivo: archivo.name, tipo: archivo.type, tamano: archivo.size, enviadoEn: Date.now(), apruebaEn: Date.now() + DEMORA_REVISION_MS };
  track('certificado_enviado');
}

export function solicitudActivaDe(viajeId) {
  return estado.solicitudes.find((solicitud) => solicitud.viajeId === viajeId && !solicitud.canceladaEn) ?? null;
}

export function solicitarLugar(viajeId, tipo, fecha) {
  const viaje = viajePorId(viajeId);
  if (!puedeViajar(estado.usuario)) throw new Error('Tenés que estar verificado para solicitar un lugar.');
  if (!viaje) throw new Error('Este viaje ya no está disponible.');
  if (solicitudActivaDe(viajeId)) throw new Error('Ya tenés una solicitud para este viaje.');
  if (viaje.lugaresLibres <= 0) throw new Error('Este viaje ya no tiene lugares.');
  viaje.lugaresLibres -= 1;
  const ahora = Date.now();
  const solicitud = {
    id: nuevoId('s'),
    viajeId,
    tipo,
    fecha,
    creadaEn: ahora,
    aceptaEn: ahora + DEMORA_ACEPTACION_MS,
    canceladaEn: null,
  };
  estado.solicitudes.push(solicitud);
  track('solicitud', { viajeId, tipo, conductorId: viaje.conductorId });
  return solicitud;
}

export function cancelarSolicitud(id) {
  const solicitud = solicitudPorId(id);
  if (!solicitud || solicitud.canceladaEn) return;
  solicitud.canceladaEn = Date.now();
  viajePorId(solicitud.viajeId).lugaresLibres += 1;
  track('solicitud_cancelada', { viajeId: solicitud.viajeId });
}

export const estadoSolicitud = (solicitud, ahora = Date.now()) => {
  if (solicitud.canceladaEn) return 'cancelada';
  return ahora >= solicitud.aceptaEn ? 'confirmada' : 'pendiente';
};

export function resumenSesion() {
  const { eventos, participante } = estado;
  const primero = (nombre) => eventos.find(({ evento }) => evento === nombre)?.t ?? null;
  const cuantos = (nombre) => eventos.filter(({ evento }) => evento === nombre).length;
  const inicio = eventos[0]?.t ?? null;
  const segundos = (nombre) => (primero(nombre) && inicio ? Math.round((primero(nombre) - inicio) / 1000) : null);
  return {
    participante,
    inicio: inicio ? new Date(inicio).toISOString() : null,
    segundosHastaPrimeraBusqueda: segundos('busqueda'),
    segundosHastaPrimeraSolicitud: segundos('solicitud'),
    perfilesDeConductorAbiertos: cuantos('perfil_conductor'),
    busquedas: cuantos('busqueda'),
    busquedasSinResultados: cuantos('sin_resultados'),
    solicitudes: cuantos('solicitud'),
    solicitudesCanceladas: cuantos('solicitud_cancelada'),
    erroresDeValidacion: cuantos('error_validacion'),
    vecesQueVolvio: cuantos('volver'),
    vecesQueCancelo: cuantos('cancelar_flujo'),
  };
}
