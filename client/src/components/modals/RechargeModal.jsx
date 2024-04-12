import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@mui/material'
import { useState } from 'react'

const RechargeModal = ({
  open,
  handleClose,
  onRecharge,
}) => {
  const [amount, setAmount] = useState('')

  const handleConfirm = async () => {
    try {
      await onRecharge(amount)
      console.log('Closing dialog...')
      handleClose()
    } catch (error) {
      console.error('Recharge failed:', error)
    }
  }

  return (
    <Dialog open={open} onClose={handleClose} className="">
      <DialogTitle>Recharge Account</DialogTitle>
      <DialogContent>
        <TextField
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          fullWidth
          autoFocus
          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleConfirm}>Confirm</Button>
      </DialogActions>
    </Dialog>
  )
}

export default RechargeModal
