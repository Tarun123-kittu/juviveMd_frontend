import React, { useEffect, useState } from "react";
import { Modal, Row, Col, Form } from "react-bootstrap";
import { Formik, Field, Form as FormikForm } from "formik";
import { create_exercise, clear_create_exercise_state } from "../../redux/slices/exerciseSlice/createExercise";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import Spinner from 'react-bootstrap/Spinner';
import { get_exercise, clear_get_single_exercise_state } from "../../redux/slices/exerciseSlice/getExercise";
import { create_exercise_draft, clear_create_exercise_draft_state } from "../../redux/slices/exerciseSlice/createAsDraft";
import Select from "react-select";
import { AddIMage } from "./ModalSvg";

const AddExcercise = ({ showAddExerciseModal, setshowAddExerciseModal, exercise_category, tab, setActiveTab, body_parts, exerciseDifficuilty, commonData, trainingType }) => {
  const dispatch = useDispatch();
  const [imagePreview, setImagePreview] = useState("");
  const [image, setImage] = useState("");
  const is_exercise_created = useSelector((store) => store.CREATE_EXERCISE);
  const is_exercise_draft_created = useSelector((store) => store.CREATE_DRAFT_EXERCISE);
  const [draft, setDraft] = useState(false)
  const [exerciseType, setExerciseType] = useState("")
  const [exerciseName, setExerciseName] = useState("")
  const [exerciseVideo, setExerciseVideo] = useState("")
  const [exerciseDescription, setExerciseDescription] = useState("")
  const [exerciseImage, setExerciseImage] = useState()
  const [loading, setLoading] = useState("")
  const [bodyNames, setBodyNames] = useState([])
  const [selectedBodyNames, setSelectedBodyNames] = useState([]);
  const [selectedMovements, setSelectedMovements] = useState([]);
  const [movementsArray, setMovementsArray] = useState([]);
  const [movementResponse, setMovementResponse] = useState()
  const [difficulty, setDifficuilty] = useState()
  const [difficuiltOptions, setDifficuiltOptions] = useState()
  const [bodyPartError, setBodyPartError] = useState('')
  const [difficuiltyResponse, setDifficuiltyResponse] = useState()
  const [data, setData] = useState([{ name: "", movements: [] }]);
  const [fieldError, setFieldError] = useState("")
  const [apiData, setApiData] = useState();
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
  const [unit, setUnit] = useState('')
  const [training_type_data, setTraining_type_data] = useState([])

  const handleClose = () => {
    setshowAddExerciseModal(false);
    dispatch(clear_create_exercise_state());
    setImagePreview("")
    setSelectedBodyNames([])
    setSelectedMovements([])
    setMovementsArray([])
    setMovementResponse([])
    setDifficuilty()
    setDifficuiltyResponse()
    setData([{ name: "", movements: [] }])
    setBodyPartError('')
    setFieldError('')
    setExerciseName('')
    setExerciseType('')
    setExerciseVideo('')
    setExerciseDescription('')
    setExerciseImage()
    setLoading("")
    setCategories([
      {
        category: "",
        start_point: {
          sets: null,
          reps: 0,
          time: 0,
        }
      }
    ])
    setTraining_type_data([])
  };

  const options = trainingType.map((type) => ({
    value: type,
    label: type,
  }));

  useEffect(() => {
    if (body_parts && body_parts.length > 0) {
      setApiData(body_parts);
    }
  }, [body_parts]);

  const initialValues = {
    exerciseName: "",
    exerciseType: "",
    exerciseVideo: "",
    exerciseDescription: "",
    exerciseImage: null,
  };

  const handleSave = (values) => {
    setLoading("first")

    dispatch(clear_get_single_exercise_state())
    dispatch(
      create_exercise({
        exercise_name: exerciseName,
        exercise_type: exerciseType,
        categories: categories,
        video_link: exerciseVideo,
        image_url: exerciseImage,
        description: exerciseDescription,
        unit:unit,
        draft: false,
        training_type: training_type_data
      })
    );
  };

  const handleSaveDraft = (values) => {
    setLoading("second")
    if (!exerciseName && !exerciseType && !difficuiltyResponse && !exerciseVideo && !exerciseImage && !exerciseDescription) {
      setFieldError("Please enter at least one value to save the exercise as a draft");
      return;
    }
    dispatch(clear_get_single_exercise_state())
    dispatch(
      create_exercise_draft({
        exercise_name: exerciseName,
        exercise_type: exerciseType,
        categories: categories,
        video_link: exerciseVideo,
        image_url: exerciseImage,
        description: exerciseDescription,
        unit:unit,
        draft: true,
        training_type: training_type_data
      })
    );
  };


  const handleSubmit = (values) => {
  };

  useEffect(() => {
    if (is_exercise_created?.isSuccess) {
      toast.success(is_exercise_created?.message?.message);
      setActiveTab("approvalRequest")
      dispatch(clear_create_exercise_state());
      dispatch(clear_get_single_exercise_state());
      dispatch(get_exercise({ page: 1, tab: "approvalRequest" }))
      setImagePreview("")
      setSelectedBodyNames([])
      setSelectedMovements([])
      setMovementsArray([])
      setMovementResponse([])
      setDifficuilty()
      setDifficuiltyResponse()
      setData([{ name: "", movements: [] }])
      setActiveTab("approvalRequest")
      handleClose();
    }
    if (is_exercise_created?.isError) {
      toast.error(is_exercise_created?.error?.message);
      dispatch(clear_create_exercise_state());
    }
  }, [is_exercise_created]);

  useEffect(() => {
    if (is_exercise_draft_created?.isSuccess) {
      toast.success(is_exercise_draft_created?.message?.message);
      setActiveTab("draft")
      dispatch(clear_create_exercise_draft_state());
      dispatch(clear_get_single_exercise_state());
      dispatch(get_exercise({ page: 1, tab: "draft" }))
      setImagePreview("")
      setSelectedBodyNames([])
      setSelectedMovements([])
      setMovementsArray([])
      setMovementResponse([])
      setDifficuilty()
      setDifficuiltOptions()
      setData([{ name: "", movements: [] }])
      setActiveTab("draft")
      handleClose();
    }
    if (is_exercise_draft_created?.isError) {
      toast.error(is_exercise_draft_created?.error?.message);
      dispatch(clear_create_exercise_draft_state());
    }
  }, [is_exercise_draft_created]);

  const handleExerciseTypeChange = (e, setFieldValue) => {
    setFieldError("")
    const value = e.target.value;
    setExerciseType(value);
    setFieldValue("exerciseType", value);
  };
  const handleExerciseNameChange = (e, setFieldValue) => {
    setFieldError("")
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
    setFieldError('')
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

  useEffect(() => {
    const bodyParts = data.filter((entry) => entry.name);
    setMovementResponse(bodyParts);
  }, [data]);

  const handleNameChange = (index, selectedOption) => {
    setBodyPartError('')
    const updatedData = [...data];
    updatedData[index].name = selectedOption?.value || "";
    updatedData[index].movements = [];
    setData(updatedData);
  };



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



  const handleAddNewCategory = () => {
    const areFieldsFilled = categories.every(category =>
      category.category !== "" &&
      category.start_point.sets !== null &&
      (category.start_point.reps !== 0 || category.start_point.time !== 0)
    );

    if (!areFieldsFilled) {
      toast.error("Please fill all fields before adding a new category.");
      return;
    }

    let newCategory = {
      category: "",
      start_point: {
        sets: null,
        reps: 0,
        time: 0,
      }
    };
    setCategories((prevCategories) => {
      const allCategories = [...prevCategories];
      allCategories.push(newCategory);
      return allCategories;
    });
  };

  const handleSetTrainingType = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    setTraining_type_data(selectedValues);
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

          if (field === "unit") {
            if (value === "sec") {
              updatedStartPoint.reps = 0; // Reset reps when "sec" is selected
            } else {
              updatedStartPoint.time = 0; // Reset time when another unit is selected
            }
          }

          return {
            ...category,
            start_point: updatedStartPoint,
          };
        }
        return category;
      })
    );
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
        <svg onClick={handleClose} width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M24.2798 2.6503C24.4239 2.50636 24.5383 2.33545 24.6163 2.14733C24.6944 1.9592 24.7346 1.75754 24.7348 1.55386C24.7349 1.35019 24.6949 1.14848 24.6171 0.960257C24.5392 0.772036 24.4251 0.600986 24.2812 0.456876C24.1372 0.312765 23.9663 0.198416 23.7782 0.120356C23.5901 0.0422964 23.3884 0.00205508 23.1847 0.0019299C22.9811 0.00180471 22.7794 0.0417981 22.5911 0.119627C22.4029 0.197455 22.2319 0.311594 22.0877 0.455528L12.7344 9.8089L3.38369 0.455528C3.09265 0.164483 2.69791 0.000976559 2.28631 0.000976562C1.87471 0.000976566 1.47997 0.164483 1.18893 0.455528C0.897882 0.746572 0.734375 1.14131 0.734375 1.55291C0.734375 1.96451 0.897882 2.35925 1.18893 2.6503L10.5423 12.001L1.18893 21.3517C1.04482 21.4958 0.930501 21.6668 0.852509 21.8551C0.774517 22.0434 0.734375 22.2452 0.734375 22.449C0.734375 22.6528 0.774517 22.8546 0.852509 23.0429C0.930501 23.2312 1.04482 23.4023 1.18893 23.5464C1.47997 23.8375 1.87471 24.001 2.28631 24.001C2.49011 24.001 2.69192 23.9608 2.88021 23.8828C3.0685 23.8048 3.23958 23.6905 3.38369 23.5464L12.7344 14.193L22.0877 23.5464C22.3788 23.8371 22.7734 24.0003 23.1847 24C23.5961 23.9998 23.9905 23.8361 24.2812 23.5451C24.5719 23.254 24.735 22.8594 24.7348 22.4481C24.7345 22.0367 24.5709 21.6423 24.2798 21.3517L14.9264 12.001L24.2798 2.6503Z" fill="black" />
        </svg>
      </div>
      <Modal.Body className="p-0 authWrapper add_exercise">
        <h2 className="deletmodal_heading">Add Exercise Detail</h2>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ setFieldValue }) => (
            <FormikForm>
              <Row>
                <Col lg={6}>
                  <Form.Group className="mb-2">
                    <Form.Label>Exercise Type</Form.Label>
                    <Field
                      as="select"
                      name="exerciseType"
                      className="form-select"
                      onChange={(e) => handleExerciseTypeChange(e, setFieldValue)}
                    >
                      <option value="">Select exercise type</option>
                      {exercise_category?.map((data) => {
                        return <option value={data}>{data}</option>;
                      })}
                    </Field>
                  </Form.Group>

                  <Form.Group className="mb-2">
                    <Form.Label>Exercise Name</Form.Label>
                    <Field
                      type="text"
                      name="exerciseName"
                      placeholder="Enter exercise name"
                      className="form-control"
                      onChange={(e) => handleExerciseNameChange(e, setFieldValue)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Label>Exercise Image Url</Form.Label>
                    <Field
                      type="text"
                      name="exerciseImage"
                      placeholder="Enter image url"
                      className="form-control"
                      onChange={(e) => handleExerciseImageChange(e, setFieldValue)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Label>Exercise Video Link</Form.Label>
                    <Field
                      type="text"
                      name="exerciseVideo"
                      placeholder="https://youtube.com"
                      className="form-control"
                      onChange={(e) => handleExerciseVideoChange(e, setFieldValue)}
                    />
                  </Form.Group>

                </Col>
                <Col lg={6} className="image_view">
                  <Row>
                    <Col lg={12}>
                      <Form.Label>Exercise Image</Form.Label>
                      <div className="exercise_view_image">
                        {exerciseImage && <img src={exerciseImage} alt="exercise" width={300} />}
                        {!exerciseImage && AddIMage}
                      </div>
                    </Col>


                  </Row>
                </Col>
                <Col lg={12}>
                  <Form.Group>
                    <Form.Label>Exercise Description</Form.Label>
                    <Field
                      as="textarea"
                      rows={2}
                      name="exerciseDescription"
                      placeholder="Enter description"
                      className="form-control"
                      onChange={(e) => handleExerciseDescriptionChange(e, setFieldValue)}
                    />
                  </Form.Group>
                </Col>
                <Col lg={12}>
                  {bodyPartError && <span className="error text-danger">{bodyPartError}</span>}
                  {fieldError && <span className="error text-danger">{fieldError}</span>}
                </Col>
                <Col lg={12}>
                  <div className="modal_card mt-3">
                    <h5 className="flex-grow-1 mb-2">Exercise Unit</h5>
                    <Row>
                      <Col lg={6}>
                        <Col lg={6}>
                              <select className="form-select" onChange={(e) => setUnit(e.target.value)}>
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
                              <label>Category</label>
                              <select onChange={(e) => handleSetCategory(i, e.target.value)} className="form-select">
                                <option value="" selected>Select Block</option>
                                {commonData?.map((data) => {
                                  return <option value={data}>{data}</option>;
                                })}
                              </select>
                            </Col>

                            <Col lg={6} className="text-end d-flex justify-content-end align-items-center">
                              {i === 0 && <button class="cmn_btn add_row" onClick={() => handleAddNewCategory()}>Add Categories</button>}
                            </Col>

                            <Col lg={9}>
                              <div className="d-flex align-items-center gap-2">
                                <div>
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
                                <div>
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
                                <div>
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
                              </div>
                            </Col>

                          </>
                        )
                      })}


                    </Row>
                  </div>
                </Col>
                <Col lg={12}>
                  <div className="modal_card mt-3">
                    <h5 className="flex-grow-1 mb-2">Training Type</h5>
                    <Row>
                      <Col lg={6}>
                        <label>Training Type</label>
                        <Select
                          options={options}
                          isMulti // Enables multiple selection
                          className="basic-multi-select"
                          classNamePrefix="select"
                          placeholder="Select Training type"
                          onChange={handleSetTrainingType}
                        />
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
              <div className="text-end mt-3">
                <div className="d-flex justify-content-end gap-2">


                  <button
                    onClick={() => {
                      handleSave();
                      setLoading("first");
                    }}
                    disabled={draft || loading === "second"}
                    className="btn cmn_btn"
                  >
                    Send For Approval

                    {is_exercise_created?.isLoading && <Spinner animation="border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>}
                  </button>


                  <button
                    onClick={() => {
                      setDraft(true);
                      handleSaveDraft();
                      setLoading("second");
                    }}
                    disabled={loading === "first"}
                    className="btn cmn_btn ms-2"
                  >
                    Save as Draft

                    {is_exercise_draft_created?.isLoading && <Spinner animation="border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>}
                  </button>

                </div>

              </div>
            </FormikForm>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default AddExcercise;
