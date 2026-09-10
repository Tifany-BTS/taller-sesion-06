type SearchInputProps = {
  value: string
  onQueryChange: (value: string) => void
}

export function SearchInput(props: SearchInputProps) {
  const { value, onQueryChange } = props

  return (
    <label className="search-input">
      Buscar por título
      <input
        type="search"
        value={value}
        onChange={(event) => onQueryChange(event.currentTarget.value)}
      />
    </label>
  )
}
