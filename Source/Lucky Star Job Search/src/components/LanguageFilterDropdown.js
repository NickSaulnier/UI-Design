import React from 'react';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const LanguageFilterDropdown = props => {

    const handleItemSelect = languageSelection => {
        let newSelectedFilters = [...props.selectedFilters];
        newSelectedFilters.push(languageSelection);
        props.setSelectedFilters(newSelectedFilters);
        removeSearchableLanguage(languageSelection);
        props.setDropdownOpen(false);
        props.setCurrentInput("");
    }

    const removeSearchableLanguage = languageSelection => {
        let newSearchableLanguages = [];
        for (let i = 0; i < props.searchableLanguages.length; i++) {
            if (props.searchableLanguages[i] !== languageSelection) {
                newSearchableLanguages.push(props.searchableLanguages[i]);
            }
        }
        props.setSearchableLanguages(newSearchableLanguages);
    }

    return (
        <UncontrolledDropdown isOpen={props.dropdownOpen}>
            <DropdownToggle id="language-filter-dropdown-toggle"
                            color="white"
                            tabIndex={-1}>
            </DropdownToggle>
            <DropdownMenu className="elevation-level1"
                          id="language-filter-dropdown-menu" tabIndex={2}>
            {
                props.visibleFilters.map((languageSelection, i) => (
                    <DropdownItem key={i} className="filter-dropdown-item"
                                  onClick={() => handleItemSelect(languageSelection)}
                                  tabIndex={0}>
                        {languageSelection}
                    </DropdownItem>
                ))
            }
            </DropdownMenu>
        </UncontrolledDropdown>
    );
}

export default LanguageFilterDropdown;