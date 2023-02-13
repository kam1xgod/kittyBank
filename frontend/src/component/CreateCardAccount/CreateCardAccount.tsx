import React, { FormEvent, useState, FC, useEffect } from 'react'
import { Account, Currency } from '../../types/types'
import {
  paymentSystemList,
} from '../../utils/constants/types'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { addAccount } from '../../redux/thunks/account-thunks'
import PageLoader from '../PageLoader/PageLoader'
import { AppStateType } from '../../redux/reducers/root-reducer'
import { fetchCurrencyInfo } from '../../redux/thunks/currency-thunks'

type PropsType = {
  accountData: Partial<Account>
  loading: boolean
  error: string
}

export const CreateCardAccount: FC<PropsType> = ({
  accountData,
  loading,
  error,
}) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [currencyName, setCurrency] = useState<string | undefined>(
    accountData.currency?.name
  )
  const [paymentSystem, setPaymentSystem] = useState<string | undefined>(
    accountData.paymentSystem
  )
  const currencies: Array<Currency> = useSelector((state: AppStateType) => state.currency.currencies)

  useEffect(() => {
    dispatch(fetchCurrencyInfo())
  }, [dispatch])

  let pageLoading
  if (loading) {
    pageLoading = <PageLoader />
  }

  const onFormSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()

    const mail = localStorage.getItem('mail')
    const type = 'CARD'

    const bodyFormData: FormData = new FormData()
    bodyFormData.append(
      'account',
      new Blob(
        [
          JSON.stringify({
            currencyName,
            type,
            paymentSystem,
            mail,
          }),
        ],
        { type: 'application/json' }
      )
    )
    dispatch(addAccount(bodyFormData, history))
  }
  return (
    <div>
      <h4 className='mb-4 text-center'>Open card account</h4>
      {pageLoading}
      <div className='container mt-5 pb-5'>
        <form onSubmit={onFormSubmit}>
          {error ? (
            <div className='alert alert-danger col-6' role='alert'>
              {error}
            </div>
          ) : null}
          <div className='row'>
            <div className='col-lg-6'>
              <div className='form-group row'>
                <label className='col-sm-5 col-form-label'>
                  Choose currency:{' '}
                </label>
                <div className='col-sm-5'>
                  <select
                    value={currencyName}
                    onChange={(event) => setCurrency(event.target.value)}
                  >
                    <option disabled className='form-control'></option>
                    {currencies.map((currency) => {
                      return (
                        <option className='form-control'>{currency.name}</option>
                      )
                    })}
                  </select>
                  <div className='invalid-feedback'>{currencyName}</div>
                </div>
              </div>
              <div className='form-group row'>
                <label className='col-sm-5 col-form-label'>
                  Payment system:{' '}
                </label>
                <div className='col-sm-6'>
                  <select
                    value={paymentSystem}
                    onChange={(event) => setPaymentSystem(event.target.value)}
                  >
                    <option disabled className='form-control'></option>
                    {paymentSystemList.map((paymentSystem) => {
                      return (
                        <option className='form-control'>
                          {paymentSystem}
                        </option>
                      )
                    })}
                  </select>
                  <div className='invalid-feedback'>{paymentSystem}</div>
                </div>
              </div>
              <button
                type='submit'
                className='btn btn-primary btn-lg px-5 float-right'
              >
                Validate account
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
