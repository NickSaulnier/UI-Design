import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { logout } from '../redux/actions';

const NavigationDropdown = () => {
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
                                 size="2x" />
            </DropdownToggle>
            <DropdownMenu right>
                <DropdownItem onClick={handleLogout}>
                    logout
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
}

export default NavigationDropdown;