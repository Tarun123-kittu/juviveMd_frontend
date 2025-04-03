import React, { useEffect, useState, useRef } from "react";
import { Form, Row, Col, Button, InputGroup, Container } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Tab from "react-bootstrap/Tab";
import DefaultImage from "../../Images/gallery-add.svg";
import {
  get_exercise_by_category,
  clear_exercise_by_category_state,
} from "../../redux/slices/exerciseSlice/getExerciseByCategory";
import {
  get_patient_difficuilties,
  clear_patient_difficuilties_state,
} from "../../redux/slices/patientPlan/getPatientDifficuilties";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { CrosSvg } from "../patientComponent/pateintSvg";
import { showToast } from "../../common/toast/showToast";
const PatientPlanForm = ({
  isDisabled,
  getCurrentDate,
  selectedDate,
  formattedDate,
  eventData,
  setDays,
  days,
  index,
  exercise_category,
  body_parts,
  exerciseDifficuilty,
  patientId,
  editable,
  patient_category,
  training_type,
  setSelected_patient_category,
  selected_patient_category,
  setSelected_training_type,
  selected_training_type,
  planStartAt,
  planEndAt
}) => {


  const [isClickedOnAddRowBtn, setIsClickedOnAddRowBtn] = useState(false)
  // const [isDuplicateSet,setIsDuplicateSet]=useState(false)
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (buttonRef.current && !buttonRef.current.contains(event.target)) {
        setIsClickedOnAddRowBtn(false);
      }
    };

    if (isClickedOnAddRowBtn) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isClickedOnAddRowBtn]);



  const [toastShown, setToastShown] = useState(false); // Track if toast has been shown

  console.log("Days====>", days, "Day===>", eventData, "Date--", selectedDate, "formattedDate--", formattedDate);
  const toastIdRef = useRef(null);
  const newDate = new Date(selectedDate);

  const jsDayIndex = selectedDate?.getDay();
  const selectedDayIndex = (jsDayIndex + 6) % 7;;
  let dayDifference = index - selectedDayIndex;
  newDate.setDate(selectedDate?.getDate() + dayDifference);
  console.log("newDate--", newDate?.toDateString())

  getCurrentDate(newDate)

  const todayDate = new Date();
  todayDate.setHours(0, 0, 0, 0);
  newDate.setHours(0, 0, 0, 0);
  console.log("Sorry, you can't edit past plans--", todayDate)
  useEffect(() => {
    if (newDate?.getTime() < todayDate?.getTime() && !toastShown) {
      // if (toastIdRef.current) {
      //   toast.remove(toastIdRef.current);
      // }
      // // toast.error("All Fields Are Mandatory !!"); }
      // toastIdRef.current = toast.error("Sorry, you can't edit past dates!", {
      //   duration: 3000, // Toast duration in milliseconds
      // });
      toast.dismiss();
      // toast.error("Sorry, you can't edit past plans!");
      showToast("Sorry, you can't edit past plans!", "ERROR")
      setToastShown(true);

    }

    getCurrentDate(newDate); // Pass the date as before

  }, [newDate, getCurrentDate]);


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [difficuilty, setDifficuilty] = useState("Easy");
  const [selectedIndex, setSelectedIndex] = useState(0);
  // console.log(selectedIndex,"selectedIndex--->")
  const [selectedCategory, setSelectedCategory] = useState("");
  const [exercise, setExercise] = useState();
  const [data, setData] = useState([{ name: "", movements: [] }]);
  const patient_difficuilty = useSelector(
    (store) => store.PATIENT_DIFFICUILTIES
  );
  const exercise_details = useSelector((store) => store.EXERCISE_BY_CATEGORY);
  const hasRun = useRef(false);

  const options = training_type.map((type) => ({
    value: type,
    label: type,
  }));

  useEffect(() => {
    if (editable) {
      setSelectedCategory(days[eventData][selectedIndex]?.category);
    }
  }, [days, selectedIndex]);

  const newExerciseData = {
    category: "",
    patient_category: "",
    training_type: [],
    exerciseId: "",
    planExerciseId: null,
    exerciseName: "Untitled",
    exerciseImage: "",
    exerciseVideo: "",
    difficuilty_level: "",
    active: true,
    bodyParts: [],
    sets: [
      {
        reps: 0,
        time: { value: 0, unit: "sec" },
        weight: { value: 0, unit: "kg" },
      },
    ],
  };

  useEffect(() => {
    dispatch(get_patient_difficuilties({ patientId: patientId }));

    if (
      selectedCategory ||
      selected_patient_category ||
      (selected_training_type && selected_training_type?.length > 0)
    ) {
      dispatch(
        get_exercise_by_category({
          category: selectedCategory || null,
          patient_category: selected_patient_category || null,
          training_type:
            selected_training_type?.length > 0 ? selected_training_type : null,
        })
      );
    }
  }, [
    selectedCategory,
    selected_patient_category,
    selected_training_type,
    selectedIndex,
    dispatch,
  ]);

  useEffect(() => {
    if (exercise_details?.isSuccess) {
      setExercise(exercise_details?.data?.data);
      setData(exercise_details?.data?.data[0]?.body_parts);
    }
  }, [exercise_details, selectedCategory]);

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
      setDifficuilty(val);
      setDays((prevDays) => {
        const updatedDay = prevDays[eventData].map((item, index) => {
          if (index === i) {
            return { ...item, difficuilty_level: [val] };
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
    const selectedExercise = exercise?.find(
      (exercise) => exercise?.id === val
    );
    if (val && Object.keys(selectedExercise)) {
      setDays((prevDays) => {
        const updatedDay = prevDays[eventData].map((item, index) => {
          if (index === i) {
            return {
              ...item,
              exerciseId: selectedExercise?.id,
              exerciseName: selectedExercise.exercise_name,
              exerciseImage: selectedExercise.image_url,
              exerciseVideo: selectedExercise.video_link,
              bodyParts: selectedExercise?.body_parts,
            };
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
      const currentDayData = prevDays[eventData] || [];
      const lastExercise = currentDayData[currentDayData.length - 1];

      const isValidExerciseData = () => {
        if (!lastExercise) return true;
        if (lastExercise.exerciseName === "Untitled") return false;

        return !lastExercise.sets.some((item) => {
          return (
            item.reps === 0 &&
            (item.time.value === 0 || item.weight.value === 0)
          );
        });
      };

      if (!isValidExerciseData()) {
        toast.error(
          "Please fill exercise name, difficulty level, and at least one field (Reps, Time, or Weight)"
        );
        return prevDays;
      }

      setDifficuilty(patient_difficuilty?.data?.data?.exercise_difficulty);

      const updatedDay = [...currentDayData, { ...newExerciseData }];

      return {
        ...prevDays,
        [eventData]: updatedDay,
      };
    });

    // Ensure index updates only after state updates
    setTimeout(() => {
      setDays((prevDays) => {
        const newIndex = prevDays[eventData]?.length - 1; // Get last added tab index
        setSelectedIndex(newIndex);
        return prevDays;
      });
    }, 0);
  };



  const addNewFlexibilityToStrength = (i) => {
    setDays((prevDays) => {
      const updatedDays = { ...prevDays };
      const currentDayExercises = [...updatedDays[eventData]];
      const currentExercise = currentDayExercises[i];

      const hasEmptyFlexibilityField = currentExercise.flexibilityField.some(
        (field) => field.reps === "" || field.weight.value === null
      );

      if (hasEmptyFlexibilityField) {
        console.warn(
          "Cannot add new flexibility field, some values are empty in the previous fields."
        );
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

  const addNewFlexibilityToCardio = (i, isDuplicateSet) => {
    setIsClickedOnAddRowBtn(false)
    setDays((prevDays) => {
      if (!prevDays || !eventData || !prevDays[eventData]) {
        console.error("Invalid eventData or days structure");
        return prevDays;
      }

      const updatedDays = { ...prevDays };
      const currentDayExercises = [...updatedDays[eventData]];

      if (!currentDayExercises[i]) {
        console.error(`Exercise at index ${i} does not exist`);
        return prevDays;
      }

      const currentExercise = currentDayExercises[i];
      const hasEmptySet = currentExercise?.sets?.some((field) => {
        const hasNoValidValues =
          (field.time?.value === 0 || field.time?.value == null) &&
          (field.weight?.value === 0 || field.weight?.value == null) &&
          (field.reps === 0 || field.reps == null);

        return hasNoValidValues;
      });

      if (hasEmptySet) {
        showToast("Cannot add new set, some values are missing in the previous fields.", "ERROR")
        // toast.error("Cannot add new set, some values are missing in the previous fields.");
        return prevDays;
      }
      const lastSet = currentExercise.sets[currentExercise.sets.length - 1]
      console.log("currentExercise Sets--", currentExercise, "lastSet--", lastSet, "length--", currentExercise.sets.length)

      if (isDuplicateSet) {
        currentExercise.sets.push(lastSet)
      }
      else {
        currentExercise.sets = [
          ...currentExercise.sets,
          {
            reps: 0,
            time: { value: 0, unit: "sec" },
            weight: { value: 0, unit: "kg" },
          },
        ];
      }

      // currentExercise.sets = [
      //   ...currentExercise.sets,
      //   {
      //     reps: 0,
      //     time: { value: 0, unit: "sec" },
      //     weight: { value: 0, unit: "kg" },
      //   },
      // ];

      updatedDays[eventData] = currentDayExercises;
      return updatedDays;
    });
  };


  const handleChangeCardioUnit = (i, index, field, unit) => {
    setDays((prevDays) => {
      const updatedDays = { ...prevDays };
      const targetField = updatedDays[eventData][i].cardioFields[index][field];
      if (targetField && typeof targetField === "object") {
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
      const targetField = updatedDays[eventData][i].sets[index][field];
      if (targetField && typeof targetField === "object") {
        targetField.unit = unit;
      } else {
        console.error(`Expected object for ${field}, but got`, targetField);
      }
      return updatedDays;
    });
  };

  const handleChangeCardioFields = (i, index, field, e) => {
    setDays((prevDays) => {
      const updatedDays = JSON.parse(JSON.stringify(prevDays));
      if (field === "time") {
        updatedDays[eventData][i].sets[index][field].value = Number(
          e.target.value
        );
      } else if (field === "weight") {
        updatedDays[eventData][i].sets[index][field].value = Number(
          e.target.value
        );
      } else if (field === "reps") {
        updatedDays[eventData][i].sets[index][field] = Number(e.target.value);
      }

      updatedDays[eventData][i].sets = [...updatedDays[eventData][i].sets];
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
      const updatedDays = JSON.parse(JSON.stringify(prevDays));
      const flexibilityField =
        updatedDays[eventData][i].flexibilityField[index];

      if (field === "reps") {
        flexibilityField[field] = value;
      } else {
        flexibilityField[field].value = value;
      }

      updatedDays[eventData][i].sets = [
        ...updatedDays[eventData][i].flexibilityField,
      ];

      return updatedDays;
    });
  };

  const handleRemoveCardioFields = (i, index) => {
    setDays((prevDays) => {
      const updatedDays = { ...prevDays };
      const currentDayExercises = [...updatedDays[eventData]];

      currentDayExercises[i].sets = currentDayExercises[
        i
      ].sets.filter((_, idx) => idx !== index);

      updatedDays[eventData] = currentDayExercises;

      return updatedDays;
    });
  };

  const handleRemoveFlexibilityFields = (i, index) => {
    setDays((prevDays) => {
      const updatedDays = { ...prevDays };
      const currentDayExercises = [...updatedDays[eventData]];

      currentDayExercises[i].flexibilityField = currentDayExercises[
        i
      ].flexibilityField.filter((_, idx) => idx !== index);

      updatedDays[eventData] = currentDayExercises;

      return updatedDays;
    });
  };

  const handleSelectPatientCategory = (val, i) => {
    if (val) {
      setSelected_patient_category(val);

      setDays((prevDays) => {
        const updatedDay = prevDays[eventData].map((item, index) => {
          if (index === i) {
            return { ...item, patient_category: val };
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

  const handleSelectPatientDifficuilty = (val, i) => {
    if (val) {

      setDays((prevDays) => {
        const updatedDay = prevDays[eventData].map((item, index) => {
          if (index === i) {
            return { ...item, difficuilty_level: val };
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

  const handleSetTrainingType = (selectedOptions, i) => {
    if (!selectedOptions) return;

    const selectedValues = selectedOptions.map((option) => option.value);

    setSelected_training_type(selectedValues);

    setDays((prevDays) => {
      return {
        ...prevDays,
        [eventData]: prevDays[eventData].map((item, index) =>
          index === i ? { ...item, training_type: selectedValues } : item
        ),
      };
    });
  };

  const exerciseCount = days[eventData]?.length + 1 || 0;
  const handleRemoveItems = (index) => {
    setDays((prevDays) => {
      const updatedItems = prevDays[eventData].filter((_, i) => i !== index);

      let newIndex = selectedIndex;

      if (updatedItems.length === 0) {
        newIndex = null; // No items left, deselect
      } else if (index === selectedIndex) {
        newIndex = Math.min(index, updatedItems.length - 1);
      }

      return {
        ...prevDays,
        [eventData]: updatedItems,
      };
    });

    setTimeout(() => {
      setSelectedIndex((prevIndex) => {
        const updatedItems = days[eventData]?.filter((_, i) => i !== index) || [];
        return updatedItems.length > 0 ? Math.min(prevIndex, updatedItems.length - 1) : null;
      });
    }, 0);
  };

  return (
    <>
      <div className="d-flex setting_wrapper patient_exercise">
        {/* Tabs */}
        <div className="border-end setting_pills">

          <ul className="tab-list">
            {Array.isArray(days[eventData]) &&
              days[eventData].map((item, i) => (
                <li
                  key={i}
                  className={`tab-item ${i === selectedIndex ? "active" : ""}`}
                  onClick={() => setSelectedIndex(i)}
                >
                  <span>{item.exerciseName}</span>
                  {days[eventData]?.length > 1 && (
                    <button
                      className="iconBtn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveItems(i);
                      }}
                    >
                      {CrosSvg}
                    </button>
                  )}
                </li>
              ))}
          </ul>
        </div>

        {/* Tab Content */}
        {console.log(days[eventData], "==== days[eventData]")}
        <div className="tab-content settings_content ">
          {Array.isArray(days[eventData]) &&
            days[eventData].map((day, i) =>
              i === selectedIndex ? (
                <div key={i} className="mytabs">

                  <Row className="authWrapper ">
                    <Col lg={12}>
                      <h5>Exercise Filter</h5>
                    </Col>
                    <Col lg={12}>
                      <div className="exercise_filters_card d-flex gap-2">
                        <Form.Group
                          className="w-100"
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label>Exercise type</Form.Label>
                          {console.log(day?.category, "ay?.category===>")}
                          <Form.Select
                            aria-label="Default select example"
                            value={day?.category}
                            onChange={(e) =>
                              handleSelectCategory(e.target.value, i)
                            }
                            onClick={() => {
                              if (isDisabled) {
                                toast.dismiss();
                                toast.error("Sorry, you can't edit past dates!");
                              }

                            }}
                            disabled={isDisabled}
                          >
                            <option value="" disabled selected>
                              Please select category
                            </option>
                            {exercise_category?.map((category, i) => (
                              <option key={i} value={category}>
                                {category}
                              </option>
                            ))}
                          </Form.Select>
                        </Form.Group>
                        <Form.Group
                          className="w-100"
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label>Category</Form.Label>
                          <Form.Select
                            disabled
                            aria-label="Default select example"
                            value={day?.patient_category || 'A'}
                            onChange={(e) =>
                              handleSelectPatientCategory(e.target.value, i)
                            }
                          >
                            <option value="" selected>
                              Select Category
                            </option>
                            {patient_category?.map((data) => {
                              return <option value={data}>{data}</option>;
                            })}
                          </Form.Select>
                        </Form.Group>
                        <Form.Group
                          className="w-100"
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label>Training Type</Form.Label>
                          <Select
                            isDisabled={isDisabled}
                            options={options}
                            isMulti
                            className="basic-multi-select"
                            classNamePrefix="select"
                            placeholder="Select Training type"
                            value={options.filter((option) =>
                              day?.training_type?.includes(option.value)
                            )}
                            onChange={(e) => handleSetTrainingType(e, i)}
                          />
                        </Form.Group>
                      </div>
                    </Col>
                    <Col lg={12}>
                      <h5>Basic Information</h5>
                    </Col>
                    <Col lg={6}>
                      <div className="image_insert">
                        <Form.Label>Exercise Image</Form.Label>
                        <div className="upload_image position-relative">
                          <img
                            src={
                              day.exerciseImage
                                ? day.exerciseImage
                                : DefaultImage
                            }
                            className="exercise_selected_iamge"
                            alt="dfault"
                            width={200}
                            height={200}
                          />
                        </div>
                      </div>
                    </Col>
                    <Col lg={6}>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >

                        <Form.Label>Exercise Name</Form.Label>
                        {console.log(day?.exerciseId, "day?.exerciseId==>")}
                        {exercise?.length > 0 ? (
                          <Form.Select
                            disabled={isDisabled}
                            aria-label="Default select example"
                            value={day?.exerciseId || day?.exerciseName} // ✅ Show selected exercise
                            onChange={(e) => handleSelectExerciseName(e.target.value, i)}
                          >
                            <option value="">
                              Please select exercise name
                            </option>

                            {exercise
                              ?.filter((ex) =>
                                ex.id === day?.exerciseId || // ✅ Allow selected value
                                !days[eventData]?.some((dayItem) => dayItem.exerciseId === ex.id) // ❌ Remove only duplicates
                              )
                              .map((ex) => (
                                <option key={ex.id} value={ex.id}>
                                  {ex.exercise_name}
                                </option>
                              ))}
                          </Form.Select>

                        ) : (
                          <Form.Control
                            type="text"
                            placeholder="No exercises available"
                            disabled
                          />
                        )}
                      </Form.Group>

                      <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Exercise Video Link</Form.Label>
                        <Form.Control
                          type="text"
                          disabled
                          value={day.exerciseVideo}
                          placeholder="Enter Video Link"
                        />
                      </Form.Group>
                      <Form.Group
                        className="w-100 mt-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>Difficuilty Level</Form.Label>
                        <Form.Select
                          disabled={isDisabled}
                          aria-label="Default select example"
                          value={day?.difficuilty_level || difficuilty}
                          onChange={(e) =>
                            handleSelectPatientDifficuilty(e.target.value, i)
                          }
                        >
                          <option value="" selected>
                            Select Difficuilty Level
                          </option>
                          {exerciseDifficuilty?.map((data) => {
                            return <option value={data}>{data}</option>;
                          })}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="authWrapper">
                    <div className="mt-3">
                      <div className="d-flex align-items-center mb-2">
                        <h5 className="flex-grow-1 mb-0">Sets and Reps</h5>{" "}
                        <div ref={buttonRef}>
                          <button
                            // onClick={() => addNewFlexibilityToCardio(i)}
                            onClick={() => setIsClickedOnAddRowBtn((prev) => !prev)}
                            className="cmn_btn add_row"
                            disabled={isDisabled}
                          >
                            Add Row
                          </button>
                          {
                            isClickedOnAddRowBtn && (
                              <>
                                <button onClick={() => addNewFlexibilityToCardio(i, true)}>Duplicate prev Set</button>
                                <button onClick={() => addNewFlexibilityToCardio(i, false)}>Create new set</button>
                              </>
                            )
                          }
                        </div>
                      </div>
                      {day?.sets?.map((cardio, index) => (
                        <Form.Group className="mb-2">
                          <div className="steps_items d-flex gap-2">
                            <div>
                              <Form.Label>Set {index + 1}</Form.Label>
                              <span className="step_count">{index + 1}</span>
                            </div>
                            <div className="w-100">
                              <div className="flex-grow-1">
                                <div className="d-flex gap-2 mb-3">
                                  <div className="w-100">
                                    <div className="d-flex gap-2 align-items-center">
                                      <Form.Label className="flex-grow-1">
                                        Time Duration
                                      </Form.Label>{" "}
                                      <span
                                        disabled={isDisabled}
                                        onClick={() =>
                                          handleChangeCardioUnit(
                                            i,
                                            index,
                                            "time",
                                            "sec"
                                          )
                                        }
                                        className={
                                          cardio?.time?.unit === "sec"
                                            ? "time"
                                            : "time min"
                                        }
                                      >
                                        sec
                                      </span>{" "}
                                    </div>
                                    <Form.Control
                                      disabled={isDisabled}
                                      type="text"
                                      placeholder="00"
                                      value={cardio?.time?.value}
                                      onChange={(e) =>
                                        handleChangeCardioFields(
                                          i,
                                          index,
                                          "time",
                                          e
                                        )
                                      }
                                    />
                                  </div>
                                  <div className="flex-grow-1 w-100">
                                    <div className="d-flex gap-2 align-items-center">
                                      <Form.Label
                                        className="flex-grow-1"
                                        value={cardio?.reps}
                                        onChange={(e) =>
                                          handleChangeCardioFields(
                                            i,
                                            index,
                                            "reps",
                                            e
                                          )
                                        }
                                      >
                                        Reps
                                      </Form.Label>{" "}
                                    </div>
                                    <Form.Control
                                      disabled={isDisabled}
                                      type="text"
                                      placeholder="00"
                                      value={cardio?.reps}
                                      onChange={(e) =>
                                        handleChangeCardioFields(
                                          i,
                                          index,
                                          "reps",
                                          e
                                        )
                                      }
                                    />
                                  </div>
                                  <div className="flex-grow-1 w-100">
                                    <div className="d-flex gap-2 align-items-center">
                                      <Form.Label className="flex-grow-1">
                                        Weight
                                      </Form.Label>{" "}
                                      <span
                                        onClick={() =>
                                          handleChangeFlexibilityUnit(
                                            i,
                                            index,
                                            "weight",
                                            "kg"
                                          )
                                        }
                                        className={
                                          cardio?.weight?.unit === "kg"
                                            ? "time"
                                            : "time min"
                                        }
                                      >
                                        Kg
                                      </span>{" "}
                                      <span
                                        onClick={() =>
                                          handleChangeFlexibilityUnit(
                                            i,
                                            index,
                                            "weight",
                                            "lbs"
                                          )
                                        }
                                        className={
                                          cardio?.weight?.unit === "lbs"
                                            ? "time"
                                            : "time min"
                                        }
                                      >
                                        Lbs
                                      </span>
                                    </div>
                                    <Form.Control
                                      disabled={isDisabled}
                                      type="text"
                                      placeholder="00"
                                      value={cardio?.weight?.value}
                                      onChange={(e) =>
                                        handleChangeCardioFields(
                                          i,
                                          index,
                                          "weight",
                                          e
                                        )
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            {day?.sets?.length > 1 && (
                              <span
                                onClick={() =>
                                  handleRemoveCardioFields(i, index)
                                }
                                className="minus align-self-center"
                              >
                                x
                              </span>
                            )}
                          </div>
                        </Form.Group>
                      ))}
                    </div>
                    <Col lg={12} className="pt-3">
                      <div className="d-flex justify-content-end gap-2">
                        <button
                          className="cmn_btn border-btn px-4"
                          onClick={() => navigate(-1)}
                        >
                          Cancel
                        </button>
                        <button
                          className="cmn_btn"
                          onClick={() => { handleAddExercise(); setSelectedIndex(exerciseCount); }}
                          disabled={isDisabled}
                        >
                          Add Exercise
                        </button>
                      </div>
                    </Col>
                  </Row>
                </div>
              ) : null
            )}
        </div>
      </div>
      {/* <Tab.Container id="left-tabs-example" defaultActiveKey={0}>
      <div className="d-flex setting_wrapper patient_exercise">
        <div className="border-end setting_pills">
          <Nav variant="pills" className="flex-column settings_tabs">
            <Nav.Item>
            {Array.isArray(days[eventData]) &&
              days[eventData]?.map((name, i) => {
                const dynamicEventKey = i === selectedIndex ? `selected-${i}` : i;

                return (
                  <Nav.Link
                    key={dynamicEventKey}
                    className={`${i === selectedIndex ? "active" : ""}`}
                    eventKey={dynamicEventKey}
                    onClick={() => setSelectedIndex(i)}
                  >
                    <span>{name.exerciseName}</span>{" "}
                    {days[eventData]?.length > 1 && (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation(); // Prevent triggering Nav.Link click
                          handleRemoveItems(eventData, i);
                        }}
                        className="iconBtn"
                      >
                        {CrosSvg}
                      </button>
                    )}
                  </Nav.Link>
                );
              })}

            </Nav.Item>
          </Nav>
        </div>
        <Tab.Content className="settings_content flex-grow-1 ">
          
          {Array.isArray(days[eventData]) &&
            days[eventData]?.map((day, i) => {
              const dynamicEventKey = i === selectedIndex ? `selected-${i}` : i;
              console.log(dynamicEventKey,"dynamicEventKey==>")
              if (i == selectedIndex) {
                return (
                  <Tab.Pane eventKey={dynamicEventKey} className={dynamicEventKey && "d-block opacity-100"}>
                    
                    <Row className="authWrapper ">
                      <Col lg={12}>
                        <h5>Exercise Filter</h5>
                      </Col>
                      <Col lg={12}>
                        <div className="exercise_filters_card d-flex gap-2">
                          <Form.Group
                            className="w-100"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label>Exercise type</Form.Label>
                            <Form.Select
                              aria-label="Default select example"
                              value={day?.category}
                              onChange={(e) =>
                                handleSelectCategory(e.target.value, i)
                              }
                            >
                              <option value="" disabled selected>
                                Please select category
                              </option>
                              {exercise_category?.map((category, i) => (
                                <option key={i} value={category}>
                                  {category}
                                </option>
                              ))}
                            </Form.Select>
                          </Form.Group>
                          <Form.Group
                            className="w-100"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label>Category</Form.Label>
                            <Form.Select
                              disabled={!editable}
                              aria-label="Default select example"
                              value={day?.patient_category}
                              onChange={(e) =>
                                handleSelectPatientCategory(e.target.value, i)
                              }
                            >
                              <option value="" selected>
                                Select Category
                              </option>
                              {patient_category?.map((data) => {
                                return <option value={data}>{data}</option>;
                              })}
                            </Form.Select>
                          </Form.Group>
                          <Form.Group
                            className="w-100"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label>Training Type</Form.Label>
                            <Select
                              options={options}
                              isMulti
                              className="basic-multi-select"
                              classNamePrefix="select"
                              placeholder="Select Training type"
                              value={options.filter((option) =>
                                day?.training_type?.includes(option.value)
                              )}
                              onChange={(e) => handleSetTrainingType(e, i)}
                            />
                          </Form.Group>
                        </div>
                      </Col>
                      <Col lg={12}>
                        <h5>Basic Information</h5>
                      </Col>
                      <Col lg={6}>
                        <div className="image_insert">
                          <Form.Label>Exercise Image</Form.Label>
                          <div className="upload_image position-relative">
                            <img
                              src={
                                day.exerciseImage
                                  ? day.exerciseImage
                                  : DefaultImage
                              }
                              className="exercise_selected_iamge"
                              alt="dfault"
                              width={200}
                              height={200}
                            />
                          </div>
                        </div>
                      </Col>
                      <Col lg={6}>
                        <Form.Group
                          className="mb-3"
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label>Exercise Name</Form.Label>

                          {exercise?.length > 0 ? (
                            <Form.Select
                              aria-label="Default select example"
                              value={day?.exerciseId || ""} // ✅ Show selected exercise
                              onChange={(e) => handleSelectExerciseName(e.target.value, i)}
                            >
                              <option value="">
                                Please select exercise name
                              </option>

                              {exercise
                                ?.filter((ex) =>
                                  ex.id === day?.exerciseId || // ✅ Allow selected value
                                  !days[eventData]?.some((dayItem) => dayItem.exerciseId === ex.id) // ❌ Remove only duplicates
                                )
                                .map((ex) => (
                                  <option key={ex.id} value={ex.id}>
                                    {ex.exercise_name}
                                  </option>
                                ))}
                            </Form.Select>

                          ) : (
                            <Form.Control
                              type="text"
                              placeholder="No exercises available"
                              disabled
                            />
                          )}
                        </Form.Group>

                        <Form.Group controlId="exampleForm.ControlInput1">
                          <Form.Label>Exercise Video Link</Form.Label>
                          <Form.Control
                            type="text"
                            disabled
                            value={day.exerciseVideo}
                            placeholder="Enter Video Link"
                          />
                        </Form.Group>
                        <Form.Group
                          className="w-100"
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label>Difficuilty Level</Form.Label>
                          <Form.Select
                            aria-label="Default select example"
                            value={day?.difficuilty_level || difficuilty}
                            onChange={(e) =>
                              handleSelectPatientDifficuilty(e.target.value, i)
                            }
                          >
                            <option value="" selected>
                              Select Difficuilty Level
                            </option>
                            {exerciseDifficuilty?.map((data) => {
                              return <option value={data}>{data}</option>;
                            })}
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row className="authWrapper">
                      <div className="mt-3">
                        <div className="d-flex align-items-center mb-2">
                          <h5 className="flex-grow-1 mb-0">Sets and Reps</h5>{" "}
                          <button
                            onClick={() => addNewFlexibilityToCardio(i)}
                            className="cmn_btn add_row"
                          >
                            Add Row
                          </button>
                        </div>
                        {day?.sets?.map((cardio, index) => (
                          <Form.Group className="mb-2">
                            {console.log(cardio,"cardio=========>")}
                            <div className="steps_items d-flex gap-2">
                              <div>
                                <Form.Label>Set {index + 1}</Form.Label>
                                <span className="step_count">{index + 1}</span>
                              </div>
                              <div className="w-100">
                                <div className="flex-grow-1">
                                  <div className="d-flex gap-2 mb-3">
                                    <div className="w-100">
                                      <div className="d-flex gap-2 align-items-center">
                                        <Form.Label className="flex-grow-1">
                                          Time Duration
                                        </Form.Label>{" "}
                                        <span
                                          onClick={() =>
                                            handleChangeCardioUnit(
                                              i,
                                              index,
                                              "time",
                                              "sec"
                                            )
                                          }
                                          className={
                                            cardio?.time?.unit === "sec"
                                              ? "time"
                                              : "time min"
                                          }
                                        >
                                          sec
                                        </span>{" "}
                                      </div>
                                      <Form.Control
                                        type="text"
                                        placeholder="00"
                                        value={cardio?.time?.value}
                                        onChange={(e) =>
                                          handleChangeCardioFields(
                                            i,
                                            index,
                                            "time",
                                            e
                                          )
                                        }
                                      />
                                    </div>
                                    <div className="flex-grow-1 w-100">
                                      <div className="d-flex gap-2 align-items-center">
                                        <Form.Label
                                          className="flex-grow-1"
                                          value={cardio?.reps}
                                          onChange={(e) =>
                                            handleChangeCardioFields(
                                              i,
                                              index,
                                              "reps",
                                              e
                                            )
                                          }
                                        >
                                          Reps
                                        </Form.Label>{" "}
                                      </div>
                                      <Form.Control
                                        type="text"
                                        placeholder="00"
                                        value={cardio?.reps}
                                        onChange={(e) =>
                                          handleChangeCardioFields(
                                            i,
                                            index,
                                            "reps",
                                            e
                                          )
                                        }
                                      />
                                    </div>
                                    <div className="flex-grow-1 w-100">
                                      <div className="d-flex gap-2 align-items-center">
                                        <Form.Label className="flex-grow-1">
                                          Weight
                                        </Form.Label>{" "}
                                        <span
                                          onClick={() =>
                                            handleChangeFlexibilityUnit(
                                              i,
                                              index,
                                              "weight",
                                              "kg"
                                            )
                                          }
                                          className={
                                            cardio?.weight?.unit === "kg"
                                              ? "time"
                                              : "time min"
                                          }
                                        >
                                          Kg
                                        </span>{" "}
                                        <span
                                          onClick={() =>
                                            handleChangeFlexibilityUnit(
                                              i,
                                              index,
                                              "weight",
                                              "lbs"
                                            )
                                          }
                                          className={
                                            cardio?.weight?.unit === "lbs"
                                              ? "time"
                                              : "time min"
                                          }
                                        >
                                          Lbs
                                        </span>
                                      </div>
                                      <Form.Control
                                        type="text"
                                        placeholder="00"
                                        value={cardio?.weight?.value}
                                        onChange={(e) =>
                                          handleChangeCardioFields(
                                            i,
                                            index,
                                            "weight",
                                            e
                                          )
                                        }
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {console.log(day?.cardioFields,"day?.cardioFields===>")}
                              {day?.sets?.length > 1 && (
                                <span
                                  onClick={() =>
                                    handleRemoveCardioFields(i, index)
                                  }
                                  className="minus align-self-end mb-2"
                                >
                                  x
                                </span>
                              )}
                            </div>
                          </Form.Group>
                        ))}
                      </div>
                      <Col lg={12} className="pt-3">
                        <div className="d-flex justify-content-end gap-2">
                          <button
                            className="cmn_btn border-btn px-4"
                            onClick={() => navigate(-1)}
                          >
                            Cancel
                          </button>
                          <button
                            className="cmn_btn"
                            onClick={() =>{ handleAddExercise();setSelectedIndex(exerciseCount);}}
                          >
                            Add Exercise
                          </button>
                        </div>
                      </Col>
                    </Row>
                  </Tab.Pane>
                );
              }
            })}
        </Tab.Content>
      </div>
    </Tab.Container> */}
    </>
  );
};

export default PatientPlanForm;