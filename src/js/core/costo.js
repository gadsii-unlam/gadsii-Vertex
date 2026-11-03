import { CONSUMO_KM_POR_LITRO, PRECIO_NAFTA_LITRO, REDONDEO_PESOS } from './config.js';

const redondear = (monto) => Math.round(monto / REDONDEO_PESOS) * REDONDEO_PESOS;

/** Costo de nafta de recorrer `km`, sin redondear. */
export function costoNafta(km) {
  if (!Number.isFinite(km) || km <= 0) throw new RangeError('La distancia debe ser mayor a 0');
  return (km / CONSUMO_KM_POR_LITRO) * PRECIO_NAFTA_LITRO;
}

/** Parte de cada persona, conductor incluido, al dividir la nafta en partes iguales. */
export function costoPorPersona(km, personas) {
  if (!Number.isInteger(personas) || personas < 1) throw new RangeError('Debe viajar al menos una persona');
  return redondear(costoNafta(km) / personas);
}

/**
 * El estimado que en el TP4 indica el conductor. Como en este MVP los viajes están
 * precargados (TP3), se precarga con esta cuenta en lugar de que alguien lo escriba.
 */
export function costoEstimado({ km, lugares }, tipo) {
  const tramos = tipo === 'ida_vuelta' ? 2 : 1;
  return costoPorPersona(km * tramos, lugares + 1);
}

export const pesos = (monto) => `$${Math.round(monto).toLocaleString('es-AR')}`;
