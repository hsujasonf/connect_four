import type { Player } from '../types/game'
import { ROWS, COLS } from '../types/game'

export const createEmptyBoard = (): Player[][] => {
  return Array(ROWS).fill(null).map(() => Array(COLS).fill(null))
}

export const checkWinner = (
  board: Player[][],
  row: number,
  col: number
): boolean => {
  const player = board[row][col]
  if (!player) return false

  // Check horizontal
  let count = 0
  for (let c = 0; c < COLS; c++) {
    if (board[row][c] === player) {
      count++
      if (count === 4) return true
    } else {
      count = 0
    }
  }

  // Check vertical
  count = 0
  for (let r = 0; r < ROWS; r++) {
    if (board[r][col] === player) {
      count++
      if (count === 4) return true
    } else {
      count = 0
    }
  }

  // Check diagonal (bottom-left to top-right)
  count = 0
  const startRow1 = row - Math.min(row, col)
  const startCol1 = col - Math.min(row, col)
  for (let i = 0; startRow1 + i < ROWS && startCol1 + i < COLS; i++) {
    if (board[startRow1 + i][startCol1 + i] === player) {
      count++
      if (count === 4) return true
    } else {
      count = 0
    }
  }

  // Check diagonal (top-left to bottom-right)
  count = 0
  const startRow2 = row + Math.min(ROWS - 1 - row, col)
  const startCol2 = col - Math.min(ROWS - 1 - row, col)
  for (let i = 0; startRow2 - i >= 0 && startCol2 + i < COLS; i++) {
    if (board[startRow2 - i][startCol2 + i] === player) {
      count++
      if (count === 4) return true
    } else {
      count = 0
    }
  }

  return false
}

export const findLowestEmptyRow = (
  board: Player[][],
  col: number
): number | null => {
  for (let row = ROWS - 1; row >= 0; row--) {
    if (board[row][col] === null) {
      return row
    }
  }
  return null
}
