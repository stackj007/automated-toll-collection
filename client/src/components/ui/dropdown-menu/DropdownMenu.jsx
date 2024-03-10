import React, { useState } from 'react'

export default function DropdownMenu({ children }) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = () => setIsOpen(!isOpen)

  return (
    <div className="relative">
      {React.Children.map(children, (child) => {
        if (child.type.name === 'DropdownMenuTrigger') {
          return React.cloneElement(child, {
            onClick: toggleOpen,
          })
        }
        if (
          child.type.name === 'DropdownMenuContent' &&
          isOpen
        ) {
          return child
        }
        return null
      })}
    </div>
  )
}
