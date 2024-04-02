import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
} from '../../../ui/table'
import Button from '../../../ui/Button'
import axios from "axios";

export default function UserRequests() {
  // TODO: use these requests
  const fetchUserRequests = async () => {
    try {
      const response = await axios.get('/api/user-requests')
      console.log(response)
    } catch (error) {
      console.error('Error fetching user requests:', error)
    }
  }

  const approveRequest = async (id) => {
    try {
      const response = await axios.post(`/api/approve-request/${id}`)
      console.log(response)
    } catch (error) {
      console.error('Error approving user request:', error)
    }
  }

  const rejectRequest = async (id) => {
    try {
      const response = await axios.post(`/api/reject-request/${id}`)
      console.log(response)
    } catch (error) {
      console.error('Error rejecting user request:', error)
    }
  }
  fetchUserRequests()


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
