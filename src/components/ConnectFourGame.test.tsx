import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ConnectFourGame } from './ConnectFourGame'

describe('ConnectFourGame', () => {
  it('should render the game title', () => {
    render(<ConnectFourGame />)
    expect(screen.getByText('Connect Four')).toBeTruthy()
  })

  it('should render the reset button', () => {
    render(<ConnectFourGame />)
    expect(screen.getByText('Reset Game')).toBeTruthy()
  })

  it('should start with Red as the current player', () => {
    render(<ConnectFourGame />)
    expect(screen.getByText(/Current Player:/)).toBeTruthy()
    expect(screen.getByText('Red')).toBeTruthy()
  })

  it('should switch players after a move', async () => {
    const { container } = render(<ConnectFourGame />)
    const cells = container.querySelectorAll('.cell')
    
    // Click the first cell (column 0)
    await userEvent.click(cells[0])
    
    // Should now be Yellow's turn
    expect(screen.getByText('Yellow')).toBeTruthy()
  })

  it('should reset the game when reset button is clicked', async () => {
    const { container } = render(<ConnectFourGame />)
    const cells = container.querySelectorAll('.cell')
    const resetButton = screen.getByText('Reset Game')
    
    // Make a move
    await userEvent.click(cells[0])
    
    // Reset the game
    await userEvent.click(resetButton)
    
    // Should be back to Red's turn
    expect(screen.getByText('Red')).toBeTruthy()
    
    // All cells should be empty
    const pieces = container.querySelectorAll('.piece')
    expect(pieces.length).toBe(0)
  })

  it('should stack pieces in the same column', async () => {
    const { container } = render(<ConnectFourGame />)
    const cells = container.querySelectorAll('.cell')
    
    // Click the same column twice
    await userEvent.click(cells[0]) // Red
    await userEvent.click(cells[0]) // Yellow
    
    // Should have 2 pieces
    const pieces = container.querySelectorAll('.piece')
    expect(pieces.length).toBe(2)
  })
})
