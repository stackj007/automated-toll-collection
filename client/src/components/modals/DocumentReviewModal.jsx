// DocumentReviewModal.jsx
import React from 'react'

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

  // Placeholder images for demonstration
  const documents = [
    {
      id: 1,
      name: 'ID Proof Front',
      url: 'https://via.placeholder.com/150',
    },
    {
      id: 2,
      name: 'ID Proof Back',
      url: 'https://via.placeholder.com/150',
    },
    // Add more documents as needed
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
            {request.name}
          </p>
          <p>
            <strong className="font-semibold">
              Request Details:
            </strong>{' '}
            {request.request}
          </p>
        </div>
        <h3 className="mt-6 text-xl font-bold">
          Documents:
        </h3>

        {documents.map((document) => (
          <div key={document.id} className="mb-4">
            <h4 className="text-lg font-semibold">
              {document.name}
            </h4>
            <img
              src={document.url}
              alt={document.name}
              className=" h-auto rounded-lg"
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
