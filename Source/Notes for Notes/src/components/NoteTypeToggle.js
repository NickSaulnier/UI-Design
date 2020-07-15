import React, { useState } from 'react';
import { Button, ButtonGroup} from 'reactstrap';

const NoteTypeToggle = props => {
    const BUTTON_SELECTED_TAG = "note-type-button-selected";
    const BUTTON_TAG = "note-type-button";
    const TEXT = "Text";
    const URL = "Url";
    const TEXT_CLASS = "text-button-selector text-medium-small";
    const URL_CLASS = "link-button-selector text-medium-small";

    const [textButtonId, setTextButtonId] = useState(BUTTON_SELECTED_TAG);
    const [urlButtonId, setUrlButtonId] = useState(BUTTON_TAG);

    const toggleSelectedId = buttonClicked => {
        if (buttonClicked === TEXT) {
            setTextButtonId(BUTTON_SELECTED_TAG);
            setUrlButtonId(BUTTON_TAG);
        } else {
            setTextButtonId(BUTTON_TAG);
            setUrlButtonId(BUTTON_SELECTED_TAG);
        }
    }

    const toggleNoteType = buttonClicked => {
        if ((buttonClicked === TEXT && props.typeText === false) || 
            (buttonClicked === URL && props.typeText === true)) {
            props.setTypeText(!props.typeText);

            props.setUrlInput({
                urlInput: "",
                isValid: undefined
            });

            props.setUrlDisplayTextInput({
                urlDisplayTextInput: "",
                isValid: undefined,
                invalidMsg: ""
            });

            props.setTitleInput({
                titleInput: "",
                isValid: undefined
            });

            props.setTextInput({
                textInput: "",
                isValid: undefined,
                invalidMsg: ""
            });

            toggleSelectedId(buttonClicked);
        }
    };

    return(
        <ButtonGroup>
            <Button color="secondary" className={TEXT_CLASS} 
                    id={textButtonId} 
                    onClick={() => toggleNoteType(TEXT)} 
                    disabled={props.formDisabled === true || props.editMode === true}>
                {TEXT}
            </Button>
            <Button color="secondary" className={URL_CLASS}
                    id={urlButtonId} 
                    onClick={() => toggleNoteType(URL)} 
                    disabled={props.formDisabled === true || props.editMode === true}>
                {"Link"}
            </Button>
        </ButtonGroup>
    );
}

export default NoteTypeToggle;