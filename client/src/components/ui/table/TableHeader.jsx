export default function TableHeader({
  children,
  className,
}) {
  return (
    <thead className={`bg-gray-50 ${className}`}>
      {children}
    </thead>
  )
}
