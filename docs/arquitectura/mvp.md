# Arquitectura del MVP

## Decisiones y quién las tomó

| Decisión | Quién la tomó | Por qué |
| --- | --- | --- |
| Construir únicamente el flujo del pasajero | Equipo, en el TP3 | La publicación está excluida y los viajes se precargan |
| Nafta a $2.300 por litro y consumo de 15 km por litro | Equipo | Valores pedidos para calcular el costo |
| Aplicar a los viajes precargados las correcciones del TP4-B que hablan de publicar | Herramienta (Claude), a revisar por el equipo | El TP3 excluye la publicación y la consigna pide solo ese scope |
| HTML, CSS y JavaScript sin framework ni dependencias | Herramienta (Claude) | Se puede publicar gratis y no hay nada que instalar para correrlo |
| Publicarlo en el NAS del equipo con Docker, en `carpool.timecore.com.ar` | Equipo | Se abre con un enlace, sin instalar nada |
| Sin backend: los datos viven en el `localStorage` del navegador | Herramienta (Claude) | La prueba es de una persona por vez y los viajes están precargados |
| Ingreso con correo y código, sin contraseña | Herramienta (Claude) | Un prototipo no debería recibir contraseñas: los participantes podrían repetir una real |
| Costo precargado: la nafta dividida en partes iguales con el auto completo | Herramienta (Claude), a revisar por el equipo | U3 contó que "dividimos la nafta" y U1 quiere "compartir todos los gastos" |
| Elegir el día, además del horario | Herramienta (Claude), a revisar por el equipo | Sin día, un pedido de lugar no queda definido |
| Sección "Mis viajes" | Herramienta (Claude), a partir del TP4-B | El TP4-B pide cancelar desde el detalle del viaje y separar buscar de consultar viajes activos |
| Incluir la etiqueta de cursada en el MVP | Equipo | La hipótesis prioriza a quienes comparten cursada y es una corrección aceptada del TP4-B |
| Carrera elegida de una lista, y cursada cargada en la sección "Mi cursada" del menú: materia de esa carrera, comisión y un turno (mañana, tarde o noche), con un botón para agregar más materias | Equipo | Sin carrera ni materias no se puede saber si dos estudiantes cursan juntos |
| Comisiones precargadas con código por día (1900 lunes, 2900 martes, hasta 5900 viernes); cada materia se dicta solo algunos días | Equipo | Simula la oferta de comisiones, porque el TP3 excluye SIU Guaraní |
| Prioridad absoluta en el listado para quien cursa con el pasajero | Herramienta (Claude), a revisar por el equipo | Sigue lo que dice la hipótesis |
| Diseño adaptable: navegación abajo en el celular y arriba en la computadora | Equipo | El MVP se abre desde el celular y desde la página web |

## Estructura

```text
src/
  index.html          Punto de entrada
  styles/app.css      Tokens de diseño y estilos
  js/
    core/             Reglas de negocio, sin interfaz
      config.js       Precio de la nafta, consumo y otros valores
      costo.js        Cuenta del costo estimado
      matching.js     Componente propio: qué viajes le sirven a cada pasajero
      cursada.js      Carreras, materias, comisiones, turnos y coincidencia de cursada
      verificacion.js Correo, certificado, código y permisos
      recorrido.js    Validación de la búsqueda
      localidades.js  Localidades y distancias precargadas
    data.js           Conductores y viajes ficticios
    store.js          Estado, persistencia y registro de eventos
    router.js         Navegación y control de acceso
    views/            Pantallas
```

## Componente de software propio

El componente propio definido en el TP1 es la lógica de matching y gestión de viajes.

**Filtra** los viajes de conductores verificados, con lugares libres, con el mismo sentido, de la misma localidad y dentro de una hora del horario pedido. El recorrido es la localidad precargada, porque el TP3 excluye el cálculo de rutas.

**Ordena** primero los viajes de quienes cursan con el pasajero el día del viaje (misma materia, comisión y turno) y después por un puntaje de 0 a 100: horario (70), calificación (20) y experiencia (10). La confianza pesa menos porque todos los conductores ya están verificados.

## Qué se construye y qué se simula

| Elemento | Funciona de verdad | Se simula |
| --- | --- | --- |
| Correo institucional | Validación del dominio, código, vencimiento e intentos | El envío del correo: el código aparece como notificación en pantalla |
| Certificado | Tipo, tamaño y bloqueo de pantallas | La revisión. Se aprueba sola a los 3 segundos. El archivo no se guarda ni sale del navegador |
| Búsqueda y matching | Todo | Los viajes están precargados y las distancias son aproximadas |
| Detalle y referencias | Se muestran | Personas, autos, historial y comentarios ficticios |
| Cursada | Carrera, carga de materias, comisiones y turnos, etiqueta y prioridad | Las listas de carreras, materias y comisiones, y la cursada de los conductores |
| Solicitud | Lugares, duplicados y cancelación | La aceptación del conductor, a los 5 segundos |

## Límite de seguridad

Este MVP sirve para una prueba guiada, no para uso real. Todas las verificaciones corren en el navegador, así que alguien con conocimientos técnicos puede evitarlas. Una versión real necesita un backend que controle la identidad, los documentos y los permisos.
