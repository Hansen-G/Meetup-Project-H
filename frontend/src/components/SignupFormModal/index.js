
import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupForm from './SignupForm';

function LoginFormModal() {
    const [showModal, setShowModal] = useState(false);
    const setModal = (show) => setShowModal(show);

    return (
        <>
            <button className='navButton' onClick={() => setShowModal(true)}>Sign Up</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <SignupForm setModal={setModal} />
                </Modal>
            )}
        </>
    );
}

export default LoginFormModal;