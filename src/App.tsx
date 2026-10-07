import { Modal } from '@mantine/core'
import { useState } from 'react'

import { AppHeader } from './components/app-header'
import { EmptyState } from './components/empty-state'
import { MediaDetailContent } from './components/media-detail-content'
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

  // 1. Único estado de selección
  const [selectedMediaId, setSelectedMediaId] = useState<number | null>(null)

  // 2. CÁLCULOS DERIVADOS (Evaluación directa sobre la colección original completa)
  const selectedMedia =
    mediaItems.find((media) => media.id === selectedMediaId) ?? null

  // Apertura derivada como cálculo (cumple la regla 'No boolean en estado')
  const isDetailOpened = selectedMediaId !== null

  // Handlers
  function handleSelectMedia(mediaId: number) {
    setSelectedMediaId(mediaId)
  }

  function handleCloseDetail() {
    setSelectedMediaId(null)
  }

  // Filtros (conservados de la sesión 05)
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

  const resultCount = visibleMedia.length

  function handleClearFilters() {
    setQuery('')
    setMediaTypeFilter('all')
  }

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
        <div className="filter-summary">
          <p>Mostrando {resultCount} de {mediaItems.length}</p>
          <button
            type="button"
            onClick={handleClearFilters}
            disabled={!hasActiveFilters}
          >
            Limpiar filtros
          </button>
        </div>

        {/* NOTA: Se eliminó la sección del botón temporal "Probar detalle" y previewMedia */}

        {hasNoResults ? (
          <EmptyState
            title="Sin resultados"
            description="No encontramos medios que coincidan con tus filtros."
          />
        ) : (
          /* 3. Se envía prop onSelect a MediaGrid */
          <MediaGrid items={visibleMedia} onSelect={handleSelectMedia} />
        )}
      </main>

      {/* Modal local derivado de Mantine */}
      <Modal
        opened={isDetailOpened}
        onClose={handleCloseDetail}
        title={selectedMedia?.title ?? 'Detalle'}
        closeButtonProps={{ 'aria-label': 'Cerrar detalle' }}
        centered
      >
        {selectedMedia !== null ? (
          <MediaDetailContent media={selectedMedia} />
        ) : null}
      </Modal>
    </>
  )
}

export default App