/* Square.jsx — cartoon mascot marks */

/** Blue chunky X mascot with face, stripes, arms and legs */
function XMascot({ winning }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={`mascot mascot--x${winning ? ' mascot--winning' : ''}`}
      aria-hidden="true"
      role="img"
    >
      {/* Left arm of X */}
      <rect x="10" y="10" width="28" height="80" rx="14" ry="14" fill="#4A90D9" transform="rotate(45 50 50)" />
      {/* Right arm of X */}
      <rect x="10" y="10" width="28" height="80" rx="14" ry="14" fill="#4A90D9" transform="rotate(-45 50 50)" />

      {/* White stripes on left arm */}
      <rect x="10" y="10" width="28" height="12" rx="6" ry="6" fill="white" opacity="0.55" transform="rotate(45 50 50)" />
      <rect x="10" y="32" width="28" height="12" rx="6" ry="6" fill="white" opacity="0.55" transform="rotate(45 50 50)" />

      {/* White stripes on right arm */}
      <rect x="10" y="10" width="28" height="12" rx="6" ry="6" fill="white" opacity="0.55" transform="rotate(-45 50 50)" />
      <rect x="10" y="32" width="28" height="12" rx="6" ry="6" fill="white" opacity="0.55" transform="rotate(-45 50 50)" />

      {/* Face background circle at center */}
      <circle cx="50" cy="50" r="16" fill="#4A90D9" />
      <circle cx="50" cy="50" r="14" fill="#5aa0e9" />

      {/* Eyes */}
      <circle cx="44" cy="47" r="4.5" fill="white" />
      <circle cx="56" cy="47" r="4.5" fill="white" />
      <circle cx="45" cy="47" r="2.2" fill="#222" />
      <circle cx="57" cy="47" r="2.2" fill="#222" />
      {/* Eye highlights */}
      <circle cx="46" cy="46" r="1" fill="white" />
      <circle cx="58" cy="46" r="1" fill="white" />

      {/* Big smile */}
      <path d="M43 53 Q50 61 57 53" stroke="white" strokeWidth="2.2" fill="none" strokeLinecap="round" />

      {/* Rosy cheeks */}
      <ellipse cx="41" cy="53" rx="4" ry="2.5" fill="#F28C28" opacity="0.5" />
      <ellipse cx="59" cy="53" rx="4" ry="2.5" fill="#F28C28" opacity="0.5" />
    </svg>
  )
}

/** Yellow round O mascot with polka dots, face, legs, raised arm */
function OMascot({ winning }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={`mascot mascot--o${winning ? ' mascot--winning' : ''}`}
      aria-hidden="true"
      role="img"
    >
      {/* Body */}
      <circle cx="50" cy="50" r="36" fill="#F5C518" />

      {/* Orange polka dots */}
      <circle cx="38" cy="38" r="5" fill="#F28C28" />
      <circle cx="62" cy="38" r="5" fill="#F28C28" />
      <circle cx="34" cy="55" r="4" fill="#F28C28" />
      <circle cx="66" cy="55" r="4" fill="#F28C28" />
      <circle cx="50" cy="68" r="4.5" fill="#F28C28" />
      <circle cx="50" cy="30" r="3.5" fill="#F28C28" />

      {/* Eyes */}
      <circle cx="43" cy="46" r="5" fill="white" />
      <circle cx="57" cy="46" r="5" fill="white" />
      <circle cx="44" cy="46" r="2.5" fill="#222" />
      <circle cx="58" cy="46" r="2.5" fill="#222" />
      {/* Eye highlights */}
      <circle cx="45" cy="45" r="1.1" fill="white" />
      <circle cx="59" cy="45" r="1.1" fill="white" />

      {/* Big open smile */}
      <path d="M41 55 Q50 65 59 55" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" />

      {/* Rosy cheeks */}
      <ellipse cx="38" cy="54" rx="5" ry="3" fill="#F28C28" opacity="0.45" />
      <ellipse cx="62" cy="54" rx="5" ry="3" fill="#F28C28" opacity="0.45" />

      {/* Short legs */}
      <rect x="42" y="83" width="7" height="12" rx="3.5" fill="#F5C518" stroke="#e0a800" strokeWidth="1.5" />
      <rect x="51" y="83" width="7" height="12" rx="3.5" fill="#F5C518" stroke="#e0a800" strokeWidth="1.5" />
    </svg>
  )
}

/** Ghost smiley for empty squares */
function GhostSmiley() {
  return (
    <svg
      viewBox="0 0 100 100"
      className="mascot mascot--ghost"
      aria-hidden="true"
      role="img"
    >
      <circle cx="50" cy="50" r="28" fill="#F5E6A0" opacity="0.35" />
      {/* Dot eyes */}
      <circle cx="43" cy="47" r="3" fill="#c8a820" opacity="0.6" />
      <circle cx="57" cy="47" r="3" fill="#c8a820" opacity="0.6" />
      {/* Small smile */}
      <path d="M44 56 Q50 62 56 56" stroke="#c8a820" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6" />
    </svg>
  )
}

export default function Square({ value, onClick, disabled, isWinning, index }) {
  const col = index % 3
  const row = Math.floor(index / 3)

  let mark = null
  if (value === 'X') {
    mark = <XMascot winning={isWinning} />
  } else if (value === 'O') {
    mark = <OMascot winning={isWinning} />
  } else {
    mark = <GhostSmiley />
  }

  return (
    <button
      type="button"
      className={`square${isWinning ? ' square--winning' : ''}${!value ? ' square--empty' : ''}`}
      onClick={onClick}
      disabled={disabled || Boolean(value)}
      aria-label={`Row ${row + 1}, column ${col + 1}${value ? `, ${value}` : ', empty'}`}
    >
      {mark}
    </button>
  )
}
