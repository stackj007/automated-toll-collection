import { Button } from '../../../ui/button'
import { useNavigate } from 'react-router-dom'

const ProfileCompletion = () => {
  const navigate = useNavigate()

  const handleRedirectToDocuments = () => {
    navigate('/documents')
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-4 mt-24 p-3">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold">
          Complete your profile
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Please complete your account information to
          generate your QR code.
        </p>
      </div>
      <div className=" max-w-sm space-y-4">
        <Button
          className=" bg-black text-white"
          onClick={handleRedirectToDocuments}
        >
          Upload your documents
        </Button>
      </div>
    </div>
  )
}

export default ProfileCompletion
