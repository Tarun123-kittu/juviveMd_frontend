
import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import StepFormFirst from "../StepForm/StepFormFirst";
import StepFormSecond from "../StepForm/StepFormSecond";
import StepFormThird from "../StepForm/StepFormThird";
import LastStep from "../StepForm/LastStep";
import { common_data_api } from "../../redux/slices/commonDataSlice/commonDataDlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { get_trainers } from "../../redux/slices/commonDataSlice/getTrainersSlice";
import ConfirmForm from "../StepForm/ConfirmForm";
import { patient_onboarding_api, clear_patient_onboarding_state } from "../../redux/slices/patientSlice/patientOnboardingSlice";
import toast from "react-hot-toast";

const AddpatientModal = ({ showPateintModal, setshowPateintModal }) => {
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
    const [third_step_weight_unit, setThird_step_Weight_unit] = useState("kg")
    const [step_four_additional_information, setStep_four_additional_information] = useState("")
    const [workout_frequency, setWorkout_frequency] = useState()
    console.log(selected_health_issue, "selected_health_issue selected_health_issue selected_health_issue")

    const onboarding_process = useSelector((store) => store.ONBOARD_PATIENT)
    const common_data = useSelector((store) => store.COMMON_DATA)
    const trainers_data = useSelector((store) => store.TRAINERS_LIST)
    const handleClose = () => {
        setshowPateintModal(false)
    }

    useEffect(() => {
        dispatch(common_data_api())
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
        dispatch(patient_onboarding_api({ step, stepOnefullData, selected_health_issue, height_unit, weight_unit, stepThreefullData, third_step_weight_unit, step_four_additional_information, workout_frequency }))
    }

    useEffect(() => {
        if (stepThreefullData?.workoutFrequency) {
            console.log(stepThreefullData?.workoutFrequency);
            const array = stepThreefullData?.workoutFrequency.split(',');
            setWorkout_frequency(array)
        }
    }, [stepThreefullData]);


    useEffect(() => {
        if (onboarding_process?.isSuccess) {
            if (step === 2) {
                toast.success(onboarding_process?.message?.message)
                setStep_form_open(false)
                setIs_health_issue(true)
                setStep(1)
                setStepOneFullData()
                setSelected_health_issue("")
                dispatch(clear_patient_onboarding_state())
            }
            if (step === 4) {
                toast.success(onboarding_process?.message?.message)
                setStep_form_open(false)
                setIs_health_issue(true)
                setStep(1)
                setStepOneFullData()
                setSelected_health_issue("")
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
                    <svg onClick={handleClose} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M23.5454 2.64932C23.6896 2.50539 23.8039 2.33448 23.882 2.14635C23.96 1.95823 24.0003 1.75657 24.0004 1.55289C24.0005 1.34921 23.9605 1.1475 23.8827 0.959281C23.8049 0.771059 23.6907 0.60001 23.5468 0.455899C23.4029 0.311789 23.232 0.197439 23.0438 0.11938C22.8557 0.0413198 22.654 0.00107852 22.4504 0.000953335C22.2467 0.000828148 22.045 0.0408215 21.8568 0.11865C21.6685 0.196478 21.4975 0.310618 21.3534 0.454551L12 9.80793L2.64932 0.454551C2.35827 0.163507 1.96353 -3.06665e-09 1.55193 0C1.14034 3.06665e-09 0.745595 0.163507 0.454551 0.454551C0.163507 0.745595 3.06665e-09 1.14034 0 1.55193C-3.06665e-09 1.96353 0.163507 2.35827 0.454551 2.64932L9.80793 12L0.454551 21.3507C0.31044 21.4948 0.196126 21.6659 0.118134 21.8542C0.0401417 22.0425 0 22.2443 0 22.4481C0 22.6519 0.0401417 22.8537 0.118134 23.042C0.196126 23.2302 0.31044 23.4013 0.454551 23.5454C0.745595 23.8365 1.14034 24 1.55193 24C1.75574 24 1.95755 23.9599 2.14583 23.8819C2.33412 23.8039 2.50521 23.6896 2.64932 23.5454L12 14.1921L21.3534 23.5454C21.6444 23.8361 22.039 23.9993 22.4504 23.999C22.8617 23.9988 23.2561 23.8351 23.5468 23.5441C23.8375 23.2531 24.0006 22.8585 24.0004 22.4471C24.0001 22.0358 23.8365 21.6414 23.5454 21.3507L14.1921 12L23.5454 2.64932Z" fill="black" />
                    </svg>
                </div>
                <Modal.Body className="p-0">
                    {!is_health_issue && step !== 2 && <ul className="steps">
                        <li className="step d-flex align-items-center justify-content-center">1</li>
                        <li className="line_bar"></li>
                        <li className="step d-flex align-items-center justify-content-center">2</li>
                        <li className="line_bar"></li>
                        <li className="step d-flex align-items-center justify-content-center">3</li>
                        <li className="line_bar"></li>
                        <li className="step d-flex align-items-center justify-content-center">4</li>
                    </ul>}
                    {step === 1 && step_form_open && <StepFormFirst gender={gender} goal={goal} trainers_list={trainers_list} setStep={setStep} setStepOneFullData={setStepOneFullData} setHeight_unit={setHeight_unit} height_unit={height_unit} setWeight_unit={setWeight_unit} weight_unit={weight_unit} />}
                    {step === 2 && step_form_open && <StepFormSecond health_issue={health_issue} setStep={setStep} setIs_health_issue={setIs_health_issue} setSelected_health_issue={setSelected_health_issue} selected_health_issue={selected_health_issue} is_health_issue={is_health_issue} handleSubmit={handleSubmit} onboarding_process={onboarding_process} />}
                    {step === 3 && step_form_open && <StepFormThird discomfort_issue={discomfort_issue} activity_level={activity_level} weekDays={weekDays} sleep_rate={sleep_rate} workout_type={workout_type} workout_place={workout_place} equipments={equipments} workout_times={workout_times} setStep={setStep} setStepThreeFullData={setStepThreeFullData} stepThreefullData={stepThreefullData} setThird_step_Weight_unit={setThird_step_Weight_unit} third_step_weight_unit={third_step_weight_unit} />}
                    {step === 4 && step_form_open && <LastStep setStep={setStep} setStep_four_additional_information={setStep_four_additional_information} step_four_additional_information={step_four_additional_information} handleSubmit={handleSubmit} onboarding_process={onboarding_process} />}
                    {is_health_issue && <ConfirmForm setIs_health_issue={setIs_health_issue} setStep_form_open={setStep_form_open} setshowPateintModal={setshowPateintModal} />}
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default AddpatientModal;
