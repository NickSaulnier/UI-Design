import React from 'react';
import { Button, Modal, ModalBody, Col, Row } from 'reactstrap';
import { STATUS } from '../views/App';

const ConfirmRequestModal = props => {
    const toggleModal = () => props.setConfirmModal(!props.confirmModal);

    const onConfirmButtonClick = () => {
        props.setStatus(STATUS.LOADING);
        props.setServingQuestions(false);
        toggleModal();
    }

    return (
        <Col>
            <Modal isOpen={props.confirmModal} toggle={toggleModal}
                   id="confirm-request-modal"
                   className="modal-global-styling">
                <ModalBody tabIndex={0}>
                {
                    "Are you sure you want to load new questions? Doing so will end " + 
                    "the current game."
                }
                </ModalBody>
                <Row>
                    <Col>
                        <Button color="secondary" 
                                className="modal-global-styling modal-btn"
                                id="yes-modal-btn"
                                onClick={() => {onConfirmButtonClick()}}
                                outline>
                            Yes
                        </Button>
                    </Col>
                    <Col>
                        <Button color="secondary"
                                className="modal-global-styling modal-btn"
                                id="no-modal-btn"
                                onClick={toggleModal}
                                outline>
                            No
                        </Button>
                    </Col>
                </Row>
            </Modal>
        </Col>
    )
}

export default ConfirmRequestModal;