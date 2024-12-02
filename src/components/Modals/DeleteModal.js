
import React from "react";
import Modal from "react-bootstrap/Modal";
import Logo from '../../Images/juviveLogo.svg'

const DeleteModal = ({ showDeleteModal, setshowDeleteModal, handleDelete }) => {
    const handleClose = () => {
        setshowDeleteModal(false)
    }

    return (
        <div>
            <Modal show={showDeleteModal} onHide={handleClose} className="cmn_modal deleteModal" centered size="md">
                <div className="modal_head text-end">
                    <svg onClick={handleClose} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M23.5454 2.64932C23.6896 2.50539 23.8039 2.33448 23.882 2.14635C23.96 1.95823 24.0003 1.75657 24.0004 1.55289C24.0005 1.34921 23.9605 1.1475 23.8827 0.959281C23.8049 0.771059 23.6907 0.60001 23.5468 0.455899C23.4029 0.311789 23.232 0.197439 23.0438 0.11938C22.8557 0.0413198 22.654 0.00107852 22.4504 0.000953335C22.2467 0.000828148 22.045 0.0408215 21.8568 0.11865C21.6685 0.196478 21.4975 0.310618 21.3534 0.454551L12 9.80793L2.64932 0.454551C2.35827 0.163507 1.96353 -3.06665e-09 1.55193 0C1.14034 3.06665e-09 0.745595 0.163507 0.454551 0.454551C0.163507 0.745595 3.06665e-09 1.14034 0 1.55193C-3.06665e-09 1.96353 0.163507 2.35827 0.454551 2.64932L9.80793 12L0.454551 21.3507C0.31044 21.4948 0.196126 21.6659 0.118134 21.8542C0.0401417 22.0425 0 22.2443 0 22.4481C0 22.6519 0.0401417 22.8537 0.118134 23.042C0.196126 23.2302 0.31044 23.4013 0.454551 23.5454C0.745595 23.8365 1.14034 24 1.55193 24C1.75574 24 1.95755 23.9599 2.14583 23.8819C2.33412 23.8039 2.50521 23.6896 2.64932 23.5454L12 14.1921L21.3534 23.5454C21.6444 23.8361 22.039 23.9993 22.4504 23.999C22.8617 23.9988 23.2561 23.8351 23.5468 23.5441C23.8375 23.2531 24.0006 22.8585 24.0004 22.4471C24.0001 22.0358 23.8365 21.6414 23.5454 21.3507L14.1921 12L23.5454 2.64932Z" fill="black" />
                    </svg>
                </div>
                <Modal.Body className="p-0">
                    <div className="text-center modal_logo">
                        <img src={Logo} alt="logo" className="m-auto" />
                    </div>
                    <h5 className="mb-3 deletmodal_heading mt-4">Are You Sure You Want to <br /> Delete This User?</h5>
                    <p>This account will be permanently deleted from your dashboard.</p>
                    <button className="cmn_btn w-100" onClick={() => handleDelete()}>Delete</button>
                    <button className="cmn_btn fade_color w-100 mt-3" onClick={() => handleClose()}>Cancel</button>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default DeleteModal;
