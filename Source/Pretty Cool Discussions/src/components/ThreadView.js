import React from 'react';
import propTypes from 'prop-types';
import { Container } from 'reactstrap';
import { faFeatherAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CreateNewThreadForm from './CreateNewThreadForm';

const ThreadView = props => {
    return (
        <Container id="thread-view-container">
        {
            props.createNewThread === true ?
                <CreateNewThreadForm />
            :
                Object.keys(props.selectedThread).length === 0 ?
                    <Container id="feather-container">
                        <FontAwesomeIcon icon={faFeatherAlt} id="thread-view-feather" />
                    </Container>
                :
                    <></>
        }
        </Container>
    );
}

export default ThreadView;

ThreadView.propTypes = {
    selectedThread: propTypes.object.isRequired
}