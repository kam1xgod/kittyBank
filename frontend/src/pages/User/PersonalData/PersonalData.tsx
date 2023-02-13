import React, { FC } from 'react';
import { Link, Route, useLocation } from 'react-router-dom';
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard, faEdit, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import { User } from "../../../types/types";
import { AppStateType } from "../../../redux/reducers/root-reducer";
import EditPersonalData from "../EditPersonalData/EditPersonalData";
import "./PersonalData.css";
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Button } from '../../../component/Input/Button';


// change links to just changing state and making EditPersonalData visible or not.


const PersonalData: FC = () => {
  const usersData: Partial<User> = useSelector((state: AppStateType) => state.user.user);
  const { mail, firstname, lastname } = usersData;
  const location = useLocation();

  return (
    <div className="row">
      <div className="personal_data col-md-5">
        <h4 className="personal_data_title">
          <FontAwesomeIcon className="ml-2 mr-2" icon={faAddressCard as IconProp} />Personal data
        </h4>
        <p className="personal_data_item">Email:
          <span className="personal_data_text">{mail}</span>
        </p>
        <p className="personal_data_item">First name:
          <span className="personal_data_text">{firstname}</span>
        </p>
        <p className="personal_data_item">Last name:
          <span className="personal_data_text">{lastname}</span>
        </p>
        {location.pathname === "/user/info" ?
          <Button>
            <Link to={"/user/info/edit"}> 
              <FontAwesomeIcon className="mr-2" icon={faEdit as IconProp} /> Edit
            </Link>
          </Button>
          :
          <Button>
          <Link to={"/user/info"}> 
            <FontAwesomeIcon className="mr-2" icon={faEyeSlash as IconProp} /> Hide
          </Link>
          </Button>}
      </div>
      <div className="col-md-7">
        <Route path="/user/info/edit" component={() => <EditPersonalData />} />
      </div>
    </div>
  );
};

export default PersonalData;
