import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate, Routes, Route } from 'react-router-dom'
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { BsSearch } from 'react-icons/bs'
import { FaRegComment, FaCreditCard, FaUsers } from 'react-icons/fa'
import { FiMapPin, FiBox } from 'react-icons/fi'

import UsersContent from '../AdminDashboard/Content/UsersContent'
import TollStationsContent from '../AdminDashboard/Content/TollStationsContent'
import TransactionsContent from '../AdminDashboard/Content/TransactionsContent'
import UserRequests from './Content/UserRequests'

export default function AdminDashboard() {
  const navigate = useNavigate()
  const location = useLocation()

  const selectedSidebarItem = location.pathname.split('/').pop() || 'users'

  useEffect(() => {
    navigate(`/admin/${selectedSidebarItem}`)
  }, [navigate, selectedSidebarItem])

  const handleSidebarItemClick = (item) => {
    navigate(`/admin/${item}`)
  }

  return (
    <div className="grid h-screen min-h-screen gap-2 lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r lg:block">
        <div className="flex h-full flex-col gap-2">
          <div className="flex h-[60px] items-center border-b px-6">
            <span className="flex items-center gap-2 font-semibold">
              <FiBox className="h-6 w-6" />
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
                  {item === 'users' && <FaUsers className="h-4 w-4" />}
                  {item === 'userRequests' && <FaRegComment className="h-4 w-4" />}
                  {item === 'tollStations' && <FiMapPin className="h-4 w-4" />}
                  {item === 'transactions' && <FaCreditCard className="h-4 w-4" />}
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
          <Routes>
            <Route path="/users" element={<UsersContent />} />
            <Route path="/userRequests" element={<UserRequests />} />
            <Route path="/tollStations" element={<TollStationsContent />} />
            <Route path="/transactions" element={<TransactionsContent />} />
            <Route path="*" element={<UsersContent />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}
