import { useNavigate } from 'react-router-dom'

import BalanceDisplay from '../DashboardPage/BalanceDisplay'
import TransactionHistoryItem from '../DashboardPage/TransactionHistoryItem'
import { VscAccount } from 'react-icons/vsc'

export function DashboardPage() {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/documents')
  }
  return (
    <div className="max-w-sm mx-auto">
      <div className="text-center">
        <h1 className="text-xl font-semibold">Hey,</h1>
        <h2 className="text-xl font-semibold">
          Welcome back!
        </h2>
        {/* <MoreIcon className="text-gray-500" /> */}
      </div>
      <BalanceDisplay
        balance="223"
        vehicleNumber="DL 06 DD 2561"
      />

      <div className="mt-6 grid grid-cols-3 gap-4 text-center">
        <div className="flex flex-col items-center">
          <VscAccount className="text-4xl " />
          <button
            className="text-xs mt-2"
            onClick={handleClick}
          >
            Account
          </button>
        </div>

        <div className="flex flex-col items-center">
          <VscAccount className="text-4xl " />
          <button className="text-xs mt-2">
            Estimate toll
          </button>
        </div>

        <div className="flex flex-col items-center">
          <VscAccount className="text-4xl " />
          <button className="text-xs mt-2">Vehicle</button>
        </div>
      </div>
      <div className="mt-6 mb-6">
        <h3 className="text-lg font-semibold">
          Transaction history
        </h3>

        <div className="mt-4">
          <TransactionHistoryItem
            location="Delhi outer ring road"
            date="22 May 2021 | 10:30 AM"
            amount="30.00"
          />
          <TransactionHistoryItem
            location="Delhi outer ring road"
            date="22 May 2021 | 10:30 AM"
            amount="40.00"
          />
          <TransactionHistoryItem
            location="Delhi outer ring road"
            date="22 May 2021 | 10:30 AM"
            amount="60.00"
          />
        </div>

        <button className="text-xs mt-4 mx-auto flex justify-center">
          View More
        </button>
      </div>
    </div>
  )
}
