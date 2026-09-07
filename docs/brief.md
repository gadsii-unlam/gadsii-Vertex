# Brief de Producto
UNLaM Carpool — Brief de Producto

**Versión 2.0 — TP2**

## Cambios respecto de la versión 1

A partir del relevamiento realizado con usuarios reales, se actualizaron el perfil del usuario primario, sus necesidades, problemas y contexto de uso. También se revisaron los supuestos definidos en el TP1 y se incorporaron nuevos hallazgos que no habían sido considerados inicialmente, principalmente la inseguridad en los traslados nocturnos y la posibilidad de priorizar viajes entre estudiantes que comparten cursada.

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

* Publicación de viajes indicando origen, destino, fecha, horario y lugares disponibles.

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

Las coincidencias existen: los tres usuarios ya tuvieron experiencias compartiendo viajes surgidos de ellas, "salíamos al mismo horario e íbamos a la misma zona" (U2), "un amigo que justo coincidía un día de cursada me ofreció llevarme" (U3). Lo que el relevamiento no permite establecer es si son suficientes, que es lo que afirma el supuesto: tres respuestas no alcanzan para estimar con qué frecuencia se producen. La dificultad se concentra en el viaje de vuelta, donde según U1 "muchas veces los horarios no son los mismos".

## Nuevos hallazgos

### Seguridad en los viajes nocturnos

La inseguridad apareció espontáneamente en el relevamiento y no había sido considerada en el TP1. El formulario no preguntaba nada al respecto y aun así U1 y U3 la mencionaron en el comentario final. Al cursar los tres usuarios durante la noche, reducir la exposición durante la espera y el viaje en transporte público pasa a formar parte del valor ofrecido por el producto.

### Coincidencia por cursada

Además del recorrido y horario, U1 propuso como nuevo criterio de matching la posibilidad de priorizar estudiantes que compartan una misma cursada. Esto facilitaría especialmente la coordinación del viaje de regreso, ya que tendrían un horario de salida similar.

## Hipótesis de valor

Creemos que los estudiantes de la UNLaM que cursan presencialmente y tienen dificultades para trasladarse hacia y desde la universidad tienen el problema de depender de un transporte con esperas impredecibles y de no tener una alternativa accesible cuando falla, además de la inseguridad de viajar y esperar de noche.

Nuestra solución es UNLaM Carpool, una aplicación que conecta a estudiantes verificados de la UNLaM con recorridos y horarios compatibles, priorizando a los que comparten cursada, y que muestra el historial de viajes previos de cada usuario.

Sabremos que estamos en lo correcto cuando, durante la prueba del MVP, al menos 2 de los 3 usuarios relevados logren encontrar un viaje compatible y estén dispuestos a utilizarlo como alternativa a su medio de transporte habitual.
