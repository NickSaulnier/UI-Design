import React, { useState } from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Collapse, NavbarToggler } from 'reactstrap';

const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Navbar id="navbar-body" expand="md">
                <NavbarBrand id="navbar-brand">Nick Saulnier</NavbarBrand>
                <NavbarToggler onClick={toggle} className="mr-2" id="navbar-toggler" />
                <Collapse isOpen={isOpen} navbar>
                    <Nav navbar>
                        <NavItem>
                            <NavLink href="https://pages.github.ccs.neu.edu/cs7580su20-seattle/Nicholas_Saulnier_Assignment2/" className="navbar-link">
                                Notes for Notes
                            </NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
}

export default Navigation;