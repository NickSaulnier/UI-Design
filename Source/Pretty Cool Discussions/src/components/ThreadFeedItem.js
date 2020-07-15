import React from 'react';
import propTypes from 'prop-types';
import { ListGroupItem, ListGroupItemHeading, ListGroupItemText, Row, Col } from 'reactstrap';

const MAX_TITLE_LENGTH = 30;
const MAX_MESSAGE_LENGTH = 120;
const selectedBackgroundColor = "#DEDEDE";
const unselectedBackgroundColor = "white";

const ThreadFeedItem = props => {
    const listItemId = "list-item-" + toString(props.keyId);

    const formatTitle = () => {
        if (props.title.length > MAX_TITLE_LENGTH) {
            return props.title.substring(0, MAX_TITLE_LENGTH) + "...";
        }
        return props.title;
    }

    const formatMessage = () => {
        if (props.message.length > MAX_MESSAGE_LENGTH) {
            return props.message.substring(0, MAX_MESSAGE_LENGTH);
        }
        return props.message;
    }

    const formatTimestamp = () => {
        return (props.timeStamp.getMonth() + 1).toString(10) + "/" + props.timeStamp.getDate().toString(10) + "/" + props.timeStamp.getFullYear().toString(10).substring(2, 4);
    }

    const handleItemSelect = () => {
        if (props.selectedThread !== props.thread) {
            document.getElementById(listItemId).style.backgroundColor = selectedBackgroundColor;
            props.setSelectedThread(props.thread);
        } else {
            document.getElementById(listItemId).style.backgroundColor = unselectedBackgroundColor;
            props.setSelectedThread({});
        }
    }

    return (
        <ListGroupItem onClick={handleItemSelect} id={listItemId}>
            <Row>
                <Col>
                    <ListGroupItemHeading>{formatTitle(props.title)}</ListGroupItemHeading>
                </Col>
                <Col>
                    <ListGroupItemText>{formatTimestamp(props.timeStamp)}</ListGroupItemText>
                </Col>
            </Row>
            <Row>
                <Col>
                    <ListGroupItemText>{formatMessage(props.message)}</ListGroupItemText>
                </Col>
            </Row>
        </ListGroupItem>
    );
}

export default ThreadFeedItem;

ThreadFeedItem.propTypes = {
    keyId: propTypes.number.isRequired,
    thread: propTypes.object.isRequired,
    message: propTypes.string.isRequired,
    timeStamp: propTypes.object.isRequired,
    title: propTypes.string.isRequired,
    selectedThread: propTypes.object.isRequired,
    setSelectedThread: propTypes.func.isRequired
}