import React, {Component} from 'react';
import TabHeader from './TabHeader';
import NoteDeck from './NoteDeck';

class TabPane extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentTab: null,
            currentProject: null,
        }

        this.tabSelected = this.tabSelected.bind(this);
        this.projectSelected = this.projectSelected.bind(this);
    }

    tabSelected(tab) {
        this.setState((state) => {
            return {currentTab: tab}
        });
    }

    projectSelected(projectName) {
        this.setState((state) => {
            return {currentProject: projectName}
        });
    }

    render() {
        return (
            <div className="tab-pane">
                <TabHeader tabSelected={this.tabSelected}
                           projectSelected={this.projectSelected}
                           currentTab={this.state.currentTab}
                           appData={this.props.appData}
                           currentProject={this.state.currentProject} />               
                <NoteDeck appData={this.props.appData} 
                          projectSelected={this.state.currentProject} 
                          updateDataObj={this.props.updateDataObj}/>
            </div>
        )
    }
}

export default TabPane;