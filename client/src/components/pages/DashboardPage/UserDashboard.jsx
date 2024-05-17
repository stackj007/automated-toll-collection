import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TransactionHistoryItem from './TransactionHistoryItem'
import BalanceDisplay from './BalanceDisplay'
import RechargeModal from '../../modals/RechargeModal'
import useTransactions from '../../../hooks/UseUserTransactions.jsx'
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

  if (!isVerified(user)) {
    navigate('/account')
  }

  const [isRechargeModalOpen, setIsRechargeModalOpen] = useState(false)
  const [message, setMessage] = useState('')

  const handleOpenRechargeModal = () => {
    setIsRechargeModalOpen(true)
  }

  const handleCloseRechargeModal = () => {
    setIsRechargeModalOpen(false)
  }

  const handleRecharge = async (amount) => {
    if (isNaN(amount) || amount <= 0) {
      setMessage('Please enter a valid amount greater than 0.')
      return
    }

    try {
      const response = await axios.post('/api/user/balance', { amount })
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

  const { transactions, isLoading, error } = useTransactions({ limit: 4 })

  return (
    <div className="container mx-auto px-4">
      <div className="text-center">
        <h1 className="text-2xl font-semibold lg:text-4xl">Hey, {user.name}</h1>
        <h2 className="text-xl font-semibold lg:text-3xl">Welcome back!</h2>
      </div>
      <BalanceDisplay
        balance={user ? user.balance : 0}
        onOpenRechargeModal={handleOpenRechargeModal}
        lastTollPrice={transactions.length > 0 ? transactions[0].price : 0}
      />
      {message && <div className="mt-2 text-sm text-center">{message}</div>}

      <div className="mt-6 grid grid-cols-3 gap-4 text-center">
        <div className="flex flex-col items-center" onClick={handleClick}>
          <VscAccount className="text-4xl cursor-pointer" />
          <button className="text-xs mt-2 lg:text-base">Account</button>
        </div>

        <div
          className="flex flex-col items-center cursor-pointer"
          onClick={handleQrCodeClick}
        >
          <FaCreditCard className="text-4xl" />
          <button className="text-xs mt-2 lg:text-base">Pay Toll</button>
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
            <Button onClick={handleCloseDialog}>Close</Button>
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
          <VscAccount className="text-4xl" />
          <button className="text-xs mt-2 lg:text-base">Vehicle</button>
        </div>
      </div>

      <div className="mt-6 mb-6">
        <h3 className="text-xl text-center font-semibold">Transaction history</h3>

        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : (
          transactions.map((transaction, index) => (
            <TransactionHistoryItem key={index} transaction={transaction} />
          ))
        )}

        {transactions.length === 0 && <p className="text-center text-sm text-gray-600">No transactions found.</p>}
        {transactions.length > 4 && (
          <button
            className="text-xs mt-4 mx-auto flex justify-center lg:text-base"
            onClick={() => navigate('/transaction-history-details')}
          >
            View More
          </button>
        )}
      </div>
    </div>
  )
}
