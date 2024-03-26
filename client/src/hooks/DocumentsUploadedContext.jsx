import { createContext, useState, useContext } from 'react'

const DocumentsUploadedContext = createContext()

export const useDocumentsUploaded = () =>
  useContext(DocumentsUploadedContext)

export const DocumentsUploadedProvider = ({ children }) => {
  const [documentUploaded, setDocumentsUploaded] =
    useState(false)

  return (
    <DocumentsUploadedContext.Provider
      value={{ documentUploaded, setDocumentsUploaded }}
    >
      {children}
    </DocumentsUploadedContext.Provider>
  )
}

export default DocumentsUploadedContext
