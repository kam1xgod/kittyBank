import React, { FC, useEffect, useState, MouseEvent } from 'react'
import { useDispatch } from 'react-redux'
import {
  NavLink,
  Route,
  RouteComponentProps,
} from 'react-router-dom'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { formReset } from '../../redux/thunks/admin-thunks'
import { fetchUserInfo } from '../../redux/thunks/user-thunks'
import ChangePassword from './ChangePassword/ChangePassword'
import PersonalData from './PersonalData/PersonalData'
import UserItem from './UserItem'
import './User.css'
import AccountsList from './AccountsList/AccountsList'
import ManageAccount from './ManageAccount/ManageAccount'
import TransfersList from './TransfersList/TransfersList'
import ManageTransfer from './ManageTransfer/ManageTransfer'
import CreateTransfer from './CreateTransfer/CreateTransfer'
import CreateAccount from './CreateAccount/CreateAccount'
import CreditsList from './CreditsList/CreditsList'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import CreateCredit from './CreateCredit/CreateCredit'
import ManageCredit from './ManageCredit/ManageCredit'
import { Button, ButtonGroup, ToggleButton, ToggleButtonGroup } from 'react-bootstrap'

const User: FC = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(formReset())
    dispatch(fetchUserInfo())
  }, [dispatch])

  // const [firstBtnVar, setFirstBtnVar] = useState("primary")
  // const [secondBtnVar, setSecondBtnVar] = useState("secondary")
  // const [thirdBtnVar, setThirdBtnVar] = useState("secondary")
  
  // const onClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
  //     e.preventDefault()
  //     console.log(e.currentTarget.value)
  //   }

  return (
    <div className='user-container container'>
      <div className='row mt-5'>
        <div className='col-md-2'>
          <h4>
            <NavLink to={'/user'} className='user-sidebar-link'>
            <FontAwesomeIcon className='mr-2' icon={faUser as IconProp} />
              My Account
            </NavLink>
          </h4>
          <NavLink
            to={'/user/info'}
            className='user-sidebar-link nav-link'
            activeClassName='is-active'
          >
            Personal data
          </NavLink>
          <NavLink
            to={'/user/transfers'}
            className='user-sidebar-link nav-link'
            activeClassName='is-active'
          >
            Transfers
          </NavLink>
          <NavLink
            to={'/user/credits'}
            className='user-sidebar-link nav-link'
            activeClassName='is-active'
          >
            Credits
          </NavLink>
          <NavLink
            to={'/user/account/new'}
            className='user-sidebar-link nav-link'
            activeClassName='is-active'
          >
            Open new account
          </NavLink>
          <NavLink
            to={'/user/edit'}
            className='user-sidebar-link nav-link'
            activeClassName='is-active'
          >
            Change password
          </NavLink>
        </div>
        <div className='col-md-10'>
          <Route exact path='/user' component={() => <UserItem />} />
          <Route exact path='/user' component={() => <AccountsList />} />
          <Route path='/user/info' component={() => <PersonalData />} />
          <Route path='/user/edit' component={() => <ChangePassword />} />
          <Route path='/user/accounts' component={() => <AccountsList />} />
          <Route path='/user/account/new' component={() => <CreateAccount />} />
          <Route
            path='/user/accounts/:id/info'
            component={(props: RouteComponentProps<{ id: string }>) => (
              <ManageAccount {...props} />
            )}
          />
          <Route path='/user/transfers' component={() => <TransfersList />} />
          <Route
            path='/user/transfers/:id/info'
            component={(props: RouteComponentProps<{ id: string }>) => (
              <ManageTransfer {...props} />
            )}
          />
          <Route path='/user/credits' component={() => <CreditsList />} />
          <Route exact path='/user/credits/:id/info' component={(props: RouteComponentProps<{ id: string}>) => <ManageCredit {...props}/>} />
        </div>
      </div>
    </div>
  )
}

export default User
