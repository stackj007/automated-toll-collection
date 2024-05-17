import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from '../../ui/card'
import { Input } from '../../ui/input'
import { Button } from '../../ui/button'
import { Label } from '../../ui/label.jsx'
import { ButtonSpinner } from '@chakra-ui/react'

import axios from 'axios'
import { useEffect } from 'react'
import { useAuth } from '../../../AuthContext.jsx'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

function RequestForm({ onSubmit, isLoading, successMessage, errorMessage }) {
  const [filePreviews, setFilePreviews] = useState({
    id: '',
    license: '',
    rcBook: '',
  })

  const handleFileChange = (e) => {
    const { name, files } = e.target
    if (files && files[0]) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setFilePreviews((prev) => ({
          ...prev,
          [name]: event.target.result,
        }))
      }
      reader.readAsDataURL(files[0])
    }
  }

  const vehicleTypes = ['car', 'motorcycle', 'bus', 'truck', 'van', 'suv', 'trailer', 'bicycle', 'electric'];
  return (
    <div className="max-w-6xl m-auto my-10">
      <form className="space-y-4" id="requestForm" onSubmit={onSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Submit request</CardTitle>
            <CardDescription>Enter the details and submit your request.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="id">ID card</Label>

              <Input
                name="id"
                accept=".jpg, .jpeg, .png"
                id="id"
                type="file"
                required
                onChange={handleFileChange}
              />
              {filePreviews.id && (
                <img src={filePreviews.id} alt="id Preview" className="mt-2 h-24 w-24" />
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="vehicleNumber">Vehicle number</Label>
              <Input
                name="vehicleNumber"
                id="vehicle-number"
                placeholder="Enter vehicle number"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="vehicle-name">Vehicle name</label>
              <Input
                name="vehicleName"
                id="vehicle-name"
                placeholder="Enter vehicle name"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="vehicleType">Vehicle Type</label>
              <select
                name="vehicleType"
                id="vehicle-type"
                required
                className="bg-white border border-gray-300 rounded-md p-2 w-full"
              >
                <option value="">Select vehicle type</option>
                {vehicleTypes.map((type) => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
            <Label htmlFor="license">Vehicle license</Label>
              <Input
                name="license"
                accept=".jpg, .jpeg, .png"
                id="license"
                type="file"
                required
                onChange={handleFileChange}
              />
              {filePreviews.license && (
                <img
                  src={filePreviews.license}
                  alt="License Preview"
                  className="mt-2 h-24 w-24"
                />
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="rcBook">RC book</Label>
              <Input
                name="rcBook"
                accept=".jpg, .jpeg, .png"
                id="rc"
                type="file"
                required
                onChange={handleFileChange}
              />
              {filePreviews.rcBook && (
                <img
                  src={filePreviews.rcBook}
                  alt="RC Book Preview"
                  className="mt-2 h-24 w-24"
                />
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="ml-auto" disabled={isLoading}>
              {isLoading ? <ButtonSpinner /> : 'Submit'}
            </Button>
          </CardFooter>
        </Card>
        {successMessage && (
          <p className="text-green-500 flex items-center justify-center">
            {successMessage}
          </p>
        )}
        {errorMessage && (
          <p className="text-red-500 flex items-center justify-center">{errorMessage}</p>
        )}
      </form>
    </div>
  )
}

export function Documents() {
  const { user, setUser } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const navigate = useNavigate()
  useEffect(() => {
    // Check if user is not logged in or is an admin
    if (!user || user?.isAdmin) {
      throw new Error('User is not authorized to view this page')
    }

    if (user.userVehicleRequest?.status === 'approved') {
      navigate('/dashboard')
    }
  }, [user, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setSuccessMessage('')
    setErrorMessage('')
    try {
      const response = await axios.post('/api/user-request', new FormData(e.target))
      const request = response.data.request
      setUser((user) => {
        user.userVehicleRequest = request
        return user
      })
      setSuccessMessage('Request Submitted successfully!')
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.code === 'ER_DUP_ENTRY'
      ) {
        setErrorMessage(
          'A request with this vehicle number already exists. Please check your existing requests.'
        )
      } else {
        setErrorMessage('Error submitting documents Please try again')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <RequestForm
      onSubmit={handleSubmit}
      isLoading={isLoading}
      successMessage={successMessage}
      errorMessage={errorMessage}
    />
  )
}
