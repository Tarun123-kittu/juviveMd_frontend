import React, { useEffect, useState } from 'react'
import { Form, Row, Col, Button, InputGroup, Container } from "react-bootstrap";
import Nav from 'react-bootstrap/Nav';
import Tab from "react-bootstrap/Tab";
import DefaultImage from '../../Images/gallery-add.svg'
import { get_exercise_by_category, clear_exercise_by_category_state } from '../../redux/slices/exerciseSlice/getExerciseByCategory';
import { get_patient_difficuilties, clear_patient_difficuilties_state } from '../../redux/slices/patientPlan/getPatientDifficuilties';
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";

const PatientPlanForm = ({ eventData, setDays, days, index, exercise_category, body_parts, exerciseDifficuilty,patientId }) => {
    const dispatch = useDispatch()
    const [selectedCategory, setSelectedCategory] = useState()
    const [difficuilty, setDifficuilty] = useState('')
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [exercise, setExercise] = useState()
    const [data, setData] = useState([{ name: "", movements: [] }]);
    const patient_difficuilty = useSelector((store) => store.PATIENT_DIFFICUILTIES)
    const exercise_details = useSelector((store) => store.EXERCISE_BY_CATEGORY)
    const cardioData = {
        time: { value: null, unit: "sec" },
        heartRateTarget: { value: null, unit: "bpm" },
        distanceGoal: { value: null, unit: "km" },
        pace: "",
    }
    const flexibilityData = {
        reps: "",
        weight: { value: null, unit: "kg" },
    }

    const newExerciseData = {
        category: "",
        exerciseId: "",
        exerciseName: "Untitled",
        exerciseImage: "",
        exerciseVideo: "",
        difficulty_level: [patient_difficuilty?.data?.data?.exercise_difficulty],
        sets: [],
        intensity: 0,
        flexibilityField: [{
            reps: "",
            weight: { value: null, unit: "kg" }
        }],
        cardioFields: [{
            time: { value: null, unit: "sec" },
            heartRateTarget: { value: null, unit: "bpm" },
            distanceGoal: { value: null, unit: "km" },
            pace: "",
        }]
    }

    useEffect(() => {
        dispatch(get_patient_difficuilties({ patientId: patientId }))
    }, [])

    useEffect(() => {
        if (patient_difficuilty?.data?.data?.exercise_difficulty && selectedCategory) {
            dispatch(
                get_exercise_by_category({
                    category: selectedCategory,
                    difficuilty: patient_difficuilty?.data?.data?.exercise_difficulty,
                })
            )
        }
        if (days[eventData][0]?.difficulty_level?.length === 0 && patient_difficuilty?.data?.data?.exercise_difficulty) {
            setDays((prevDays) => {
                const updatedDay = prevDays[eventData].map((item, index) => {
                    if (index === 0) {
                        return { ...item, difficulty_level: [patient_difficuilty?.data?.data?.exercise_difficulty] };
                    }
                    return item;
                });

                return {
                    ...prevDays,
                    [eventData]: updatedDay,
                };
            });
        }
    }, [patient_difficuilty, selectedCategory]);


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

    const handleAddIntensity = (val, i) => {
        if (val) {

            setDays((prevDays) => {
                const updatedDay = prevDays[eventData].map((item, index) => {
                    if (index === i) {
                        return { ...item, intensity: Number(val) };
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

    const addNewFlexibilityToStrength = (i) => {
        setDays((prevDays) => {
            const updatedDays = { ...prevDays };
            const currentDayExercises = [...updatedDays[eventData]];
            currentDayExercises[i] = {
                ...currentDayExercises[i],
                flexibilityField: [
                    ...currentDayExercises[i].flexibilityField,
                    {
                        reps: "",
                        weight: { value: null, unit: "kg" },
                    },
                ],
            };
            updatedDays[eventData] = currentDayExercises;

            return updatedDays;
        });
    };

    const addNewFlexibilityToCardio = (i) => {
        setDays((prevDays) => {
            const updatedDays = { ...prevDays };
            const currentDayExercises = [...updatedDays[eventData]];
            currentDayExercises[i] = {
                ...currentDayExercises[i],
                cardioFields: [
                    ...currentDayExercises[i].cardioFields,
                    {
                        time: { value: null, unit: "sec" },
                        heartRateTarget: { value: null, unit: "bpm" },
                        distanceGoal: { value: null, unit: "km" },
                        pace: "",
                    },
                ],
            };
            updatedDays[eventData] = currentDayExercises;

            return updatedDays;
        });
    };

    const handleChangeCardioUnit = (i, index, field, unit) => {
        setDays((prevDays) => {
            const updatedDays = { ...prevDays };
            const targetField = updatedDays[eventData][i].cardioFields[index][field];
            if (targetField && typeof targetField === 'object') {
                targetField.unit = unit;
            } else {
                console.error(`Expected object for ${field}, but got`, targetField);
            }
            return updatedDays;
        });
    };


    const handleChangeFlexibilityUnit = (i, index, field, unit) => {
        setDays((prevDays) => {
            const updatedDays = { ...prevDays };
            const targetField = updatedDays[eventData][i].flexibilityField[index][field];
            if (targetField && typeof targetField === 'object') {
                targetField.unit = unit;
            } else {
                console.error(`Expected object for ${field}, but got`, targetField);
            }
            return updatedDays;
        });
    };


    const handleChangeCardioFields = (i, index, field, e) => {
        console.log(e.target.value, "this is from the cardio fields value")
        setDays((prevDays) => {
            const updatedDays = { ...prevDays };

            if (field === "pace") {
                updatedDays[eventData][i].cardioFields[index][field] = e.target.value;
            } else {
                updatedDays[eventData][i].cardioFields[index][field].value = e.target.value;
            }

            updatedDays[eventData][i].sets = [...updatedDays[eventData][i].cardioFields];

            return updatedDays;
        });
    };



    const handleChangeFlexibilityFields = (i, index, field, e) => {
        setDays((prevDays) => {
            const updatedDays = { ...prevDays };

            if (field === "reps") {
                updatedDays[eventData][i].flexibilityField[index][field] = e.target.value;
            } else {
                updatedDays[eventData][i].flexibilityField[index][field].value = e.target.value;
            }

            updatedDays[eventData][i].sets = [...updatedDays[eventData][i].flexibilityField];

            return updatedDays;
        });
    };




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
                                                <Form.Label>Exercise Image</Form.Label>
                                                <div className="upload_image position-relative">
                                                    <Form.Control type="file" placeholder="Enter Video Link" />
                                                    <img src={day.exerciseImage ? day.exerciseImage : DefaultImage} className='exercise_selected_iamge' alt="dfault" />
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
                                        {day?.category !== "strength exercise" && <div className="mt-3">
                                            <div className="d-flex align-items-center mb-2">
                                                <h5 className="flex-grow-1 mb-0">Sets and Reps</h5>{" "}
                                                <button onClick={() => addNewFlexibilityToCardio(i)} className="cmn_btn add_row">Add Row</button>
                                            </div>
                                            {day?.cardioFields?.map((cardio, index) => (
                                                <Form.Group className="mb-2">
                                                    <div className="steps_items d-flex gap-2">
                                                        <div>
                                                            <Form.Label>Set {index + 1}</Form.Label>
                                                            <span className="step_count">{index + 1}</span>
                                                        </div>
                                                        <div className="w-100">
                                                            <div className="flex-grow-1">
                                                               <div className='d-flex gap-2 mb-3'>
                                                               <div className="w-100">
                                                                    <div className="d-flex gap-2 align-items-center">
                                                                        <Form.Label className="flex-grow-1">Time Duration</Form.Label>{" "}
                                                                        <span onClick={() => handleChangeCardioUnit(i, index, "time", "sec")}
                                                                            className={cardio?.time?.unit === "sec" ? "time" : "time min"}>sec</span>{" "}
                                                                        <span onClick={() => handleChangeCardioUnit(i, index, "time", "min")}
                                                                            className={cardio?.time?.unit === "min" ? "time" : "time min"}>min</span>
                                                                    </div>
                                                                    <Form.Control type="text" placeholder="00" value={cardio?.time?.value} onChange={(e) => handleChangeCardioFields(i, index, "time", e)} />

                                                                </div>
                                                                <div className="w-100">
                                                                    <div className="d-flex gap-2 align-items-center">
                                                                        <Form.Label className="flex-grow-1">HeartRate Target</Form.Label>{" "}
                                                                     
                                                                    </div>
                                                                    <Form.Control type="text" placeholder="00" value={cardio?.heartRateTarget?.value} onChange={(e) => handleChangeCardioFields(i, index, "heartRateTarget", e)} />

                                                                </div>
                                                               </div>
                                                              <div className='d-flex gap-2'>
                                                              <div className="w-50">
                                                                    <div className="d-flex gap-2 align-items-center">
                                                                        <Form.Label className="flex-grow-1">Distance Goal</Form.Label>{" "}
                                                                        <span onClick={() => handleChangeCardioUnit(i, index, "distanceGoal", "km")}
                                                                            className={cardio?.distanceGoal?.unit === "km" ? "time" : "time min"}>KM</span>{" "}
                                                                        <span onClick={() => handleChangeCardioUnit(i, index, "distanceGoal", "meter")}
                                                                            className={cardio?.distanceGoal?.unit === "meter" ? "time" : "time min"}>Meter</span>{" "}
                                                                    </div>
                                                                    <Form.Control type="text" placeholder="00" value={cardio?.distanceGoal?.value} onChange={(e) => handleChangeCardioFields(i, index, "distanceGoal", e)} />

                                                                </div>
                                                                <div className="w-50">
                                                                    <div className="d-flex gap-2 align-items-center">
                                                                        <Form.Label className="flex-grow-1">Pace</Form.Label>{" "}
                                                                    </div>
                                                                    <Form.Select aria-label="Default select example" value={cardio?.pace} onChange={(e) => handleChangeCardioFields(i, index, "pace", e)} >
                                                                        <option value="" disabled selected>Select pace</option>
                                                                        <option value="moderate">Moderate</option>
                                                                        <option value="medium">Medium</option>
                                                                        <option value="vigorous">Vigorous</option>
                                                                    </Form.Select>
                                                                </div>
                                                              </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Form.Group>
                                            ))}
                                        </div>}
                                        {day?.category === "strength exercise" && <div className="mt-3 ">
                                            <div className="d-flex align-items-center mb-2">
                                                <h5 className="flex-grow-1 mb-0">Sets and Reps</h5>{" "}
                                                <button onClick={() => addNewFlexibilityToStrength(i)} className="cmn_btn add_row">Add Row</button>
                                            </div>
                                            {day?.flexibilityField?.map((val, index) => (
                                                <Form.Group key={i} className="mb-2">
                                                    <div className="steps_items d-flex gap-2">
                                                        <div>
                                                            <Form.Label>Set {index + 1}</Form.Label>
                                                            <span className="step_count">{index + 1}</span>
                                                        </div>
                                                        <div className="flex-grow-1">
                                                            <div className="d-flex gap-2 align-items-center">
                                                                <Form.Label className="flex-grow-1">Reps</Form.Label>{" "}

                                                            </div>
                                                            <Form.Control type="text" placeholder="00" value={val?.reps} onChange={(e) => handleChangeFlexibilityFields(i, index, "reps", e)} />
                                                        </div>
                                                        <div className="flex-grow-1">
                                                            <div className="d-flex gap-2 align-items-center">
                                                                <Form.Label className="flex-grow-1">Weight</Form.Label>{" "}
                                                                <span onClick={() => handleChangeFlexibilityUnit(i, index, "weight", "kg")}
                                                                    className={val?.weight?.unit === "kg" ? "time" : "time min"}>Kg</span>{" "}
                                                                <span onClick={() => handleChangeFlexibilityUnit(i, index, "weight", "lbs")}
                                                                    className={val?.weight?.unit === "lbs" ? "time" : "time min"}>Lbs</span>
                                                            </div>
                                                            <Form.Control type="text" placeholder="00" value={val?.weight?.value} onChange={(e) => handleChangeFlexibilityFields(i, index, "weight", e)} />

                                                        </div>
                                                    </div>
                                                </Form.Group>
                                            ))}

                                        </div>}
                                        <Col lg={12} className="pt-3">
                                            <h5>Heart Rate and Targets</h5>
                                        </Col>
                                        <Col lg={12}>
                                            <Row>
                                                <Col lg={6}>
                                                    <Form.Group controlId="exampleForm.ControlInput1">
                                                        <Form.Label>Intensity (1-10)</Form.Label>
                                                        <Form.Control type="text" placeholder="Intensity (1-10)" value={day?.intensity} onChange={(e) => handleAddIntensity(e.target.value, i)} />
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