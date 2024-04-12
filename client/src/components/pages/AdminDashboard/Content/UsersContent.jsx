import { useState, useEffect } from 'react'
import axios from 'axios'

import {TableHeader, TableBody, TableCell, TableRow, Table, TableHead} from "../../../../ui/table.jsx";
import { TrashIcon, FileEditIcon } from '../../../ui/icons'
import { DeleteUserDialog } from '../../../modals/DeleteUserDialog.jsx'
import { EditUserDialog } from '../../../modals/EditUserDialog.jsx'
import {Card, CardContent, CardHeader, CardTitle} from "../../../../ui/card.jsx";
import {Button} from "../../../../ui/button.jsx";

export default function UsersContent() {
  const [users, setUsers] = useState([])
  const [isEditModalOpened, setIsEditModalOpened] =
    useState(false)
  const [isDeleteModalOpened, setIsDeleteModalOpened] =
    useState(false)
  const [selectedUser, setSelectedUser] = useState(null)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/users')
        setUsers(response.data)
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    }

    fetchUsers()
  }, [])

  return (
    <div className="grid gap-4">
      <DeleteUserDialog
        open={isDeleteModalOpened}
        setIsDeleteDialogOpen={setIsDeleteModalOpened}
        user={selectedUser}
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
                <TableHead className="w-[100px]">
                  ID
                </TableHead>
                <TableHead>Full name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-semibold">
                    {user.id}
                  </TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => {
                        setIsEditModalOpened(true)
                        setSelectedUser(user)
                      }}
                    >
                      <FileEditIcon className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => {
                        setIsDeleteModalOpened(true)
                        setSelectedUser(user)
                      }}
                    >
                      <TrashIcon className="h-4 w-4" />
                      <span className="sr-only">
                        Delete
                      </span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
