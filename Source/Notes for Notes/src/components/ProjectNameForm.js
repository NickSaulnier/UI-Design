import React from 'react';
import { Button, Form, FormFeedback, Input } from 'reactstrap';
import { MAX_PROJECT_LEN, spacesRegex } from './NoteForm.js';

const ProjectNameForm = props => {
    const projectNameFormSubmit = event => {
        props.setProjectName(props.formProjectName.projectName);
        event.preventDefault();
        props.toggleDropDown();
    }

    const onProjectInputChange = event => {
        if (event.target.value.length > MAX_PROJECT_LEN) {
            props.setFormProjectName({
                projectName: event.target.value,
                isValid: false,
                invalidMsg: "Project Name cannot be longer than " + MAX_PROJECT_LEN + " characters"
            });
        } else if (event.target.value in props.appData) {
            props.setFormProjectName({
                projectName: event.target.value,
                isValid: false,
                invalidMsg: "Project name must be unique"
            });
        } else if ((event.target.value === "")) {
            props.setFormProjectName({
                projectName: "",
                isValid: undefined,
                invalidMsg: ""
            });
        } else if (spacesRegex.test(event.target.value)) {
            props.setFormProjectName({
                projectName: event.target.value,
                isValid: false,
                invalidMsg: "Project name cannot be empty"
            });
        } else {
            props.setFormProjectName({
                projectName: event.target.value,
                isValid: true,
                invalidMsg: ""
            });
        }
    }

    return (
        <>
        <Form onSubmit={projectNameFormSubmit}>
            <Input type="text" name="projectNameEntry"
                   className="text-small"
                   id="new-project-form"
                   value={props.formProjectName.projectName}
                   onChange={e => onProjectInputChange(e)} 
                   valid={props.formProjectName.isValid === true} 
                   invalid={props.formProjectName.isValid === false} 
                   tabIndex={0}/>
            <FormFeedback invalid="true"
                          id="project-name-entry-feedback" tabIndex={0}>
                {props.formProjectName.invalidMsg}
            </FormFeedback>
            <Button type="submit" color="secondary"
                    id="project-name-submit-btn" 
                    disabled={!props.formProjectName.isValid}>
                Submit
            </Button>
        </Form>
        </>
    );
}

export default ProjectNameForm;