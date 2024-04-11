import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from '../../../ui/table'

const TollStationContent = () => {
  const tollStations = [
    {
      id: 1,
      address: '123 Main St',
      qrCodeData: 'https://example.com/pay-toll/1',
    },
    {
      id: 2,
      address: '456 Elm St',
      qrCodeData: 'https://example.com/pay-toll/2',
    },
  ]

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>QR Code</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tollStations.map((station) => (
            <TableRow key={station.id}>
              <TableCell>{station.id}</TableCell>
              <TableCell>{station.address}</TableCell>
              <TableCell>
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&qzone=5&data=${encodeURIComponent(
                    station.qrCodeData
                  )}`}
                  alt="QR Code"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default TollStationContent
