import { useGame } from '../store/GameContext'
import Square from './Square'

export default function Board() {
  const { squares, makeMove, isGameOver, isViewingPast, winningLine } = useGame()

  return (
    <div className="board-wrap">
      <span className="tick tick--tl" aria-hidden="true" />
      <span className="tick tick--tr" aria-hidden="true" />
      <span className="tick tick--bl" aria-hidden="true" />
      <span className="tick tick--br" aria-hidden="true" />
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