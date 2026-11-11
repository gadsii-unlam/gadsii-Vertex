# TP5. Construcción del MVP, Prueba y Aprendizaje

**Grupo:** Vertex Consulting Group
**Producto:** UNLaM Carpool
**Repositorio:** https://github.com/gadsii-unlam/gadsii-Vertex (rama `tp5-correcciones`)
**MVP:** https://carpool.timecore.com.ar
**Archivo de entrega:** `TP5-Vertex.pdf`

## Parte 1 — Antes de construir

### 1. Métricas y criterio de éxito

**Métrica accionable 1 — Tasa de solicitud.** Porcentaje de usuarios que, buscando su recorrido y su horario reales, solicitan un lugar en un viaje sin ayuda del equipo.

| Resultado | Decisión |
| --- | --- |
| 67 % o más | Encuentran un viaje que les sirve: pasamos a mirar la métrica 2 |
| Menos de 67 %, y se traban en una pantalla | Corregimos esa pantalla y volvemos a probar |
| Menos de 67 %, y ven viajes pero no los eligen | Revisamos qué dato del conductor les faltó, o el horario y el recorrido |

**Métrica accionable 2 — Tasa de reemplazo.** Porcentaje de usuarios que eligen un día concreto de su semana para usar UNLaM Carpool en lugar de su transporte habitual y dejan un contacto para que les avisemos cuando haya viajes reales. "Lo usaría a veces" no cuenta.

| Resultado | Decisión |
| --- | --- |
| 67 % o más | Perseveramos y validamos la oferta de conductores |
| Menos de 67 %, pero lo quieren cuando el transporte falla | Evaluamos un pivote de necesidad: alternativa para paros y demoras |
| Menos de 67 %, y no lo usarían nunca | Revisamos el problema y el segmento elegidos |

**Métrica vanidosa — Cantidad de usuarios registrados.** Daría "el 100 % se registró y se verificó", pero los tres se registran porque los invitamos y la revisión automática del certificado no rechaza a nadie. Puede dar 3 de 3 sin que nadie deje de tomarse un colectivo, y si cambia no sabemos qué hacer distinto.

**Criterio de éxito** (el umbral de 2 de 3 es el de la hipótesis del TP2):

* **Se sostiene** si la tasa de solicitud y la tasa de reemplazo llegan al 67 %.
* **Se refuta** si la tasa de reemplazo es de 33 % o menos, aunque la de solicitud sea alta.
* **No se puede concluir** si la tasa de solicitud es de 33 % o menos por problemas de usabilidad: se corrige y se vuelve a probar.

La primera versión de las métricas se commiteó antes del MVP (`ad0a844`); esta versión las reformula como dos tasas simples, con los mismos umbrales. Las métricas y el criterio quedaron fijos antes de las sesiones con usuarios reales y no se cambiaron después.

## Parte 2 — Construir

### 2. Construir el MVP

UNLaM Carpool es una aplicación web para celular con el flujo del estudiante pasajero, en las 6 pantallas de la Alternativa A del TP3:

1. **Ingreso:** correo institucional, código de 6 números, datos personales, cursada del cuatrimestre (opcional) y certificado de alumno regular.
2. **Buscar viaje:** localidad, solo ida, ida y vuelta o solo vuelta, día y horario.
3. **Viajes disponibles:** los viajes compatibles, primero los de quienes cursan con el pasajero ese día, con el motivo de la coincidencia, la etiqueta "Cursan juntos" y el costo por persona.
4. **Detalle del conductor:** verificación, carrera, años en la UNLaM, materia que cursan juntos, calificación, cantidad de viajes, referencias, auto y patente.
5. **Confirmar viaje:** viaje, conductor, auto y costo en una sola vista.
6. **Solicitud confirmada:** pase con horario, patente y punto de encuentro, recordatorio de seguridad y opción de cancelar.

**Las 8 correcciones aceptadas en el TP4-B están incluidas:**

| Corrección aceptada | Cómo está en el MVP |
| --- | --- |
| Vehículo y patente junto al conductor | Detalle, confirmación y pase |
| Costo estimado por persona | En resultados, detalle, confirmación y pase, identificado como estimado. Lo que habría indicado el conductor está precargado en cada viaje |
| Volver o cancelar | En la cabecera de cada pantalla |
| Cancelar un viaje solicitado | Desde el viaje, en "Mis viajes", con confirmación previa |
| Solo ida, ida y vuelta o solo vuelta | El pasajero lo elige al buscar. Cada viaje precargado tiene el tipo que habría elegido su conductor |
| Intercambiar origen y destino | Botón con flechas en la búsqueda |
| Sugerencias de ubicaciones | Lista de localidades mientras se escribe |
| Etiqueta de coincidencia con la cursada | El pasajero marca sus comisiones; si un conductor cursa la misma materia el mismo día y horario, su viaje lleva la etiqueta "Cursan juntos" y va primero |

**Costo y tipo de recorrido del conductor.** El brief excluye la publicación de viajes, así que ningún conductor carga datos en el MVP. Por eso, el costo estimado y el tipo de recorrido que según el TP4-B indicaría el conductor al publicar entran como datos precargados de cada viaje, igual que el resto de los viajes que el TP3 decidió precargar. El pasajero los ve y los usa como si un conductor los hubiera publicado. El costo se precarga con la fórmula de más abajo y no implica pagos: se arregla entre las personas.

**Componente propio (TP1): lógica de matching.** Muestra solo viajes de conductores verificados, con lugares libres, del mismo sentido y la misma localidad, y a una hora o menos del horario pedido. Pone primero a quienes cursan con el pasajero ese día, como pide la hipótesis, y después ordena con un puntaje de 0 a 100: horario (70), calificación (20) y experiencia (10).

**Costo estimado:** km ÷ 15 km por litro × $2.300 por litro, dividido entre quienes viajan. Desde San Antonio de Padua, con el auto completo, da $540 por persona.

**Qué está precargado o automatizado en el MVP, como decidió el TP3:** la revisión del certificado (se aprueba a los 3 segundos), el envío del código (aparece en pantalla), 26 viajes y 6 conductores precargados con sus referencias y sus comisiones, la lista de 12 comisiones que reemplaza a SIU Guaraní, y la aceptación del conductor (a los 5 segundos).

**Qué no se construyó, por estar excluido en el TP3:** publicación de viajes, mapas y rutas calculadas, integración con SIU Guaraní, reputación completa, pagos, chat, notificaciones y seguimiento.

**Decisiones que tomó la herramienta y no el equipo:** HTML, CSS y JavaScript sin framework; datos guardados en el navegador, sin backend; ingreso con código en lugar de contraseña; elegir el día además del horario; la sección "Mis viajes"; cargar la cursada eligiendo comisiones de una lista, en un paso opcional del registro. Quedaron anotadas en `docs/prompts.md` y `docs/arquitectura/mvp.md`.

## Parte 3 — Probar

### 3. Preparar la sesión

El plan completo está en `docs/evidencia/tp5/plan-de-sesion.md` y se escribió antes de las sesiones.

**Tareas,** contadas como situaciones y sin nombrar botones:

* **T1. Primer ingreso.** "Un compañero te pasó esta aplicación para compartir viajes con gente de la facu. Querés empezar a usarla."
* **T2. Conseguir un viaje.** Cada participante recibió una situación distinta, desde la localidad donde vive según el TP2:
  * **U1, de ida a la tarde:** "Mañana salís de la oficina en San Antonio de Padua a las 17:30 y tenés clase en la UNLaM a las 18:30. Hay paro de colectivos. Conseguí cómo llegar a tiempo."
  * **U2, de ida a la mañana temprano:** "Mañana tenés una clase de consulta a las 8:00 en la UNLaM. Salís de tu casa en Rafael Castillo a las 7:15 y el colectivo viene con demoras. Conseguí cómo llegar."
  * **U3, de vuelta a la noche:** "Mañana salís de cursar a las 22:00 y hay paro de colectivos. Tenés que volver a tu casa en San Antonio de Padua. Conseguí cómo volver."
* **T3. Decidir con quién.** "Si te quedaran dudas sobre con quién viajar, hacé lo que harías antes de decidirte. Decinos en voz alta con cuál te subirías y por qué." Solo si eligió muy rápido.
* **T4. Cambio de planes.** "Te avisaron que se suspendió la clase y ya no vas a necesitar ese viaje."

**Qué se observa:**

* Pausas de más de 5 segundos, vueltas atrás y lecturas repetidas.
* Errores de validación y pantallas a las que no quería ir.
* Pedidos de ayuda, anotados textuales y sin responder.
* Si abre la información del conductor antes de solicitar y qué mira.
* Si carga su cursada, y si mira o menciona la etiqueta "Cursan juntos" al elegir.
* Qué dice del precio, y si menciona la seguridad o la noche sin que se lo pregunten.

**Cómo se registra:** una persona conduce la sesión y otra anota en una planilla por usuario lo que hizo y dijo en cada tarea, los puntos de fricción y las respuestas de cierre. Nadie más interviene. Si el usuario queda trabado 3 minutos, se anota "rescate" y no suma en la tasa de solicitud. No se registran el nombre ni el contacto de los participantes.

**Preguntas de cierre,** en este orden y sin mostrar la aplicación:

1. Contame cómo elegiste ese viaje. ¿Qué miraste para decidirte?
2. ¿Hay algo que te hubiera hecho no subirte?
3. La última vez que tuviste un problema para volver de la facu, ¿qué hiciste? ¿Qué harías la próxima vez?
4. ¿Hay algún viaje de tu semana en el que usarías esto en lugar de lo que usás hoy? ¿Cuál?
5. Si lo lanzamos y hay viajes reales por tu zona, ¿querés que te avisemos? ¿A dónde te escribimos?
6. ¿Qué te pareció el costo que viste?
7. ¿Qué le cambiarías?

### 4. Probar con usuarios reales

Probaron el MVP U1, U2 y U3, los mismos usuarios del TP2. Cada uno lo recorrió solo, siguiendo el plan de sesión. Las planillas están en `docs/evidencia/tp5/` (`U1.md`, `U2.md` y `U3.md`).

| Usuario | Perfil (TP2) | Situación de T2 |
| --- | --- | --- |
| U1 | San Antonio de Padua, 14 km, 45 a 60 min, a veces en auto propio | Ida, sale de la oficina a las 17:30, clase a las 18:30 |
| U2 | Rafael Castillo, 8 km, 15 a 30 min, vuelve caminando si falla el colectivo | Ida, el jueves, sale a las 7:15, clase de consulta a las 8:00 |
| U3 | San Antonio de Padua (Padua Sur), 14 km, 45 a 60 min, toma remis si falla el transporte | Vuelta, sale de cursar a las 22:00 |

**U1.** Antes de buscar cargó su cursada: Análisis Matemático I (lunes) e Ingeniería de Software (miércoles), las dos de noche. Buscó "Solo ida" para el día siguiente, un miércoles, a las 17:30. Primero apareció Juan Rodríguez, con la etiqueta "Cursan juntos · Ingeniería de Software". Se entusiasmó: dijo que capaz lo conocía y que, si hubiera tenido la aplicación antes, se habría ahorrado muchos viajes en colectivo. Pero ese viaje llegaba a las 19:00, así que lo descartó. Eligió a Diego Paz, que llegaba a las 18:25, aunque le preocupó el margen de 5 minutos y una referencia que mencionaba una demora de 5 minutos. Revisó los 31 viajes, la calificación de 4,6, los comentarios, el auto y la patente. Lo usaría todos los miércoles al salir de la oficina y dejó contacto.

**U2.** En el ingreso, el código en pantalla y los mensajes de validación le generaron dudas ("Revisá tu nombre" no le explicaba qué corregir). Buscó desde Rafael Castillo para el jueves a las 7:15. El campo de hora venía cargado con 22:45 y dudó si tenía que poner la hora de salida o la de llegada. Hubo un solo viaje, el de Valentina Sosa: salía a las 7:45 y llegaba a las 8:11, 11 minutos después de la consulta. Vio la llegada en el detalle y lo pidió igual porque era la única opción. Cargó su cursada (Álgebra, Programación I, Análisis Matemático I e Inglés), pero no coincidía con la de la conductora. Para cancelar buscó primero en la tarjeta de "Mis viajes". Lo usaría todos los jueves para Análisis Matemático I de las 8:00 y dejó su correo.

**U3.** El primer archivo del certificado dio "El archivo está vacío" y tuvo que elegir otra copia. Buscó "Solo vuelta" a Padua a las 22:00. Los dos resultados (22:15 y 22:30) mostraban en el listado el recorrido al revés, San Antonio de Padua → UNLaM, y tuvo que abrir cada detalle para confirmar que iban hacia su casa. Comparó los dos (5,0 con 8 viajes contra 4,8 con 15) y eligió el de las 22:15 para esperar menos. Se olvidó de cargar su cursada. Le sorprendió el precio: $540 contra los $8.000 que calcula para un Uber. Lo usaría para volver después de cursar, sobre todo con paro, pero no nombró un día ni dejó contacto.

## Parte 4 — Aprender

### 5. Las dos capas

#### Capa de usabilidad

**Los tres completaron el flujo de punta a punta sin rescate y sin pedir ayuda,** con fricción en el ingreso y en la búsqueda.

| Tarea | U1 | U2 | U3 |
| --- | --- | --- | --- |
| T1. Primer ingreso | Completó | Completó con dificultad menor: validaciones del perfil | Completó con dificultad: "El archivo está vacío" |
| T2. Conseguir un viaje | Completó | Completó con dificultad: hora precargada y viaje que llega tarde | Completó con dificultad: recorrido invertido en el listado |
| T3. Decidir con quién | No hizo falta: comparó por su cuenta | Parcial: había un solo viaje | Completó: comparó dos conductores |
| T4. Cambio de planes | Completó | Completó, después de buscar en la tarjeta | Completó |

**Problemas que el TP4 había anticipado:**

* **Volver y cancelar:** funcionó. Los tres cancelaron en T4 con la confirmación previa. U1 preguntó si tenía que avisarle al conductor y lo resolvió leyendo la pantalla.
* **Tipo de recorrido:** U1 y U2 eligieron "Solo ida" y U3 "Solo vuelta" sin errores. Pero con "Solo vuelta" el listado muestra el recorrido al revés (ver problemas nuevos).
* **Acompañamiento en el primer uso:** U1 y U2 dudaron de si el código les llegaba al correo o tenían que usar el que aparecía en pantalla. Los dos usaron el de la pantalla sin ayuda.
* **Costo estimado:** se entendió. U1 y U2 dijeron que el precio estaba claro y que el pago lo arreglan con quien maneja, en efectivo o por transferencia. U3 quiere saber si el precio está actualizado y cuánto paga al final.
* **Etiqueta de cursada:** U1 y U2 cargaron su cursada. U1 vio la etiqueta y la nombró; U2 no tenía coincidencias. U3 vio la invitación a cargarla y se olvidó. Como anticipó el TP4-B, la etiqueta depende de que cada uno cargue su cursada.

**Problemas nuevos,** de mayor a menor impacto:

1. **Con "Solo vuelta", el listado muestra el recorrido invertido.** U3 vio "San Antonio de Padua → UNLaM" en los dos resultados y tuvo que abrir cada detalle para confirmar la dirección. Es un error del MVP: la tarjeta y el resumen de búsqueda arman el recorrido desde la localidad aunque el viaje sea de vuelta.
2. **La hora de llegada no sirve para buscar ni para elegir desde el listado.** La llegada estimada se ve recién en el detalle, no se puede buscar por "llegar antes de" y la aplicación no avisa cuando un viaje llega tarde. U1 abrió cada viaje para ver a qué hora llegaba. U2 pidió un viaje que llegaba 11 minutos después de su consulta. Los dos pidieron poder buscar por hora de llegada.
3. **La hora de ida viene cargada con un valor que no corresponde.** U2 encontró 22:45 en el campo de una búsqueda a la mañana y dudó si tenía que poner la hora de salida o la de llegada.
4. **Mensajes de error que no dicen qué corregir.** "Revisá tu nombre" (U2) y "El archivo está vacío" con un archivo válido (U3).
5. **La revisión del certificado no muestra progreso.** U2 esperó unos 8 segundos sin indicador, y U1 preguntó cuánto tardaba porque, saliendo de la oficina, necesitaba buscar enseguida.
6. **Cancelar está solo en el pase.** U2 lo buscó primero en la tarjeta de "Mis viajes".
7. **Detalles del pase:** la patente aparecía partida entre "ARGENTINA" y "AF126LP", y la pestaña "Mi cursada" dejó de verse (U2).

El equipo anotó además, en la sesión de U2, tres detalles de implementación: la dirección queda en `#/buscar` durante el ingreso, el texto de ayuda dice "Tocá la tarjeta" mientras el enlace dice "Abrir pase", y "Ver viaje" y "Quiero este viaje" están hechos como enlaces, lo que conviene revisar por accesibilidad.

#### Capa de negocio

| Métrica | U1 | U2 | U3 | Total |
| --- | --- | --- | --- | --- |
| 1. Tasa de solicitud | Sí | Sí | Sí | 100 % |
| 2. Tasa de reemplazo | Sí: todos los miércoles, dejó contacto | Sí: todos los jueves, dejó contacto | No: lo usaría con paro, sin día ni contacto | 67 % |
| Vanidosa: usuarios registrados | Sí | Sí | Sí | 100 % |

**Contra el criterio de éxito: la hipótesis se sostiene.** La tasa de solicitud es de 100 % y la de reemplazo, de 67 %. Las dos llegan al umbral de 2 de 3. La métrica vanidosa dio 100 % e incluye a U3, que no reemplazaría ningún viaje.

**El reemplazo aparece en viajes semanales con hora de llegada fija.** Los dos usuarios que suman eligieron un viaje que hacen todas las semanas y en el que llegar a horario importa: U1, de la oficina a la facultad los miércoles, con clase a las 18:30; U2, los jueves a las 8:00, porque el colectivo suele venir lleno o con demoras. Es el problema del TP2 —la espera y la imprevisibilidad del transporte— en un horario que no es la noche.

**Para la vuelta nocturna fue un respaldo.** U3 la usaría para volver después de cursar, sobre todo con paro o cuando tiene que esperar mucho el colectivo, y no se comprometió con un día. Hoy, ante un paro, pediría un Uber.

**El horario decide; la cursada y las referencias acompañan.** Los tres eligieron primero por horario: U1 descartó al conductor con quien cursaba porque llegaba tarde, U2 tomó el único viaje que había y U3 eligió el viaje con el que esperaba menos. Después miraron la calificación, la cantidad de viajes, las referencias y la patente; U2 y U3 también la verificación. Los tres dijeron que no se subirían si la persona o la patente no coinciden con lo publicado.

**La prioridad por cursada generó interés, pero no cambió ninguna elección.** U1 se entusiasmó al ver que compartía cursada con un conductor y dijo que le hubiera gustado tener la aplicación antes. Pero lo descartó por horario. U2 no tenía coincidencias y U3 no cargó la cursada.

**El costo no frenó a nadie.** U1 y U2 lo vieron claro y accesible; U3 lo comparó con los $8.000 de un Uber.

**Con pocos viajes, la coincidencia falla.** U2 tuvo una sola opción y llegaba tarde. Es lo que pone en duda el supuesto 6, aunque acá los viajes eran precargados.

**Queda sin evaluar** la existencia de conductores, porque los viajes estaban precargados.

### 6. Pivotar o perseverar

**Perseverar.**

El criterio de éxito se cumple en las dos métricas. U1 y U2 nombraron un viaje concreto de su semana que hoy hacen en colectivo y dejaron un contacto para que les avisemos. U3 confirma el valor como respaldo, pero no como reemplazo. El aprendizaje no cambia la dirección del producto, pero sí su foco: el valor está en cumplir con la hora de llegada, más que en la cursada compartida.

**Lo próximo a construir:**

1. **Publicación de viajes por conductores.** Es el supuesto crítico desde el TP1 y sigue sin evidencia, porque todos los viajes eran precargados. Hay que ver si aparecen conductores en los horarios que nombraron: los miércoles a las 17:30 desde Padua y los jueves cerca de las 7:00 desde Rafael Castillo.
2. **Buscar y elegir por hora de llegada:** buscar por "llegar antes de", mostrar la llegada en el listado y avisar cuando un viaje llega después del horario pedido.
3. **Ordenar primero por compatibilidad de horario y después por cursada,** para que un viaje que llega tarde no aparezca primero aunque compartan cursada (ver punto 9).
4. **Correcciones de esta prueba:** recorrido correcto en "Solo vuelta", hora de búsqueda sin un valor precargado que no corresponde, mensajes de error que digan qué corregir, progreso visible en la revisión del certificado y cancelar desde la tarjeta de "Mis viajes".

**Qué cambiaría la decisión:** si al abrir la publicación no aparecen conductores en esos horarios, correspondería un pivote de necesidad del consumidor: una alternativa para días de paro y demoras, el uso que valoró U3.

### 7. Brief de Producto — versión 4

`docs/brief.md` abre con este párrafo de cambios respecto de la versión 3:

> Se construye el MVP con el scope del TP3, solo el flujo del pasajero, y las 8 correcciones que el equipo aceptó en el TP4-B, incluida la etiqueta de coincidencia con la cursada. El costo estimado y el tipo de recorrido que indicaría el conductor entran como datos precargados de cada viaje, porque la publicación y los pagos siguen excluidos. El costo se calcula con nafta a $2.300 por litro y un consumo de 15 km por litro. Se definen las métricas y el criterio de éxito antes de probar, y se prueba el MVP con U1, U2 y U3, usuarios reales del segmento que lo recorrieron sin ayuda. **La hipótesis se sostiene:** la tasa de solicitud es de 100 % y la de reemplazo, de 67 %. El reemplazo aparece en viajes semanales con hora de llegada fija; para la vuelta nocturna, el producto es un respaldo. El horario decide la elección: la cursada compartida genera interés, pero no cambió ninguna elección. **El equipo decide perseverar** y lo próximo es validar la oferta de conductores, que sigue siendo el supuesto crítico, y permitir buscar y elegir por hora de llegada.

**Incorpora:**

* **Lo aprendido:** el reemplazo aparece en viajes semanales con hora de llegada fija y es respaldo en la vuelta nocturna; el horario decide y la cursada y las referencias acompañan; el costo no frenó a nadie; y los problemas de usabilidad del punto 5.
* **El estado de la hipótesis:** se sostiene, sin evaluar la oferta de conductores. La prioridad por cursada no se confirmó como motivo de elección. El supuesto 2 queda confirmado; el 3, confirmado con la condición de comprobar persona y patente; el 4 y el 5, confirmados; el 1 y el 6 siguen sin evidencia.
* **La decisión:** perseverar, con lo próximo a construir del punto 6.

## Parte 5 — Fundamentación

### 8. Anclaje

| Conclusión | Observación que la sostiene |
| --- | --- |
| El flujo se completa sin ayuda | Los tres llegaron a la confirmación y cancelaron en T4 sin rescate ni pedidos de ayuda |
| El primer ingreso tiene fricción | U1 y U2 dudaron de dónde llegaba el código. U2 recibió "Revisá tu nombre" sin saber qué corregir. A U3 el primer archivo le dio "El archivo está vacío" |
| "Solo vuelta" muestra el recorrido invertido | U3 vio "San Antonio de Padua → UNLaM" en los dos resultados de su vuelta y abrió cada detalle para confirmar la dirección |
| La hora de llegada no ayuda a elegir | U1 abrió cada viaje para ver la llegada. U2 pidió un viaje que llegaba 11 minutos después de su consulta. Los dos pidieron buscar por hora de llegada |
| El horario decide | U1 descartó a Juan Rodríguez por llegar a las 19:00 y eligió a Diego, que llegaba a las 18:25. U3 eligió el viaje de las 22:15 para esperar menos |
| La cursada genera interés, pero no decide | U1 se entusiasmó con la etiqueta "Cursan juntos" en el viaje de Juan Rodríguez y lo descartó igual por horario |
| Las referencias y la patente pesan en la confianza | U1 revisó los 31 viajes, los comentarios y la patente de Diego, y le preocupó una referencia por una demora. Los tres dijeron que no se subirían si la patente no coincide |
| El costo no es una barrera | U1 y U2: el precio estaba claro y el pago lo arreglan con quien maneja. U3 lo comparó con los $8.000 de un Uber |
| El producto reemplaza un viaje semanal para U1 y U2 | U1: todos los miércoles, de la oficina a la facultad. U2: todos los jueves, para Análisis Matemático I de las 8:00. Los dos dejaron contacto |
| Para la vuelta nocturna es respaldo | U3 lo usaría sobre todo con paro y no nombró un día ni dejó contacto |

### 9. El resultado que no esperaban

**Qué pasó.** En la sesión de U1, la aplicación puso primero el viaje de Juan Rodríguez, con la etiqueta "Cursan juntos · Ingeniería de Software". U1 se entusiasmó: dijo que capaz lo conocía y que, si hubiera tenido la aplicación antes, se habría ahorrado muchos viajes en colectivo. Pero ese viaje llegaba a las 19:00 y su clase empezaba a las 18:30. Lo descartó y eligió a Diego, que no compartía su cursada.

**Por qué nos sorprendió.** La hipótesis promete priorizar a quienes comparten cursada, y el MVP los pone primeros en el listado. Esperábamos que la etiqueta inclinara la elección, como pedía U1 en el TP2. Fue al revés: la cursada compartida generó la reacción más entusiasta de la prueba, pero no pudo competir con la hora de llegada. Y al ordenar primero por cursada, la aplicación puso arriba un viaje que no le servía.

**Qué hicimos con eso:**

* **Lo contamos según las reglas.** U1 dijo que le entusiasmaba viajar con alguien de su cursada e hizo otra cosa: eligió por horario. Vale lo que hizo, así que la cursada no figura como motivo de elección en la capa de negocio.
* **Lo llevamos a la próxima versión:** el orden del listado va a poner primero los viajes compatibles con la hora de llegada, y entre esos, a quienes comparten cursada.
* **Lo usamos para el punto 10:** muestra que la intención que expresa el usuario y lo que elige pueden ser distintas.

### 10. La métrica que podría estar mintiendo

**La tasa de solicitud.** Dio 100 %, pero en esta prueba pedir un lugar no cuesta nada:

* **Se puede pedir un viaje que no sirve:** U2 pidió el viaje de las 7:45 sabiendo que llegaba 11 minutos después de su consulta, porque era la única opción. Suma en la métrica, aunque en la vida real tal vez no lo habría pedido.
* **Siempre hay un viaje que coincide:** los viajes y las comisiones se precargaron para las zonas y los horarios de U1, U2 y U3. Encontrar uno no demuestra que habría viajes reales los miércoles a las 17:30 desde Padua.
* **Nadie se sube a un auto:** tocar "Quiero este viaje" no exige esperar ni subirse con un desconocido.
* **Todos los conductores son buenos:** todas las referencias tienen 4 o 5 estrellas y todos están verificados. Nadie tuvo que decidir frente a un perfil débil.

Podría dar 100 % aunque, en la vida real, nadie se subiera. La tasa de reemplazo es más difícil de engañar, porque pide nombrar un viaje concreto y dejar un contacto, aunque sigue siendo intención y no conducta.

**Cómo lo revisaríamos:** contar solo las solicitudes de viajes que llegan a horario; con conductores reales, medir cuántos se suben al auto después de solicitar; y en la próxima prueba, incluir un conductor sin viajes o con una referencia negativa en el mismo horario, para ver si lo eligen igual.
