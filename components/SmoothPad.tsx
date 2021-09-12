import { useRef, useEffect, useState, MouseEventHandler } from 'react'
import { Cropper } from '../helper/cropper'
import SignaturePad from '../helper/signaturePad'

type SmoothPadProps = {
  width?: number
  height?: number
}

type Point = {
  x: number
  y: number
}

const SmoothPad = ({ width = 720, height = 240 }: SmoothPadProps) => {
  const canvasRef = useRef(null)
  const cropperRef = useRef(null)

  const [signaturePad, setSignaturePad] = useState<SignaturePad>()
  const [cropper, setCropper] = useState<Cropper>()

  const [oldPoint, setOldPoint] = useState<Point>({ x: 0, y: 0 })
  const [newPoint, setNewPoint] = useState<Point>({ x: 0, y: 0 })

  const resizeCanvas = () => {
    const canvas = canvasRef.current as unknown as HTMLCanvasElement

    // When zoomed out to less than 100%, for some very strange reason,
    // some browsers report devicePixelRatio as less than 1
    // and only part of the canvas is cleared then.
    if (canvas) {
      const ratio = Math.max(window.devicePixelRatio || 1, 1)
      canvas.width = canvas.offsetWidth * ratio
      canvas.height = canvas.offsetHeight * ratio
      canvas.getContext('2d')?.scale(ratio, ratio)
    }
  }

  useEffect(() => {
    const _cropper = cropperRef.current as unknown as HTMLDivElement
    setOldPoint({
      x: _cropper.offsetLeft,
      y: _cropper.offsetTop
    })
  }, [cropperRef])

  useEffect(() => {
    resizeCanvas() // must be resized before signature pad is created
    // const canvas = canvasRef.current as unknown as HTMLCanvasElement
    // setSignaturePad(
    //   new SignaturePad(canvas, {
    //     backgroundColor: 'transparent',
    //     penColor: '#ffffff',
    //   }),
    // )
    const _cropper = cropperRef.current as unknown as HTMLDivElement
    //setCropper(new Cropper(_cropper))

    _cropper.addEventListener('mousedown', (e) => {
      e.stopPropagation()
      setOldPoint({
        x: e.x,
        y: e.y
      })


  shift(start: Coordinate, stop: Coordinate) {
    const movementX = stop.x - start.x;
    const movementY = stop.y - start.y;

    this.startCoordinator.x += movementX;
    this.startCoordinator.y += movementY;

    this.endCoordinator.x += movementX;
    this.endCoordinator.y += movementY;

    this.refresh();
  }

      const onMouseMove = (e: MouseEvent) => {
        e.stopPropagation()

        setNewPoint({
          x: e.x,
          y: e.y
        })

        const movementX = e.x - oldPoint.x
        const movementY = e.y - oldPoint.y

        const left = Math.min(this.startCoordinator.x, this.endCoordinator.x);
        const right = Math.max(this.startCoordinator.x, this.endCoordinator.x);
        const top = Math.min(this.startCoordinator.y, this.endCoordinator.y);
        const bottom = Math.max(this.startCoordinator.y, this.endCoordinator.y);
        const height = bottom - top;
        const width = right - left;
    
        this.ref.style.top = `${top}px`;
        this.ref.style.left = `${left}px`;
        this.ref.style.width = `${width}px`;
        this.ref.style.height = `${height}px`;    
      }
    })
  }, [])

  return (
    <div
      ref={cropperRef}
      style={{ width, height }}
      className="absolute border-2 p-2 border-red-500 overflow-x-auto shadow-xl rounded-lg z-10 bg-acb-primary resize-x"
    >
      {/* <canvas style={{ width: 'inherit', height: 'inherit' }} className="rounded-lg" ref={canvasRef} /> */}
      <p className="text-white">{`${point.x}/${point.y}`}</p>
    </div>
  )
}

export default SmoothPad
