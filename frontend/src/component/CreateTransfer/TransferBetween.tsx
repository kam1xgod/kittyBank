import React, { FormEvent, useState, FC, MouseEvent } from 'react'
import { Account, Transfer } from '../../types/types'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import PageLoader from '../PageLoader/PageLoader'
import { AppStateType } from '../../redux/reducers/root-reducer'
import { addTransfer } from '../../redux/thunks/transfer-thunks'

type PropsType = {
  transferData: Partial<Transfer>
  loading: boolean
  error: string
}

export const TransferBetween: FC<PropsType> = ({
  transferData,
  loading,
  error,
}) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [amount, setAmount] = useState<number | undefined>(transferData.amount)
  const [recipientNumber, setRecipientNumber] = useState<string | undefined>(
    transferData.recipientNumber
  )
  const [senderNumber, setSenderNumber] = useState<string | undefined>(
    transferData.senderNumber
  )
  const userAccountsData: Array<Account> = useSelector(
    (state: AppStateType) => state.account.accounts
  )

  let pageLoading
  if (loading) {
    pageLoading = <PageLoader />
  }

  const onFormSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()


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

  return (
    <div className='container mt-5 pb-5'>
      {pageLoading}
      {error ? (
        <div className='alert alert-danger col-6' role='alert'>
          {error}
        </div>
      ) : null}
      <form onSubmit={onFormSubmit}>
        <div className='row'>
          <div className='col-lg-6'>
            <div className='form-group row'>
              <label className='col-sm-5 col-form-label'>
                Choose your card:{' '}
              </label>
              <div className='col-sm-5'>
                <select
                  value={senderNumber}
                  onChange={(event) => setSenderNumber(event.target.value)}
                >
                  <option className='form-control'>---</option>
                  {userAccountsData.map((account) => {
                    return (
                      <option className='form-control' value={account.card.number}>{account.card.number} - {account.balance} {account.currency.symbol}</option>
                    )
                  })}
                </select>
              </div>
            </div>
            <div className='form-group row'>
              <label className='col-sm-5 col-form-label'>Amount: </label>
              <div className='col-sm-6'>
                <input
                  type='text'
                  className='form-control'
                  name='amount'
                  value={amount}
                  placeholder='Enter amount'
                  onChange={(event) =>
                    setAmount(parseFloat(event.target.value))
                  }
                />
              </div>
            </div>
            <div className='form-group row'>
              <label className='col-sm-5 col-form-label'>
                Transfer to:
              </label>
              <div className='col-sm-6'>
                <select
                  value={recipientNumber}
                  onChange={(event) => setRecipientNumber(event.target.value)}
                >
                  <option className='form-control'>---</option>
                  {userAccountsData.map((account) => {
                    return (
                      <option className='form-control' value={account.card.number}>{account.card.number} - {account.balance} {account.currency.symbol}</option>
                    )
                  })}
                </select>
                  { senderNumber === recipientNumber
                  ?
                <div className='invalid-feedback'>Please, choose another card.</div>
                  : null 
              }
              </div>
            </div>
            <button
              type='submit'
              className='btn btn-primary btn-lg px-5 float-right'
              disabled={amount ? recipientNumber ? senderNumber !== recipientNumber ? false : true : true : true}  
            >
              Validate transfer
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
