import { Button } from '../../ui/button'

const VehicleDocument = ({ onRedirect, message }) => {
  return (
    <div className="mt-3">
      <div className="bg-white shadow-lg rounded-lg p-4">
        <p className="text-sm text-gray-700">{message}</p>

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

export default VehicleDocument
