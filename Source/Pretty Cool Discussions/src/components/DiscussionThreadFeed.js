import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Container } from 'reactstrap';
import { getDiscussionThreads, getTagsForThread } from '../redux/actions';
import FeedTopBar from './FeedTopBar';
import FeedList from './FeedList';

const DiscussionThreadFeed = props => {
    const [selectedTags, setSelectedTags] = useState([]);
    const discussionThreads = useSelector(state => state.threads);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDiscussionThreads());
    }, [dispatch]);

    useEffect(() => {
        if (discussionThreads.length > 0) {
            discussionThreads.map(thread => (
                dispatch(getTagsForThread(thread.id))
            ))
        }
    }, [discussionThreads, dispatch]);

    return (
        <Container id="discussion-thread-feed-container">
            <FeedTopBar loginState={props.loginState} 
                        setCreateNewThread={props.setCreateNewThread}
                        selectedTags={selectedTags}
                        setSelectedTags={setSelectedTags} />
            <FeedList selectedThread={props.selectedThread}
                      setSelectedThread={props.setSelectedThread}
                      selectedTags={selectedTags}
                      discussionThreads={discussionThreads} />
        </Container>
    )
}

export default DiscussionThreadFeed;

DiscussionThreadFeed.propTypes = {
    loginState: propTypes.string.isRequired,
    selectedThread: propTypes.object.isRequired,
    setSelectedThread: propTypes.func.isRequired,
    createNewThread: propTypes.bool.isRequired,
    setCreateNewThread: propTypes.func.isRequired
}