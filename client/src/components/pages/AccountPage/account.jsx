import { useNavigate } from 'react-router-dom'
import VehicleDocument from './VehicleDocument.jsx'
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from '../../ui/card'
import { Button } from '../../ui/button'
import {useAuth} from "../../../AuthContext.jsx";


function PendingAccount () {
  const navigate = useNavigate()

  const handleRedirectToDocuments = () => {
    navigate('/documents')
  }

  return (<div className="max-w-6xl mx-auto text-center">
    <Card>
      <CardHeader>
        <CardTitle>Vehicle Request</CardTitle>
      </CardHeader>
      <CardContent>
        <VehicleDocument
          message="Please complete your vehicle information in the Documents page."
          onRedirect={handleRedirectToDocuments}
        />
      </CardContent>
    </Card>
  </div>
  )
}

function AuthorizeAccount() {
  const navigate = useNavigate()


  return (
    <div className="container mx-auto px-4 lg:px-8 xl:px-0">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {vehicle ? (
          <Card>
            <CardHeader>
              <CardTitle>Information</CardTitle>
              <CardDescription>
                Complete your account details and generate
                QR codes for toll payments.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div>
                <p>Vehicle Name: </p>
                <p>Model: </p>
                <p>Driver License: </p>
                <p>Vehicle Plate: </p>
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
                onRedirect={handleRedirectToDocuments}
                message="Please complete your vehicle information in the Documents page."
              />
            </CardContent>
          </Card>
        )}
        <Card>
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
            <CardDescription>
              View detailed information about your
              transactions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Button
                size="sm"
                className="bg-black text-white"
                variant="default"
                onClick={() => {
                  console.log(
                    'Navigating to transaction history details'
                  )
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
            <div className="flex items-center gap-4">
              <Button
                size="sm"
                className="bg-black text-white"
                variant="default"
              >
                Add Payment Method
              </Button>
              <Button
                size="sm"
                className="bg-black text-white"
                variant="default"
              >
                Make Payment
              </Button>
            </div>
            <div className="mt-4">
              <div className="text-sm font-medium">
                Current Balance:
              </div>
              <div className="text-lg font-semibold">
                $500.00
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Support</CardTitle>
            <CardDescription>
              Access help articles and contact support.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Button
                size="sm"
                className="bg-black text-white"
                variant="default"
              >
                Contact Support
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function Account() {
  const {user} = useAuth()

  const hasVehicle = user.userVehicleRequest

  return hasVehicle ? <AuthorizeAccount /> : <PendingAccount />

}
