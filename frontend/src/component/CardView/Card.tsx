import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faCheckCircle, faClock, faStopCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { FC, MouseEvent } from 'react'
import { Link } from 'react-router-dom'
import { Account } from '../../types/types'
import { Button } from '../Input/Button'
import './Card.css'

type PropsType = {
  account: Account
  buttonsAmount: number
  handlers: Array<(event: MouseEvent<HTMLButtonElement>) => void>
}

const Card: FC<PropsType> = ({ account, buttonsAmount, handlers }) => {
  return (
    <div key={account.id} className='card m-1 p-1 shadow-sb rounded mb-2'>
      <div className='card-body'>
        <h5 className='card-title'>
          {account.number}
          <div className="ml-1 text-right text-muted">{account.balance} {account.currency.symbol}</div>
        </h5>
        <h6 className='card-subtitle text-muted'>
          {account.type}
          {account.status === 'DECLINED' ? (
            <FontAwesomeIcon
              className='ml-2 mr-2 text-danger'
              icon={faStopCircle as IconProp}
            />
          ) : account.status === 'ACTIVE' ? (
            <FontAwesomeIcon
              className='ml-2 mr-2 text-success'
              icon={faCheckCircle as IconProp}
            />
          ) : (
            <FontAwesomeIcon
              className='ml-2 mr-2 text-warning'
              icon={faClock as IconProp}
            />
          )}
        </h6>
        <div style={{ display: 'inline-flex' }}>
          <div className="d-flex flex-row justify-content-around">
            <Button
              className='my-2 crimson d-flex'
              value={account.id}
              onClick={handlers[0]}
            >
              Delete
            </Button>
            <Button
              className='my-2 d-flex'
              value={account.id}
              onClick={handlers[1]}
            >
              Details
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
