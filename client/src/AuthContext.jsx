import React, {
  createContext,
  useContext,
  useState,
} from 'react'
import axios from 'axios'

const AuthContext = createContext()

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  const fetchUser = async () => {
    if (!user) {
      try {
        const response = await axios.get('/user', {
          withCredentials: true,
        })
        setUser(response.data.user)
      } catch (error) {
        console.error('Error fetching user:', error)
      }
    }
  }

  const login = async (email, password) => {
    try {
      const response = await axios.post('/login', {
        email: email,
        password: password,
      })
      setUser(response.data.user)
      return [true, null]
    } catch (error) {
      return [
        false,
        error.response.data?.error ?? error.response.data,
      ]
    }
  }

  const logout = async () => {
    try {
      await axios.post('/logout')
      setUser(null)
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  const value = {
    user,
    login,
    logout,
    fetchUser,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
