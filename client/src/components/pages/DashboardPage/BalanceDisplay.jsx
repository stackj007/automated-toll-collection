export default function BalanceDisplay({
  balance,
  onOpenRechargeModal,
  lastTollPrice,
}) {
  return (
    <div className="mt-6 bg-[#1A3C40] text-white p-4 rounded-lg lg:p-6 lg:flex lg:items-center lg:gap-6">
      <div className="flex lg:flex-row lg:w-full d-flex justify-between flex-row flex-wrap">
        <div className="flex justify-between items-center lg:flex-1">
          <div>
            <p className="text-sm">Balance</p>
            <p className="text-3xl font-bold">£ {balance}</p>
          </div>
        </div>
        <div className="flex justify-between items-center mt-4 lg:mt-0 lg:flex-1 lg:justify-end">
          <div className="text-sm lg:mr-4">
            <span className="mb-2 flex-1">Last Toll Price £ {lastTollPrice}</span>
            <button
              className="bg-[#2E5C63] py-1 px-2 text-xs rounded ml-2 block mt-3"
              aria-label="Recharge"
              onClick={onOpenRechargeModal}
            >
              Recharge
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
