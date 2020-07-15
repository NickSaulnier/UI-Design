import React from 'react';
import { Button } from 'reactstrap'

const EditNoteButton = props =>
    <Button color="secondary" className="text-medium-small" id="edit-note-button" 
            onClick={props.onEditButtonClick} 
            disabled={!props.formDisabled}>
        {"Edit Note"}
    </Button>

export default EditNoteButton;