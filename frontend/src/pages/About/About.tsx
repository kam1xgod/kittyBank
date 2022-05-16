import React, {FC} from 'react';
import {faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const About: FC = () => {
    return (
        <div className="container mt-5">
            <h4><FontAwesomeIcon className="ml-2 mr-2" icon={faInfoCircle}/>About this site.</h4>
            <br/>
            <p><b>What is this?</b> Just a final project in sbt Java school.</p>
            <br/>
            <h6>So.. What can I do here?</h6>
            <p>Just play around. You can create account with some starting value.<br/>
                And will automatically get card for it. If its not for savings.</p>
            <br/>
            <h6>Ok.. But what about contacting you?</h6>
            <p>You've noticed this page have 'contacts'?</p>
            <p><i>uwu</i></p>
            <p>Down below you can find links and my e-mail.</p>
        </div>
    );
};

export default About
