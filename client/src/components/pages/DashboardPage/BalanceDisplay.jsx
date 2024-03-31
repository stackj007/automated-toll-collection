// src/components/pages/DashboardPage/BalanceDisplay.jsx
import { useEffect, useState } from 'react'

export default function BalanceDisplay({
  balance,
  vehicleNumber,
  selectedVehicle,
  setSelectedVehicle,
}) {
  const [stripe, setStripe] = useState(null)

  useEffect(() => {
    if (window.Stripe) {
      setStripe(window.Stripe('your_stripe_public_key')) // Replace 'stripe_public_key' with  actual Stripe public key
    } else {
      document
        .querySelector('#stripe-js')
        .addEventListener('load', () => {
          setStripe(window.Stripe('your_stripe_public_key')) // Replace 'stripe_public_key' with  actual Stripe public key
        })
    }
  }, [])

  const handleRecharge = async () => {
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
        payment_method: '{PAYMENT_METHOD_ID}',
      })

    if (error) {
      console.log('[error]', error)
    } else {
      console.log('[PaymentIntent]', paymentIntent)
    }
  }

  const handleVehicleChange = (event) => {
    setSelectedVehicle(event.target.value)
  }

  return (
    <div className="mt-6 bg-[#1A3C40] text-white p-4 rounded-lg">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm">Balance</p>
          <p className="text-3xl font-bold">£ {balance}</p>
        </div>
        <div className="text-right">
          <p className="text-sm">{vehicleNumber}</p>
          <select
            className="bg-[#2E5C63] py-1 px-2 text-xs rounded"
            value={selectedVehicle}
            onChange={handleVehicleChange}
            aria-label="Select Vehicle"
          >
            <option value="">Select Vehicle</option>
            <option value="vehicle1">Vehicle 1</option>
            <option value="vehicle2">Vehicle 2</option>
            {/* Add more options as needed */}
          </select>
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <p className="text-sm">Last Toll Price £ 30.00</p>
        <button
          className="bg-[#2E5C63] py-1 px-2 text-xs rounded"
          aria-label="Recharge"
          onClick={handleRecharge}
        >
          Recharge
        </button>
      </div>
    </div>
  )
}
