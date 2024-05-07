import axios from 'axios'
import { useState, useEffect } from 'react'

const useLastFourTransactions = () => {
  const [transactions, setTransactions] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('api/transactions/user')

        setTransactions(response.data.slice(0, 4))
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

export default useLastFourTransactions
