import React from 'react';
import propTypes from 'prop-types';
import { Container, Input } from 'reactstrap';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import INPUT_TYPE from '../data/loginConstants';

const TextInputForm = props => {
    return (
    <Container className="input-container pill-container">
    {
        props.inputType === INPUT_TYPE.USERNAME ?
            <FontAwesomeIcon icon={faUser} className="icon-input" />
        :
            <FontAwesomeIcon icon={faLock} className="icon-input" />
    }
        <Input type="text" 
               name={props.inputType === INPUT_TYPE.USERNAME ? "username" : "password"}
               className="login-input pill-container"
               placeholder={props.inputType === INPUT_TYPE.USERNAME ? "Username" : "Password"}
               value={props.inputValue}
               onChange={e => {
                   props.editingBegun.current = true;
                   props.setInputValue(e.target.value);
               }}
               onKeyUp={e => props.handleKeyPress(e)}
               aria-label={props.inputType === INPUT_TYPE.USERNAME ? "Username" : "Password"} />
    </Container>
    );
}

export default TextInputForm;

TextInputForm.propTypes = {
    inputValue: propTypes.string.isRequired,
    setInputValue: propTypes.func.isRequired,
    handleKeyPress: propTypes.func.isRequired,
    editingBegun: propTypes.object.isRequired,
    inputType: propTypes.oneOf([INPUT_TYPE.USERNAME, INPUT_TYPE.PASSWORD]).isRequired
}