import TransactionHistoryItem from '../DashboardPage/TransactionHistoryItem'
import useTransactions from '../../../hooks/UseTransactions.jsx'

const TransactionHistoryDetails = () => {
  const { transactions, isLoading, error } = useTransactions({limit: null})

  return (
    <div className="mt-4 flex flex-col items-center">
      <h2 className="font-bold text-2xl mb-2">Transaction History</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 w-full max-w-screen-lg mx-auto">
        {isLoading
          ? (<p>Loading...</p>)
          : error
            ? (<p>Error: {error.message}</p>)
            : (transactions.map((transaction, index) => (<TransactionHistoryItem key={index} transaction={transaction} />))
            )}
      </div>
    </div>
  )
}

export default TransactionHistoryDetails
