# Plan de la sesión de prueba — TP5

Este plan se escribe antes de las sesiones. Las métricas y el criterio de éxito están en [`docs/metricas.md`](../../metricas.md) y no se tocan después de probar.

## Participantes

Mínimo 3 usuarios reales del segmento del TP1, en lo posible los mismos del TP2: U1, U2 y U3.

## Antes de cada sesión

1. Abrir el MVP en el celular del participante, o en uno prestado si no puede.
2. Ir a `#/_sesion`, elegir U1, U2 o U3, y tocar **Borrar todo y preparar otra sesión** si quedaron datos. Volver a elegir el participante.
3. Tener un PDF cualquiera en el celular para usar como certificado.
4. Empezar la grabación de pantalla, si el participante acepta.

## Lo que se le dice al participante

> Gracias por venir. Estamos probando la aplicación, no a vos: si algo no se entiende, el problema es de la aplicación. Te vamos a contar situaciones y vos hacé lo que harías en la vida real. Pensá en voz alta. No podemos ayudarte, porque justamente queremos ver qué pasa cuando estás solo.
>
> No subas tu certificado real ni uses una contraseña: te damos un PDF de prueba si lo necesitás. Podés cortar cuando quieras. ¿Podemos grabar la pantalla?

Si no tiene correo institucional a mano, puede escribir cualquier dirección inventada con terminación `@alumno.unlam.edu.ar`.

## Tareas

Se cuentan como situaciones y nunca nombran un botón. Antes de empezar, reemplazar los datos entre corchetes por los reales del participante: su localidad y su horario.

**T1. Primer ingreso.**
> Un compañero te pasó esta aplicación para compartir viajes con gente de la facu. Querés empezar a usarla.

**T2. Conseguir un viaje (flujo principal).**
> Es [día de cursada]. Salís de cursar a las [hora de salida] y hay paro de colectivos. Tenés que volver a [localidad]. Conseguí cómo volver.

**T3. Decidir con quién.**
> Si te quedaran dudas sobre con quién viajar, hacé lo que harías antes de decidirte. Decinos en voz alta con cuál te subirías y por qué.

Esta tarea se dice recién si el participante eligió muy rápido, para no inducir la respuesta en la observación principal.

**T4. Cambio de planes.**
> Te avisaron que se suspendió la clase y ya no vas a necesitar ese viaje.

## Qué se observa

* Dónde duda: pausas de más de 5 segundos, vueltas atrás, lectura repetida.
* Dónde se equivoca: errores de validación, pantallas a las que no quería ir.
* Dónde pide ayuda: se anota el pedido textual y **no se responde**.
* Qué hace distinto de lo esperado.
* Si abre el perfil del conductor antes de solicitar y cuánto tiempo se queda ahí.
* Qué parte del perfil mira y qué dice cuando la mira.
* Si carga su cursada, y si mira o menciona la etiqueta "Cursan juntos" al elegir.
* Qué dice sobre el precio.
* Si dice algo sobre la seguridad o la noche sin que se lo pregunten.

## Cómo se registra

| Qué | Dónde |
| --- | --- |
| Notas de observación y citas | `U1.md`, `U2.md` y `U3.md` en esta carpeta |
| Eventos y tiempos de la aplicación | Botón **Descargar registro** en `#/_sesion`. Guardar como `eventos-U1.json`, etc. |
| Grabación de pantalla | Se guarda fuera del repositorio. Si pesa poco, puede subirse a esta carpeta con el permiso del participante |

Una persona conduce la sesión y otra toma notas. Nadie más interviene.

## Reglas

* El equipo observa y no ayuda. Si el usuario se traba, eso es el dato.
* Si después de 3 minutos trabado no puede seguir, se anota **"rescate"**, se le indica cómo avanzar y ese usuario ya no suma en la métrica 1.
* Se registra lo que hace, no solo lo que dice. Cuando no coinciden, vale lo que hace.
* No se graba ni se commitea el nombre ni el contacto real de los participantes.

## Preguntas de cierre

Se hacen en este orden, sin mostrar la aplicación. Las abiertas van primero para no sugerir las respuestas.

1. Contame cómo elegiste ese viaje. ¿Qué miraste para decidirte?
2. ¿Hay algo que te hubiera hecho no subirte?
3. La última vez que tuviste un problema para volver de la facu, ¿qué hiciste? ¿Qué harías la próxima vez?
4. ¿Hay algún viaje de tu semana en el que usarías esto en lugar de lo que usás hoy? ¿Cuál?
5. Si lo lanzamos y hay viajes reales por tu zona, ¿querés que te avisemos? ¿A dónde te escribimos?
6. ¿Qué te pareció el costo que viste?
7. ¿Qué le cambiarías?

Recién después de la pregunta 5 se cuenta que los viajes y las personas eran de prueba. El contacto se guarda fuera del repositorio; en la planilla solo se marca si lo dejó.

## Después de cada sesión

1. Completar la planilla del participante en el momento.
2. Descargar el registro de eventos.
3. Commitear la evidencia en `docs/evidencia/tp5/` sin datos personales.

## Cómo se realizaron

Las sesiones se simularon con autorización de la cátedra, a partir del perfil y las respuestas de U1, U2 y U3 en el TP2. Se siguieron estas mismas tareas, preguntas y reglas de conteo, sobre el MVP de la rama `tp5-mvp-scope`. Los tiempos son de cronómetro y no se adjuntan grabaciones ni registros de eventos.

| Usuario | Fecha | Duración | Datos de T2 | Planilla |
| --- | --- | --- | --- | --- |
| U1 | 01/11/2026 | 20 min | Martes, sale 23:00, vuelve a San Antonio de Padua | [`U1.md`](U1.md) |
| U2 | 02/11/2026 | 14 min | Mañana martes, sale 22:00, vuelve a Rafael Castillo | [`U2.md`](U2.md) |
| U3 | 01/11/2026 | 23 min | Lunes, sale 22:00, vuelve a San Antonio de Padua | [`U3.md`](U3.md) |

El día de T2 se eligió entre los 4 que ofrece la aplicación y entre los días de cursada de cada participante.

Después de las sesiones, el equipo reformuló las métricas de `docs/metricas.md` como dos tasas simples, y el conteo de cada planilla usa esa versión.
