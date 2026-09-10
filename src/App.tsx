import { useState } from 'react'

import { AppHeader } from './components/app-header'
import { MediaGrid } from './components/media-grid'
import { mediaItems } from './data/media-items'

function App() {
  const [query, setQuery] = useState('')

  return (
    <>
      <AppHeader />

      <main className="page-container">
        <h2>Catálogo destacado</h2>
        <label className="search-input">
          Buscar por título
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.currentTarget.value)}
          />
        </label>
        <p>Consulta actual: {query}</p>
        <MediaGrid items={mediaItems} />
      </main>
    </>
  )
}

export default App
