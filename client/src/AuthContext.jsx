import React, {
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
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const login = (email, password) => {
    axios.post('/login', {
      email: email,
      password: password
    })
      .then((response) => {
        setIsLoggedIn(true)
        return true
      }).catch((error) => {
      console.log(error);
      return false
    });
  }

  const logout = () => {
    axios.post('/logout')
      .then((response) => {
        setIsLoggedIn(false)
        return true
      })
      .catch((error) => {
        console.log(error);
        return false
      });
  }

  const register = (email, password, confirmPassword) => {
    axios.post('/register', {
      email: email,
      password: password,
      confirmPassword: confirmPassword
    })
      .then((response) => {
        setIsLoggedIn(true)
        return true
      }).catch((error) => {
      console.log(error);
      return false
    });
  }

  const getIsLoggedIn = () => {
    axios.get('/user')
      .then((response) => {
        setIsLoggedIn(response.data.isLoggedIn)
        return true
      }).catch((error) => {
        return false
        console.log(error);
    });
  }

  const value = {
    isLoggedIn,
    login,
    logout,
    register,
    getIsLoggedIn
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
