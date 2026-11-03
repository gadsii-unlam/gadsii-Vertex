# Brief de Producto
UNLaM Carpool — Brief de Producto
 
**Versión 4.0 — TP5**
 
## Cambios respecto de la versión 3
 
Se construye el MVP con el scope del TP3, solo el flujo del pasajero, y las 8 correcciones que el equipo aceptó en el TP4-B, incluida la etiqueta de coincidencia con la cursada, que prioriza a quienes cursan juntos como pide la hipótesis. El costo estimado y el tipo de recorrido que indicaría el conductor entran como datos precargados de cada viaje, porque la publicación y los pagos siguen excluidos. El costo se calcula con nafta a $2.300 por litro y un consumo de 15 km por litro. Se definen las métricas y el criterio de éxito, reformulados después como dos tasas simples, y se prueba el MVP con U1, U2 y U3, en sesiones simuladas a partir del TP2 con autorización de la cátedra. **La hipótesis se sostiene:** la tasa de solicitud y la tasa de reemplazo llegan al 67 %, y la cursada compartida pesó en la elección. El valor se concentra en quienes viajan 45 minutos o más; para quien vive cerca, el producto es un respaldo cuando falla el transporte. **El equipo decide perseverar** y lo próximo es validar la oferta de conductores, que sigue siendo el supuesto crítico.
 
## Segmento elegido
 
Estudiantes de la UNLaM que viven a más de 5 km de la universidad y cursan presencialmente al menos dos veces por semana.
 
Se estima que el segmento está compuesto por aproximadamente 24.000 estudiantes. La estimación parte de la matrícula de grado y pregrado de la UNLaM y de información sobre la distribución geográfica de sus estudiantes.
 
Son estudiantes que deben realizar traslados frecuentes y de una distancia considerable para asistir a la universidad. La distancia y la frecuencia de cursada hacen que el traslado tenga un impacto significativo en su rutina.
 
## Producto
 
**Nombre:** UNLaM Carpool
 
UNLaM Carpool busca ofrecer una alternativa de traslado a estudiantes de la UNLaM, conectando estudiantes que realizan recorridos y horarios similares para que puedan compartir viajes en auto.
 
A partir del relevamiento, el producto se enfoca principalmente en reducir los tiempos de espera y la imprevisibilidad del transporte público, brindar una alternativa cuando este presenta inconvenientes y mejorar la seguridad del traslado, especialmente durante la noche.
 
## Perfil del usuario real
 
El usuario primario continúa siendo el estudiante pasajero.
 
Los tres usuarios relevados (U1, U2 y U3) cursan presencialmente entre 3 y más de 5 días por semana, y los tres asisten en el turno noche. U1 y U3 viajan desde San Antonio de Padua, a unos 14 km de la universidad, y U2 desde Rafael Castillo, a unos 8 km. Utilizan principalmente colectivo y, en algunos casos, combinaciones con tren o vehículos de familiares y conocidos.
 
U1 y U3 tienen viajes de entre 45 minutos y 1 hora, mientras que U2 tarda entre 15 y 30 minutos. U1 es la única que utiliza ocasionalmente auto propio; U2 y U3 dependen del transporte público o de familiares y conocidos.
 
Los tres ya compartieron alguna vez un viaje en auto con otro estudiante, debido a coincidencias de horario de cursada y zona de destino.
 
El relevamiento confirmó problemas concretos relacionados con los tiempos de espera, la imprevisibilidad del transporte público y la falta de alternativas convenientes cuando este falla. También apareció la inseguridad durante los traslados nocturnos como un problema que no había sido contemplado inicialmente.
 
## Necesidades
 
A partir del relevamiento se identificaron las siguientes necesidades:
 
* Contar con una alternativa al transporte público cuando existen demoras, paros o inconvenientes.
* Poder coordinar viajes con estudiantes que tengan horarios y recorridos similares.
* Reducir los tiempos de espera y tener mayor previsibilidad sobre el horario de llegada y salida.
* Tener confianza respecto de la persona con la que van a viajar, algo que los tres asociaron a saber que es estudiante de la UNLaM y a conocer sus viajes anteriores.
* Mejorar la seguridad del traslado, especialmente en los viajes nocturnos utilizando el transporte público.
* Aprovechar el tiempo de viaje para otras actividades: U3 señaló que ir en auto le permitiría "estudiar o incluso descansar un poco", algo imposible durante el viaje en transporte público.
## Problemas y frustraciones
 
El principal problema identificado es la espera y poca previsibilidad del transporte público. Los usuarios mencionaron especialmente la incertidumbre sobre cuánto puede tardar un colectivo o tren.
 
Cuando el transporte habitual falla, las alternativas tampoco resultan convenientes: U1 depende de que la lleve un familiar o un amigo, U2 vuelve caminando y U3 recurre al remis, que le resulta muy caro.
 
También apareció la inseguridad durante la noche, tanto durante el viaje como mientras se espera el transporte público.
 
En relación con compartir viajes, las principales preocupaciones son no conocer a la otra persona, no contar con referencias y tener que esperar demasiado tiempo.
 
## Contexto de uso
 
El producto sería utilizado principalmente desde el celular para organizar tanto la ida como la vuelta de la universidad.
 
En los viajes de regreso resulta especialmente útil coordinar con estudiantes que compartan la misma cursada y horario de salida. Cuando esto no sea posible, el producto debería permitir encontrar viajes disponibles en el momento con estudiantes próximos a salir de la UNLaM y que tengan un recorrido compatible.
 
## Funcionalidades core
 
* Registro y verificación de estudiantes mediante correo institucional y certificado de alumno regular.
* Verificación de conductores mediante licencia, seguro y datos del vehículo.
* Publicación de viajes indicando origen, destino, fecha, horario, lugares disponibles y costo estimado.
* Búsqueda y matching según ubicación, recorrido y horario.
* Priorización de coincidencias entre estudiantes que compartan cursada.
* Solicitud y confirmación de viajes.
* Sistema de reputación e historial de viajes anteriores para generar mayor confianza.
## Integraciones previstas
 
* API de mapas y geolocalización para obtener ubicaciones, mostrar recorridos y seleccionar puntos de origen y encuentro.
* API de cálculo de rutas para comparar recorridos de conductores y pasajeros y determinar viajes compatibles.
* Servicio de notificaciones para informar solicitudes de viaje, aceptaciones, cancelaciones y cambios.
* SIU Guaraní de la UNLaM como integración futura para validar la identidad y condición de alumno regular de los usuarios.
Para el MVP no se realizará una integración directa con SIU Guaraní debido a la complejidad técnica y los permisos de acceso requeridos. La verificación se realizará mediante correo institucional y certificado de alumno regular.
 
## Grupos de usuarios
 
### Estudiantes conductores
 
Estudiantes que cuentan con vehículo y realizan el trayecto hacia o desde la UNLaM. Son fundamentales para generar la oferta de viajes de la aplicación.
 
El relevamiento todavía no permite determinar si existe una cantidad suficiente de conductores dispuestos a compartir sus viajes, por lo que este punto continúa siendo el supuesto crítico del producto.
 
### Estudiantes pasajeros
 
Estudiantes que utilizan principalmente transporte público o dependen de familiares y conocidos y buscan una alternativa para trasladarse hacia o desde la UNLaM.
 
### Usuario primario
 
**Estudiantes pasajeros.**
 
El relevamiento confirmó que este grupo experimenta problemas concretos relacionados con los tiempos de espera, la imprevisibilidad del transporte y la inseguridad durante los viajes nocturnos. Por este motivo continúa siendo el usuario primario del producto.
 
## Estado de los supuestos
 
### Supuesto 1 — Sin evidencia
 
Existen estudiantes que viajan regularmente en auto a la UNLaM, cuentan con lugares disponibles y estarían dispuestos a compartir sus viajes.
 
Continúa siendo el supuesto crítico. El relevamiento no aporta evidencia suficiente para confirmarlo ni para refutarlo: al haberse relevado al grupo primario de pasajeros, un solo usuario resultó ser conductor. U1 es la única de los tres usuarios relevados que utiliza ocasionalmente auto propio: indicó tener 3 lugares libres habitualmente y respondió "probablemente sí" a llevar a otros estudiantes, motivada por "poder compartir todos los gastos del viaje". Un único caso no permite determinar si existe suficiente oferta de conductores.
 
### Supuesto 2 — Confirmado
 
Los estudiantes que viven a más de 5 km tienen dificultades relacionadas con el costo y tiempo de traslado y están dispuestos a explorar alternativas.
 
Se confirma en su núcleo: los tres usuarios reportaron dificultades concretas de traslado y disposición a explorar alternativas. La dificultad relacionada con el tiempo y la imprevisibilidad del transporte apareció en los tres. El costo del traslado habitual, en cambio, tuvo un impacto menor al esperado: U1 lo calificó con 3/5, U2 con 2/5 y U3 con 3/5. El costo sí se vuelve relevante cuando deben recurrir a una alternativa ante un inconveniente, como el remis que menciona U3.
 
### Supuesto 3 — Confirmado
 
Los estudiantes estarían dispuestos a viajar en el vehículo de otro estudiante de la UNLaM que no conocen previamente.
 
Los tres mostraron disposición, condicionada a contar con información que genere confianza. U1 pide "conocer a la persona o estar seguro que es un estudiante de la facultad" y U3 necesita saber "que por lo menos el perfil no es trucho". Los tres pidieron además alguna forma de historial: referencias de viajes anteriores (U1 y U3) y antigüedad en la universidad (U2). La condición no invalida el supuesto: define qué información debe mostrar el producto para que esa disposición se concrete.
 
### Supuesto 4 — Confirmado
 
Verificar que los usuarios sean estudiantes regulares de la UNLaM aumenta la confianza para compartir viajes.
 
Los tres usuarios calificaron con 5/5 la importancia de esta verificación, y U1 y U3 mencionaron espontáneamente la pertenencia a la universidad al preguntarles de forma abierta qué factores tendrían en cuenta, antes de que el formulario introdujera el tema.
 
### Supuesto 5 — Confirmado
 
Los estudiantes estarían dispuestos a utilizar su correo institucional y presentar un certificado de alumno regular para verificar su pertenencia a la UNLaM.
 
Los tres usuarios aceptaron realizar este proceso y lo consideraron sencillo: U1 lo calificó con 4/5, U2 con 5/5 y U3 con 4/5.
 
### Supuesto 6 — Sin evidencia
 
Existe suficiente coincidencia entre horarios y recorridos como para encontrar viajes compatibles.
 
Las coincidencias existen: los tres usuarios ya tuvieron experiencias compartiendo viajes surgidas de ellas, "salíamos al mismo horario e íbamos a la misma zona" (U2), "un amigo que justo coincidía un día de cursada me ofreció llevarme" (U3). Lo que el relevamiento no permite establecer es si son suficientes, que es lo que afirma el supuesto: tres respuestas no alcanzan para estimar con qué frecuencia se producen. La dificultad se concentra en el viaje de vuelta, donde según U1 "muchas veces los horarios no son los mismos".
 
## Nuevos hallazgos
 
### Seguridad en los viajes nocturnos
 
La inseguridad apareció espontáneamente en el relevamiento y no había sido considerada en el TP1. El formulario no preguntaba nada al respecto y aun así U1 y U3 la mencionaron en el comentario final. Al cursar los tres usuarios durante la noche, reducir la exposición durante la espera y el viaje en transporte público pasa a formar parte del valor ofrecido por el producto.
 
### Coincidencia por cursada
 
Además del recorrido y horario, U1 propuso como nuevo criterio de matching la posibilidad de priorizar estudiantes que compartan una misma cursada. Esto facilitaría especialmente la coordinación del viaje de regreso, ya que tendrían un horario de salida similar.
 
## Hipótesis de valor
 
Creemos que los estudiantes de la UNLaM que cursan presencialmente y tienen dificultades para trasladarse hacia y desde la universidad tienen el problema de depender de un transporte con esperas impredecibles y de no tener una alternativa accesible cuando falla, además de la inseguridad de viajar y esperar de noche.
 
Nuestra solución es UNLaM Carpool, una aplicación que conecta a estudiantes verificados de la UNLaM con recorridos y horarios compatibles, priorizando a los que comparten cursada, y que muestra el historial de viajes previos de cada usuario.
 
Sabremos que estamos en lo correcto cuando, durante la prueba del MVP, al menos 2 de los 3 usuarios relevados logren encontrar un viaje compatible y estén dispuestos a utilizarlo como alternativa a su medio de transporte habitual.
 
## Scope del MVP
 
El MVP se centra en validar la hipótesis de valor mediante el flujo del estudiante pasajero, desde que ingresa a la aplicación hasta que consigue un viaje compatible.
 
### Elementos incluidos
 
El MVP incluye las siguientes funcionalidades:
 
* Registro y verificación de estudiantes mediante correo institucional y certificado de alumno regular.
* Búsqueda de viajes indicando origen, destino y horario aproximado.
* Selección de solo ida, ida y vuelta o solo vuelta, con intercambio de origen y destino y sugerencias de ubicaciones.
* Listado y priorización de viajes compatibles según ubicación, recorrido y horario, con primero los de quienes cursan con el pasajero ese día.
* Etiqueta de coincidencia con la cursada: el pasajero marca sus comisiones y ve "Cursan juntos" en los conductores que cursan la misma materia, el mismo día y en el mismo horario.
* Detalle del viaje con información del conductor, su vehículo y patente, su condición de estudiante verificado y referencias de viajes anteriores.
* Costo estimado por persona al consultar un viaje. Es el que indicaría el conductor al publicar y está precargado en cada viaje, junto con su tipo de recorrido, porque la publicación queda excluida.
* Solicitud y confirmación de un lugar en el viaje, y cancelación con confirmación previa.
* Opciones para volver o cancelar en los distintos flujos.
### Elementos excluidos
 
* Integración real con SIU Guaraní: la verificación puede simularse sin afectar la prueba de la hipótesis, y la cursada se elige de una lista de comisiones.
* Mapas, geolocalización y cálculo real de rutas: se pueden usar recorridos previamente cargados.
* Publicación de viajes por conductores: el MVP se centra en el flujo del pasajero y los viajes están precargados. Lo que el TP4-B pide al conductor (costo estimado y tipo de recorrido) ya viene cargado en cada viaje.
* Sistema completo de reputación: alcanza con mostrar referencias simuladas para evaluar su efecto en la confianza.
* Pagos, chat, notificaciones y seguimiento en tiempo real: no son necesarios para determinar si el usuario encuentra y elige un viaje compatible.
## Qué se construye y qué se simula
 
**Registro y perfil:** Se construyen las pantallas y datos básicos del usuario. La verificación real con UNLaM se simula, ya que se busca evaluar la percepción de confianza, no la integración técnica.
 
**Búsqueda y matching:** Se construyen la búsqueda por origen, destino, horario y el filtrado básico. Los viajes disponibles se precarga, permitiendo probar el flujo sin depender de conductores reales.
 
**Compatibilidad del viaje:** Se construyen criterios simples de horario y recorrido. El cálculo real mediante mapas y APIs se simula, ya que la lógica simplificada alcanza para validar la hipótesis.
 
**Detalle y referencias del conductor:** Se construye la pantalla con datos del viaje y conductor. El historial y calificaciones se precarga, permitiendo evaluar si las referencias generan confianza.
 
**Solicitud y confirmación:** Se construye el flujo completo del pasajero. La aceptación del conductor se simula, ya que el experimento está centrado en el usuario pasajero.
 
**Cursada:** Se construyen la carga de comisiones, la etiqueta "Cursan juntos" y la prioridad en el listado. Las comisiones de los conductores se precargan y la lista de comisiones reemplaza a SIU Guaraní.
 
**Costo y tipo de recorrido del conductor:** Se precarga en cada viaje lo que el conductor habría indicado al publicar: el tipo de recorrido y el estimado por persona, distancia ÷ 15 km por litro × $2.300 por litro, dividido entre quienes viajan. Las distancias son aproximadas y el pago se arregla entre las personas.
 
## Flujo principal del MVP
 
El flujo principal sigue el recorrido del estudiante pasajero desde que ingresa hasta que obtiene una alternativa concreta de traslado.
 
1. El usuario ingresa a UNLaM Carpool con su perfil de estudiante verificado y, si quiere, carga su cursada.
2. Indica su origen, destino y horario aproximado de viaje.
3. La aplicación muestra los viajes compatibles disponibles: primero los de quienes cursan con el usuario ese día, con la etiqueta "Cursan juntos", y después por horario y recorrido.
4. El usuario selecciona un viaje y consulta el detalle del recorrido y la información del conductor, incluyendo su condición de estudiante verificado y referencias de viajes anteriores.
5. Si considera que la opción es adecuada y confiable, solicita un lugar.
6. La aplicación confirma la solicitud y muestra los datos principales del viaje.
El flujo termina cuando el usuario obtiene una alternativa concreta de traslado y manifiesta su intención de utilizarla, que es justamente lo que se busca comprobar con la hipótesis formulada en el TP2.
 
## Atributos de usabilidad priorizados
 
Para el estudiante pasajero se priorizan dos atributos que atacan los problemas centrales identificados: **eficiencia** y **satisfacción**.
 
### Eficiencia
 
El usuario debe encontrar un viaje compatible en pocos pasos y sin demoras. El principal problema relevado fue "la espera y la poca previsibilidad del transporte público". U3 mencionó: "no saber si el colectivo o el tren van a tardar en venir". Si la aplicación agregara fricción, reproduciría la misma molestia que el usuario ya sufre. Por esto, minimizar la cantidad de pasos y el tiempo para encontrar y confirmar un viaje es crítico.
 
### Satisfacción
 
La experiencia debe transmitir confianza y seguridad al elegir con quién viajar. En el relevamiento fue condición explícita: U1 pidió "estar seguro que es un estudiante de la facultad" y U3 necesita saber "que por lo menos el perfil no es trucho", a lo que se sumó la inseguridad nocturna (U3: no tener que "estar atento a que me roben"). Como los tres cursan de noche, la seguridad percibida es parte del valor. La información sobre el conductor, su verificación y sus referencias deben ser claras y confiables.
 
## Métricas y criterio de éxito
 
El detalle está en [`docs/metricas.md`](metricas.md). Una métrica es accionable si, cuando cambia, sabemos qué cambiar o qué decidir.
 
* **Métrica accionable 1, tasa de solicitud:** el porcentaje de usuarios que, buscando su recorrido y su horario reales, solicitan un lugar sin ayuda.
* **Métrica accionable 2, tasa de reemplazo:** el porcentaje de usuarios que eligen un día concreto de su semana para usar la aplicación en lugar de su transporte y dejan un contacto.
* **Métrica vanidosa:** la cantidad de usuarios registrados.
* **La hipótesis se sostiene** si las dos tasas llegan al 67 % (2 de 3), el umbral de la hipótesis del TP2. **Se refuta** si la tasa de reemplazo es de 33 % o menos.
 
## Aprendizajes de la prueba
 
La evidencia está en `docs/evidencia/tp5/` y el análisis en `docs/informe-tp5.md`.
 
### Sobre el producto
 
* **Los viajes largos son el caso fuerte.** U1 y U3, que tardan entre 45 minutos y 1 hora, eligieron un día concreto para reemplazar su transporte: "Los martes, que salgo a las 23" (U1) y "Los lunes y los miércoles" (U3).
* **Para viajes cortos es un respaldo.** U2, a 8 km y 20 minutos, lo usaría "cuando hay paro o llueve", no un día fijo.
* **La cursada compartida genera confianza.** A U3 le cambió la elección: eligió a Juan, que cursa con su comisión y sale 30 minutos después, antes que a Marina: "Si lo veo en clase, ya no es un desconocido". A U1 le confirmó la que ya era la mejor por horario.
* **En viajes largos, las referencias también pesan.** U1 y U3 compararon dos conductores y citaron referencias y cantidad de viajes. U2 eligió solo por horario.
* **La verificación tiene que verse real.** U3 dudó de un certificado aprobado en 3 segundos: "Entonces cualquiera sube cualquier cosa."
* **Hay interés del lado del conductor.** U1, que maneja, buscó dónde ofrecer su auto. Es un solo caso y no confirma la oferta.
* **El costo no frenó a nadie.** Los tres lo vieron barato. U1 lo comparó con el remis y U3 con el colectivo y el tren juntos.
 
### Sobre la usabilidad
 
* Los tres completaron el flujo sin rescate.
* "Solo ida" elegido de antemano llevó a U3 a una búsqueda sin resultados.
* U2 no notó el día y pidió el viaje para el día equivocado.
* Las sugerencias no reconocen barrios: U3 escribió "Padua Sur" y recibió un error.
* El código de ingreso aparece en pantalla, pero U1 y U3 lo buscaron en su correo.
* La cursada depende de que la carguen: U2 omitió el paso ("eran un montón de materias para marcar") y U3 preguntó qué pasaba si su comisión no estaba.
 
## Estado de la hipótesis
 
**Se sostiene según el criterio de éxito.** La tasa de solicitud es de 67 %: U1 y U3 pidieron un lugar sin ayuda, y U2 lo pidió para el día equivocado. La tasa de reemplazo también es de 67 %: U1 y U3 eligieron un día concreto y dejaron contacto, y U2 lo usaría solo "cuando hay paro o llueve".
 
**Límites de esta conclusión:**
 
* La prioridad por cursada se evaluó con dos usuarios: U2 no cargó su cursada.
* La existencia de conductores no se evaluó, porque los viajes estaban precargados.
* La tasa de solicitud puede estar dando una lectura optimista: en la prueba siempre hay un viaje que coincide, todos los conductores son buenos y pedir un lugar no exige subirse a un auto.
* Las métricas se reformularon después de las sesiones. Los umbrales son los de la hipótesis del TP2.
* Las sesiones fueron simuladas a partir del TP2. La decisión debe confirmarse con conductores y viajes reales.
 
### Estado de los supuestos después de la prueba
 
| Supuesto | Estado en la v3 | Estado en la v4 |
| --- | --- | --- |
| 1. Hay conductores dispuestos a compartir | Sin evidencia | Sin evidencia. U1 buscó cómo ofrecer su auto, pero es un solo caso |
| 2. Quienes viven a más de 5 km tienen dificultades y explorarían alternativas | Confirmado | Confirmado con matiz: como reemplazo, para viajes de 45 minutos o más; como respaldo, para viajes cortos |
| 3. Viajarían con un estudiante que no conocen | Confirmado | Confirmado: los tres solicitaron un lugar. Si comparten cursada, prefieren a quien ven en clase |
| 4. La verificación aumenta la confianza | Confirmado | Confirmado, con la condición de que la revisión se perciba real |
| 5. Aceptan correo institucional y certificado | Confirmado | Confirmado: los tres completaron el ingreso |
| 6. Hay suficiente coincidencia de horarios y recorridos | Sin evidencia | Sin evidencia: los viajes estaban preparados para coincidir |
 
## Decisión: pivotar o perseverar
 
**Perseverar.** El criterio de éxito se cumple en las dos métricas, y los dos usuarios que suman reproducen el problema central del TP2 con un día concreto de su semana y eligieron por la cursada compartida y las referencias. El caso de U2 muestra dónde está el valor, no que la hipótesis sea falsa.
 
**Lo próximo a construir:**
 
1. **Publicación de viajes por conductores**, para poner a prueba el supuesto 1, que sigue siendo el crítico.
2. **Correcciones de usabilidad de la prueba:** tipo de recorrido sin opción elegida de antemano, día más visible, barrios en las sugerencias y aviso claro de dónde llega el código.
3. **Revisión del certificado con plazo y aviso**, para que la verificación se perciba real.
4. **Cursada sin esfuerzo:** traerla de SIU Guaraní o, mientras tanto, buscar la comisión escribiendo su nombre.
 
**Qué cambiaría la decisión:** si al abrir la publicación no aparecen conductores para la cursada nocturna, correspondería un pivote de necesidad del consumidor: una alternativa para días de paro y demoras, el uso que sí valoró U2.
