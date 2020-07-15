import React from 'react';
import { Button } from 'reactstrap'

const FormSubmitButton = props => 
    <Button type="submit" color="secondary" id="submit-note-button" 
            className="text-medium-small"
            disabled={!props.canSubmit}>
        Submit
    </Button>

export default FormSubmitButton;