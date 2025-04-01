import React, { useEffect, useState } from "react";
import { Modal, Row, Col, Form } from "react-bootstrap";
import { Formik, Field, Form as FormikForm } from "formik";
import DefaultImage from "../../Images/file.png";
import { create_exercise } from "../../redux/slices/exerciseSlice/createExercise";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { showToast } from "../../common/toast/showToast";
import { get_single_exercise } from "../../redux/slices/exerciseSlice/getSingleExercise";
import {
    update_exercise,
    clear_update_exercise_state,
} from "../../redux/slices/exerciseSlice/updateExercise";
import Spinner from "react-bootstrap/Spinner";
import {
    get_exercise,
    clear_get_single_exercise_state,
} from "../../redux/slices/exerciseSlice/getExercise";
import Loader from "../../common/Loader/Loader";
import * as Yup from "yup";
import {
    update_exercise_draft,
    clear_update_exercise_draft_state,
} from "../../redux/slices/exerciseSlice/updateExercideDraft";
import Multiselect from "multiselect-react-dropdown";
import Select from "react-select";
const EditExercise = ({
    showAddExerciseModal,
    setshowAddExerciseModal,
    exercise_category,
    id,
    tab,
    admin,
    setExerciseId,
    ExercisePermission,
    body_parts,
    exerciseDifficuilty,
    commonData,
    trainingType,
    setActiveTab
}) => {
    const dispatch = useDispatch();
    const [imagePreview, setImagePreview] = useState(DefaultImage);
    const is_exercise = useSelector((store) => store.SINGLE_EXERCISE);
    const is_exercise_updated = useSelector(
        (store) => store.UPDATE_EXERCISE_DATA
    );
    const is_exercise_updated_draft = useSelector(
        (store) => store.UPDATE_DRAFT_EXERCISE
    );
    const [hasImage, setHasImage] = useState(false);
    const [image, setImage] = useState();
    const [draft, setDraft] = useState(false);
    const [exerciseType, setExerciseType] = useState("");
    const [exerciseName, setExerciseName] = useState("");
    const [exerciseVideo, setExerciseVideo] = useState("");
    const [exerciseDescription, setExerciseDescription] = useState("");
    const [exerciseImage, setExerciseImage] = useState("");
    const [bodyNames, setBodyNames] = useState([]);
    const [selectedBodyNames, setSelectedBodyNames] = useState([]);
    const [selectedMovements, setSelectedMovements] = useState([]);
    const [movementsArray, setMovementsArray] = useState([]);
    const [bodyPartError, setBodyPartError] = useState("");
    const [movementResponse, setMovementResponse] = useState();
    const [difficulty, setDifficuilty] = useState();
    const [fieldError, setFieldError] = useState("");
    const [loading, setLoading] = useState("")
    const [difficuiltOptions, setDifficuiltOptions] = useState();
    const [difficuiltyResponse, setDifficuiltyResponse] = useState();
    const [data, setData] = useState([{ name: "", movements: [] }]);
    const [apiData, setApiData] = useState();
    const [unit, setUnit] = useState('')
    const [categories, setCategories] = useState([
        {
            category: "",
            start_point: {
                sets: null,
                reps: 0,
                time: 0,
            }
        }
    ])
    const [training_type_data, setTraining_type_data] = useState([])
    const [selectedTrainingType, setSelectedTrainingType] = useState([]);

    const options = trainingType.map((type) => ({
        value: type,
        label: type,
    }));

    useEffect(() => {
        setSelectedTrainingType(training_type_data.map((type) => ({ value: type, label: type })));
    }, [training_type_data])


    const validationSchema = Yup.object().shape({
        exerciseName: Yup.string()
            .oneOf(
                exercise_category || [],
                "Exercise name must be one of the allowed categories"
            )
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
            setApiData(body_parts);
        }
    }, [body_parts]);

    useEffect(() => {
        if (is_exercise?.isSuccess) {
            const data = is_exercise?.data?.data;
            setInitialValues({
                exerciseName: data?.exercise_name || "",
                exerciseType: data?.category || "",
                exerciseVideo: data?.video_link || "",
                exerciseDescription: data?.description || "",
                exerciseImage: data?.imageUrl || "",
            });
            setImagePreview(data?.image_url || DefaultImage);
            setUnit(data?.unit)
            setExerciseType(data?.exercise_type);
            setExerciseName(data?.exercise_name);
            setExerciseVideo(data?.video_link);
            setExerciseDescription(data?.description);
            setCategories(data?.categories)
            setTraining_type_data(data?.training_type)
            setExerciseImage(data?.image_url);
            const difficuiltValue = data?.difficulty_level?.map((val) => ({
                name: val,
            }));
            setDifficuilty(difficuiltValue);
            setDifficuiltyResponse(data?.difficulty_level);
            const selectMovements = data?.body_parts
                ?.map((el) => {
                    return el.movements?.map((move) => ({ name: move, key: el.name }));
                })
                .flat();
            setSelectedMovements(selectMovements);
            const bodyPart = data?.body_parts?.map((part) => ({ name: part.name }));
            setSelectedBodyNames(bodyPart);
            setMovementResponse(data?.body_parts);
            if (data?.body_parts?.length) {
                const formattedData = data?.body_parts.map((item) => ({
                    name: item.name,
                    movements: item.movements,
                }));
                setData(formattedData);
            } else {
                setData([{ name: "", movements: [] }]);
            }
        }
    }, [is_exercise]);

    const handleClose = () => {
        setshowAddExerciseModal(false);
        setExerciseId(null);
        setBodyPartError("");
        setFieldError("");
        setExerciseName("");
        setExerciseType("");
        setExerciseVideo("");
        setExerciseDescription("");
        setExerciseImage();
        setData([{ name: "", movements: [] }]);
        setDifficuiltyResponse();
        setLoading("")
    };

    const handleImageChange = (event, setFieldValue) => {
        const file = event.target.files[0];
        setHasImage(true);
        if (file) {
            setFieldValue("exerciseImage", file);
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = (values) => {

        dispatch(
            update_exercise({
                exercise_name: exerciseName,
                exercise_type: exerciseType,
                categories: categories,
                video_link: exerciseVideo,
                image_url: exerciseImage,
                description: exerciseDescription,
                unit: unit,
                draft: false,
                training_type: training_type_data,
                id: id,
                hasImage: hasImage,
            })
        );
    };
    const handleSaveDraft = (values) => {
        const bodyParts = data.filter((entry) => entry.name);
        if (
            !exerciseName &&
            !exerciseType &&
            !difficuiltyResponse &&
            !exerciseVideo &&
            !exerciseImage &&
            !exerciseDescription
        ) {
            setFieldError(
                "Please enter at least one value to save the exercise as a draft"
            );
            return;
        }
        dispatch(
            update_exercise_draft({
                exercise_name: exerciseName,
                exercise_type: exerciseType,
                categories: categories,
                video_link: exerciseVideo,
                image_url: exerciseImage,
                description: exerciseDescription,
                draft: true,
                unit: unit,
                training_type: training_type_data,
                id: id,
                hasImage: hasImage,
            })
        );
    };

    useEffect(() => {
        if (is_exercise_updated?.isSuccess) {
            toast.success(is_exercise_updated?.message?.message);
            setshowAddExerciseModal(false);
            dispatch(get_exercise({ page: 1, tab }));
            dispatch(clear_update_exercise_state());
            setHasImage(false);
            setExerciseId(null);
            setActiveTab("approvalRequest")
        }
        if (is_exercise_updated?.isError) {
            toast.error(is_exercise_updated?.error?.message);
            dispatch(clear_update_exercise_state());
        }
    }, [is_exercise_updated]);

    useEffect(() => {
        if (is_exercise_updated_draft?.isSuccess) {
            toast.success(is_exercise_updated_draft?.message?.message);

            setshowAddExerciseModal(false);
            dispatch(get_exercise({ page: 1, tab }));
            dispatch(clear_update_exercise_draft_state());
            setHasImage(false);
            setExerciseId(null);
        }
        if (is_exercise_updated_draft?.isError) {
            showToast(is_exercise_updated_draft?.error?.loggedError, "ERROR");
            showToast(is_exercise_updated_draft?.error?.message, "ERROR");
            dispatch(clear_update_exercise_draft_state());
        }
    }, [is_exercise_updated_draft]);

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
    const handleExerciseImageChange = async (e, setFieldValue) => {
        setFieldError("");
        const value = e.target.value;
        const isValid = await checkImageExists(value);
        if (!isValid) {
            toast.error("Invalid image URL. Please enter a valid image link.");
            setExerciseImage("")
            setFieldValue("exerciseImage", "");
            return
        } else {
            setExerciseImage(value)
            setFieldValue("exerciseImage", value);
        }
    };

    const checkImageExists = (url) => {
        return new Promise((resolve) => {
            const img = new Image();
            img.src = url;
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
        });
    };

    const handleExerciseVideoChange = (e, setFieldValue) => {
        setFieldError('')
        const value = e.target.value
        setExerciseVideo(value);
        setFieldValue("exerciseVideo", value);

    };

    const handleExerciseDescriptionChange = (e, setFieldValue) => {
        const value = e.target.value;
        setExerciseDescription(value);
        setFieldValue("exerciseDescription", value);
    };

    useEffect(() => {
        if (body_parts?.length) {
            const bodyName = body_parts?.map((part) => ({ name: part.name }));
            setBodyNames(bodyName);
        }
    }, [body_parts]);


    const handleSelectDifficuilt = (index, selectedList) => {
        setFieldError('');

        const formattedResponse = selectedList.map((item) => item.name);

        setCategories((prevCategories) => {
            return prevCategories.map((category, idx) =>
                idx === index ? { ...category, category: formattedResponse[0] } : category
            );
        });

        setDifficuilty([...selectedList]);
        setDifficuiltyResponse(formattedResponse);
    };

    useEffect(() => {
        if (selectedBodyNames?.length && body_parts?.length) {
            const newMovements = selectedBodyNames?.flatMap((selected) => {
                const matchingPart = body_parts?.find(
                    (el) => el.name === selected.name
                );
                return (
                    matchingPart?.movements.map((movement) => ({
                        name: movement,
                        key: selected.name,
                    })) || []
                );
            });

            setMovementsArray(newMovements);
        } else {
            setMovementsArray([]);
        }
    }, [selectedBodyNames, body_parts]);

    useEffect(() => {
        const response = selectedMovements?.reduce((acc, movement) => {
            const bodyPartIndex = acc.findIndex((part) => part.name === movement.key);

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
        const diffcuilty = exerciseDifficuilty?.map((exe) => ({ name: exe }));
        setDifficuiltOptions(diffcuilty);
    }, [exerciseDifficuilty]);

    useEffect(() => {
        const areCategoriesValid =
            categories.length > 0 &&
            categories.every(
                (cat) =>
                    cat.category &&
                    cat.category.trim() !== "" &&
                    cat.start_point &&
                    cat.start_point.sets !== null &&
                    (cat.start_point.reps !== 0 || cat.start_point.time !== 0)
            );

        const isValid =
            exerciseType &&
            exerciseName &&
            exerciseVideo &&
            exerciseDescription &&
            exerciseImage &&
            training_type_data.length > 0 &&
            areCategoriesValid;

        setDraft(!isValid);
    }, [
        exerciseType,
        exerciseName,
        exerciseVideo,
        exerciseDescription,
        exerciseImage,
        categories,
        training_type_data
    ]);

    const areFieldsFilled = categories.every(category =>
        category.category !== "" &&
        category.start_point.sets !== null &&
        (category.start_point.reps !== 0 || category.start_point.time !== 0)
    );
    const handleAddNewCategory = () => {

        if (!areFieldsFilled) {

            showToast("Please fill all fields before adding a new categorys", "ERROR");
            return;
        }

        let newCategory = {
            category: "",
            start_point: {
                sets: null,
                reps: null
            }
        };
        setCategories((prevCategories) => {
            const allCategories = [...prevCategories];
            allCategories.push(newCategory);
            return allCategories;
        });
    };

    const handleSetCategory = (i, value) => {
        setCategories((prevCategories) => {
            return prevCategories.map((category, index) => {
                if (index === i) {
                    return {
                        ...category,
                        category: value
                    }
                }
                return category
            })
        })
    }

    const handleUpdateStartPoint = (i, field, value) => {
        setCategories((prevCategories) =>
            prevCategories.map((category, index) => {
                if (index === i) {
                    let updatedStartPoint = {
                        ...category.start_point,
                        [field]: value,
                    };
                    console.log(updatedStartPoint,"updatedStartPoint===>");
                    
                    if (field === "unit") {
                        if (value === "sec") {
                            console.log(field,"field inside");
                            
                            updatedStartPoint.reps = 0;
                        } else {
                            console.log(field,"field inside in");
                            updatedStartPoint.time = 0;
                        }
                    }
                    console.log(updatedStartPoint,"updatedStartPoint out===>");
                    return {
                        ...category,
                        start_point: updatedStartPoint,
                    };
                }
                return category;
            })
        );
    };

    const handleSetTrainingType = (selectedOptions) => {
        const selectedValues = selectedOptions.map((option) => option.value);
        setTraining_type_data(selectedValues);
    };

    const handleRemoveCategories = (i) => {
        setCategories((prevCategories) => {
          return prevCategories.filter((category, index) => index !== i);
        });
      };

    return (
        <Modal
            show={showAddExerciseModal}
            onHide={handleClose}
            className="cmn_modal"
            centered
            size="md"
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
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M24.2798 2.6503C24.4239 2.50636 24.5383 2.33545 24.6163 2.14733C24.6944 1.9592 24.7346 1.75754 24.7348 1.55386C24.7349 1.35019 24.6949 1.14848 24.6171 0.960257C24.5392 0.772036 24.4251 0.600986 24.2812 0.456876C24.1372 0.312765 23.9663 0.198416 23.7782 0.120356C23.5901 0.0422964 23.3884 0.00205508 23.1847 0.0019299C22.9811 0.00180471 22.7794 0.0417981 22.5911 0.119627C22.4029 0.197455 22.2319 0.311594 22.0877 0.455528L12.7344 9.8089L3.38369 0.455528C3.09265 0.164483 2.69791 0.000976559 2.28631 0.000976562C1.87471 0.000976566 1.47997 0.164483 1.18893 0.455528C0.897882 0.746572 0.734375 1.14131 0.734375 1.55291C0.734375 1.96451 0.897882 2.35925 1.18893 2.6503L10.5423 12.001L1.18893 21.3517C1.04482 21.4958 0.930501 21.6668 0.852509 21.8551C0.774517 22.0434 0.734375 22.2452 0.734375 22.449C0.734375 22.6528 0.774517 22.8546 0.852509 23.0429C0.930501 23.2312 1.04482 23.4023 1.18893 23.5464C1.47997 23.8375 1.87471 24.001 2.28631 24.001C2.49011 24.001 2.69192 23.9608 2.88021 23.8828C3.0685 23.8048 3.23958 23.6905 3.38369 23.5464L12.7344 14.193L22.0877 23.5464C22.3788 23.8371 22.7734 24.0003 23.1847 24C23.5961 23.9998 23.9905 23.8361 24.2812 23.5451C24.5719 23.254 24.735 22.8594 24.7348 22.4481C24.7345 22.0367 24.5709 21.6423 24.2798 21.3517L14.9264 12.001L24.2798 2.6503Z"
                        fill="black"
                    />
                </svg>
            </div>
            {is_exercise?.isLoading ? (
                <Loader />
            ) : (
                <Modal.Body className="p-0 authWrapper add_exercise">
                    <h2 className="deletmodal_heading">Edit Exercise Detail</h2>
                    <Formik
                        initialValues={initialValues}
                        enableReinitialize
                        onSubmit={() => console.log("")}
                    >
                        {({ setFieldValue }) => (
                            <FormikForm>
                                <Row>
                                    <Col lg={6}>
                                        <Form.Group className="mb-2">
                                            <Form.Label>Exercise Type</Form.Label>
                                            <Field
                                                as="select"
                                                name="exerciseType"
                                                className="form-control"
                                                value={exerciseType}
                                                disabled={
                                                    !ExercisePermission?.canUpdate ||
                                                    tab === "approvalRequest" ||
                                                    tab === "active"
                                                }
                                                onChange={(e) =>
                                                    handleExerciseTypeChange(e, setFieldValue)
                                                }
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
                                            <Form.Label>Exercise Name</Form.Label>
                                            <Field
                                                type="text"
                                                name="exerciseName"
                                                placeholder="Enter exercise name"
                                                className="form-control"
                                                disabled={
                                                    !ExercisePermission?.canUpdate ||
                                                    tab === "approvalRequest" ||
                                                    tab === "active"
                                                }
                                                onChange={(e) =>
                                                    handleExerciseNameChange(e, setFieldValue)
                                                }
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-2">
                                            <Form.Label>Exercise Image Url</Form.Label>
                                            <Field
                                                type="text"
                                                name="exerciseImage"
                                                placeholder="Enter image url"
                                                className="form-control"
                                                onChange={(e) =>
                                                    handleExerciseImageChange(e, setFieldValue)
                                                }
                                                value={exerciseImage}
                                                disabled={
                                                    !ExercisePermission?.canUpdate ||
                                                    tab === "approvalRequest" ||
                                                    tab === "active"
                                                }
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-2">
                                            <Form.Label>Exercise Video Link</Form.Label>
                                            <Field
                                                type="text"
                                                name="exerciseVideo"
                                                placeholder="https://youtu.be"
                                                className="form-control"
                                                disabled={
                                                    !ExercisePermission?.canUpdate ||
                                                    tab === "approvalRequest" ||
                                                    tab === "active"
                                                }
                                                onChange={(e) =>
                                                    handleExerciseVideoChange(e, setFieldValue)
                                                }
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6} className="image_view">
                                        <Row>
                                            <Col lg={12}>
                                                <Form.Label>Exercise Image</Form.Label>
                                                <div className="exercise_view_image">
                                                    {/* {AddIMage} */}
                                                    <img src={exerciseImage} className=" object-fit-cover" width={300} />

                                                </div>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col lg={12}>
                                        <Form.Group className="">
                                            <Form.Label>Exercise Description</Form.Label>
                                            <Field
                                                as="textarea"
                                                rows={2}
                                                name="exerciseDescription"
                                                placeholder="Enter description"
                                                className="form-control"
                                                disabled={
                                                    !ExercisePermission?.canUpdate ||
                                                    tab === "approvalRequest" ||
                                                    tab === "active"
                                                }
                                                onChange={(e) =>
                                                    handleExerciseDescriptionChange(e, setFieldValue)
                                                }
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col lg={12}>
                                        <div className="modal_card mt-3">
                                        <h5 class="flex-grow-1 mb-2">Exercise Unit</h5>
                                            <Row>
                                                <Col lg={6}>
                                                    <Col lg={6}>
                                                        <label>Unit</label>
                                                        <select className="form-select" 
                                                         onChange={(e) => {
                                                            const selectedUnit = e.target.value;
                                                            setUnit(selectedUnit);
                                                            
                                                           setCategories([...categories]?.map((cur)=>{
                                                                return {
                                                                    ...cur,
                                                                    start_point:{
                                                                        ...cur?.start_point,
                                                                    reps: 0,
                                                                    time: 0,
                                                                    }
                                                                }
                                                            }))
                                                
                                                            // setCategories((prevCategories) => 
                                                            //     prevCategories.map((category) => ({
                                                            //         ...category,
                                                            //         start_point: {
                                                            //             ...category.start_point,
                                                            //             unit: selectedUnit,
                                                            //             sets: null,
                                                            //             reps: 0,
                                                            //             time: 0
                                                            //         }
                                                            //     }))
                                                            // );
                                                        }}
                                                         value={unit}>
                                                            <option value="" selected>Select Unit</option>
                                                            <option value="rotations">Rotations</option>
                                                            <option value="sec">Sec</option>
                                                            <option value="side">Side</option>
                                                            <option value="steps">Steps</option>
                                                            <option value="plane">Plane</option>
                                                        </select>
                                                    </Col>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Col>

                                    <Col lg={12}>
                                        <div className="modal_card mt-3">
                                            <h5 className="flex-grow-1 mb-2">Categories and Blocks</h5>
                                            <Row>
                                                {categories?.map((list, i) => {
                                                    let val = [list.category]
                                                    return (
                                                        <>
                                                            <Col lg={6}>
                                                                <div className="mb-3 mt-3">
                                                                    <label>Category</label>
                                                                    <select onChange={(e) => handleSetCategory(i, e.target.value)} className="form-select" value={categories[i]?.category}>
                                                                        <option value="" selected>Select Category</option>
                                                                        {commonData?.map((data) => {
                                                                            return <option value={data}>{data}</option>;
                                                                        })}
                                                                    </select>
                                                                </div>

                                                            </Col>

                                                            <Col lg={6} className="text-end d-flex justify-content-end align-items-center">
                                                                {i === 0 && <button  class="cmn_btn add_row" onClick={() => handleAddNewCategory()}>Add Categories</button>}
                                                            </Col>

                                                            <Col lg={12}>
                                                                <div className="d-flex align-items-center gap-2">
                                                                    <div className="flex-grow-1">
                                                                        <label>Sets</label>
                                                                        <Field
                                                                            type="text"
                                                                            name="sets"
                                                                            placeholder="Enter sets"
                                                                            className="form-control"
                                                                            value={categories[i]?.start_point?.sets}
                                                                            onChange={(e) => handleUpdateStartPoint(i, "sets", Number(e.target.value))}
                                                                        />
                                                                    </div>
                                                                    <div className="flex-grow-1">
                                                                        <label>Reps</label>
                                                                        <Field
                                                                            type="text"
                                                                            name="sets"
                                                                            placeholder="Enter Reps"
                                                                            className="form-control"
                                                                            disabled={unit === "sec"}
                                                                            value={categories[i]?.start_point?.reps}
                                                                            onChange={(e) => handleUpdateStartPoint(i, "reps", Number(e.target.value))}
                                                                        />
                                                                    </div>
                                                                    <div className="flex-grow-1">
                                                                        <label>Time</label>
                                                                        <Field
                                                                            type="text"
                                                                            name="sets"
                                                                            placeholder="Enter Time"
                                                                            className="form-control"
                                                                            disabled={unit !== "sec"}
                                                                            value={categories[i]?.start_point?.time}
                                                                            onChange={(e) => handleUpdateStartPoint(i, "time", Number(e.target.value))}
                                                                        />
                                                                    </div>
                                                                    {categories?.length > 1 && <span className="minus align-self-end mb-2 cursor-pointer" onClick={() => handleRemoveCategories(i)}>x</span>}
                                                                </div>
                                                            </Col>
                                                        </>
                                                    )
                                                })}
                                            </Row>
                                        </div>
                                    </Col>

                                    <Col lg={12}>
                                        {bodyPartError && (
                                            <span className="error text-danger">{bodyPartError}</span>
                                        )}
                                        {fieldError && (
                                            <span className="error text-danger">{fieldError}</span>
                                        )}
                                    </Col>

                                    <Col lg={12}>
                                        <div className="modal_card mt-3">
                                            <h5 className="flex-grow-1 mb-2">Training Type</h5>
                                            <Row>
                                                <Col lg={6}>
                                                    <label>Training Type</label>
                                                    <Select
                                                        options={options}
                                                        isMulti
                                                        className="basic-multi-select"
                                                        classNamePrefix="select"
                                                        placeholder="Select Training type"
                                                        value={selectedTrainingType}
                                                        onChange={handleSetTrainingType}
                                                    />
                                                </Col>
                                            </Row>
                                        </div>
                                    </Col>
                                </Row>
                                {ExercisePermission?.canUpdate &&
                                    tab !== "approvalRequest" &&
                                    tab !== "active" && (
                                        <>
                                            <div className="d-flex justify-content-end align-items-center mt-3 flex-wrap">
                                                {tab !== "approvalRequest" && (
                                                    <button
                                                        disabled={draft}
                                                        className="btn cmn_btn me-2"
                                                        onClick={() => handleSave()}
                                                    >
                                                        {tab === "approvalRequest"
                                                            ? "Update"
                                                            : "Send For Approval"}
                                                        {is_exercise_updated?.isLoading && (
                                                            <Spinner animation="border" role="status">
                                                                <span className="visually-hidden">
                                                                    Loading...
                                                                </span>
                                                            </Spinner>
                                                        )}
                                                    </button>
                                                )}

                                                {tab !== "active" &&
                                                    tab !== "approvalRequest" &&
                                                    !admin && (
                                                        <button
                                                            onClick={() => {
                                                                setDraft(true);
                                                                handleSaveDraft();
                                                            }}
                                                            className="btn cmn_btn"
                                                        >
                                                            Edit as draft{" "}
                                                            {is_exercise_updated_draft?.isLoading && (
                                                                <Spinner animation="border" role="status">
                                                                    <span className="visually-hidden">
                                                                        Loading...
                                                                    </span>
                                                                </Spinner>
                                                            )}
                                                        </button>
                                                    )}
                                            </div>
                                        </>
                                    )}
                            </FormikForm>
                        )}
                    </Formik>
                </Modal.Body>
            )}
        </Modal>
    );
};

export default EditExercise;
