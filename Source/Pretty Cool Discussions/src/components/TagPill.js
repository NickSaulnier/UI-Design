import React from 'react';
import propTypes from 'prop-types';
import { Container, Button } from 'reactstrap';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 

const TagPill = props => {
    const handleRemoveTagFilter = () => {
        props.viewableTags.current.push(props.tag);
        removeTagFromSelectedTags();
    }

    const removeTagFromSelectedTags = () => {
        let newSelectedTags = [];
        props.selectedTags.forEach(tag => {
            if (tag !== props.tag) {
                newSelectedTags.push(tag);
            }
        });
        props.setSelectedTags(newSelectedTags);
    }

    return (
        <Container className="tag-pill-container pill-container">
        {
            props.selectable === true ?
                <>
                    <span>{props.tag}</span>
                    <Button className="pill-button"
                            onClick={handleRemoveTagFilter}>
                        <FontAwesomeIcon icon={faTimes} />
                    </Button>
                </>
            :
                <span>{props.tag}</span>
        }
        </Container>
    );
}

export default TagPill;

TagPill.propTypes = {
    tag: propTypes.string.isRequired,
    selectable: propTypes.bool.isRequired,
    selectedTags: propTypes.array,
    setSelectedTags: propTypes.func,
    viewableTags: propTypes.object
}