import React, { MouseEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useMousePosition } from '../hooks/useMousePosition'

type BollaProps = {
  top?: number,
  left?: number
}
const Bolla = React.memo(({ top = 0, left = 0 }: BollaProps) => {
  //const position = useMousePosition()

  const resizerRef = useRef<HTMLDivElement>(null)

  const [onMove, setOnMove] = useState<boolean>(false)
  const [position, setPosition] = useState<{
    x: number
    y: number
  }>({
    x: left,
    y: top,
  })
  const [offset, setOffset] = useState<{
    left: number
    top: number
  }>({
    left: 0,
    top: 0,
  })

  useEffect(() => {
    const handleMouseDown = (e: any) => {
      setOnMove(true)
      const target = resizerRef.current as HTMLDivElement

      setOffset({
        left: target.offsetLeft - e.clientX,
        top: target.offsetTop - e.clientY,
      })
    }

    const handleMouseUp = (e: any) => {
      setOnMove(false)
    }

    const handleMouseMove = (e: any) => {
      e.preventDefault()

      if (onMove) {
        setPosition({
          x: e.clientX + offset.left,
          y: e.clientY + offset.top,
        })
      }
    }

    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  })

  return (
    <div
      ref={resizerRef}
      style={{
        cursor: 'move',
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `50px`,
        height: `50px`,
      }}
      className="absolute rounded-full border-2 border-blue-600 bg-white"
    >
      {position.x}/{position.y}
    </div>
  )
})

export default Bolla
