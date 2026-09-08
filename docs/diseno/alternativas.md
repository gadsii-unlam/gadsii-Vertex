# Alternativas de diseño — TP3 Parte 2

## Alternativa A: Optimizada para Satisfacción (Confianza y Seguridad)

**Atributo privilegiado:** Satisfacción

**Estructura del flujo (6 pantallas):**

1. **Pantalla de Login** — Verificación de identidad como estudiante UNLaM. Correo institucional y certificado de alumno. Confirmación clara de que el usuario está verificado.

2. **Pantalla de Búsqueda** — Indicar origen, destino y horario aproximado de viaje. Campos separados y claros. Información de ayuda en cada campo. Opción de guardar origen habitual.

3. **Pantalla de Resultados Detallados** — Listado de viajes compatibles. Información básica del viaje (hora, recorrido). Información del conductor con foto, antigüedad en UNLaM. Badge de "Verificado" prominente. Resumen de calificación (promedio de viajes anteriores).

4. **Pantalla de Detalle del Conductor** — Información completa del conductor. Foto del perfil. Condición de estudiante verificado (con sello visual). Historial de viajes anteriores con referencias. Calificación detallada (cantidad de viajes, promedio, comentarios). Detalles del vehículo (marca, modelo, año).

5. **Pantalla de Confirmación del Viaje** — Detalles completos antes de solicitar. Información del viaje (ruta, horario, lugares disponibles). Información del conductor (foto pequeña, nombre, verificación). Resumen de referencias ("4.8★ en 12 viajes"). Opción de "Solicitar lugar" con confirmación.

6. **Pantalla de Solicitud Confirmada** — Resumen del viaje confirmado. Datos del conductor (contacto disponible). Datos del viaje. Punto de encuentro. Recordatorio de seguridad (viajando con estudiante UNLaM verificado).

**Por qué optimiza satisfacción:** Múltiples exposiciones a señales de confianza (verificación, referencias, historial). Información abundante y detallada del conductor antes de comprometerse. Cada paso transmite seguridad y reduce incertidumbre. Especialmente apropiada para usuarios como U1 y U3 que pidieron explícitamente "conocer" al conductor y ver referencias.

---

## Alternativa B: Optimizada para Eficiencia (Velocidad y Pocos Pasos)

**Atributo privilegiado:** Eficiencia

**Estructura del flujo (4 pantallas):**

1. **Pantalla de Login Integrada** — Login y búsqueda en una sola pantalla. Correo institucional pre-cargado si ya está registrado. Campos de origen, destino, horario debajo. Botón "Buscar" prominente. Opción de "Buscar ahora" sin completar todos los campos.

2. **Pantalla de Resultados Compactos** — Listado denso de opciones. Cada viaje en una tarjeta pequeña con información esencial. Hora, origen-destino, conductor (nombre + ⭐ calificación), lugares disponibles. Un toque abre el detalle sin navegar a otra pantalla (modal o expandible). Atajos: "Filtrar por cursada" visible.

3. **Pantalla de Detalle Rápido** — Modal con información necesaria. Foto del conductor, nombre, calificación, antigüedad en UNLaM. Ruta del viaje resumida. Botón "Solicitar lugar" directamente visible. Link a "Ver referencias completas" si quiere más detalles.

4. **Pantalla de Confirmación Inmediata** — Resumen mínimo y listo. Viaje confirmado: hora, conductor, punto de encuentro. Botón "Listo" para cerrar.

**Por qué optimiza eficiencia:** Menos pasos para llegar al objetivo (4 en lugar de 6). Información densa, sin navegaciones anidadas. Flujo lineal y directo. Apropiada para usuarios que ya confían en la plataforma o quieren resolver rápido (problema central del TP2: "espera y poca previsibilidad").

---

## Alternativa C: Optimizada para Prevención de Errores

**Atributo privilegiado:** Prevención de errores y confirmaciones seguras

**Estructura del flujo (7 pantallas):**

1. **Pantalla de Login con Validación** — Verificación en dos pasos. Ingreso de correo institucional. Ingreso de PIN o autenticación adicional. Confirmación visual de que está registrado y verificado.

2. **Pantalla de Búsqueda con Ayuda Integrada** — Campos con validación inmediata. Origen: sugerencias de lugares comunes (home, UNLaM). Destino: auto-completado. Horario: selector de hora con rango seguro. Validación: muestra error si falta información.

3. **Pantalla de Resultados con Filtros Controlados** — Resultados pre-validados. Solo viajes que son realmente compatibles se muestran. Opción de "Expandir búsqueda" si no hay resultados. Orden por defecto: confiabilidad primero (conductor con más viajes/mejor calificación).

4. **Pantalla de Revisión del Viaje Elegido** — Checklist de verificación. ¿El horario te conviene? Sí/No. ¿Confías en el conductor? Ver referencias. ¿El lugar de encuentro es seguro? Mapa. Validación: debe responder sí a todas antes de continuar.

5. **Pantalla de Información del Conductor Completa** — Datos para tomar decisión. Foto, nombre, antigüedad en UNLaM. Historial detallado: cantidad de viajes, promedio de calificación. Referencias específicas: "5⭐ Viajé el 05/09 desde San Antonio". Datos del vehículo verificados.

6. **Pantalla de Solicitud con Confirmación Explícita** — Confirmación doble. Resumen de lo que está a punto de hacer. Botón "Solicitar" y botón "Cancelar" igualmente visibles. Texto claro: "Al solicitar confirmas que viajarás con [Nombre del Conductor]".

7. **Pantalla de Solicitud Exitosa con Opciones Reversibles** — Confirmación con opciones. Solicitud confirmada. Botón "Cambiar de opinión" (cancela la solicitud). Datos del conductor y del viaje. Opción de contactar al conductor (chat simulado en MVP).

**Por qué optimiza prevención de errores:** Validaciones en cada paso evitan datos incompletos o inválidos. Confirmaciones explícitas antes de comprometerse. Información es revisada antes de actuar. Valores por defecto seguros (ordena por confiabilidad, no por primera opción). Acciones reversibles (cambiar de opinión). Especialmente útil para usuarios nocturnos preocupados por seguridad.

---

## Análisis comparativo

| Alternativa | Atributo que privilegia | Qué gana | Qué resigna | Hallazgo del TP2 que la sustenta o la descarta |
|---|---|---|---|---|
| **A** | Satisfacción | Confianza máxima; información abundante del conductor; transmite seguridad en cada paso | Más pantallas; más tiempo; puede resultar repetitiva | U1: "estar seguro que es un estudiante de la facultad"; U3: "que por lo menos el perfil no es trucho"; U1 y U3: pedían referencias de viajes anteriores. Inseguridad nocturna |
| **B** | Eficiencia | Menos pasos; flujo rápido; resuelve el problema central "espera y poca previsibilidad" | Menos información del conductor visible inicialmente; requiere confianza previa | U3: "no saber si el colectivo o el tren van a tardar en venir"; problema central es la espera y la imprevisibilidad, no la información |
| **C** | Prevención de errores | Validaciones robustas; evita malas decisiones; acciones reversibles; seguridad procesal | Mayor complejidad; muchas confirmaciones pueden cansar al usuario; muy "defensivo" | Seguridad nocturna es importante, pero el TP2 no muestra que el usuario tema equivocarse al elegir un viaje; el miedo es más a "no conocer a la persona" que a "elegir mal" |