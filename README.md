# MediaLog Bootcamp

Paquete `medialog-bootcamp`. Node >=22.22.0 y pnpm 11.17.0.

## Sesión 04 · Checkpoint final

El catálogo conserva las seis tarjetas de la sesión 03. App mantiene query, normaliza la consulta y calcula visibleMedia. SearchInput recibe value y onQueryChange. Una búsqueda sin coincidencias muestra «Sin resultados»; una fuente vacía conserva «Catálogo vacío».

```bash
pnpm install --frozen-lockfile
pnpm dev
```

En otra terminal: `pnpm build` y `pnpm lint`.

## Ruta acumulativa

Las sesiones 01–03 conservan sus ramas. Guarda tu trabajo antes de cambiar de rama.

| Rama | Resultado |
| --- | --- |
| session-04-start | Entrada idéntica a session-03-end |
| session-04-step-01-controlled-query | Input controlado y consulta visible; seis tarjetas |
| session-04-step-02-derived-search | Búsqueda derivada inline |
| session-04-step-03-search-input | Control extraído; App conserva el estado |
| session-04-end | Distingue fuente vacía y búsqueda sin resultados |

Las demostraciones de variable local y logs son temporales y se retiran antes de guardar checkpoints. La sesión 05 permanece pendiente.

## Material de clase

- [Guía del estudiante](course/04-eventos-y-estado-local/student-guide.md)
- [Lectura previa](course/04-eventos-y-estado-local/pre-class-reading.md)

Primero se presenta el bloque completo de diapositivas; después se pasa al editor, la práctica y el cierre oral. Si falta tiempo, guarda el archivo y anota el bloque alcanzado.

## Comprobaciones

La búsqueda ignora mayúsculas y espacios exteriores; una consulta vacía o solo espacios recupera las seis tarjetas. La fuente vacía mantiene su mensaje incluso con una consulta activa. Las verificaciones de código y navegador no prueban el ritmo real del aula ni una inspección en React DevTools.
