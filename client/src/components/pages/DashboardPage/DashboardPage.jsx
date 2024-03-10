import { useNavigate } from 'react-router-dom'
import documents from '../../../assets/icons/documents.png'

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
      <div className="mt-6 bg-[#1A3C40] text-white p-4 rounded-lg">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm">Balance</p>
            <p className="text-3xl font-bold">£ 430.00</p>
          </div>
          <div className="text-right">
            <p className="text-sm">DL 06 DD 2561</p>
            <button className="bg-[#2E5C63] py-1 px-2 text-xs rounded">
              Select Vehicle
            </button>
          </div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <p className="text-sm">Last Toll Price £ 30.00</p>
          <button className="bg-[#2E5C63] py-1 px-2 text-xs rounded">
            Recharge
          </button>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-3 gap-4 text-center">
        <div>
          {/* <FlagIcon className="mx-auto" /> */}
          <button
            className="text-xs mt-2"
            onClick={handleClick}
          >
            Account
          </button>
        </div>
        <div>
          <button className="text-xs mt-2">
            Estimate toll
          </button>
        </div>
        <div>
          <button className="text-xs mt-2">Vehicle</button>
        </div>
      </div>
      <div className="mt-6 mb-6">
        <h3 className="text-lg font-semibold">
          Transaction history
        </h3>
        <div className="mt-4">
          <div className="py-3 border-b border-gray-200 flex justify-between">
            <div>
              <p className="text-sm font-medium">
                Delhi outer ring road
              </p>
              <p className="text-xs text-gray-500">
                22 May 2021 | 10:30 AM
              </p>
            </div>
            <p className="text-sm font-medium">£ 30.00</p>
          </div>
          <div className="py-3 border-b border-gray-200 flex justify-between">
            <div>
              <p className="text-sm font-medium">
                Delhi outer ring road
              </p>
              <p className="text-xs text-gray-500">
                22 May 2021 | 10:30 AM
              </p>
            </div>
            <p className="text-sm font-medium">£ 30.00</p>
          </div>
          <div className="py-3 border-b border-gray-200 flex justify-between">
            <div>
              <p className="text-sm font-medium">
                Delhi outer ring road
              </p>
              <p className="text-xs text-gray-500">
                22 May 2021 | 10:30 AM
              </p>
            </div>
            <p className="text-sm font-medium">£ 30.00</p>
          </div>
        </div>
        <button className="text-xs mt-4 mx-auto flex justify-center">
          View More
        </button>
      </div>
    </div>
  )
}
