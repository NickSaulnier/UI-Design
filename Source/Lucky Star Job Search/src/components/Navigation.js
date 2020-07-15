import React from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import NavigationDropdown from './NavigationDropdown';

const Navigation = props => 
    <div id="navbar-container">
        <Navbar className="elevation-level1">
            <NavbarBrand className="text-shadow1 font-size-med" id="navbar-brand">
                Job Search
            </NavbarBrand>
                <NavigationDropdown setViewFavorites={props.setViewFavorites}
                                    setOnboardingComplete={props.setOnboardingComplete} />
        </Navbar>
    </div>

export default Navigation;