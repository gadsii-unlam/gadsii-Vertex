import { buscarLocalidad } from './core/localidades.js';

// Datos precargados de la prueba (TP3): personas, autos, patentes y cursadas son ficticios.
export const CONDUCTORES = {
  juan: {
    nombre: 'Juan Rodríguez', iniciales: 'JR', tono: 28, carrera: 'Ingeniería Informática', desde: 2022,
    verificado: true, calificacion: 4.8, viajes: 15, verificadoEl: 'marzo de 2026',
    vehiculo: { marca: 'Ford', modelo: 'Fiesta', color: 'Blanco', anio: 2018, patente: 'AC482KD' },
    telefono: '+54 9 11 ••••-4821',
    cursada: [{ materia: 'am2', comision: '1900', turno: 'noche' }, { materia: 'bd', comision: '2900', turno: 'noche' }, { materia: 'is', comision: '3900', turno: 'noche' }],
    referencias: [
      { autor: 'Sofía M.', estrellas: 5, texto: 'Conductor muy responsable. Me esperó en la estación como quedamos.', cuando: 'Hace 3 días', desde: 'San Antonio de Padua' },
      { autor: 'Tomás L.', estrellas: 5, texto: 'Llegué a tiempo a la cursada y maneja tranquilo.', cuando: 'Hace 1 semana', desde: 'Merlo' },
      { autor: 'Ayelén R.', estrellas: 4, texto: 'Muy seguro. A la vuelta me dejó cerca de casa.', cuando: 'Hace 2 semanas', desde: 'San Antonio de Padua' },
    ],
  },
  marina: {
    nombre: 'Marina García', iniciales: 'MG', tono: 330, carrera: 'Licenciatura en Comercio Internacional', desde: 2023,
    verificado: true, calificacion: 5, viajes: 8, verificadoEl: 'abril de 2026',
    vehiculo: { marca: 'Volkswagen', modelo: 'Gol Trend', color: 'Gris', anio: 2017, patente: 'AB317FH' },
    telefono: '+54 9 11 ••••-7316',
    cursada: [{ materia: 'cont', comision: '2900', turno: 'noche' }, { materia: 'cex', comision: '5900', turno: 'noche' }],
    referencias: [
      { autor: 'Lucía P.', estrellas: 5, texto: 'Súper puntual. Avisa si hay tránsito antes de salir.', cuando: 'Hace 4 días', desde: 'San Antonio de Padua' },
      { autor: 'Nicolás V.', estrellas: 5, texto: 'Volver de noche con ella fue un alivio.', cuando: 'Hace 2 semanas', desde: 'Ituzaingó' },
    ],
  },
  bruno: {
    nombre: 'Bruno Ferreyra', iniciales: 'BF', tono: 205, carrera: 'Ingeniería Electrónica', desde: 2021,
    verificado: true, calificacion: 4.7, viajes: 23, verificadoEl: 'febrero de 2026',
    vehiculo: { marca: 'Chevrolet', modelo: 'Onix', color: 'Negro', anio: 2020, patente: 'AE905RT' },
    telefono: '+54 9 11 ••••-2094',
    cursada: [{ materia: 'fis2', comision: '1900', turno: 'noche' }, { materia: 'am2', comision: '3900', turno: 'tarde' }],
    referencias: [
      { autor: 'Camila D.', estrellas: 5, texto: 'Salió justo a horario. Auto limpio y buena charla.', cuando: 'Hace 2 días', desde: 'Rafael Castillo' },
      { autor: 'Iván G.', estrellas: 4, texto: 'Todo bien, tuvimos que esperar un poco por la Ruta 3.', cuando: 'Hace 1 semana', desde: 'Gregorio de Laferrere' },
      { autor: 'Rocío T.', estrellas: 5, texto: 'Ya viajé varias veces, siempre cumple.', cuando: 'Hace 3 semanas', desde: 'Isidro Casanova' },
    ],
  },
  valentina: {
    nombre: 'Valentina Sosa', iniciales: 'VS', tono: 150, carrera: 'Abogacía', desde: 2024,
    verificado: true, calificacion: 4.9, viajes: 11, verificadoEl: 'marzo de 2026',
    vehiculo: { marca: 'Fiat', modelo: 'Cronos', color: 'Rojo', anio: 2021, patente: 'AF126LP' },
    telefono: '+54 9 11 ••••-6650',
    cursada: [{ materia: 'der1', comision: '3900', turno: 'noche' }],
    referencias: [
      { autor: 'Martina F.', estrellas: 5, texto: 'Me sentí muy tranquila volviendo tarde.', cuando: 'Hace 5 días', desde: 'Rafael Castillo' },
      { autor: 'Julián A.', estrellas: 5, texto: 'Muy clara con el punto de encuentro.', cuando: 'Hace 2 semanas', desde: 'Isidro Casanova' },
    ],
  },
  diego: {
    nombre: 'Diego Paz', iniciales: 'DP', tono: 262, carrera: 'Ingeniería Informática', desde: 2020,
    verificado: true, calificacion: 4.6, viajes: 31, verificadoEl: 'febrero de 2026',
    vehiculo: { marca: 'Renault', modelo: 'Sandero', color: 'Azul', anio: 2016, patente: 'PKD438' },
    telefono: '+54 9 11 ••••-1187',
    cursada: [{ materia: 'so', comision: '2900', turno: 'noche' }, { materia: 'prog2', comision: '4900', turno: 'noche' }],
    referencias: [
      { autor: 'Agustina C.', estrellas: 5, texto: 'Conoce bien el camino, llegamos antes.', cuando: 'Hace 1 semana', desde: 'Morón' },
      { autor: 'Franco H.', estrellas: 4, texto: 'Buen viaje, salió 5 minutos tarde.', cuando: 'Hace 2 semanas', desde: 'Castelar' },
    ],
  },
  carla: {
    nombre: 'Carla Benítez', iniciales: 'CB', tono: 55, carrera: 'Contador Público', desde: 2023,
    verificado: true, calificacion: 4.8, viajes: 6, verificadoEl: 'mayo de 2026',
    vehiculo: { marca: 'Toyota', modelo: 'Etios', color: 'Plateado', anio: 2019, patente: 'AD771VN' },
    telefono: '+54 9 11 ••••-3402',
    cursada: [{ materia: 'cont', comision: '4900', turno: 'noche' }, { materia: 'adm', comision: '4900', turno: 'noche' }],
    referencias: [
      { autor: 'Pilar S.', estrellas: 5, texto: 'Muy amable y puntual.', cuando: 'Hace 6 días', desde: 'Ramos Mejía' },
      { autor: 'Ezequiel M.', estrellas: 4, texto: 'Viaje tranquilo, volvería a viajar.', cuando: 'Hace 3 semanas', desde: 'Haedo' },
    ],
  },
};

const viaje = (id, conductorId, tipo, localidad, horaIda, horaVuelta, lugares, lugaresLibres, punto) => ({
  id, conductorId, tipo, localidad, km: buscarLocalidad(localidad).km, horaIda, horaVuelta, lugares, lugaresLibres, punto,
});

const PADUA = 'San Antonio de Padua';
const CASTILLO = 'Rafael Castillo';
const EST_PADUA = 'Estación San Antonio de Padua (Acceso Sur)';
const EST_CASTILLO = 'Estación Rafael Castillo';

export const VIAJES = [
  viaje('p1', 'juan', 'ida', PADUA, '19:45', null, 3, 2, EST_PADUA),
  viaje('p2', 'marina', 'ida', PADUA, '19:50', null, 3, 2, 'Plaza de Padua'),
  viaje('p3', 'diego', 'ida', PADUA, '17:40', null, 3, 1, EST_PADUA),
  viaje('p4', 'juan', 'ida_vuelta', PADUA, '18:15', '22:30', 3, 2, EST_PADUA),
  viaje('p5', 'marina', 'vuelta', PADUA, null, '22:15', 3, 3, EST_PADUA),
  viaje('p6', 'diego', 'vuelta', PADUA, null, '23:05', 4, 2, EST_PADUA),
  viaje('p7', 'juan', 'ida', PADUA, '07:30', null, 3, 2, EST_PADUA),
  viaje('p8', 'marina', 'vuelta', PADUA, null, '18:10', 3, 1, EST_PADUA),
  viaje('c1', 'bruno', 'ida', CASTILLO, '18:10', null, 3, 2, EST_CASTILLO),
  viaje('c2', 'valentina', 'ida', CASTILLO, '19:20', null, 3, 2, 'Plaza de Rafael Castillo'),
  viaje('c3', 'bruno', 'ida_vuelta', CASTILLO, '17:30', '22:10', 3, 1, EST_CASTILLO),
  viaje('c4', 'valentina', 'vuelta', CASTILLO, null, '22:20', 3, 3, EST_CASTILLO),
  viaje('c5', 'bruno', 'vuelta', CASTILLO, null, '23:00', 4, 2, EST_CASTILLO),
  viaje('c6', 'valentina', 'ida', CASTILLO, '07:45', null, 3, 2, EST_CASTILLO),
  viaje('m1', 'diego', 'ida_vuelta', 'Merlo', '18:00', '22:30', 3, 2, 'Estación Merlo'),
  viaje('i1', 'marina', 'ida_vuelta', 'Ituzaingó', '18:30', '22:15', 3, 2, 'Estación Ituzaingó'),
  viaje('o1', 'diego', 'ida_vuelta', 'Castelar', '18:20', '22:45', 3, 2, 'Estación Castelar'),
  viaje('o2', 'carla', 'ida_vuelta', 'Morón', '19:10', '22:30', 3, 3, 'Estación Morón'),
  viaje('h1', 'carla', 'ida_vuelta', 'Haedo', '18:40', '22:20', 3, 2, 'Estación Haedo'),
  viaje('r1', 'carla', 'ida_vuelta', 'Ramos Mejía', '18:30', '22:15', 3, 2, 'Estación Ramos Mejía'),
  viaje('l1', 'carla', 'ida_vuelta', 'Lomas del Mirador', '18:00', '22:10', 3, 2, 'Plaza de Lomas del Mirador'),
  viaje('e1', 'valentina', 'ida_vuelta', 'Ciudad Evita', '18:40', '22:30', 3, 2, 'Rotonda de Ciudad Evita'),
  viaje('k1', 'valentina', 'ida_vuelta', 'Isidro Casanova', '19:00', '22:40', 3, 2, 'Estación Isidro Casanova'),
  viaje('g1', 'bruno', 'ida_vuelta', 'Gregorio de Laferrere', '18:00', '22:30', 3, 2, 'Estación Gregorio de Laferrere'),
  viaje('n1', 'bruno', 'ida_vuelta', 'González Catán', '17:50', '23:00', 4, 2, 'Estación González Catán'),
  viaje('v1', 'bruno', 'ida_vuelta', 'Virrey del Pino', '17:30', '23:20', 4, 2, 'Ruta 3 km 39'),
];
