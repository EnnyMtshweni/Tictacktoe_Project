// gameReducer.js
// -----------------------------------------------------------------------
// All game logic lives here as a pure reducer. Components never mutate
// state directly — they dispatch intent-revealing actions and this file
// decides what happens. Nothing here touches the DOM.
// -----------------------------------------------------------------------

const LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6],            // diagonals
]

/** Returns { winner: 'X'|'O', line: [a,b,c] } or null if no winner yet. */
export function calculateWinner(squares) {
  for (const line of LINES) {
    const [a, b, c] = line
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line }
    }
  }
  return null
}

export function isDraw(squares) {
  return squares.every(Boolean) && !calculateWinner(squares)
}

const emptyBoard = () => Array(9).fill(null)

export const initialGameState = {
  // history[i] is the board snapshot AFTER move i (history[0] is empty board)
  history: [emptyBoard()],
  currentMove: 0,
  players: { X: 'Player X', O: 'Player O' },
  scores: { X: 0, O: 0, draws: 0 },
}

export function gameReducer(state, action) {
  switch (action.type) {
    case 'MAKE_MOVE': {
      const { index } = action
      const current = state.history[state.currentMove]
      const alreadyDecided = calculateWinner(current) || isDraw(current)

      if (alreadyDecided || current[index]) return state // ignore illegal move

      const player = state.currentMove % 2 === 0 ? 'X' : 'O'
      const nextSquares = current.slice()
      nextSquares[index] = player

      // Branch: drop any "future" moves if we'd travelled back in time
      const nextHistory = [...state.history.slice(0, state.currentMove + 1), nextSquares]

      const result = calculateWinner(nextSquares)
      const boardFull = nextSquares.every(Boolean)
      let scores = state.scores
      if (result) {
        scores = { ...scores, [result.winner]: scores[result.winner] + 1 }
      } else if (boardFull) {
        scores = { ...scores, draws: scores.draws + 1 }
      }

      return {
        ...state,
        history: nextHistory,
        currentMove: nextHistory.length - 1,
        scores,
      }
    }

    case 'JUMP_TO': {
      const move = action.move
      if (move < 0 || move > state.history.length - 1) return state
      return { ...state, currentMove: move }
    }

    case 'UNDO': {
      if (state.currentMove === 0) return state
      return { ...state, currentMove: state.currentMove - 1 }
    }

    case 'NEW_ROUND': {
      // Keep the scoreboard, wipe the board
      return { ...state, history: [emptyBoard()], currentMove: 0 }
    }

    case 'RESET_SCORES': {
      return { ...state, scores: { X: 0, O: 0, draws: 0 } }
    }

    case 'RESTART_ALL': {
      return { ...initialGameState, players: state.players }
    }

    case 'SET_PLAYER_NAME': {
      const { symbol, name } = action
      return { ...state, players: { ...state.players, [symbol]: name || (symbol === 'X' ? 'Player X' : 'Player O') } }
    }

    default:
      return state
  }
}