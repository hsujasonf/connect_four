import { describe, it, expect } from 'vitest'
import { createEmptyBoard, checkWinner, findLowestEmptyRow } from './gameLogic'
import type { Player } from '../types/game'
import { ROWS, COLS } from '../types/game'

describe('gameLogic', () => {
  describe('createEmptyBoard', () => {
    it('should create a board with correct dimensions', () => {
      const board = createEmptyBoard()
      expect(board).toHaveLength(ROWS)
      expect(board[0]).toHaveLength(COLS)
    })

    it('should create a board with all null values', () => {
      const board = createEmptyBoard()
      board.forEach(row => {
        row.forEach(cell => {
          expect(cell).toBeNull()
        })
      })
    })
  })

  describe('findLowestEmptyRow', () => {
    it('should return the bottom row when column is empty', () => {
      const board = createEmptyBoard()
      const row = findLowestEmptyRow(board, 0)
      expect(row).toBe(5)
    })

    it('should return null when column is full', () => {
      const board = createEmptyBoard()
      for (let i = 0; i < ROWS; i++) {
        board[i][0] = 'Red'
      }
      const row = findLowestEmptyRow(board, 0)
      expect(row).toBeNull()
    })

    it('should return the correct row when column is partially filled', () => {
      const board = createEmptyBoard()
      board[5][0] = 'Red'
      board[4][0] = 'Yellow'
      const row = findLowestEmptyRow(board, 0)
      expect(row).toBe(3)
    })
  })

  describe('checkWinner', () => {
    it('should detect horizontal win', () => {
      const board = createEmptyBoard()
      board[5][0] = 'Red'
      board[5][1] = 'Red'
      board[5][2] = 'Red'
      board[5][3] = 'Red'
      expect(checkWinner(board, 5, 3)).toBe(true)
    })

    it('should detect vertical win', () => {
      const board = createEmptyBoard()
      board[5][0] = 'Yellow'
      board[4][0] = 'Yellow'
      board[3][0] = 'Yellow'
      board[2][0] = 'Yellow'
      expect(checkWinner(board, 2, 0)).toBe(true)
    })

    it('should detect diagonal win (bottom-left to top-right)', () => {
      const board = createEmptyBoard()
      board[5][0] = 'Red'
      board[4][1] = 'Red'
      board[3][2] = 'Red'
      board[2][3] = 'Red'
      expect(checkWinner(board, 2, 3)).toBe(true)
    })

    it('should detect diagonal win (top-left to bottom-right)', () => {
      const board = createEmptyBoard()
      board[2][0] = 'Yellow'
      board[3][1] = 'Yellow'
      board[4][2] = 'Yellow'
      board[5][3] = 'Yellow'
      expect(checkWinner(board, 5, 3)).toBe(true)
    })

    it('should return false when there is no winner', () => {
      const board = createEmptyBoard()
      board[5][0] = 'Red'
      board[5][1] = 'Yellow'
      board[5][2] = 'Red'
      expect(checkWinner(board, 5, 2)).toBe(false)
    })

    it('should return false for an empty cell', () => {
      const board = createEmptyBoard()
      expect(checkWinner(board, 0, 0)).toBe(false)
    })

    it('should not detect a win with only 3 in a row', () => {
      const board = createEmptyBoard()
      board[5][0] = 'Red'
      board[5][1] = 'Red'
      board[5][2] = 'Red'
      expect(checkWinner(board, 5, 2)).toBe(false)
    })
  })
})
