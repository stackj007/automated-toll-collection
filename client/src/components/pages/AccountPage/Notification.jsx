import { Button } from '../../../ui/button'

const Notification = ({ onRedirect }) => {
  return (
    <div className="mt-3">
      <div className="bg-white shadow-lg rounded-lg p-4">
        <p className="text-sm text-gray-700">
          Please complete your vehicle information in the
          Documents page.
        </p>
        <div className="mt-4">
          <Button
            onClick={onRedirect}
            variant="default"
            size="sm"
            className="bg-black text-white"
          >
            Go to Documents
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Notification
