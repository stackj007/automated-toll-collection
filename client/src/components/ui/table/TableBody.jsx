export default function TableBody({ children, className }) {
  return (
    <tbody
      className={`bg-white divide-y divide-gray-200 ${className}`}
    >
      {children}
    </tbody>
  )
}
