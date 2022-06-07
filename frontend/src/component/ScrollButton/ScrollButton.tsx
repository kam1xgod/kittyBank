import React from 'react';
import ScrollToTop from "react-scroll-up";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowAltCircleUp} from "@fortawesome/free-solid-svg-icons";
import { IconProp } from '@fortawesome/fontawesome-svg-core';

const ScrollButton = () => {
    return (
        // @ts-ignore
        <ScrollToTop style={{right: 60, color: "grey", zIndex: 1}} showUnder={160}>
            <FontAwesomeIcon className="fa-3x" icon={faArrowAltCircleUp as IconProp}/>
        </ScrollToTop>
    );
};

export default ScrollButton;
