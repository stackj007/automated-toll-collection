import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from '../../../ui/card'
import { Label } from '../../../ui/label'
import { Input } from '../../../ui/input'
import { Button } from '../../../ui/button'

export default function Account() {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>
            Update your profile information below.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid gap-4 md:grid-cols-2">
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
          </div>
          <div className="flex items-center gap-4">
            <Label className="w-[200px]">
              Profile picture
            </Label>
            <img
              alt="Profile picture"
              className="rounded-full"
              height="64"
              src="/placeholder.svg"
              style={{
                aspectRatio: '64/64',
                objectFit: 'cover',
              }}
              width="64"
            />
            <Button size="icon" variant="outline">
              <CameraIcon className="h-4 w-4" />
              <span className="sr-only">Change image</span>
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card className="mt-3">
        <CardHeader>
          <CardTitle>Vehicles</CardTitle>
          <CardDescription>
            Manage your vehicle details and generate QR
            codes for toll payments.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="flex items-center gap-4">
            <Button size="sm">Add vehicle</Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-1">
              <Label htmlFor="vehicle-number">
                Vehicle number
              </Label>
              <Input
                id="vehicle-number"
                placeholder="Enter vehicle number"
              />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="make-model">
                Make & model
              </Label>
              <Input
                id="make-model"
                placeholder="Enter make & model"
              />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="year">Year</Label>
              <Input id="year" placeholder="Enter year" />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="qr-code">QR code</Label>
              <img
                alt="QR code"
                className="aspect-square rounded-md object-cover"
                height="100"
                src="/placeholder.svg"
                width="100"
              />
              <Button className="w-[100px]" size="sm">
                Regenerate QR code
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="mt-3">
        <CardHeader>
          <CardTitle>Transaction history</CardTitle>
          <CardDescription>
            View detailed information about your
            transactions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Button size="sm">View more details</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Account balance</CardTitle>
          <CardDescription>
            Manage your payment methods and make payments.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Button size="sm">Add payment method</Button>
            <Button size="sm">Make payment</Button>
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

      <Card className="mt-3">
        <CardHeader>
          <CardTitle>Security</CardTitle>
          <CardDescription>
            Manage your security settings.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Button size="sm">Change password</Button>
          </div>
        </CardContent>
      </Card>
      <Card className="mt-3">
        <CardHeader>
          <CardTitle>Support</CardTitle>
          <CardDescription>
            Access help articles and contact support.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Button size="sm">Contact support</Button>
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-center w-full">
        <Button className="w-full lg:w-auto bg-gray-900 text-gray-50 hover:bg-gray-900/80 focus:ring-gray-950 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/80 dark:focus:ring-gray-300">
          Save changes
        </Button>
      </div>
      <div className="flex justify-center w-full">
        <Button
          className="w-full lg:w-auto border-gray-200 text-white hover:text-gray-50 hover:bg-gray-100 focus:ring-gray-950 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:ring-gray-300"
          variant="outline"
        >
          Cancel
        </Button>
      </div>
    </>
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
