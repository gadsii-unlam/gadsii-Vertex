// Etiqueta de coincidencia con la cursada (corrección del TP4-B). Sin integración con
// SIU Guaraní (excluida en el TP3), cada estudiante elige su carrera de una lista y
// después carga las materias de esa carrera que cursa, con su comisión y su turno.
export const TURNOS = { manana: 'Mañana', tarde: 'Tarde', noche: 'Noche' };

export const MATERIAS = {
  am1: 'Análisis Matemático I',
  am2: 'Análisis Matemático II',
  alg: 'Álgebra y Geometría Analítica',
  fis1: 'Física I',
  fis2: 'Física II',
  prog1: 'Programación I',
  prog2: 'Programación Avanzada',
  bd: 'Bases de Datos',
  so: 'Sistemas Operativos',
  is: 'Ingeniería de Software',
  gads: 'Gestión Aplicada al Desarrollo de Software II',
  ele: 'Electrotecnia',
  dig: 'Sistemas Digitales',
  proc: 'Procesos Industriales',
  inv: 'Investigación Operativa',
  est: 'Estructuras',
  mat: 'Matemática I',
  cont: 'Contabilidad Básica',
  adm: 'Administración General',
  eco: 'Economía',
  imp: 'Impuestos',
  cex: 'Comercio Exterior',
  log: 'Logística Internacional',
  der1: 'Derecho Civil I',
  derp: 'Derecho Penal I',
  dcons: 'Derecho Constitucional',
  ing: 'Inglés',
};

export const CARRERAS = [
  { nombre: 'Ingeniería Informática', materias: ['am1', 'am2', 'alg', 'fis1', 'prog1', 'prog2', 'bd', 'so', 'is', 'gads', 'ing'] },
  { nombre: 'Ingeniería Electrónica', materias: ['am1', 'am2', 'alg', 'fis1', 'fis2', 'ele', 'dig', 'prog1', 'ing'] },
  { nombre: 'Ingeniería Industrial', materias: ['am1', 'am2', 'alg', 'fis1', 'fis2', 'proc', 'inv', 'eco', 'ing'] },
  { nombre: 'Ingeniería Civil', materias: ['am1', 'am2', 'alg', 'fis1', 'fis2', 'est', 'ing'] },
  { nombre: 'Contador Público', materias: ['mat', 'cont', 'adm', 'eco', 'imp', 'ing'] },
  { nombre: 'Licenciatura en Administración', materias: ['mat', 'cont', 'adm', 'eco', 'ing'] },
  { nombre: 'Licenciatura en Comercio Internacional', materias: ['mat', 'cont', 'eco', 'cex', 'log', 'ing'] },
  { nombre: 'Abogacía', materias: ['der1', 'derp', 'dcons', 'eco', 'ing'] },
];

export const carreraPorNombre = (nombre) => CARRERAS.find((carrera) => carrera.nombre === nombre) ?? null;

/** Las materias que puede elegir quien estudia esa carrera. Sin carrera conocida, todas. */
export function materiasDeCarrera(nombre) {
  const ids = carreraPorNombre(nombre)?.materias ?? Object.keys(MATERIAS);
  return ids.map((id) => ({ id, nombre: MATERIAS[id] }));
}

// Comisiones precargadas. El primer número del código es el día: 1900 es lunes, 2900 martes
// y así hasta 5900, viernes. No todas las materias se dictan todos los días.
export const DIAS = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

const DIAS_DE_MATERIA = {
  am1: [1, 4], am2: [1, 3], alg: [2, 5], fis1: [2], fis2: [1, 4], prog1: [3], prog2: [4],
  bd: [2], so: [2, 5], is: [3], gads: [5], ele: [3], dig: [4], proc: [1], inv: [3], est: [2, 4],
  mat: [1, 3], cont: [2, 4], adm: [4], eco: [5], imp: [3], cex: [5], log: [2],
  der1: [3], derp: [1, 4], dcons: [2], ing: [1, 2, 3, 4, 5],
};

export const comisionesDeMateria = (materia) =>
  (DIAS_DE_MATERIA[materia] ?? []).map((dia) => ({ codigo: `${dia}900`, dia: DIAS[dia] }));

const diaDeComision = (codigo) => Number(String(codigo)[0]);

/** Cada fila necesita materia, comisión y turno, y una materia no se repite. */
export function validarCursada(filas) {
  const vistas = new Set();
  return filas.map((fila) => {
    const repetida = vistas.has(fila.materia);
    vistas.add(fila.materia);
    if (!MATERIAS[fila.materia]) return 'Elegí una materia.';
    if (repetida) return 'Ya cargaste esta materia.';
    if (!comisionesDeMateria(fila.materia).some(({ codigo }) => codigo === fila.comision)) return 'Elegí una comisión.';
    if (!TURNOS[fila.turno]) return 'Elegí un turno.';
    return null;
  });
}

/**
 * La materia que cursan los dos en la misma comisión y el mismo turno el día del
 * viaje, o null. Sin fecha, cualquier día.
 */
export function cursadaCompartida(delPasajero = [], delConductor = [], fecha = null) {
  const dia = fecha ? new Date(`${fecha}T12:00:00`).getDay() : null;
  for (const propia of delPasajero ?? []) {
    if (dia !== null && diaDeComision(propia.comision) !== dia) continue;
    const comun = (delConductor ?? []).some((fila) =>
      fila.materia === propia.materia && fila.comision === propia.comision && fila.turno === propia.turno);
    if (comun) {
      return { materia: MATERIAS[propia.materia], comision: propia.comision, dia: DIAS[diaDeComision(propia.comision)], turno: TURNOS[propia.turno] };
    }
  }
  return null;
}
