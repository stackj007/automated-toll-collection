/* eslint-disable react/prop-types */
// import { ExitIcon } from '@radix-ui/react-icons'

const DocumentReviewModal = ({
  isOpen,
  onClose,
  request,
  onAccept,
  onReject,
}) => {
  if (!isOpen) {
    return null
  }
  const documents = [
    {
      name: 'ID',
      url: request.idCardUrl,
    },
    {
      name: 'Vehicle License',
      url: request.driverLicenseUrl,
    },
    {
      name: 'RC Book',
      url: request.vehicleRCBookUrl,
    },
  ]

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50"
      style={{ display: isOpen ? 'flex' : 'none' }}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">
          Review User Request
        </h2>
        <div className="space-y-2">
          <p>
            <strong className="font-semibold">
              Request ID:
            </strong>{' '}
            {request.id}
          </p>
          <p>
            <strong className="font-semibold">
              User Name:
            </strong>{' '}
            {request.user.name}
          </p>
          <p>
            <strong className="font-semibold">
              Vehicle Number:
            </strong>{' '}
            {request.vehicleNumber}
          </p>
          <p>
            <strong className="font-semibold">
              Vehicle name:
            </strong>{' '}
            {request.vehicleName}
          </p>
          <p>
            <strong className="font-semibold">
              Vehicle Type:
            </strong>{' '}
            {request.vehicleType}
          </p>
        </div>
        <h3 className="mt-6 text-xl font-bold">
          Documents:
        </h3>

        {documents.map((document) => (
          <div key={document.name} className="mb-4">
            <h4 className="text-lg font-semibold">
              {document.name}
            </h4>
            <img
              src={document.url}
              alt={document.name}
              className="rounded-lg max-h-32"
            />
          </div>
        ))}
        <div className="flex justify-end gap-2 mt-6">
          <button
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
            onClick={onAccept}
          >
            Accept
          </button>
          <button
            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
            onClick={onReject}
          >
            Reject
          </button>
          <button
            className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default DocumentReviewModal
