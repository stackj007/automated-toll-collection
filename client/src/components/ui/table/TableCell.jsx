export function TableCell({ children, className }) {
  return (
    <td
      className={`px-6 py-4 whitespace-nowrap ${className}`}
    >
      {children}
    </td>
  )
}
