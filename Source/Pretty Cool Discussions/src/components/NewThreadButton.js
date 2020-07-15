import React from 'react';
import propTypes from 'prop-types';
import { Button } from 'reactstrap';
import { faToiletPaper } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LOGIN_STATE } from '../redux/storeConstants';

const NewThreadButton = props => {
    const handleNewThreadClick = () => {
        props.setCreateNewThread(true);
    }

    return (
        <Button className="vertical-center" id="feed-top-bar-new-post-button"
                disabled={props.loginState !== LOGIN_STATE.LOGGED_IN}
                onClick={handleNewThreadClick}>
            <FontAwesomeIcon icon={faToiletPaper} id="toilet-paper-icon" />
            <span>&nbsp;&nbsp;New Thread</span>
        </Button>
    );
}

export default NewThreadButton;

NewThreadButton.propTypes = {
    setCreateNewThread: propTypes.func.isRequired
}