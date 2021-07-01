import { Square } from './square'
import { useDrop } from 'react-dnd'
import { ItemTypes } from '../constants'
import { canMoveKnight, moveKnight } from '../observers/observe'

export function BoardSquare({ x, y, children }) {
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: ItemTypes.KNIGHT,
    drop: () => moveKnight(x, y),
    canDrop: () => canMoveKnight(x, y),
    collect: monitor => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop()
    })
  }), [x, y])

  const black = (x + y) % 2 === 1

  return (
    <div
      ref={drop}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
      }}>
      <Square black={black}>
        {children}
      </Square>
      {!isOver && canDrop && <Overlay color='yellow' />}
      {isOver && !canDrop && <Overlay color='red' />}
      {isOver && canDrop && <Overlay color='green' />}
    </div>
  )
}

function Overlay({ color }) {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        zIndex: 1,
        opacity: 0.5,
        backgroundColor: color,
      }} />
  )
}
