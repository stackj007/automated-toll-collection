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
import {ClockIcon, FileIcon} from "@radix-ui/react-icons";
import {UsersIcon} from "../../ui/icons/index.jsx";

function PendingNoVehicle({onRedirect}) {
  return <div className="max-w-6xl mx-auto text-center">
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
  </div>;
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

// TODO use a library
const CarIcon = () => {
  return (
    <svg
      fill="#000000"
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="20px"
      height="20px"
      viewBox="0 0 31.445 31.445"
      xmlSpace="preserve"
    >
      <g>
        <g>
          <path
            d="M7.592,16.86c-1.77,0-3.203,1.434-3.203,3.204s1.434,3.204,3.203,3.204c1.768,0,3.203-1.434,3.203-3.204
          S9.36,16.86,7.592,16.86z M7.592,21.032c-0.532,0-0.968-0.434-0.968-0.967s0.436-0.967,0.968-0.967
          c0.531,0,0.966,0.434,0.966,0.967S8.124,21.032,7.592,21.032z"
          />
          <path
            d="M30.915,17.439l-0.524-4.262c-0.103-0.818-0.818-1.418-1.643-1.373L27.6,11.868l-3.564-3.211
          c-0.344-0.309-0.787-0.479-1.249-0.479l-7.241-0.001c-1.625,0-3.201,0.555-4.468,1.573l-4.04,3.246l-5.433,1.358
          c-0.698,0.174-1.188,0.802-1.188,1.521v1.566C0.187,17.44,0,17.626,0,17.856v2.071c0,0.295,0.239,0.534,0.534,0.534h3.067
          c-0.013-0.133-0.04-0.26-0.04-0.396c0-2.227,1.804-4.029,4.03-4.029s4.029,1.802,4.029,4.029c0,0.137-0.028,0.264-0.041,0.396
          h8.493c-0.012-0.133-0.039-0.26-0.039-0.396c0-2.227,1.804-4.029,4.029-4.029c2.227,0,4.028,1.802,4.028,4.029
          c0,0.137-0.026,0.264-0.04,0.396h2.861c0.295,0,0.533-0.239,0.533-0.534v-1.953C31.449,17.68,31.21,17.439,30.915,17.439z
           M20.168,12.202l-10.102,0.511L12,11.158c1.051-0.845,2.357-1.305,3.706-1.305h4.462V12.202z M21.846,12.117V9.854h0.657
          c0.228,0,0.447,0.084,0.616,0.237l2.062,1.856L21.846,12.117z"
          />
          <path
            d="M24.064,16.86c-1.77,0-3.203,1.434-3.203,3.204s1.434,3.204,3.203,3.204c1.769,0,3.203-1.434,3.203-3.204
          S25.833,16.86,24.064,16.86z M24.064,21.032c-0.533,0-0.967-0.434-0.967-0.967s0.434-0.967,0.967-0.967
          c0.531,0,0.967,0.434,0.967,0.967S24.596,21.032,24.064,21.032z"
          />
        </g>
      </g>
    </svg>
  )
}

function PendingAccount ({onRedirect, vehicle}) {
  const {user} = useAuth()

  return ( vehicle ? <PendingWithVehicle user={user}/> : <PendingNoVehicle onRedirect={onRedirect}/>)
}

function AuthorizeAccount({user, onRedirect, vehicle}) {
  const navigate = useNavigate()

  return (
    <div className="container mx-auto px-4 lg:px-8 xl:px-0">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
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
            {/* TODO: fix/implement*/}
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
                {user.balance} EGP
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function Account() {
  const {user} = useAuth()
  const navigate = useNavigate()

  const handleRedirectToDocuments = () => {
    navigate('/documents')
  }

  const userVehicleRequest = user?.userVehicleRequest;

  const hasApprovedVehicle = userVehicleRequest?.status === 'approved'

  return hasApprovedVehicle
    ? <AuthorizeAccount user={user} onRedirect={handleRedirectToDocuments} vehicle={userVehicleRequest}/>
    : <PendingAccount onRedirect={handleRedirectToDocuments} vehicle={userVehicleRequest}/>
}
