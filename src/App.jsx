import { useEffect, useRef, useState } from 'react'
import { GameProvider, useGame } from './store/GameContext'
import Board from './components/Board'
import StatusBar from './components/StatusBar'
import Scoreboard from './components/Scoreboard'
import MoveHistory from './components/MoveHistory'
import Controls from './components/Controls'
import PlayerNames from './components/PlayerNames'
import WinModal from './components/WinModal'
import { useSound } from './hooks/useSound'

/* ------------------------------------------------------------------ */
/*  Speaker icon — SVG, not emoji                                      */
/* ------------------------------------------------------------------ */
function SpeakerOnIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none">
      <path
        d="M11 5L6 9H3a1 1 0 00-1 1v4a1 1 0 001 1h3l5 4V5z"
        fill="currentColor"
      />
      <path
        d="M15.5 8.5a5 5 0 010 7M18.5 6a9 9 0 010 12"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none"
      />
    </svg>
  )
}

function SpeakerOffIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none">
      <path
        d="M11 5L6 9H3a1 1 0 00-1 1v4a1 1 0 001 1h3l5 4V5z"
        fill="currentColor"
      />
      <line x1="22" y1="9" x2="16" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="16" y1="9" x2="22" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/*  Decorative large X mascot (waving, left side)                      */
/* ------------------------------------------------------------------ */
function BigXMascot() {
  return (
    <svg
      viewBox="0 0 120 160"
      className="deco-mascot deco-mascot--x"
      aria-label="X player mascot"
      role="img"
    >
      <rect x="18" y="20" width="32" height="96" rx="16" fill="#4A90D9" transform="rotate(45 60 68)" />
      <rect x="18" y="20" width="32" height="96" rx="16" fill="#4A90D9" transform="rotate(-45 60 68)" />
      <rect x="18" y="20" width="32" height="14" rx="7" fill="white" opacity="0.5" transform="rotate(45 60 68)" />
      <rect x="18" y="42" width="32" height="14" rx="7" fill="white" opacity="0.5" transform="rotate(45 60 68)" />
      <rect x="18" y="64" width="32" height="14" rx="7" fill="white" opacity="0.5" transform="rotate(45 60 68)" />
      <rect x="18" y="20" width="32" height="14" rx="7" fill="white" opacity="0.5" transform="rotate(-45 60 68)" />
      <rect x="18" y="42" width="32" height="14" rx="7" fill="white" opacity="0.5" transform="rotate(-45 60 68)" />
      <rect x="18" y="64" width="32" height="14" rx="7" fill="white" opacity="0.5" transform="rotate(-45 60 68)" />
      <circle cx="60" cy="68" r="22" fill="#5aa0e9" />
      <circle cx="52" cy="64" r="5.5" fill="white" />
      <circle cx="68" cy="64" r="5.5" fill="white" />
      <circle cx="53" cy="64" r="2.8" fill="#222" />
      <circle cx="69" cy="64" r="2.8" fill="#222" />
      <circle cx="54.5" cy="63" r="1.2" fill="white" />
      <circle cx="70.5" cy="63" r="1.2" fill="white" />
      <path d="M51 72 Q60 82 69 72" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <ellipse cx="47" cy="72" rx="5.5" ry="3.5" fill="#F28C28" opacity="0.45" />
      <ellipse cx="73" cy="72" rx="5.5" ry="3.5" fill="#F28C28" opacity="0.45" />
      <rect x="4"   y="52" width="14" height="36" rx="7" fill="#4A90D9" transform="rotate(-30 11 70)" />
      <rect x="102" y="58" width="14" height="32" rx="7" fill="#4A90D9" transform="rotate(20 109 74)" />
      <rect x="48" y="120" width="14" height="28" rx="7" fill="#4A90D9" />
      <rect x="58" y="120" width="14" height="28" rx="7" fill="#4A90D9" />
      <ellipse cx="55" cy="148" rx="9" ry="5" fill="#3a78c2" />
      <ellipse cx="72" cy="148" rx="9" ry="5" fill="#3a78c2" />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/*  Decorative large O mascot (celebrating, right side)               */
/* ------------------------------------------------------------------ */
function BigOMascot() {
  return (
    <svg
      viewBox="0 0 120 160"
      className="deco-mascot deco-mascot--o"
      aria-label="O player mascot"
      role="img"
    >
      <circle cx="60" cy="72" r="46" fill="#F5C518" />
      <circle cx="44" cy="56" r="7"   fill="#F28C28" />
      <circle cx="76" cy="56" r="7"   fill="#F28C28" />
      <circle cx="38" cy="78" r="6"   fill="#F28C28" />
      <circle cx="82" cy="78" r="6"   fill="#F28C28" />
      <circle cx="60" cy="96" r="6.5" fill="#F28C28" />
      <circle cx="60" cy="46" r="5"   fill="#F28C28" />
      <circle cx="50" cy="88" r="4"   fill="#F28C28" />
      <circle cx="70" cy="88" r="4"   fill="#F28C28" />
      <circle cx="51" cy="67" r="6.5" fill="white" />
      <circle cx="69" cy="67" r="6.5" fill="white" />
      <circle cx="52.5" cy="67" r="3.2" fill="#222" />
      <circle cx="70.5" cy="67" r="3.2" fill="#222" />
      <circle cx="54"   cy="65.5" r="1.4" fill="white" />
      <circle cx="72"   cy="65.5" r="1.4" fill="white" />
      <path d="M48 78 Q60 91 72 78" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" />
      <ellipse cx="44" cy="78" rx="7" ry="4" fill="#F28C28" opacity="0.4" />
      <ellipse cx="76" cy="78" rx="7" ry="4" fill="#F28C28" opacity="0.4" />
      <rect x="5"   y="48" width="14" height="36" rx="7" fill="#F5C518" stroke="#e0a800" strokeWidth="2" transform="rotate(-40 12 66)" />
      <rect x="101" y="48" width="14" height="36" rx="7" fill="#F5C518" stroke="#e0a800" strokeWidth="2" transform="rotate(40 108 66)" />
      <rect x="47" y="115" width="13" height="30" rx="6.5" fill="#F5C518" stroke="#e0a800" strokeWidth="1.5" />
      <rect x="60" y="115" width="13" height="30" rx="6.5" fill="#F5C518" stroke="#e0a800" strokeWidth="1.5" />
      <ellipse cx="53.5" cy="146" rx="10" ry="5.5" fill="#e0a800" />
      <ellipse cx="66.5" cy="146" rx="10" ry="5.5" fill="#e0a800" />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/*  Sky scene background (clouds, rainbow)                            */
/* ------------------------------------------------------------------ */
function SkyScene() {
  return (
    <svg
      className="sky-scene"
      viewBox="0 0 800 500"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      role="img"
    >
      <g opacity="0.55">
        <path d="M100 440 Q400 40 700 440"  stroke="#EF4444" strokeWidth="18" fill="none" strokeLinecap="round" />
        <path d="M115 440 Q400 65 685 440"  stroke="#F97316" strokeWidth="18" fill="none" strokeLinecap="round" />
        <path d="M130 440 Q400 90 670 440"  stroke="#EAB308" strokeWidth="18" fill="none" strokeLinecap="round" />
        <path d="M145 440 Q400 115 655 440" stroke="#22C55E" strokeWidth="18" fill="none" strokeLinecap="round" />
        <path d="M160 440 Q400 140 640 440" stroke="#3B82F6" strokeWidth="18" fill="none" strokeLinecap="round" />
        <path d="M175 440 Q400 165 625 440" stroke="#8B5CF6" strokeWidth="18" fill="none" strokeLinecap="round" />
      </g>
      <g transform="translate(130 90)">
        <ellipse cx="0"   cy="0"   rx="55" ry="38" fill="white" />
        <ellipse cx="48"  cy="8"   rx="42" ry="32" fill="white" />
        <ellipse cx="-38" cy="10"  rx="36" ry="28" fill="white" />
        <ellipse cx="20"  cy="-10" rx="40" ry="28" fill="white" />
      </g>
      <g transform="translate(620 70)">
        <ellipse cx="0"   cy="0"  rx="48" ry="32" fill="white" />
        <ellipse cx="40"  cy="8"  rx="36" ry="26" fill="white" />
        <ellipse cx="-34" cy="10" rx="32" ry="24" fill="white" />
        <ellipse cx="16"  cy="-8" rx="36" ry="24" fill="white" />
      </g>
      <g transform="translate(720 130)">
        <ellipse cx="0"   cy="0" rx="32" ry="22" fill="white" opacity="0.85" />
        <ellipse cx="26"  cy="6" rx="24" ry="18" fill="white" opacity="0.85" />
        <ellipse cx="-22" cy="8" rx="22" ry="16" fill="white" opacity="0.85" />
      </g>
      <ellipse cx="400" cy="520" rx="520" ry="120" fill="#7BC86C" />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/*  Inner app — must be inside GameProvider to call useGame           */
/* ------------------------------------------------------------------ */
function AppInner() {
  const { winner, isDraw, players, newRound, currentMove, history } = useGame()
  const { play, muted, toggleMute } = useSound()

  // Ref to the board wrapper so WinModal can restore focus there
  const boardAreaRef = useRef(null)

  // Modal open/closed state — separate from game state so the player
  // can dismiss it without starting a new round.
  const [modalOpen, setModalOpen] = useState(false)

  // Track the previous move count so we only fire the move sound
  // when the board actually advances (not on time-travel jumps).
  const prevMoveRef = useRef(currentMove)

  // Track previous game-over state to detect the exact transition
  const prevWinnerRef = useRef(null)
  const prevDrawRef   = useRef(false)

  useEffect(() => {
    const moveAdvanced = currentMove > prevMoveRef.current
    prevMoveRef.current = currentMove

    // A new move was placed
    if (moveAdvanced) {
      // Win just happened this move
      if (winner && winner !== prevWinnerRef.current) {
        play('win')
        setModalOpen(true)
      }
      // Draw just happened this move
      else if (isDraw && !prevDrawRef.current) {
        play('draw')
        // No modal for draws — status bar handles it
      }
      // Normal move
      else if (!winner && !isDraw) {
        play('move')
      }
    }

    prevWinnerRef.current = winner
    prevDrawRef.current   = isDraw
  }, [currentMove, winner, isDraw, play])

  // Close modal without starting a new round
  function handleClose() {
    setModalOpen(false)
  }

  // Play again: start new round and close modal
  function handlePlayAgain() {
    newRound()
    setModalOpen(false)
  }

  return (
    <div className="page">
      <SkyScene />
      <div className="grass-strip" aria-hidden="true" />

      <header className="header">
        <h1 className="header__title">Tic-Tac-Toe</h1>
        {/* Mute / unmute toggle */}
        <button
          type="button"
          className="mute-btn"
          onClick={toggleMute}
          aria-label={muted ? 'Unmute sound effects' : 'Mute sound effects'}
          aria-pressed={muted}
        >
          {muted ? <SpeakerOffIcon /> : <SpeakerOnIcon />}
        </button>
      </header>

      <div className="mascot-row" aria-hidden="true">
        <BigXMascot />
        <div className="mascot-row__gap" />
        <BigOMascot />
      </div>

      <main className="layout" ref={boardAreaRef}>
        <div className="layout__main">
          <PlayerNames />
          <StatusBar />
          <Board />
          <Controls />
        </div>
        <aside className="layout__side">
          <Scoreboard />
          <MoveHistory />
        </aside>
      </main>

      <footer className="footer">
        <p>Built with React · useReducer + Context</p>
      </footer>

      {/* Win celebration modal */}
      {modalOpen && winner && (
        <WinModal
          winner={winner}
          winnerName={players[winner]}
          onPlayAgain={handlePlayAgain}
          onClose={handleClose}
          boardRef={boardAreaRef}
        />
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  App root — GameProvider wraps everything                          */
/* ------------------------------------------------------------------ */
export default function App() {
  return (
    <GameProvider>
      <AppInner />
    </GameProvider>
  )
}
