import React, { FC, MouseEvent } from 'react'
import './Button.css'

interface Props {
  children?: React.ReactNode;
  className?: string;
  value?: number | string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  type?: 'submit' | 'reset' | 'button';
}

export const Button: React.FC<Props> = ({ children, className, value, onClick, type }) => {
  return (
    <button type={type} className={className} value={value} onClick={onClick}>
      {children}
    </button>
  )
}
