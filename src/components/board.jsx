import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Knight } from './knight'
import { BoardSquare } from './board-square'
import { GameObserver } from '../observers'

function renderPiece(x, y, [knightX, knightY]) {
  const isKnightHere = knightX === x && knightY === y

  return isKnightHere ? <Knight /> : null
}

function renderSquare(i, knightPosition) {
  const x = i % 8
  const y = Math.floor(i / 8)

  function handleSquareClick(toX, toY) {
    if (GameObserver.canMoveKnight(toX, toY)) {
      GameObserver.moveKnight(toX, toY)
    }
  }

  return (
    <div
      key={i}
      onClick={() => handleSquareClick(x, y)}
      style={{ width: '50px', height: '50px' }}>
      <BoardSquare x={x} y={y}>
        {renderPiece(x, y, knightPosition)}
      </BoardSquare>
    </div>
  )
}


export function Board({ knightPosition = [0, 0] }) {
  const squares = []
  for (let i = 0; i < 64; i++) {
    squares.push(renderSquare(i, knightPosition))
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div
        style={{
          width: '400px',
          height: '400px',
          display: 'flex',
          flexWrap: 'wrap'
        }}>
        {squares}
      </div>
    </DndProvider>
  )
}
