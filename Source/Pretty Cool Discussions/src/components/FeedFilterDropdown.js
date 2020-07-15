import React, { useEffect } from 'react';
import propTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { getTags } from '../redux/actions';

const FeedFilterDropdown = props => {
    const tags = useSelector(state => state.tags);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTags());
    }, [dispatch]);

    useEffect(() => {
        props.viewableTags.current = [...tags];
    }, [tags, props.viewableTags])

    const feedFilterDropdownMenu = document.getElementById("feed-filter-dropdown-menu");

    if (feedFilterDropdownMenu !== null) {
        feedFilterDropdownMenu.addEventListener('focusin', event => {
            props.setDropdownMenuFocused(true);
        });

        feedFilterDropdownMenu.addEventListener('focusout', event => {
            props.setDropdownMenuFocused(false);
        });
    }

    const handleTagSelect = tag => {
        let newSelectedTags = [...props.selectedTags];
        newSelectedTags.push(tag);
        removeViewableTag(tag);
        props.setSelectedTags(newSelectedTags);
    }

    const removeViewableTag = tagToRemove => {
        let newViewableTags = [];
        props.viewableTags.current.forEach(tag => {
            if (tag !== tagToRemove) {
                newViewableTags.push(tag);
            }
        })
        props.viewableTags.current = newViewableTags;
    }

    return (
        <UncontrolledDropdown isOpen={props.dropdownOpen}>
            <DropdownToggle id="feed-filter-dropdown-toggle"
                            color="white">
            </DropdownToggle>
            <DropdownMenu id="feed-filter-dropdown-menu">
            {
                props.viewableTags.current.map((tag, i) => (
                    <DropdownItem key={i} onClick={() => handleTagSelect(tag)}>
                        {tag}
                    </DropdownItem>
                ))
            }
            </DropdownMenu>
        </UncontrolledDropdown>
    );
}

export default FeedFilterDropdown;

FeedFilterDropdown.propTypes = {
    dropdownOpen: propTypes.bool.isRequired,
    setDropdownOpen: propTypes.func.isRequired,
    setDropdownMenuFocused: propTypes.func.isRequired,
    viewableTags: propTypes.object.isRequired,
    selectedTags: propTypes.array.isRequired,
    setSelectedTags: propTypes.func.isRequired
}