import React from 'react';
import propTypes from 'prop-types';
import { Navbar, NavbarBrand, Button } from 'reactstrap';
import { LOGIN_STATE } from '../redux/storeConstants';
import NavigationDropdown from './NavigationDropdown';

const Navigation = props => {

    const handleLogin = () => {
        props.setOpenLoginModal(true);
    }

    return (
        <div id="navbar-container">
            <Navbar>
                <NavbarBrand id="navbar-brand">
                    Pretty Cool Discussions
                </NavbarBrand>
                {
                    props.loginState === LOGIN_STATE.LOGGED_IN ?
                        <NavigationDropdown />
                    :
                        <Button id="navbar-login-button" onClick={handleLogin}>
                            login
                        </Button>
                }
            </Navbar>
        </div>
    );
}

export default Navigation;

Navigation.propTypes = {
    loginState: propTypes.string.isRequired,
    setOpenLoginModal: propTypes.func.isRequired
}