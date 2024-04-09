import React, { useState, useEffect } from 'react'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
} from '../../../ui/table'
import Button from '../../../ui/Button'
import axios from 'axios'
import DocumentReviewModal from '../../../modals/DocumentReviewModal' // Adjust the import path as necessary

export default function UserRequests() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedRequest, setSelectedRequest] =
    useState(null)

  useEffect(() => {
    fetchUserRequests()
  }, [])

  const fetchUserRequests = async () => {
    try {
      const response = await axios.get('/api/user-requests')
      console.log(response)
    } catch (error) {
      console.error('Error fetching user requests:', error)
    }
  }

  const handleRequestSelect = (request) => {
    console.log(`Selected request with ID: ${request.id}`)
    setSelectedRequest(request)
    setIsModalOpen(true)
  }

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
