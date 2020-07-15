import React, { useState, useRef } from 'react';
import propTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Alert, Button } from 'reactstrap';
import { validateUser } from '../redux/actions';
import { LOGIN_STATE } from '../redux/storeConstants';
import TextInputForm  from './TextInputForm';
import INPUT_TYPE from '../data/loginConstants';

const Login = props => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    let editingBegun = useRef(false);

    const dispatch = useDispatch();
    const loginState = useSelector(state => state.login.loginState);

    const handleLogin = () => {
        dispatch(validateUser(username, password));
        clearForm();
    }

    const handleKeyPress = event => {
        if (event.keyCode === 13) {
            event.preventDefault();
            handleLogin();
        }
    }

    const clearForm = () => {
        editingBegun.current = false;
        setUsername("");
        setPassword("");
    }

    return (
        <>
        {
            !editingBegun.current && loginState === LOGIN_STATE.INVALID_LOGIN &&
                <Row>
                    <Col>
                    <Alert className="login-alert" color="danger">
                        Invalid username / password!
                    </Alert>
                    </Col>
                </Row>
        }
        {
            !editingBegun.current && loginState === LOGIN_STATE.NETWORK_ERROR &&
                <Alert className="login-alert" color="danger">
                    Unable to connect to the server.
                </Alert>
        }
        <Container id="login-forms-container">
            <Row>
                <Col>
                    <TextInputForm inputValue={username} setInputValue={setUsername}
                                   handleKeyPress={handleKeyPress} 
                                   editingBegun={editingBegun}
                                   inputType={INPUT_TYPE.USERNAME} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <TextInputForm inputValue={password} setInputValue={setPassword}
                                   handleKeyPress={handleKeyPress}
                                   editingBegun={editingBegun}
                                   inputType={INPUT_TYPE.PASSWORD} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button className="pill-container" id="login-button"
                            onClick={handleLogin}>
                        Log in
                    </Button>
                </Col>
            </Row>
        </Container>
        </>
    );
}

export default Login;

Login.propTypes = {
    toggleModal: propTypes.func.isRequired
}