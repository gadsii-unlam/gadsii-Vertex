# TP5. Construcción del MVP, Prueba y Aprendizaje

**Grupo:** Vertex Consulting Group
**Producto:** UNLaM Carpool
**Repositorio:** https://github.com/gadsii-unlam/gadsii-Vertex (rama `tp5-mvp-scope`)
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

**Métrica vanidosa — Cantidad de usuarios registrados.** Daría "el 100 % se registró y se verificó", pero los tres se registran porque los invitamos y la verificación simulada no rechaza a nadie. Puede dar 3 de 3 sin que nadie deje de tomarse un colectivo, y si cambia no sabemos qué hacer distinto.

**Criterio de éxito** (el umbral de 2 de 3 es el de la hipótesis del TP2):

* **Se sostiene** si la tasa de solicitud y la tasa de reemplazo llegan al 67 %.
* **Se refuta** si la tasa de reemplazo es de 33 % o menos, aunque la de solicitud sea alta.
* **No se puede concluir** si la tasa de solicitud es de 33 % o menos por problemas de usabilidad: se corrige y se vuelve a probar.

La primera versión de las métricas se commiteó antes del MVP (`ad0a844`); esta versión las reformula como dos tasas simples, con los mismos umbrales.

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

**Costo y tipo de recorrido del conductor.** El brief excluye la publicación de viajes, así que ningún conductor carga datos en el MVP. Por eso, el costo estimado y el tipo de recorrido que según el TP4-B indicaría el conductor al publicar entran como datos precargados de cada viaje, igual que el resto de los viajes que el TP3 decidió simular. El pasajero los ve y los usa como si un conductor los hubiera publicado. El costo se precarga con la fórmula de más abajo y no implica pagos: se arregla entre las personas.

**Componente propio (TP1): lógica de matching.** Muestra solo viajes de conductores verificados, con lugares libres, del mismo sentido y la misma localidad, y a una hora o menos del horario pedido. Pone primero a quienes cursan con el pasajero ese día, como pide la hipótesis, y después ordena con un puntaje de 0 a 100: horario (70), calificación (20) y experiencia (10).

**Costo estimado:** km ÷ 15 km por litro × $2.300 por litro, dividido entre quienes viajan. Desde San Antonio de Padua, con el auto completo, da $540 por persona.

**Qué se simula, como decidió el TP3:** la revisión del certificado (se aprueba a los 3 segundos), el envío del código (aparece en pantalla), 26 viajes y 6 conductores precargados con sus referencias y sus comisiones, la lista de 12 comisiones que reemplaza a SIU Guaraní, y la aceptación del conductor (a los 5 segundos).

**Qué no se construyó, por estar excluido en el TP3:** publicación de viajes, mapas y rutas calculadas, integración con SIU Guaraní, reputación completa, pagos, chat, notificaciones y seguimiento.

**Decisiones que tomó la herramienta y no el equipo:** HTML, CSS y JavaScript sin framework; datos guardados en el navegador, sin backend; ingreso con código en lugar de contraseña; elegir el día además del horario; la sección "Mis viajes"; cargar la cursada eligiendo comisiones de una lista, en un paso opcional del registro. Quedaron anotadas en `docs/prompts.md` y `docs/arquitectura/mvp.md`.

## Parte 3 — Probar

### 3. Preparar la sesión

**Tareas:**

* **T1. Primer ingreso.** "Un compañero te pasó esta aplicación para compartir viajes con gente de la facu. Querés empezar a usarla."
* **T2. Conseguir un viaje.** "Es [día de cursada]. Salís de cursar a las [hora de salida] y hay paro de colectivos. Tenés que volver a [localidad]. Conseguí cómo volver."
* **T3. Decidir con quién.** "Si te quedaran dudas sobre con quién viajar, hacé lo que harías antes de decidirte. Decinos en voz alta con cuál te subirías y por qué." Solo si eligió muy rápido.
* **T4. Cambio de planes.** "Te avisaron que se suspendió la clase y ya no vas a necesitar ese viaje."

**Qué se observa:**

* Pausas de más de 5 segundos, vueltas atrás y lecturas repetidas.
* Errores de validación y pantallas a las que no quería ir.
* Pedidos de ayuda, anotados textuales y sin responder.
* Si abre el perfil del conductor, cuánto tiempo se queda y qué mira.
* Si carga su cursada, y si mira o menciona la etiqueta "Cursan juntos" al elegir.
* Qué dice del precio, y si menciona la seguridad o la noche sin que se lo pregunten.

**Cómo se registra:** una persona conduce y otra anota en una planilla por usuario: tareas, tiempos con cronómetro, puntos de fricción con severidad de 0 a 4, citas textuales y respuestas de cierre. Si el usuario queda trabado 3 minutos, se anota "rescate" y no suma en la tasa de solicitud.

**Preguntas de cierre,** en este orden y sin mostrar la aplicación:

1. Contame cómo elegiste ese viaje. ¿Qué miraste para decidirte?
2. ¿Hay algo que te hubiera hecho no subirte?
3. La última vez que tuviste un problema para volver de la facu, ¿qué hiciste? ¿Qué harías la próxima vez?
4. ¿Hay algún viaje de tu semana en el que usarías esto en lugar de lo que usás hoy? ¿Cuál?
5. Si lo lanzamos y hay viajes reales por tu zona, ¿querés que te avisemos? ¿A dónde te escribimos?
6. ¿Qué te pareció el costo que viste?
7. ¿Qué le cambiarías?

### 4. Probar con usuarios reales

Se probó con U1, U2 y U3, los mismos usuarios del TP2. Las sesiones se simularon con autorización de la cátedra, a partir del perfil y las respuestas de cada uno en el TP2.

| Usuario | Perfil (TP2) | Fecha | Duración | Situación de T2 |
| --- | --- | --- | --- | --- |
| U1 | San Antonio de Padua, 14 km, 45 a 60 min, a veces en auto propio | 01/11/2026 | 20 min | Martes, sale a las 23:00 |
| U2 | Rafael Castillo, 8 km, 15 a 30 min, vuelve caminando si falla el colectivo | 02/11/2026 | 14 min | Martes, sale a las 22:00 |
| U3 | Padua Sur, 14 km, 45 a 60 min, toma remis si falla el transporte | 01/11/2026 | 23 min | Lunes, sale a las 22:00 |

**U1.** Fue a buscar el código a su correo antes de verlo en pantalla y cargó 3 comisiones. En T2 eligió "Solo vuelta" y vio primero a Diego con la etiqueta "Cursan juntos": "¡Diego cursa Operativos conmigo!". Abrió su perfil (48 s), lo comparó con el de Juan y eligió a Diego, que sale a las 23:05: "31 viajes. Y mirá lo que dicen". Después de solicitar buscó en "Perfil" dónde ofrecer su auto. Lo usaría los martes y dejó contacto.

**U2.** Ingresó sin problemas, pero omitió la cursada: "Después lo pongo". En T2 dejó el día en "Hoy" (lunes) en lugar de martes y no lo notó. No vio ninguna etiqueta "Cursan juntos". Tocó el primer viaje, estuvo 8 segundos en el perfil de Bruno y solicitó: "Este, sale 22:10". Lo usaría "cuando hay paro o llueve", no un día fijo. Dejó contacto.

**U3.** Preguntó "¿Me llegó al mail?", cargó 5 comisiones y dudó del certificado aprobado en 3 segundos. En T2 escribió "Padua Sur" y recibió un error; después buscó con "Solo ida" y no tuvo resultados. Corrigió ambas cosas y vio primero a Juan, con "Cursan juntos" (22:30), y después a Marina (22:15, mejor horario y calificación). Comparó los dos y eligió a Juan: "Marina sale antes y tiene mejores referencias, pero con Juan curso. Lo veo todos los lunes". Lo usaría los lunes y miércoles y dejó contacto.

Las planillas completas están en el anexo.

## Parte 4 — Aprender

### 5. Las dos capas

#### Capa de usabilidad

**Los tres completaron el flujo sin rescate,** con fricción en el ingreso y en la búsqueda.

| Tarea | U1 | U2 | U3 |
| --- | --- | --- | --- |
| T1. Primer ingreso | 4:20 | 2:20, sin cargar la cursada | 5:00 |
| T2. Conseguir un viaje | 2:40 | 1:40, para el día equivocado | 4:30, con 2 errores |
| T4. Cambio de planes | 0:50 | 0:35 | 1:05 |

**Problemas que el TP4 había anticipado:**

* **Volver y cancelar:** funcionó. U3 salió de una búsqueda vacía con "Volver" y los tres cancelaron en T4 con la confirmación previa.
* **Sugerencias de ubicaciones:** funcionaron para U1 ("pad") y U2 ("rafa"), pero no para U3, que escribió su barrio, "Padua Sur", y recibió un error.
* **Tipo de recorrido:** la opción existe, pero "Solo ida" viene elegida. U3 buscó la vuelta con "Solo ida" y no tuvo resultados.
* **Acompañamiento en el primer uso:** U1 salió a buscar el código a su correo y U3 preguntó "¿Me llegó al mail?".
* **Intercambiar origen y destino:** nadie lo usó; la vuelta se resolvió eligiendo el tipo de recorrido.
* **Etiqueta de cursada:** U1 y U3 la vieron y la nombraron. Pero el paso para cargarla es opcional y U2 lo omitió ("eran un montón de materias para marcar"), y U3 preguntó "¿Y si mi comisión no está?". Es lo que anticipó el TP4-B: la etiqueta depende de conocer la cursada de cada uno.

**Problemas nuevos:**

* **El día pasa desapercibido** (severidad 3): U2 pidió el viaje para el lunes cuando lo necesitaba el martes y no lo notó en la confirmación ni en el pase.
* **La aprobación instantánea del certificado resta credibilidad** (severidad 3): U3 dijo "¿Lo revisó alguien en tres segundos?".
* **"Ida y vuelta" en un resultado de vuelta confunde** (severidad 1): U1 lo preguntó y se resolvió en el detalle.

#### Capa de negocio

| Métrica | U1 | U2 | U3 | Total |
| --- | --- | --- | --- | --- |
| 1. Tasa de solicitud | Sí | No, pidió el día equivocado | Sí | 67 % |
| 2. Tasa de reemplazo | Sí | No, "cuando hay paro o llueve" | Sí | 67 % |
| Vanidosa: usuarios registrados | Sí | Sí | Sí | 100 % |

**Contra el criterio de éxito: la hipótesis se sostiene.** Las dos tasas llegan al 67 %. La métrica vanidosa dio 100 % e incluye a U2, que no reemplazaría ningún viaje.

**El producto genera el valor prometido para quienes viajan 45 minutos o más.** U1 y U3 eligieron un día concreto y lo compararon con lo que hacen hoy cuando falla el transporte: el auto del padre y el remis.

**Resuelve el problema real del TP2:** la espera y la imprevisibilidad de noche. U1 eligió el martes porque "el tren a esa hora tarda un montón", y U3 el lunes y el miércoles porque "el colectivo a esa hora es una lotería".

**Para viajes cortos es un respaldo, no un reemplazo.** U2, a 8 km y 20 minutos, lo usaría "cuando hay paro o llueve" y eligió solo por horario.

**La prioridad por cursada genera confianza, como promete la hipótesis.** A U1 le confirmó una elección que ya era la mejor por horario. A U3 se la cambió: eligió a Juan, que cursa con su comisión y sale 30 minutos después, antes que a Marina, con mejor horario y calificación. "Si lo veo en clase, ya no es un desconocido." Para U2 no hay dato, porque omitió la cursada.

**Las referencias también pesaron en los viajes largos.** U1 y U3 compararon dos conductores y nombraron la verificación, las referencias y la cantidad de viajes.

**Queda sin evaluar** la existencia de conductores, porque los viajes estaban precargados.

### 6. Pivotar o perseverar

**Perseverar.**

El criterio de éxito se cumple en las dos métricas. U1 y U3 reproducen el problema central del TP2 con un día concreto de su semana, y eligieron por la cursada compartida y las referencias, no solo por el horario. El caso de U2 muestra que el valor se concentra en los viajes largos; es un solo caso y lo tomamos como señal a seguir sobre el segmento, no como motivo para pivotar.

**Lo próximo a construir:**

1. **Publicación de viajes por conductores.** Es el supuesto crítico desde el TP1 y sigue sin evidencia, porque todos los viajes eran precargados. U1, la única que maneja, buscó por su cuenta dónde ofrecer su auto.
2. **Correcciones de esta prueba:** tipo de recorrido sin opción elegida de antemano, día más visible en la búsqueda y la confirmación, barrios como "Padua Sur" en las sugerencias y aviso claro de dónde llega el código.
3. **Revisión del certificado con plazo y aviso,** en lugar de la aprobación en 3 segundos.
4. **Cursada cargada sin esfuerzo:** traerla de SIU Guaraní o, mientras tanto, buscar la comisión escribiendo su nombre. U2 omitió el paso y U3 dudó de encontrar la suya.

**Qué cambiaría la decisión:** si al abrir la publicación no aparecen conductores para la cursada nocturna, correspondería un pivote de necesidad del consumidor: una alternativa para días de paro y demoras, el uso que valoró U2.

### 7. Brief de Producto — versión 4

`docs/brief.md` abre con este párrafo de cambios respecto de la versión 3:

> Se construye el MVP con el scope del TP3, solo el flujo del pasajero, y las 8 correcciones que el equipo aceptó en el TP4-B, incluida la etiqueta de coincidencia con la cursada, que prioriza a quienes cursan juntos como pide la hipótesis. El costo estimado y el tipo de recorrido que indicaría el conductor entran como datos precargados de cada viaje, porque la publicación y los pagos siguen excluidos. El costo se calcula con nafta a $2.300 por litro y un consumo de 15 km por litro. Se definen las métricas y el criterio de éxito, reformulados después como dos tasas simples, y se prueba el MVP con U1, U2 y U3, en sesiones simuladas a partir del TP2 con autorización de la cátedra. La hipótesis se sostiene: la tasa de solicitud y la tasa de reemplazo llegan al 67 %, y la cursada compartida pesó en la elección. El valor se concentra en quienes viajan 45 minutos o más; para quien vive cerca, el producto es un respaldo cuando falla el transporte. El equipo decide perseverar y lo próximo es validar la oferta de conductores, que sigue siendo el supuesto crítico.

**Incorpora:**

* **Lo aprendido:** el reemplazo funciona en viajes largos y es respaldo en los cortos; la cursada compartida y las referencias pesan en la decisión; la verificación tiene que verse real; U1 quiere ofrecer su auto; el costo no frenó a nadie; y los cuatro problemas de usabilidad del punto 5.
* **El estado de la hipótesis:** se sostiene, incluida la prioridad por cursada, pero sin evaluar la oferta de conductores. El supuesto 2 queda confirmado con matiz (reemplazo en viajes largos, respaldo en cortos); el 4, confirmado si la revisión se percibe real; el 1 y el 6 siguen sin evidencia.
* **La decisión:** perseverar, con lo próximo a construir del punto 6.

## Parte 5 — Fundamentación

### 8. Anclaje

| Conclusión | Observación que la sostiene |
| --- | --- |
| El flujo se completa sin rescate | Los tres llegaron al pase y cancelaron en T4 sin ayuda |
| El primer ingreso tiene fricción con el código | U1 salió a su correo durante 25 segundos. U3 preguntó "¿Me llegó al mail?" y tardó 40 segundos en ver la notificación |
| "Solo ida" elegido de antemano induce errores | U3, en T2, buscó la vuelta a las 22:00 con "Solo ida" y vio "No hay viajes para esa búsqueda" |
| Las sugerencias no cubren cómo nombran su barrio | U3, en T2, escribió "Padua Sur", no tuvo sugerencias y recibió "Elegí una localidad de la lista" |
| El día pasa desapercibido | U2, en T2, dejó "Hoy" y pidió el viaje del lunes cuando se le había dicho martes. Al cierre: "Ah, ni lo miré" |
| Las referencias pesan en viajes largos | U1 estuvo 48 segundos en el perfil de Diego: "31 viajes. Y mirá lo que dicen". U3 estuvo 1 minuto en el de Juan: "Tiene la tilde de verificado y 15 viajes. No es un perfil trucho" |
| La cursada compartida pesa más que el horario | U3 eligió a Juan (22:30, "Cursan juntos") antes que a Marina (22:15, calificación 5): "Marina sale antes y tiene mejores referencias, pero con Juan curso" |
| La etiqueta depende de que carguen la cursada | U2 tocó "Omitir por ahora" en T1 y nunca vio la etiqueta. U3 preguntó "¿Y si mi comisión no está?" |
| En viajes cortos decide el horario | U2 eligió en menos de 10 segundos, estuvo 8 en el perfil y respondió "Por el horario. Salía 22:10" |
| El producto reemplaza un viaje real para U1 y U3 | U1: "Los martes, que salgo a las 23". U3: "Los lunes y los miércoles". Los dos dejaron contacto |
| Para U2 es respaldo, no reemplazo | U2: "Un día fijo no. Lo usaría cuando hay paro o llueve" |
| Hay al menos un conductor interesado | U1, después de solicitar, pasó 1 minuto en "Perfil" y "Mis viajes": "¿Y dónde pongo que yo también tengo auto?" |

### 9. El resultado que no esperaban

**Qué pasó.** En la sesión de U3, al final de T1, el certificado se aprobó a los 3 segundos de enviarlo. U3 se detuvo y dijo: "¿Ya está? ¿Lo revisó alguien en tres segundos? Entonces cualquiera sube cualquier cosa."

**Por qué nos sorprendió.** La verificación es la base de la confianza que promete la hipótesis. Esperábamos que la velocidad se viviera como algo bueno; para U3 fue al revés: una revisión instantánea parece que no revisa nada.

**Qué hicimos con eso:**

* **No cambiamos el MVP entre sesiones,** para que U2 viera lo mismo. En su sesión miramos ese momento con atención: no lo comentó.
* **Lo contamos según las reglas.** En T2, U3 eligió a Juan, entre otras cosas, porque "tiene la tilde de verificado": dijo una cosa e hizo otra, y vale lo que hizo. La duda quedó registrada como hallazgo.
* **Lo llevamos a la próxima versión:** la revisión del certificado va a tener plazo y aviso. En la verificación conviene ser creíble antes que rápido, aunque el TP3 priorizó la eficiencia.
* **Lo usamos para el punto 10:** muestra que en la prueba se puede pedir un lugar sin confiar de verdad en el conductor.

### 10. La métrica que podría estar mintiendo

**La tasa de solicitud.** Dio 67 %, pero en esta prueba pedir un lugar no cuesta nada:

* **Siempre hay un viaje que coincide:** los viajes y las comisiones se precargaron para las zonas, los horarios y la cursada de U1, U2 y U3. Encontrar uno no demuestra que habría viajes reales a las 23 desde Padua.
* **Nadie se sube a un auto:** tocar "Solicitar lugar" no exige esperar de noche ni subirse con un desconocido. U3 dudó de la verificación y pidió el lugar igual.
* **Todos los conductores son buenos:** todas las referencias tienen 4 o 5 estrellas y todos están verificados. Nadie tuvo que decidir frente a un perfil débil.

Podría dar 100 % aunque, en la vida real, nadie se subiera. La tasa de reemplazo es más difícil de engañar, porque pide nombrar un viaje concreto y dejar un contacto, aunque sigue siendo intención y no conducta.

**Cómo lo revisaríamos:** con conductores reales, medir cuántos se suben al auto después de solicitar; y en la próxima prueba, incluir un conductor sin viajes o con una referencia negativa en el mismo horario, para ver si lo eligen igual.
