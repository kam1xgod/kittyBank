import React, { useEffect, useState, MouseEvent } from 'react'
import { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import CreditsTable from '../../../component/CreditsTable/CreditsTable'
import { AppStateType } from '../../../redux/reducers/root-reducer'
import { fetchUserInfo } from '../../../redux/thunks/user-thunks'
import { fetchUserCredits } from '../../../redux/thunks/credit-thunks'
import { Credit, CreditRequest, User } from '../../../types/types'
import { Button } from '../../../component/Input/Button'
import CreateCredit from '../CreateCredit/CreateCredit'
import { ToggleButton } from '../../../component/Input/ToggleButton'

const CreditsList: FC = () => {
  const [isCreate, setIsCreate] = useState(false)

  const clickHandler = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    setIsCreate(!isCreate)
  }

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
  }, [])

  return (
    <div>
      <ToggleButton>
        <Button className={isCreate ? 'btn-secondary' : 'btn-primary'} onClick={clickHandler}>View all</Button>
        <Button className={!isCreate ? 'btn-secondary' : 'btn-primary'} onClick={clickHandler}>Open new</Button>
      </ToggleButton>
      {isCreate ? (
        <CreateCredit />
      ) : (
        <CreditsTable loading={loading} credits={accountCredits} />
      )}
    </div>
  )
}

export default CreditsList
