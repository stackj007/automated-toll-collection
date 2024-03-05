import React, {
  createContext,
  useState,
  useContext,
} from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const login = (email, password) => {
    // Simulate a successful login with mock data
    if (
      email === 'user@example.com' &&
      password === 'password'
    ) {
      setIsLoggedIn(true)
      return true
    }
    return false
  }

  const logout = () => {
    setIsLoggedIn(false)
  }

  const value = {
    isLoggedIn,
    login,
    logout,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
