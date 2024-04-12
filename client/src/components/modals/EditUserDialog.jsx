import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog.jsx'
import axios from 'axios'
import { Input } from '../ui/input.jsx'
import { Button } from '../ui/button.jsx'

export function EditUserDialog({
  open,
  setIsEditDialogOpen,
  user,
}) {
  const submit = async (e) => {
    e.preventDefault()
    const [id, name, email] = [
      document.getElementById('userId').value,
      document.getElementById('name').value,
      document.getElementById('email').value,
    ]

    if (!name || !email)
      return alert('Please fill in all fields')

    try {
      await axios.post('/api/edit-user', {
        id,
        name,
        email,
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
          <DialogTitle>Send part</DialogTitle>
          <DialogDescription>
            Edit user profile
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            id
            <Input
              id="userId"
              defaultValue={user?.id}
              className="col-span-3"
              disabled
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            name
            <Input
              id="name"
              defaultValue={user?.name}
              className="col-span-3"
              type="text"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            email
            <Input
              id="email"
              defaultValue={user?.email}
              className="col-span-3"
              type="text"
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
