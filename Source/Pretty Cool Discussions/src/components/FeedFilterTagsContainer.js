import React from 'react';
import propTypes from 'prop-types';
import { Container } from 'reactstrap';
import TagPill from './TagPill'

const FeedFilterTagsContainer = props => {
    return (
        <Container id="filter-items-container">
        {
            props.selectedTags.map((tag, i) => (
                <TagPill key={i} tag={tag}
                         selectable={true}
                         selectedTags={props.selectedTags}
                         setSelectedTags={props.setSelectedTags}
                         viewableTags={props.viewableTags} />
            ))
        }
        </Container>
    )
}

export default FeedFilterTagsContainer;

FeedFilterTagsContainer.propTypes = {
    selectedTags: propTypes.array.isRequired,
    setSelectedTags: propTypes.func.isRequired,
    viewableTags: propTypes.object.isRequired
}