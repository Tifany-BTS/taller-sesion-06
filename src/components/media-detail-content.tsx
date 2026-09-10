import type { MediaItem } from '../types/media-item'

import { MediaTypeBadge } from './media-type-badge'

type MediaDetailContentProps = {
  media: MediaItem
}

export function MediaDetailContent(props: MediaDetailContentProps) {
  const { media } = props

  return (
    <article className="media-detail-content">
      {media.posterUrl !== null ? (
        <img src={media.posterUrl} alt="" />
      ) : (
        <p>Poster no disponible</p>
      )}
      <MediaTypeBadge mediaType={media.mediaType} />
      <p>{media.releaseDate}</p>
      <p>{media.description ?? 'Sin descripción disponible'}</p>
    </article>
  )
}
