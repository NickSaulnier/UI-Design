import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, Button, Col } from 'reactstrap';
import { NO_PROJECT } from '../data/data.js';
import NoteForm from './NoteForm.js';

const FormModal = props => {
    const [modal, setModal] = useState(false);

    const toggleModal = () => setModal(!modal);
    
    return (
        <Col className="my-2" fluid="true">
            <Button outline color="secondary"
                    className="white-text black-background"
                    id="form-button"
                    onClick={toggleModal}
                >
                Create Note
            </Button>
            <Modal isOpen={modal} toggle={toggleModal} className="modal-form">
                <ModalHeader toggle={toggleModal} id="modal-header" tabIndex={0}>
                {"Create Note"}
                </ModalHeader>
                <ModalBody id="modal-body">
                    <NoteForm appData={props.appData}
                              projectName={NO_PROJECT}
                              typeText={true}
                              closeModal={toggleModal}
                              updateDataObj={props.updateDataObj}/>
                </ModalBody>
            </Modal>
        </Col>
    )
}

export default FormModal;