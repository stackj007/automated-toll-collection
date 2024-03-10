export default function CardTitle({ children, className }) {
  return (
    <h2 className={`text-xl font-bold ${className}`}>
      {children}
    </h2>
  )
}
