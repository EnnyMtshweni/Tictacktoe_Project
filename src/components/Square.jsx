function Mark({ value }) {
  if (!value) return null
  if (value === 'X') {
    return (
      <svg viewBox="0 0 64 64" className="mark mark--x" aria-hidden="true">
        <line x1="14" y1="14" x2="50" y2="50" />
        <line x1="50" y1="14" x2="14" y2="50" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 64 64" className="mark mark--o" aria-hidden="true">
      <circle cx="32" cy="32" r="18" />
    </svg>
  )
}

export default function Square({ value, onClick, disabled, isWinning, index }) {
  const col = index % 3
  const row = Math.floor(index / 3)
  return (
    <button
      type="button"
      className={`square${isWinning ? ' square--winning' : ''}`}
      onClick={onClick}
      disabled={disabled || Boolean(value)}
      aria-label={`Row ${row + 1}, column ${col + 1}${value ? `, ${value}` : ', empty'}`}
    >
      <Mark value={value} />
    </button>
  )
}