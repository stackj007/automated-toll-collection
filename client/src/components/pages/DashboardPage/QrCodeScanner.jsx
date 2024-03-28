// QrCodeScanner.jsx
import { useEffect, useRef } from 'react'
import jsQR from 'jsqr'

const QrCodeScanner = () => {
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    const canvasElement = document.createElement('canvas')
    const canvas = canvasElement.getContext('2d')

    const scan = () => {
      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        canvasElement.height = video.videoHeight
        canvasElement.width = video.videoWidth
        canvas.drawImage(
          video,
          0,
          0,
          canvasElement.width,
          canvasElement.height
        )
        const imageData = canvas.getImageData(
          0,
          0,
          canvasElement.width,
          canvasElement.height
        )
        const code = jsQR(
          imageData.data,
          imageData.width,
          imageData.height,
          {
            inversionAttempts: 'dontInvert',
          }
        )
        if (code) {
          console.log('Found QR code', code.data)
        }
      }
      requestAnimationFrame(scan)
    }

    navigator.mediaDevices
      .getUserMedia({
        video: { facingMode: 'environment' },
      })
      .then((stream) => {
        video.srcObject = stream
        video.setAttribute('playsinline', true) // required to tell iOS safari we don't want fullscreen
        video.play()
        requestAnimationFrame(scan)
      })

    return () => {
      video.pause()
      video.srcObject = null
    }
  }, [])

  return <video ref={videoRef} />
}

export default QrCodeScanner
