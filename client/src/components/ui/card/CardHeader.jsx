export function CardHeader({ children, className }) {
  return (
    <div
      className={`font-semibold text-gray-700 ${className}`}
    >
      {children}
    </div>
  )
}
