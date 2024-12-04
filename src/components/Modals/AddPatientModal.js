
import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import StepFormFirst from "../StepForm/StepFormFirst";
import StepFormSecond from "../StepForm/StepFormSecond";
import StepFormThird from "../StepForm/StepFormThird";
import LastStep from "../StepForm/LastStep";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { get_trainers } from "../../redux/slices/commonDataSlice/getTrainersSlice";
import ConfirmForm from "../StepForm/ConfirmForm";
import { patient_onboarding_api, clear_patient_onboarding_state } from "../../redux/slices/patientSlice/patientOnboardingSlice";
import toast from "react-hot-toast";
import { get_patients_list } from "../../redux/slices/patientSlice/getPatientList";

const AddpatientModal = ({ showPateintModal, setshowPateintModal, tab, common_data }) => {
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
    const [step_form_open, setStep_form_open] = useState(true)
    const [stepOnefullData, setStepOneFullData] = useState()
    const [stepThreefullData, setStepThreeFullData] = useState()
    const [is_health_issue, setIs_health_issue] = useState(false)
    const [selected_health_issue, setSelected_health_issue] = useState([])
    const [height_unit, setHeight_unit] = useState("cm")
    const [weight_unit, setWeight_unit] = useState("kg")
    const [trainer_name, setTrainer_name] = useState("")
    const [third_step_weight_unit, setThird_step_Weight_unit] = useState("kg")
    const [step_four_additional_information, setStep_four_additional_information] = useState("")
    const [workout_frequency, setWorkout_frequency] = useState()

    const onboarding_process = useSelector((store) => store.ONBOARD_PATIENT)
    const trainers_data = useSelector((store) => store.TRAINERS_LIST)
    const handleClose = () => {
        setshowPateintModal(false)
    }

    useEffect(() => {

        dispatch(get_trainers())
    }, [])

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

    const handleSubmit = () => {
        dispatch(patient_onboarding_api({ step, stepOnefullData, selected_health_issue,trainer_name, height_unit, weight_unit, stepThreefullData, third_step_weight_unit, step_four_additional_information, workout_frequency }))
    }

    useEffect(() => {
        if (stepThreefullData?.workoutFrequency) {
            const array = stepThreefullData?.workoutFrequency.split(',');
            setWorkout_frequency(array)
        }
    }, [stepThreefullData]);


    useEffect(() => {
        if (onboarding_process?.isSuccess) {
            if (step === 2) {
                toast.success(onboarding_process?.message?.message)
                handleClose()
                setStep_form_open(true)
                setIs_health_issue(false)
                setStep(1)
                setStepOneFullData()
                setSelected_health_issue("")
                dispatch(get_patients_list({ page: 1, tab: tab }))
                dispatch(clear_patient_onboarding_state())
                
            }
            if (step === 4) {
                toast.success(onboarding_process?.message?.message)
                setStep_form_open(true)
                setIs_health_issue(false)
                setStep(1)
                setStepOneFullData()
                setSelected_health_issue("")
                dispatch(get_patients_list({ page: 1, tab: tab }))
                dispatch(clear_patient_onboarding_state())
                handleClose()

            }
        }
        if (onboarding_process?.isError) {
            toast.error(onboarding_process?.error?.message)
            dispatch(clear_patient_onboarding_state())
        }
    }, [onboarding_process])

    return (
        <div>
            <Modal show={showPateintModal} onHide={handleClose} className="cmn_modal addPatient" centered size="md">
                <div className="modal_head text-end">
                <svg type="button" onClick={handleClose} width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M24.2798 2.6503C24.4239 2.50636 24.5383 2.33545 24.6163 2.14733C24.6944 1.9592 24.7346 1.75754 24.7348 1.55386C24.7349 1.35019 24.6949 1.14848 24.6171 0.960257C24.5392 0.772036 24.4251 0.600986 24.2812 0.456876C24.1372 0.312765 23.9663 0.198416 23.7782 0.120356C23.5901 0.0422964 23.3884 0.00205508 23.1847 0.0019299C22.9811 0.00180471 22.7794 0.0417981 22.5911 0.119627C22.4029 0.197455 22.2319 0.311594 22.0877 0.455528L12.7344 9.8089L3.38369 0.455528C3.09265 0.164483 2.69791 0.000976559 2.28631 0.000976562C1.87471 0.000976566 1.47997 0.164483 1.18893 0.455528C0.897882 0.746572 0.734375 1.14131 0.734375 1.55291C0.734375 1.96451 0.897882 2.35925 1.18893 2.6503L10.5423 12.001L1.18893 21.3517C1.04482 21.4958 0.930501 21.6668 0.852509 21.8551C0.774517 22.0434 0.734375 22.2452 0.734375 22.449C0.734375 22.6528 0.774517 22.8546 0.852509 23.0429C0.930501 23.2312 1.04482 23.4023 1.18893 23.5464C1.47997 23.8375 1.87471 24.001 2.28631 24.001C2.49011 24.001 2.69192 23.9608 2.88021 23.8828C3.0685 23.8048 3.23958 23.6905 3.38369 23.5464L12.7344 14.193L22.0877 23.5464C22.3788 23.8371 22.7734 24.0003 23.1847 24C23.5961 23.9998 23.9905 23.8361 24.2812 23.5451C24.5719 23.254 24.735 22.8594 24.7348 22.4481C24.7345 22.0367 24.5709 21.6423 24.2798 21.3517L14.9264 12.001L24.2798 2.6503Z" fill="black"/>
                    </svg>
                </div>
                <Modal.Body className="p-0">
                        {!is_health_issue && (
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
                                        className={`step d-flex align-items-center justify-content-center ${
                                            isActive ? 'active' : isDone ? 'done' : ''
                                        }`}
                                        >
                                        {stepNumber}
                                        </li>
                                        {stepNumber < 4 && <li style={{backgroundColor: isDone ? '#0C5E62' : '#EFF0F6'}} className={`line_bar ${ isActive ? 'active' : isDone ? 'done' : ''}`}></li>}
                                    </React.Fragment>
                                    );
                                })}
                                </ul>
                            )}
                    {step === 1 && step_form_open && <StepFormFirst gender={gender} goal={goal} trainers_list={trainers_list} setStep={setStep} setStepOneFullData={setStepOneFullData} stepOnefullData={stepOnefullData} setHeight_unit={setHeight_unit} height_unit={height_unit} setWeight_unit={setWeight_unit} weight_unit={weight_unit} setTrainer_name={setTrainer_name} />}
                    {step === 2 && step_form_open && <StepFormSecond health_issue={health_issue} setStep={setStep} setIs_health_issue={setIs_health_issue} setSelected_health_issue={setSelected_health_issue} selected_health_issue={selected_health_issue} is_health_issue={is_health_issue}   setStep_form_open={setStep_form_open}/>}
                    {step === 3 && step_form_open && <StepFormThird discomfort_issue={discomfort_issue} activity_level={activity_level} weekDays={weekDays} sleep_rate={sleep_rate} workout_type={workout_type} workout_place={workout_place} equipments={equipments} workout_times={workout_times} setStep={setStep} setStepThreeFullData={setStepThreeFullData} stepThreefullData={stepThreefullData}  setThird_step_Weight_unit={setThird_step_Weight_unit} third_step_weight_unit={third_step_weight_unit} />}
                    {step === 4 && step_form_open && <LastStep setStep={setStep} setStep_four_additional_information={setStep_four_additional_information} step_four_additional_information={step_four_additional_information} handleSubmit={handleSubmit} onboarding_process={onboarding_process} />}
                    {is_health_issue && <ConfirmForm setStep={setStep} setIs_health_issue={setIs_health_issue} setStep_form_open={setStep_form_open} setshowPateintModal={setshowPateintModal} handleSubmit={handleSubmit} onboarding_process={onboarding_process}/>}
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default AddpatientModal;
