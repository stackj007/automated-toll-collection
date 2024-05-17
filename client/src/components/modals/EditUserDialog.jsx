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
import { Checkbox } from '../ui/checkbox.jsx'

export function EditUserDialog({ open, setIsEditDialogOpen, user }) {
  const submit = async () => {
    const [id, name, email, isAdmin] = [
      document.getElementById('userId').value,
      document.getElementById('name').value,
      document.getElementById('email').value,
      document.getElementById('isAdmin').checked,
    ]

    if (!name || !email) return alert('please fill in all fields')

    try {
      await axios.post('/api/edit-user', { id, name, email, isAdmin })
      setIsEditDialogOpen(false)
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setIsEditDialogOpen}>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>Edit user profile</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="isAdmin">Admin</label>
            <Checkbox
              id="isAdmin"
              defaultChecked={user?.isAdmin}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="userId">id</label>
            <Input id="userId" defaultValue={user?.id} className="col-span-3" disabled />
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
            <label htmlFor="email">email</label>
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
