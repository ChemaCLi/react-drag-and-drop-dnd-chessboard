import { Square } from './square'
import { Knight } from './knight'
import { canMoveKnight, moveKnight } from '../observers/observe'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

function renderSquare(i, knightPosition) {
  const x = i % 8
  const y = Math.floor(i / 8)

  const [knightX, knightY] = knightPosition

  const black = (x + y) % 2 === 1
  const isKnightHere = knightX === x && knightY === y
  const piece = isKnightHere ? <Knight /> : null

  function handleSquareClick(toX, toY) {
    console.log('trying to move the piece', { toX,  toY })
    if (canMoveKnight(toX, toY)) {
      moveKnight(toX, toY)
    }
  }
  return (
    <div
      key={i}
      onClick={() => handleSquareClick(x, y)}
      style={{ width: '50px', height: '50px' }}>
      <Square black={black}>
        {piece}
      </Square>
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
