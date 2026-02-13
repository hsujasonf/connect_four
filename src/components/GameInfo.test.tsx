import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { GameInfo } from './GameInfo'

describe('GameInfo', () => {
  it('should display current player when there is no winner', () => {
    render(<GameInfo currentPlayer="Red" winner={null} />)
    expect(screen.getByText(/Current Player:/)).toBeTruthy()
    expect(screen.getByText('Red')).toBeTruthy()
  })

  it('should display winner message when there is a winner', () => {
    render(<GameInfo currentPlayer="Red" winner="Yellow" />)
    expect(screen.getByText('Yellow Wins!')).toBeTruthy()
  })

  it('should apply correct CSS class to current player', () => {
    const { container } = render(<GameInfo currentPlayer="Yellow" winner={null} />)
    const playerSpan = container.querySelector('.player-yellow')
    expect(playerSpan).toBeTruthy()
    expect(playerSpan?.textContent).toBe('Yellow')
  })
})
