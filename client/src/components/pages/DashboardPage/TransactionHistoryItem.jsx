export default function TransactionHistoryItem({ transaction }) {
  console.log('TransactionHistoryItem component rendered')
  console.log('Transaction:', transaction)

  return (
    <div className="py-3 border-b border-gray-200 flex justify-between p-4">
      <div>
        <p className="text-sm font-medium">{transaction.location}</p>
        <p className="text-xs text-gray-500">{transaction.date}</p>
      </div>
      <p className="text-sm font-medium">£ {transaction.amount}</p>
    </div>
  )
}
