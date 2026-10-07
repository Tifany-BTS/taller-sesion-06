export type MediaType = 'movie' | 'series'

export type MediaItem = {
  id: number
  title: string
  description: string | null
  mediaType: MediaType
  releaseDate: string
  posterUrl: string | null
}


