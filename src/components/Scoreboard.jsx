import { useGame } from '../store/GameContext'

export default function Scoreboard() {
  const { scores, players, resetScores } = useGame()

  return (
    <section className="panel scoreboard" aria-label="Scoreboard">
      <div className="panel__header">
        <span className="panel__title">Scoreboard</span>
        <button type="button" className="link-btn" onClick={resetScores}>
          Reset
        </button>
      </div>
      <div className="scoreboard__grid">
        <div className="scoreboard__cell scoreboard__cell--x">
          <span className="scoreboard__value">{scores.X}</span>
          <span className="scoreboard__name">{players.X}</span>
        </div>
        <div className="scoreboard__cell scoreboard__cell--draw">
          <span className="scoreboard__value">{scores.draws}</span>
          <span className="scoreboard__name">Draws</span>
        </div>
        <div className="scoreboard__cell scoreboard__cell--o">
          <span className="scoreboard__value">{scores.O}</span>
          <span className="scoreboard__name">{players.O}</span>
        </div>
      </div>
    </section>
  )
}
