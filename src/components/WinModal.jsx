/**
 * WinModal.jsx
 * ------------
 * Celebration overlay shown when a player wins.
 * - Focus trap: Tab/Shift+Tab cycle only within modal buttons
 * - Escape key closes the modal
 * - Restores focus to the board after closing
 * - Fireworks: layered inline SVG + CSS keyframe animation
 * - prefers-reduced-motion: fireworks animate off, static burst shown instead
 * - No emoji — all icons are hand-built SVG paths
 */

import { useEffect, useRef } from 'react'

/* ------------------------------------------------------------------ */
/*  SVG close icon (X shape, not emoji)                               */
/* ------------------------------------------------------------------ */
function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none">
      <line x1="5" y1="5" x2="19" y2="19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="19" y1="5" x2="5"  y2="19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/*  Fireworks SVG                                                      */
/*  6 burst points, each a cluster of radiating lines + dots.         */
/*  Colors drawn from existing palette + pink/purple accents.         */
/*  Each burst has its own animation-delay so they stagger.           */
/* ------------------------------------------------------------------ */

/** One burst: 8 radiating lines + 8 tip dots */
function Burst({ cx, cy, color, delay, size = 1 }) {
  const lines  = Array.from({ length: 8 }, (_, i) => i * 45)
  const r1     = 10 * size
  const r2     = 22 * size
  const dotR   = 2.5 * size

  return (
    <g
      style={{
        transformOrigin: `${cx}px ${cy}px`,
        animation: `fw-burst 2s ease-out infinite`,
        animationDelay: `${delay}s`,
        animationFillMode: 'both',
      }}
    >
      {lines.map((deg, i) => {
        const rad = (deg * Math.PI) / 180
        const x1  = cx + Math.cos(rad) * r1
        const y1  = cy + Math.sin(rad) * r1
        const x2  = cx + Math.cos(rad) * r2
        const y2  = cy + Math.sin(rad) * r2
        return (
          <line
            key={i}
            x1={x1} y1={y1}
            x2={x2} y2={y2}
            stroke={color}
            strokeWidth={2 * size}
            strokeLinecap="round"
          />
        )
      })}
      {lines.map((deg, i) => {
        const rad = (deg * Math.PI) / 180
        const x   = cx + Math.cos(rad) * (r2 + 4 * size)
        const y   = cy + Math.sin(rad) * (r2 + 4 * size)
        return <circle key={i} cx={x} cy={y} r={dotR} fill={color} />
      })}
    </g>
  )
}

/** Static (no-animation) fallback for prefers-reduced-motion */
function StaticBurst({ cx, cy, color, size = 1 }) {
  const lines = Array.from({ length: 8 }, (_, i) => i * 45)
  const r1    = 8  * size
  const r2    = 18 * size

  return (
    <g opacity="0.7">
      {lines.map((deg, i) => {
        const rad = (deg * Math.PI) / 180
        return (
          <line
            key={i}
            x1={cx + Math.cos(rad) * r1}
            y1={cy + Math.sin(rad) * r1}
            x2={cx + Math.cos(rad) * r2}
            y2={cy + Math.sin(rad) * r2}
            stroke={color}
            strokeWidth={2 * size}
            strokeLinecap="round"
          />
        )
      })}
    </g>
  )
}

const BURSTS = [
  { cx:  60, cy:  55, color: '#4A90D9', delay: 0,    size: 1.1 }, // blue
  { cx: 300, cy:  45, color: '#F5C518', delay: 0.35, size: 1.0 }, // yellow
  { cx: 180, cy:  80, color: '#F97316', delay: 0.7,  size: 0.9 }, // orange
  { cx:  90, cy: 140, color: '#EC4899', delay: 1.05, size: 0.85 }, // pink
  { cx: 270, cy: 130, color: '#8B5CF6', delay: 1.4,  size: 0.95 }, // purple
  { cx: 190, cy:  30, color: '#22C55E', delay: 0.55, size: 0.8  }, // green
]

function Fireworks({ reducedMotion }) {
  return (
    <svg
      className="fireworks"
      viewBox="0 0 360 180"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      {BURSTS.map((b, i) =>
        reducedMotion
          ? <StaticBurst key={i} {...b} />
          : <Burst       key={i} {...b} />
      )}
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/*  Modal                                                              */
/* ------------------------------------------------------------------ */
export default function WinModal({ winner, winnerName, onPlayAgain, onClose, boardRef }) {
  const overlayRef    = useRef(null)
  const playAgainRef  = useRef(null)
  const closeRef      = useRef(null)

  // Check prefers-reduced-motion once on mount
  const reducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // Colour theme based on which player won
  const isX      = winner === 'X'
  const themeVar = isX ? 'modal--x' : 'modal--o'

  /* ---- Focus trap ---- */
  useEffect(() => {
    // Save the element that had focus before we opened
    const previouslyFocused = document.activeElement

    // Move focus into the modal immediately
    playAgainRef.current?.focus()

    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab') return

      const focusable = [playAgainRef.current, closeRef.current].filter(Boolean)
      const first     = focusable[0]
      const last      = focusable[focusable.length - 1]

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault()
          last?.focus()
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault()
          first?.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      // Restore focus to the board (or wherever it was) when modal closes
      if (boardRef?.current) {
        const firstSquare = boardRef.current.querySelector('button:not(:disabled)')
        firstSquare ? firstSquare.focus() : boardRef.current.focus()
      } else {
        previouslyFocused?.focus()
      }
    }
  }, [onClose, boardRef])

  /* ---- Click outside to close ---- */
  function handleOverlayClick(e) {
    if (e.target === overlayRef.current) onClose()
  }

  return (
    <div
      className="modal-overlay"
      ref={overlayRef}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="win-modal-heading"
    >
      <div className={`modal-card ${themeVar}`}>
        {/* Fireworks at the top */}
        <Fireworks reducedMotion={reducedMotion} />

        {/* Close button — top-right corner */}
        <button
          ref={closeRef}
          type="button"
          className="modal-close"
          onClick={onClose}
          aria-label="Close celebration"
        >
          <CloseIcon />
        </button>

        {/* Content */}
        <div className="modal-body">
          <h2 id="win-modal-heading" className="modal-heading">
            Winning Spirit!
          </h2>
          <p className="modal-sub">
            What a champ, <strong>{winnerName}</strong>!
          </p>

          <button
            ref={playAgainRef}
            type="button"
            className="btn btn--primary modal-play-btn"
            onClick={onPlayAgain}
          >
            Play again
          </button>
        </div>
      </div>
    </div>
  )
}
