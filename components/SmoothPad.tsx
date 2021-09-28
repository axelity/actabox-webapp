import { useRef, useEffect, useState } from 'react'
import SignaturePad from '../helper/signaturePad'

type SmoothPadProps = {
  width?: string
  height?: string
}

const SmoothPad = ({ width = '720px', height = '240px' }: SmoothPadProps) => {
  const canvasRef = useRef(null)

  const [signaturePad, setSignaturePad] = useState<SignaturePad>()

  const resizeCanvas = () => {
    const canvas = canvasRef.current as unknown as HTMLCanvasElement

    // When zoomed out to less than 100%, for some very strange reason,
    // some browsers report devicePixelRatio as less than 1
    // and only part of the canvas is cleared then.
    const ratio = Math.max(window.devicePixelRatio || 1, 1)
    canvas.width = canvas.offsetWidth * ratio
    canvas.height = canvas.offsetHeight * ratio
    canvas.getContext('2d')?.scale(ratio, ratio)
  }

  useEffect(() => {
    resizeCanvas() // must be resized before signature pad is created
    const canvas = canvasRef.current as unknown as HTMLCanvasElement
    setSignaturePad(
      new SignaturePad(canvas, {
        backgroundColor: '#1060aa',
        penColor: '#ffffff',
      }),
    )
  }, [])

  return (
    <div>
      <canvas style={{ width, height }} ref={canvasRef} />
    </div>
  )
}

export default SmoothPad
