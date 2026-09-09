type EmptyStateProps = {
  title: string
  description: string
}

export function EmptyState(props: EmptyStateProps) {
  const { title, description } = props
  return (
    <section className="empty-state">
      <h3>{title}</h3>
      <p>{description}</p>
    </section>
  )
}
