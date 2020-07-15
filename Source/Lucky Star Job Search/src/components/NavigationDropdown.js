import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { logout } from '../redux/actions';

const NavigationDropdown = props => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    }

    return (
        <Dropdown isOpen={isOpen} toggle={toggle}>
            <DropdownToggle nav caret id="navbar-dropdown-caret">
                <FontAwesomeIcon icon={faUser} id="navbar-user-icon"
                                 size="2x"/>
            </DropdownToggle>
            <DropdownMenu right>
                <DropdownItem onClick={() => props.setViewFavorites(true)}>
                    View favorites
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={handleLogout}>
                    Logout
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={() => props.setOnboardingComplete(false)}>
                    Help
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
}

export default NavigationDropdown;