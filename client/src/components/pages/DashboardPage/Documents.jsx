import React, { useState } from 'react'
import documents from '../../../assets/icons/documents.png'

export function Documents() {
  const [step, setStep] = useState(1)
  const [idProof, setIdProof] = useState(null)
  const [vehicleDetails, setVehicleDetails] = useState({})
  const [vehicleDocuments, setVehicleDocuments] = useState(
    {}
  )

  const handleNext = () => {
    if (step === 1 && !idProof) {
      alert('Please upload your ID proof')
      return
    }

    if (step === 2 && !Object.keys(vehicleDetails).length) {
      alert('Please enter your vehicle details')
      return
    }

    if (
      step === 2 &&
      !Object.keys(vehicleDocuments).length
    ) {
      alert('Please upload your vehicle documents')
      return
    }

    setStep(step + 1)
  }

  const handleCancel = () => {
    setStep(1)
    setIdProof(null)
    setVehicleDetails({})
    setVehicleDocuments({})
  }

  const handleIdProofUpload = (event, idType) => {
    if (
      event.target.files &&
      event.target.files.length > 0
    ) {
      setIdProof({ file: event.target.files[0], idType })
    }
  }

  const handleVehicleDetailsChange = (event) => {
    setVehicleDetails({
      ...vehicleDetails,
      [event.target.name]: event.target.value,
    })
  }

  const handleVehicleDocumentUpload = (event) => {
    setVehicleDocuments({
      ...vehicleDocuments,
      [event.target.name]: event.target.files[0],
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {step === 1 && (
        <div className="flex flex-col space-y-4">
          <h2>Upload Documents</h2>
          <p className="text-gray-600">
            Please upload your ID proof which are updated
            with latest details
          </p>
          <div className="flex space-x-4">
            <div className="flex flex-col items-center justify-center py-5 border-dashed border-2 border-sky-500 w-full">
              <img
                src={documents}
                className="w-11 my-2"
              ></img>
              <label htmlFor="id-proof-front">
                Id Card (Front)
              </label>
              <input
                type="file"
                id="id-proof-front"
                className="bg-gray-100 rounded-md p-2 "
                onChange={(event) =>
                  handleIdProofUpload(event, 'front-card')
                }
              />
            </div>
            <div className="flex flex-col items-center justify-center py-5 border-dashed border-2 border-sky-500 w-full">
              <img
                src={documents}
                className="w-11 my-2"
              ></img>
              <label htmlFor="id-proof-back">
                Id Card (back)
              </label>
              <input
                type="file"
                id="id-proof-back"
                className="bg-gray-100 rounded-md p-2 "
                onChange={(event) =>
                  handleIdProofUpload(event, 'back-card')
                }
              />
            </div>
          </div>
          <div className="flex space-x-4">
            <div className="flex flex-col items-center justify-center py-5 border-dashed border-2 border-sky-500 w-full">
              <img
                src={documents}
                className="w-11 my-2"
              ></img>
              <label htmlFor="id-proof-front">
                Driving License (Front)
              </label>
              <input
                type="file"
                id="id-proof-front"
                className="bg-gray-100 rounded-md p-2 "
                onChange={(event) =>
                  handleIdProofUpload(event, 'front-card')
                }
              />
            </div>
            <div className="flex flex-col items-center justify-center py-5 border-dashed border-2 border-sky-500 w-full">
              <img
                src={documents}
                className="w-11 my-2"
              ></img>
              <label htmlFor="id-proof-back">
                Driving License (back)
              </label>
              <input
                type="file"
                id="id-proof-front"
                className="bg-gray-100 rounded-md p-2 "
                onChange={(event) =>
                  handleIdProofUpload(event, 'back-card')
                }
              />
            </div>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </div>
      )}
      {step === 2 && (
        <div className="flex flex-col space-y-4">
          <h2 className="text-xl font-bold">
            Upload Vehicle Documents
          </h2>
          <p className="text-gray-600">
            Please upload you Vehicle details
          </p>
          <label className="flex items-center space-x-2">
            <span className="text-gray-600">
              Vehicle Number:
            </span>
            <input
              type="text"
              name="vehicleNumber"
              className="bg-gray-100 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              onChange={handleVehicleDetailsChange}
            />
          </label>
          <div className="flex flex-col space-y-2">
            <label className="flex items-center space-x-2">
              <span className="text-gray-600">
                Vehicle RC Book:
              </span>
              <input
                type="file"
                name="rcBook"
                className="bg-gray-100 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                onChange={handleVehicleDocumentUpload}
              />
            </label>
            <label className="flex items-center space-x-2">
              <span className="text-gray-600">
                Vehicle Photo:
              </span>
              <input
                type="file"
                name="vehiclePhoto"
                className="bg-gray-100 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                onChange={handleVehicleDocumentUpload}
              />
            </label>
            <label className="flex items-center space-x-2">
              <span className="text-gray-600">
                Driving License (Front):
              </span>
              <input
                type="file"
                name="drivingLicenseFront"
                className="bg-gray-100 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                onChange={handleVehicleDocumentUpload}
              />
            </label>
            <label className="flex items-center space-x-2">
              <span className="text-gray-600">
                Driving License (Back):
              </span>
              <input
                type="file"
                name="drivingLicenseBack"
                className="bg-gray-100 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                onChange={handleVehicleDocumentUpload}
              />
            </label>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
              onClick={handleNext}
            >
              Submit
            </button>
          </div>
        </div>
      )}
      {step === 3 && (
        <div className="flex flex-col items-center justify-center h-screen">
          <h2 className="text-xl font-bold text-green-500">
            Success
          </h2>
          <p className="text-gray-600 text-center mt-4">
            Your Tag has been generated. Please go to the
            nearest toll gate or office to collect it
          </p>
        </div>
      )}
    </div>
  )
}
