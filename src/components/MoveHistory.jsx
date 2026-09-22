import { useGame } from '../store/GameContext'

function describeMove(history, move) {
  if (move === 0) return 'Start of game'
  const prev = history[move - 1]
  const curr = history[move]
  const index = curr.findIndex((v, i) => v !== prev[i])
  const player = curr[index]
  const row = Math.floor(index / 3) + 1
  const col = (index % 3) + 1
  return `Move #${move} · ${player} → row ${row}, col ${col}`
}

export default function MoveHistory() {
  const { history, currentMove, jumpTo, undo } = useGame()

  return (
    <section className="panel history" aria-label="Move history">
      <div className="panel__title">
        <span>Move history</span>
        <button type="button" className="link-btn" onClick={undo} disabled={currentMove === 0}>
          undo
        </button>
      </div>
      <ol className="history__list">
        {history.map((_, move) => (
          <li key={move}>
            <button
              type="button"
              className={`history__item${move === currentMove ? ' history__item--active' : ''}`}
              onClick={() => jumpTo(move)}
            >
              {describeMove(history, move)}
            </button>
          </li>
        ))}
      </ol>
    </section>
  )
}