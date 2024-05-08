import axios from 'axios'
import React, { useEffect, useState } from 'react'
const TransactionContext = React.createContext()
// TODO: don't use providers here, serves no purpose

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = React.useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('api/transactions')
        setTransactions(response.data)
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching transactions:', error)
        setError(error)
        setIsLoading(false)
      }
    }
    fetchTransactions()
  }, [])

  return (
    <TransactionContext.Provider value={{ transactions, isLoading, error }}>
      {children}
    </TransactionContext.Provider>
  )
}

export const useTransactions = () => React.useContext(TransactionContext)
