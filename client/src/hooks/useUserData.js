import { useState, useEffect } from 'react'
import axios from 'axios'

// TODO: integrate it correctly or remove
export const useUserData = () => {
  const [userData, setUserData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/user')
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
