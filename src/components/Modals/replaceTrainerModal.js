import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
import { delete_staff, clear_delete_staff_state } from '../../redux/slices/staffSlice/deleteStaff';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';
import toast from 'react-hot-toast';
import { get_all_staff } from '../../redux/slices/staffSlice/getAllUsers';

const ReplaceTrainerModal = ({ trainers_list, setReplaced_trainer, replaces_trainer, exerciseCount, setStaffId, staffId }) => {
    const dispatch = useDispatch()
    const [replaced_trainer_id, setReplacedTrainer_id] = useState(null)
    const [replaced_trainer_name, setTrainer_name] = useState("")
    const is_staff_deleted = useSelector((store) => store.DELETE_STAFF)

    const handleClose = () => {
        setReplaced_trainer(false)
        setStaffId(null)
    }

    const handleDelete = () => {
        dispatch(delete_staff({ id: staffId, replacedTrainerId: replaced_trainer_id }))
    }

    useState(() => {
        if (is_staff_deleted?.isSuccess) {
            toast.success(is_staff_deleted?.message?.message)
            dispatch(get_all_staff())
            dispatch(clear_delete_staff_state())
            handleClose()
        }
        if (is_staff_deleted?.isError) {
            toast.error(is_staff_deleted?.error?.message)
            dispatch(clear_delete_staff_state())
        }
    }, [is_staff_deleted])
    return (
        <Modal
            show={replaces_trainer}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            onHide={handleClose}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Assign exercises
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>The trainer you are trying to delete has created {exerciseCount} {exerciseCount > 1 ? "exercises" : "exercise"}. Please assign {exerciseCount > 1 ? "these" : "this"} {exerciseCount > 1 ? "exercises" : "exercise"} to a new trainer before proceeding.</h4>
                <Dropdown className="d-inline mx-2" autoClose="inside">
                    <Dropdown.Toggle id="dropdown-autoclose-inside">
                        {replaced_trainer_name ? replaced_trainer_name : "Select Trainer"}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {trainers_list?.map((trainer) => {
                            if (trainer?.id !== staffId) {
                                return (
                                    <Dropdown.Item onClick={() => { setReplacedTrainer_id(trainer?.id); setTrainer_name(trainer?.firstName) }}>{trainer?.firstName} {trainer?.totalExercises}</Dropdown.Item>
                                )
                            }
                        })}
                    </Dropdown.Menu>
                </Dropdown>
            </Modal.Body>
            <Modal.Footer>
                {!is_staff_deleted?.isLoading ? <button className='cmn_btn' onClick={() => handleDelete()}>Delete</button>
                    :
                    <button className='cmn_btn'> <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner></button>}
                <button className='btn btn-secondary' onClick={() => handleClose()}>Cancel</button>
            </Modal.Footer>
        </Modal>
    );
}

export default ReplaceTrainerModal