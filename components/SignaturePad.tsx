import { MouseEventHandler, useEffect, useRef, useState } from 'react'

const SignaturePad = () => {
  const canvasRef = useRef(null)

  const [onDrawing, setOnDrawing] = useState(false)

  const startDrawing = (e: any) => {
    setOnDrawing(true)

    const canvas: any = canvasRef.current
    let ctx = canvas.getContext('2d')

    ctx.beginPath()
    ctx.moveTo(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop)
  }

  const draw = (e: any) => {
    const canvas: any = canvasRef.current
    const ctx = canvas.getContext('2d')

    if (ctx && onDrawing) {
      console.log(`${e.pageX}, ${canvas.offsetLeft} | ${e.pageY}, ${canvas.offsetTop}`)

      ctx.lineTo(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop)
      ctx.stroke()
    }
  }

  const stopDrawing = (e: any) => {
    setOnDrawing(false)
  }

  useEffect(() => {
    const canvas: any = canvasRef.current

    const ctx = canvas.getContext('2d')
    canvas.width = 384
    canvas.height = 384

    ctx.lineWidth = 2
    ctx.lineCap = 'round'
    ctx.strokeStyle = '#913d88'
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="w-96 h-96 bg-gray-50"
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={stopDrawing}
    />
  )
}

export default SignaturePad
