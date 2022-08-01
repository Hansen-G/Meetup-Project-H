// frontend/src/components/LoginFormModal/index.js
import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';

function LoginFormModal() {
    const [showModal, setShowModal] = useState(false);
    
    // function that returns setShwoMOdalfalse and pass as prop
    const setModal = (show) => setShowModal(show);

    return (
        <>
            <button className='navButton' onClick={() => setShowModal(true)}>Log In</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <LoginForm setModal={setModal}/>
                </Modal>
            )}
        </>
    );
}

export default LoginFormModal;