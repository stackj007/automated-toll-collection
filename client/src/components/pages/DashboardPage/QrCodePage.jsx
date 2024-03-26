const QrCodePage = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 mt-24 p-3">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold">QR Code</h1>
        <p className="text-gray-500">
          Here is your QR code for toll payments.
        </p>
        {/* placeholder for QR code  */}
      </div>
    </div>
  )
}

export default QrCodePage
