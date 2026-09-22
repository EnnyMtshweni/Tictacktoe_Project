import { useGame } from '../store/GameContext'

export default function PlayerNames() {
  const { players, setPlayerName } = useGame()

  return (
    <div className="player-names">
      <label className="player-name player-name--x">
        <span className="player-name__badge">X</span>
        <input
          type="text"
          value={players.X}
          maxLength={16}
          onChange={(e) => setPlayerName('X', e.target.value)}
          placeholder="Player X"
          aria-label="Player X name"
        />
      </label>
      <label className="player-name player-name--o">
        <span className="player-name__badge">O</span>
        <input
          type="text"
          value={players.O}
          maxLength={16}
          onChange={(e) => setPlayerName('O', e.target.value)}
          placeholder="Player O"
          aria-label="Player O name"
        />
      </label>
    </div>
  )
}
