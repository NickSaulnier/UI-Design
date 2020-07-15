import React from 'react';
import { Input } from 'reactstrap';

const LanguageFilterInput = props => {

    const handleKeyPress = event => {
        if (event.keyCode === 13) {
            event.preventDefault();
            props.onSearchHandle();
        }
    }

    return (
        <Input className="elevation-level1" id="language-filter-input" 
                           type="text"
                           name="language-filter"
                           placeholder="Enter a skill" 
                           value={props.currentInput} 
                           onChange={e => {props.setCurrentInput(e.target.value)}} 
                           onKeyUp={e => handleKeyPress(e)}/>
    );
}

export default LanguageFilterInput;