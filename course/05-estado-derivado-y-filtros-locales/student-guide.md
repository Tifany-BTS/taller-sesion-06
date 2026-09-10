# Guía estudiantil · Sesión 05 · Estado derivado y filtros locales

## Meta y punto de entrada

Parte de MediaLog-Bootcamp en session-05-start, idéntica a session-04-end. Conserva tu copia y guarda cambios antes de consultar referencias. Deben funcionar la búsqueda, los seis medios y los dos mensajes de vacío.

Primero sigue la presentación completa. Abre el editor cuando el docente termine ese bloque; todos los pasos siguientes ocurren después de las slides. Lectura: [pre-class-reading.md](pre-class-reading.md).

## Paso 1 · Crear el control por tipo

Crea el archivo siguiente. all amplía el valor del control, no el tipo de un medio. Todavía no aparece en pantalla: falta conectarlo a App.

**`src/components/media-type-filter.tsx` · archivo completo:**

```tsx
import type { MediaType } from '../types/media-item'

export type MediaTypeFilterValue = MediaType | 'all'

type MediaTypeFilterProps = {
  value: MediaTypeFilterValue
  onFilterChange: (value: MediaTypeFilterValue) => void
}

const mediaTypeOptions: {
  value: MediaTypeFilterValue
  label: string
}[] = [
  { value: 'all', label: 'Todos' },
  { value: 'movie', label: 'Películas' },
  { value: 'series', label: 'Series' },
]

export function MediaTypeFilter(props: MediaTypeFilterProps) {
  const { value, onFilterChange } = props

  return (
    <div className="media-type-filter">
      {mediaTypeOptions.map((option) => (
        <button
          key={option.value}
          type="button"
          aria-pressed={value === option.value}
          onClick={() => onFilterChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
```

Incorpora los estilos como soporte; conserva todos los anteriores:

**`src/index.css` · archivo completo:**

```css
:root {
  font-family: Inter, system-ui, sans-serif;
  color: #f5f1e8;
  background: #141412;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-width: 320px;
  min-height: 100vh;
}

.app-header,
.page-container {
  width: min(960px, calc(100% - 32px));
  margin: 0 auto;
}

.app-header {
  padding: 64px 0 32px;
  border-bottom: 1px solid #3b3a34;
}

.app-header__eyebrow,
.media-card__meta {
  color: #d2a84a;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.page-container {
  padding: 32px 0 64px;
}

.media-card {
  display: grid;
  grid-template-columns: 160px 1fr;
  gap: 24px;
  padding: 24px;
  border: 1px solid #3b3a34;
  border-radius: 16px;
  background: #1d1d1a;
}

.media-card__poster {
  display: grid;
  min-height: 220px;
  place-items: center;
  border-radius: 10px;
  color: #a9a59a;
  background: #2a2924;
}

@media (max-width: 600px) {
  .media-card {
    grid-template-columns: 1fr;
  }
}
.media-list {
  display: grid;
  gap: 24px;
}
.media-card__poster-image {
  width: 100%;
  height: 220px;
  border-radius: 10px;
  object-fit: cover;
}

.empty-state {
  padding: 48px 24px;
  border: 1px dashed #565349;
  border-radius: 16px;
  text-align: center;
  color: #a9a59a;
}

.empty-state h3 {
  margin-top: 0;
  color: #f5f1e8;
}

.media-type-badge {
  display: inline-flex;
  padding: 2px 8px;
  border: 1px solid currentColor;
  border-radius: 999px;
}

.search-input {
  display: grid;
  gap: 8px;
  margin-bottom: 24px;
}

.search-input input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #565349;
  border-radius: 10px;
  background: #20201b;
  color: #f5f1e8;
  font: inherit;
}

.search-input input:focus-visible {
  outline: 2px solid #d9be74;
  outline-offset: 2px;
}

.media-type-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 24px;
}

.media-type-filter button {
  padding: 10px 16px;
  border: 1px solid #565349;
  border-radius: 10px;
  background: #20201b;
  color: #f5f1e8;
  font: inherit;
  cursor: pointer;
}

.media-type-filter button[aria-pressed='true'] {
  border-color: #d9be74;
  background: #d9be74;
  color: #141412;
}

.media-type-filter button:focus-visible {
  outline: 2px solid #d9be74;
  outline-offset: 2px;
}
```

Comprobación: pnpm build y pnpm lint. Referencia session-05-step-01-type-filter. Explica por qué exportar no equivale a renderizar.

## Paso 2 · Conectar el estado en App

Sustituye el archivo completo. El control cambia su opción activa, pero todavía no cambia la colección por tipo.

**`src/App.tsx` · archivo completo:**

```tsx
import { useState } from 'react'

import { AppHeader } from './components/app-header'
import { EmptyState } from './components/empty-state'
import { MediaGrid } from './components/media-grid'
import {
  MediaTypeFilter,
  type MediaTypeFilterValue,
} from './components/media-type-filter'
import { SearchInput } from './components/search-input'
import { mediaItems } from './data/media-items'

function App() {
  const [query, setQuery] = useState('')
  const [mediaTypeFilter, setMediaTypeFilter] =
    useState<MediaTypeFilterValue>('all')

  const normalizedQuery = query.trim().toLowerCase()
  const visibleMedia = mediaItems.filter((media) =>
    media.title.toLowerCase().includes(normalizedQuery),
  )

  const hasNoResults =
    mediaItems.length > 0 &&
    normalizedQuery.length > 0 &&
    visibleMedia.length === 0

  return (
    <>
      <AppHeader />

      <main className="page-container">
        <h2>Catálogo destacado</h2>
        <SearchInput value={query} onQueryChange={setQuery} />
        <MediaTypeFilter
          value={mediaTypeFilter}
          onFilterChange={setMediaTypeFilter}
        />
        {hasNoResults ? (
          <EmptyState
            title="Sin resultados"
            description="No encontramos medios que coincidan con tu búsqueda."
          />
        ) : (
          <MediaGrid items={visibleMedia} />
        )}
      </main>
    </>
  )
}

export default App
```

Pulsa Películas y Series: cambia aria-pressed y continúan seis medios con consulta vacía. Explica callback → setter → render → prop. Referencia session-05-step-02-controlled-type.

## Paso 3 · Combinar criterios

Sustituye App por este estado:

**`src/App.tsx` · archivo completo:**

```tsx
import { useState } from 'react'

import { AppHeader } from './components/app-header'
import { EmptyState } from './components/empty-state'
import { MediaGrid } from './components/media-grid'
import {
  MediaTypeFilter,
  type MediaTypeFilterValue,
} from './components/media-type-filter'
import { SearchInput } from './components/search-input'
import { mediaItems } from './data/media-items'

function App() {
  const [query, setQuery] = useState('')
  const [mediaTypeFilter, setMediaTypeFilter] =
    useState<MediaTypeFilterValue>('all')

  const normalizedQuery = query.trim().toLowerCase()
  const visibleMedia = mediaItems.filter((media) => {
    const matchesQuery = media.title.toLowerCase().includes(normalizedQuery)
    const matchesType =
      mediaTypeFilter === 'all' || media.mediaType === mediaTypeFilter

    return matchesQuery && matchesType
  })

  const hasNoResults =
    mediaItems.length > 0 &&
    normalizedQuery.length > 0 &&
    visibleMedia.length === 0

  return (
    <>
      <AppHeader />

      <main className="page-container">
        <h2>Catálogo destacado</h2>
        <SearchInput value={query} onQueryChange={setQuery} />
        <MediaTypeFilter
          value={mediaTypeFilter}
          onFilterChange={setMediaTypeFilter}
        />
        {hasNoResults ? (
          <EmptyState
            title="Sin resultados"
            description="No encontramos medios que coincidan con tu búsqueda."
          />
        ) : (
          <MediaGrid items={visibleMedia} />
        )}
      </main>
    </>
  )
}

export default App
```

Prueba Películas sin consulta: 3; Series sin consulta: 3; bear/Series: 1; bear/Películas: 0. Explica por qué se usa OR dentro del tipo y AND entre criterios. Referencia session-05-step-03-combined-filters.

## Paso 4 · Conservar la causa del vacío

Sustituye App completo:

**`src/App.tsx` · archivo completo:**

```tsx
import { useState } from 'react'

import { AppHeader } from './components/app-header'
import { EmptyState } from './components/empty-state'
import { MediaGrid } from './components/media-grid'
import {
  MediaTypeFilter,
  type MediaTypeFilterValue,
} from './components/media-type-filter'
import { SearchInput } from './components/search-input'
import { mediaItems } from './data/media-items'

function App() {
  const [query, setQuery] = useState('')
  const [mediaTypeFilter, setMediaTypeFilter] =
    useState<MediaTypeFilterValue>('all')

  const normalizedQuery = query.trim().toLowerCase()
  const visibleMedia = mediaItems.filter((media) => {
    const matchesQuery = media.title.toLowerCase().includes(normalizedQuery)
    const matchesType =
      mediaTypeFilter === 'all' || media.mediaType === mediaTypeFilter

    return matchesQuery && matchesType
  })

  const hasActiveFilters =
    normalizedQuery.length > 0 || mediaTypeFilter !== 'all'

  const hasNoResults =
    mediaItems.length > 0 &&
    hasActiveFilters &&
    visibleMedia.length === 0

  return (
    <>
      <AppHeader />

      <main className="page-container">
        <h2>Catálogo destacado</h2>
        <SearchInput value={query} onQueryChange={setQuery} />
        <MediaTypeFilter
          value={mediaTypeFilter}
          onFilterChange={setMediaTypeFilter}
        />
        {hasNoResults ? (
          <EmptyState
            title="Sin resultados"
            description="No encontramos medios que coincidan con tus filtros."
          />
        ) : (
          <MediaGrid items={visibleMedia} />
        )}
      </main>
    </>
  )
}

export default App
```

Referencia session-05-step-04-empty-causes. Los espacios solos no activan el filtro. El tipo concreto sí puede hacerlo sin texto. No copies resultados a otro estado.

## Práctica individual · Contar y limpiar

Dispones de diez minutos para intentar y revisar:

1. Deriva resultCount desde visibleMedia.
2. Muestra la cantidad visible y el total de mediaItems.
3. Crea handleClearFilters para restaurar query vacía y mediaTypeFilter en all.
4. Conecta un botón “Limpiar filtros” con type="button".
5. Deshabilítalo cuando no existan filtros efectivos.
6. Aplica el CSS de soporte y comprueba comportamiento.

Pistas: el arreglo conoce su longitud; los setters ya existen; hasActiveFilters indica si hay algo que limpiar. No uses Effects ni más estado.

El docente entrega este CSS de soporte durante la revisión. No contiene la lógica de la práctica:

**`src/index.css` · archivo completo:**

```css
:root {
  font-family: Inter, system-ui, sans-serif;
  color: #f5f1e8;
  background: #141412;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-width: 320px;
  min-height: 100vh;
}

.app-header,
.page-container {
  width: min(960px, calc(100% - 32px));
  margin: 0 auto;
}

.app-header {
  padding: 64px 0 32px;
  border-bottom: 1px solid #3b3a34;
}

.app-header__eyebrow,
.media-card__meta {
  color: #d2a84a;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.page-container {
  padding: 32px 0 64px;
}

.media-card {
  display: grid;
  grid-template-columns: 160px 1fr;
  gap: 24px;
  padding: 24px;
  border: 1px solid #3b3a34;
  border-radius: 16px;
  background: #1d1d1a;
}

.media-card__poster {
  display: grid;
  min-height: 220px;
  place-items: center;
  border-radius: 10px;
  color: #a9a59a;
  background: #2a2924;
}

@media (max-width: 600px) {
  .media-card {
    grid-template-columns: 1fr;
  }
}
.media-list {
  display: grid;
  gap: 24px;
}
.media-card__poster-image {
  width: 100%;
  height: 220px;
  border-radius: 10px;
  object-fit: cover;
}

.empty-state {
  padding: 48px 24px;
  border: 1px dashed #565349;
  border-radius: 16px;
  text-align: center;
  color: #a9a59a;
}

.empty-state h3 {
  margin-top: 0;
  color: #f5f1e8;
}

.media-type-badge {
  display: inline-flex;
  padding: 2px 8px;
  border: 1px solid currentColor;
  border-radius: 999px;
}

.search-input {
  display: grid;
  gap: 8px;
  margin-bottom: 24px;
}

.search-input input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #565349;
  border-radius: 10px;
  background: #20201b;
  color: #f5f1e8;
  font: inherit;
}

.search-input input:focus-visible {
  outline: 2px solid #d9be74;
  outline-offset: 2px;
}

.media-type-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 24px;
}

.media-type-filter button {
  padding: 10px 16px;
  border: 1px solid #565349;
  border-radius: 10px;
  background: #20201b;
  color: #f5f1e8;
  font: inherit;
  cursor: pointer;
}

.media-type-filter button[aria-pressed='true'] {
  border-color: #d9be74;
  background: #d9be74;
  color: #141412;
}

.media-type-filter button:focus-visible {
  outline: 2px solid #d9be74;
  outline-offset: 2px;
}

.filter-summary {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 24px;
}

.filter-summary p {
  margin: 0;
}

.filter-summary button {
  padding: 10px 16px;
  border: 1px solid #565349;
  border-radius: 10px;
  background: #20201b;
  color: #f5f1e8;
  font: inherit;
  cursor: pointer;
}

.filter-summary button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.filter-summary button:focus-visible {
  outline: 2px solid #d9be74;
  outline-offset: 2px;
}
```

## Matriz de aceptación

| Caso | Consulta | Tipo | Resultado esperado |
| --- | --- | --- | --- |
| Inicial | vacía | Todos | 6; limpiar deshabilitado |
| Películas | vacía | Películas | 3: Arrival, Aftersun, Past Lives |
| Series | vacía | Series | 3: Severance, The Bear, Blue Eye Samurai |
| Texto | bear | Todos | 1: The Bear |
| Combinación | bear | Series | 1: The Bear |
| Sin coincidencia | bear | Películas | 0; Sin resultados |
| Texto inexistente | matrix | Todos | 0; Sin resultados |
| Normalización | dos espacios + BEAR + dos espacios | Series | 1; texto escrito se conserva |
| Espacios solos | tres espacios | Todos | 6; limpiar deshabilitado |
| Espacios y tipo | tres espacios | Películas | 3; limpiar habilitado |
| Limpiar | cualquier consulta y tipo | click Limpiar filtros | consulta vacía, Todos, 6 y botón deshabilitado |
| Fuente vacía | vacía | Todos | 0 de 0; Catálogo vacío |
| Fuente vacía filtrada | bear | Películas | 0 de 0; Catálogo vacío; limpiar habilitado |

Para comprobar fuente vacía, guarda primero el contenido de src/data/media-items.ts. Sustitúyelo temporalmente por:

```ts
import type { MediaItem } from '../types/media-item'

export const mediaItems: MediaItem[] = []
```

Después restaura tu archivo guardado y confirma los seis medios. No entregues la fuente vacía. Comprueba también Tab, Enter y Espacio sobre los botones.

## Evidencia y checkpoint

Ejecuta:

```bash
pnpm build
pnpm lint
```

Registra resultados de comandos y casos observados por separado. El build no demuestra clicks, mensajes ni lector de pantalla.

Al terminar debe haber dos estados en App, filtros combinados, contador derivado y limpieza de ambos controles. Conserva MediaGrid items={visibleMedia}. No añadas selección, modal, Mantine ni Effects. session-05-end es referencia para comparar después de realizar la práctica.

## Pausar y continuar

Guarda bloque alcanzado, último archivo modificado, primer paso pendiente y comprobación ausente. Retoma ese paso antes de selección en 06. Cargar una rama recupera código, pero debes poder explicar su flujo.

Completa oralmente: “React recuerda query y mediaTypeFilter. JavaScript calcula la lista y el conteo porque dispone de todos sus datos de entrada”.
