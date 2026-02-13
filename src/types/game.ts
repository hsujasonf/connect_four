export type Player = 'Red' | 'Yellow' | null

export interface GameState {
  board: Player[][]
  currentPlayer: 'Red' | 'Yellow'
  winner: Player
}

export const ROWS = 6
export const COLS = 7
