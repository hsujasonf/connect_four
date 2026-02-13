# Connect Four Game

A modern Connect Four game built with React, TypeScript, and Vite.

## Features

- Two-player gameplay (Red vs Yellow)
- Win detection for all directions (horizontal, vertical, diagonal)
- Clean, modular component architecture
- Comprehensive unit tests
- TypeScript for type safety

## Project Structure

```
src/
├── components/           # React components
│   ├── Board.tsx        # Game board container
│   ├── Board.css
│   ├── Cell.tsx         # Individual cell/slot
│   ├── Cell.css
│   ├── GameInfo.tsx     # Current player/winner display
│   ├── GameInfo.css
│   ├── ConnectFourGame.tsx  # Main game logic
│   └── ConnectFourGame.css
├── types/               # TypeScript type definitions
│   └── game.ts
├── utils/               # Utility functions
│   └── gameLogic.ts    # Game logic (win checking, board operations)
├── test/                # Test configuration
│   └── setup.ts
├── App.tsx              # Root application component
└── App.css
```

## Getting Started

### Prerequisites

- Node.js version 20.19+ or 22.12+ (required for Vite 7)

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

### Run Tests

```bash
npm test              # Run tests in watch mode
npm run test:ui       # Run tests with UI
npm run test:coverage # Run tests with coverage report
```

### Build for Production

```bash
npm run build
```

## How to Play

1. Players take turns clicking on columns to drop their pieces
2. Pieces fall to the lowest available position in the selected column
3. First player to get 4 pieces in a row (horizontally, vertically, or diagonally) wins
4. Click "Reset Game" to start a new game

## Testing

The project includes comprehensive unit tests for:

- **Game Logic** (`gameLogic.test.ts`): Tests for board creation, piece placement, and win detection
- **Components**: Tests for all React components ensuring proper rendering and user interactions
- **Integration Tests**: Tests for the complete game flow

All tests use Vitest and React Testing Library for modern, fast testing.
