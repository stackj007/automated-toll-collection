
import {useEffect, useState} from "react";
import {TableHeader, TableBody, TableCell, TableRow, Table} from "../../../../ui/table.jsx";
import axios from "axios";
import {Button} from "../../../../ui/button.jsx";

const TollStationsContent = () => {
  const [tollGates, setTollGates] = useState([])

  useEffect(() => {
    fetchTollGates()
  }, []);

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
    )}`;
  }

  const deleteTollGate = async (id) => {
    try {
      await axios.delete(`/api/toll-gates/${id}`)
      setTollGates(tollGates.filter((station) => station.id !== id))
    } catch (error) {
      console.error('Error deleting toll gate:', error.message)
    }
  }

  const addTollGate = async () => {
    try {
      const response = await axios.post('/api/toll-gates')
      setTollGates([...tollGates, response.data])
    } catch (error) {
      console.error('Error adding toll gate:', error.message)
    }
  }

  // TODO: fix style
  // TODO: add new toll gate
  return (
    <div>
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
                <img src={QRLink(station)} alt="QR Code"/>
              </TableCell>
              <TableCell>
                <Button variant="destructive" onClick={() => deleteTollGate(station.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default TollStationsContent
