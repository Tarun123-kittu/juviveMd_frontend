import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
import { delete_staff, clear_delete_staff_state } from '../../redux/slices/staffSlice/deleteStaff';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';
import toast from 'react-hot-toast';
import { get_all_staff } from '../../redux/slices/staffSlice/getAllUsers';
import { get_trainers } from '../../redux/slices/commonDataSlice/getTrainersSlice';

const ReplaceTrainerModal = ({
    trainers_list,
    setReplaced_trainer,
    replaces_trainer,
    exerciseCount,
    setStaffId,
    staffId,
    showToast,
    patientCount
}) => {
    const dispatch = useDispatch();
    const [replaced_trainer_id, setReplacedTrainer_id] = useState(null);
    const [replaced_trainer_name, setTrainer_name] = useState('');
    const [trainer_data, setTrainer_data] = useState([])

    const is_staff_deleted = useSelector((store) => store.DELETE_STAFF);

    const handleClose = () => {
        setReplaced_trainer(false);
        setStaffId(null);
    };

    const handleDelete = () => {
        if (replaced_trainer_id !== null) {
            dispatch(delete_staff({ id: staffId, replacedTrainerId: replaced_trainer_id }));
        }
    };

    useEffect(() => {
        if (is_staff_deleted?.isSuccess && showToast) {
            handleClose();
            toast.success(is_staff_deleted?.message?.message);
            dispatch(get_all_staff());
            dispatch(get_trainers())
            dispatch(clear_delete_staff_state());
        } else if (is_staff_deleted?.isError) {
            toast.error(is_staff_deleted?.error?.message);
            dispatch(clear_delete_staff_state());
        }
    }, [is_staff_deleted, dispatch]);


    const handleSearchTrainerName = (e) => {
        const searchQuery = e.target.value.toLowerCase();
        setTrainer_name(e.target.value);
        if (!searchQuery) {
            setTrainer_data(trainers_list); return;
        }
        const searchedNames = trainers_list?.data?.data.filter((el) => el.firstName?.toLowerCase().includes(searchQuery));
        setTrainer_data(searchedNames);
    };


    useEffect(() => {
        setTrainer_data(trainers_list)
    }, [trainers_list])

    return (
        <Modal
            show={replaces_trainer}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            onHide={handleClose}
            className="cmn_modal replaces_trainer"
        >
            <div className="modal_head text-end">
                <svg
                    type="button"
                    onClick={handleClose}
                    width="25"
                    height="24"
                    viewBox="0 0 25 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M24.2798 2.6503C24.4239 2.50636 24.5383 2.33545 24.6163 2.14733C24.6944 1.9592 24.7346 1.75754 24.7348 1.55386C24.7349 1.35019 24.6949 1.14848 24.6171 0.960257C24.5392 0.772036 24.4251 0.600986 24.2812 0.456876C24.1372 0.312765 23.9663 0.198416 23.7782 0.120356C23.5901 0.0422964 23.3884 0.00205508 23.1847 0.0019299C22.9811 0.00180471 22.7794 0.0417981 22.5911 0.119627C22.4029 0.197455 22.2319 0.311594 22.0877 0.455528L12.7344 9.8089L3.38369 0.455528C3.09265 0.164483 2.69791 0.000976559 2.28631 0.000976562C1.87471 0.000976566 1.47997 0.164483 1.18893 0.455528C0.897882 0.746572 0.734375 1.14131 0.734375 1.55291C0.734375 1.96451 0.897882 2.35925 1.18893 2.6503L10.5423 12.001L1.18893 21.3517C1.04482 21.4958 0.930501 21.6668 0.852509 21.8551C0.774517 22.0434 0.734375 22.2452 0.734375 22.449C0.734375 22.6528 0.774517 22.8546 0.852509 23.0429C0.930501 23.2312 1.04482 23.4023 1.18893 23.5464C1.47997 23.8375 1.87471 24.001 2.28631 24.001C2.49011 24.001 2.69192 23.9608 2.88021 23.8828C3.0685 23.8048 3.23958 23.6905 3.38369 23.5464L12.7344 14.193L22.0877 23.5464C22.3788 23.8371 22.7734 24.0003 23.1847 24C23.5961 23.9998 23.9905 23.8361 24.2812 23.5451C24.5719 23.254 24.735 22.8594 24.7348 22.4481C24.7345 22.0367 24.5709 21.6423 24.2798 21.3517L14.9264 12.001L24.2798 2.6503Z"
                        fill="black"
                    />
                </svg>
            </div>
            <Modal.Body className="p-0">
                <h4 className="deletmodal_heading">Delete Trainer</h4>
                <p className="trainer_delete">
                    The trainer you are trying to delete has created {exerciseCount}{' '}
                    {exerciseCount > 1 ? 'exercises' : 'exercise'} and {patientCount} Patient assigned. Please assign{' '}
                    {exerciseCount > 1 ? 'these' : 'this'} {exerciseCount > 1 ? 'exercises' : 'exercise'} to a
                    new trainer before proceeding.
                </p>

                <div className="patient_dropdown w-100">
                    <Dropdown autoClose="inside">
                        <Dropdown.Toggle id="dropdown-autoclose-inside" variant="unset">
                            {replaced_trainer_name ? replaced_trainer_name : 'Select Trainer'}
                            <svg
                                width="14"
                                height="14"
                                viewBox="0 0 14 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M12.2143 3.7041H11.1253C11.0513 3.7041 10.9816 3.7404 10.938 3.79993L6.81303 9.48579L2.68802 3.79993C2.64446 3.7404 2.57477 3.7041 2.50072 3.7041H1.41175C1.31737 3.7041 1.2622 3.81155 1.31737 3.8885L6.43697 10.9465C6.62282 11.202 7.00323 11.202 7.18763 10.9465L12.3072 3.8885C12.3639 3.81155 12.3087 3.7041 12.2143 3.7041V3.7041Z"
                                    fill="black"
                                    fillOpacity="0.25"
                                />
                            </svg>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <ul>
                                <li className='dropdown_search'>
                                    <input type="text" placeholder='Search Trainer' value={replaced_trainer_name} onChange={(e) => handleSearchTrainerName(e)} />
                                    <span type="button">
                                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12.75 12.75L15.75 15.75M2.25 8.25C2.25 9.8413 2.88214 11.3674 4.00736 12.4926C5.13258 13.6179 6.6587 14.25 8.25 14.25C9.8413 14.25 11.3674 13.6179 12.4926 12.4926C13.6179 11.3674 14.25 9.8413 14.25 8.25C14.25 6.6587 13.6179 5.13258 12.4926 4.00736C11.3674 2.88214 9.8413 2.25 8.25 2.25C6.6587 2.25 5.13258 2.88214 4.00736 4.00736C2.88214 5.13258 2.25 6.6587 2.25 8.25Z" stroke="#0C5E62" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </span>
                                </li>
                                {Array.isArray(trainer_data) && trainer_data?.length > 0 ? (
                                    trainer_data.map((list) => {
                                        if (list?.id !== staffId) {
                                            return (
                                                <Dropdown.Item key={list?.id} onClick={() => {
                                                    setTrainer_name(list?.firstName);
                                                    setReplacedTrainer_id(list?.id);
                                                }}>
                                                    {list?.firstName}
                                                </Dropdown.Item>
                                            );
                                        }
                                    })
                                ) : (
                                    <p className='m-0 p-2'>No Trainer found</p>
                                )}

                            </ul>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <div className="d-flex justify-content-end gap-3 mt-3">
                    <button className="btn cmn_btn border-btn" onClick={handleClose}>
                        Cancel
                    </button>
                    {!is_staff_deleted?.isLoading ? (
                        <button
                            onClick={handleDelete}
                            className="btn cmn_btn save_btn"
                            disabled={!replaced_trainer_name || !replaced_trainer_id}
                        >
                            Confirm
                        </button>
                    ) : (
                        <button className="btn cmn_btn save_btn d-flex justify-content-center align-items-center">
                            <Spinner
                                animation="border"
                                role="status"
                                size="sm"
                                variant="light"
                                className="ms-2 text-white"
                            />
                        </button>
                    )}
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default ReplaceTrainerModal;
