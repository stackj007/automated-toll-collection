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
import axios from 'axios'
import { useEffect } from 'react'
import { useAuth } from '../../../AuthContext.jsx'
import { ClockIcon, FileIcon } from '@radix-ui/react-icons'
import { UsersIcon } from '../../ui/icons/index.jsx'
import PropTypes from 'prop-types'

PendingRequest.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    userVehicleRequest: PropTypes.shape({
      id: PropTypes.string,
      vehicleNumber: PropTypes.string,
      status: PropTypes.string,
    }),
  }),
}

function RequestForm({ onSubmit }) {
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
              <Input name="id" accept=".jpg, .jpeg, .png" id="id" type="file" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vehicleNumber">Vehicle number</Label>
              <Input
                name="vehicleNumber"
                id="vehicle-license"
                placeholder="Enter vehicle number"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="license">Vehicle license</Label>
              <Input
                name="license"
                accept=".jpg, .jpeg, .png"
                id="license"
                type="file"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rcBook">RC book</Label>
              <Input
                name="rcBook"
                accept=".jpg, .jpeg, .png"
                id="rc"
                type="file"
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="ml-auto">
              Submit
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}

RequestForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

export default function PendingRequest({ user }) {
  return (
    <div className="flex flex-col items-center space-y-4 m-auto justify-center">
      <div className="flex items-center space-x-4">
        <ClockIcon className="h-6 w-6 text-gray-500" />
        <div className="grid gap-1">
          <div>Your request is pending</div>
          <div className="font-medium">
            We are processing your request. This may take a few hours.
          </div>
        </div>
      </div>
      <Card className="w-full max-w-sm">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <UsersIcon className="h-6 w-6" />
              <div className="font-semibold">{user.name}</div>
            </div>
            <div className="flex items-center space-x-2">
              <FileIcon className="h-6 w-6" />
              <div className="font-semibold">
                Request ID: {user.userVehicleRequest.id}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <CarIcon />
              <div className="font-semibold">
                Vehicle Number: {user.userVehicleRequest.vehicleNumber}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="font-semibold">
                Status: {user.userVehicleRequest.status}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export function Documents() {
  const { user, setUser } = useAuth()

  useEffect(() => {
    if (!user || user?.isAdmin) {
      throw new Error('User is not authorized to view this page')
    }
  }, [user])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post('/api/user-request', new FormData(e.target))
      const request = response.data.request
      setUser((user) => {
        user.userVehicleRequest = request

        return user
      })
      window.location.reload()
    } catch (error) {
      console.error('Error submitting documents:', error)
    }
  }

  return user?.userVehicleRequest ? (
    <PendingRequest user={user} />
  ) : (
    <RequestForm onSubmit={handleSubmit} />
  )
}
