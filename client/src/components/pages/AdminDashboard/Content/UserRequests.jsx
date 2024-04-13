import { useState, useEffect } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../ui/table/table'

import axios from 'axios'
import DocumentReviewModal from '../../../modals/DocumentReviewModal'
import { Button } from '../../../ui/button.jsx'

export default function UserRequests() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedRequest, setSelectedRequest] =
    useState(null)
  const [userRequests, setUserRequests] = useState([])

  useEffect(() => {
    fetchUserRequests()
  }, [])

  const fetchUserRequests = async () => {
    try {
      const response = await axios.get('/api/user-requests')
      setUserRequests(response.data)
    } catch (error) {
      console.error('Error fetching user requests:', error)
    }
  }

  const handleAccept = async (requestId) => {
    try {
      await axios.post(
        `/api/user-requests/${requestId}/accept`
      )
      setUserRequests(
        userRequests.filter(
          (request) => request.id !== requestId
        )
      )
      setIsModalOpen(false)
    } catch (error) {
      console.error('Error accepting request:', error)
    }
  }

  const handleReject = async (requestId) => {
    try {
      await axios.post(
        `/api/user-requests/${requestId}/reject`
      )
      setUserRequests(
        userRequests.filter(
          (request) => request.id !== requestId
        )
      )
      setIsModalOpen(false)
    } catch (error) {
      console.error('Error rejecting request:', error)
    }
  }

  const handleRequestSelect = (request) => {
    console.log(`Selected request with ID: ${request.id}`)
    setSelectedRequest(request)
    setIsModalOpen(true)
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Vehicle Number</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {userRequests.map((request) => (
            <TableRow key={request.id}>
              <TableCell>{request.id}</TableCell>
              <TableCell>{request.user?.name}</TableCell>
              <TableCell>{request.vehicleNumber}</TableCell>
              <TableCell>{request.status}</TableCell>
              <TableCell>
                <Button
                  onClick={() =>
                    handleRequestSelect(request)
                  }
                >
                  Review
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Ensure the modal is rendered outside of the table's container */}
      {selectedRequest && (
        <DocumentReviewModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          request={selectedRequest}
          onAccept={() => handleAccept(selectedRequest.id)}
          onReject={() => handleReject(selectedRequest.id)}
        />
      )}
    </div>
  )
}
