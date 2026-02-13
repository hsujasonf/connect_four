import { useState, useEffect } from 'react'
import type { Player } from '../types/game'
import { createEmptyBoard, checkWinner, findLowestEmptyRow } from '../utils/gameLogic'
import { getComputerMove, type Difficulty } from '../utils/computerAI'
import { Board } from './Board'
import { GameInfo } from './GameInfo'
import './ConnectFourGame.css'

type GameMode = 'human' | 'computer'

export const ConnectFourGame = () => {
  const [board, setBoard] = useState<Player[][]>(createEmptyBoard())
  const [currentPlayer, setCurrentPlayer] = useState<'Red' | 'Yellow'>('Red')
  const [winner, setWinner] = useState<Player>(null)
  const [gameMode, setGameMode] = useState<GameMode | null>(null)
  const [difficulty, setDifficulty] = useState<Difficulty>('medium')
  const [isComputerThinking, setIsComputerThinking] = useState(false)

  useEffect(() => {
    if (gameMode === 'computer' && currentPlayer === 'Yellow' && !winner && !isComputerThinking) {
      setIsComputerThinking(true)
      setTimeout(() => {
        const col = getComputerMove(board, difficulty, 'Yellow')
        makeMove(col)
        setIsComputerThinking(false)
      }, 500)
    }
  }, [currentPlayer, gameMode, winner, board, difficulty, isComputerThinking])

  const makeMove = (col: number) => {
    if (winner || isComputerThinking) return

    const row = findLowestEmptyRow(board, col)
    if (row === null) return

    const newBoard = board.map(r => [...r])
    newBoard[row][col] = currentPlayer
    setBoard(newBoard)

    if (checkWinner(newBoard, row, col)) {
      setWinner(currentPlayer)
    } else {
      setCurrentPlayer(currentPlayer === 'Red' ? 'Yellow' : 'Red')
    }
  }

  const dropPiece = (col: number) => {
    if (gameMode === 'computer' && currentPlayer === 'Yellow') return
    makeMove(col)
  }

  const resetGame = () => {
    setBoard(createEmptyBoard())
    setCurrentPlayer('Red')
    setWinner(null)
    setIsComputerThinking(false)
  }

  const startGame = (mode: GameMode, diff?: Difficulty) => {
    setGameMode(mode)
    if (diff) setDifficulty(diff)
    resetGame()
  }

  if (gameMode === null) {
    return (
      <div className="connect-four-game">
        <h1>C<span className="letter-o-red">o</span>nnect F<span className="letter-o-yellow">o</span>ur</h1>
        <div className="mode-selection">
          <h2>Select Game Mode</h2>
          <button className="mode-button" onClick={() => startGame('human')}>
            2 Players
          </button>
          <div className="computer-mode">
            <h3>vs Computer</h3>
            <div className="difficulty-buttons">
              <button className="difficulty-button" onClick={() => startGame('computer', 'easy')}>
                Easy
              </button>
              <button className="difficulty-button" onClick={() => startGame('computer', 'medium')}>
                Medium
              </button>
              <button className="difficulty-button" onClick={() => startGame('computer', 'hard')}>
                Hard
              </button>
            </div>
          </div>
        </div>
        <div className="surface"></div>
      </div>
    )
  }

  return (
    <div className="connect-four-game">
      <h1>C<span className="letter-o-red">o</span>nnect F<span className="letter-o-yellow">o</span>ur</h1>
      <div className="game-controls">
        <GameInfo currentPlayer={currentPlayer} winner={winner} />
        <button className="reset-button" onClick={resetGame}>
          Reset
        </button>
        <button className="mode-button-small" onClick={() => setGameMode(null)}>
          Menu
        </button>
      </div>
      <div className="board-with-stand">
        <Board board={board} onCellClick={dropPiece} />
        <div className="board-legs">
          <div className="board-leg left"></div>
          <div className="board-leg right"></div>
        </div>
      </div>
      <div className="surface"></div>
    </div>
  )
}
