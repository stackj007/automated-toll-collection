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

import axios from 'axios'
import { Button } from '../../../ui/button.jsx'

const TollStationsContent = () => {
  const [tollGates, setTollGates] = useState([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedStation, setSelectedStation] = useState(null)

  useEffect(() => {
    fetchTollGates()
  }, [])

  const fetchTollGates = async () => {
    try {
      const response = await axios.get('/api/toll-gates')
      setTollGates(response.data)
    } catch (error) {
      console.error('Error fetching toll gates:', error)
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
    setIsDeleteDialogOpen(true)
  }

  const addTollGate = async (gateDetails) => {
    try {
      const response = await axios.post('/api/toll-gates', gateDetails)
      setTollGates([...tollGates, response.data.tollGate])
    } catch (error) {
      console.error('Error adding toll gate:', error.message)
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
            <TableCell>Fee</TableCell>
            <TableCell>QR Code</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tollGates.map((station) => (
            <TableRow key={station.id}>
              <TableCell>{station.id}</TableCell>
              <TableCell>{station.address}</TableCell>
              <TableCell>{station.fee}</TableCell>
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
    </div>
  )
}

export default TollStationsContent
