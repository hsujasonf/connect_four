import { describe, it, expect } from 'vitest'
import { getEasyMove, getMediumMove, getHardMove, getComputerMove } from './computerAI'
import { createEmptyBoard } from './gameLogic'
import type { Player } from '../types/game'
import { COLS } from '../types/game'

describe('computerAI', () => {
  describe('getEasyMove', () => {
    it('should return a valid column', () => {
      const board = createEmptyBoard()
      const move = getEasyMove(board)
      expect(move).toBeGreaterThanOrEqual(0)
      expect(move).toBeLessThan(COLS)
    })

    it('should not return a full column', () => {
      const board = createEmptyBoard()
      // Fill column 0
      for (let i = 0; i < 6; i++) {
        board[i][0] = 'Red'
      }
      const move = getEasyMove(board)
      expect(move).not.toBe(0)
    })
  })

  describe('getMediumMove', () => {
    it('should win if possible', () => {
      const board = createEmptyBoard()
      board[5][0] = 'Yellow'
      board[5][1] = 'Yellow'
      board[5][2] = 'Yellow'
      const move = getMediumMove(board, 'Yellow')
      expect(move).toBe(3) // Winning move
    })

    it('should block opponent from winning', () => {
      const board = createEmptyBoard()
      board[5][0] = 'Red'
      board[5][1] = 'Red'
      board[5][2] = 'Red'
      const move = getMediumMove(board, 'Yellow')
      expect(move).toBe(3) // Block Red from winning
    })

    it('should return a valid move when no immediate win/block', () => {
      const board = createEmptyBoard()
      const move = getMediumMove(board, 'Yellow')
      expect(move).toBeGreaterThanOrEqual(0)
      expect(move).toBeLessThan(COLS)
    })
  })

  describe('getHardMove', () => {
    it('should return a valid column', () => {
      const board = createEmptyBoard()
      const move = getHardMove(board, 'Yellow')
      expect(move).toBeGreaterThanOrEqual(0)
      expect(move).toBeLessThan(COLS)
    })

    it('should prefer center columns early in game', () => {
      const board = createEmptyBoard()
      const move = getHardMove(board, 'Yellow')
      // Should prefer middle columns (2, 3, 4)
      expect(move).toBeGreaterThanOrEqual(2)
      expect(move).toBeLessThanOrEqual(4)
    })

    it('should win if possible', () => {
      const board = createEmptyBoard()
      board[5][0] = 'Yellow'
      board[5][1] = 'Yellow'
      board[5][2] = 'Yellow'
      const move = getHardMove(board, 'Yellow')
      expect(move).toBe(3) // Winning move
    })
  })

  describe('getComputerMove', () => {
    it('should call correct difficulty function', () => {
      const board = createEmptyBoard()
      
      const easyMove = getComputerMove(board, 'easy', 'Yellow')
      expect(easyMove).toBeGreaterThanOrEqual(0)
      expect(easyMove).toBeLessThan(COLS)

      const mediumMove = getComputerMove(board, 'medium', 'Yellow')
      expect(mediumMove).toBeGreaterThanOrEqual(0)
      expect(mediumMove).toBeLessThan(COLS)

      const hardMove = getComputerMove(board, 'hard', 'Yellow')
      expect(hardMove).toBeGreaterThanOrEqual(0)
      expect(hardMove).toBeLessThan(COLS)
    })
  })
})
