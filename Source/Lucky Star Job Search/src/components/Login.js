import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Input, Alert, Button } from 'reactstrap';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { validateUser } from '../redux/actions';
import { LOGIN_STATE } from '../redux/storeConstants';

let editingBegun = false;

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const loginState = useSelector(state => state.loginState);

    const dispatch = useDispatch();

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
        editingBegun = false;
        setUsername("");
        setPassword("");
    }

    return(
        <>
        {
            !editingBegun && loginState === LOGIN_STATE.INVALID_LOGIN &&
                <Alert className="login-alert" color="danger">Invalid username / password!</Alert>
        }
        {
            !editingBegun && loginState === LOGIN_STATE.NETWORK_ERROR &&
                <Alert className="login-alert" color="danger">Unable to connect to the server.</Alert>
        }
        <Container>
            <Row className="my-4">
                <Col>
                    <Container className="input-container pill-container elevation-level1">
                        <FontAwesomeIcon icon={faUser} className="icon-input"/>
                        <Input type="text" name="username"
                               className="login-input pill-container"
                               placeholder="Username"
                               id="username-input"
                               value={username} onChange={e => {
                                  editingBegun = true;
                                  setUsername(e.target.value);
                               }}
                               onKeyUp={e => handleKeyPress(e)} 
                               aria-label="Username"/>
                    </Container>
                </Col>
            </Row>
            <Row className="my-4">
                <Col>
                    <Container className="input-container pill-container elevation-level1">
                        <FontAwesomeIcon icon={faLock} className="icon-input" />
                        <Input type="text" name="password"
                               className="login-input pill-container"
                               placeholder="Password"
                               id="password-input"
                               value={password} onChange={ e => {
                                   editingBegun = true;
                                   setPassword(e.target.value);
                               }}
                               aria-label="Password"/>
                    </Container>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button className="pill-container elevation-level1" id="login-button"
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