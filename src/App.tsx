import { useState } from 'react'

import { AppHeader } from './components/app-header'
import { EmptyState } from './components/empty-state'
import { MediaGrid } from './components/media-grid'
import { SearchInput } from './components/search-input'
import { mediaItems } from './data/media-items'

function App() {
  const [query, setQuery] = useState('')

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
