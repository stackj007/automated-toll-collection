import { useState, useEffect } from 'react'
import axios from 'axios'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../ui/table/Table.jsx'

import { FiFileText, FiTrash2 } from 'react-icons/fi'

import DeleteUserDialog from '../../../modals/DeleteUserDialog.jsx'
import { EditUserDialog } from '../../../modals/EditUserDialog.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card.jsx'
import { Button } from '../../../ui/button.jsx'
import AlertModal from '../../../ui/AlertModal.jsx'

export default function UsersContent() {
  const [users, setUsers] = useState([])
  const [isEditModalOpened, setIsEditModalOpened] = useState(false)
  const [isDeleteModalOpened, setIsDeleteModalOpened] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)

  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const [alertTitle, setAlertTitle] = useState('')
  const [alertMessage, setAlertMessage] = useState('')

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/users')
        setUsers(response.data)
      } catch (error) {
        setAlertTitle('Error')
        setAlertMessage('Failed to fetch users.')
        setIsAlertOpen(true)
      }
    }

    fetchUsers()
  }, [])

  const handleRoleChange = async (user) => {
    if (!user) {
      setAlertTitle('Error')
      setAlertMessage('User is null, cannot update role.')
      setIsAlertOpen(true)
      return
    }

    try {
      await axios.put(`/api/users/${user.id}`, { isAdmin: !user.isAdmin })
      setUsers(users.map((u) => (u.id === user.id ? { ...u, isAdmin: !u.isAdmin } : u)))
    } catch (error) {
      setAlertTitle('Error')
      setAlertMessage('Failed to update user role.')
      setIsAlertOpen(true)
    }
  }

  const handleEdit = (user) => {
    if (!user) {
      setAlertTitle('Error')
      setAlertMessage('User is null, cannot edit.')
      setIsAlertOpen(true)
      return
    }

    setIsEditModalOpened(true)
    setSelectedUser(user)
  }

  const handleDelete = (user) => {
    setIsDeleteModalOpened(true)
    setSelectedUser(user)
  }

  return (
    <div className="grid gap-4">
      <DeleteUserDialog
        open={isDeleteModalOpened}
        setIsDeleteDialogOpen={setIsDeleteModalOpened}
        user={selectedUser}
        setUsers={setUsers}
      />

      <EditUserDialog
        open={isEditModalOpened}
        setIsEditDialogOpen={setIsEditModalOpened}
        user={selectedUser}
      />

      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Full name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Button
                      className=""
                      size="icon"
                      color={user.isAdmin ? 'red' : 'default'}
                      onClick={() => handleRoleChange(user)}
                    >
                      {user.isAdmin ? 'Admin' : 'User'}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      size="icon"
                      variant="outline"
                      color="blue"
                      onClick={() => handleEdit(user)}
                    >
                      <FiFileText className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      color="red"
                      onClick={() => handleDelete(user)}
                    >
                      <FiTrash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <AlertModal
        open={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        title={alertTitle}
        description={alertMessage}
      />
    </div>
  )
}
