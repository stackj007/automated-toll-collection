import { useState, useEffect } from 'react'
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
import { CheckBox } from '@mui/icons-material'

export function EditUserDialog({ open, setIsEditDialogOpen, user }) {
  const [isAdmin, setIsAdmin] = useState(user?.isAdmin || false)

  const [id, setId] = useState(user?.id || '')
  const [name, setName] = useState(user?.name || '')
  const [email, setEmail] = useState(user?.email || '')

  useEffect(() => {
    if (user) {
      setId(user.id)
      setName(user.name)
      setEmail(user.email)

      setIsAdmin(user.isAdmin)
    } else {
      setIsAdmin(false)
    }
  }, [user])

  const submit = async (e) => {
    e.preventDefault()
    if (!name || !email) return alert('please fill in all fields')

    try {
      await axios.post('/api/edit-user', { id, name, email, isAdmin })
      setIsEditDialogOpen(false)
      window.location.reload()
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
            isAdmin
            <CheckBox
              id="isAdmin"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            id
            <Input id="userId" value={id} className="col-span-3" disabled />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            name
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
              type="text"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            email
            <Input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
