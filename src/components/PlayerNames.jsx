import { useGame } from '../store/GameContext'

export default function PlayerNames() {
  const { players, setPlayerName } = useGame()

  return (
    <div className="player-names">
      <label className="player-name player-name--x">
        <span>X</span>
        <input
          type="text"
          value={players.X}
          maxLength={16}
          onChange={(e) => setPlayerName('X', e.target.value)}
          placeholder="Player X"
        />
      </label>
      <label className="player-name player-name--o">
        <span>O</span>
        <input
          type="text"
          value={players.O}
          maxLength={16}
          onChange={(e) => setPlayerName('O', e.target.value)}
          placeholder="Player O"
        />
      </label>
    </div>
  )
}