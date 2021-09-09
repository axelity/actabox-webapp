import React, { MouseEvent, useCallback, useRef, useState } from 'react'

type SignaturePlaceholderProps = {
  width: number
  height: number
  left: number
  top: number
  minWidth?: number
  minHeight?: number
}

const SignaturePlaceholder = ({
  height,
  width,
  left,
  top,
  minHeight = 20,
  minWidth = 20,
}: SignaturePlaceholderProps) => {
  let mousePosition = {
    x: 0,
    y: 0,
  }
  let offset = {
    left: 0,
    top: 0,
  }
  let isDown = false

  const MINIMUM_SIZE = 20
  // let originalWidth = 0
  // let originalHeight = 0
  // let originalX = 0
  // let originalY = 0
  // let originalMouseX = 0
  // let originalMouseY = 0

  // let resizerDown = false

  type Rectangle = {
    width: number
    height: number
    left: number
    top: number
  }

  type MousePosition = {
    x: number
    y: number
  }

  const [rectangle, setRectangle] = useState<Rectangle>({
    height,
    width,
    left,
    top,
  })

  const [mousePos, setMousePos] = useState<MousePosition>({
    x: 0,
    y: 0,
  })

  const [originalSize, setOriginalSize] = useState<{ width: number; height: number }>({
    height: 0,
    width: 0,
  })

  const [originalPosition, setOriginalPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  })

  const [originalMousePosition, setOriginalMousePosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  })

  const [onResize, setOnResize] = useState<boolean>(false)

  const resizableRef = useRef<HTMLDivElement>(null)

  // const resizerMouseDown = (e: MouseEvent<HTMLDivElement>) => {
  //   e.preventDefault()
  //   resizerDown = true
  //   const target = e.target as HTMLDivElement
  //   //const element = target.parentElement?.parentElement as HTMLDivElement
  //   const element = document.querySelector('.resizable') as HTMLDivElement
  //   originalWidth = parseFloat(getComputedStyle(element, null).getPropertyValue('width').replace('px', ''))
  //   originalHeight = parseFloat(getComputedStyle(element, null).getPropertyValue('height').replace('px', ''))
  //   originalX = element.getBoundingClientRect().left
  //   originalY = element.getBoundingClientRect().top
  //   originalMouseX = e.pageX
  //   originalMouseY = e.pageY
  // }

  const resizerMouseDown = useCallback((e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault()

    setOnResize(true)

    setMousePos({
      x: e.pageX,
      y: e.pageY,
    })

    // const _resizable = resizableRef.current as HTMLDivElement

    // setRectangle({
    //   width: parseFloat(getComputedStyle(_resizable, null).getPropertyValue('width').replace('px', '')),
    //   height: parseFloat(getComputedStyle(_resizable, null).getPropertyValue('height').replace('px', '')),
    //   left: _resizable.getBoundingClientRect().left,
    //   top: _resizable.getBoundingClientRect().top,
    // })
  }, [])

  // const resizerMouseUp = (e: MouseEvent<HTMLDivElement>) => {
  //   e.preventDefault()
  //   resizerDown = false
  // }

  const resizerMouseUp = (e: MouseEvent<HTMLDivElement>) => {
    setOnResize(false)
  }

  // const resizerTopLeftMove = (e: MouseEvent<HTMLDivElement>) => {
  //   if (resizerDown) {
  //     const target = e.target as HTMLDivElement
  //     const element = document.querySelector('.resizable') as HTMLDivElement
  //     const width = originalWidth - (e.pageX - originalMouseX)
  //     const height = originalHeight - (e.pageY - originalMouseY)
  //     if (width > MINIMUM_SIZE) {
  //       element.style.width = width + 'px'
  //       element.style.left = originalX + (e.pageX - originalMouseX) + 'px'
  //     }
  //     if (height > MINIMUM_SIZE) {
  //       element.style.height = height + 'px'
  //       element.style.top = originalY + (e.pageY - originalMouseY) + 'px'
  //     }
  //   }
  // }

  const resizerTopLeftMove = (e: MouseEvent<HTMLDivElement>) => {
    console.log(onResize)
    if (onResize) {
      const newWidth = rectangle.width - (e.pageX - mousePos.x)
      const newHeight = rectangle.height - (e.pageY - mousePos.y)

      setRectangle({
        width: newWidth > minWidth ? newWidth : rectangle.width,
        height: newHeight > minHeight ? newHeight : rectangle.height,
        left: newWidth > minWidth ? rectangle.left + (e.pageX - mousePos.x) : rectangle.left,
        top: newHeight > minHeight ? rectangle.top + (e.pageY - mousePos.y) : rectangle.top,
      })
    }
  }

  // const resizerTopRightMove = (e: MouseEvent<HTMLDivElement>) => {
  //   if (resizerDown) {
  //     const target = e.target as HTMLDivElement
  //     const element = document.querySelector('.resizable') as HTMLDivElement
  //     const width = originalWidth + (e.pageX - originalMouseX)
  //     const height = originalHeight - (e.pageY - originalMouseY)
  //     if (width > MINIMUM_SIZE) {
  //       element.style.width = width + 'px'
  //     }
  //     if (height > MINIMUM_SIZE) {
  //       element.style.height = height + 'px'
  //       element.style.top = originalY + (e.pageY - originalMouseY) + 'px'
  //     }
  //   }
  // }

  const resizerTopRightMove = (e: MouseEvent<HTMLDivElement>) => {
    console.log(onResize)
    if (onResize) {
      const newWidth = rectangle.width + (e.pageX - mousePos.x)
      const newHeight = rectangle.height - (e.pageY - mousePos.y)

      setRectangle({
        width: newWidth > minWidth ? newWidth : rectangle.width,
        height: newHeight > minHeight ? newHeight : rectangle.height,
        left: rectangle.left,
        top: newHeight > minHeight ? rectangle.top + (e.pageY - mousePos.y) : rectangle.top,
      })
    }
  }

  // const resizerBottomLeftMove = (e: MouseEvent<HTMLDivElement>) => {
  //   if (resizerDown) {
  //     const target = e.target as HTMLDivElement
  //     const element = document.querySelector('.resizable') as HTMLDivElement
  //     const height = originalHeight + (e.pageY - originalMouseY)
  //     const width = originalWidth - (e.pageX - originalMouseX)
  //     if (height > MINIMUM_SIZE) {
  //       element.style.height = height + 'px'
  //     }
  //     if (width > MINIMUM_SIZE) {
  //       element.style.width = width + 'px'
  //       element.style.left = originalX + (e.pageX - originalMouseX) + 'px'
  //     }
  //   }
  // }

  const resizerBottomLeftMove = (e: MouseEvent<HTMLDivElement>) => {
    console.log(onResize)
    if (onResize) {
      const newWidth = rectangle.width - (e.pageX - mousePos.x)
      const newHeight = rectangle.height + (e.pageY - mousePos.y)

      setRectangle({
        width: newWidth > minWidth ? newWidth : rectangle.width,
        height: newHeight > minHeight ? newHeight : rectangle.height,
        left: newWidth > minWidth ? rectangle.left + (e.pageX - mousePos.x) : rectangle.left,
        top: rectangle.top,
      })
    }
  }

  // const resizerBottomRightMove = (e: MouseEvent<HTMLDivElement>) => {
  //   if (resizerDown) {
  //     const target = e.target as HTMLDivElement
  //     const element = document.querySelector('.resizable') as HTMLDivElement
  //     const width = originalWidth + (e.pageX - originalMouseX)
  //     const height = originalHeight + (e.pageY - originalMouseY)
  //     if (width > MINIMUM_SIZE) {
  //       element.style.width = width + 'px'
  //     }
  //     if (height > MINIMUM_SIZE) {
  //       element.style.height = height + 'px'
  //     }
  //   }
  // }

  const resizerBottomRightMove = (e: MouseEvent<HTMLDivElement>) => {
    console.log(onResize)
    if (onResize) {
      const newWidth = rectangle.width + (e.pageX - mousePos.x)
      const newHeight = rectangle.height + (e.pageY - mousePos.y)

      setRectangle({
        width: newWidth > minWidth ? newWidth : rectangle.width,
        height: newHeight > minHeight ? newHeight : rectangle.height,
        left: rectangle.left,
        top: rectangle.top,
      })
    }
  }

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    const target = e.target as HTMLDivElement
    isDown = true
    offset = {
      left: target.offsetLeft - e.clientX,
      top: target.offsetTop - e.clientY,
    }
  }

  const handleMouseUp = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    const target = e.target as HTMLDivElement
    isDown = false
  }

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    const target = e.target as HTMLDivElement
    if (isDown) {
      mousePosition = {
        x: e.clientX - target.offsetLeft,
        y: e.clientY - target.offsetTop,
      }
    }
    target.style.left = `${mousePosition.x + offset.left}px`
    target.style.top = `${mousePosition.y + offset.top}px`
  }

  return (
    // <div
    //   style={{left: '100px', top: '50px'}}
    //   className="absolute w-24 h-24 border-2 border-blue-600 bg-white shadow-2xl cursor-move"
    //   onMouseDown={handleMouseDown}
    //   onMouseUp={handleMouseUp}
    //   onMouseMove={handleMouseMove}
    // >
    <div
      ref={resizableRef}
      style={{
        left: `${rectangle.left}px`,
        top: `${rectangle.top}px`,
        width: `${rectangle.width}px`,
        height: `${rectangle.height}px`,
      }}
      className="resizable absolute bg-white"
    >
      <div className="relative w-full h-full box-border border-2 border-blue-600">
        <div
          style={{ cursor: 'nwse-resize', left: '-5px', top: '-5px', width: '10px', height: '10px' }}
          className="absolute rounded-full border-2 border-blue-600 bg-white"
          onMouseDown={resizerMouseDown}
          onMouseMove={resizerTopLeftMove}
          onMouseUp={resizerMouseUp}
        ></div>
        <div
          style={{ cursor: 'nesw-resize', right: '-5px', top: '-5px', width: '10px', height: '10px' }}
          className="absolute rounded-full border-2 border-blue-600 bg-white"
          onMouseDown={resizerMouseDown}
          onMouseMove={resizerTopRightMove}
          onMouseUp={resizerMouseUp}
        ></div>
        <div
          style={{ cursor: 'nesw-resize', left: '-5px', bottom: '-5px', width: '10px', height: '10px' }}
          className="absolute rounded-full border-2 border-blue-600 bg-white"
          onMouseDown={resizerMouseDown}
          onMouseMove={resizerBottomLeftMove}
          onMouseUp={resizerMouseUp}
        ></div>
        <div
          style={{ cursor: 'nwse-resize', right: '-5px', bottom: '-5px', width: '10px', height: '10px' }}
          className="absolute rounded-full border-2 border-blue-600 bg-white"
          onMouseDown={resizerMouseDown}
          onMouseMove={resizerBottomRightMove}
          onMouseUp={resizerMouseUp}
        ></div>
      </div>
    </div>
  )
}

export default SignaturePlaceholder
