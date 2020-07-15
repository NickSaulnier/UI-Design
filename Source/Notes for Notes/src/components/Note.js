import React, { useState } from 'react';
import {Card, CardBody, CardTitle, CardSubtitle, CardText, Button, Col, Row, CardLink, Modal, ModalHeader, ModalBody} from 'reactstrap';
import { NOTE_TYPE } from '../data/data.js';
import NoteForm from './NoteForm.js';

const MAX_STR_LENGTH = 36;

const Note = props => {
    const [modal, setModal] = useState(false);

    const toggleModal = () => setModal(!modal);

    let modalBody;

    if (props.noteType === NOTE_TYPE.TEXT) {
        modalBody = <NoteForm appData={props.appData}
                              projectName={props.projectSelected}
                              typeText={true}
                              closeModal={toggleModal}
                              updateDataObj={props.updateDataObj}
                              formDisabled={true}
                              titleInput={props.noteTitle}
                              textFormInput={props.noteText}
                              noteIdx={props.noteIdx} />
    } else {
        if (props.noteObject.hasOwnProperty("urlDisplayText")) {
            modalBody = <NoteForm appData={props.appData}
                                  projectName={props.projectSelected}
                                  typeText={false}
                                  closeModal={toggleModal}
                                  updateDataObj={props.updateDataObj}
                                  formDisabled={true}
                                  urlInput={props.noteTitle}
                                  urlDisplayTextInput={props.noteObject.urlDisplayText}
                                  textFormInput={props.noteText}
                                  noteIdx={props.noteIdx} />
        } else {
            modalBody = <NoteForm appData={props.appData}
                                  projectName={props.projectSelected}
                                  typeText={false}
                                  closeModal={toggleModal}
                                  updateDataObj={props.updateDataObj}
                                  formDisabled={true}
                                  urlInput={props.noteTitle}
                                  textFormInput={props.noteText}
                                  noteIdx={props.noteIdx} />
        }
    }

    const getProjectText = projectText => {
        if (projectText.length > MAX_STR_LENGTH) {
            return projectText.substring(0, MAX_STR_LENGTH) + '...';
        } else {
            return projectText;
        } 
    }

    const formatTitle = title => {
        if (title !== undefined && title !== null) {
            if (title.length > 34) {
                return title.substring(0, 34) + '...';
            } else {
                return title;
            }
        }
    }
    
    const formatNoteTitle = (noteType, noteTitle, noteObject) => {
        if (noteType === NOTE_TYPE.TEXT) {
            return (
                <CardTitle className="note-card-title" tabIndex={0}>{formatTitle(noteTitle)}</CardTitle>
            );
        } else if (noteObject.hasOwnProperty("urlDisplayText")) {
            return (
                <>
                    <CardLink className="note-card-link" href={noteTitle} tabIndex={0}>
                        {formatTitle(noteObject.urlDisplayText)}
                    </CardLink>
                    <br></br><br></br>
                </>
            );
        } else {
            return (
                <>
                    <CardLink className="note-card-link" href={noteTitle} tabIndex={0}>
                        {formatTitle(noteTitle)}
                    </CardLink>
                    <br></br><br></br>
                </> 
            );
        }
    }

    return (
        <>
            <Card className="note-card text-left text-small">
                <CardBody className="note-card-body text-left">
                    <Row>
                        <Col className="my-2">
                            {formatNoteTitle(props.noteType, props.noteTitle, props.noteObject)}
                            <CardSubtitle className="note-card-subtitle" tabIndex={0}>
                                {"Note Type: " + props.noteType}
                            </CardSubtitle>
                            <br></br>
                            <CardText className="note-card-text" tabIndex={0}>
                                {getProjectText(props.noteText)}
                            </CardText>
                            <Button outline color="secondary"
                                    className="card-button"
                                    onClick={toggleModal}>
                            View Note
                            </Button>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
            <Modal isOpen={modal} toggle={toggleModal} className="modal-form">
                <ModalHeader toggle={toggleModal} id="modal-header">
                {"View/Edit Note"}
                </ModalHeader>
                <ModalBody id="modal-body">
                    {modalBody}
                </ModalBody>
            </Modal>
        </>
    )
}

export default Note;