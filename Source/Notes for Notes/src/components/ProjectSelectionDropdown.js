import React, { useState } from 'react';
import { Col, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import ProjectNameForm from './ProjectNameForm.js';

const ProjectSelectionDropdown = props => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropDown = () => setDropdownOpen(prevState => !prevState);

    const displayDropDownItem = proj => {
        return(
            <DropdownItem className="dropdown-item text-small" 
                          key={proj}
                          onClick={() => props.setProjectName(proj)} tabIndex={0}>
                {proj}
            </DropdownItem>
        );
    }

    return (
        <Dropdown id="modal-dropdown" isOpen={dropdownOpen} 
                  toggle={toggleDropDown}
                  disabled={props.editMode === true}>
            <DropdownToggle className="text-medium-small" id="modal-dropdown-toggle" 
                            caret disabled={props.formDisabled === true || props.editMode === true}>
                {"Project"}
            </DropdownToggle>
            <Col className="my-2">
                <DropdownMenu id="dropdown-menu" tabIndex={0}>
                    <Col id="dropdown-form-col">
                        <DropdownItem className="text-small" id="dropdown-form-header" 
                                      header tabIndex={0}>
                            {"Create new project"}
                        </DropdownItem>
                        <ProjectNameForm setProjectName={props.setProjectName}
                                         setFormProjectName={props.setFormProjectName}
                                         toggleDropDown={toggleDropDown}
                                         formProjectName={props.formProjectName}
                                         appData={props.appData} />
                    </Col>
                    <DropdownItem divider />
                    <DropdownItem className="text-small" id="dropdown-item-header" header>
                        {"Select existing project"}
                    </DropdownItem>
                    {
                        Object.keys(props.appData).map((proj) => (
                            displayDropDownItem(proj)
                        ))
                    }
                </DropdownMenu>
            </Col>
        </Dropdown>
    );
}

export default ProjectSelectionDropdown;