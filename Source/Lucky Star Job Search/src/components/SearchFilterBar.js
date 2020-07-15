import React, { useState, useEffect } from 'react';
import { Row, Col, Container } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { retrieveAllSearchableLanguages } from '../redux/actions';
import LanguageFilterInput from './LanguageFilterInput';
import LanguageFilterDropdown from './LanguageFilterDropdown';
import SearchFilterButton from './SearchFilterButton';
import LanguageFilterPill from './LanguageFilterPill';

const SearchFilterBar = props => {
    const [searchableLanguages, setSearchableLanguages] = useState([]);
    const [currentInput, setCurrentInput] = useState("");
    const [visibleFilters, setVisibleFilters] = useState([]);
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const dispatch = useDispatch();
    const languages = useSelector(state => state.searchableLanguages);

    useEffect(() => {
        dispatch(retrieveAllSearchableLanguages());
    }, [dispatch])

    useEffect(() => {
        setVisibleFilters(searchableLanguages);
        if (searchableLanguages.length === 0 && selectedFilters.length === 0) {
            setSearchableLanguages(languages);
        }
    }, [languages, searchableLanguages, selectedFilters.length])

    useEffect(() => {
        if (currentInput === "") {
            setVisibleFilters(searchableLanguages);
        } else {
            const inputLen = currentInput.length;
            const currentInputLower = currentInput.toLowerCase();
            let newVisibleFilters = [];

            for (const filterString of searchableLanguages) {
                if ((filterString.length >= inputLen) && 
                    (currentInputLower === filterString.substring(0, inputLen).toLowerCase())) {
                    newVisibleFilters.push(filterString);
                }
            }

            setVisibleFilters(newVisibleFilters);
        }
    }, [currentInput, searchableLanguages, selectedFilters])

    const onSearchHandle = () => {
        props.setLanguageFilters(selectedFilters);
        props.setViewFavorites(false);
        setCurrentInput("");
    }

    const languageFilterInput = document.getElementById("language-filter-input");
    const dropdownMenu = document.getElementById("language-filter-dropdown-menu");
    const menuItem = document.getElementsByClassName("filter-dropdown-item")[0];

    if (languageFilterInput !== null) {
        languageFilterInput.addEventListener('focusin', (event) => {
            setDropdownOpen(true);
        });

        languageFilterInput.addEventListener('focusout', (event) => {
            setTimeout(() => {
                if (document.activeElement !== dropdownMenu) {
                    setDropdownOpen(false);
                }
            }, 200);
        });
    }  

    if (dropdownMenu !== null) {
        dropdownMenu.addEventListener('focusin', (event) => {
            setDropdownOpen(true);
        });

        dropdownMenu.addEventListener('focusout', (event) => {
            setTimeout(() => {
                if (document.activeElement !== menuItem) {
                    setDropdownOpen(false);
                }
            }, 200)
        });
    }

    return (
        <div className="elevation-level1" id="search-filter-bar-container">
            <Container id="filter-orientator">
                <Row className="mt-3">
                    <Col className="ml-2">
                        <LanguageFilterInput currentInput={currentInput}
                                             setCurrentInput={setCurrentInput}
                                             onSearchHandle={onSearchHandle} />
                        <LanguageFilterDropdown dropdownOpen={dropdownOpen}
                                                setDropdownOpen={setDropdownOpen}
                                                selectedFilters={selectedFilters}
                                                setSelectedFilters={setSelectedFilters}
                                                searchableLanguages={searchableLanguages}
                                                setSearchableLanguages={setSearchableLanguages} 
                                                visibleFilters={visibleFilters} 
                                                setCurrentInput={setCurrentInput}/>
                        <SearchFilterButton onSearchHandle={onSearchHandle} />                 
                    </Col>
                    <Col>
                        <Container className="mt-2 ml-2" id="filter-pills-container">
                        {
                            selectedFilters.map((filter, i) => (
                                <LanguageFilterPill key={i} filter={filter}
                                                    selectedFilters={selectedFilters}
                                                    setSelectedFilters={setSelectedFilters}
                                                    searchableLanguages={searchableLanguages}
                                                    setSearchableLanguages=
                                                        {setSearchableLanguages}/>
                            ))
                        }
                        </Container>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default SearchFilterBar;