import React, { FC, MouseEvent } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAddressCard,
  faStopCircle,
  faCheckCircle,
  faClock,
} from '@fortawesome/free-solid-svg-icons'

import { Account } from '../../types/types'
import Spinner from '../Spinner/Spinner'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { useDispatch, useSelector } from 'react-redux'
import { deleteAccount } from '../../redux/thunks/account-thunks'
import { Button } from '../Input/Button'
import Card from '../CardView/Card'
import { fetchAccountInfo } from '../../redux/thunks/account-thunks'
import { AppStateType } from '../../redux/reducers/root-reducer'
import "../CardView/Card.css"

type PropsType = {
  accounts: Array<Account>
  loading: boolean
}

const AccountsTable: FC<PropsType> = ({ loading, accounts }) => {
  const userAccount: Partial<Account> = useSelector((state: AppStateType) => state.account.account);
  const dispatch = useDispatch()

  const deleteHandler = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    const id = event.currentTarget.value;

    dispatch(deleteAccount(id))
  }

  const infoHandler = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    const id = event.currentTarget.value;

    dispatch(fetchAccountInfo(id))
    console.log(userAccount)
  }

  return (
    <div className='container'>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <h4>
            <FontAwesomeIcon
              className='ml-2 mr-2'
              icon={faAddressCard as IconProp}
            />
            Accounts:
          </h4>
          <div>
            <div className="card-wrapper">
              {accounts.map((account) => {
                return (
                  <Card key={account.id} account={account} handlers={[deleteHandler, infoHandler]} buttonsAmount={1}/>
                )
              })}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default AccountsTable
