import React from 'react'
const TransactionContext = React.createContext()

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = React.useState([
    {
      location: 'Delhi outer ring road',
      date: '22 May 2021 | 10:30 AM',
      amount: '40.00',
    },
    {
      location: 'Alex outer ring road',
      date: '22 May 2021 | 10:30 AM',
      amount: '20.00',
    },
    {
      location: 'Giza outer ring road',
      date: '22 May 2021 | 10:30 AM',
      amount: '300.00',
    },
  ])

  return (
    <TransactionContext.Provider
      value={{ transactions, setTransactions }}
    >
      {children}
    </TransactionContext.Provider>
  )
}

export const useTransactions = () =>
  React.useContext(TransactionContext)
