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

export default function DeleteTollGateDialog({ open, setIsDeleteDialogOpen, station }) {
  const deleteStation = async () => {
    try {
      await axios.delete(`/api/toll-gates/${station?.id}`)
      setIsDeleteDialogOpen(false)
      window.location.reload()
    } catch (e) {
      console.error(e)
      alert(e.message)
    }
  }

  return (
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
  )
}
