import React, { FC, useEffect, useState, MouseEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CreateCardAccount } from '../../../component/CreateCardAccount/CreateCardAccount'
import { RequestCreditAccount } from '../../../component/RequestCreditAccount/RequestCreditAccount'
import { AppStateType } from '../../../redux/reducers/root-reducer'
import { fetchUserAccounts } from '../../../redux/thunks/account-thunks'
import { fetchUserInfo } from '../../../redux/thunks/user-thunks'
import { Account } from '../../../types/types'
import { ToggleButton } from '../../../component/Input/ToggleButton'
import { Button } from '../../../component/Input/Button'

const CreateAccount: FC = () => {
  const dispatch = useDispatch()
  const accountData: Partial<Account> = useSelector(
    (state: AppStateType) => state.account.account
  )
  const loading: boolean = useSelector(
    (state: AppStateType) => state.user.isLoaded
  )
  const error: string = useSelector(
    (state: AppStateType) => state.account.errors
  )
  const [type, setType] = useState('card')

  useEffect(() => {
    dispatch(fetchUserAccounts())
  }, [])

  useEffect(() => {
    dispatch(fetchUserInfo())
  }, [])

  const clickHandler = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    setType(event.currentTarget.value)
  }
  // I can use map function, but for this I'll need mapping to get all type of accounts.
  return (
    <div className='container mt-5 pb-5'>
      <ToggleButton>
        <Button
          value='card'
          className={type === 'card' ? 'btn-primary' : 'btn-secondary'}
          onClick={clickHandler}
        >
          Card
        </Button>
        <Button
          value='credit'
          className={type === 'credit' ? 'btn-primary' : 'btn-secondary'}
          onClick={clickHandler}
        >
          Credit
        </Button>
        <Button
          value='savings'
          className={type === 'savings' ? 'btn-primary' : 'btn-secondary'}
          onClick={clickHandler}
        >
          Savings
        </Button>
      </ToggleButton>
      {type === 'card' ? (
        <CreateCardAccount
          accountData={accountData}
          loading={loading}
          error={error}
        />
      ) : type === 'credit' ? (
        <RequestCreditAccount
          accountData={accountData}
          loading={loading}
          error={error}
        />
      ) : (
        <div>Um... Nothing here yet.</div>
      )}
    </div>
  )
}

export default CreateAccount
