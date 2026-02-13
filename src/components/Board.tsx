import type { Player } from '../types/game'
import { Cell } from './Cell'
import './Board.css'

interface BoardProps {
  board: Player[][]
  onCellClick: (col: number) => void
}

export const Board = ({ board, onCellClick }: BoardProps) => {
  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, colIndex) => (
            <Cell
              key={colIndex}
              value={cell}
              onClick={() => onCellClick(colIndex)}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
