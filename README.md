# MediaLog Bootcamp

Paquete `medialog-bootcamp`. Node >=22.22.0 y pnpm 11.17.0.

## Sesión 04 · S04-B05 · Búsqueda inline

App normaliza query y calcula visibleMedia con filter. El input sigue inline y muestra diagnóstico. bear, BEAR y espacios exteriores encuentran The Bear; consulta vacía muestra seis. Una consulta sin coincidencia todavía muestra Catálogo vacío: la práctica corregirá esa distinción.

```bash
pnpm install --frozen-lockfile
pnpm dev
```

En otra terminal: `pnpm build` y `pnpm lint`.

Guarda tu trabajo antes de consultar otra rama. Siguiente paso: extraer SearchInput sin mover query. Las demostraciones de variable local y logs se retiran; no son checkpoints finales.
