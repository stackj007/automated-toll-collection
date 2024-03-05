import { Link, useNavigate } from 'react-router-dom'
import Logo from '../assets/Logo/logo.png'
import { useAuth } from '../AuthContext'

function Header() {
  const navigate = useNavigate()
  const { isLoggedIn, logout } = useAuth()

  const handleLoginClick = () => {
    navigate('/login')
  }

  const handleHomeClick = () => {
    navigate('/')
  }

  return (
    <nav className="bg-white bg-opacity-75 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6 md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link className="block" to="/">
              <span className="sr-only">Toll Express</span>
              <img
                alt="Toll Express logo"
                className="h-6 w-auto object-contain"
                src={Logo}
                onClick={handleHomeClick}
              />
            </Link>
          </div>
          <div className="hidden md:flex space-x-8">
            <Link
              className="text-base font-medium text-gray-500 hover:text-gray-900"
              to="/"
              onClick={handleHomeClick}
            >
              Home
            </Link>
            <Link
              className="text-base font-medium text-gray-500 hover:text-gray-900"
              to="/account"
            >
              Account
            </Link>
            <Link
              className="text-base font-medium text-gray-500 hover:text-gray-900"
              to="/tolls"
            >
              Tolls
            </Link>
            <Link
              className="text-base font-medium text-gray-500 hover:text-gray-900"
              to="/contact-us"
            >
              Contact Us
            </Link>
          </div>
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            {isLoggedIn ? (
              <>
                <span className="text-base font-medium text-gray-500">
                  Welcome!
                </span>
                <button
                  className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-orange-600 hover:bg-orange-700"
                  onClick={logout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
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
