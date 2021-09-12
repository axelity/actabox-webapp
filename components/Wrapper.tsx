import { useRef, useEffect, useState, MouseEventHandler, FunctionComponent } from 'react'
import { Cropper } from '../helper/cropper'
import SignaturePad from '../helper/signaturePad'

type WrapperProps = {
  width?: number
  height?: number
}

type Coordinate = {
  x: number
  y: number
}

type Offset = {
  left: number
  top: number
}

const Wrapper: FunctionComponent<WrapperProps> = ({ width = 720, height = 240, children }) => {
  const wrapperRef = useRef(null)

  const [position, setPosition] = useState<Coordinate>({ x: 0, y: 0 })
  const [offset, setOffset] = useState<Offset>({ left: 0, top: 0 })

  useEffect(() => {
    const wrapper = wrapperRef.current as unknown as HTMLDivElement

    const left = offset.left + position.x 
    const top = offset.top + position.y 
    const height = wrapper.offsetHeight
    const width = wrapper.offsetWidth

    wrapper.style.top = `${top}px`
    wrapper.style.left = `${left}px`
    wrapper.style.width = `${width}px`
    wrapper.style.height = `${height}px`
  }, [position])

  useEffect(() => {
    const wrapper = wrapperRef.current as unknown as HTMLDivElement

    wrapper.addEventListener('mousedown', (ev) => {
      ev.stopPropagation()
      const wrapper = wrapperRef.current as unknown as HTMLDivElement

      setOffset({
        left: wrapper.offsetLeft - ev.clientX,
        top: wrapper.offsetTop - ev.clientY,
      })

      const onMouseMove = (e: MouseEvent) => {
        e.stopPropagation()

        setPosition({
          x: e.clientX + offset.left,
          y: e.clientY + offset.top,
        })
      }

      const onMouseUp = (e: MouseEvent) => {
        e.stopPropagation()
        window.removeEventListener('mousemove', onMouseMove)
        window.removeEventListener('mouseup', onMouseUp)
      }

      window.addEventListener('mousemove', onMouseMove)
      window.addEventListener('mouseup', onMouseUp)
    })
  }, [])

  return (
    <div
      ref={wrapperRef}
      style={{ width, height }}
      className="absolute border-2 p-2 border-red-500 overflow-x-auto shadow-xl rounded-lg z-10 bg-acb-primary resize-x"
    >
      {children}
    </div>
  )
}

export default Wrapper
