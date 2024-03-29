import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDocumentsUploaded } from '../../../hooks/DocumentsUploadedContext'
import { useTransactions } from '../../../hooks/TransactionContext'
import BalanceDisplay from '../DashboardPage/BalanceDisplay'
import TransactionHistoryItem from '../DashboardPage/TransactionHistoryItem'
import QrCodeScanner from './QrCodeScanner'
import { VscAccount } from 'react-icons/vsc'
import { BsQrCodeScan } from 'react-icons/bs'

export function DashboardPage() {
  const navigate = useNavigate()
  const [isScanning, setIsScanning] = useState(false)
  const [qrCodeData, setQrCodeData] = useState(null)

  const { transactions } = useTransactions()

  const { documentsUploaded } = useDocumentsUploaded()

  const handleClick = () => {
    navigate('/account')
  }

  const handleQrCodeClick = () => {
    if (documentsUploaded) {
      setIsScanning(true)
    } else {
      navigate('/profile-completion')
    }
  }

  return (
    <div className="max-w-sm mx-auto sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
      <div className="text-center">
        <h1 className="text-xl font-semibold sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
          Hey,
        </h1>
        <h2 className="text-xl font-semibold sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
          Welcome back!
        </h2>
        {/* <MoreIcon className="text-gray-500" /> */}
      </div>
      <BalanceDisplay
        balance="223"
        vehicleNumber="DL 06 DD 2561"
      />

      <div className="mt-6 grid grid-cols-3 gap-4 text-center">
        <div
          className="flex flex-col items-center"
          onClick={handleClick}
        >
          <VscAccount className="text-4xl cursor-pointer" />
          <button className="text-xs mt-2">Account</button>
        </div>

        <div
          className="flex flex-col items-center cursor-pointer"
          onClick={handleQrCodeClick}
        >
          <BsQrCodeScan className="text-4xl" />
          <button className="text-xs mt-2">QR Code</button>
        </div>

        {isScanning && (
          <QrCodeScanner
            key={qrCodeData}
            onScan={(data) => setQrCodeData(data)}
          />
        )}
        {qrCodeData && <p> QR code Scanned {qrCodeData}</p>}

        <div className="flex flex-col items-center">
          <VscAccount className="text-4xl " />
          <button className="text-xs mt-2">Vehicle</button>
        </div>
      </div>
      <div className="mt-6 mb-6">
        <h3 className="text-lg text-center font-semibold fle ">
          Transaction history
        </h3>

        <div>
          {transactions.map((transaction, index) => (
            <TransactionHistoryItem
              key={index}
              location={transaction.location}
              date={transaction.date}
              amount={transaction.amount}
            />
          ))}
        </div>
        <button
          className="text-xs mt-4 mx-auto flex justify-center"
          onClick={() => {
            navigate('/transaction-history-details')
          }}
        >
          View More
        </button>
      </div>
    </div>
  )
}
