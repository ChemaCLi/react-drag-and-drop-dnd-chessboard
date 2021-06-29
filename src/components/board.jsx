import { Square } from './square'
import { Knight } from './knight'

function renderSquare(i, [knightX, knightY]) {
  const x = i % 8
  const y = Math.floor(i / 8)

  const black = (x + y) % 2 === 1
  const isKnightHere = knightX === x && knightY === y
  const piece = isKnightHere ? <Knight /> : null

  return (
    <div
      key={i}
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
    <div
      style={{
        width: '400px',
        height: '400px',
        display: 'flex',
        flexWrap: 'wrap'
      }}>
      {squares}
    </div>
  )
}
