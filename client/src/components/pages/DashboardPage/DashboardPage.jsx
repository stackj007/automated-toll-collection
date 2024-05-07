import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import { useDocumentsUploaded } from '../../../hooks/DocumentsUploadedContext'
import TransactionHistoryItem from '../DashboardPage/TransactionHistoryItem'
import BalanceDisplay from '../DashboardPage/BalanceDisplay'
import RechargeModal from '../../modals/RechargeModal'
import useLastFourTransactions from '../../../hooks/useLastFourTransactions'

import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button'

import { VscAccount } from 'react-icons/vsc'
import { FaCreditCard } from 'react-icons/fa'
import axios from 'axios'
import { useAuth } from '../../../AuthContext.jsx'

export function DashboardPage() {
  const navigate = useNavigate()

  const { isVerified, user } = useAuth()

  if (!isVerified) {
    navigate('/account')
  }

  const [isRechargeModalOpen, setIsRechargeModalOpen] = useState(false)
  const [message, setMessage] = useState('')

  const handleOpenRechargeModal = () => {
    setIsRechargeModalOpen(true)
  }

  const handleCloseRechargeModal = () => {
    console.log('Attempting to close the dialog...')
    setIsRechargeModalOpen(false)
  }

  const handleRecharge = async (amount) => {
    if (isNaN(amount) || amount <= 0) {
      setMessage('Please enter a valid amount greater than 0.')
      return
    }

    try {
      const response = await axios.post('/api/recharge', {
        amount: amount,
      })

      window.location = response.data.url
    } catch (error) {
      setMessage('Recharge failed. Please try again.')
    }
  }

  const [openDialog, setOpenDialog] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState(null)

  const handleQrCodeClick = () => {
    setOpenDialog(true)
  }

  const handlePayWithCash = () => {
    setPaymentMethod('Cash')
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    setPaymentMethod(null)
  }

  const handlePayWithQrCode = () => {
    navigate('/qr-code')
    handleCloseDialog()
  }

  const handleClick = () => {
    navigate('/account')
  }

  const { transactions, isLoading, error } = useLastFourTransactions()

  console.log('Transactions:', transactions)

  return (
    <div className="max-w-sm mx-auto sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
      <div className="text-center">
        <h1 className="text-xl font-semibold sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
          Hey,
        </h1>
        <h2 className="text-xl font-semibold sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
          Welcome back!
        </h2>
      </div>
      <BalanceDisplay
        onOpenRechargeModal={handleOpenRechargeModal}
        balance={user ? user.balance : 0}
        vehicleNumber="DL 06 DD 2561"
      />
      {message && <div className="mt-2 text-sm text-center">{message}</div>}

      <div className="mt-6 grid grid-cols-3 gap-4 text-center">
        <div className="flex flex-col items-center" onClick={handleClick}>
          <VscAccount className="text-4xl cursor-pointer" />
          <button className="text-xs mt-2">Account</button>
        </div>

        <div
          className="flex flex-col items-center cursor-pointer"
          onClick={handleQrCodeClick}
        >
          <FaCreditCard className="text-4xl" />
          <button className="text-xs mt-2">Pay Toll</button>
        </div>

        <RechargeModal
          open={isRechargeModalOpen}
          handleClose={handleCloseRechargeModal}
          onRecharge={handleRecharge}
        />

        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{'Payment Method'}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {paymentMethod === 'Cash'
                ? 'Please proceed to the cash payment area'
                : 'Do you want to pay with Qr code or Cash'}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}> Close</Button>

            {!paymentMethod && (
              <>
                <Button onClick={handlePayWithCash} color="primary">
                  Cash
                </Button>

                <Button onClick={handlePayWithQrCode} color="primary" autoFocus>
                  QR Code
                </Button>
              </>
            )}
          </DialogActions>
        </Dialog>

        <div className="flex flex-col items-center cursor-pointer">
          <VscAccount className="text-4xl " />
          <button className="text-xs mt-2">Vehicle</button>
        </div>
      </div>

      <div className="mt-6 mb-6">
        <h3 className="text-lg text-center font-semibold fle ">Transaction history</h3>

        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : (
          transactions.map((transaction, index) => (
            <TransactionHistoryItem key={index} transaction={transaction} />
          ))
        )}

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
