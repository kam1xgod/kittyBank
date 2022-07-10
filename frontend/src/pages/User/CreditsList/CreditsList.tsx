import React, { useEffect } from 'react'
import { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import CreditsTable from '../../../component/CreditsTable/CreditsTable'
import { AppStateType } from '../../../redux/reducers/root-reducer'
import { fetchUserInfo } from '../../../redux/thunks/user-thunks'
import {
  addCreditRequest,
  fetchUserCredits,
} from '../../../redux/thunks/credit-thunks'
import { Credit, CreditRequest, User } from '../../../types/types'

const CreditsList: FC = () => {
  const dispatch = useDispatch()
  const accountCredits: Array<Credit> = useSelector(
    (state: AppStateType) => state.credit.credits
  )
  const loading: boolean = useSelector(
    (state: AppStateType) => state.user.isLoaded
  )

  // todo: add button for getting new credit with redirect to page where user puts amount. DONE.
  // todo: and may be picks which credit account will be responsible for this.

  useEffect(() => {
    dispatch(fetchUserCredits())
    dispatch(fetchUserInfo())
    dispatch(addCreditRequest(localStorage.getItem('mail') as string))
  }, [])

  return (
    <>
      <NavLink
        to={'/credits/new'}
        className='admin-sidebar-link nav-link border my-2 px-2 py-2'
        activeClassName='is-active'
        style={{
          backgroundColor: '#43506C',
          color: '#E9E9EB',
          textAlign: 'center',
        }}
      >
        Add new
      </NavLink>
      <CreditsTable loading={loading} credits={accountCredits} />
    </>
  )
}

export default CreditsList
