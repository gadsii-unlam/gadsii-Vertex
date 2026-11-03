// Componente de software propio del producto: decide qué viajes le sirven a un
// pasajero y en qué orden se los muestra.
import { VENTANA_HORARIA_MIN } from './config.js';
import { cursadaCompartida } from './cursada.js';

export const aMinutos = (hora) => {
  const [horas, minutos] = String(hora).split(':').map(Number);
  return horas * 60 + minutos;
};

export const aHora = (minutos) => {
  const total = ((minutos % 1440) + 1440) % 1440;
  return `${String(Math.floor(total / 60)).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`;
};

/** El pasajero que pide un tramo puede usar un viaje de ida y vuelta, pero no al revés. */
export function tipoCompatible(tipoPasajero, tipoViaje) {
  return tipoViaje === 'ida_vuelta' || tipoPasajero === tipoViaje;
}

function diferenciaHoraria(busqueda, viaje) {
  const diferencias = [];
  if (busqueda.tipo !== 'vuelta') diferencias.push(aMinutos(viaje.horaIda) - aMinutos(busqueda.horaIda));
  if (busqueda.tipo !== 'ida') diferencias.push(aMinutos(viaje.horaVuelta) - aMinutos(busqueda.horaVuelta));
  return diferencias.reduce((peor, actual) => (Math.abs(actual) > Math.abs(peor) ? actual : peor), 0);
}

function puntuar({ diferencia, ventana, conductor }) {
  const horario = 70 * (1 - Math.abs(diferencia) / ventana);
  const calificacion = Math.max(0, Math.min(1, (conductor.calificacion - 3.5) / 1.5));
  const experiencia = Math.min(1, conductor.viajes / 20);
  return Math.round(horario + 20 * calificacion + 10 * experiencia);
}

function describirHorario(diferencia) {
  if (diferencia === 0) return 'Justo a tu horario';
  const minutos = Math.abs(diferencia);
  return `Sale ${minutos} min ${diferencia < 0 ? 'antes' : 'después'}`;
}

/**
 * Devuelve los viajes compatibles, del mejor al peor. Un viaje entra solo si su
 * conductor está verificado, le quedan lugares y coincide en sentido, localidad
 * y horario. El recorrido es la localidad precargada: el TP3 excluye el cálculo de rutas.
 * Como pide la hipótesis, primero van quienes cursan con el pasajero ese día: misma materia, comisión y turno.
 */
export function buscarViajes(viajes, conductores, busqueda, ventana = VENTANA_HORARIA_MIN, cursada = []) {
  const resultados = [];
  for (const viaje of viajes) {
    const conductor = conductores[viaje.conductorId];
    if (!conductor?.verificado || viaje.lugaresLibres <= 0) continue;
    if (!tipoCompatible(busqueda.tipo, viaje.tipo) || viaje.localidad !== busqueda.localidad) continue;
    const diferencia = diferenciaHoraria(busqueda, viaje);
    if (Math.abs(diferencia) > ventana) continue;
    const compartida = cursadaCompartida(cursada, conductor.cursada, busqueda.fecha);
    resultados.push({
      viaje,
      conductor,
      diferencia,
      cursada: compartida,
      puntaje: puntuar({ diferencia, ventana, conductor }),
      motivos: [compartida && `Cursan juntos ${compartida.materia}`, describirHorario(diferencia), 'Hace tu recorrido'].filter(Boolean),
    });
  }
  return resultados.sort((a, b) =>
    Boolean(b.cursada) - Boolean(a.cursada) || b.puntaje - a.puntaje || Math.abs(a.diferencia) - Math.abs(b.diferencia));
}

export function nivelCoincidencia(puntaje) {
  if (puntaje >= 75) return 'Alta';
  if (puntaje >= 50) return 'Buena';
  return 'Posible';
}
