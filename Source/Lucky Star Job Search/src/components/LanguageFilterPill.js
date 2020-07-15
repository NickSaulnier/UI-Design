import React from 'react';
import { Container, Button } from 'reactstrap';
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const LanguageFilterPill = props => {

    const onRemoveSelectedFilter = () => {
        let newSelectedFilters = [];
        for (let i = 0; i < props.selectedFilters.length; i++) {
            if (props.selectedFilters[i] !== props.filter) {
                newSelectedFilters.push(props.selectedFilters[i]);
            }
        }
        props.setSelectedFilters(newSelectedFilters);
        resetSearchableLanguages(props.filter);
    }

    const resetSearchableLanguages = filter => {
        let newSearchableLanguages = [...props.searchableLanguages];
        newSearchableLanguages.push(filter);
        props.setSearchableLanguages(newSearchableLanguages);
    }

    return (
        <Container className="filter-pill-container pill-container elevation-level1">
            <span>{props.filter}</span>
            <Button className="pill-button"
                    onClick={onRemoveSelectedFilter}>
                <FontAwesomeIcon icon={faTimes} />
            </Button>
        </Container>
    )
}

export default LanguageFilterPill;