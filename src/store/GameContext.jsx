import { createContext, useContext, useMemo, useReducer } from 'react'
import { gameReducer, initialGameState, calculateWinner, isDraw } from './gameReducer'

const GameContext = createContext(null)

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, initialGameState)

  // Derived values are computed once per render here, so components
  // stay "dumb" — they just read what they need from the hook.
  const value = useMemo(() => {
    const squares = state.history[state.currentMove]
    const result = calculateWinner(squares)
    const draw = isDraw(squares)
    const currentPlayer = state.currentMove % 2 === 0 ? 'X' : 'O'
    const isViewingPast = state.currentMove !== state.history.length - 1

    return {
      // raw state
      history: state.history,
      currentMove: state.currentMove,
      players: state.players,
      scores: state.scores,
      // derived
      squares,
      winner: result?.winner ?? null,
      winningLine: result?.line ?? null,
      isDraw: draw,
      currentPlayer,
      isGameOver: Boolean(result) || draw,
      isViewingPast,
      // actions (intent-revealing, no reducer internals leak out)
      makeMove: (index) => dispatch({ type: 'MAKE_MOVE', index }),
      jumpTo: (move) => dispatch({ type: 'JUMP_TO', move }),
      undo: () => dispatch({ type: 'UNDO' }),
      newRound: () => dispatch({ type: 'NEW_ROUND' }),
      resetScores: () => dispatch({ type: 'RESET_SCORES' }),
      restartAll: () => dispatch({ type: 'RESTART_ALL' }),
      setPlayerName: (symbol, name) => dispatch({ type: 'SET_PLAYER_NAME', symbol, name }),
    }
  }, [state])

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}

/** Custom hook — the only way components should reach game state. */
export function useGame() {
  const ctx = useContext(GameContext)
  if (!ctx) throw new Error('useGame must be used within a GameProvider')
  return ctx
}