import {
  createContext,
  useState,
  useContext,
} from 'react'
import axios from "axios";

const AuthContext = createContext()

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState({})

  const login = async (email, password) => {
    try {
      const response = await axios.post('/login', {
        email: email,
        password: password
      })
      setUser(response.data.user)
      return [true, null]
    } catch (error) {
      return [false, error.response.data?.error ?? error.response.data]
    }
  }

  const logout = async () => {
    try {
      await axios.post('/logout')
      setUser(null)
      return [true, null]
    } catch (error) {
      return [false, error.response.data?.error ?? error.response.data]
    }
  }

  const register = async (email, password, confirmPassword, name) => {
    try {
      const response = await axios.post('/register', {
        email,
        password,
        confirmPassword,
        name
      })
      setUser(response.data.user)
      return [true, null]
    } catch (error) {
      return [false, error.response.data?.error ?? error.response.data]
    }
  }

  const fetchUser = async () => {
    try {
      const response = await axios.get('/user')
      setUser(response.data.user)
    } catch (error) {
      console.error('Error fetching user:', error)
      setUser(null)
    }
  }

  const value = {
    login,
    logout,
    register,
    fetchUser,
    user
  }

  return (
      <AuthContext.Provider value={value}>
        {children}
      </AuthContext.Provider>
  )
}
