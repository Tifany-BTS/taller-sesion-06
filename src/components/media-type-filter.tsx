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
