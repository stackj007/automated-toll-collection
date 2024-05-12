import { useNavigate } from 'react-router-dom'
import VehicleDocument from './VehicleDocument.jsx'
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from '../../ui/card'
import { Button } from '../../ui/button'
import { useAuth } from '../../../AuthContext.jsx'
import { ClockIcon, FileIcon } from '@radix-ui/react-icons'
import { FaCar, FaUsers } from 'react-icons/fa'

function PendingNoVehicle({ onRedirect }) {
  return (
    <div className="max-w-6xl mx-auto text-center">
      <Card>
        <CardHeader>
          <CardTitle>Vehicle Request</CardTitle>
        </CardHeader>
        <CardContent>
          <VehicleDocument
            message="Please complete your vehicle information in the Documents page."
            onRedirect={onRedirect}
          />
        </CardContent>
      </Card>
    </div>
  )
}

export function PendingWithVehicle({ user }) {
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
              <FaUsers className="h-6 w-6" />
              <div className="font-semibold">{user.name}</div>
            </div>
            <div className="flex items-center space-x-2">
              <FileIcon className="h-6 w-6" />
              <div className="font-semibold">
                Request ID: {user.userVehicleRequest.id}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <FaCar />
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

// TODO use a library

function PendingAccount({ onRedirect, vehicle }) {
  const { user } = useAuth()

  return vehicle ? (
    <PendingWithVehicle user={user} />
  ) : (
    <PendingNoVehicle onRedirect={onRedirect} />
  )
}

function AuthorizeAccount({ user, onRedirect, vehicle }) {
  const navigate = useNavigate()

  return (
    <div className="container mx-auto px-4 lg:px-8 xl:px-0">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {vehicle ? (
          <Card>
            <CardHeader>
              <CardTitle>Information</CardTitle>
              <CardDescription>
                Complete your account details and generate QR codes for toll payments.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div>
                {/*<p>Vehicle Name: </p>*/}
                {/*<p>Model: </p>*/}
                {/*<p>Driver License: </p>*/}
                {/* TODO: TO BE IMPLEMENTED*/}
                <p>Vehicle Number: {user.userVehicleRequest?.vehicleNumber} </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Notification</CardTitle>
            </CardHeader>
            <CardContent>
              <VehicleDocument
                onRedirect={onRedirect}
                message="Please complete your vehicle information in the Documents page."
              />
            </CardContent>
          </Card>
        )}
        <Card>
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
            <CardDescription>
              View detailed information about your transactions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Button
                size="sm"
                className="bg-black text-white"
                variant="default"
                onClick={() => {
                  console.log('Navigating to transaction history details')
                  navigate('/transaction-history-details')
                }}
              >
                View more details
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account Balance</CardTitle>
            <CardDescription>
              Manage your payment methods and make payments.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* TODO: fix/implement*/}
            <div className="flex items-center gap-4">
              <Button size="sm" className="bg-black text-white" variant="default">
                Add Payment Method
              </Button>
              <Button size="sm" className="bg-black text-white" variant="default">
                Make Payment
              </Button>
            </div>
            <div className="mt-4">
              <div className="text-sm font-medium">Current Balance:</div>
              <div className="text-lg font-semibold">{user.balance} EGP</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function Account() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const handleRedirectToDocuments = () => {
    navigate('/documents')
  }

  const userVehicleRequest = user?.userVehicleRequest

  const hasApprovedVehicle = userVehicleRequest?.status === 'approved'

  return hasApprovedVehicle ? (
    <AuthorizeAccount
      user={user}
      onRedirect={handleRedirectToDocuments}
      vehicle={userVehicleRequest}
    />
  ) : (
    <PendingAccount onRedirect={handleRedirectToDocuments} vehicle={userVehicleRequest} />
  )
}
