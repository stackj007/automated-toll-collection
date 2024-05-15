import { FaTimesCircle } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const FailedPage = () => {
  const navigate = useNavigate()

  const handleButtonClick = () => {
    navigate('/dashboard')
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-8 bg-gray-100">
      <FaTimesCircle className="w-16 h-16 text-red-500 animate-pulse" />
      <h1 className="text-2xl font-bold mt-4">Payment Failed</h1>
      <p className="text-lg mt-2">Your payment was unsuccessful. Please try again.</p>
      <button
        className="mt-8 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        onClick={handleButtonClick}
      >
        Go to Homepage
      </button>
    </div>
  )
}

export default FailedPage
