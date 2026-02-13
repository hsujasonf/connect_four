import type { Player } from '../types/game'
import './Cell.css'

interface CellProps {
  value: Player
  onClick: () => void
}

export const Cell = ({ value, onClick }: CellProps) => {
  return (
    <div
      className={`cell ${value ? `cell-${value.toLowerCase()}` : ''}`}
      onClick={onClick}
    >
      {value && <div className="piece"></div>}
    </div>
  )
}
