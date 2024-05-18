import { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '../../../ui/table/Table.jsx'

import { PlusIcon } from '@radix-ui/react-icons'
import NewTollGateDialog from '../../../modals/AddTollGateModal.jsx'
import DeleteTollGateDialog from '../../../modals/DeleteTollGateDialog.jsx'
import EditTollGateDialog from '../../../modals/EditTollGateDialog.jsx'
import AlertModal from '../../../ui/AlertModal.jsx'

import axios from 'axios'
import { Button } from '../../../ui/button.jsx'

const TollStationsContent = () => {
  const [tollGates, setTollGates] = useState([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedStation, setSelectedStation] = useState(null)

  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [alertTitle, setAlertTitle] = useState('')
  const [alertAction, setAlertAction] = useState(null)

  useEffect(() => {
    fetchTollGates()
  }, [])

  const fetchTollGates = async () => {
    try {
      const response = await axios.get('/api/toll-gates')
      setTollGates(response.data)
    } catch (error) {
      setAlertTitle('Error')
      setAlertMessage('Error fetching toll gates: ' + error.message)
      setAlertAction(null)
      setIsAlertOpen(true)
    }
  }

  const tollGateLink = (station) => {
    return import.meta.env.VITE_BACKEND_URL + `/api/toll-gates/pay/${station.uuid}`
  }

  const QRLink = (station) => {
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&qzone=5&data=${encodeURIComponent(
      tollGateLink(station)
    )}`
  }

  const deleteTollGate = (station) => {
    setSelectedStation(station)
    setAlertTitle('Confirm Deletion')
    setAlertMessage('Are you sure you want to delete this toll gate?')
    setAlertAction(() => async () => {
      try {
        await axios.delete(`/api/toll-gates/${station.id}`)
        setTollGates((prev) => prev.filter((s) => s.id !== station.id))
        setIsAlertOpen(false)
      } catch (error) {
        setAlertTitle('Error')
        setAlertMessage('Error deleting toll gate: ' + error.message)
        setAlertAction(null)
        setIsAlertOpen(true)
      }
    })
    setIsAlertOpen(true)
  }

  const addTollGate = async (gateDetails) => {
    try {
      const response = await axios.post('/api/toll-gates', gateDetails)
      setTollGates([...tollGates, response.data.tollGate])
    } catch (error) {
      setAlertTitle('Error')
      setAlertMessage('Error adding toll gate: ' + error.message)
      setAlertAction(null)
      setIsAlertOpen(true)
    }
  }

  const handleAddTollGate = async (gateDetails) => {
    await addTollGate(gateDetails)
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 ">
        Toll Stations
        <button onClick={() => setIsDialogOpen(true)}>
          <PlusIcon className="mx-7 " />
        </button>
      </h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Price list</TableCell>
            <TableCell>QR Code</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tollGates?.map((station) => (
            <TableRow key={station.id}>
              <TableCell>{station.id}</TableCell>
              <TableCell>{station?.address}</TableCell>
              <TableCell>
                {station.priceList &&
                  Object.entries(station.priceList).map(([key, value]) => (
                    <div key={key}>
                      {key.charAt(0).toUpperCase() + key.slice(1)}:{' '}
                      <span> {Number(value)} EGP</span>
                    </div>
                  ))}
              </TableCell>
              <TableCell>
                <img src={QRLink(station)} alt="QR Code" />
              </TableCell>
              <TableCell>
                <Button variant="destructive" onClick={() => deleteTollGate(station)}>
                  Delete
                </Button>
                <Button
                  variant="primary"
                  onClick={() => {
                    setSelectedStation(station)
                    setIsEditDialogOpen(true)
                  }}
                >
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <NewTollGateDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onAddTollGate={handleAddTollGate}
      />

      <DeleteTollGateDialog
        open={isDeleteDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
        station={selectedStation}
      />

      <EditTollGateDialog
        open={isEditDialogOpen}
        setIsEditDialogOpen={setIsEditDialogOpen}
        station={selectedStation}
      />

      <AlertModal
        open={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        title={alertTitle}
        description={alertMessage}
        onConfirm={alertAction}
      />
    </div>
  )
}

export default TollStationsContent
