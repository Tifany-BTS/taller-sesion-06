# MediaLog Bootcamp

Paquete `medialog-bootcamp`. Node >=22.22.0 y pnpm 11.17.0.

## Sesión 03 · S03-B11 · Checkpoint final

MediaGrid decide lista o vacío y EmptyState presenta título y descripción. MediaCard delega su etiqueta a MediaTypeBadge. Seis tarjetas, cinco SVG locales y los dos fallbacks se conservan. No hay estado, interacción ni solución del extra.

```bash
pnpm install --frozen-lockfile
pnpm dev
```

En otra terminal: `pnpm build` y `pnpm lint`.

[Guía estudiantil](course/03-taller-catalogo-estatico/student-guide.md), [lectura previa](course/03-taller-catalogo-estatico/pre-class-reading.md) y [rúbrica](course/03-taller-catalogo-estatico/workshop-rubric.md).

Guarda tu trabajo antes de consultar otra rama. Presentación continua → coding → descanso → taller → revisión oral. Siguiente sesión: 04, eventos y búsqueda. Todavía no está implementada.

## Orden de esta sesión

| Rama | Resultado |
| --- | --- |
| `session-02-end` | Salida anterior: App conserva la colección |
| `session-03-start` | CSS preparado y material público; ninguna solución |
| `session-03-step-01-media-grid` | Colección extraída, sin mensaje vacío |
| `session-03-workshop-start` | Mismo commit del paso anterior; entrada al taller |
| `session-03-step-02-empty-state` | Mensaje vacío; tipo inline pendiente de extracción |
| `session-03-end` | Badge integrado y catálogo completo |
| `main` | Último checkpoint verificado: 03 |

Las ramas anteriores de 01 y 02 permanecen disponibles. Consúltalas con `git branch --list 'session-*'`. Estas referencias locales incluyen soluciones docentes; una rama no es un control de acceso. Para distribuir un seed, entrega solo sus archivos, sin .git ni historial de soluciones.

## Verificación manual

Prueba temporalmente `<MediaGrid items={[]} />` en App para ver el vacío y restaura `items={mediaItems}` antes del build y entrega. El import del fixture puede aparecer sin uso mientras pruebas []; no lo borres ni borres los datos.

Se comprobó catálogo con seis tarjetas, tres badges Película y tres Serie, cinco imágenes cargadas, ambos fallbacks y el estado vacío con cero tarjetas. Build/lint y reinstalación limpia se registran por etapa en la guía privada. React DevTools y el ritmo real de clase siguen pendientes de ensayo docente.
