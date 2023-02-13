import React, { FC, FormEvent, useEffect, useState, MouseEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { TransferBetween } from '../../../component/CreateTransfer/TransferBetween'
import { TransferToAccount } from '../../../component/CreateTransfer/TransferToAccount'
import { TransferToClient } from '../../../component/CreateTransfer/TransferToClient'
import PageLoader from '../../../component/PageLoader/PageLoader'
import { AppStateType } from '../../../redux/reducers/root-reducer'
import { fetchUserAccounts, fetchUserCardAccounts } from '../../../redux/thunks/account-thunks'
import {
  addTransfer,
  fetchUserTransfers,
} from '../../../redux/thunks/transfer-thunks'
import { Transfer, TransferError, Account } from '../../../types/types'
import { validateAmount } from '../../../utils/input-validators'
import { ToggleButton } from '../../../component/Input/ToggleButton'
import { Button } from '../../../component/Input/Button'

const CreateTransfer: FC = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const error: string = useSelector(
    (state: AppStateType) => state.transfer.error
  )
  const transferData: Partial<Transfer> = useSelector(
    (state: AppStateType) => state.transfer.transfer
  )
  const userAccountsData: Array<Account> = useSelector(
    (state: AppStateType) => state.account.accounts
  )
  const errors: Partial<TransferError> = useSelector(
    (state: AppStateType) => state.transfer.errors
  )
  const loading: boolean = useSelector(
    (state: AppStateType) => state.user.isLoaded
  )

  const [amount, setAmount] = useState<number | undefined>(transferData.amount)
  const [recipientNumber, setRecipientNumber] = useState<string | undefined>(
    transferData.recipientNumber
  )
  const [senderNumber, setSenderNumber] = useState<string | undefined>(
    transferData.senderNumber
  )

  const [type, setType] = useState('cards')

  useEffect(() => {
    dispatch(fetchUserTransfers())
  }, [])

  useEffect(() => {
    dispatch(fetchUserCardAccounts())
  }, [])

  const onClickHandler = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    setType(event.currentTarget.value)
  }

  const onFormSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()

    const validateAmountError: string = validateAmount(amount)

      const bodyFormData: FormData = new FormData()
      bodyFormData.append(
        'transfer',
        new Blob(
          [
            JSON.stringify({
              amount,
              senderNumber,
              recipientNumber,
            }),
          ],
          { type: 'application/json' }
        )
      )
      dispatch(addTransfer(bodyFormData, history))
  }

  let pageLoading
  if (loading) {
    pageLoading = <PageLoader />
  }

  return (
    <div className='container mt-5 pb-5'>
      {pageLoading}
      <h4 className='mb-4 text-center'>Create transfer</h4>
      <ToggleButton>
        <Button className={type === "cards" ? "btn-primary" : "btn-secondary"} value="cards" onClick={onClickHandler}>Between my cards</Button>
        <Button className={type === "client" ? "btn-primary" : "btn-secondary"} value="client" onClick={onClickHandler}>To another client</Button>
        <Button className={type === "account" ? "btn-primary" : "btn-secondary"} value="account" onClick={onClickHandler}>By account number</Button>
      </ToggleButton>
      {error ? (
        <div className='alert alert-danger col-6' role='alert'>
          {error}
        </div>
      ) : null}
      {type === "account" && <TransferToAccount transferData={transferData} loading={loading} error={error}/>}
      {type === "cards" && <TransferBetween transferData={transferData} loading={loading} error={error}/>}
      {type === "client" && <TransferToClient transferData={transferData} loading={loading} error={error}/>}
    </div>
  )
}

export default CreateTransfer
