import { GameProvider } from './store/GameContext'
import Board from './components/Board'
import StatusBar from './components/StatusBar'
import Scoreboard from './components/Scoreboard'
import MoveHistory from './components/MoveHistory'
import Controls from './components/Controls'
import PlayerNames from './components/PlayerNames'

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
      {/* Left arm of X body */}
      <rect x="18" y="20" width="32" height="96" rx="16" fill="#4A90D9" transform="rotate(45 60 68)" />
      {/* Right arm of X body */}
      <rect x="18" y="20" width="32" height="96" rx="16" fill="#4A90D9" transform="rotate(-45 60 68)" />

      {/* White stripes on left arm */}
      <rect x="18" y="20" width="32" height="14" rx="7" fill="white" opacity="0.5" transform="rotate(45 60 68)" />
      <rect x="18" y="42" width="32" height="14" rx="7" fill="white" opacity="0.5" transform="rotate(45 60 68)" />
      <rect x="18" y="64" width="32" height="14" rx="7" fill="white" opacity="0.5" transform="rotate(45 60 68)" />

      {/* White stripes on right arm */}
      <rect x="18" y="20" width="32" height="14" rx="7" fill="white" opacity="0.5" transform="rotate(-45 60 68)" />
      <rect x="18" y="42" width="32" height="14" rx="7" fill="white" opacity="0.5" transform="rotate(-45 60 68)" />
      <rect x="18" y="64" width="32" height="14" rx="7" fill="white" opacity="0.5" transform="rotate(-45 60 68)" />

      {/* Face circle */}
      <circle cx="60" cy="68" r="22" fill="#5aa0e9" />

      {/* Eyes */}
      <circle cx="52" cy="64" r="5.5" fill="white" />
      <circle cx="68" cy="64" r="5.5" fill="white" />
      <circle cx="53" cy="64" r="2.8" fill="#222" />
      <circle cx="69" cy="64" r="2.8" fill="#222" />
      <circle cx="54.5" cy="63" r="1.2" fill="white" />
      <circle cx="70.5" cy="63" r="1.2" fill="white" />

      {/* Smile */}
      <path d="M51 72 Q60 82 69 72" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" />

      {/* Rosy cheeks */}
      <ellipse cx="47" cy="72" rx="5.5" ry="3.5" fill="#F28C28" opacity="0.45" />
      <ellipse cx="73" cy="72" rx="5.5" ry="3.5" fill="#F28C28" opacity="0.45" />

      {/* Left arm (body appendage — raised waving) */}
      <rect x="4" y="52" width="14" height="36" rx="7" fill="#4A90D9" transform="rotate(-30 11 70)" />
      {/* Right arm (body appendage — down) */}
      <rect x="102" y="58" width="14" height="32" rx="7" fill="#4A90D9" transform="rotate(20 109 74)" />

      {/* Legs */}
      <rect x="48" y="120" width="14" height="28" rx="7" fill="#4A90D9" />
      <rect x="58" y="120" width="14" height="28" rx="7" fill="#4A90D9" />

      {/* Feet */}
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
      {/* Body */}
      <circle cx="60" cy="72" r="46" fill="#F5C518" />

      {/* Polka dots */}
      <circle cx="44" cy="56" r="7" fill="#F28C28" />
      <circle cx="76" cy="56" r="7" fill="#F28C28" />
      <circle cx="38" cy="78" r="6" fill="#F28C28" />
      <circle cx="82" cy="78" r="6" fill="#F28C28" />
      <circle cx="60" cy="96" r="6.5" fill="#F28C28" />
      <circle cx="60" cy="46" r="5" fill="#F28C28" />
      <circle cx="50" cy="88" r="4" fill="#F28C28" />
      <circle cx="70" cy="88" r="4" fill="#F28C28" />

      {/* Eyes */}
      <circle cx="51" cy="67" r="6.5" fill="white" />
      <circle cx="69" cy="67" r="6.5" fill="white" />
      <circle cx="52.5" cy="67" r="3.2" fill="#222" />
      <circle cx="70.5" cy="67" r="3.2" fill="#222" />
      <circle cx="54" cy="65.5" r="1.4" fill="white" />
      <circle cx="72" cy="65.5" r="1.4" fill="white" />

      {/* Big smile */}
      <path d="M48 78 Q60 91 72 78" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" />

      {/* Rosy cheeks */}
      <ellipse cx="44" cy="78" rx="7" ry="4" fill="#F28C28" opacity="0.4" />
      <ellipse cx="76" cy="78" rx="7" ry="4" fill="#F28C28" opacity="0.4" />

      {/* Left arm (raised high) */}
      <rect x="5" y="48" width="14" height="36" rx="7" fill="#F5C518" stroke="#e0a800" strokeWidth="2" transform="rotate(-40 12 66)" />
      {/* Right arm (raised high) */}
      <rect x="101" y="48" width="14" height="36" rx="7" fill="#F5C518" stroke="#e0a800" strokeWidth="2" transform="rotate(40 108 66)" />

      {/* Legs */}
      <rect x="47" y="115" width="13" height="30" rx="6.5" fill="#F5C518" stroke="#e0a800" strokeWidth="1.5" />
      <rect x="60" y="115" width="13" height="30" rx="6.5" fill="#F5C518" stroke="#e0a800" strokeWidth="1.5" />

      {/* Feet */}
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
      {/* Rainbow arc */}
      <g opacity="0.55">
        <path d="M100 440 Q400 40 700 440" stroke="#EF4444" strokeWidth="18" fill="none" strokeLinecap="round" />
        <path d="M115 440 Q400 65 685 440" stroke="#F97316" strokeWidth="18" fill="none" strokeLinecap="round" />
        <path d="M130 440 Q400 90 670 440" stroke="#EAB308" strokeWidth="18" fill="none" strokeLinecap="round" />
        <path d="M145 440 Q400 115 655 440" stroke="#22C55E" strokeWidth="18" fill="none" strokeLinecap="round" />
        <path d="M160 440 Q400 140 640 440" stroke="#3B82F6" strokeWidth="18" fill="none" strokeLinecap="round" />
        <path d="M175 440 Q400 165 625 440" stroke="#8B5CF6" strokeWidth="18" fill="none" strokeLinecap="round" />
      </g>

      {/* Cloud 1 — large center-left */}
      <g transform="translate(130 90)">
        <ellipse cx="0" cy="0" rx="55" ry="38" fill="white" />
        <ellipse cx="48" cy="8" rx="42" ry="32" fill="white" />
        <ellipse cx="-38" cy="10" rx="36" ry="28" fill="white" />
        <ellipse cx="20" cy="-10" rx="40" ry="28" fill="white" />
      </g>

      {/* Cloud 2 — right side */}
      <g transform="translate(620 70)">
        <ellipse cx="0" cy="0" rx="48" ry="32" fill="white" />
        <ellipse cx="40" cy="8" rx="36" ry="26" fill="white" />
        <ellipse cx="-34" cy="10" rx="32" ry="24" fill="white" />
        <ellipse cx="16" cy="-8" rx="36" ry="24" fill="white" />
      </g>

      {/* Cloud 3 — small upper right */}
      <g transform="translate(720 130)">
        <ellipse cx="0" cy="0" rx="32" ry="22" fill="white" opacity="0.85" />
        <ellipse cx="26" cy="6" rx="24" ry="18" fill="white" opacity="0.85" />
        <ellipse cx="-22" cy="8" rx="22" ry="16" fill="white" opacity="0.85" />
      </g>

      {/* Grass hill */}
      <ellipse cx="400" cy="520" rx="520" ry="120" fill="#7BC86C" />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/*  App root                                                           */
/* ------------------------------------------------------------------ */
export default function App() {
  return (
    <GameProvider>
      <div className="page">
        {/* Sky background scene */}
        <SkyScene />

        {/* Grass strip at bottom */}
        <div className="grass-strip" aria-hidden="true" />

        <header className="header">
          <h1 className="header__title">Tic-Tac-Toe</h1>
        </header>

        {/* Large decorative mascots flanking the board area */}
        <div className="mascot-row" aria-hidden="true">
          <BigXMascot />
          <div className="mascot-row__gap" />
          <BigOMascot />
        </div>

        <main className="layout">
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
      </div>
    </GameProvider>
  )
}
