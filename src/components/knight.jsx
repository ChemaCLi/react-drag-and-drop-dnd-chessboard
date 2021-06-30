import React from "react";
import { useDrag } from 'react-dnd'
import { ItemTypes } from '../constants'

export function Knight() {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.KNIGHT,
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
    })
  }))

  return (
    <div
      ref={drag}
      style={{
        backgroundColor: 'rgba(1, 1, 1, 0)',
        opacity: isDragging ? 0.5 : 1,
        fontSize: 25,
        fontWeight: 'bold',
        cursor: 'move',
      }}>
      ♘
    </div>
  )
}
