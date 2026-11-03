import { CODIGO_MAX_INTENTOS } from '../core/config.js';
import { CARRERAS } from '../core/cursada.js';
import {
  comprobarCodigo,
  crearCodigo,
  estadoRevision,
  normalizarEmail,
  validarAnioIngreso,
  validarArchivo,
  validarEmailInstitucional,
  validarNombre,
} from '../core/verificacion.js';
import { navegar, refrescar } from '../router.js';
import { crearOContinuarCuenta, enviarCertificado, estado, guardar, track } from '../store.js';
import { campo, html, icono, mostrarErrores } from '../ui.js';

const pasos = (actual) => html`<ol class="pasos" aria-label="Paso ${actual} de 3">
  ${['Correo', 'Tus datos', 'Certificado'].map((texto, i) => html`<li class="${i + 1 < actual ? 'hecho' : i + 1 === actual ? 'actual' : ''}" aria-current="${i + 1 === actual ? 'step' : 'false'}"><i>${i + 1 < actual ? icono('check') : i + 1}</i>${texto}</li>`)}
</ol>`;

export function bienvenida() {
  return {
    titulo: 'Bienvenida',
    sinCabecera: true,
    cuerpo: html`<section class="portada">
      <div class="portada-noche" aria-hidden="true">
        <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMax slice">
          <path class="portada-ruta" d="M-10 245 C 90 245, 110 150, 200 150 S 320 80, 410 60" fill="none" style="stroke:var(--ambar)" stroke-width="3" stroke-linecap="round"/>
          <circle cx="200" cy="150" r="5" fill="var(--ambar)"/><circle cx="200" cy="150" r="13" fill="none" stroke="var(--ambar)" opacity=".4"/>
          <circle cx="330" cy="86" r="5" fill="var(--verificado)"/><circle cx="330" cy="86" r="13" fill="none" stroke="var(--verificado)" opacity=".4"/>
        </svg>
      </div>
      <p class="portada-marca">UNLaM Carpool</p>
      <h1 tabindex="-1">Volvé de la facu con alguien de la facu.</h1>
      <p class="portada-texto">Compartí viajes con estudiantes verificados que hacen tu mismo recorrido, a tu mismo horario.</p>
      <ul class="portada-lista">
        <li>${icono('escudo')}Solo estudiantes regulares verificados</li>
        <li>${icono('estrella')}Referencias de sus viajes anteriores</li>
        <li>${icono('auto')}Dividís la nafta y listo</li>
      </ul>
      <a class="btn btn-primario" href="#/ingresar">Empezar con mi correo</a>
    </section>`,
  };
}

export function ingresar() {
  return {
    titulo: 'Ingresá',
    volver: '#/',
    cuerpo: html`${pasos(1)}
      <h1 tabindex="-1">¿Cuál es tu correo de la UNLaM?</h1>
      <p class="bajada">Así sabemos que sos estudiante. Nadie puede entrar sin un correo institucional.</p>
      <form id="form" novalidate>
        ${campo({ nombre: 'email', etiqueta: 'Correo institucional', control: html`<input id="email" name="email" type="email" inputmode="email" autocomplete="email" autocapitalize="none" spellcheck="false" placeholder="nombre@alumno.unlam.edu.ar" value="${estado.emailPendiente ?? ''}">` })}
        <button class="btn btn-primario">Enviarme un código</button>
      </form>
      <p class="nota">${icono('escudo')}No usamos contraseña: cada vez que entrás te mandamos un código a tu correo.</p>`,
    montar(raiz) {
      raiz.querySelector('#form').addEventListener('submit', (evento) => {
        evento.preventDefault();
        const email = evento.target.email.value;
        const error = validarEmailInstitucional(email);
        if (!mostrarErrores(raiz, error ? { email: error } : {})) {
          track('error_validacion', { campo: 'email' });
          return;
        }
        estado.emailPendiente = normalizarEmail(email);
        estado.codigo = crearCodigo();
        track('codigo_pedido');
        guardar();
        navegar('#/codigo');
      });
    },
  };
}

export function codigo() {
  if (!estado.emailPendiente) return { redirigir: '#/ingresar' };
  const vigente = estado.codigo;
  return {
    titulo: 'Código',
    volver: '#/ingresar',
    cuerpo: html`${pasos(1)}
      ${vigente && html`<div class="notificacion" role="status">
        <span class="notificacion-icono">${icono('archivo')}</span>
        <div><small>Correo · ahora</small><b>Tu código de UNLaM Carpool es ${vigente.valor}</b></div>
      </div>`}
      <h1 tabindex="-1">Revisá tu correo</h1>
      <p class="bajada">Mandamos un código de 6 números a <b>${estado.emailPendiente}</b>.</p>
      <form id="form" novalidate>
        ${campo({ nombre: 'codigo', etiqueta: 'Código de 6 números', ayuda: `Vence en 10 minutos. Tenés ${CODIGO_MAX_INTENTOS} intentos.`, control: html`<input id="codigo" class="input-codigo" name="codigo" inputmode="numeric" autocomplete="one-time-code" maxlength="6" placeholder="••••••">` })}
        <button class="btn btn-primario">Confirmar</button>
        <button class="btn btn-sutil" type="button" id="reenviar">Mandarme otro código</button>
      </form>`,
    montar(raiz) {
      raiz.querySelector('#reenviar').addEventListener('click', () => {
        estado.codigo = crearCodigo();
        track('codigo_reenviado');
        guardar();
        refrescar();
      });
      raiz.querySelector('#form').addEventListener('submit', (evento) => {
        evento.preventDefault();
        const resultado = comprobarCodigo(estado.codigo, evento.target.codigo.value);
        estado.codigo = resultado.codigo;
        guardar();
        if (!resultado.ok) {
          track('error_validacion', { campo: 'codigo' });
          mostrarErrores(raiz, { codigo: resultado.error });
          return;
        }
        crearOContinuarCuenta(estado.emailPendiente);
        navegar('#/buscar');
      });
    },
  };
}

export function datos() {
  const usuario = estado.usuario;
  return {
    titulo: 'Tus datos',
    cuerpo: html`${pasos(2)}
      <h1 tabindex="-1">Contanos quién sos</h1>
      <p class="bajada">Es lo que van a ver las personas con las que viajes. Tu correo no se muestra.</p>
      <form id="form" novalidate>
        <div class="fila">
          ${campo({ nombre: 'nombre', etiqueta: 'Nombre', control: html`<input id="nombre" name="nombre" autocomplete="given-name" value="${usuario.nombre ?? ''}">` })}
          ${campo({ nombre: 'apellido', etiqueta: 'Apellido', control: html`<input id="apellido" name="apellido" autocomplete="family-name" value="${usuario.apellido ?? ''}">` })}
        </div>
        ${campo({ nombre: 'carrera', etiqueta: 'Carrera', ayuda: 'Con tu carrera te mostramos sus materias para cargar tu cursada.', control: html`<select id="carrera" name="carrera">
          <option value="">Elegí tu carrera</option>
          ${CARRERAS.map(({ nombre }) => html`<option ${usuario.carrera === nombre ? html`selected` : ''}>${nombre}</option>`)}
        </select>` })}
        ${campo({ nombre: 'anio', etiqueta: '¿En qué año empezaste?', ayuda: 'Se muestra como tu antigüedad en la UNLaM.', control: html`<input id="anio" name="anio" inputmode="numeric" maxlength="4" value="${usuario.anioIngreso ?? ''}" placeholder="2023">` })}
        <button class="btn btn-primario">Seguir</button>
      </form>`,
    montar(raiz) {
      raiz.querySelector('#form').addEventListener('submit', (evento) => {
        evento.preventDefault();
        const form = evento.target;
        const errores = {};
        const agregar = (nombre, error) => { if (error) errores[nombre] = error; };
        agregar('nombre', validarNombre(form.nombre.value, 'nombre'));
        agregar('apellido', validarNombre(form.apellido.value, 'apellido'));
        agregar('carrera', form.carrera.value ? null : 'Elegí tu carrera.');
        agregar('anio', validarAnioIngreso(form.anio.value));
        if (!mostrarErrores(raiz, errores)) {
          track('error_validacion', { campo: Object.keys(errores)[0] });
          return;
        }
        Object.assign(usuario, {
          nombre: form.nombre.value.trim(),
          apellido: form.apellido.value.trim(),
          carrera: form.carrera.value,
          anioIngreso: Number(form.anio.value),
        });
        track('datos_completos');
        guardar();
        navegar('#/buscar');
      });
    },
  };
}

export function certificado() {
  const usuario = estado.usuario;
  const estadoActual = estadoRevision(usuario.certificado);
  if (estadoActual === 'en_revision') {
    return {
      titulo: 'Revisando',
      cuerpo: html`${pasos(3)}
        <div class="revision" role="status">
          <div class="revision-anillo">${icono('escudo')}</div>
          <h1 tabindex="-1">Estamos revisando tu certificado</h1>
          <p class="bajada">Comprobamos que seas alumno regular. Es la misma revisión que pasa cada persona de la comunidad.</p>
        </div>`,
      montar() {
        const espera = setTimeout(refrescar, Math.max(0, usuario.certificado.apruebaEn - Date.now()));
        return () => clearTimeout(espera);
      },
    };
  }
  return {
    titulo: 'Certificado',
    cuerpo: html`${pasos(3)}
      <h1 tabindex="-1">Subí tu certificado de alumno regular</h1>
      <p class="bajada">Lo sacás del SIU Guaraní. Con esto, nadie puede hacerse pasar por estudiante.</p>
      <form id="form" novalidate>
        <div class="campo" data-campo="archivo">
          <label class="zona-archivo" for="archivo">
            ${icono('archivo')}
            <b id="archivo-nombre">Elegir archivo</b>
            <small>PDF, JPG o PNG. Hasta 5 MB.</small>
          </label>
          <input class="solo-lector-archivo" id="archivo" name="archivo" type="file" accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png">
          <p class="error" id="archivo-error" hidden></p>
        </div>
        <button class="btn btn-primario">Enviar a revisión</button>
      </form>
      <p class="nota">${icono('escudo')}Solo lo usamos para verificarte. No se muestra a otros estudiantes.</p>`,
    montar(raiz) {
      const entrada = raiz.querySelector('#archivo');
      entrada.addEventListener('change', () => {
        raiz.querySelector('#archivo-nombre').textContent = entrada.files[0]?.name ?? 'Elegir archivo';
      });
      raiz.querySelector('#form').addEventListener('submit', (evento) => {
        evento.preventDefault();
        const archivo = entrada.files[0];
        const error = validarArchivo(archivo);
        if (!mostrarErrores(raiz, error ? { archivo: error } : {})) {
          track('error_validacion', { campo: 'certificado' });
          return;
        }
        enviarCertificado(archivo);
        guardar();
        refrescar();
      });
    },
  };
}
