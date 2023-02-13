import React, { FC, useEffect, useState, MouseEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ToggleButton } from '../../../component/Input/ToggleButton'
import { Button } from '../../../component/Input/Button'

import TransfersTable from '../../../component/TransfersTable/TransfersTable'
import { AppStateType } from '../../../redux/reducers/root-reducer'
import { fetchUserTransfers } from '../../../redux/thunks/transfer-thunks'
import { Transfer } from '../../../types/types'
import CreateTransfer from '../CreateTransfer/CreateTransfer'

const TransfersList: FC = () => {
  const dispatch = useDispatch()
  const accountTransfers: Array<Transfer> = useSelector(
    (state: AppStateType) => state.transfer.transfers
  )
  const loading: boolean = useSelector(
    (state: AppStateType) => state.user.isLoaded
  )
  const [isCreate, setIsCreate] = useState(false)

  useEffect(() => {
    dispatch(fetchUserTransfers())
  }, [dispatch])

  const clickHandler = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    setIsCreate(!isCreate)
  }

  return (
    <div>
      <ToggleButton>
        <Button className={isCreate ? 'btn-secondary' : 'btn-primary'} onClick={clickHandler}>View all</Button>
        <Button className={!isCreate ? 'btn-secondary' : 'btn-primary'} onClick={clickHandler}>Create new</Button>
      </ToggleButton>
      {isCreate ? (
        <CreateTransfer />
      ) : (
        <TransfersTable loading={loading} transfers={accountTransfers} />
      )}
    </div>
  )
}

export default TransfersList
