import Recat, { useState } from 'react'
import Button from '../../../ui/Button'

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '../../../ui/card'

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
} from '../../../ui/table'

import { TrashIcon, FileEditIcon } from '../../../ui/icons'

export default function UserContent() {
  return (
    <div className="grid gap-4">
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
                <TableHead>Username</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-semibold">
                  1
                </TableCell>
                <TableCell>john_doe</TableCell>
                <TableCell>john@example.com</TableCell>
                <TableCell className="text-right">
                  <Button size="icon" variant="outline">
                    <FileEditIcon className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button size="icon" variant="outline">
                    <TrashIcon className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">
                  2
                </TableCell>
                <TableCell>jane_smith</TableCell>
                <TableCell>jane@example.com</TableCell>
                <TableCell className="text-right">
                  <Button size="icon" variant="outline">
                    <FileEditIcon className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button size="icon" variant="outline">
                    <TrashIcon className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">
                  3
                </TableCell>
                <TableCell>alex_wong</TableCell>
                <TableCell>alex@example.com</TableCell>
                <TableCell className="text-right">
                  <Button size="icon" variant="outline">
                    <FileEditIcon className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button size="icon" variant="outline">
                    <TrashIcon className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
