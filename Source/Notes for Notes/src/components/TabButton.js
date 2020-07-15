import React, { Component } from 'react';
import { Button } from 'reactstrap';

const MAX_NAME_DISPLAY = 16;

class TabButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeTab: null,
            currentProject: null
        }
    }

    toggle(event, id, projectName, projectSelected, tabSelected) {
        this.resetSelectedElements();
        tabSelected(id);
        projectSelected(projectName);
        let newClassName = "tab-button selected btn btn-outline-secondary";
        let selectId = "btn" + id.toString();
        document.getElementById(selectId).className = newClassName;
        this.setActiveTab(id);
        this.setCurrentProject(projectName);
    }

    resetSelectedElements() {
        if (this.state.activeTab != null) {
            let idName = "btn" + this.state.activeTab;
            document.getElementById(idName).className = "tab-button unselected btn btn-outline-secondary"
        }
    }

    setActiveTab(tab) {
        this.setState((state) => {
            return {activeTab: tab}
        });
    }

    setCurrentProject(projectName) {
        this.setState((state) => {
            return {currentProject: projectName}
        });
    }



    render () {
        const stateClass = this.props.id === this.props.currentTab ?
                                "selected" : "unselected";

        return (
            <Button outline color="secondary"
                    className={"tab-button " + stateClass}
                    id={"btn" + this.props.id}
                    onClick={() => this.toggle(this, this.props.id, this.props.projectName, this.props.projectSelected, this.props.tabSelected)}
            >
            {this.props.projectName.length > MAX_NAME_DISPLAY ? this.props.projectName.substring(0, MAX_NAME_DISPLAY) + "..." : this.props.projectName}
            </Button>
        );
    }
}

export default TabButton;