import axios from 'axios'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog.jsx'
import {Input} from '../ui/input.jsx'
import {Button} from '../ui/button.jsx'
import {useState} from "react";

export default function EditTollGateDialog({open, setIsEditDialogOpen, station}) {
  const vehicleTypes = ['car', 'motorcycle', 'truck', 'bus', 'trailer'];
  const [priceList, setPriceList] = useState({})

  const submit = async (e) => {
    e.preventDefault()

    const [id, address] = [
      document.getElementById('stationId').value,
      document.getElementById('address').value
    ]

    if (!address || !priceList) return alert('Please fill in all fields')

    try {
      await axios.put(`/api/toll-gates/${id}`, {address, priceList: {...station.priceList, ...priceList}})
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
          {vehicleTypes.map((type) => (
            <div key={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)} Fee
              <Input
                type="number"
                id={type}
                className="col-span-3"
                defaultValue={station?.priceList[type]}
                onChange={(e) =>
                  setPriceList((priceList) => ({
                    ...priceList,
                    [e.target.id]: e.target.value
                  }))
                }
              />
            </div>
          ))
          }
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
