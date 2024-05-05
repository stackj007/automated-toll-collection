export default function TransactionHistoryItem({ location, date, amount }) {
  console.log('TransactionHistoryItem component rendered')
  console.log('Props:', { location, date, amount })
  return (
    <div className="py-3 border-b border-gray-200 flex justify-between p-4">
      <div>
        <p className="text-sm font-medium">{location}</p>
        <p className="text-xs text-gray-500">{date}</p>
      </div>
      <p className="text-sm font-medium">£ {amount}</p>
    </div>
  )
}
