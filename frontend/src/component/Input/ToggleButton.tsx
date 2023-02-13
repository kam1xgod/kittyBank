import React, { FC, MouseEvent } from 'react'
import './ToggleButton.css'

interface Props {
  children?: React.ReactNode;
}

export const ToggleButton: React.FC<Props> = ({ children }) => {
  return (
    <div className="toggle-button">
      {children}
    </div>
  )
}
