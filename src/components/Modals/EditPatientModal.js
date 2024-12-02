
import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import EditStepFormFirst from "../StepForm/EditStepFormFirst";
import EditStepFormSecond from "../StepForm/EditStepFormSecond";
import EditStepFormThird from "../StepForm/EditStepFormThird";
import EditLastStep from "../StepForm/EditLastStep"

import { common_data_api } from "../../redux/slices/commonDataSlice/commonDataDlice";
import { get_trainers } from "../../redux/slices/commonDataSlice/getTrainersSlice";
import { useDispatch, useSelector } from "react-redux";
import { get_selected_patient, clear_selected_patient_state } from "../../redux/slices/patientSlice/getSelectedPatientSlice";
import ConfirmForm from "../StepForm/ConfirmForm";
import { update_patient, clear_update_patient_state } from "../../redux/slices/patientSlice/updatePatientSlice";
import toast from "react-hot-toast";
import { get_patients_list } from "../../redux/slices/patientSlice/getPatientList";




const EditpatientModal = ({ showPateintModal, setshowPateintModal, tab, patientId, page, setPatientId }) => {

    const dispatch = useDispatch()

    const [equipments, setEquipments] = useState([])
    const [activity_level, setActivity_level] = useState([])
    const [discomfort_issue, setDiscomfort_issue] = useState([])
    const [gender, setGender] = useState([])
    const [goal, setGoal] = useState([])
    const [health_issue, setHealth_issue] = useState([])
    const [sleep_rate, setSleep_rate] = useState([])
    const [weekDays, setWeekDays] = useState([])
    const [workout_place, setWorkout_place] = useState([])
    const [workout_times, setWorkout_times] = useState([])
    const [workout_type, setWorkout_type] = useState([])
    const [trainers_list, setTrainers_list] = useState([])
    const [step, setStep] = useState(1)
    const [patient_all_data, setPatient_all_data] = useState()
    const [height_unit, setHeight_unit] = useState()
    const [weight_unit, setWeight_unit] = useState()
    const [third_step_weight_unit, setThird_step_Weight_unit] = useState()
    const [stepOnefullData, setStepOneFullData] = useState()
    const [stepThreefullData, setStepThreeFullData] = useState()
    const [step_four_additional_information, setStep_four_additional_information] = useState("")
    const [is_health_issue, setIs_health_issue] = useState(false)
    const [step_form_open, setStep_form_open] = useState(true)
    const [selected_health_issue, setSelected_health_issue] = useState()
    const [workout_frequency, setWorkout_frequency] = useState()
    const [trainer_name, setTrainer_name] = useState("")
    const common_data = useSelector((store) => store.COMMON_DATA)
    const trainers_data = useSelector((store) => store.TRAINERS_LIST)
    const patient_data = useSelector((store) => store.SELECTED_PATIENT_DETAILS)
    const is_patient_updated = useSelector((store) => store.UPDATE_PATIENT)
    const handleClose = () => {
        setshowPateintModal(false)
        dispatch(clear_selected_patient_state())
        setStep(1)
    }

    useEffect(() => {
        dispatch(common_data_api())
        dispatch(get_trainers())
        patientId && dispatch(get_selected_patient({ id: patientId }))
    }, [patientId])

    useEffect(() => {
        if (common_data?.isSuccess) {
            setEquipments(common_data?.data?.data?.Equipments)
            setActivity_level(common_data?.data?.data?.activity_level)
            setDiscomfort_issue(common_data?.data?.data?.discomfort_issues)
            setGender(common_data?.data?.data?.gender)
            setGoal(common_data?.data?.data?.goal)
            setHealth_issue(common_data?.data?.data?.health_issues)
            setSleep_rate(common_data?.data?.data?.sleep_rate)
            setWeekDays(common_data?.data?.data?.weekDays)
            setWorkout_place(common_data?.data?.data?.workout_place)
            setWorkout_times(common_data?.data?.data?.workout_times)
            setWorkout_type(common_data?.data?.data?.workout_types)
        }
    }, [common_data])
    useEffect(() => {
        if (trainers_data?.isSuccess) {
            setTrainers_list(trainers_data?.data?.data)
        }
    }, [trainers_data])

    useEffect(() => {
        if (stepThreefullData?.workoutFrequency) {
            console.log(stepThreefullData?.workoutFrequency);
            const array = stepThreefullData?.workoutFrequency
                .split(',')
                .map(item => item.trim().charAt(0).toUpperCase() + item.trim().slice(1));
            setWorkout_frequency(array);
        }
    }, [stepThreefullData]);


    useEffect(() => {
        if (patient_data?.isSuccess) {
            setPatient_all_data(patient_data?.data?.data)
            setHeight_unit(patient_data?.data?.data?.height?.unit)
            setWeight_unit(patient_data?.data?.data?.weight?.unit)
            setThird_step_Weight_unit(patient_data?.data?.data?.optimal_weight?.unit)
            setStep_four_additional_information(patient_data?.data?.data?.additional_information)
        }
    }, [patient_data])

    const handleUpdate = () => {
        dispatch(update_patient({ id: patientId, trainer_name, stepOnefullData, selected_health_issue, height_unit, weight_unit, stepThreefullData, third_step_weight_unit, step_four_additional_information, workout_frequency, patient_details: patient_data?.data?.data }))
    }

    useEffect(() => {
        if (is_patient_updated?.isSuccess) {
            toast.success(is_patient_updated?.message?.message)
            dispatch(get_patients_list({ page, tab }))
            setStep(1)
            setPatientId(null)
            dispatch(clear_update_patient_state())
            dispatch(clear_selected_patient_state())
            handleClose()
        }
        if (is_patient_updated?.isError) {
            toast.error(is_patient_updated?.error?.message)
            dispatch(clear_update_patient_state())
        }
    }, [is_patient_updated])

    return (
        <div>
            <Modal show={showPateintModal} onHide={handleClose} className="cmn_modal addPatient" centered size="md">
                <div className="modal_head text-end">
                    <svg onClick={handleClose} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M23.5454 2.64932C23.6896 2.50539 23.8039 2.33448 23.882 2.14635C23.96 1.95823 24.0003 1.75657 24.0004 1.55289C24.0005 1.34921 23.9605 1.1475 23.8827 0.959281C23.8049 0.771059 23.6907 0.60001 23.5468 0.455899C23.4029 0.311789 23.232 0.197439 23.0438 0.11938C22.8557 0.0413198 22.654 0.00107852 22.4504 0.000953335C22.2467 0.000828148 22.045 0.0408215 21.8568 0.11865C21.6685 0.196478 21.4975 0.310618 21.3534 0.454551L12 9.80793L2.64932 0.454551C2.35827 0.163507 1.96353 -3.06665e-09 1.55193 0C1.14034 3.06665e-09 0.745595 0.163507 0.454551 0.454551C0.163507 0.745595 3.06665e-09 1.14034 0 1.55193C-3.06665e-09 1.96353 0.163507 2.35827 0.454551 2.64932L9.80793 12L0.454551 21.3507C0.31044 21.4948 0.196126 21.6659 0.118134 21.8542C0.0401417 22.0425 0 22.2443 0 22.4481C0 22.6519 0.0401417 22.8537 0.118134 23.042C0.196126 23.2302 0.31044 23.4013 0.454551 23.5454C0.745595 23.8365 1.14034 24 1.55193 24C1.75574 24 1.95755 23.9599 2.14583 23.8819C2.33412 23.8039 2.50521 23.6896 2.64932 23.5454L12 14.1921L21.3534 23.5454C21.6444 23.8361 22.039 23.9993 22.4504 23.999C22.8617 23.9988 23.2561 23.8351 23.5468 23.5441C23.8375 23.2531 24.0006 22.8585 24.0004 22.4471C24.0001 22.0358 23.8365 21.6414 23.5454 21.3507L14.1921 12L23.5454 2.64932Z" fill="black" />
                    </svg>
                </div>
                <Modal.Body className="p-0">
                    <ul className="steps">
                        <li className="step d-flex align-items-center justify-content-center">1</li>
                        <li className="line_bar"></li>
                        <li className="step d-flex align-items-center justify-content-center">2</li>
                        <li className="line_bar"></li>
                        <li className="step d-flex align-items-center justify-content-center">3</li>
                        <li className="line_bar"></li>
                        <li className="step d-flex align-items-center justify-content-center">4</li>
                    </ul>
                    {/* <h5 className="step_heading pt-3">Personal Details</h5> */}
                    {step === 1 && <EditStepFormFirst gender={gender} goal={goal} trainers_list={trainers_list} setStep={setStep} patient_all_data={patient_all_data} height_unit={height_unit} weight_unit={weight_unit} setHeight_unit={setHeight_unit} setWeight_unit={setWeight_unit} setStepOneFullData={setStepOneFullData} loading={patient_data?.isLoading} setTrainer_name={setTrainer_name} />}
                    {step === 2 && <EditStepFormSecond health_issue={health_issue} setStep={setStep} patient_all_data={patient_all_data} setSelected_health_issue={setSelected_health_issue} selected_health_issue={selected_health_issue} />}
                    {step === 3 && <EditStepFormThird discomfort_issue={discomfort_issue} activity_level={activity_level} weekDays={weekDays} sleep_rate={sleep_rate} workout_type={workout_type} workout_place={workout_place} equipments={equipments} workout_times={workout_times} setStep={setStep} patient_all_data={patient_all_data} setThird_step_Weight_unit={setThird_step_Weight_unit} third_step_weight_unit={third_step_weight_unit} setStepThreeFullData={setStepThreeFullData} stepThreefullData={stepThreefullData} />}
                    {step === 4 && <EditLastStep setStep={setStep} setStep_four_additional_information={setStep_four_additional_information} step_four_additional_information={step_four_additional_information} handleUpdate={handleUpdate} is_patient_updated={is_patient_updated} />}
                    {is_health_issue && <ConfirmForm setIs_health_issue={setIs_health_issue} setStep_form_open={setStep_form_open} setshowPateintModal={setshowPateintModal} />}
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default EditpatientModal;
