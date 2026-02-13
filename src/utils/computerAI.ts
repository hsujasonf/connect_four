import type { Player } from '../types/game'
import { ROWS, COLS } from '../types/game'
import { checkWinner, findLowestEmptyRow } from './gameLogic'

export type Difficulty = 'easy' | 'medium' | 'hard'

// Easy: Random valid move
export const getEasyMove = (board: Player[][]): number => {
  const validColumns: number[] = []
  for (let col = 0; col < COLS; col++) {
    if (findLowestEmptyRow(board, col) !== null) {
      validColumns.push(col)
    }
  }
  return validColumns[Math.floor(Math.random() * validColumns.length)]
}

// Medium: Block opponent wins, try to win, otherwise random
export const getMediumMove = (board: Player[][], computerPlayer: 'Red' | 'Yellow'): number => {
  const opponent: 'Red' | 'Yellow' = computerPlayer === 'Red' ? 'Yellow' : 'Red'

  // Try to win
  for (let col = 0; col < COLS; col++) {
    const row = findLowestEmptyRow(board, col)
    if (row !== null) {
      const testBoard = board.map(r => [...r])
      testBoard[row][col] = computerPlayer
      if (checkWinner(testBoard, row, col)) {
        return col
      }
    }
  }

  // Block opponent from winning
  for (let col = 0; col < COLS; col++) {
    const row = findLowestEmptyRow(board, col)
    if (row !== null) {
      const testBoard = board.map(r => [...r])
      testBoard[row][col] = opponent
      if (checkWinner(testBoard, row, col)) {
        return col
      }
    }
  }

  // Otherwise random
  return getEasyMove(board)
}

// Hard: Use minimax algorithm
export const getHardMove = (board: Player[][], computerPlayer: 'Red' | 'Yellow'): number => {
  const opponent: 'Red' | 'Yellow' = computerPlayer === 'Red' ? 'Yellow' : 'Red'
  let bestScore = -Infinity
  let bestCol = 3 // Default to middle

  for (let col = 0; col < COLS; col++) {
    const row = findLowestEmptyRow(board, col)
    if (row !== null) {
      const testBoard = board.map(r => [...r])
      testBoard[row][col] = computerPlayer
      const score = minimax(testBoard, 4, false, computerPlayer, opponent, -Infinity, Infinity)
      if (score > bestScore) {
        bestScore = score
        bestCol = col
      }
    }
  }

  return bestCol
}

function minimax(
  board: Player[][],
  depth: number,
  isMaximizing: boolean,
  computerPlayer: 'Red' | 'Yellow',
  opponent: 'Red' | 'Yellow',
  alpha: number,
  beta: number
): number {
  // Check for terminal states
  const winner = checkBoardWinner(board)
  if (winner === computerPlayer) return 1000
  if (winner === opponent) return -1000
  if (isBoardFull(board) || depth === 0) return evaluateBoard(board, computerPlayer, opponent)

  if (isMaximizing) {
    let maxScore = -Infinity
    for (let col = 0; col < COLS; col++) {
      const row = findLowestEmptyRow(board, col)
      if (row !== null) {
        const testBoard = board.map(r => [...r])
        testBoard[row][col] = computerPlayer
        const score = minimax(testBoard, depth - 1, false, computerPlayer, opponent, alpha, beta)
        maxScore = Math.max(maxScore, score)
        alpha = Math.max(alpha, score)
        if (beta <= alpha) break
      }
    }
    return maxScore
  } else {
    let minScore = Infinity
    for (let col = 0; col < COLS; col++) {
      const row = findLowestEmptyRow(board, col)
      if (row !== null) {
        const testBoard = board.map(r => [...r])
        testBoard[row][col] = opponent
        const score = minimax(testBoard, depth - 1, true, computerPlayer, opponent, alpha, beta)
        minScore = Math.min(minScore, score)
        beta = Math.min(beta, score)
        if (beta <= alpha) break
      }
    }
    return minScore
  }
}

function checkBoardWinner(board: Player[][]): Player {
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      if (board[row][col] && checkWinner(board, row, col)) {
        return board[row][col]
      }
    }
  }
  return null
}

function isBoardFull(board: Player[][]): boolean {
  return board[0].every(cell => cell !== null)
}

function evaluateBoard(board: Player[][], computerPlayer: 'Red' | 'Yellow', opponent: 'Red' | 'Yellow'): number {
  let score = 0
  
  // Prefer center column
  for (let row = 0; row < ROWS; row++) {
    if (board[row][3] === computerPlayer) score += 3
    if (board[row][3] === opponent) score -= 3
  }

  return score
}

export const getComputerMove = (board: Player[][], difficulty: Difficulty, computerPlayer: 'Red' | 'Yellow'): number => {
  switch (difficulty) {
    case 'easy':
      return getEasyMove(board)
    case 'medium':
      return getMediumMove(board, computerPlayer)
    case 'hard':
      return getHardMove(board, computerPlayer)
    default:
      return getEasyMove(board)
  }
}
