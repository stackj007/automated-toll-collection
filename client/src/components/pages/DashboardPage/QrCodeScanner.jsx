import { useEffect, useRef, useState } from 'react'
import jsQR from 'jsqr'

const QrCodeScanner = () => {
  const videoRef = useRef(null)
  const [scannedData, setScannedData] = useState(null)
  const [showMessage, setShowMessage] = useState(false)
  const [stripe, setStripe] = useState(null)

  useEffect(() => {
    if (window.Stripe) {
      setStripe(window.Stripe('stripe_public_key'))
    } else {
      document
        .querySelector('#stripe-js')
        .addEventListener('load', () => {
          setStripe(window.Stripe('stripe_public_key'))
        })
    }
  }, [])

  const handlePayment = async () => {
    if (!stripe) return

    //  placeholder for the actual payment process.
    //  replace this with  server's endpoint that creates a PaymentIntent.
    const response = await fetch('/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: 1000 }),
    })

    const { clientSecret } = await response.json()

    const { error, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: '{PAYMENT_METHOD_ID}', // collect from the user
      })

    if (error) {
      console.log('[error]', error)
    } else {
      console.log('[PaymentIntent]', paymentIntent)
    }
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
          setScannedData(code.data)
          setShowMessage(true)
          handlePayment()
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
        video.setAttribute('playsinline', true)
        video.play()
        requestAnimationFrame(scan)
      })

    return () => {
      video.pause()
      video.srcObject = null
    }
  }, [])

  return (
    <div>
      <video ref={videoRef} />
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
