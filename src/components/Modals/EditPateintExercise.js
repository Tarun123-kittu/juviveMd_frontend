import React, { useState, useEffect } from "react";
import { Modal, Row, Col, Form } from "react-bootstrap";
import TrainingImage from "../../Images/training.png";
import { get_selected_patient_exercise_details, clear_selected_patient_exercise_state } from "../../redux/slices/patientPlan/getSelectedPAtientPlan";
import { get_exercise_by_category, clear_exercise_by_category_state } from "../../redux/slices/exerciseSlice/getExerciseByCategory";
import { useDispatch, useSelector } from "react-redux";
import Spinner from 'react-bootstrap/Spinner';
import Multiselect from 'multiselect-react-dropdown';
import { updatePatientPlan, clear_update_patient_plan_state } from "../../redux/slices/patientPlan/updatePatientPlan";
import Loader from "../../common/Loader/Loader";
import Select from "react-select";
import { get_patient_plan } from "../../redux/slices/patientPlan/getPAtientPlan";
import toast from "react-hot-toast";

const EditPateintExercise = ({
  showEditPateintExercise,
  setshowEditPateintExercise,
  exercise_category,
  planId,
  weekdays,
  setPlanId,
  patientId,
  body_parts,
  exerciseDifficuilty,
  weekday
}) => {
  const dispatch = useDispatch()
  const [category, setCategory] = useState('')
  const [selectedExercise, setSelectedExercise] = useState('')
  const [exerciseVideo, setExerciseVideo] = useState('')
  const [exerciseImage, setExerciseImage] = useState('')
  const [distance, setDistance] = useState('')
  const [distanceUnit, setDistanceUnit] = useState('km')
  console.log(distanceUnit,distance,"distance distance distance")
  const [heartRate, setHeartRate] = useState({ value: null, unit: "bpm" })
  const [zoneTarget, setZoneTarget] = useState('')
  const [intensity, setIntensity] = useState('')
  const [pace, setPace] = useState('')
  const [selectedWeekdays, setSelectedWeekdays] = useState([])
  const [updatedWeekdays, setUpdatedWeekdays] = useState([])
  const [data, setData] = useState([]);
  const [apiData, setApiData] = useState(body_parts);
  const [diffError, setDiffError] = useState('')
  const [distanceVal, setDistanceVal] = useState({
  })
  console.log(distanceVal,"distanceVal distanceVal")
  const [flexibilityField, setFlexibilityField] = useState([{
    reps: "",
    weight: { value: null, unit: "kg" },
    time: { value: null, unit: "sec" }
  },])
  const [cardioFields, setCradioFields] = useState([{
    time: { value: null, unit: "sec" }
  },])
  const [categoryError, setCategoryError] = useState('')
  const [selectedExerciseError, setSelectedExerciseError] = useState('')
  const [exerciseVideoError, setExerciseVideoError] = useState('')
  const [exerciseImageError, setExerciseImagErrore] = useState('')
  const [distanceError, setDistanceError] = useState('')
  const [heartRateError, setHeartRateError] = useState('')
  const [zoneTargetError, setZoneTargetError] = useState('')
  const [intensityError, setIntensitErrory] = useState('')
  const [paceError, setPaceError] = useState('')
  const [fieldErrors, setFieldErrors] = useState({});
  const [cardioError, setCradioError] = useState({});
  const [weekError, setWeekError] = useState('')
  const [exercise, setExercise] = useState()
  const [difficuilty, setDifficuilty] = useState('')
  const [bodyPartError, setBodyPartError] = useState('')
  const exercise_details = useSelector((store) => store.EXERCISE_BY_CATEGORY)
  const patient_exercise_data = useSelector((store) => store.GET_SELECTED_PATIENT_EXERCISE_DETAILS)
  const is_plan_updated = useSelector((store) => store?.UPDATE_PATIENT_PLAN)

  const handleClose = () => {
    setshowEditPateintExercise(false);
    dispatch(clear_selected_patient_exercise_state())
    setPlanId(null)
    setCategory()
    setSelectedExercise()
    setDistance()
    setDistanceUnit()
    setHeartRate()
    setZoneTarget()
    setIntensity()
    setSelectedWeekdays([])
    setUpdatedWeekdays([])
    setDistanceVal()
    setFlexibilityField()
    setCradioFields()
  };

  useEffect(() => {
    dispatch(get_selected_patient_exercise_details({ id: planId }))
  }, [])

  useEffect(() => {
    if (is_plan_updated?.isSuccess) {
      toast.success("Patient plan updated successfully !!")
      dispatch(get_patient_plan({ id: patientId, weekday }))
      dispatch(clear_update_patient_plan_state())
      handleClose()
    }
    if (is_plan_updated.isError) {
      toast.error(is_plan_updated?.error?.message)
      dispatch(clear_update_patient_plan_state())
    }
  }, [is_plan_updated])

  useEffect(() => {
    if (patient_exercise_data?.isSuccess) {
      setCategory(patient_exercise_data?.data?.data?.category)
      setSelectedExercise(patient_exercise_data?.data?.data?.exerciseId)
      setDistance(patient_exercise_data?.data?.data?.distanceGoal?.value)
      setDistanceUnit(patient_exercise_data?.data?.data?.distanceGoal?.unit)
      setHeartRate(patient_exercise_data?.data?.data?.heartRateTarget)
      setZoneTarget(patient_exercise_data?.data?.data?.zoneTarget)
      setIntensity(patient_exercise_data?.data?.data?.intensity)

      let arr = [];
      const days = patient_exercise_data?.data?.data?.weekdays?.map((week) => {
        const weekObj = { name: week };
        const isAlreadyAdded = arr.some(item => item.name === week);
        if (!isAlreadyAdded) {
          arr.push(weekObj);
        }
      });
      setSelectedWeekdays(arr)
      setUpdatedWeekdays(patient_exercise_data?.data?.data?.weekdays)
      setDistanceVal(patient_exercise_data?.data?.data?.distanceGoal)
      setFlexibilityField(patient_exercise_data?.data?.data?.sets)
      setCradioFields(patient_exercise_data?.data?.data?.sets)
      setPace(patient_exercise_data?.data?.data?.pace)
      setDifficuilty(patient_exercise_data?.data?.data?.difficulty_level[0])
      if (patient_exercise_data?.data?.data?.body_parts) {
        const formattedData = patient_exercise_data?.data?.data?.body_parts.map((item) => ({
          name: item.name,
          movements: item.movements,
        }));
        setData(formattedData);
      }
    }
  }, [patient_exercise_data])

  const handleFetchExercise = (e) => {
    const val = e.target.value
    setSelectedExercise('')
    setFieldErrors({})
    setCradioError({})
    setExerciseVideo('')
    setExerciseImage('')
    setCategory(val)
    dispatch(get_exercise_by_category({ category: val, difficuilty: difficuilty }))
  }

  useEffect(() => {
    if (exercise_details?.isSuccess) {
      setExercise(exercise_details?.data?.data)
    }
  }, [exercise_details, category])

  useEffect(() => {
    if (difficuilty && category) {
      dispatch(get_exercise_by_category({ category: category, difficuilty }))
    }
  }, [difficuilty, category])

  useEffect(() => {
    const exercise_data = exercise?.find((el) => el.id == selectedExercise);

    if (exercise_data) {
      setExerciseVideo(exercise_data.video_link || "");
      setExerciseImage(exercise_data.image_url);
    } else {
      console.warn("No matching exercise found for ID:", selectedExercise);
    }
  }, [selectedExercise])


  const handleSelectExercise = (e) => {
    const selectedValue = e.target.value;
    setSelectedExercise(selectedValue);

    const exercise_data = exercise?.find((el) => el.id == selectedValue);

    if (exercise_data) {
      setExerciseVideo(exercise_data.video_link || "");
      setExerciseImage(exercise_data.imageUrl || "");
    } else {
      console.warn("No matching exercise found for ID:", selectedValue);
    }
  };

  const handleAddCardioFields = () => {
    setCradioFields((prev) => [
      ...prev,
      {
        time: { value: 0, unit: "sec" }
      }
    ]);
  }

  const handleChangeCardioUnit = (i, field, unit) => {
    setCradioFields((prev) => {
      const cardioArray = Array.isArray(prev) ? prev : [];
      return cardioArray.map((item, index) =>
        index === i
          ? {
            ...item,
            [field]: { ...item[field], unit: unit },
          }
          : item
      );
    });
  };


  const handleChangeCardioFields = (i, field, e) => {
    const value = Number(e.target.value);
    const unit = cardioFields[i][field]?.unit;


    if (unit === "sec" && value > 60) {
      return;
    }

    if (unit === "min" && value > 4) {
      return;
    }

    setCradioFields((prev) =>
      prev?.map((item, index) =>
        index === i
          ? {
            ...item,
            [field]: { ...item[field], value: value },
          }
          : item
      )
    );
  };

  const handleRemoveCardioFields = (i) => {
    setCradioFields((prev) => prev.filter((_, index) => index !== i));
  };

  const handleFlexibilityRow = () => {
    setFlexibilityField((prev) => [
      ...prev,
      {
        reps: "",
        weight: { value: 0, unit: "kg" },
        time: { value: 0, unit: "sec" }
      }
    ]);
  };

  const handleChangeFlexibilityFields = (i, field, e) => {
    let { value } = e.target;
    value = value.replace(/[^0-9]/g, "");
    const numericValue = Number(value);
    if (field === "reps") {
      if (value > 25 || value < 0) {
        return
      }
    }

    if (field === "weight") {
      if (value < 0) {
        return
      }
    }

    if (field === "time") {
      if (value < 0) {
        return
      }
    }
    setFlexibilityField((prev) =>
      prev?.map((item, index) =>
        index === i
          ? {
            ...item,
            [field]: field === "reps" ? numericValue : { ...item[field], value: numericValue },
          }
          : item
      )
    );
  };

  const handleChangeFlexibilityUnit = (i, field, unit) => {
    setFlexibilityField((prev) => {
      const flexibilityArray = Array.isArray(prev) ? prev : [];
      return flexibilityArray.map((item, index) =>
        index === i
          ? {
            ...item,
            [field]: { ...item[field], unit: unit },
          }
          : item
      );
    });
  };

  const handleRemoveFlexibilityFields = (i) => {
    setFlexibilityField((prev) => prev.filter((_, index) => index !== i));
  };

  const handleSubmit = () => {
    const bodyParts = data.filter((entry) => entry.name);
    if (!category) {
      setCategoryError("Please select category !")
      return
    }
    const errors = findEmptyFields();
    if (category === "strength exercise" && Object.keys(errors)?.length > 0) {
      return
    }

    const cardioerrors = findEmptyCardioFields();
    if (category !== "strength exercise" && Object.keys(cardioerrors)?.length > 0) {
      return
    }
    if (!data?.length) {
      setBodyPartError("Please select the body parts");
      return;
    }
    const invalidEntries = data.filter(item => !item.name || !item.movements.length);
    
    if (invalidEntries.length > 0) {
      setBodyPartError("Each body part must have a name and at least one movement.");
      return;
    }
    if (!heartRate) {
      setHeartRateError("Please enter heart rate")
      return
    }
    if (!zoneTarget) {
      setZoneTargetError("Please enter Target xone")
      return
    }
    if (!intensity) {
      setIntensitErrory("Please enter intensity")
      return
    }
    if (!pace) {
      setPaceError("Please enter pace")
      return
    }
    if (!distance) {
      setDistanceError("Please enter distance")
      return
    }

    if (updatedWeekdays?.length === 0) {
      setWeekError("Please select days")
      return
    }
    dispatch(updatePatientPlan({ id: planId, category, patientId: patientId, difficulty_level: difficuilty, body_parts: bodyParts, exerciseId: selectedExercise, sets: category === "strength exercise" ? flexibilityField : cardioFields, heartRateTarget: heartRate, zoneTarget, intensity, pace, distanceGoal: {value: distance, unit: distanceUnit}, weekdays: updatedWeekdays }))
  }

  const findEmptyFields = () => {
    let errors = {};

    flexibilityField.forEach((field, index) => {
      if (!String(field.reps || "").trim()) {
        errors[`reps-${index}`] = "Reps is required";
      }
      if (!field.weight) {
        errors[`weight-${index}`] = "Weight is required";
      }
      if (!field.time) {
        errors[`time-${index}`] = "Time is required";
      }
    });

    setFieldErrors(errors);
    return errors;
  };

  const findEmptyCardioFields = () => {
    let errors = {};

    cardioFields.forEach((cardio, index) => {
      if (!cardio?.time?.value) {
        errors[`time-${index}`] = "Time is required";
      }
    });
    setCradioError(errors)
    return errors;
  };

  const handleSelect = (selectedList) => {
    const days = selectedList.map((item) => item.name);
    setSelectedWeekdays(selectedList);
    setUpdatedWeekdays(days)
  };


  const handleRemove = (selectedList) => {
    const days = selectedList.map((item) => item.name);
    setSelectedWeekdays(selectedList);
    setUpdatedWeekdays(days)
  };

  const options = weekdays?.map((day) => ({ name: day }));

  const handleNameChange = (index, selectedOption) => {
    setBodyPartError('')
    const updatedData = [...data];
    updatedData[index].name = selectedOption?.value || "";
    updatedData[index].movements = [];
    setData(updatedData);
  };

  const handleMovementChange = (index, selectedOptions) => {
    setBodyPartError('')
    const updatedData = [...data];
    updatedData[index].movements = selectedOptions.map((option) => option.value);
    setData(updatedData);
  };

  const addNewField = () => {
    setData([...data, { name: "", movements: [] }]);
  };

  const getMovementsForName = (name) => {
    const selected = apiData.find((item) => item.name === name);
    return selected
      ? selected.movements.map((movement) => ({ value: movement, label: movement }))
      : [];
  };

  const getAvailableNames = () => {
    const selectedNames = data.map((entry) => entry.name);
    return apiData
      .filter((item) => !selectedNames.includes(item.name))
      .map((item) => ({ value: item.name, label: item.name }));
  };

  const handleDifficuilty = (e) => {
    const val = e.target.value
    setDifficuilty(val)
  }

  const handleDeleteRow = (index) => {
    setData(data.filter((_, i) => i !== index));
  };

  return (
    <Modal
      show={showEditPateintExercise}
      onHide={handleClose}
      className="cmn_modal"
      centered
      size="md"
    >
      <div className="modal_head text-end">
        <svg
          onClick={handleClose}
          width="25"
          height="24"
          viewBox="0 0 25 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M24.2798 2.6503C24.4239 2.50636 24.5383 2.33545 24.6163 2.14733C24.6944 1.9592 24.7346 1.75754 24.7348 1.55386C24.7349 1.35019 24.6949 1.14848 24.6171 0.960257C24.5392 0.772036 24.4251 0.600986 24.2812 0.456876C24.1372 0.312765 23.9663 0.198416 23.7782 0.120356C23.5901 0.0422964 23.3884 0.00205508 23.1847 0.0019299C22.9811 0.00180471 22.7794 0.0417981 22.5911 0.119627C22.4029 0.197455 22.2319 0.311594 22.0877 0.455528L12.7344 9.8089L3.38369 0.455528C3.09265 0.164483 2.69791 0.000976559 2.28631 0.000976562C1.87471 0.000976566 1.47997 0.164483 1.18893 0.455528C0.897882 0.746572 0.734375 1.14131 0.734375 1.55291C0.734375 1.96451 0.897882 2.35925 1.18893 2.6503L10.5423 12.001L1.18893 21.3517C1.04482 21.4958 0.930501 21.6668 0.852509 21.8551C0.774517 22.0434 0.734375 22.2452 0.734375 22.449C0.734375 22.6528 0.774517 22.8546 0.852509 23.0429C0.930501 23.2312 1.04482 23.4023 1.18893 23.5464C1.47997 23.8375 1.87471 24.001 2.28631 24.001C2.49011 24.001 2.69192 23.9608 2.88021 23.8828C3.0685 23.8048 3.23958 23.6905 3.38369 23.5464L12.7344 14.193L22.0877 23.5464C22.3788 23.8371 22.7734 24.0003 23.1847 24C23.5961 23.9998 23.9905 23.8361 24.2812 23.5451C24.5719 23.254 24.735 22.8594 24.7348 22.4481C24.7345 22.0367 24.5709 21.6423 24.2798 21.3517L14.9264 12.001L24.2798 2.6503Z"
            fill="black"
          />
        </svg>
      </div>
      {patient_exercise_data?.isLoading ? <Loader /> : <Modal.Body className="p-0 authWrapper add_exercise">
        <h2 className="deletmodal_heading">Edit Exercise for Client</h2>
        <div className="modal_card">
          <h5>Basic Information</h5>
          <Row className="mt-3">
            <Col lg={6}>
              <Form.Group className="mb-2">
                <Form.Label>Category</Form.Label>
                <Form.Select aria-label="Default select example" className={categoryError ? "is-invalid" : ""} value={category} onChange={(e) => { handleFetchExercise(e); setCategoryError('') }}>
                  <option>Open this select menu</option>
                  {exercise_category?.map((category, i) => (
                    <option key={i} value={category}>{category}</option>
                  ))}
                </Form.Select>
                {categoryError && <div className="invalid-feedback">{categoryError}</div>}
              </Form.Group>
            </Col>
            <Col lg={6}>
              <Form.Group className="mb-2">
                <Form.Label>Difficuilty</Form.Label>
                <Form.Select aria-label="Default select example" className={categoryError ? "is-invalid" : ""} value={difficuilty} onChange={(e) => { handleDifficuilty(e); setCategoryError('') }}>
                  <option>Please select difficuilty level</option>
                  {exerciseDifficuilty?.map((category, i) => (
                    <option key={i} value={category}>{category}</option>
                  ))}
                </Form.Select>
                {diffError && <div className="invalid-feedback">{diffError}</div>}
              </Form.Group>
            </Col>
            <Col lg={6}>
              <Form.Group className="mb-2">
                <Form.Label>Exercise Name</Form.Label>
                <Form.Select aria-label="Default select example" value={selectedExercise} className={selectedExerciseError ? "is-invalid" : ""} onChange={(e) => handleSelectExercise(e)}>
                  <option>Open this select menu</option>
                  {exercise?.map((exercise, i) => (
                    <option key={i} value={exercise?.id}>{exercise?.exercise_name}</option>
                  ))}
                </Form.Select>
                {categoryError && <div className="invalid-feedback">{categoryError}</div>}
              </Form.Group>
            </Col>
            <Col lg={6}>
              <Form.Group className="mb-2">
                <Form.Label>Exercise Video Link</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="https://youtu.be/eqVMAPM00DM?si=sCCrNR"
                  value={exerciseVideo}
                  disabled
                />
              </Form.Group>
            </Col>
            <Col lg={6}>
              <Form.Group className="mb-2">
                <Form.Label>Exercise Image</Form.Label>
                <div className="exercise_image">
                  <img src={exerciseImage || TrainingImage} alt="training image" disabled />
                </div>
              </Form.Group>
            </Col>
          </Row>
        </div>



        <div className="pt-3">
          <div className="d-flex justify-content-between">
            <h5 className="flex-grow-1 mb-0">Edit Body Parts and Movements</h5>
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
              className="row"
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
                <div className="d-flex gap-2 align-items-center">
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
                  {data?.length > 1 && <span className="minus align-self-end mb-2" style={{ cursor: "pointer" }} onClick={() => handleDeleteRow(index)}>-</span>}
                </div>
              </div>
            </div>
          ))}
          {bodyPartError && <span style={{ color: "red" }}>{bodyPartError}</span>}
        </div>




        {category !== "strength exercise" && <div className="modal_card mt-3">
          <div className="d-flex align-items-center mb-2">
            <h5 className="flex-grow-1 mb-0">Steps and Reps</h5>{" "}
            <button onClick={() => handleAddCardioFields()} className="cmn_btn add_row">Add Row</button>
          </div>
          {cardioFields?.map((cardio, i) => (
            <Form.Group className="mb-2">
              <div className="steps_items d-flex gap-2">
                <div>
                  <Form.Label>Set {i + 1}</Form.Label>
                  <span className="step_count">{i + 1}</span>
                </div>
                <div className="flex-grow-1 d-flex gap-2 ">
                  <div className="w-100">
                    <div className="d-flex gap-2 align-items-center">
                      <Form.Label className="flex-grow-1">Time Duration</Form.Label>{" "}
                      <span onClick={() => handleChangeCardioUnit(i, "time", "sec")}
                        className={cardio?.time?.unit === "sec" ? "time" : "time min"}>sec</span>{" "}
                      <span onClick={() => handleChangeCardioUnit(i, "time", "min")}
                        className={cardio?.time?.unit === "min" ? "time" : "time min"}>min</span>
                    </div>
                    <Form.Control type="text" placeholder="00" value={cardio?.time?.value} className={cardioError[`time-${i}`] ? "is-invalid" : ""} onChange={(e) => handleChangeCardioFields(i, "time", e)} />
                    {cardioError[`time-${i}`] && <div className="invalid-feedback">{cardioError[`time-${i}`]}</div>}
                  </div>
                  {cardioFields?.length > 1 && <span onClick={() => (handleRemoveCardioFields(i))} className="minus align-self-end mb-2">-</span>}
                </div>
              </div>
            </Form.Group>
          ))}

        </div>}
        {category === "strength exercise" && <div className="modal_card mt-3">
          <div className="d-flex align-items-center mb-2">
            <h5 className="flex-grow-1 mb-0">Steps and Reps</h5>{" "}
            <button onClick={handleFlexibilityRow} className="cmn_btn add_row">Add Row</button>
          </div>
          {flexibilityField?.map((val, i) => (
            <Form.Group key={i} className="mb-2">
              <div className="steps_items d-flex gap-2">
                <div>
                  <Form.Label>Set {i + 1}</Form.Label>
                  <span className="step_count">{i + 1}</span>
                </div>
                <div className="flex-grow-1">
                  <div className="d-flex gap-2 align-items-center">
                    <Form.Label className="flex-grow-1">Reps</Form.Label>{" "}

                  </div>
                  <Form.Control type="text" placeholder="00" value={val?.reps} className={fieldErrors[`reps-${i}`] ? "is-invalid" : ""} onChange={(e) => handleChangeFlexibilityFields(i, "reps", e)} />
                  {fieldErrors[`reps-${i}`] && <div className="invalid-feedback">{fieldErrors[`reps-${i}`]}</div>}
                </div>
                <div className="flex-grow-1">
                  <div className="d-flex gap-2 align-items-center">
                    <Form.Label className="flex-grow-1">Weight</Form.Label>{" "}
                    <span onClick={() => handleChangeFlexibilityUnit(i, "weight", "kg")}
                      className={val?.weight?.unit === "kg" ? "time" : "time min"}>Kg</span>{" "}
                    <span onClick={() => handleChangeFlexibilityUnit(i, "weight", "lbs")}
                      className={val?.weight?.unit === "lbs" ? "time" : "time min"}>Lbs</span>
                  </div>
                  <Form.Control type="text" placeholder="00" value={val?.weight?.value} className={fieldErrors[`weight-${i}`] ? "is-invalid" : ""} onChange={(e) => handleChangeFlexibilityFields(i, "weight", e)} />
                  {fieldErrors[`weight-${i}`] && <div className="invalid-feedback">{fieldErrors[`weight-${i}`]}</div>}

                </div>
                <div className="flex-grow-1">
                  <div className="d-flex gap-2 align-items-center">
                    <Form.Label className="flex-grow-1">Time Duration</Form.Label>{" "}
                    <span onClick={() => handleChangeFlexibilityUnit(i, "time", "sec")}
                      className={val?.time?.unit === "sec" ? "time" : "time min"}>sec</span>{" "}
                    <span onClick={() => handleChangeFlexibilityUnit(i, "time", "min")}
                      className={val?.time?.unit === "min" ? "time" : "time min"}>min</span>
                  </div>
                  <Form.Control type="text" placeholder="00" value={val?.time?.value} className={fieldErrors[`time-${i}`] ? "is-invalid" : ""} onChange={(e) => handleChangeFlexibilityFields(i, "time", e)} />
                  {fieldErrors[`time-${i}`] && <div className="invalid-feedback">{fieldErrors[`time-${i}`]}</div>}
                </div>
                {flexibilityField?.length > 1 && <span onClick={() => (handleRemoveFlexibilityFields(i))} className="minus align-self-end mb-2">-</span>}
              </div>
            </Form.Group>
          ))}

        </div>}
        <div className="modal_card mt-3">
          <h5>Heart Rate and Targets</h5>
          <Row>
            <Col lg={6}>
              <Form.Group className="mb-2">
                <Form.Label>Heart Rate Target (bpm)</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Heart Rate Target (bpm)"
                  className={heartRateError ? "is-invalid" : ""}
                  value={heartRate?.value ?? ""}
                  onChange={(e) => {
                    const input = e.target.value;

                    if (input === "" || (Number(input) <= 200 && /^\d+$/.test(input))) {
                      const value = input === "" ? null : Number(input);

                      if (value !== null && value < 30) {
                        setHeartRateError("Please enter a heart rate of at least 30 bpm.");
                      } else {
                        setHeartRateError("");
                      }

                      setHeartRate({ value, unit: "bpm" });
                    }
                  }}
                />
                {heartRateError && <div className="invalid-feedback">{heartRateError}</div>}
              </Form.Group>
            </Col>

            <Col lg={6}>
              <Form.Group className="mb-2">
                <Form.Label>Zone Target</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Zone Target"
                  className={zoneTargetError ? "is-invalid" : ""}
                  value={zoneTarget ?? ""}
                  onChange={(e) => {
                    const input = e.target.value;

                    if (input === "" || (Number(input) <= 200 && /^\d+$/.test(input))) {
                      const value = input === "" ? null : Number(input);

                      if (value !== null && value < 30) {
                        setZoneTargetError("Please enter a zone target of at least 30.");
                      } else {
                        setZoneTargetError("");
                      }

                      setZoneTarget(value);
                    }
                  }}
                />
                {zoneTargetError && <div className="invalid-feedback">{zoneTargetError}</div>}
              </Form.Group>
            </Col>

            <Col lg={6}>
              <Form.Group className="mb-2">
                <Form.Label>Intensity (1-10)</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Intensity (1-10)"
                  className={intensityError ? "is-invalid" : ""}
                  value={intensity ?? ""}
                  onChange={(e) => {
                    const input = e.target.value;

                    if (input === "" || (Number(input) <= 10 && /^\d+$/.test(input))) {
                      const value = input === "" ? null : Number(input);

                      if (value !== null && (value < 1 || value > 10)) {
                        setIntensitErrory("Please enter an intensity value between 1 and 10.");
                      } else {
                        setIntensitErrory("");
                      }

                      setIntensity(value);
                    }
                  }}
                />
                {intensityError && <div className="invalid-feedback">{intensityError}</div>}
              </Form.Group>
            </Col>

            <Col lg={6}>
              <Form.Group className="mb-2">
                <Form.Label>Pace</Form.Label>
                <Form.Select aria-label="Default select example" className={paceError ? "is-invalid" : ""} value={pace} onChange={(e) => { setPace(e.target.value); setPaceError('') }}>
                  <option>Open this PAce</option>
                  <option value="moderate">Moderate</option>
                  <option value="medium">Medium</option>
                  <option value="vigorous">Vigorous</option>
                </Form.Select>
                {paceError && <div className="invalid-feedback">{paceError}</div>}
              </Form.Group>
            </Col>
          <Col lg={6}>
                       <Form.Group className="mb-2">
                         <div className="d-flex gap-2 align-items-center">
                           <Form.Label className="flex-grow-1">Distance Goal</Form.Label>
                           <span
                             onClick={() => {
                               setDistanceUnit("km");
                               if (distanceUnit === "meter") {
                                 setDistance(distance / 1000);
                               }
                             }}
                             className={distanceUnit === "km" ? "time" : "time min"}
                           >
                             km
                           </span>{" "}
                           <span
                             onClick={() => {
                               setDistanceUnit("meter");
                               if (distanceUnit === "km") {
                                 setDistance(distance * 1000); 
                               }
                             }}
                             className={distanceUnit === "meter" ? "time" : "time min"}
                           >
                             meter
                           </span>
                         </div>
         
                         <Form.Control
                           type="text"
                           placeholder="Distance Goal (Km/Meter)"
                           className={distanceError ? "is-invalid" : ""}
                           value={distance}
                           onChange={(e) => {
                             const inputValue = e.target.value;
                             const numericValue = Number(inputValue);
         
                             if (!isNaN(numericValue)) {
                               let convertedValue = numericValue;
         
                               if (distanceUnit === "km") {
                                 convertedValue = numericValue * 1000; 
                               }
         
                               if (convertedValue < 1) {
                                 setDistanceError("Distance must be at least 1 meter.");
                               } else if (convertedValue > 100000) {
                                 setDistanceError("Distance goal cannot exceed 100 km.");
                               } else {
                                 setDistanceError(""); 
                               }
         
                               setDistance(inputValue); 
                               setDistanceVal({ value: distance, unit: distanceUnit }); 
                             } else {
                               setDistanceError("Please enter a valid distance.");
                             }
                           }}
                         />
                         {distanceError && <div className="invalid-feedback">{distanceError}</div>}
                       </Form.Group>
                     </Col>
            <Col lg={6}>
              <Form.Group className="mb-2">
                <Form.Label>Weekdays</Form.Label>
                <Multiselect
                  options={options}
                  selectedValues={selectedWeekdays}
                  onSelect={handleSelect}
                  onRemove={handleRemove}
                  displayValue="name"
                />
                {weekError && <div className="invalid-feedback">{weekError}</div>}
              </Form.Group>
            </Col>


          </Row>

        </div>
        <div className="d-flex justify-content-center gap-3 mt-3">
          <button className="cmn_btn border-btn ">Cancel</button>
          <button className="cmn_btn" onClick={handleSubmit}>{!is_plan_updated?.isLoading ? "Update" : <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>}</button>
        </div>
      </Modal.Body>}
    </Modal>
  );
};

export default EditPateintExercise;
