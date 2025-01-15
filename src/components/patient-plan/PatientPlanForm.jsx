import React, { useEffect, useState } from 'react'
import { Form, Row, Col, Button, InputGroup, Container } from "react-bootstrap";
import Nav from 'react-bootstrap/Nav';
import Tab from "react-bootstrap/Tab";
import DefaultImage from '../../Images/gallery-add.svg'
import { get_exercise_by_category, clear_exercise_by_category_state } from '../../redux/slices/exerciseSlice/getExerciseByCategory';
import { get_patient_difficuilties, clear_patient_difficuilties_state } from '../../redux/slices/patientPlan/getPatientDifficuilties';
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";

const PatientPlanForm = ({ eventData, setDays, days, index, exercise_category, body_parts, exerciseDifficuilty }) => {
    const dispatch = useDispatch()
    const [selectedCategory, setSelectedCategory] = useState()
    const [difficuilty, setDifficuilty] = useState('')
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [exercise, setExercise] = useState()
    const [data, setData] = useState([{ name: "", movements: [] }]);
    const id = "b5d8fd71-5eeb-4b91-89ee-73d7df994094"
    const patient_difficuilty = useSelector((store) => store.PATIENT_DIFFICUILTIES)
    const exercise_details = useSelector((store) => store.EXERCISE_BY_CATEGORY)
    const [cardioFields, setCradioFields] = useState([{
        time: { value: null, unit: "sec" }
    },])
      const [flexibilityField, setFlexibilityField] = useState([{
    reps: "",
    weight: { value: null, unit: "kg" },
    time: { value: null, unit: "sec" }
  },])

    const newExerciseData = {
        category: "",
        exerciseId: "",
        exerciseName: "Untitled",
        exerciseImage: "",
        exerciseVideo: "",
        difficulty_level: [],
        sets: [],
        intensity: 0,
    }

    useEffect(() => {
        dispatch(get_patient_difficuilties({ patientId: id }))
    }, [])

    useEffect(() => {
        if (patient_difficuilty?.data?.data?.exercise_difficulty && selectedCategory) {
            dispatch(get_exercise_by_category({ category: selectedCategory, difficuilty: patient_difficuilty?.data?.data?.exercise_difficulty }))
        }
    }, [patient_difficuilty, selectedCategory])

    useEffect(() => {
        if (exercise_details?.isSuccess) {
            setExercise(exercise_details?.data?.data)
            setData(exercise_details?.data?.data[0]?.body_parts)
        }
    }, [exercise_details])

    const handleSelectCategory = (val, i) => {
        if (val) {
            setSelectedCategory(val);

            setDays((prevDays) => {
                const updatedDay = prevDays[eventData].map((item, index) => {
                    if (index === i) {
                        return { ...item, category: val };
                    }
                    return item;
                });

                return {
                    ...prevDays,
                    [eventData]: updatedDay,
                };
            });
        }
    };

    const handleSelectDifficuilty = (val, i) => {
        if (val) {

            setDays((prevDays) => {
                const updatedDay = prevDays[eventData].map((item, index) => {
                    if (index === i) {
                        return { ...item, difficulty_level: [val] };
                    }
                    return item;
                });

                return {
                    ...prevDays,
                    [eventData]: updatedDay,
                };
            });
        }
    };

    const handleSelectExerciseName = (val, i) => {
        const selectedExercise = exercise?.find((exercise) => exercise?.id === val)
        if (val && Object.keys(selectedExercise)) {

            setDays((prevDays) => {
                const updatedDay = prevDays[eventData].map((item, index) => {
                    if (index === i) {
                        return { ...item, exerciseId: val, exerciseName: selectedExercise.exercise_name, exerciseImage: selectedExercise.image_url, exerciseVideo: selectedExercise.video_link, bodyParts: selectedExercise.body_parts };
                    }
                    return item;
                });

                return {
                    ...prevDays,
                    [eventData]: updatedDay,
                };
            });
        }
    };

    const handleAddExercise = () => {
        setDays((prevDays) => {
            const updatedDay = [...prevDays[eventData], newExerciseData];
            return {
                ...prevDays,
                [eventData]: updatedDay,
            };
        });
    }


    return (
        <Tab.Container id="left-tabs-example" defaultActiveKey={0}>

            <div className="d-flex setting_wrapper patient_exercise">
                <div className="border-end setting_pills">
                    <Nav variant="pills" className="flex-column settings_tabs">
                        <Nav.Item>
                            {Array.isArray(days[eventData]) && days[eventData]?.map((name, i) => {
                                return (
                                    <Nav.Link className={`${i === selectedIndex ? "active" : ""}`} eventKey={i} onClick={() => setSelectedIndex(i)}>
                                        {name.exerciseName}
                                    </Nav.Link>
                                )
                            })}
                        </Nav.Item>
                    </Nav>
                </div>
                <Tab.Content className="settings_content flex-grow-1 ">
                    {Array.isArray(days[eventData]) && days[eventData]?.map((day, i) => {
                        if (i == selectedIndex) {
                            return (
                                <Tab.Pane eventKey={i}>
                                    <Row className="authWrapper ">
                                        <Col lg={12}>
                                            <h5>Basic Information</h5>
                                        </Col>
                                        <Col lg={6}>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                <Form.Label>Category</Form.Label>
                                                <Form.Select aria-label="Default select example" value={day?.category} onChange={(e) => handleSelectCategory(e.target.value, i)}>
                                                    <option value="" disabled selected>Please select category</option>
                                                    {exercise_category?.map((category, i) => (
                                                        <option key={i} value={category}>{category}</option>
                                                    ))}
                                                </Form.Select>

                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                <Form.Label>Difficuilty</Form.Label>
                                                <Form.Select aria-label="Default select example" value={day?.difficuilty ? day?.difficuilty : patient_difficuilty?.data?.data?.exercise_difficulty} onChange={(e) => handleSelectDifficuilty(e.target.value, i)}>
                                                    <option value="" disabled selected>Please select difficuilty level</option>
                                                    {exerciseDifficuilty?.map((category, i) => (
                                                        <option key={i} value={category}>{category}</option>
                                                    ))}
                                                </Form.Select>
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                <Form.Label>Exercise Name</Form.Label>
                                                <Form.Select aria-label="Default select example" value={day?.exerciseId} onChange={(e) => handleSelectExerciseName(e.target.value, i)}>
                                                    <option value="" disabled selected>Please select exercise name</option>
                                                    {exercise?.map((exercise, i) => (
                                                        <option key={i} value={exercise?.id}>{exercise?.exercise_name}</option>
                                                    ))}
                                                </Form.Select>
                                            </Form.Group>
                                            <Form.Group controlId="exampleForm.ControlInput1">
                                                <Form.Label>Exercise Video Link</Form.Label>
                                                <Form.Control type="text" disabled value={day.exerciseVideo} placeholder="Enter Video Link" />
                                            </Form.Group>
                                        </Col>
                                        <Col lg={6}>
                                            <div className="image_insert">
                                                <Form.Label>Exercise Video Link</Form.Label>
                                                <div className="upload_image position-relative">
                                                    <Form.Control type="file" placeholder="Enter Video Link" />
                                                    <img src={day.exerciseImage ? day.exerciseImage : DefaultImage} alt="dfault image" />
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className="authWrapper">
                                        <Col lg={12}>
                                            <div className="d-flex justify-content-between align-items-center mt-3">
                                                <h5 className="mb-0">Body Parts and Movements</h5>
                                            </div>
                                        </Col>
                                        {Array.isArray(day.bodyParts) && day.bodyParts.map((entry, index) => {
                                            return (
                                                <>
                                                    <Col lg={6}>
                                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                            <Form.Label>Selected Name:</Form.Label>
                                                            <Select
                                                                value={
                                                                    entry.name
                                                                        ? { value: entry.name, label: entry.name }
                                                                        : null
                                                                }
                                                                placeholder="Select Name"
                                                                isDisabled={true}
                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col lg={6}>
                                                        <div className="d-flex align-items-center gap-2">
                                                            <div className="flex-grow-1">
                                                                <Form.Label>Selected Movements:</Form.Label>
                                                                <Select
                                                                    isMulti
                                                                    value={entry.movements.map((movement) => ({
                                                                        value: movement,
                                                                        label: movement,
                                                                    }))}
                                                                    placeholder="Select Movements"
                                                                    isDisabled={!entry.name || true}
                                                                    className="flex-grow-1"
                                                                />
                                                            </div>
                                                        </div>
                                                    </Col>
                                                </>
                                            )
                                        })}

                                        <Col lg={12}>
                                            <div className="d-flex justify-content-between align-items-center mt-3">
                                                <h5 className="mb-0">Steps and Reps</h5> <button className="cmn_btn add_row">Add Row</button>
                                            </div>
                                        </Col>
                                        <Col lg={12} className="pt-3">
                                            <Row>
                                                <Col lg={4}>
                                                    <Form.Group controlId="exampleForm.ControlInput1">
                                                        <Form.Label>Set 1</Form.Label>
                                                        <Form.Control type="text" placeholder="Enter Set" />
                                                    </Form.Group>
                                                </Col>
                                                <Col lg={4}>
                                                    <Form.Group controlId="exampleForm.ControlInput1">
                                                        <Form.Label>Reps</Form.Label>
                                                        <Form.Control type="text" placeholder="Enter Reps" />
                                                    </Form.Group>
                                                </Col>
                                                <Col lg={4}>
                                                    <Form.Group controlId="exampleForm.ControlInput1">
                                                        <div className="d-flex gap-2">
                                                            <div className="flex-grow-1">
                                                                <div className="d-flex justify-content-between align-items-center gap-2">
                                                                    <Form.Label className="flex-grow-1">Weight</Form.Label>
                                                                    <span className="time">KG</span>
                                                                    <span className="time min">LBS</span>
                                                                </div>
                                                                <Form.Control type="text" placeholder="Enter Weight" />
                                                            </div>
                                                            <span className="minus align-self-end mb-2">x</span>
                                                        </div>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col lg={12} className="pt-3">
                                            <h5>Heart Rate and Targets</h5>
                                        </Col>
                                        <Col lg={12}>
                                            <Row>
                                                <Col lg={6}>
                                                    <Form.Group controlId="exampleForm.ControlInput1">
                                                        <Form.Label>Intensity (1-10)</Form.Label>
                                                        <Form.Control type="text" placeholder="Intensity (1-10)" />
                                                    </Form.Group>
                                                </Col>

                                            </Row>
                                        </Col>
                                        <Col lg={12} className="pt-3">
                                            <div className="d-flex justify-content-end gap-2">
                                                <button className="cmn_btn border-btn">Cancel</button>
                                                <button className="cmn_btn" onClick={() => handleAddExercise()}>Add Exercise</button>
                                            </div>
                                        </Col>
                                    </Row>
                                </Tab.Pane>
                            )
                        }
                    })}

                </Tab.Content>
            </div>
        </Tab.Container>
    )
}

export default PatientPlanForm