import axios from 'axios'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog.jsx'
import { Input } from '../ui/input.jsx'
import { Button } from '../ui/button.jsx'

export default function EditTollGateDialog({ open, setIsEditDialogOpen, station }) {
  const submit = async (e) => {
    e.preventDefault()
    const [id, address, fee] = [
      document.getElementById('stationId').value,
      document.getElementById('address').value,
      document.getElementById('fee').value,
    ]

    if (!address || !fee) return alert('Please fill in all fields')

    try {
      // Delete the existing toll gate
      await axios.delete(`/api/toll-gates/${id}`)

      // Create a new toll gate with the updated details
      await axios.post('/api/toll-gates', {
        address,
        fee,
      })
      setIsEditDialogOpen(false)
      window.location.reload()
    } catch (e) {
      alert(e.message)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setIsEditDialogOpen}>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Edit Toll Gate</DialogTitle>
          <DialogDescription>Edit toll gate details</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            ID
            <Input
              id="stationId"
              defaultValue={station?.id}
              className="col-span-3"
              disabled
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            Address
            <Input
              id="address"
              defaultValue={station?.address}
              className="col-span-3"
              type="text"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            Fee
            <Input
              id="fee"
              defaultValue={station?.fee}
              className="col-span-3"
              type="number"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={submit}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
