/* eslint-disable react/prop-types */
import {
  createContext,
  useState,
  useContext,
  useEffect,
} from 'react'
import axios from 'axios'
import { json } from 'react-router-dom'

const AuthContext = createContext()

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('/api/user')
        setUser(response.data.user)
      } catch (error) {
        console.error('Error fetching user:', error)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  const login = async (email, password) => {
    try {
      const response = await axios.post('/api/login', {
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
      await axios.post('/api/logout')
      setUser(null)
      window.location.href = '/login'
      return [true, null]
    } catch (error) {
      return [
        false,
        error.response.data?.error ?? error.response.data,
      ]
    }
  }

  const register = async (
    email,
    password,
    confirmPassword,
    name
  ) => {
    try {
      const response = await axios.post('/api/register', {
        email,
        password,
        confirmPassword,
        name,
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

  const fetchUser = async () => {
    try {
      const response = await axios.get('/api/user')
      setUser(response.data.user)
    } catch (error) {
      console.error('Error fetching user:', error)
      setUser(null)
    }
  }

  const value = {
    loading,
    login,
    logout,
    register,
    fetchUser,
    user,
    setUser,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
