import TransactionHistoryItem from '../DashboardPage/TransactionHistoryItem'
import { useTransactions } from '../../../hooks/TransactionContext'

const TransactionHistoryDetails = () => {
  const { transactions } = useTransactions()

  return (
    // TransactionHistoryDetails.jsx
    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
      <h2 className="col-span-1 md:col-span-2 lg:col-span-1 flex justify-center font-bold text-2xl mb-2">
        Transaction History
      </h2>
      {transactions.map((transaction, index) => (
        <TransactionHistoryItem
          key={index}
          location={transaction.location}
          date={transaction.date}
          amount={transaction.amount}
        />
      ))}
    </div>
  )
}

export default TransactionHistoryDetails
