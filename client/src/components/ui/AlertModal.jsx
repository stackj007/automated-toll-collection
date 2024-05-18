import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '../ui/dialog'

import { Button } from '../ui/button'

export default function AlertModal({ open, onClose, title, description, onConfirm }) {
  return (
    <Dialog open={open} onOpenChange={onClose} className="bg-white">
      <DialogContent className="sm:max-2-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button onClick={onConfirm} className="bg-red-500 hover:bg-red-600">
            Confirm
          </Button>

          <Button onClick={onClose} className="bg-gray-500 hover:bg-gray-600">
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
