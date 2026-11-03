# Diseño del MVP

El MVP respeta la Alternativa A del TP3, optimizada para satisfacción y confianza, y conserva el orden de sus 6 pantallas.

## Del wireframe al MVP

| Pantalla del wireframe | En el MVP | Qué mejora |
| --- | --- | --- |
| 1. Login | Portada, correo, código, datos, cursada y certificado | La verificación pasa a ser un recorrido con pasos visibles |
| 2. Buscar viaje | Formulario de recorrido | Tipo de recorrido, intercambio, sugerencias y día |
| 3. Viajes disponibles | Tarjetas con coincidencia | Explica por qué se recomienda cada viaje, marca "Cursan juntos" y muestra el costo |
| 4. Detalle del conductor | Credencial del conductor | Los datos de confianza y el auto quedan juntos |
| 5. Confirmar viaje | Revisión antes de solicitar | Viaje, conductor, auto y costo en una sola vista |
| 6. Solicitud confirmada | Pase de viaje | Datos del viaje, recordatorio de seguridad y opción de cancelar |

## Correcciones del TP4-B incluidas

| Corrección aceptada | Dónde está |
| --- | --- |
| Vehículo y patente junto al conductor | Detalle, confirmación y pase |
| Costo estimado por persona | Resultados, detalle, confirmación y pase. Como no se publican viajes, está precargado y no lo escribe un conductor |
| Botones para volver o cancelar | Cabecera de cada flujo |
| Cancelar un viaje solicitado, con confirmación | Pase de viaje |
| Solo ida, ida y vuelta o solo vuelta | Búsqueda. Para el conductor, cada viaje precargado ya tiene su tipo |
| Botón para intercambiar origen y destino | Formulario de recorrido. Se oculta en ida y vuelta porque incluye los dos sentidos |
| Sugerencias de ubicaciones | Campo de localidad |
| Etiqueta de coincidencia con la cursada | Paso opcional "Tu cursada" en el registro, editable desde el perfil. Etiqueta "Cursan juntos" en resultados y detalle, y esos viajes van primero |

También se aplica un aprendizaje del TP4-B: buscar viajes y consultar los viajes activos están separados, con la sección "Mis viajes".

**La etiqueta de cursada,** que el TP4-B había dejado para después, se incluye porque la hipótesis prioriza a quienes comparten cursada. Sin SIU Guaraní, cada estudiante marca sus comisiones de una lista; el color ámbar la distingue del verde de la verificación.

## Verificación y confianza

| Control | Qué exige o muestra | Hallazgo que responde |
| --- | --- | --- |
| Correo institucional | Dominio completo `unlam.edu.ar` o `alumno.unlam.edu.ar`, y código de 6 números con 3 intentos y 10 minutos | U1: "estar seguro que es un estudiante de la facultad" |
| Certificado de alumno regular | PDF, JPG o PNG de hasta 5 MB. Sin aprobación no se accede a ninguna pantalla | Supuestos 4 y 5 |
| Credencial | Verificación, carrera y antigüedad | U3: "que por lo menos el perfil no es trucho". U2: "hace cuanto tiempo estudia" |
| Referencias y viajes | Calificación, cantidad de viajes y comentarios | U1 y U3 pidieron historial |
| Recordatorio de seguridad | Estudiante verificado, patente y compartir la ubicación con alguien de confianza | Inseguridad nocturna (Decisión 3 del TP3) |
| Privacidad | El correo no se muestra y el teléfono del conductor se ve solo con el viaje confirmado | — |

## Costo

```text
costo de nafta = km ÷ 15 km por litro × $2.300 por litro
costo por persona = costo de nafta ÷ personas en el auto (incluye a quien maneja)
```

Se redondea a $10 y se identifica como estimado. Ida y vuelta duplica la distancia.

**Ejemplo:** San Antonio de Padua (14 km), auto con 3 lugares: nafta de $2.146,67, $540 por persona.

Los valores están en `src/js/core/config.js`. El pago se arregla entre las personas, porque el TP3 excluye los pagos.

## Decisiones de interfaz

* **Tema claro.** Lo pidió el equipo: se lee bien de día y en la calle.
* **Pensado para celular.** Una sola columna, botones de al menos 44 px y la acción principal siempre a mano.
* **Colores con significado.** Ámbar para actuar y verde solo para lo verificado, así el verde conserva su valor como señal de confianza.
* **Credencial del conductor.** Junta en un solo lugar quién es, qué se verificó y desde cuándo estudia en la UNLaM.
* **Pase con forma de boleto.** Junta lo que hace falta en la vereda: horario, patente y punto de encuentro.
* **Accesibilidad.** Etiquetas en todos los campos, navegación con teclado, errores por campo y respeto por la opción de reducir el movimiento.

**Costo de estas decisiones:** son 6 pasos con información repetida, como eligió el equipo en el TP3. Si en la prueba eligen por horario sin mirar al conductor, hay que acortar el flujo.
