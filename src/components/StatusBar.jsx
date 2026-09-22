import { useGame } from '../store/GameContext'

export default function StatusBar() {
  const { winner, isDraw, currentPlayer, players, isViewingPast } = useGame()

  let headline
  let sub
  if (winner) {
    headline = `${players[winner]} wins`
    sub = `Winner: ${winner}`
  } else if (isDraw) {
    headline = "It's a draw"
    sub = 'Board full — no line'
  } else {
    headline = `${players[currentPlayer]}'s move`
    sub = `Next player: ${currentPlayer}`
  }

  return (
    <div className={`status${winner ? ' status--win' : ''}${isDraw ? ' status--draw' : ''}`} role="status" aria-live="polite">
      <span className="status__label">Reading</span>
      <span className="status__headline">{headline}</span>
      <span className="status__sub">
        {sub}
        {isViewingPast && <em> · viewing history</em>}
      </span>
    </div>
  )
}