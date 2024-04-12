import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDocumentsUploaded } from '../../../hooks/DocumentsUploadedContext'
import Notification from './Notification'
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from '../../ui/card'
import { Label } from '../../ui/label'
import { Input } from '../../ui/input'
import { Button } from '../../ui/button'

export default function Account() {
  const navigate = useNavigate()
  const { documentsUploaded, setDocumentsUploaded } =
    useDocumentsUploaded()

  const handleRedirectToDocuments = () => {
    setDocumentsUploaded(true)
    navigate('/documents')
  }

  const { vehicle } = true

  return (
    <div className="container mx-auto px-4 lg:px-8 xl:px-0">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>
              Update your profile information below.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid gap-1">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Enter your name"
              />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="Enter your email"
              />
            </div>
          </CardContent>
        </Card>

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
              <Notification
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
            <CardTitle>Security</CardTitle>
            <CardDescription>
              Manage your security settings.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Button
                size="sm"
                className="bg-black text-white"
                variant="default"
              >
                Change Password
              </Button>
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

      <div className="flex justify-center mt-4">
        <Button className="w-full md:w-auto bg-gray-900 text-gray-50 focus:ring-gray-950 ">
          Save Changes
        </Button>
      </div>
      <div className="flex justify-center mt-2">
        <Button
          className="w-full md:w-auto border-gray-200 text-white hover:text-gray-50 hover:bg-gray-100 focus:ring-gray-950  bg-gray-500 hover:bg-black"
          variant="outline"
        >
          Cancel
        </Button>
      </div>
    </div>
  )
}

function CameraIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
      <circle cx="12" cy="13" r="3" />
    </svg>
  )
}
