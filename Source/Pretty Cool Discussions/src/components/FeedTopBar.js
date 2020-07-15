import React, { useState, useEffect, useRef } from 'react';
import propTypes from 'prop-types';
import { Container } from 'reactstrap';
import NewThreadButton from './NewThreadButton';
import FeedFilter from './FeedFilter';
import FeedFilterDropdown from './FeedFilterDropdown';
import FeedFilterTagsContainer from './FeedFilterTagsContainer';

const FeedTopBar = props => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [filterInputFocused, setFilterInputFocused] = useState(false);
    const [dropdownMenuFocused, setDropdownMenuFocused] = useState(false);
    let viewableTags = useRef([]);

    useEffect(() => {
        if (filterInputFocused === false && dropdownMenuFocused === false) {
            setDropdownOpen(false);
        } else {
            setDropdownOpen(true);
        }
    }, [filterInputFocused, dropdownMenuFocused])

    return (
        <>
            <Container id="feed-top-bar-container">
                <NewThreadButton setCreateNewThread={props.setCreateNewThread} />
                <FeedFilter setFilterInputFocused={setFilterInputFocused} />
            </Container>
            <FeedFilterDropdown dropdownOpen={dropdownOpen} 
                                setDropdownOpen={setDropdownOpen}
                                setDropdownMenuFocused={setDropdownMenuFocused} 
                                selectedTags={props.selectedTags}
                                setSelectedTags={props.setSelectedTags}
                                viewableTags={viewableTags} />
            <FeedFilterTagsContainer selectedTags={props.selectedTags}
                                     setSelectedTags={props.setSelectedTags}
                                     viewableTags={viewableTags} />
        </>
    );
}
export default FeedTopBar;

FeedTopBar.propTypes = {
    loginState: propTypes.string.isRequired,
    setCreateNewThread: propTypes.func.isRequired,
    selectedTags: propTypes.array.isRequired,
    setSelectedTags: propTypes.func.isRequired
}