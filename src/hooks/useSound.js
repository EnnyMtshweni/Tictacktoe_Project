/**
 * useSound.js
 * -----------
 * Preloads and plays short sound effects using the native Audio API.
 * No external libraries required.
 *
 * DROP YOUR AUDIO FILES HERE:
 *   public/sounds/move.mp3  — soft tap/click played on each move
 *   public/sounds/win.mp3   — short cheerful jingle played on a win
 *   public/sounds/draw.mp3  — gentle descending tone played on a draw
 *
 * Files must be placed at those exact paths before sounds will work.
 * The hook fails silently if a file is missing or the browser blocks
 * autoplay — it will never throw an error to the UI.
 */

import { useRef, useCallback, useState } from 'react'

const SOUNDS = {
  move: '/sounds/move.mp3',
  win:  '/sounds/win.mp3',
  draw: '/sounds/draw.mp3',
}

export function useSound() {
  const [muted, setMuted] = useState(false)
  // Keep one Audio instance per sound so we can preload and reuse them.
  const audioRefs = useRef({})

  /** Lazily create (and preload) an Audio element for the given key. */
  function getAudio(key) {
    if (!audioRefs.current[key]) {
      try {
        const audio = new Audio(SOUNDS[key])
        audio.preload = 'auto'
        audioRefs.current[key] = audio
      } catch {
        // Browser may not support Audio or the path is invalid — ignore.
        return null
      }
    }
    return audioRefs.current[key]
  }

  /** Play a sound by key ('move' | 'win' | 'draw'). */
  const play = useCallback((key) => {
    if (muted) return
    const audio = getAudio(key)
    if (!audio) return
    // Rewind before playing so rapid re-triggers work correctly.
    audio.currentTime = 0
    audio.play().catch(() => {
      // Autoplay policy blocked it — silently ignore.
    })
  }, [muted]) // eslint-disable-line react-hooks/exhaustive-deps

  const toggleMute = useCallback(() => setMuted((m) => !m), [])

  return { play, muted, toggleMute }
}
