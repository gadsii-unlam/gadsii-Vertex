import { buscarLocalidad } from './localidades.js';
import { aMinutos } from './matching.js';

const iso = (fecha) =>
  `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, '0')}-${String(fecha.getDate()).padStart(2, '0')}`;

export const fechaIso = iso;

export function fechasDisponibles(ahora = new Date()) {
  return [0, 1, 2, 3].map((offset) => {
    const fecha = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate() + offset);
    const dia = fecha.toLocaleDateString('es-AR', { weekday: 'short' }).replace('.', '');
    return {
      iso: iso(fecha),
      etiqueta: offset === 0 ? 'Hoy' : offset === 1 ? 'Mañana' : dia[0].toUpperCase() + dia.slice(1),
      numero: fecha.getDate(),
    };
  });
}

export function fechaLegible(valor) {
  const fecha = new Date(`${valor}T12:00:00`);
  const texto = fecha.toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' });
  return texto[0].toUpperCase() + texto.slice(1);
}

/** Errores por campo de una búsqueda. Vacío significa que es válida. */
export function validarRecorrido({ tipo, localidad, fecha, horaIda, horaVuelta }, ahora = new Date()) {
  const errores = {};
  if (!localidad) errores.localidad = 'Indicá la localidad.';
  else if (!buscarLocalidad(localidad)) errores.localidad = 'Elegí una localidad de la lista.';

  const usaIda = tipo !== 'vuelta';
  const usaVuelta = tipo !== 'ida';
  if (usaIda && !horaIda) errores.horaIda = 'Indicá el horario.';
  if (usaVuelta && !horaVuelta) errores.horaVuelta = 'Indicá el horario.';

  if (fecha === iso(ahora)) {
    const minutosAhora = ahora.getHours() * 60 + ahora.getMinutes();
    const mensaje = 'Ese horario ya pasó. Elegí uno más tarde u otro día.';
    if (usaIda && horaIda && aMinutos(horaIda) < minutosAhora) errores.horaIda = mensaje;
    if (!usaIda && usaVuelta && horaVuelta && aMinutos(horaVuelta) < minutosAhora) errores.horaVuelta = mensaje;
  }
  if (tipo === 'ida_vuelta' && horaIda && horaVuelta && aMinutos(horaVuelta) <= aMinutos(horaIda)) {
    errores.horaVuelta = 'La vuelta tiene que ser después de la ida.';
  }
  return errores;
}
