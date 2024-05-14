export default function BalanceDisplay({
  balance,
  vehicleNumber,
  selectedVehicle,
  setSelectedVehicle,
  onOpenRechargeModal,
}) {
  const handleVehicleChange = (event) => {
    setSelectedVehicle(event.target.value)
  }

  return (
    <div className="mt-6 bg-[#1A3C40] text-white p-4 rounded-lg lg:p-6 lg:flex lg:justify-between lg:items-center lg:gap-6">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm">Balance</p>
          <p className="text-3xl font-bold">£ {balance}</p>
        </div>
        <div className="text-right lg:ml-6 lg:text-left lg:flex lg:items-center">
          <p className="text-sm">{vehicleNumber}</p>
          <select
            className="bg-[#2E5C63] py-1 px-2 text-xs rounded mt-2 lg:mt-0 lg:ml-4"
            value={selectedVehicle}
            onChange={handleVehicleChange}
            aria-label="Select Vehicle"
          >
            <option value="">Select Vehicle</option>
            <option value="vehicle1">Vehicle 1</option>
            <option value="vehicle2">Vehicle 2</option>
          </select>
        </div>
      </div>
      <div className="flex justify-between items-center mt-4 lg:mt-0 lg:flex lg:items-center lg:justify-end">
        <p className="text-sm lg:mr-4">Last Toll Price £ 30.00</p>
        <button
          className="bg-[#2E5C63] py-1 px-2 text-xs rounded"
          aria-label="Recharge"
          onClick={onOpenRechargeModal}
        >
          Recharge
        </button>
      </div>
    </div>
  )
}
