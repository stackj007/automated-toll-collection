import {useEffect, useRef, useState} from 'react'
import jsQR from 'jsqr'

const QrCodeScanner = () => {
  const videoRef = useRef(null)
  const [scannedData, setScannedData] = useState(null)
  const [showMessage, setShowMessage] = useState(false)


  async function handleQR(data) {
    if (!isURL(data)) {
      throw new Error('Invalid URL')
    }

    window.location = data
  }

  const isURL = (str) => {
    const pattern = new RegExp('^((ft|htt)ps?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name and extension
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?' + // port
      '(\\/[-a-z\\d%@_.~+&:]*)*' + // path
      '(\\?[;&a-z\\d%@_.,~+&:=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return pattern.test(str) || str.includes('http://localhost') || str.includes('https://localhost')
  }

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
            handleQR(code.data);
            setScannedData(code.data)
            setShowMessage(true)

            return;

            // handlePayment()
          }
        }
        requestAnimationFrame(scan)
      }

      navigator.mediaDevices
        .getUserMedia({
          video: {facingMode: 'environment'},
        })
        .then((stream) => {
          video.srcObject = stream
          video.setAttribute('playsinline', true)
          video.play()
          requestAnimationFrame(scan)
        })

      return () => {
        video.pause()
        video.srcObject = null
      }
    }, []
  )

  return (
    <div>
      <video ref={videoRef}/>
      {showMessage && (
        <div>
          <p>QR code scanned: {scannedData}</p>
          <button onClick={() => setShowMessage(false)}>
            Scan Again
          </button>
        </div>
      )}
    </div>
  )
}

export default QrCodeScanner
