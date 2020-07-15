import React from 'react';
import propTypes from 'prop-types';
import { Container, Modal, ModalBody } from 'reactstrap';
import Login from './Login';

const LoginModal = props => {
    const toggleModal = () => props.setOpenLoginModal(!props.openLoginModal);

    return (
        <Container>
            <Modal isOpen={props.openLoginModal} toggle={toggleModal}
                   id="login-modal">
                <ModalBody>
                    <Login toggleModal={toggleModal} />
                </ModalBody>
            </Modal>
        </Container>
    );
}

export default LoginModal;

LoginModal.propTypes = {
    openLoginModal: propTypes.bool.isRequired,
    setOpenLoginModal: propTypes.func.isRequired
}