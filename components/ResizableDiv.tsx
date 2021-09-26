import { FunctionComponent, useEffect, useRef, useState } from 'react'

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

  const [original, setOriginal] = useState<Original>()

  const handleMouseDown = (e: any) => {
    e.preventDefault()
    const element = resizableDivRef.current as HTMLDivElement

    setOriginal({
      width: parseFloat(getComputedStyle(element, null).getPropertyValue('width').replace('px', '')),
      height: parseFloat(getComputedStyle(element, null).getPropertyValue('height').replace('px', '')),
      x: element.getBoundingClientRect().left,
      y: element.getBoundingClientRect().top,
      mouseX: e.pageX,
      mouseY: e.pageY
    })

  
    function resize(e: MouseEvent) {
      const element = resizableDivRef.current as HTMLDivElement
  
      if (currentResizer.classList.contains('bottom-right')) {
        const width = original_width + (e.pageX - original_mouse_x);
        const height = original_height + (e.pageY - original_mouse_y)
        if (width > minimum_size) {
          element.style.width = width + 'px'
        }
        if (height > minimum_size) {
          element.style.height = height + 'px'
        }
      }
      else if (currentResizer.classList.contains('bottom-left')) {
        const height = original_height + (e.pageY - original_mouse_y)
        const width = original_width - (e.pageX - original_mouse_x)
        if (height > minimum_size) {
          element.style.height = height + 'px'
        }
        if (width > minimum_size) {
          element.style.width = width + 'px'
          element.style.left = original_x + (e.pageX - original_mouse_x) + 'px'
        }
      }
      else if (currentResizer.classList.contains('top-right')) {
        const width = original_width + (e.pageX - original_mouse_x)
        const height = original_height - (e.pageY - original_mouse_y)
        if (width > minimum_size) {
          element.style.width = width + 'px'
        }
        if (height > minimum_size) {
          element.style.height = height + 'px'
          element.style.top = original_y + (e.pageY - original_mouse_y) + 'px'
        }
      }
      else {
        const width = original_width - (e.pageX - original_mouse_x)
        const height = original_height - (e.pageY - original_mouse_y)
        if (width > minimum_size) {
          element.style.width = width + 'px'
          element.style.left = original_x + (e.pageX - original_mouse_x) + 'px'
        }
        if (height > minimum_size) {
          element.style.height = height + 'px'
          element.style.top = original_y + (e.pageY - original_mouse_y) + 'px'
        }
      }
    }
    
    function stopResize() {
      window.removeEventListener('mousemove', resize)
    }

    window.addEventListener('mousemove', resize)
    window.addEventListener('mouseup', stopResize)
  }

  useEffect(() => {

  }, [])

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
    >
      <div style={{ width: '100%', height: '100%', border: '3px solid #4286f4', boxSizing: 'border-box', borderRadius: '5%' }}>
        {/* top left */}
        <div
          style={{
            width: '10px',
            height: '10px',
            // borderRadius: '50%',
            // background: 'transparent',
            // border: '3px solid #4286f4',
            position: 'absolute',
            left: '-5px',
            top: '-5px',
            cursor: 'nwse-resize',
          }}
        ></div>
        {/* top right */}
        <div
          style={{
            width: '10px',
            height: '10px',
            // borderRadius: '50%',
            // background: 'white',
            // border: '3px solid #4286f4',
            position: 'absolute',
            right: '-5px',
            top: '-5px',
            cursor: 'nesw-resize',
          }}
        ></div>
        {/* bottom left */}
        <div
          style={{
            width: '10px',
            height: '10px',
            // borderRadius: '50%',
            // background: 'white',
            // border: '3px solid #4286f4',
            position: 'absolute',
            left: '-5px',
            bottom: '-5px',
            cursor: 'nesw-resize',
          }}
        ></div>
        {/* bottom right */}
        <div
          style={{
            width: '10px',
            height: '10px',
            // borderRadius: '50%',
            // background: 'white',
            // border: '3px solid #4286f4',
            position: 'absolute',
            right: '-5px',
            bottom: '-5px',
            cursor: 'nwse-resize',
          }}
        ></div>
        {children}
      </div>
    </div>
  )
}

export default ResizableDiv
