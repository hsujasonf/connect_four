import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Cell } from './Cell'

describe('Cell', () => {
  it('should render an empty cell', () => {
    const { container } = render(<Cell value={null} onClick={() => {}} />)
    const cell = container.querySelector('.cell')
    expect(cell).toBeTruthy()
    expect(cell?.querySelector('.piece')).toBeNull()
  })

  it('should render a red piece', () => {
    const { container } = render(<Cell value="Red" onClick={() => {}} />)
    const cell = container.querySelector('.cell')
    expect(cell?.classList.contains('cell-red')).toBe(true)
    expect(cell?.querySelector('.piece')).toBeTruthy()
  })

  it('should render a yellow piece', () => {
    const { container } = render(<Cell value="Yellow" onClick={() => {}} />)
    const cell = container.querySelector('.cell')
    expect(cell?.classList.contains('cell-yellow')).toBe(true)
    expect(cell?.querySelector('.piece')).toBeTruthy()
  })

  it('should call onClick when clicked', async () => {
    const handleClick = vi.fn()
    const { container } = render(<Cell value={null} onClick={handleClick} />)
    const cell = container.querySelector('.cell')
    
    if (cell) {
      await userEvent.click(cell)
      expect(handleClick).toHaveBeenCalledTimes(1)
    }
  })
})
