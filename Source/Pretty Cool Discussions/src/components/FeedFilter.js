import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import { Container, Input, Button } from 'reactstrap';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const FeedFilter = props => {
    const [currentInput, setCurrentInput] = useState("");

    useEffect(() => {
        setCurrentInput("5");
        setCurrentInput("");
    }, [])

    const handleSearchSubmit = () => {
        // handle filter submit
    }

    const feedFilterInput = document.getElementById("feed-filter-input");

    if (feedFilterInput !== null) {
        feedFilterInput.addEventListener('focusin', event => {
            props.setFilterInputFocused(true);
        });

        feedFilterInput.addEventListener('focusout', event => {
            setTimeout(() => {
                props.setFilterInputFocused(false);
            }, 100)
        });
    }

    return (
        <Container id="feed-filter-input-container">
            <Button id="feed-filter-search-button"
                    onClick={handleSearchSubmit}>
                <FontAwesomeIcon icon={faSearch} />
            </Button>
            <Input className="rounded-box-container" 
                   id="feed-filter-input" 
                   type="text" 
                   name="feed-filter"
                   placeholder="Filter by tag" 
                   value={currentInput}
                   onChange={e => {setCurrentInput(e.target.value)}} />
        </Container>
    )
}

export default FeedFilter;

FeedFilter.propTypes = {
    setFilterInputFocused: propTypes.func.isRequired
}