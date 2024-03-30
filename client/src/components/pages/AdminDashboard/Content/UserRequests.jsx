import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
} from '../../../ui/table'
import Button from '../../../ui/Button'

export default function UserRequests() {
  const userRequests = [
    {
      id: 1,
      name: 'John Doe',
      request: 'Request 1',
      status: 'Pending',
    },
    {
      id: 2,
      name: 'Jane Smith',
      request: 'Request 2',
      status: 'Pending',
    },
  ]

  const handleAccept = (id) => {
    console.log(`Accept request with ID: ${id}`)
  }

  const handleReject = (id) => {
    console.log(`Reject request with ID: ${id}`)
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Request</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {userRequests.map((request) => (
            <TableRow key={request.id}>
              <TableCell>{request.id}</TableCell>
              <TableCell>{request.name}</TableCell>
              <TableCell>{request.request}</TableCell>
              <TableCell>{request.status}</TableCell>
              <TableCell>
                <Button
                  onClick={() => handleAccept(request.id)}
                >
                  Accept
                </Button>
                <Button
                  onClick={() => handleReject(request.id)}
                >
                  Reject
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
