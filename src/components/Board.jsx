/* Board.jsx — wooden plank grid */
import { useGame } from '../store/GameContext'
import Square from './Square'

export default function Board() {
  const { squares, makeMove, isGameOver, isViewingPast, winningLine } = useGame()

  return (
    <div className="board-wrap" aria-label="Tic Tac Toe board">
      {/* Decorative wooden plank horizontal bars */}
      <div className="plank plank--h plank--h1" aria-hidden="true" />
      <div className="plank plank--h plank--h2" aria-hidden="true" />
      {/* Decorative wooden plank vertical bars */}
      <div className="plank plank--v plank--v1" aria-hidden="true" />
      <div className="plank plank--v plank--v2" aria-hidden="true" />

      <div className="board" role="grid" aria-label="Tic Tac Toe board">
        {squares.map((value, i) => (
          <Square
            key={i}
            index={i}
            value={value}
            isWinning={winningLine?.includes(i)}
            disabled={isGameOver || isViewingPast}
            onClick={() => makeMove(i)}
          />
        ))}
      </div>
    </div>
  )
}
