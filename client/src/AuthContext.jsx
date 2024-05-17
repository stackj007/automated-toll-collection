/* eslint-disable react/prop-types */
import { createContext, useState, useContext, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext()

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({})

  const login = async (email, password) => {
    try {
      const response = await axios.post('/api/login', {
        email: email,
        password: password,
      })
      setUser(response.data.user)
      return [response.data.user, null]
    } catch (error) {
      setUser(null)
      return [null, error.response.data?.error ?? error.response.data]
    }
  }

  const logout = async () => {
    try {
      await axios.post('/api/logout')
      setUser(null)
      window.location.href = '/login'
      return [true, null]
    } catch (error) {
      return [false, error.response.data?.error ?? error.response.data]
    }
  }

  const register = async (email, password, confirmPassword, name) => {
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
      return [false, error.response.data?.error ?? error.response.data]
    }
  }

  const fetchUser = async () => {
    try {
      const response = await axios.get('/api/user')
      setUser(response.data.user)
    } catch (error) {
      setUser(null)
    }
  }

  const isVerified = (user) => {
    return user?.userVehicleRequest?.status === 'approved'
  }

  const value = {
    login,
    logout,
    register,
    fetchUser,
    user,
    setUser,
    isVerified,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
