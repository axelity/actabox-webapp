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

type SizePosition = {
  width: number
  height: number
  left: number
  top: number
}

const ResizableDiv: FunctionComponent<ResizableDivProps> = ({
  width = 100,
  height = 100,
  top = 10,
  left = 10,
  minWidth = 100,
  minHeight = 100,
  children,
}) => {
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

  let sizePosition: SizePosition = {
    width,
    height,
    left,
    top,
  }

  /**
   * Top Left
   */
  const lockTopLeft = (e: any) => {
    original = {
      width: parseFloat(getComputedStyle(element, null).getPropertyValue('width').replace('px', '')),
      height: parseFloat(getComputedStyle(element, null).getPropertyValue('height').replace('px', '')),
      x: element.getBoundingClientRect().left,
      y: element.getBoundingClientRect().top,
      mouseX: e.pageX,
      mouseY: e.pageY,
    }

    window.addEventListener('mousemove', resizeTopLeft)
    window.addEventListener('mouseup', releaseTopLeft)
  }

  const resizeTopLeft = (e: any) => {
    const width = original.width - (e.pageX - original.mouseX)
    const height = original.height - (e.pageY - original.mouseY)

    const newWidth = width > minWidth ? width : sizePosition.width
    const newHeight = height > minHeight ? height : sizePosition.height
    const newLeft = width > minWidth ? original.x + (e.pageX - original.mouseX) : sizePosition.left
    const newTop = height > minHeight ? original.y + (e.pageY - original.mouseY) : sizePosition.top

    sizePosition = {
      height: newHeight,
      width: newWidth,
      top: newTop,
      left: newLeft
    }

    element.style.width = `${newWidth}px`
    element.style.height = `${newHeight}px`
    element.style.top = `${newTop}px`
    element.style.left = `${newLeft}px`
  }

  const releaseTopLeft = (e: any) => {
    window.removeEventListener('mousemove', resizeTopLeft)
  }

  /**
   * Top right
   */
  const lockTopRight = (e: any) => {
    original = {
      width: parseFloat(getComputedStyle(element, null).getPropertyValue('width').replace('px', '')),
      height: parseFloat(getComputedStyle(element, null).getPropertyValue('height').replace('px', '')),
      x: element.getBoundingClientRect().left,
      y: element.getBoundingClientRect().top,
      mouseX: e.pageX,
      mouseY: e.pageY,
    }

    window.addEventListener('mousemove', resizeTopRight)
    window.addEventListener('mouseup', releaseTopRight)
  }

  const resizeTopRight = (e: any) => {
    const width = original.width + (e.pageX - original.mouseX)
    const height = original.height - (e.pageY - original.mouseY)

    const newWidth = width > minWidth ? width : sizePosition.width
    const newHeight = height > minHeight ? height : sizePosition.height
    const newTop = height > minHeight ? original.y + (e.pageY - original.mouseY) : sizePosition.top
    const newLeft = sizePosition.left

    sizePosition = {
      height: newHeight,
      width: newWidth,
      top: newTop,
      left: newLeft
    }

    element.style.width = `${newWidth}px`
    element.style.height = `${newHeight}px`
    element.style.top = `${newTop}px`
    element.style.left = `${newLeft}px`
  }

  const releaseTopRight = (e: any) => {
    window.removeEventListener('mousemove', resizeTopRight)
  }

  /**
   * Bottom left
   */
  const lockBottomLeft = (e: any) => {
    original = {
      width: parseFloat(getComputedStyle(element, null).getPropertyValue('width').replace('px', '')),
      height: parseFloat(getComputedStyle(element, null).getPropertyValue('height').replace('px', '')),
      x: element.getBoundingClientRect().left,
      y: element.getBoundingClientRect().top,
      mouseX: e.pageX,
      mouseY: e.pageY,
    }
    
    window.addEventListener('mousemove', resizeBottomLeft)
    window.addEventListener('mouseup', releaseBottomLeft)
  }

  const resizeBottomLeft = (e: any) => {
    const height = original.height + (e.pageY - original.mouseY)
    const width = original.width - (e.pageX - original.mouseX)

    const newHeight = height > minHeight ? height : sizePosition.height
    const newWidth = width > minWidth ? width : sizePosition.width
    const newLeft = width > minWidth ? original.x + (e.pageX - original.mouseX) : sizePosition.left
    const newTop = sizePosition.top

    sizePosition = {
      height: newHeight,
      width: newWidth,
      top: newTop,
      left: newLeft
    }

    element.style.width = `${newWidth}px`
    element.style.height = `${newHeight}px`
    element.style.top = `${newTop}px`
    element.style.left = `${newLeft}px`
  }

  const releaseBottomLeft = (e: any) => {
    window.removeEventListener('mousemove', resizeBottomLeft)
  }

  /**
   * Bottom right
   */
  const lockBottomRight = (e: any) => {
    original = {
      width: parseFloat(getComputedStyle(element, null).getPropertyValue('width').replace('px', '')),
      height: parseFloat(getComputedStyle(element, null).getPropertyValue('height').replace('px', '')),
      x: element.getBoundingClientRect().left,
      y: element.getBoundingClientRect().top,
      mouseX: e.pageX,
      mouseY: e.pageY,
    }
    
    window.addEventListener('mousemove', resizeBottomRight)
    window.addEventListener('mouseup', releaseBottomRight)
  }

  const resizeBottomRight = (e: any) => {
    const width = original.width + (e.pageX - original.mouseX)
    const height = original.height + (e.pageY - original.mouseY)

    const newWidth = width > minWidth ? width : sizePosition.width
    const newHeight = height > minHeight ? height : sizePosition.height
    const newTop = sizePosition.top
    const newLeft = sizePosition.left

    sizePosition = {
      height: newHeight,
      width: newWidth,
      top: newTop,
      left: newLeft
    }

    element.style.width = `${newWidth}px`
    element.style.height = `${newHeight}px`
    element.style.top = `${newTop}px`
    element.style.left = `${newLeft}px`
  }

  const releaseBottomRight = (e: any) => {
    window.removeEventListener('mousemove', resizeBottomRight)
  }

  return (
    <div
      style={{
        background: 'white',
        width: `${width}px`,
        height: `${height}px`,
        position: 'absolute',
        top: `${top}px`,
        left: `${left}px`,
      }}
      className="shadow-xl"
      ref={resizableDivRef}
    >
      <div style={{ width: '100%', height: '100%', border: '3px solid #4286f4', boxSizing: 'border-box', borderRadius: '5px' }}>
        {/* top left */}
        <div
          style={{
            width: '10px',
            height: '10px',
            position: 'absolute',
            left: '-5px',
            top: '-5px',
            cursor: 'nwse-resize',
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
          }}
          onMouseDown={lockBottomRight}
        ></div>
        {children}
      </div>
    </div>
  )
}

export default ResizableDiv
