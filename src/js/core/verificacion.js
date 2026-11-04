import {
  ANIO_FUNDACION_UNLAM,
  ARCHIVO_MAX_BYTES,
  ARCHIVO_TIPOS,
  CODIGO_DURACION_MS,
  CODIGO_MAX_INTENTOS,
  DOMINIOS_INSTITUCIONALES,
} from './config.js';

const FORMATO_EMAIL = /^[a-z0-9._%+-]+@[a-z0-9.-]+$/;

export const normalizarEmail = (email) => String(email ?? '').trim().toLowerCase();

/** Compara el dominio completo: `x@unlam.edu.ar.falso.com` no pasa. */
export function validarEmailInstitucional(email) {
  const valor = normalizarEmail(email);
  if (!valor) return 'Ingresá tu correo institucional.';
  if (!FORMATO_EMAIL.test(valor)) return 'Revisá el formato del correo.';
  const dominio = valor.split('@')[1];
  if (!DOMINIOS_INSTITUCIONALES.includes(dominio)) {
    return 'Tiene que ser tu correo de la UNLaM (termina en unlam.edu.ar).';
  }
  return null;
}

export function validarArchivo(archivo) {
  if (!archivo) return 'Adjuntá el archivo.';
  if (!ARCHIVO_TIPOS.includes(archivo.type)) return 'Tiene que ser PDF, JPG o PNG.';
  if (archivo.size <= 0) return 'El archivo está vacío.';
  if (archivo.size > ARCHIVO_MAX_BYTES) return 'El archivo supera los 5 MB.';
  return null;
}

export function validarNombre(valor, campo) {
  const limpio = String(valor ?? '').trim();
  if (limpio.length < 2) return `Ingresá tu ${campo}.`;
  if (!/^[\p{L}][\p{L} .'-]*$/u.test(limpio)) return `Revisá tu ${campo}.`;
  return null;
}

export function validarAnioIngreso(anio, ahora = new Date()) {
  const numero = Number(anio);
  if (!Number.isInteger(numero)) return 'Ingresá el año en que empezaste.';
  if (numero < ANIO_FUNDACION_UNLAM || numero > ahora.getFullYear()) {
    return `Tiene que estar entre ${ANIO_FUNDACION_UNLAM} y ${ahora.getFullYear()}.`;
  }
  return null;
}

export function enteroAleatorio(minimo, maximo) {
  const [valor] = globalThis.crypto.getRandomValues(new Uint32Array(1));
  return minimo + (valor % (maximo - minimo + 1));
}

export function crearCodigo(ahora = Date.now()) {
  return { valor: String(enteroAleatorio(100000, 999999)), venceEn: ahora + CODIGO_DURACION_MS, intentos: 0 };
}

/** Devuelve el resultado y el código actualizado; sin más intentos, el código deja de servir. */
export function comprobarCodigo(codigo, ingresado, ahora = Date.now()) {
  if (!codigo) return { ok: false, error: 'Pedí un código nuevo.', codigo: null };
  if (ahora > codigo.venceEn) return { ok: false, error: 'El código venció. Pedí uno nuevo.', codigo: null };
  if (String(ingresado ?? '').trim() === codigo.valor) return { ok: true, error: null, codigo: null };
  const intentos = codigo.intentos + 1;
  if (intentos >= CODIGO_MAX_INTENTOS) {
    return { ok: false, error: 'Demasiados intentos. Pedí un código nuevo.', codigo: null };
  }
  const restantes = CODIGO_MAX_INTENTOS - intentos;
  return {
    ok: false,
    error: `Código incorrecto. Te ${restantes === 1 ? 'queda 1 intento' : `quedan ${restantes} intentos`}.`,
    codigo: { ...codigo, intentos },
  };
}

// La revisión se simula (TP3): el estado se deriva del tiempo para sobrevivir a una recarga.
export function estadoRevision(documento, ahora = Date.now()) {
  if (!documento) return 'faltante';
  return ahora >= documento.apruebaEn ? 'aprobado' : 'en_revision';
}

/** Puede buscar y pedir un lugar: correo confirmado y certificado aprobado. */
export function puedeViajar(usuario, ahora = Date.now()) {
  return Boolean(usuario?.emailVerificado && estadoRevision(usuario.certificado, ahora) === 'aprobado');
}
