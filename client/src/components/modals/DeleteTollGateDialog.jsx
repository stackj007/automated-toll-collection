import axios from 'axios'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog.jsx'
import { Button } from '../ui/button.jsx'
import AlertModal from '../ui/AlertModal.jsx'
import { useState } from 'react'

export default function DeleteTollGateDialog({ open, setIsDeleteDialogOpen, station }) {
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [alertTitle, setAlertTitle] = useState('')

  const deleteStation = async () => {
    try {
      await axios.delete(`/api/toll-gates/${station?.id}`)
      setIsDeleteDialogOpen(false)
      window.location.reload()
    } catch (e) {
      setAlertTitle('Error')
      setAlertMessage(e.message)
      setIsAlertOpen(true)
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px] bg-white">
          <DialogHeader>
            <DialogTitle>Delete Toll Gate</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the toll gate at {station?.address}?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button className="destructive" onClick={deleteStation}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertModal
        open={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        title={alertTitle}
        description={alertMessage}
        onConfirm={() => setIsAlertOpen(false)}
      />
    </>
  )
}
