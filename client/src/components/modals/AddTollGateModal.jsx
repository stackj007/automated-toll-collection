/* eslint-disable react/prop-types */
import { useState } from 'react'

const AddTollGateModal = ({
  isOpen,
  onClose,
  onAddTollGate,
}) => {
  const [newTollGate, setNewTollGate] = useState({
    address: '',
    fee: '',
  })

  if (!isOpen) {
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await onAddTollGate(newTollGate)
    onClose()
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50"
      style={{ display: isOpen ? 'flex' : 'none' }}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center ">
          Add New Toll Gate
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700 my-2"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                value={newTollGate.address}
                onChange={(e) =>
                  setNewTollGate({
                    ...newTollGate,
                    address: e.target.value,
                  })
                }
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="fee"
                className="block text-sm font-medium text-gray-700 my-2"
              >
                Fee
              </label>
              <input
                type="number"
                id="fee"
                value={newTollGate.fee}
                onChange={(e) =>
                  setNewTollGate({
                    ...newTollGate,
                    fee: e.target.value,
                  })
                }
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-6">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
            >
              Add Toll Gate
            </button>
            <button
              type="button"
              className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddTollGateModal
