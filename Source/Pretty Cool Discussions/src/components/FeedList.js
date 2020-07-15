import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import { ListGroup } from 'reactstrap';
import ThreadFeedItem from './ThreadFeedItem';

const FeedList = props => {
    const [viewableDiscussionThreads, setViewableDiscussionThreads] = useState([]);

    useEffect(() => {
        if (props.selectedTags.length > 0) {
            let newViewableDiscussionThreads = [];
            for (const tag of props.selectedTags) {
                for (const thread of props.discussionThreads) {
                    if (thread.tags.includes(tag)) {
                        newViewableDiscussionThreads.push(thread);
                    }
                }
            }
            setViewableDiscussionThreads(newViewableDiscussionThreads);
        } else {
            setViewableDiscussionThreads([...props.discussionThreads]);
        }
    }, [props.selectedTags, props.discussionThreads])


    return (
        <ListGroup>
        {
            viewableDiscussionThreads.map((thread, i) => (
                <ThreadFeedItem key={i} keyId={i} 
                                thread={thread}
                                message={thread.message}
                                timeStamp={thread.timeStamp}
                                title={thread.title}
                                selectedThread={props.selectedThread}
                                setSelectedThread={props.setSelectedThread} />
            ))
        }
        </ListGroup>
    );
}

export default FeedList;

FeedList.propTypes = {
    selectedThread: propTypes.object.isRequired,
    setSelectedThread: propTypes.func.isRequired,
    selectedTags: propTypes.array.isRequired,
    discussionThreads: propTypes.array.isRequired
}