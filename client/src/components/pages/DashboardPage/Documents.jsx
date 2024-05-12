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
import { useNavigate } from 'react-router-dom'

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

export function Documents() {
  const { user, setUser } = useAuth()

  const navigate = useNavigate()
  useEffect(() => {
    // Check if user is not logged in or is an admin
    if (!user || user?.isAdmin) {
      throw new Error('User is not authorized to view this page')
    }

    // Check if user is approved and redirect
    if (user.userVehicleRequest?.status === 'approved') {
      navigate('/dashboard')
    }
  }, [user, navigate]) // Re-run the effect if the user object changes

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('/api/user-request', new FormData(e.target))
      const request = response.data.request
      setUser((user) => {
        user.userVehicleRequest = request
        return user
      })
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.code === 'ER_DUP_ENTRY'
      ) {
        alert(
          'A request with this vehicle number already exists. Please check your existing requests.'
        )
      } else {
        console.error('Error submitting documents:', error)
      }
    }
  }

  return <RequestForm onSubmit={handleSubmit} />
}
