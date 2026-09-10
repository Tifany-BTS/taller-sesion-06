# MediaLog Bootcamp

Paquete `medialog-bootcamp`. Node >=22.22.0 y pnpm 11.17.0.

## Sesión 05 · Checkpoint final

App conserva query y mediaTypeFilter. Un solo predicado combina título y tipo; lista, conteo, filtros activos y vacíos se calculan durante el render. Limpiar restablece ambos controles. Se conserva la interfaz de 04.

```bash
pnpm install --frozen-lockfile
pnpm dev
```

En otra terminal: `pnpm build` y `pnpm lint`.

## Ruta acumulativa

Las sesiones 01–04 conservan sus referencias. Guarda cambios antes de consultar otra rama.

| Rama | Resultado |
| --- | --- |
| session-05-start | Idéntica a session-04-end |
| session-05-step-01-type-filter | Archivo y CSS del control sin montarlo |
| session-05-step-02-controlled-type | Botón activo cambia; solo se filtra por texto |
| session-05-step-03-combined-filters | Texto y tipo combinados |
| session-05-step-04-empty-causes | Filtros activos y vacíos; práctica pendiente |
| session-05-end | Contador derivado y limpieza de ambos controles |

## Material público

- [Guía estudiantil](course/05-estado-derivado-y-filtros-locales/student-guide.md)
- [Lectura previa](course/05-estado-derivado-y-filtros-locales/pre-class-reading.md)

Presentación continua → editor → práctica → comprobación y cierre oral. Cada referencia conserva un punto recuperable; cargarla no sustituye explicar el flujo. La sesión 06 y su seed permanecen pendientes.

## Comprobaciones

Prueba Todos (6), Películas (3), Series (3), bear/Series (1), bear/Películas (0), mayúsculas y espacios, contador y limpieza. La fuente vacía temporal mantiene Catálogo vacío incluso con filtros activos; restaura los seis medios antes de entregar.

La evidencia de build/lint y navegador se separa de medición real de aula, React DevTools y lector de pantalla.
