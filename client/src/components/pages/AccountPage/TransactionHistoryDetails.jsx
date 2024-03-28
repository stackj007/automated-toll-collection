// TransactionHistoryDetails.jsx
import TransactionHistoryItem from '../DashboardPage/TransactionHistoryItem'
import { useTransactions } from '../../../hooks/TransactionContext'

const TransactionHistoryDetails = () => {
  const { transactions } = useTransactions()

  return (
    <div className="mt-4 flex flex-col items-center">
      <h2 className="font-bold text-2xl mb-2">
        Transaction History
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 w-full max-w-screen-lg mx-auto">
        {transactions.map((transaction, index) => (
          <TransactionHistoryItem
            key={index}
            location={transaction.location}
            date={transaction.date}
            amount={transaction.amount}
          />
        ))}
      </div>
    </div>
  )
}

export default TransactionHistoryDetails
