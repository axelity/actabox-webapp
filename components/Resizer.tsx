import React, { MouseEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react'

type ResizerType = 'TOP_LEFT' | 'TOP_RIGHT' | 'BOTTOM_LEFT' | 'BOTTOM_RIGHT'

type PosSizeType = {
  width: number
  height: number
  left: number
  top: number
}

type ResizerProps = {
  resizerType?: ResizerType
  size?: number
  left?: number
  top?: number
  parent?: any
  onChanged?: (props: PosSizeType) => void
}

const Resizer = React.memo(
  ({ resizerType = 'TOP_RIGHT', left = 0, top = 0, size = 10, parent, onChanged }: ResizerProps) => {
    const classNames = 'absolute rounded-full border-2 border-blue-600 bg-white'

    const resizerRef = useRef<HTMLDivElement>(null)

    const [onResize, setOnResize] = useState<boolean>(false)
    const [offset, setOffset] = useState<{
      left: number
      top: number
    }>({
      left: 0,
      top: 0,
    })

    const [resizerPos, setResizerPos] = useState<{
      left: number
      top: number
    }>({
      left,
      top,
    })

    const [mousePos, setMousePos] = useState<{
      x: number
      y: number
    }>({
      x: 0,
      y: 0,
    })

    const handleMouseDown = (e: any) => {
      e.preventDefault()
      console.log('mousedown')
      const target = resizerRef.current as HTMLDivElement

      setOnResize(true)

      setOffset({
        left: target.offsetLeft - e.clientX,
        top: target.offsetTop - e.clientY,
      })

      setMousePos({
        x: e.clientX,
        y: e.clientY,
      })
    }

    const handleMouseUp = (e: any) => {
      e.preventDefault()
      console.log('mouseup')
      setOnResize(false)
    }

    const handleMouseMove = (e: any) => {
      e.preventDefault()
      console.log('mousemove')
      const target = e.target as HTMLDivElement
      console.log(onResize)
      if (onResize) {
        setMousePos({
          x: e.clientX,
          y: e.clientY,
        })

        setResizerPos({
          left: e.clientX + offset.left,
          top: e.clientY + offset.top,
        })
      }
    }

    return (
      <div
        ref={resizerRef}
        style={{
          cursor:
            resizerType === 'TOP_LEFT'
              ? 'nwse-resize'
              : resizerType === 'TOP_RIGHT'
              ? 'nesw-resize'
              : resizerType === 'BOTTOM_LEFT'
              ? 'nesw-resize'
              : 'nwse-resize',
          left: `${resizerPos.left}px`,
          top: `${resizerPos.top}px`,
          width: `${size}px`,
          height: `${size}px`,
        }}
        className="absolute rounded-full border-2 border-blue-600 bg-white"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      ></div>
    )

    // return (
    //   <>
    //     {resizerType === 'TOP_LEFT' ? (
    //       <div
    //         ref={resizerRef}
    //         style={{
    //           cursor: 'nwse-resize',
    //           left: `-${size / 2}px`,
    //           top: `-${size / 2}px`,
    //           width: `${size}px`,
    //           height: `${size}px`,
    //         }}
    //         className={classNames}
    //       ></div>
    //     ) : null}

    //     {resizerType === 'TOP_RIGHT' ? (
    //       <div
    //         ref={resizerRef}
    //         style={{
    //           cursor: 'nesw-resize',
    //           right: `-${size / 2}px`,
    //           top: `-${size / 2}px`,
    //           width: `${size}px`,
    //           height: `${size}px`,
    //         }}
    //         className={classNames}
    //       ></div>
    //     ) : null}

    //     {resizerType === 'BOTTOM_LEFT' ? (
    //       <div
    //         ref={resizerRef}
    //         style={{
    //           cursor: 'nesw-resize',
    //           left: `-${size / 2}px`,
    //           bottom: `-${size / 2}px`,
    //           width: `${size}px`,
    //           height: `${size}px`,
    //         }}
    //         className={classNames}
    //       ></div>
    //     ) : null}

    //     {resizerType === 'BOTTOM_RIGHT' ? (
    //       <div
    //         ref={resizerRef}
    //         style={{
    //           cursor: 'nwse-resize',
    //           right: `-${size / 2}px`,
    //           bottom: `-${size / 2}px`,
    //           width: `${size}px`,
    //           height: `${size}px`,
    //         }}
    //         className={classNames}
    //       ></div>
    //     ) : null}
    //   </>
    // )
  },
)

export default Resizer
