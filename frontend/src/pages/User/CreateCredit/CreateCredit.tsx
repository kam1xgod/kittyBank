import React, { FC, FormEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import PageLoader from '../../../component/PageLoader/PageLoader'
import { AppStateType } from '../../../redux/reducers/root-reducer'
// TODO: create new thunks for fetching User's credit accounts
import { fetchUserAccounts } from '../../../redux/thunks/account-thunks'
import { Credit, CreditError, Account } from '../../../types/types'
import { validateAmount } from '../../../utils/input-validators'
import { currencyList } from '../../../utils/constants/types'
import { addCredit } from '../../../redux/thunks/credit-thunks'

const CreateCredit: FC = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const error: string = useSelector((state: AppStateType) => state.credit.error)
  const creditData: Partial<Credit> = useSelector(
    (state: AppStateType) => state.credit.credit
  )
  const credits: Array<Credit> = useSelector(
    (state: AppStateType) => state.credit.credits
  )
  const userAccountsData: Array<Account> = useSelector(
    (state: AppStateType) => state.account.accounts
  )
  const errors: Partial<CreditError> = useSelector(
    (state: AppStateType) => state.credit.errors
  )
  const loading: boolean = useSelector(
    (state: AppStateType) => state.user.isLoaded
  )

  const [amount, setAmount] = useState<number | undefined>(creditData.amount)
  const [account, setAccount] = useState<string | undefined>(creditData.account)
  const [currency, setCurrency] = useState<string | undefined>(
    creditData.currency
  )
  const [validateAmountError, setValidateAmountError] = useState<string>('')

  const { amountError } = errors

  useEffect(() => {
    dispatch(fetchUserAccounts())
  }, [])

  const onFormSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()

    const validateAmountError: string = validateAmount(amount)

    if (validateAmountError) {
      setValidateAmountError(validateAmountError)
    } else {
      setValidateAmountError('')
      const bodyFormData: FormData = new FormData()
      bodyFormData.append(
        'credit',
        new Blob(
          [
            JSON.stringify({
              amount,
              account,
              currency,
            }),
          ],
          { type: 'application/json' }
        )
      )
      dispatch(addCredit(bodyFormData, history))
    }
  }

  let pageLoading
  if (loading) {
    pageLoading = <PageLoader />
  }

  return (
    <div className='container mt-5 pb-5'>
      {pageLoading}
      <h4 className='mb-4 text-center'>Open new credit</h4>
      {error ? (
        <div className='alert alert-danger col-6' role='alert'>
          {error}
        </div>
      ) : null}
      <br />
      <form onSubmit={onFormSubmit}>
        <div className='row'>
          <div className='col-lg-6'>
            <div className='form-group row'>
              <label className='col-sm-5 col-form-label'>
                Choose your account:{' '}
              </label>
              <div className='col-sm-5'>
                <select
                  value={account}
                  onChange={(event) => setAccount(event.target.value)}
                >
                  <option className='form-control'>---</option>
                  {userAccountsData.map((account) => {
                    return (
                      <option className='form-control'>{account.number}</option>
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
                  className={
                    amountError ? 'form-control is-invalid' : 'form-control'
                  }
                  name='amount'
                  value={amount}
                  placeholder='Enter amount'
                  onChange={(event) =>
                    setAmount(parseFloat(event.target.value))
                  }
                />
                <div className='invalid-feedback'>{amountError}</div>
              </div>
            </div>
            <div className='form-group row'>
              <label className='col-sm-5 col-form-label'>Currency: </label>
              <div className='col-sm-6'>
                <select
                  value={currency}
                  onChange={(event) => setCurrency(event.target.value)}
                >
                  <option className='form-control'>---</option>
                  {currencyList.map((currency) => {
                    return <option className='form-control'>{currency}</option>
                  })}
                </select>
              </div>
            </div>
            <button
              type='submit'
              className='btn btn-primary btn-lg px-5 float-right'
            >
              Open new credit 
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default CreateCredit
