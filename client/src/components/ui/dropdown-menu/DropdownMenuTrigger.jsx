// components/ui/dropdown-menu/DropdownMenuTrigger.jsx
import React from 'react'

export default function DropdownMenuTrigger({
  children,
  onClick,
  ...props
}) {
  return (
    <div onClick={onClick} {...props}>
      {children}
    </div>
  )
}
