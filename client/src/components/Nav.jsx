import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../AuthContext'
import Logo from '../assets/Logo/logo.png'
import { HStack } from '@chakra-ui/react'

function Header() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="bg-white bg-opacity-75 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6 md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link className="block" to={user ? './dashboard' : '/'}>
              <span className="sr-only">Toll Express</span>
              <img
                alt="Toll Express logo"
                className="h-6 w-auto object-contain"
                src={Logo}
              />
            </Link>
          </div>
          <div className="hidden md:flex space-x-8">
            {user ? (
              <HStack>
                <>
                  <Link
                    className="text-base font-medium text-gray-500 hover:text-gray-900 mx-2"
                    to="/dashboard"
                  >
                    Home
                  </Link>
                  <Link
                    className="text-base font-medium text-gray-500 hover:text-gray-900 "
                    to="/account"
                  >
                    Account
                  </Link>
                  <button
                    className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-orange-600 hover:bg-orange-700"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </>
              </HStack>
            ) : (
              <>
                <Link
                  className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900 m-auto"
                  to="/login"
                >
                  Login
                </Link>
                <Link
                  className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-orange-600 hover:bg-orange-700"
                  to="/signup"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header
