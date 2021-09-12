import { MouseEventHandler, useEffect, useRef, useState } from 'react'

const SignaturePad = () => {
  const canvasRef = useRef(null)

  const [onDrawing, setOnDrawing] = useState(false)

  const startDrawing = (e) => {
    setOnDrawing(true)

    const canvas = document.getElementById('signaturePad')
    let ctx = canvas.getContext('2d')

    ctx.beginPath()
    ctx.moveTo(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop)
  }

  const draw = (e) => {
    const canvas = document.getElementById('signaturePad')
    let ctx = canvas.getContext('2d')

    if (ctx && onDrawing) {
      var x = e.pageX - canvas.offsetLeft
      var y = e.pageY - canvas.offsetTop

      console.log(`${e.pageX}, ${canvas.offsetLeft} | ${e.pageY}, ${canvas.offsetTop}`)

      ctx.lineTo(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop)
      ctx.stroke()
    }
  }

  const stopDrawing = (e) => {
    setOnDrawing(false)
  }

  useEffect(() => {
    const canvas = canvasRef.current
    let ctx = canvas.getContext('2d')
    canvas.width = 384
    canvas.height = 384

    console.log(`${canvas.witdh}, ${canvas.height}`)

    ctx.lineWidth = 2
    ctx.lineCap = 'round'
    ctx.strokeStyle = '#913d88'

    ctx.moveTo(1, 1)
    ctx.lineTo(100, 100)
    ctx.stroke()
  }, [])

  return (
    <div className="w-96 h-96">
      <canvas
        id="signaturePad"
        ref={canvasRef}
        className="w-full h-full bg-gray-50"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
      />
    </div>
  )
}

export default SignaturePad
