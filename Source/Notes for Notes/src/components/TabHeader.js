import React from 'react';
import TabButton from './TabButton.js';

const TabHeader = props =>
    <div>
        <h1 id="tab-pane-header">Projects</h1>
        {
            Object.keys(props.appData).map((project, i) => (
                <TabButton 
                    key={i}
                    projectName={project}
                    id={i}
                    tabSelected={props.tabSelected}
                    projectSelected={props.projectSelected}
                    currentTab={props.currentTab} />
            ))
        }
    </div>

export default TabHeader