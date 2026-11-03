// Sin API de mapas (excluida en el TP3), las distancias a la UNLaM son aproximadas y
// precargadas. San Antonio de Padua y Rafael Castillo son las que informó el TP2.
export const UNLAM = 'UNLaM';
export const PUNTO_UNLAM = 'UNLaM, entrada principal (Florencio Varela 1903)';

export const LOCALIDADES = [
  { nombre: 'San Antonio de Padua', km: 14 },
  { nombre: 'Merlo', km: 17 },
  { nombre: 'Ituzaingó', km: 12 },
  { nombre: 'Castelar', km: 10 },
  { nombre: 'Morón', km: 8 },
  { nombre: 'Haedo', km: 7 },
  { nombre: 'Ramos Mejía', km: 6 },
  { nombre: 'Lomas del Mirador', km: 6 },
  { nombre: 'Ciudad Evita', km: 7 },
  { nombre: 'Isidro Casanova', km: 6 },
  { nombre: 'Rafael Castillo', km: 8 },
  { nombre: 'Gregorio de Laferrere', km: 9 },
  { nombre: 'González Catán', km: 13 },
  { nombre: 'Virrey del Pino', km: 18 },
];

const sinAcentos = (texto) =>
  String(texto ?? '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();

export const buscarLocalidad = (nombre) =>
  LOCALIDADES.find((localidad) => sinAcentos(localidad.nombre) === sinAcentos(nombre)) ?? null;

/** Sugerencias al escribir: ignora acentos y encuentra "padua" o "castillo". */
export function sugerirLocalidades(texto, limite = 5) {
  const consulta = sinAcentos(texto);
  if (!consulta) return LOCALIDADES.slice(0, limite);
  return LOCALIDADES.filter((localidad) => sinAcentos(localidad.nombre).includes(consulta)).slice(0, limite);
}

export const minutosDeViaje = (km) => Math.round(km * 3.2);
