import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { BsSearch } from 'react-icons/bs'
import { FaRegComment } from 'react-icons/fa'
import { UsersIcon, Package2Icon, MapPinIcon, CreditCardIcon } from '../../ui/icons'

import UsersContent from '../AdminDashboard/Content/UsersContent'
import TollStationsContent from '../AdminDashboard/Content/TollStationsContent'
import TransactionsContent from '../AdminDashboard/Content/TransactionsContent'
import UserRequests from './Content/UserRequests'

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [selectedSidebarItem, setSelectedSidebarItem] = useState(() => {
    const lastVisitedPage = localStorage.getItem('lastVisitedPage')
    return lastVisitedPage || 'users'
  })

  useEffect(() => {
    const lastVisitedPage = localStorage.getItem('lastVisitedPage')
    if (lastVisitedPage && lastVisitedPage !== selectedSidebarItem) {
      setSelectedSidebarItem(lastVisitedPage)
      navigate(`/admin/${lastVisitedPage}`)
    }
  }, [navigate, selectedSidebarItem])

  const handleSidebarItemClick = (item) => {
    setSelectedSidebarItem(item)
    navigate(`/admin/${item}`)
  }

  const renderContent = () => {
    switch (selectedSidebarItem) {
      case 'users':
        return <UsersContent />
      case 'tollStations':
        return <TollStationsContent />
      case 'transactions':
        return <TransactionsContent />
      case 'userRequests':
        return <UserRequests />
      default:
        return <UsersContent />
    }
  }

  return (
    <div className="grid h-screen min-h-screen gap-2 lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r lg:block">
        <div className="flex h-full flex-col gap-2">
          <div className="flex h-[60px] items-center border-b px-6">
            <span className="flex items-center gap-2 font-semibold">
              <Package2Icon className="h-6 w-6" />
              <span className="">Express Inc</span>
            </span>
          </div>
          <nav className="flex-1 overflow-auto px-4">
            <div className="grid items-start gap-3 text-sm">
              {['users', 'userRequests', 'tollStations', 'transactions'].map((item) => (
                <Link
                  key={item}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                    selectedSidebarItem === item
                      ? 'bg-gray-100 dark:bg-gray-800 text-white'
                      : ''
                  }`}
                  onClick={() => handleSidebarItemClick(item)}
                  to={`/admin/${item}`}
                >
                  {item === 'users' && <UsersIcon className="h-4 w-4" />}
                  {item === 'userRequests' && <FaRegComment className="h-4 w-4" />}
                  {item === 'tollStations' && <MapPinIcon className="h-4 w-4" />}
                  {item === 'transactions' && <CreditCardIcon className="h-4 w-4" />}
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="w-full px-5">
          <InputGroup className="relative w-full max-w-2xl ">
            <InputLeftElement className="flex items-center h-full mx-2">
              <BsSearch className="h-5 w-5 text-gray-400 mx-auto" />
            </InputLeftElement>

            <Input
              type="search"
              placeholder="Search Games"
              className="w-full bg-white shadow-none pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent p-2"
            />
          </InputGroup>
        </div>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  )
}
