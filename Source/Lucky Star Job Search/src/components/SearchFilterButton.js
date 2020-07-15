import React from 'react';
import { Button } from 'reactstrap';
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SearchFilterButton = props => 
        <Button className="elevation-level1" color="secondary" 
                id="search-filter-button"
                onClick={props.onSearchHandle}>
            <FontAwesomeIcon icon={faSearch} />
            <span>&nbsp;&nbsp;Search</span>
        </Button>

export default SearchFilterButton;