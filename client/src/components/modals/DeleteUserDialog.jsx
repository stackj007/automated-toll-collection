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

export default function DeleteUserDialog({
  open,
  setIsDeleteDialogOpen,
  user,
  setUsers,
}) {
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [alertTitle, setAlertTitle] = useState('')

  const hide = async () => {
    try {
      await axios.post('/api/delete-user', { id: user?.id })
      setIsDeleteDialogOpen(false)
      setUsers((users) => users.filter((u) => u.id !== user.id))
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
            <DialogTitle>Delete user</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {user?.name}?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button type="submit" className="destructive" onClick={hide}>
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
