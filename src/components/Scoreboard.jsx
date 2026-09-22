import { useGame } from '../store/GameContext'

export default function Scoreboard() {
  const { scores, players, resetScores } = useGame()

  return (
    <section className="panel scoreboard" aria-label="Scoreboard">
      <div className="panel__title">
        <span>Scoreboard</span>
        <button type="button" className="link-btn" onClick={resetScores}>
          reset
        </button>
      </div>
      <div className="scoreboard__grid">
        <div className="scoreboard__cell">
          <span className="scoreboard__value scoreboard__value--x">{scores.X}</span>
          <span className="scoreboard__name">{players.X}</span>
        </div>
        <div className="scoreboard__cell">
          <span className="scoreboard__value scoreboard__value--draw">{scores.draws}</span>
          <span className="scoreboard__name">Draws</span>
        </div>
        <div className="scoreboard__cell">
          <span className="scoreboard__value scoreboard__value--o">{scores.O}</span>
          <span className="scoreboard__name">{players.O}</span>
        </div>
      </div>
    </section>
  )
}