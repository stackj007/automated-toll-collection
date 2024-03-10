export default function DropdownMenuItem({
  children,
  ...props
}) {
  return (
    <div
      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
      {...props}
    >
      {children}
    </div>
  )
}
