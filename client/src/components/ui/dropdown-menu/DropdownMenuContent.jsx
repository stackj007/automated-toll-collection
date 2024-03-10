export function DropdownMenuContent({
  children,
  align = 'start',
  ...props
}) {
  return (
    <div
      className={`absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 ${
        align === 'end' ? 'right-0' : 'left-0'
      }`}
      {...props}
    >
      {children}
    </div>
  )
}
