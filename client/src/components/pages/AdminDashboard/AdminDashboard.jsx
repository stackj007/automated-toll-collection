import Recat, { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../../ui/Button'
import Input from '../../ui/Input'

import UsersContent from '../AdminDashboard/Content/UsersContent'
import TollStationsContent from '../AdminDashboard/Content/TollStationsContent'
import TransactionsContent from '../AdminDashboard/Content/TransactionsContent'
import AnalyticsContent from '../AdminDashboard/Content/AnalyticsContent'
import SettingsContent from '../AdminDashboard/Content/SettingsContent'

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from '../../ui/dropdown-menu'

import {
  SettingsIcon,
  UsersIcon,
  SearchIcon,
  Package2Icon,
  MapPinIcon,
  CreditCardIcon,
  BarChartIcon,
  BellIcon,
} from '../../ui/icons'

export default function AdminDashboard() {
  const [selectedSidebarItem, setSelectedSideItem] =
    useState('users')

  const handleSidebarItemClick = (item) => {
    setSelectedSideItem(item)
  }

  const renderContent = () => {
    switch (selectedSidebarItem) {
      case 'users':
        return <UsersContent />
      case 'toll-stations':
        return <TollStationsContent />
      case 'transactions':
        return <TransactionsContent />
      case 'analytics':
        return <AnalyticsContent />
      case 'settings':
        return <SettingsContent />
      default:
        return <UsersContent />
    }
  }
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
            {/*///////
                  Aside
             ///////// */}
            <div className="grid items-start gap-3 text-sm">
              <Link
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-white-900 dark:text-white-400 dark:hover:text-gray-50 ${
                  selectedSidebarItem === 'users'
                    ? 'bg-gray-100 dark:bg-gray-800 text-white'
                    : ''
                }`}
                onClick={() =>
                  handleSidebarItemClick('users')
                }
                href="#"
              >
                <UsersIcon className="h-4 w-4" />
                Users
              </Link>
              <Link
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-white-900 dark:text-white-400 dark:hover:text-gray-50 ${
                  selectedSidebarItem === 'toll-stations'
                    ? 'bg-gray-100 dark:bg-gray-800 text-white'
                    : ''
                }`}
                onClick={() =>
                  handleSidebarItemClick('toll-stations')
                }
                href="#"
              >
                <MapPinIcon className="h-4 w-4" />
                Toll Stations
              </Link>
              <Link
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-white-900 dark:text-white-400 dark:hover:text-gray-50 ${
                  selectedSidebarItem === 'transactions'
                    ? 'bg-gray-100 dark:bg-gray-800 text-white'
                    : ''
                }`}
                onClick={() =>
                  handleSidebarItemClick('transactions')
                }
                href="#"
              >
                <CreditCardIcon className="h-4 w-4" />
                Transactions
              </Link>
              <Link
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-white-900 dark:text-white-400 dark:hover:text-gray-50 ${
                  selectedSidebarItem === 'analytics'
                    ? 'bg-gray-100 dark:bg-gray-800 text-white'
                    : ''
                }`}
                onClick={() =>
                  handleSidebarItemClick('analytics')
                }
                href="#"
              >
                <BarChartIcon className="h-4 w-4" />
                Analytics
              </Link>
              <Link
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-white-900 dark:text-white-400 dark:hover:text-gray-50 ${
                  selectedSidebarItem === 'settings'
                    ? 'bg-gray-100 dark:bg-gray-800 text-white'
                    : ''
                }`}
                onClick={() =>
                  handleSidebarItemClick('settings')
                }
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
            <DropdownMenuTrigger>
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
          {renderContent()}
        </main>
      </div>
    </div>
  )
}
