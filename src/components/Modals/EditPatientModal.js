
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
import { showToast } from "../../common/toast/showToast";



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
    const [third_step_weight_unit, setThird_step_Weight_unit] = useState("kg")
    const [stepOnefullData, setStepOneFullData] = useState()
    const [stepThreefullData, setStepThreeFullData] = useState()
    const [step_four_additional_information, setStep_four_additional_information] = useState("")
    const [is_health_issue, setIs_health_issue] = useState(false)
    const [step_form_open, setStep_form_open] = useState(true)
    const [selected_health_issue, setSelected_health_issue] = useState()
    const [workout_frequency, setWorkout_frequency] = useState()
    const [categoryData, setCategoryData] = useState([])
    const [trainer_name, setTrainer_name] = useState("")
    const common_data = useSelector((store) => store.COMMON_DATA)
    const trainers_data = useSelector((store) => store.TRAINERS_LIST)
    const patient_data = useSelector((store) => store.SELECTED_PATIENT_DETAILS)
    const is_patient_updated = useSelector((store) => store.UPDATE_PATIENT)
    const handleClose = () => {
        setshowPateintModal(false)
        dispatch(clear_selected_patient_state())
        setStep(1)
        setPatientId(null)
        setStepThreeFullData()
        setStepOneFullData()
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
            setCategoryData(common_data?.data?.data?.patient_category)
        }
    }, [common_data])
    useEffect(() => {
        if (trainers_data?.isSuccess) {
            setTrainers_list(trainers_data?.data?.data)
        }
    }, [trainers_data])

    useEffect(() => {
        if (stepThreefullData?.workoutFrequency) {
            const array = stepThreefullData?.workoutFrequency
                .split(',')
                .map(item => item.trim());
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
            setStep_four_additional_information()
            setWorkout_frequency()
            setStepThreeFullData()
            setStepOneFullData()
        }
        if (is_patient_updated?.isError) {
            showToast(is_patient_updated?.error?.loggedError,"ERROR")
            showToast(is_patient_updated?.error?.message,"ERROR")
            dispatch(clear_update_patient_state())
        }
    }, [is_patient_updated])

    return (
        <div>
            <Modal show={showPateintModal} onHide={handleClose} className="cmn_modal addPatient" centered size="md">
                <div className="modal_head text-end">
                    <svg type="button" onClick={handleClose} width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M24.2798 2.6503C24.4239 2.50636 24.5383 2.33545 24.6163 2.14733C24.6944 1.9592 24.7346 1.75754 24.7348 1.55386C24.7349 1.35019 24.6949 1.14848 24.6171 0.960257C24.5392 0.772036 24.4251 0.600986 24.2812 0.456876C24.1372 0.312765 23.9663 0.198416 23.7782 0.120356C23.5901 0.0422964 23.3884 0.00205508 23.1847 0.0019299C22.9811 0.00180471 22.7794 0.0417981 22.5911 0.119627C22.4029 0.197455 22.2319 0.311594 22.0877 0.455528L12.7344 9.8089L3.38369 0.455528C3.09265 0.164483 2.69791 0.000976559 2.28631 0.000976562C1.87471 0.000976566 1.47997 0.164483 1.18893 0.455528C0.897882 0.746572 0.734375 1.14131 0.734375 1.55291C0.734375 1.96451 0.897882 2.35925 1.18893 2.6503L10.5423 12.001L1.18893 21.3517C1.04482 21.4958 0.930501 21.6668 0.852509 21.8551C0.774517 22.0434 0.734375 22.2452 0.734375 22.449C0.734375 22.6528 0.774517 22.8546 0.852509 23.0429C0.930501 23.2312 1.04482 23.4023 1.18893 23.5464C1.47997 23.8375 1.87471 24.001 2.28631 24.001C2.49011 24.001 2.69192 23.9608 2.88021 23.8828C3.0685 23.8048 3.23958 23.6905 3.38369 23.5464L12.7344 14.193L22.0877 23.5464C22.3788 23.8371 22.7734 24.0003 23.1847 24C23.5961 23.9998 23.9905 23.8361 24.2812 23.5451C24.5719 23.254 24.735 22.8594 24.7348 22.4481C24.7345 22.0367 24.5709 21.6423 24.2798 21.3517L14.9264 12.001L24.2798 2.6503Z" fill="black" />
                    </svg>
                </div>
                <Modal.Body className="p-0">
                    <ul className="steps">
                        {Array.from({ length: 4 }, (_, i) => {
                            const stepNumber = i + 1;
                            const isActive = step === stepNumber; // Current active step
                            const isDone = step > stepNumber; // Completed steps

                            return (
                                <React.Fragment key={stepNumber}>
                                    <li
                                        style={{
                                            backgroundColor: isDone
                                                ? '#0C5E62'
                                                : '#EFF0F6',
                                            color: isDone
                                                ? '#fff'
                                                : '#000',
                                        }}
                                        className={`step d-flex align-items-center justify-content-center ${isActive ? 'active' : isDone ? 'done' : ''
                                            }`}
                                    >
                                        {stepNumber}
                                    </li>
                                    {stepNumber < 4 && <li style={{ backgroundColor: isDone ? '#0C5E62' : '#EFF0F6' }} className={`line_bar ${isActive ? 'active' : isDone ? 'done' : ''}`}></li>}
                                </React.Fragment>
                            );
                        })}
                    </ul>
                    {/* <h5 className="step_heading pt-3">Personal Details</h5> */}
                    {step === 1 && <EditStepFormFirst gender={gender} goal={goal} trainers_list={trainers_list} setStep={setStep} patient_all_data={patient_all_data} height_unit={height_unit} weight_unit={weight_unit} setHeight_unit={setHeight_unit} setWeight_unit={setWeight_unit} setStepOneFullData={setStepOneFullData} stepOnefullData={stepOnefullData} loading={patient_data?.isLoading} setTrainer_name={setTrainer_name} categoryData={categoryData}/>}
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
