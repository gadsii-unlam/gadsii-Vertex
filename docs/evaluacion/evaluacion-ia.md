# Evaluación heurística — IA

**Producto evaluado:** RooMeet — MVP de asignación y modificación local de aulas
**Material entregado:** `docs/brief.md` (brief v3), `docs/diseno/wireframe/TP3-wireframe-MVP.html`, `docs/diseno/wireframe/Wireframe-RooMeet.jpeg` y `docs/diseno/wireframe/Diseño.md` (release Entrega-TP3)
**Modelo:** ChatGPT 5.6 Sol — 23/09/2026

## Tabla de problemas

| # | Heurística | Problema | Sev. | Mejora sugerida |
|---|---|---|---:|---|
| **IA1** | **H4 Prevención de errores** | En el visor, “Modificar asignación” siempre abre el Curso A aunque se seleccione otra aula; además, se puede avanzar al paso 4 sin haber elegido un curso. | **3** | Nombrar el curso seleccionado en el botón o acción y cargar específicamente ese curso. Impedir avanzar al paso 4 mientras no exista una selección válida. |
| **IA2** | **H2 Correspondencia con el mundo real** | Los horarios muestran únicamente la hora de inicio, por lo que el usuario no puede comprobar correctamente si existen solapamientos parciales entre cursos. | **3** | Mostrar la franja horaria completa de cada curso, incluyendo hora de inicio y finalización. |
| **IA3** | **H3 Libertad y control del usuario** | Una vez realizado el cambio, no se presenta una forma clara de deshacerlo ni de volver a seleccionar el aula originalmente asignada. | **2** | Incorporar una opción “Deshacer” y mantener el aula original entre las alternativas disponibles cuando corresponda. |
| **IA4** | **H1 Visibilidad del estado del sistema** | Al confirmar una modificación, el sistema regresa al visor sin informar explícitamente que el cambio fue realizado ni qué asignación cambió. | **2** | Mostrar una confirmación visible, por ejemplo: “Curso A: Aula 1 → Aula 3”. |
| **IA5** | **H2 Correspondencia con el mundo real** | Expresiones como “Cambio local” y “No envía datos a Guaraní” describen detalles del sistema, pero no dejan claro para el usuario si el cambio ya es efectivo o cuál es su estado. | **2** | Utilizar un estado expresado en términos de la tarea del usuario, por ejemplo “Cambio guardado localmente” o “Pendiente de validación/sincronización”. |
| **IA6** | **H4 Prevención de errores** | El aviso “revisar solapamientos y capacidad” aparece de manera genérica y permanente, sin indicar qué aula o asignación presenta realmente un problema. | **2** | Detectar y señalar los conflictos directamente en la fila o alternativa afectada, explicando si se trata de capacidad o solapamiento. |
| **IA7** | **H7 Flexibilidad y eficiencia de uso** | El visor posee un único filtro, en el paso de selección de aula no aparecen filtros equivalentes y el filtro mostrado no parece modificar el panel de resultados. | **2** | Incorporar filtros funcionales y consistentes, por ejemplo por horario, capacidad y estado de disponibilidad. |
| **IA8** | **H8 Diseño estético y minimalista** | Aparecen acciones “Modificar” duplicadas y anotaciones propias del diseño o del prototipo dentro de las pantallas, agregando información que no forma parte de la tarea del usuario. | **1** | Mantener una sola acción clara por contexto y mover las anotaciones del diseño fuera de la interfaz destinada al usuario. |
| **IA9** | **H6 Reconocimiento antes que recuerdo** | El estado de las aulas en el mapa depende principalmente del relleno visual de los marcadores y las posiciones representadas no permiten identificar con claridad cada estado sin interpretar la codificación. | **1** | Agregar texto o indicadores explícitos en los marcadores y complementar el mapa con un listado visible de aulas y estados. |
| **IA10** | **H10 Ayuda y documentación** | El flujo no ofrece ayuda contextual que recuerde al usuario qué debe hacer en cada paso, algo relevante al tratarse de una tarea que se realiza con poca frecuencia. | **1** | Incorporar una breve indicación del tipo “Qué hacer aquí” en los pasos principales del proceso. |
