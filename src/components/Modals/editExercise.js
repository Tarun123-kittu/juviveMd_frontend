import React, { useEffect, useState } from "react";
import { Modal, Row, Col, Form } from "react-bootstrap";
import { Formik, Field, Form as FormikForm } from "formik";
import DefaultImage from "../../Images/file.png";
import { create_exercise } from "../../redux/slices/exerciseSlice/createExercise";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { get_single_exercise } from "../../redux/slices/exerciseSlice/getSingleExercise";
import { update_exercise, clear_update_exercise_state } from "../../redux/slices/exerciseSlice/updateExercise";
import Spinner from 'react-bootstrap/Spinner';
import { get_exercise, clear_get_single_exercise_state } from "../../redux/slices/exerciseSlice/getExercise";
import Loader from "../../common/Loader/Loader";
import * as Yup from "yup";
import { update_exercise_draft, clear_update_exercise_draft_state } from "../../redux/slices/exerciseSlice/updateExercideDraft";
import Multiselect from 'multiselect-react-dropdown';
import Select from "react-select";

const EditExercise = ({ showAddExerciseModal, setshowAddExerciseModal, exercise_category, id, tab, admin, setExerciseId, ExercisePermission, body_parts, exerciseDifficuilty }) => {
    const dispatch = useDispatch();
    const [imagePreview, setImagePreview] = useState(DefaultImage);
    const is_exercise = useSelector((store) => store.SINGLE_EXERCISE);
    console.log(is_exercise, "this is the exercise data of single exercise")
    const is_exercise_updated = useSelector((store) => store.UPDATE_EXERCISE_DATA)
    const is_exercise_updated_draft = useSelector((store) => store.UPDATE_DRAFT_EXERCISE)
    const [hasImage, setHasImage] = useState(false)
    const [image, setImage] = useState()
    const [draft, setDraft] = useState(false)
    const [exerciseType, setExerciseType] = useState("")
    const [exerciseName, setExerciseName] = useState("")
    const [exerciseVideo, setExerciseVideo] = useState("")
    const [exerciseDescription, setExerciseDescription] = useState("")
    const [exerciseImage, setExerciseImage] = useState("")
    const [bodyNames, setBodyNames] = useState([])
    const [selectedBodyNames, setSelectedBodyNames] = useState([]);
    const [selectedMovements, setSelectedMovements] = useState([]);
    const [movementsArray, setMovementsArray] = useState([]);
    const [movementResponse, setMovementResponse] = useState()
    const [difficulty, setDifficuilty] = useState()
    const [difficuiltOptions, setDifficuiltOptions] = useState()
    const [difficuiltyResponse, setDifficuiltyResponse] = useState()
    const [data, setData] = useState([{ name: "", movements: [] }]); // User input state
    const [apiData, setApiData] = useState();

    console.log(movementResponse, "movementResponse movementResponse movementResponse movementResponse movementResponse")

    const validationSchema = Yup.object().shape({
        exerciseName: Yup.string()
            .oneOf(exercise_category || [], "Exercise name must be one of the allowed categories")
            .required("Exercise name is required"),
    });

    const [initialValues, setInitialValues] = useState({
        exerciseName: "",
        exerciseType: "",
        exerciseVideo: "",
        exerciseDescription: "",
        exerciseImage: null,
    });

    useEffect(() => {
        if (id) {
            dispatch(get_single_exercise({ id }));
        }
    }, [id, dispatch]);


    useEffect(() => {
        if (body_parts && body_parts.length > 0) {
            setApiData(body_parts); // Set the API data to the state
        }
    }, [body_parts]);

    useEffect(() => {
        if (is_exercise?.isSuccess) {
            const data = is_exercise?.data?.data;
            console.log(data, "this is the data")
            setInitialValues({
                exerciseName: data?.exercise_name || "",
                exerciseType: data?.category || "",
                exerciseVideo: data?.video_link || "",
                exerciseDescription: data?.description || "",
                exerciseImage: data?.imageUrl || "",
            });
            setImagePreview(data?.image_url || DefaultImage);
            setExerciseType(data?.category)
            setExerciseName(data?.exercise_name)
            setExerciseVideo(data?.video_link)
            setExerciseDescription(data?.description)
            setExerciseImage(data?.image_url)
            const difficuiltValue = data?.difficulty_level?.map((val) => ({ name: val }))
            setDifficuilty(difficuiltValue)
            setDifficuiltyResponse(data?.difficulty_level)
            const selectMovements = data?.body_parts?.map((el) => {
                return el.movements?.map((move) => ({ name: move, key: el.name }))
            }).flat();
            setSelectedMovements(selectMovements)
            const bodyPart = data?.body_parts?.map((part) => ({ name: part.name }))
            setSelectedBodyNames(bodyPart)
            setMovementResponse(data?.body_parts)
            if (data?.body_parts) {
                const formattedData = data?.body_parts.map((item) => ({
                    name: item.name,
                    movements: item.movements,
                }));
                setData(formattedData);
            }
        }
    }, [is_exercise]);

    const handleClose = () => {
        setshowAddExerciseModal(false);
        setExerciseId(null)
    };

    const handleImageChange = (event, setFieldValue) => {
        const file = event.target.files[0];
        setHasImage(true)
        if (file) {
            setFieldValue("exerciseImage", file);
            setImage(file)
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = (values) => {
        const bodyParts = data.filter((entry) => entry.name);
        dispatch(
            update_exercise({
                exercise_name: exerciseName,
                category: exerciseType,
                difficulty_level: difficuiltyResponse,
                body_parts: bodyParts,
                video_link: exerciseVideo,
                image_url: exerciseImage,
                description: exerciseDescription,
                draft: false,
                id: id,
                hasImage: hasImage,
            })
        );
    };
    const handleSaveDraft = (values) => {
        const bodyParts = data.filter((entry) => entry.name);
        dispatch(
            update_exercise_draft({
                exercise_name: exerciseName,
                category: exerciseType,
                difficulty_level: difficuiltyResponse,
                body_parts: bodyParts,
                video_link: exerciseVideo,
                image_url: exerciseImage,
                description: exerciseDescription,
                draft: true,
                id: id,
                hasImage: hasImage,
            })
        );
    };

    const handleSubmit = (values) => {
        handleSave(values);
    };

    useEffect(() => {
        if (is_exercise_updated?.isSuccess) {
            toast.success(is_exercise_updated?.message?.message)
            setshowAddExerciseModal(false)
            dispatch(get_exercise({ page: 1, tab }))
            dispatch(clear_update_exercise_state())
            setHasImage(false)
            setExerciseId(null)
        }
        if (is_exercise_updated?.isError) {
            toast.error(is_exercise_updated?.error?.message)
            dispatch(clear_update_exercise_state())
        }
    }, [is_exercise_updated])

    useEffect(() => {
        if (is_exercise_updated_draft?.isSuccess) {
            toast.success(is_exercise_updated_draft?.message?.message)
            setshowAddExerciseModal(false)
            dispatch(get_exercise({ page: 1, tab }))
            dispatch(clear_update_exercise_draft_state())
            setHasImage(false)
            setExerciseId(null)
        }
        if (is_exercise_updated_draft?.isError) {
            toast.error(is_exercise_updated_draft?.error?.message)
            dispatch(clear_update_exercise_draft_state())
        }
    }, [is_exercise_updated_draft])

    const handleExerciseTypeChange = (e, setFieldValue) => {
        const value = e.target.value;
        setExerciseType(value);
        setFieldValue("exerciseType", value);
    };
    const handleExerciseNameChange = (e, setFieldValue) => {
        const value = e.target.value;
        setExerciseName(value);
        setFieldValue("exerciseName", value);
    };
    const handleExerciseImageChange = (e, setFieldValue) => {
        const value = e.target.value;
        setExerciseImage(value);
        setFieldValue("exerciseImage", value);
    };
    const handleExerciseVideoChange = (e, setFieldValue) => {
        const value = e.target.value;
        setExerciseVideo(value);
        setFieldValue("exerciseVideo", value);
    };
    const handleExerciseDescriptionChange = (e, setFieldValue) => {
        const value = e.target.value;
        setExerciseDescription(value);
        setFieldValue("exerciseDescription", value);
    };

    useEffect(() => {
        if (exerciseType && exerciseName && exerciseVideo && exerciseDescription && exerciseImage) {
            setDraft(false)
        }
        else {
            setDraft(true)
        }
    }, [exerciseType, exerciseName, exerciseVideo, exerciseDescription, exerciseImage, is_exercise])

    useEffect(() => {
        if (body_parts?.length) {
            const bodyName = body_parts?.map((part) => ({ name: part.name }));
            setBodyNames(bodyName);
        }
    }, [body_parts]);

    const handleSelect = (selectedList) => {
        setSelectedBodyNames([...selectedList]);
    };

    const handleRemove = (selectedList, removedItem) => {
        setSelectedBodyNames([...selectedList]);
        const updatedMovements = movementsArray.filter(
            (movement) => movement.key !== removedItem.name
        );
        setMovementsArray(updatedMovements);

        const updatedSelectedMovements = selectedMovements.filter(
            (movement) => movement.key !== removedItem.name
        );
        setSelectedMovements(updatedSelectedMovements);
    };

    const handleSelectMovements = (selectedList) => {
        setSelectedMovements([...selectedList]);
    };

    const handleRemoveMovements = (selectedList) => {
        setSelectedMovements([...selectedList]);
    };

    const handleSelectDifficuilt = (selectedList) => {
        setDifficuilty([...selectedList]);
        const formattedResponse = selectedList.map((item) => item.name);
        setDifficuiltyResponse(formattedResponse);
    };

    const handleRemoveDifficuilt = (selectedList) => {
        setDifficuilty([...selectedList]);
        const formattedResponse = selectedList.map((item) => item.name);
        setDifficuiltyResponse(formattedResponse);
    };


    useEffect(() => {
        if (selectedBodyNames.length && body_parts?.length) {
            const newMovements = selectedBodyNames?.flatMap((selected) => {
                const matchingPart = body_parts?.find((el) => el.name === selected.name);
                return matchingPart?.movements.map((movement) => ({
                    name: movement,
                    key: selected.name,
                })) || [];
            });

            setMovementsArray(newMovements);
        } else {
            setMovementsArray([]);
        }
    }, [selectedBodyNames, body_parts]);

    useEffect(() => {
        const response = selectedMovements?.reduce((acc, movement) => {
            const bodyPartIndex = acc.findIndex(
                (part) => part.name === movement.key
            );

            if (bodyPartIndex === -1) {
                acc.push({
                    name: movement.key,
                    movements: [movement.name],
                });
            } else {
                acc[bodyPartIndex].movements.push(movement.name);
            }

            return acc;
        }, []);

        setMovementResponse(response);
    }, [selectedMovements]);

    useEffect(() => {
        const diffcuilty = exerciseDifficuilty?.map((exe) => ({ name: exe }))
        setDifficuiltOptions(diffcuilty)
    }, [exerciseDifficuilty])


    const handleNameChange = (index, selectedOption) => {
        const updatedData = [...data];
        updatedData[index].name = selectedOption?.value || "";
        updatedData[index].movements = []; // Reset movements when name changes
        setData(updatedData);
    };

    // Handle Movement Change
    const handleMovementChange = (index, selectedOptions) => {
        const updatedData = [...data];
        updatedData[index].movements = selectedOptions.map((option) => option.value);
        setData(updatedData);
    };

    // Add a New Field
    const addNewField = () => {
        setData([...data, { name: "", movements: [] }]);
    };

    // Get Available Movements for a Given Body Part
    const getMovementsForName = (name) => {
        const selected = apiData?.find((item) => item.name === name);
        return selected
            ? selected.movements.map((movement) => ({ value: movement, label: movement }))
            : [];
    };

    // Get Available Body Parts (Exclude Already Selected Names)
    const getAvailableNames = () => {
        const selectedNames = data.map((entry) => entry.name);
        return apiData
            ?.filter((item) => !selectedNames.includes(item.name)) // Exclude selected names
            .map((item) => ({ value: item.name, label: item.name }));
    };

    const handleDifficuilty = (e) => {
        const val = e.target.value
        setDifficuilty(val)
    }

    return (
        <Modal
            show={showAddExerciseModal}
            onHide={handleClose}
            className="cmn_modal"
            centered
            size="md"
        >
            <div className="modal_head text-end">
                <svg type="button" onClick={handleClose} width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M24.2798 2.6503C24.4239 2.50636 24.5383 2.33545 24.6163 2.14733C24.6944 1.9592 24.7346 1.75754 24.7348 1.55386C24.7349 1.35019 24.6949 1.14848 24.6171 0.960257C24.5392 0.772036 24.4251 0.600986 24.2812 0.456876C24.1372 0.312765 23.9663 0.198416 23.7782 0.120356C23.5901 0.0422964 23.3884 0.00205508 23.1847 0.0019299C22.9811 0.00180471 22.7794 0.0417981 22.5911 0.119627C22.4029 0.197455 22.2319 0.311594 22.0877 0.455528L12.7344 9.8089L3.38369 0.455528C3.09265 0.164483 2.69791 0.000976559 2.28631 0.000976562C1.87471 0.000976566 1.47997 0.164483 1.18893 0.455528C0.897882 0.746572 0.734375 1.14131 0.734375 1.55291C0.734375 1.96451 0.897882 2.35925 1.18893 2.6503L10.5423 12.001L1.18893 21.3517C1.04482 21.4958 0.930501 21.6668 0.852509 21.8551C0.774517 22.0434 0.734375 22.2452 0.734375 22.449C0.734375 22.6528 0.774517 22.8546 0.852509 23.0429C0.930501 23.2312 1.04482 23.4023 1.18893 23.5464C1.47997 23.8375 1.87471 24.001 2.28631 24.001C2.49011 24.001 2.69192 23.9608 2.88021 23.8828C3.0685 23.8048 3.23958 23.6905 3.38369 23.5464L12.7344 14.193L22.0877 23.5464C22.3788 23.8371 22.7734 24.0003 23.1847 24C23.5961 23.9998 23.9905 23.8361 24.2812 23.5451C24.5719 23.254 24.735 22.8594 24.7348 22.4481C24.7345 22.0367 24.5709 21.6423 24.2798 21.3517L14.9264 12.001L24.2798 2.6503Z" fill="black" />
                </svg>
            </div>
            {is_exercise?.isLoading ? <Loader /> : <Modal.Body className="p-0 authWrapper add_exercise">
                <h2 className="deletmodal_heading">Edit Exercise Detail</h2>
                <Formik
                    initialValues={initialValues}
                    enableReinitialize
                    onSubmit={handleSubmit}
                >
                    {({ setFieldValue }) => (
                        <FormikForm>
                            <Row>
                                <Col lg={4}>
                                    <Form.Group className="mb-2">
                                        <Form.Label>Exercise Type</Form.Label>
                                        <Field
                                            as="select"
                                            name="exerciseType"
                                            className="form-control"
                                            disabled={!ExercisePermission?.canUpdate || tab === "approvalRequest" || tab === "active"}
                                            onChange={(e) => handleExerciseTypeChange(e, setFieldValue)}
                                        >
                                            <option value="">Select exercise type</option>
                                            {exercise_category?.map((data) => (
                                                <option key={data} value={data}>
                                                    {data}
                                                </option>
                                            ))}
                                        </Field>
                                    </Form.Group>
                                    <Form.Group className="mb-2">
                                        <Form.Label>Exercise Image</Form.Label>
                                        <div className="drag_file d-flex align-items-center justify-content-center flex-column">
                                            <input
                                                type="file"
                                                name="exerciseImage"
                                                accept="image/png, image/jpg, image/jpeg"
                                                // onChange={(e) => handleImageChange(e, setFieldValue)}
                                                className="form-control"
                                                disabled={!ExercisePermission?.canUpdate || tab === "approvalRequest" || tab === "active"}

                                            />
                                            <img
                                                src={imagePreview}
                                                className="image_preview"
                                                alt="preview"

                                            />
                                        </div>
                                    </Form.Group>
                                   
                                </Col>
                                <Col lg={8}>
                                    <Row>
                                        <Col lg={6}>
                                            <Form.Group className="mb-2">
                                                <Form.Label>Exercise Name</Form.Label>
                                                <Field
                                                    type="text"
                                                    name="exerciseName"
                                                    placeholder="Enter exercise name"
                                                    className="form-control"
                                                    disabled={!ExercisePermission?.canUpdate || tab === "approvalRequest" || tab === "active"}
                                                    onChange={(e) => handleExerciseNameChange(e, setFieldValue)}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col lg={6}>
                                            <Form.Group className="mb-2">
                                                <Form.Label>Difficuilty level</Form.Label>
                                                <Multiselect
                                                    options={difficuiltOptions}
                                                    selectedValues={difficulty}
                                                    onSelect={handleSelectDifficuilt}
                                                    onRemove={handleRemoveDifficuilt}
                                                    displayValue="name"
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col lg={6}>
                                            <Form.Group className="mb-2">
                                                <Form.Label>Exercise Video Link</Form.Label>
                                                <Field
                                                    type="text"
                                                    name="exerciseVideo"
                                                    placeholder="https://youtu.be"
                                                    className="form-control"
                                                    disabled={!ExercisePermission?.canUpdate || tab === "approvalRequest" || tab === "active"}
                                                    onChange={(e) => handleExerciseVideoChange(e, setFieldValue)}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col lg={6}>
                                        <Form.Group className="mb-2">
                                        <Form.Label>Exercise Image Url</Form.Label>
                                        <Field
                                            type="text"
                                            name="exerciseImage"
                                            placeholder="Enter image url"
                                            className="form-control"
                                            onChange={(e) => handleExerciseImageChange(e, setFieldValue)}
                                            value={exerciseImage}
                                        />
                                    </Form.Group>
                                        </Col>

                                        {/* <Col lg={6}>
                                            <Form.Group className="mb-2">
                                                <Form.Label>Select Body Parts</Form.Label>
                                                <Multiselect
                                                    options={bodyNames}
                                                    selectedValues={selectedBodyNames}
                                                    onSelect={handleSelect}
                                                    onRemove={handleRemove}
                                                    displayValue="name"
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col lg={6}>
                                            <Form.Group className="mb-2">
                                                <Form.Label>Select Movements</Form.Label>
                                                <Multiselect
                                                    options={movementsArray}
                                                    selectedValues={selectedMovements}
                                                    onSelect={handleSelectMovements}
                                                    onRemove={handleRemoveMovements}
                                                    displayValue="name"
                                                />
                                            </Form.Group>
                                        </Col> */}



                                       
                                           
                                           
                           



                                        <Col lg={12}>
                                            <Form.Group className="mb-2">
                                                <Form.Label>Exercise Description</Form.Label>
                                                <Field
                                                    as="textarea"
                                                    rows={6}
                                                    name="exerciseDescription"
                                                    placeholder="Enter description"
                                                    className="form-control"
                                                    disabled={!ExercisePermission?.canUpdate || tab === "approvalRequest" || tab === "active"}
                                                    onChange={(e) => handleExerciseDescriptionChange(e, setFieldValue)}
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col lg={12}>
                                <div className="d-flex justify-content-between">
                     <h5 className="flex-grow-1 mb-0">Body Parts and Movements</h5> 
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          addNewField();
                        }}
                       className="cmn_btn add_row"
                      >
                        Add New Field
                      </button>
                     </div>
                                {data.map((entry, index) => (
                                                <div
                                                    key={index}
                                                  className="row mb-3"
                                                >
                                                    <div className="col-lg-6">
                                                        <label>Select Name:</label>
                                                        <Select
                                                            value={
                                                                entry.name
                                                                    ? { value: entry.name, label: entry.name }
                                                                    : null
                                                            }
                                                            options={getAvailableNames()}
                                                            onChange={(selectedOption) =>
                                                                handleNameChange(index, selectedOption)
                                                            }
                                                            placeholder="Select Name"
                                                        />
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <label>Select Movements:</label>
                                                  <div className="d-flex align-items-center gap-2">
                                                  <Select
                                                            isMulti
                                                            value={entry.movements.map((movement) => ({
                                                                value: movement,
                                                                label: movement,
                                                            }))}
                                                            options={getMovementsForName(entry.name)}
                                                            onChange={(selectedOptions) =>
                                                                handleMovementChange(index, selectedOptions || [])
                                                            }
                                                            placeholder="Select Movements"
                                                            isDisabled={!entry.name}
                                                            className="flex-grow-1"
                                                        />
                                                             <span class="minus align-self-end mb-2">-</span>
                                                  </div>
                                                    </div>
                                                </div>
                                            ))}</Col>
                            </Row>
                            {ExercisePermission?.canUpdate && (tab !== "approvalRequest" && tab !== "active") && (
                                <>
                                    <div className="d-flex justify-content-end align-items-center mt-3 flex-wrap">
                                        {!is_exercise_updated?.isLoading ? (
                                            <>
                                                {tab !== "approvalRequest" && (
                                                    <button
                                                        disabled={draft}
                                                        className="btn cmn_btn me-2"
                                                        onClick={() => handleSave()}
                                                    >
                                                        {tab === "approvalRequest" ? "Update" : "Send For Approval"}
                                                    </button>
                                                )}
                                            </>
                                        ) : (
                                            <button className="btn cmn_btn me-2">
                                                <Spinner animation="border" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </Spinner>
                                            </button>
                                        )}
                                        {!is_exercise_updated_draft?.isLoading ? (
                                            <>
                                                {/* Edit As Draft Button */}
                                                {tab !== "active" && tab !== "approvalRequest" && !admin && (
                                                    <button
                                                        onClick={() => {
                                                            setDraft(true);
                                                            handleSaveDraft();
                                                        }}
                                                        className="btn cmn_btn"
                                                    >
                                                        Edit As Draft
                                                    </button>
                                                )}
                                            </>
                                        ) : (
                                            <button className="btn cmn_btn">
                                                <Spinner animation="border" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </Spinner>
                                            </button>
                                        )}
                                    </div>
                                </>
                            )}



                        </FormikForm>
                    )}
                </Formik>
            </Modal.Body>}
        </Modal>
    );
};

export default EditExercise;
