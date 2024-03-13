import { useState, useEffect } from 'react'
import axios from 'axios'

export const useUserData = () => {
  const [userData, setUserData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/user') // Replace with your actual API endpoint
        setUserData(response.data)
      } catch (err) {
        setError(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserData()
  }, [])

  return { userData, isLoading, error }
}
