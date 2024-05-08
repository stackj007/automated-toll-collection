export default function TransactionHistoryItem({ transaction }) {
  return (
    <div className="py-3 border-b border-gray-200 flex justify-between p-4">
      <div>
        <p className="text-sm font-medium">{transaction.type}</p>
        <p className="text-xs text-gray-500">{new Date(transaction.date).toDateString()}</p>
      </div>
      <p className="text-sm font-medium">£ {transaction.amount}</p>
    </div>
  )
}
