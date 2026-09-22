import { useGame } from '../store/GameContext'

export default function Controls() {
  const { newRound, restartAll } = useGame()

  return (
    <div className="controls">
      <button type="button" className="btn btn--primary" onClick={newRound}>
        New round
      </button>
      <button type="button" className="btn" onClick={restartAll}>
        Restart everything
      </button>
    </div>
  )
}