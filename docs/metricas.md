si # Métricas y criterio de éxito — TP5

## Hipótesis que se pone a prueba

La hipótesis de valor del TP2 termina así:

> Sabremos que estamos en lo correcto cuando, durante la prueba del MVP, al menos 2 de los 3 usuarios relevados logren encontrar un viaje compatible y estén dispuestos a utilizarlo como alternativa a su medio de transporte habitual.

Esa frase tiene dos partes, y cada métrica mide una: **encontrar y pedir un viaje**, y **usarlo en lugar de su transporte**.

## Métrica accionable 1 — Tasa de solicitud

**Qué mide:** el porcentaje de usuarios que, buscando su recorrido y su horario reales, solicitan un lugar en un viaje sin ayuda del equipo.


tasa de solicitud = usuarios que solicitan un lugar sin ayuda ÷ usuarios que buscan un viaje


**Qué hacemos si cambia:**

| Resultado | Qué significa | Qué hacemos |
| --- | --- | --- |
| 67 % o más (2 o 3 de 3) | El usuario encuentra un viaje que le sirve y lo pide | Pasamos a mirar la métrica 2 |
| Menos de 67 %, y se traban en una pantalla | El problema es la usabilidad | Corregimos esa pantalla y volvemos a probar |
| Menos de 67 %, y ven viajes pero no los eligen | No confían en el conductor o no les sirve el viaje | Revisamos qué dato del conductor les faltó, o el horario y el recorrido |

## Métrica accionable 2 — Tasa de reemplazo

**Qué mide:** el porcentaje de usuarios que, al final de la sesión, eligen un día concreto de su semana para usar la aplicación en lugar de su transporte habitual y dejan un contacto para que les avisemos cuando haya viajes reales.


tasa de reemplazo = usuarios que nombran un día concreto y dejan un contacto ÷ usuarios que probaron el MVP


Respuestas como "lo usaría a veces" o "cuando haga falta" no cuentan: no nombran un viaje que dejarían de hacer en colectivo.

**Qué hacemos si cambia:**

| Resultado | Qué significa | Qué hacemos |
| --- | --- | --- |
| 67 % o más (2 o 3 de 3) | El producto compite con su transporte | Perseveramos y validamos la oferta de conductores |
| Menos de 67 %, pero solo lo quieren cuando el transporte falla | Les sirve como respaldo, no como reemplazo | Evaluamos un pivote de necesidad: una alternativa para paros y demoras |
| Menos de 67 %, y no lo usarían nunca | No resuelve un problema que les importe | Revisamos el problema y el segmento elegidos |

**Por qué se miran juntas:** si la tasa de solicitud es alta y la de reemplazo es baja, la aplicación se usa bien pero no cambia ningún hábito. Ahí el problema no es la interfaz, sino el valor que ofrece.

## Métrica vanidosa — Cantidad de usuarios registrados

**Por qué parece importante:** se ve como crecimiento. En una presentación diría "el 100 % de los usuarios se registró y se verificó".

**Por qué no indica progreso real:**

* Los tres se registran porque los invitamos y la tarea se lo pide.
* La verificación es automática: no se rechaza a nadie.
* Puede dar 3 de 3 aunque nadie deje de tomarse un colectivo. Si sube o baja, no sabemos qué cambiar.

Es el equivalente a los likes: dice cuánta gente pasó, no si el producto le resolvió algo.

## Criterio de éxito

Se aplica a U1, U2 y U3. El umbral de 2 de 3 es el que fijó la hipótesis del TP2.

| Resultado | Condición |
| --- | --- |
| **La hipótesis se sostiene** | Tasa de solicitud de 67 % o más **y** tasa de reemplazo de 67 % o más |
| **La hipótesis se refuta** | Tasa de reemplazo de 33 % o menos, aunque la de solicitud sea alta |
| **No se puede concluir** | Tasa de solicitud de 33 % o menos por problemas de usabilidad: se corrige y se vuelve a probar |

### Reglas para contar

* Si el equipo rescata a un usuario, ese usuario no suma en la tasa de solicitud.
* Cuando lo que dice no coincide con lo que hace, vale lo que hace.
* Si hay dudas sobre cómo contar un caso, se cuenta en contra de la hipótesis.

## Qué no miden estas métricas

* **Que existan conductores:** los viajes de la prueba están precargados.
* **Por qué eligen a un conductor:** si deciden por la verificación y las referencias o por el horario se registra como observación, no como métrica.

