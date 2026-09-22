import { GameProvider } from './store/GameContext'
import Board from './components/Board'
import StatusBar from './components/StatusBar'
import Scoreboard from './components/Scoreboard'
import MoveHistory from './components/MoveHistory'
import Controls from './components/Controls'
import PlayerNames from './components/PlayerNames'

export default function App() {
  return (
    <GameProvider>
      <div className="page">
        <div className="grid-backdrop" aria-hidden="true" />

        <header className="header">
          <p className="header__eyebrow">Grid Co. — Field Sheet 03</p>
          <h1 className="header__title">Tic · Tac · Toe</h1>
        </header>

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