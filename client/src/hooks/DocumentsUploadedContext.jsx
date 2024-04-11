import { createContext, useState, useContext } from 'react'

const DocumentsUploadedContext = createContext()
// TODO: delete if not used
export const useDocumentsUploaded = () =>
  useContext(DocumentsUploadedContext)

export const DocumentsUploadedProvider = ({ children }) => {
  const [documentsUploaded, setDocumentsUploaded] =
    useState(false)

  return (
    <DocumentsUploadedContext.Provider
      value={{ documentsUploaded, setDocumentsUploaded }}
    >
      {children}
    </DocumentsUploadedContext.Provider>
  )
}
export default DocumentsUploadedContext
