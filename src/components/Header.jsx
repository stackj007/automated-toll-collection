import { useNavigate } from 'react-router-dom'
import styles from './Header.module.css'
import Logo from '../assets/Logo/logo.png'

function Header() {
  const navigate = useNavigate()

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
            <a className="block" href="#">
              <span className="sr-only">Toll Express</span>
              <img
                alt="Toll Express logo"
                className="h-6 w-auto object-contain"
                src={Logo}
              />
            </a>
          </div>
          <div className="hidden md:flex space-x-8">
            <a
              className="text-base font-medium text-gray-500 hover:text-gray-900"
              href="#"
              onClick={handleHomeClick}
            >
              Home
            </a>
            <a
              className="text-base font-medium text-gray-500 hover:text-gray-900"
              href="#"
            >
              Account
            </a>
            <a
              className="text-base font-medium text-gray-500 hover:text-gray-900"
              href="#"
            >
              Tolls
            </a>
            <a
              className="text-base font-medium text-gray-500 hover:text-gray-900"
              href="#"
            >
              Contact Us
            </a>
          </div>
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            <a
              className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
              href="#"
              onClick={handleLoginClick}
            >
              Login
            </a>
            <a
              className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-orange-600 hover:bg-orange-700"
              href="#"
            >
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header
