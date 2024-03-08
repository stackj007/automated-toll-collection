import { useNavigate } from 'react-router-dom'
import documents from '../../../assets/icons/documents.png'

export function DashboardPage() {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/documents')
  }
  return (
    // section container
    <div className="bg-[#1a1a2e] text-white max-w-3xl mx-auto border border-transparent rounded-md my-6">
      {/* Main Container */}
      <div className="  py-8 px-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">
            Hey, Welcome back!
          </h1>
        </div>

        <div className="mt-6 p-4 rounded-lg bg-[#16213e]">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm">Balance</p>
              <p className="text-3xl font-bold">₹ 430.00</p>
            </div>
            <div className="text-right">
              <p className="text-sm">DL 06 DD 2561</p>
              <button className="mt-1 bg-[#1a1a2e] ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white">
                Top Up
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center mt-4">
            <p className="text-sm">
              Last Toll Price ₹ 30.00
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-4">
          <div
            className="text-center"
            onClick={handleClick}
          >
            <img
              className="mx-auto w-16 h-16 "
              src={documents}
            />
            <p className="mt-2">complete info</p>
          </div>
          <div className="text-center">
            <img className="mx-auto" />
            <p className="mt-2">Estimate toll</p>
          </div>
          <div className="text-center">
            <img className="mx-auto" />
            <p className="mt-2">Vehicle</p>
          </div>
        </div>
      </div>
    </div>
  )
}
