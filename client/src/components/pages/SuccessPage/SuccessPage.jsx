import { FaCheckCircle } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const SuccessPage = () => {
  const navigate = useNavigate()

  const handleButtonClick = () => {
    navigate('/dashboard')
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-8 bg-gray-100">
      <FaCheckCircle className="w-16 h-16 text-green-500 animate-pulse" />
      <h1 className="text-2xl font-bold mt-4">
        Payment Successful
      </h1>
      <p className="text-lg mt-2">
        Your payment was successful. Thank you for your
        purchase.
      </p>
      <button
        className="mt-8 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        onClick={handleButtonClick}
      >
        Go to Homepage
      </button>
    </div>
  )
}

export default SuccessPage
