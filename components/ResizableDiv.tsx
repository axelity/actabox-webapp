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

  const [original, setOriginal] = useState<Original>({
    width: 0,
    height: 0,
    mouseX: 0,
    mouseY: 0,
    x: 0,
    y: 0
  })

  useEffect(() => {
    const resizers = document.querySelectorAll('.resizer')

    for (let i = 0;i < resizers.length; i++) {
      const currentResizer = resizers[i];

      currentResizer.addEventListener('mousedown', (e: any) => {
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
        
        function resize(e: any) {
          const element = resizableDivRef.current as any
      
          if (currentResizer.classList.contains('bottom-right')) {
            const width = original.width + (e.pageX - original.mouseX);
            const height = original.height + (e.pageY - original.mouseY)
            if (width > minWidth) {
              element.style.width = width + 'px'
            }
            if (height > minHeight) {
              element.style.height = height + 'px'
            }
          }
          else if (currentResizer.classList.contains('bottom-left')) {
            const height = original.height + (e.pageY - original.mouseY)
            const width = original.width - (e.pageX - original.mouseX)
            if (height > minHeight) {
              element.style.height = height + 'px'
            }
            if (width > minWidth) {
              element.style.width = width + 'px'
              element.style.left = original.x + (e.pageX - original.mouseX) + 'px'
            }
          }
          else if (currentResizer.classList.contains('top-right')) {
            const width = original.width + (e.pageX - original.mouseX)
            const height = original.height - (e.pageY - original.mouseY)
            if (width > minWidth) {
              element.style.width = width + 'px'
            }
            if (height > minHeight) {
              element.style.height = height + 'px'
              element.style.top = original.y + (e.pageY - original.mouseY) + 'px'
            }
          }
          else {
            const width = original.width - (e.pageX - original.mouseX)
            const height = original.height - (e.pageY - original.mouseY)
            if (width > minWidth) {
              element.style.width = width + 'px'
              element.style.left = original.x + (e.pageX - original.mouseX) + 'px'
            }
            if (height > minHeight) {
              element.style.height = height + 'px'
              element.style.top = original.y + (e.pageY - original.mouseY) + 'px'
            }
          }
        }
        
        function stopResize() {
          window.removeEventListener('mousemove', resize)
        }
    
        window.addEventListener('mousemove', resize)
        window.addEventListener('mouseup', stopResize)
      })
    }
  }, [])

  return (
    <div
      style={{
        background: 'white',
        width: `${width}px`,
        height: `${height}px`,
        position: 'absolute',
        top: `${top}px`,
        left: `${left}px`
      }}
      ref={resizableDivRef}
    >
      <div style={{ width: '100%', height: '100%', border: '3px solid #4286f4', boxSizing: 'border-box' }}>
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
          className="resizer top-left"
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
          className="resizer top-right"
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
          className="resizer bottom-left"
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
          className="resizer bottom-right"
        ></div>
        {children}
      </div>
    </div>
  )
}

export default ResizableDiv
