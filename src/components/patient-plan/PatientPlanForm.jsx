import React, { useEffect, useState } from 'react'
import { Form, Row, Col, Button, InputGroup, Container } from "react-bootstrap";
import Nav from 'react-bootstrap/Nav';
import Tab from "react-bootstrap/Tab";
import DefaultImage from '../../Images/gallery-add.svg'
import { get_exercise_by_category, clear_exercise_by_category_state } from '../../redux/slices/exerciseSlice/getExerciseByCategory';
import { get_patient_difficuilties, clear_patient_difficuilties_state } from '../../redux/slices/patientPlan/getPatientDifficuilties';
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import toast from 'react-hot-toast';
import { parse } from 'date-fns';
import { useNavigate } from 'react-router-dom';

const PatientPlanForm = ({ eventData, setDays, days, index, exercise_category, body_parts, exerciseDifficuilty, patientId, editable }) => {
    console.log(days[eventData],"this is the days")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [difficuilty, setDifficuilty] = useState('')
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [selectedCategory, setSelectedCategory] = useState('')
    const [exercise, setExercise] = useState()
    const [data, setData] = useState([{ name: "", movements: [] }]);
    const patient_difficuilty = useSelector((store) => store.PATIENT_DIFFICUILTIES)
    const exercise_details = useSelector((store) => store.EXERCISE_BY_CATEGORY)

    useEffect(() => {
        if(editable){
            setSelectedCategory(days[eventData][selectedIndex].category)
            setDifficuilty(days[eventData][selectedIndex].difficulty_level[0])
        }
    }, [days,selectedIndex])

    const newExerciseData = {
        category: "",
        exerciseId: "",
        exerciseName: "Untitled",
        exerciseImage: "",
        exerciseVideo: "",
        difficulty_level: [difficuilty ? difficuilty : patient_difficuilty?.data?.data?.exercise_difficulty],
        active: true,
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
    }, [selectedCategory])

    useEffect(() => {
        if (patient_difficuilty?.data?.data?.exercise_difficulty && selectedCategory) {
            dispatch(
                get_exercise_by_category({
                    category: selectedCategory,
                    difficuilty: difficuilty ? difficuilty : patient_difficuilty?.data?.data?.exercise_difficulty,
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

    }, [patient_difficuilty, selectedCategory, difficuilty]);


    useEffect(() => {
        if (exercise_details?.isSuccess) {
            setExercise(exercise_details?.data?.data)
            setData(exercise_details?.data?.data[0]?.body_parts)
        }
    }, [exercise_details, selectedCategory])

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
            setDifficuilty(val)
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
        const numericVal = Number(val);

        if (isNaN(numericVal) || numericVal < 1 || numericVal > 10) {
            return;
        }

        setDays((prevDays) => {
            const updatedDay = prevDays[eventData].map((item, index) => {
                if (index === i) {
                    return { ...item, intensity: numericVal };
                }
                return item;
            });

            return {
                ...prevDays,
                [eventData]: updatedDay,
            };
        });
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
            const lastExercise = prevDays[eventData]?.[prevDays[eventData]?.length - 1];

            const isValidExerciseData = () => {
                if (!lastExercise) return true;
                if (lastExercise.exerciseName === "Untitled") {
                    return false
                }

                if (lastExercise.category === "strength exercise") {
                    const hasEmptyFlexibilityField = lastExercise.flexibilityField.some((item) =>
                        item.reps === "" || item.weight.value === null
                    );
                    if (hasEmptyFlexibilityField) return false;
                } else {
                    const hasEmptyCardioField = lastExercise.cardioFields.some((item) =>
                        item.time.value === null ||
                        item.heartRateTarget.value === null ||
                        item.distanceGoal.value === null ||
                        item.pace === ""
                    );
                    if (hasEmptyCardioField) return false;
                }
                return true
            };

            if (!isValidExerciseData()) {
                toast.error("Please fill all the fields")
                return prevDays;
            }
            setDifficuilty(patient_difficuilty?.data?.data?.exercise_difficulty)
            const updatedDay = [...prevDays[eventData], newExerciseData];
            return {
                ...prevDays,
                [eventData]: updatedDay,
            };
        });
    };


    const addNewFlexibilityToStrength = (i) => {
        setDays((prevDays) => {
            const updatedDays = { ...prevDays };
            const currentDayExercises = [...updatedDays[eventData]];
            const currentExercise = currentDayExercises[i];

            const hasEmptyFlexibilityField = currentExercise.flexibilityField.some((field) =>
                field.reps === "" || field.weight.value === null
            );

            if (hasEmptyFlexibilityField) {
                console.warn("Cannot add new flexibility field, some values are empty in the previous fields.");
                return prevDays;
            }

            currentExercise.flexibilityField = [
                ...currentExercise.flexibilityField,
                {
                    reps: "",
                    weight: { value: null, unit: "kg" },
                },
            ];

            updatedDays[eventData] = currentDayExercises;
            return updatedDays;
        });
    };


    const addNewFlexibilityToCardio = (i) => {
        setDays((prevDays) => {
            const updatedDays = { ...prevDays };
            const currentDayExercises = [...updatedDays[eventData]];
            const currentExercise = currentDayExercises[i];

            const hasEmptyCardioField = currentExercise.cardioFields.some((field) =>
                field.time.value === null ||
                field.heartRateTarget.value === null ||
                field.distanceGoal.value === null ||
                field.pace === ""
            );

            if (hasEmptyCardioField) {
                console.warn("Cannot add new cardio field, some values are empty in the previous fields.");
                return prevDays;
            }

            currentExercise.cardioFields = [
                ...currentExercise.cardioFields,
                {
                    time: { value: null, unit: "sec" },
                    heartRateTarget: { value: null, unit: "bpm" },
                    distanceGoal: { value: null, unit: "km" },
                    pace: "",
                },
            ];

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
        let value
        if (field === "pace") {
            value = e.target.value
        } else {
            value = Number(e.target.value);
        }
        const cardioField = days[eventData][i].cardioFields[index];

        if (field === "time") {
            const unit = cardioField.time.unit;
            if (isNaN(value) || value < 1 || value > 60) {
                console.warn(`Time must be between 1 and 60 ${unit === "sec" ? "seconds" : "minutes"}.`);
                return;
            }
        } else if (field === "heartRateTarget") {
            if (isNaN(value) || value < 0 || value > 200) {
                console.warn("Heart rate target must be between 0 and 200 bpm.");
                return;
            }
        } else if (field === "distanceGoal") {
            const unit = cardioField.distanceGoal.unit;
            if (isNaN(value) || value <= 0) {
                console.warn(`Distance goal must be a positive number (in ${unit}).`);
                return;
            }
        }

        setDays((prevDays) => {
            const updatedDays = JSON.parse(JSON.stringify(prevDays));
            const targetField = updatedDays[eventData][i].cardioFields[index][field];

            if (field === "time" || field === "heartRateTarget" || field === "distanceGoal") {
                targetField.value = value;
            } else {
                updatedDays[eventData][i].cardioFields[index][field] = value;
            }

            updatedDays[eventData][i].sets = [...updatedDays[eventData][i].cardioFields];
            return updatedDays;
        });
    };





    const handleChangeFlexibilityFields = (i, index, field, e) => {
        const value = Number(e.target.value);

        if (isNaN(value) || value <= 0 || value > 100) {
            console.warn("Value must be between 1 and 100.");
            return;
        }

        setDays((prevDays) => {
            const updatedDays = JSON.parse(JSON.stringify(prevDays)); // Deep copy to avoid mutations
            const flexibilityField = updatedDays[eventData][i].flexibilityField[index];

            if (field === "reps") {
                flexibilityField[field] = value;
            } else {
                flexibilityField[field].value = value;
            }

            updatedDays[eventData][i].sets = [...updatedDays[eventData][i].flexibilityField];

            return updatedDays;
        });
    };




    const handleRemoveCardioFields = (i, index) => {
        setDays((prevDays) => {
            const updatedDays = { ...prevDays };
            const currentDayExercises = [...updatedDays[eventData]];

            currentDayExercises[i].cardioFields = currentDayExercises[i].cardioFields.filter((_, idx) => idx !== index);

            updatedDays[eventData] = currentDayExercises;

            return updatedDays;
        });
    };

    const handleRemoveFlexibilityFields = (i, index) => {
        setDays((prevDays) => {
            const updatedDays = { ...prevDays };
            const currentDayExercises = [...updatedDays[eventData]];

            currentDayExercises[i].flexibilityField = currentDayExercises[i].flexibilityField.filter((_, idx) => idx !== index);

            updatedDays[eventData] = currentDayExercises;

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
                                                <Form.Select aria-label="Default select example" value={day?.difficulty_level[0] ? day?.difficulty_level[0] : patient_difficuilty?.data?.data?.exercise_difficulty} onChange={(e) => handleSelectDifficuilty(e.target.value, i)}>
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
                                                        {day?.cardioFields?.length > 1 && <span onClick={() => (handleRemoveCardioFields(i, index))} className="minus align-self-end mb-2">x</span>}
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
                                                        {day?.flexibilityField?.length > 1 && <span onClick={() => (handleRemoveFlexibilityFields(i, index))} className="minus align-self-end mb-2">x</span>}
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
                                                <button className="cmn_btn border-btn" onClick={() => navigate(-1)}>Cancel</button>
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