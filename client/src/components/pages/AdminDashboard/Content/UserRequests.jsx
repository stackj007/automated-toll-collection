import { useState, useEffect } from 'react'

import axios from 'axios'
import DocumentReviewModal from '../../../modals/DocumentReviewModal'
import { Button } from '../../../ui/button.jsx'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../ui/table/Table.jsx'

import AlertModal from '../../../ui/AlertModal'

export default function UserRequests() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState(null)
  const [userRequests, setUserRequests] = useState([])

  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const [alertTitle, setAlertTitle] = useState('')
  const [alertMessage, setAlertMessage] = useState('')

  useEffect(() => {
    fetchUserRequests()
  }, [])

  const fetchUserRequests = async () => {
    try {
      const response = await axios.get('/api/user-requests')
      setUserRequests(response.data)
    } catch (error) {
      setAlertTitle('Error')
      setAlertMessage('Failed to fetch user requests.')
      setIsAlertOpen(true)
    }
  }

  const handleAccept = async (requestId) => {
    try {
      await axios.post(`/api/user-requests/${requestId}/accept`)
      setUserRequests(userRequests.filter((request) => request.id !== requestId))
      setIsModalOpen(false)
    } catch (error) {
      setAlertTitle('Error')
      setAlertMessage('Failed to accept the request.')
      setIsAlertOpen(true)
    }
  }

  const handleReject = async (requestId) => {
    try {
      await axios.post(`/api/user-requests/${requestId}/reject`)
      setUserRequests(userRequests.filter((request) => request.id !== requestId))
      setIsModalOpen(false)
    } catch (error) {
      setAlertTitle('Error')
      setAlertMessage('Failed to reject the request.')
      setIsAlertOpen(true)
    }
  }

  const handleRequestSelect = (request) => {
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
                <Button onClick={() => handleRequestSelect(request)}>Review</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {selectedRequest && (
        <DocumentReviewModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          request={selectedRequest}
          onAccept={() => handleAccept(selectedRequest.id)}
          onReject={() => handleReject(selectedRequest.id)}
        />
      )}

      <AlertModal
        open={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        title={alertTitle}
        description={alertMessage}
      />
    </div>
  )
}
