import { Link } from 'react-router-dom'
import Button from '../../ui/Button'
import Input from '../../ui/Input'

import { DropdownMenu } from '../../ui/dropdown-menu/DropdownMenu.jsx'
import { DropdownMenuTrigger } from '../../ui/dropdown-menu/DropdownMenuTrigger.jsx'
import { DropdownMenuContent } from '../../ui/dropdown-menu/DropdownMenuContent.jsx'
import { DropdownMenuLabel } from '../../ui/dropdown-menu/DropdownMenuLabel.jsx'
import { DropdownMenuSeparator } from '../../ui/dropdown-menu/DropdownMenuSeparator.jsx'
import { DropdownMenuItem } from '../../ui/dropdown-menu/DropdownMenuItem.jsx'

import { Card } from '../../ui/card/Card.jsx'
import { CardHeader } from '../../ui/card/CardHeader.jsx'
import { CardTitle } from '../../ui/card/CardTitle.jsx'
import { CardContent } from '../../ui/card/CardContent.jsx'

import { Table } from '../../ui/table/Table.jsx'
import { TableHeader } from '../../ui/table/TableHeader.jsx'
import { TableRow } from '../../ui/table/TableRow.jsx'
import { TableHead } from '../../ui/table/TableHead.jsx'
import { TableCell } from '../../ui/table/TableCell.jsx'
import { TableBody } from '../../ui/table/TableBody.jsx'

export default function Component() {
  return (
    <div className="grid h-screen min-h-screen gap-2 lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
        <div className="flex h-full flex-col gap-2">
          <div className="flex h-[60px] items-center border-b px-6">
            <Link
              className="flex items-center gap-2 font-semibold"
              href="#"
            >
              <Package2Icon className="h-6 w-6" />
              <span className="">Express Inc</span>
            </Link>
            <Button
              className="ml-auto h-8 w-8"
              size="icon"
              variant="outline"
            >
              <BellIcon className="h-4 w-4" />
              <span className="sr-only">
                Toggle notifications
              </span>
            </Button>
          </div>
          <nav className="flex-1 overflow-auto px-4">
            <div className="grid items-start gap-3 text-sm">
              <Link
                className="flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900  transition-all hover:text-white-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
                href="#"
              >
                <UsersIcon className="h-4 w-4" />
                Users
              </Link>
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-white-500 transition-all hover:text-gray-900 dark:text-white-400 dark:hover:text-gray-50"
                href="#"
              >
                <MapPinIcon className="h-4 w-4" />
                Toll Stations
              </Link>
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-500 transition-all hover:text-white-900 dark:text-white-400 dark:hover:text-gray-50"
                href="#"
              >
                <CreditCardIcon className="h-4 w-4" />
                Transactions
              </Link>
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-500 transition-all hover:text-white-900 dark:text-white-400 dark:hover:text-gray-50"
                href="#"
              >
                <BarChartIcon className="h-4 w-4" />
                Analytics
              </Link>
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-500 transition-all hover:text-white-900 dark:text-white-400 dark:hover:text-gray-50"
                href="#"
              >
                <SettingsIcon className="h-4 w-4" />
                Settings
              </Link>
            </div>
          </nav>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
          <Link className="lg:hidden" href="#">
            <Package2Icon className="w-6 h-6" />
            <span className="sr-only">Home</span>
          </Link>
          <nav className="hidden gap-5 text-sm font-medium lg:flex lg:gap-3 lg:text-base">
            <Link className="font-bold" href="#">
              Users
            </Link>
            <Link
              className="text-white-500 dark:text-400"
              href="#"
            >
              Toll Stations
            </Link>
            <Link
              className="text-white-500 dark:text-400 "
              href="#"
            >
              Transactions
            </Link>
            <Link
              className="text-white-500 dark:text-400"
              href="#"
            >
              Analytics
            </Link>
            <Link
              className="text-white-500 dark:text-400"
              href="#"
            >
              Settings
            </Link>
          </nav>
          <div className="w-full ml-auto flex-1">
            <form>
              <div className="relative">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                <Input
                  className="w-full bg-white shadow-none appearance-none pl-8 md:w-2/3 lg:w-1/3 dark:bg-gray-950"
                  placeholder="Search"
                  type="search"
                />
              </div>
            </form>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="rounded-full border border-gray-200 w-8 h-8 dark:border-gray-800"
                size="icon"
                variant="ghost"
              >
                <img
                  alt="Avatar"
                  className="rounded-full"
                  height="32"
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: '32/32',
                    objectFit: 'cover',
                  }}
                  width="32"
                />
                <span className="sr-only">
                  Toggle user menu
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                My Account
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Users</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">
                        ID
                      </TableHead>
                      <TableHead>Username</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead className="text-right">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-semibold">
                        1
                      </TableCell>
                      <TableCell>john_doe</TableCell>
                      <TableCell>
                        john@example.com
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          size="icon"
                          variant="outline"
                        >
                          <FileEditIcon className="h-4 w-4" />
                          <span className="sr-only">
                            Edit
                          </span>
                        </Button>
                        <Button
                          size="icon"
                          variant="outline"
                        >
                          <TrashIcon className="h-4 w-4" />
                          <span className="sr-only">
                            Delete
                          </span>
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-semibold">
                        2
                      </TableCell>
                      <TableCell>jane_smith</TableCell>
                      <TableCell>
                        jane@example.com
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          size="icon"
                          variant="outline"
                        >
                          <FileEditIcon className="h-4 w-4" />
                          <span className="sr-only">
                            Edit
                          </span>
                        </Button>
                        <Button
                          size="icon"
                          variant="outline"
                        >
                          <TrashIcon className="h-4 w-4" />
                          <span className="sr-only">
                            Delete
                          </span>
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-semibold">
                        3
                      </TableCell>
                      <TableCell>alex_wong</TableCell>
                      <TableCell>
                        alex@example.com
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          size="icon"
                          variant="outline"
                        >
                          <FileEditIcon className="h-4 w-4" />
                          <span className="sr-only">
                            Edit
                          </span>
                        </Button>
                        <Button
                          size="icon"
                          variant="outline"
                        >
                          <TrashIcon className="h-4 w-4" />
                          <span className="sr-only">
                            Delete
                          </span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}

function BarChartIcon(props) {
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
      <line x1="12" x2="12" y1="20" y2="10" />
      <line x1="18" x2="18" y1="20" y2="4" />
      <line x1="6" x2="6" y1="20" y2="16" />
    </svg>
  )
}

function BellIcon(props) {
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
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  )
}

function CreditCardIcon(props) {
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
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  )
}

function FileEditIcon(props) {
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
      <path d="M4 13.5V4a2 2 0 0 1 2-2h8.5L20 7.5V20a2 2 0 0 1-2 2h-5.5" />
      <polyline points="14 2 14 8 20 8" />
      <path d="M10.42 12.61a2.1 2.1 0 1 1 2.97 2.97L7.95 21 4 22l.99-3.95 5.43-5.44Z" />
    </svg>
  )
}

function MapPinIcon(props) {
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
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function Package2Icon(props) {
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
      <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
      <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
      <path d="M12 3v6" />
    </svg>
  )
}

function SearchIcon(props) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}

function SettingsIcon(props) {
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
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

function TrashIcon(props) {
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
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  )
}

function UsersIcon(props) {
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
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}
