import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Container, Row, Col, FormFeedback} from 'reactstrap';
import { NOTE_TYPE } from '../data/data.js';
import NoteTypeToggle from './NoteTypeToggle.js';
import ProjectSelectionDropdown from './ProjectSelectionDropdown.js';
import FormSubmitButton from './FormSubmitButton.js';
import EditNoteButton from './EditNoteButton.js';

export const MAX_PROJECT_LEN = 60;
export const spacesRegex = RegExp(/^\s+$/);

const NoteForm = props => {
    const MAX_TITLE_LEN = 80;
    const MAX_DISPLAY_TEXT_LEN = 80;

    const [typeText, setTypeText] = useState(props.typeText);
    const [formDisabled, setFormDisabled] = useState(props.formDisabled);
    const [editMode, setEditMode] = useState(false);
    const [formProjectName, setFormProjectName] = useState({
        projectName: "",
        isValid: undefined,
        invalidMsg: ""
    });
    const [projectName, setProjectName] = useState(props.projectName);
    const [urlInput, setUrlInput] = useState({
        urlInput: props.urlInput !== undefined ? props.urlInput : "",
        isValid: undefined
    });
    const [urlDisplayTextInput, setUrlDisplayTextInput] = useState({
        urlDisplayTextInput: props.urlDisplayTextInput !== undefined ? props.urlDisplayTextInput : "",
        isValid: undefined,
        invalidMsg: ""
    })
    const [titleInput, setTitleInput] = useState({
        titleInput: props.titleInput !== undefined ? props.titleInput : "",
        isValid: undefined
    });
    const [textInput, setTextInput] = useState({
        textInput: props.textFormInput !== undefined ? props.textFormInput : "",
        isValid: undefined,
        invalidMsg: ""
    });

    const onUrlInputChange = event => {
        setUrlInput({
            urlInput: event.target.value,
            isValid: true
        });
    }

    const onUrlDisplayTextInputChange = event => {
        if (event.target.value.length > MAX_PROJECT_LEN) {
            setUrlDisplayTextInput({
                urlDisplayTextInput: event.target.value,
                isValid: false,
                invalidMsg: "Url Display Text cannot be longer than " + MAX_DISPLAY_TEXT_LEN + " characters"
            });
        } else if (spacesRegex.test(event.target.value)) {
            setUrlDisplayTextInput({
                urlDisplayTextInput: event.target.value,
                isValid: false,
                invalidMsg: "Url display text cannot be empty"
            });
        } else if (event.target.value === "") {
            setUrlDisplayTextInput({
                urlDisplayTextInput: "",
                isValid: undefined,
                invalid: ""
            });
        } else {
            setUrlDisplayTextInput({
                urlDisplayTextInput: event.target.value,
                isValid: true,
                invalidMsg: ""
            });
        }
    }

    const onTitleInputChange = event => {
        if (event.target.value > MAX_TITLE_LEN) {
            setTitleInput({
                titleInput: event.target.value,
                isValid: false
            });
        } else if (spacesRegex.test(event.target.value)) {
            setTitleInput({
                urlDisplayTextInput: event.target.value,
                isValid: false,
                invalidMsg: "Title cannot be empty"
            });
        }
        else if (event.target.value === "") {
            setTitleInput({
                textInput: "",
                isValid: undefined,
                invalidMsg: ""
            });
        } else {
            setTitleInput({
                titleInput: event.target.value,
                isValid: true
            }); 
        }
    }

    const onTextInputChange = event => {
        if (typeText) {
            if (spacesRegex.test(event.target.value)) {
                setTextInput({
                    textInput: event.target.value,
                    isValid: false,
                    invalidMsg: "Text input cannot be empty"
                });
            } else if (event.target.value === "") {
                setTextInput({
                    textInput: "",
                    isValid: undefined,
                    invalidMsg: ""
                });
            } else {
                setTextInput({
                    textInput: event.target.value,
                    isValid: true,
                    invalidMsg: ""
                });
            }
        } else {
            setTextInput({
                textInput: event.target.value,
                isValid: true,
                invalidMsg: ""
            });
        }
    }

    const displayTitleForm = () => {
        if (typeText) {
            return(
                <Row className="my-2">
                    <Col>
                        <Label for="noteTitleInput" tabIndex={0}>{"Title: "}</Label>
                        <Input type="text" name="titleText" 
                               className="text-medium-small"
                               id="form-title-input"
                               placeholder="Enter note title" 
                               value={titleInput.titleInput}
                               invalid={titleInput.isValid === false}
                               disabled={formDisabled === true}
                               onChange={e => onTitleInputChange(e)} />
                        <FormFeedback invalid="true"
                                      id="note-title-entry-feedback">
                            {titleInput.invalidMsg}
                        </FormFeedback>
                    </Col>
                </Row>
            );
        } else {
            return (
                <>
                    <Row className="my-2">
                        <Col>
                            <Label for="noteTitleInput" tabIndex={0}>{"Url: "}</Label>
                            <Input type="url" name="url" id="form-title-input" 
                                className="text-medium-small"
                                placeholder="Enter url" 
                                value={urlInput.urlInput}
                                invalid={urlInput.isValid === false}
                                disabled={formDisabled === true}
                                onChange={e => onUrlInputChange(e)} />
                            <FormFeedback invalid="true"
                                          id="note-title-entry-feedback">
                                Input must be a valid URL
                            </FormFeedback>
                        </Col>
                    </Row>
                    <Row className="my-2">
                        <Col>
                            <Label for="urlDisplayText" tabIndex={0}>{"Url Display Text (Optional): "}</Label>
                            <Input type="text" name="urlDisplayText" id="form-url-display-text"
                                className="text-medium-small"
                                placeholder="Enter url display text"
                                value={urlDisplayTextInput.urlDisplayTextInput}
                                invalid={urlDisplayTextInput.isValid === false}
                                disabled={formDisabled === true}
                                onChange={e => onUrlDisplayTextInputChange(e)}/>
                            <FormFeedback invalid="true"
                                          id="url-display-text-entry-feedback">
                                {urlDisplayTextInput.invalidMsg}
                            </FormFeedback>
                        </Col>
                    </Row>
                </>
            );
        }
    }

    const onEditButtonClick = () => {
        setFormDisabled(false);
        setEditMode(true);
    }

    let canSubmit = !formDisabled && 
        ((typeText && (titleInput.isValid === true || textInput.isValid === true)) 
        || (!typeText && (urlDisplayTextInput.isValid === true 
            || urlDisplayTextInput.isValid === undefined) && urlInput.isValid)
        || (!typeText && editMode === true && (urlDisplayTextInput.isValid === true 
            || urlDisplayTextInput.isValid === undefined) && (urlInput.isValid === true || (urlInput.isValid === undefined && textInput.isValid === true))));

    const formSubmit = event => {
        if (canSubmit === true) {
            if (editMode === true) {
                if (props.typeText === true) {                   
                    if (typeText === true) {
                        props.appData[props.projectName][props.noteIdx].title = titleInput.titleInput;
                    } else {
                        props.appData[props.projectName][props.noteIdx].type = NOTE_TYPE.TEXT;
                        delete props.appData[props.projectName][props.noteIdx].title;
                        props.appData[props.projectName][props.noteIdx].url = urlInput.urlInput;
                    }
                } else {
                    if (typeText === false) {
                        if (urlDisplayTextInput.isValid === true) {
                            props.appData[props.projectName][props.noteIdx].urlDisplayText = urlDisplayTextInput.urlDisplayTextInput;
                        }
                        props.appData[props.projectName][props.noteIdx].url = urlInput.urlInput;
                    } else {
                        props.appData[props.projectName][props.noteIdx].type = NOTE_TYPE.LINK;
                        delete props.appData[props.projectName][props.noteIdx].url;
                        props.appData[props.projectName][props.noteIdx].title = titleInput.titleInput;
                    }
                }
                props.appData[props.projectName][props.noteIdx].text = textInput.textInput;
            } else {
                if (props.appData.hasOwnProperty(projectName) === false) {
                    props.appData[projectName] = [];
                }
                
                if (typeText === true) {
                    props.appData[projectName].push({
                        type: NOTE_TYPE.TEXT,
                        title: titleInput.titleInput,
                        text: textInput.textInput
                    });
                } else {
                    if (urlDisplayTextInput.isValid === undefined) {
                        props.appData[projectName].push({
                            type: NOTE_TYPE.LINK,
                            url: urlInput.urlInput,
                            text: textInput.textInput 
                        });
                    } else {
                        props.appData[projectName].push({
                            type: NOTE_TYPE.LINK,
                            url: urlInput.urlInput,
                            urlDisplayText: urlDisplayTextInput.urlDisplayTextInput,
                            text: textInput.textInput
                        });
                    }
                }
            }
        
            event.preventDefault();
            props.updateDataObj(props.appData);
            props.closeModal();
        }
    }

    return (
        <Container>
            <Col id="modal-button-col">
                <Row id="note-type-row">
                    <NoteTypeToggle setTypeText={setTypeText}
                                    typeText={typeText}
                                    setUrlInput={setUrlInput}
                                    setUrlDisplayTextInput={setUrlDisplayTextInput}
                                    setTitleInput={setTitleInput}
                                    setTextInput={setTextInput}
                                    formDisabled={formDisabled}
                                    editMode={editMode}/>
                </Row>
                <Row>                    
                    <ProjectSelectionDropdown setFormProjectName={setFormProjectName} 
                                              setProjectName={setProjectName} 
                                              appData={props.appData}
                                              formDisabled={formDisabled}
                                              editMode={editMode} 
                                              formProjectName={formProjectName} />
  
                </Row>
            </Col>
            <Form className="note-form" onSubmit={formSubmit}>
                <FormGroup id="note-form-formgroup" tabIndex={0}>
                    {"Project: " + projectName}
                    {displayTitleForm()}
                    <Label for="noteTextInput" tabIndex={0}>{"Note Text:"}</Label>
                    <Input type="textarea" name="noteText" id="form-text-input"
                           placeholder="Enter note text"
                           value={textInput.textInput}
                           invalid={textInput.isValid === false}
                           disabled={formDisabled === true}
                           onChange={e => onTextInputChange(e)} />
                    <FormFeedback invalid="true"
                                  id="text-entry-feedback">
                        {textInput.invalidMsg}
                    </FormFeedback>
                </FormGroup>
                <Row className="my-2">
                    <Col>
                    <FormSubmitButton canSubmit={canSubmit} />
                    <EditNoteButton onEditButtonClick={onEditButtonClick}
                                    formDisabled={formDisabled}/>
                    </Col>
                </Row>
            </Form>
        </Container>
    )
}

export default NoteForm;