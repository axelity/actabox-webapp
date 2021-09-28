import { FunctionComponent, useRef } from 'react'

type ResizableDivProps = {
  width?: number
  height?: number
  top?: number
  left?: number
  minWidth?: number
  minHeight?: number
}

type Original = {
  width: number
  height: number
  x: number
  y: number
  mouseX: number
  mouseY: number
}

type Rectangle = {
  width: number
  height: number
  left: number
  top: number
}

type Offset = {
  left: number
  top: number
}

const ResizableDiv: FunctionComponent<ResizableDivProps> = ({ width = 100, height = 100, top = 10, left = 10, minWidth = 100, minHeight = 100, children }) => {
  const resizableDivRef = useRef<HTMLDivElement>(null)
  const element = resizableDivRef.current as HTMLDivElement

  let original: Original = {
    width: 0,
    height: 0,
    mouseX: 0,
    mouseY: 0,
    x: 0,
    y: 0,
  }

  let rectangle: Rectangle = {
    width,
    height,
    left,
    top,
  }

  let offset: Offset = {
    left: 0,
    top: 0,
  }

  let moveEnabled = true

  /**
   * Resizable
   */
  const lockResizable = (e: any) => {
    if (moveEnabled) {
      offset = {
        left: element.offsetLeft - e.clientX,
        top: element.offsetTop - e.clientY,
      }

      window.addEventListener('mousemove', moveResizable)
      window.addEventListener('mouseup', releaseResizable)
    }
  }

  const moveResizable = (e: any) => {
    if (moveEnabled) {
      e.stopPropagation()

      rectangle = {
        width: rectangle.width,
        height: rectangle.height,
        left: e.clientX + offset.left,
        top: e.clientY + offset.top,
      }

      element.style.width = `${rectangle.width}px`
      element.style.height = `${rectangle.height}px`
      element.style.left = `${rectangle.left}px`
      element.style.top = `${rectangle.top}px`
    }
  }

  const releaseResizable = (e: any) => {
    if (moveEnabled) {
      window.removeEventListener('mousemove', moveResizable)
    }
  }

  const setOriginal = (e: any) => {
    original = {
      width: parseFloat(getComputedStyle(element, null).getPropertyValue('width').replace('px', '')),
      height: parseFloat(getComputedStyle(element, null).getPropertyValue('height').replace('px', '')),
      x: element.getBoundingClientRect().left,
      y: element.getBoundingClientRect().top,
      mouseX: e.pageX,
      mouseY: e.pageY,
    }
  }

  const setResizable = () => {
    element.style.width = `${rectangle.width}px`
    element.style.height = `${rectangle.height}px`
    element.style.left = `${rectangle.left}px`
    element.style.top = `${rectangle.top}px`
  }

  /**
   * Top Left
   */
  const lockTopLeft = (e: any) => {
    moveEnabled = false
    setOriginal(e)

    window.addEventListener('mousemove', resizeTopLeft)
    window.addEventListener('mouseup', releaseTopLeft)
  }

  const resizeTopLeft = (e: any) => {
    const width = original.width - (e.pageX - original.mouseX)
    const height = original.height - (e.pageY - original.mouseY)

    rectangle = {
      width: width > minWidth ? width : rectangle.width,
      height: height > minHeight ? height : rectangle.height,
      left: width > minWidth ? original.x + (e.pageX - original.mouseX) : rectangle.left,
      top: height > minHeight ? original.y + (e.pageY - original.mouseY) : rectangle.top,
    }

    setResizable()
  }

  const releaseTopLeft = (e: any) => {
    moveEnabled = true
    window.removeEventListener('mousemove', resizeTopLeft)
  }

  /**
   * Top right
   */
  const lockTopRight = (e: any) => {
    moveEnabled = false
    setOriginal(e)

    window.addEventListener('mousemove', resizeTopRight)
    window.addEventListener('mouseup', releaseTopRight)
  }

  const resizeTopRight = (e: any) => {
    const width = original.width + (e.pageX - original.mouseX)
    const height = original.height - (e.pageY - original.mouseY)

    rectangle = {
      width: width > minWidth ? width : rectangle.width,
      height: height > minHeight ? height : rectangle.height,
      left: rectangle.left,
      top: height > minHeight ? original.y + (e.pageY - original.mouseY) : rectangle.top,
    }

    setResizable()
  }

  const releaseTopRight = (e: any) => {
    moveEnabled = true
    window.removeEventListener('mousemove', resizeTopRight)
  }

  /**
   * Bottom left
   */
  const lockBottomLeft = (e: any) => {
    moveEnabled = false
    setOriginal(e)

    window.addEventListener('mousemove', resizeBottomLeft)
    window.addEventListener('mouseup', releaseBottomLeft)
  }

  const resizeBottomLeft = (e: any) => {
    const height = original.height + (e.pageY - original.mouseY)
    const width = original.width - (e.pageX - original.mouseX)

    rectangle = {
      height: height > minHeight ? height : rectangle.height,
      width: width > minWidth ? width : rectangle.width,
      top: rectangle.top,
      left: width > minWidth ? original.x + (e.pageX - original.mouseX) : rectangle.left,
    }

    setResizable()
  }

  const releaseBottomLeft = (e: any) => {
    moveEnabled = true
    window.removeEventListener('mousemove', resizeBottomLeft)
  }

  /**
   * Bottom right
   */
  const lockBottomRight = (e: any) => {
    moveEnabled = false
    setOriginal(e)

    window.addEventListener('mousemove', resizeBottomRight)
    window.addEventListener('mouseup', releaseBottomRight)
  }

  const resizeBottomRight = (e: any) => {
    const width = original.width + (e.pageX - original.mouseX)
    const height = original.height + (e.pageY - original.mouseY)

    rectangle = {
      height: height > minHeight ? height : rectangle.height,
      width: width > minWidth ? width : rectangle.width,
      top: rectangle.top,
      left: rectangle.left,
    }

    setResizable()
  }

  const releaseBottomRight = (e: any) => {
    moveEnabled = true
    window.removeEventListener('mousemove', resizeBottomRight)
  }

  return (
    <div
      style={{
        background: 'transparent',
        width: `${width}px`,
        height: `${height}px`,
        position: 'absolute',
        top: `${top}px`,
        left: `${left}px`,
      }}
      className="shadow-xl"
      ref={resizableDivRef}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          border: '3px solid #4286f4',
          boxSizing: 'border-box',
          borderRadius: '5px',
          cursor: 'move',
          backgroundColor: 'white',
        }}
        onMouseDown={lockResizable}
      >
        {/* top left */}
        <div
          style={{
            width: '10px',
            height: '10px',
            position: 'absolute',
            left: '-5px',
            top: '-5px',
            cursor: 'nwse-resize',
            zIndex: 10,
          }}
          onMouseDown={lockTopLeft}
        ></div>
        {/* top right */}
        <div
          style={{
            width: '10px',
            height: '10px',
            position: 'absolute',
            right: '-5px',
            top: '-5px',
            cursor: 'nesw-resize',
            zIndex: 10,
          }}
          onMouseDown={lockTopRight}
        ></div>
        {/* bottom left */}
        <div
          style={{
            width: '10px',
            height: '10px',
            position: 'absolute',
            left: '-5px',
            bottom: '-5px',
            cursor: 'nesw-resize',
            zIndex: 10,
          }}
          onMouseDown={lockBottomLeft}
        ></div>
        {/* bottom right */}
        <div
          style={{
            width: '10px',
            height: '10px',
            position: 'absolute',
            right: '-5px',
            bottom: '-5px',
            cursor: 'nwse-resize',
            zIndex: 10,
          }}
          onMouseDown={lockBottomRight}
        ></div>
        {children}
      </div>
    </div>
  )
}

export default ResizableDiv
