import React, { FC, FormEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Account, Currency } from '../../types/types'
import PageLoader from '../PageLoader/PageLoader'
import {
  paymentSystemList,
} from '../../utils/constants/types'
import { validateAmount } from '../../utils/input-validators'
import { addCreditRequest } from '../../redux/thunks/credit-thunks'
import { AppStateType } from '../../redux/reducers/root-reducer'
import { fetchCurrencyInfo } from '../../redux/thunks/currency-thunks'

type PropsType = {
  accountData: Partial<Account>
  loading: boolean
  error: string
}

export const RequestCreditAccount: FC<PropsType> = ({
  accountData,
  loading,
  error,
}) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [currency, setCurrency] = useState<string | undefined>(
    accountData.currency?.name
  )
  const currencies: Array<Currency> = useSelector((state: AppStateType) => state.currency.currencies)
  const [paymentSystem, setPaymentSystem] = useState<string | undefined>(
    accountData.paymentSystem
  )
  const [desiredLimit, setDesiredLimit] = useState<number | undefined>(
    accountData.creditLimit
  )
  const [validateDesiredLimitError, setValidateDesiredLimitError] = useState<string>('')

  useEffect(() => {
    dispatch(fetchCurrencyInfo())
  }, [dispatch])

  let pageLoading
  if (loading) {
    pageLoading = <PageLoader />
  }

  const onFormSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()

    const validateDesiredLimitError: string = validateAmount(desiredLimit)

    if (validateDesiredLimitError) {
      setValidateDesiredLimitError(validateDesiredLimitError)
    } else {
      setValidateDesiredLimitError('')
    }

    const mail = localStorage.getItem('mail')

    const bodyFormData: FormData = new FormData()
    bodyFormData.append(
      'account-request',
      new Blob(
        [
          JSON.stringify({
            mail,
            desiredLimit,
            currency,
            // paymentSystem,
          }),
        ],
        { type: 'application/json' }
      )
    )
    dispatch(addCreditRequest(bodyFormData))
  }
  return (
    <div>
      <h4 className='mb-4 text-center'>Request credit account</h4>
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
                    value={currency}
                    onChange={(event) => setCurrency(event.target.value)}
                  >
                    <option disabled className='form-control'></option>
                    {currencies.map((currency) => {
                      return (
                        <option className='form-control'>{currency.name}</option>
                      )
                    })}
                  </select>
                  <div className='invalid-feedback'>{currency}</div>
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
              <div className='form-group row'>
                <label className='col-sm-5 col-form-label'>Desired limit: </label>
                <div className='col-sm-6'>
                  <input
                    type='text'
                    className={
                      validateDesiredLimitError
                        ? 'form-control is-invalid'
                        : 'form-control'
                    }
                    name='amount'
                    value={desiredLimit}
                    placeholder='Enter amount'
                    onChange={(event) =>
                      setDesiredLimit(parseFloat(event.target.value))
                    }
                  />
                  <div className='invalid-feedback'>{validateDesiredLimitError}</div>
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
