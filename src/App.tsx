import { useState } from 'react'

import { AppHeader } from './components/app-header'
import { MediaGrid } from './components/media-grid'
import { SearchInput } from './components/search-input'
import { mediaItems } from './data/media-items'

function App() {
  const [query, setQuery] = useState('')

  const normalizedQuery = query.trim().toLowerCase()
  const visibleMedia = mediaItems.filter((media) =>
    media.title.toLowerCase().includes(normalizedQuery),
  )

  return (
    <>
      <AppHeader />

      <main className="page-container">
        <h2>Catálogo destacado</h2>
        <SearchInput value={query} onQueryChange={setQuery} />
        <MediaGrid items={visibleMedia} />
      </main>
    </>
  )
}

export default App
