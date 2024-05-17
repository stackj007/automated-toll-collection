import axios from 'axios'
import { useState, useEffect } from 'react'

const useTransactions = ({limit}) => {
  const [transactions, setTransactions] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('api/transactions/user')

        if (limit) {
          setTransactions(response.data.slice(0, limit))
        } else {
          setTransactions(response.data)
        }

        setIsLoading(false)
      } catch (err) {
        setError(err)
        setIsLoading(false)
      }
    }
    fetchTransactions()
  }, [])

  return { transactions, isLoading, error }
}

export default useTransactions
