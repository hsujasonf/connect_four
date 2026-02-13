import type { Player } from '../types/game'
import './GameInfo.css'

interface GameInfoProps {
  currentPlayer: 'Red' | 'Yellow'
  winner: Player
}

export const GameInfo = ({ currentPlayer, winner }: GameInfoProps) => {
  return (
    <div className="game-info">
      {winner ? (
        <h2 className="winner-message">{winner} Wins!</h2>
      ) : (
        <h2>
          Current Player:{' '}
          <span className={`player-${currentPlayer.toLowerCase()}`}>
            {currentPlayer}
          </span>
        </h2>
      )}
    </div>
  )
}
