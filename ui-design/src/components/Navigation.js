import React, { useState } from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Collapse, NavbarToggler } from 'reactstrap';
import { faLeaf } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Navbar id="navbar-body" expand="md">
                <NavbarBrand id="navbar-brand-left">Nick Saulnier</NavbarBrand>
                <NavbarToggler onClick={toggle} className="mr-2" id="navbar-toggler" />
                <Collapse isOpen={isOpen} navbar>
                    <Nav navbar>
                        <NavItem>
                            <NavLink href="https://pages.github.ccs.neu.edu/cs7580su20-seattle/Nicholas_Saulnier_Assignment2/" className="navbar-link">
                                Notes for Notes
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="https://pages.github.ccs.neu.edu/cs7580su20-seattle/nicholas_saulnier_assignment3/" className="navbar-link">
                                Pretty Ok Trivia
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="https://pages.github.ccs.neu.edu/cs7580su20-seattle/nicholas_saulnier_assignment4/" className="navbar-link">
                                Lucky Star Job Search
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="https://pages.github.ccs.neu.edu/cs7580su20-seattle/nicholas_saulnier_assignment5/" className="navbar-link">
                                Pretty Cool Discussions
                            </NavLink>
                        </NavItem>
                        <NavbarBrand id="navbar-brand-right">
                            <FontAwesomeIcon icon={faLeaf} />
                        </NavbarBrand>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
}

export default Navigation;