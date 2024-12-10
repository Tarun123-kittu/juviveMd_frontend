import React, { useState, useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Dropdown } from "react-bootstrap";
import { common_data_api } from "../../redux/slices/commonDataSlice/commonDataDlice";
import { useDispatch, useSelector } from "react-redux";
import { get_exercise,clear_get_single_exercise_state } from "../../redux/slices/exerciseSlice/getExercise";
import ActiveExerciseTab from "../../components/Tabs/ExerciseTab/ActiveExerciseTab";
import { useLocation } from 'react-router-dom';


const Exercise = () => {
  const dispatch = useDispatch();
  const location = useLocation()
  const {pathname} = location
  const [toggleFilter, setToggleFilter] = useState(false);
  const [exercise_category, setExercise_category] = useState();
  const [activeTab, setActiveTab] = useState("active");
  const [username, setUsername] = useState("")
  const [category, setCategory] = useState("")
  const [date, setDate] = useState("")

  const common_data = useSelector((store) => store.COMMON_DATA);

  useEffect(() => {
    dispatch(common_data_api());
    
  }, []);

  useEffect(() => {
    if (common_data?.isSuccess) {
      setExercise_category(common_data?.data?.data?.exercise_category);
      
    }
  }, [common_data]);

  const renderTabContent = () => {
    switch (activeTab) {
      case "active":
        return <ActiveExerciseTab pathname={pathname} setToggleFilter={setToggleFilter} tab={"active"} showDropdown={true} exercise_category={exercise_category} admin={true}/>;
      case "approvalRequest":
        return <ActiveExerciseTab pathname={pathname} setToggleFilter={setToggleFilter} tab={"approvalRequest"} showDropdown={true} exercise_category={exercise_category} admin={true}/>;
      case "rejected":
        return <ActiveExerciseTab pathname={pathname} setToggleFilter={setToggleFilter} tab={"rejected"} showDropdown={true} exercise_category={exercise_category} admin={true}/>;
      default:
        return null;
    }
  };

  const handleSearch = () => {
    dispatch(get_exercise({ page: 1, tab: activeTab, date, exercise: username, category }))
    
  }

  const handleClear = () => {
    setUsername()
    setCategory()
    setDate()
    dispatch(get_exercise({ page: 1, tab: activeTab }))
  }

  const handleValueClear = () => {
    setUsername()
    setCategory()
    setDate()
    dispatch(clear_get_single_exercise_state())
  }

  return (
    <div className="wrapper">
      <div className="inner_wrapper">
        <div className="cmn_head mb-2 ">
          <h2>Exercise</h2>
        </div>
        <div className="cmn_bg_wrapper exercise_tab">
          <div className="position-relative">
            <div className="d-flex gap-2 position-absolute end-0">

              <button
                className="cmn_btn px-4 filter_btn"
                onClick={() => { setToggleFilter(!toggleFilter)}}
              >
                Filter
              </button>
            </div>
              {toggleFilter && (
                  <div className="patient_filter">
                    <div className="filter_list w-100">
                      <input
                        type="text"
                        placeholder="Exercise Name"
                        className="form-control"
                        value={username || ""}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>

                    <div className="patient_dropdown w-100">
                      <Dropdown>
                        <Dropdown.Toggle variant="unset">
                          {category ? category : "select Category"}
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12.2143 3.7041H11.1253C11.0513 3.7041 10.9816 3.7404 10.938 3.79993L6.81303 9.48579L2.68802 3.79993C2.64446 3.7404 2.57477 3.7041 2.50072 3.7041H1.41175C1.31737 3.7041 1.2622 3.81155 1.31737 3.8885L6.43697 10.9465C6.62282 11.202 7.00323 11.202 7.18763 10.9465L12.3072 3.8885C12.3639 3.81155 12.3087 3.7041 12.2143 3.7041V3.7041Z"
                              fill="black"
                              fill-opacity="0.25"
                            />
                          </svg>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          <ul>
                            {exercise_category?.map((category) => {
                              return (
                                <Dropdown.Item type="button" onClick={() => setCategory(category)}>{category}</Dropdown.Item>
                              )
                            })}
                          </ul>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                    <div className="filter_list w-100">
                      <input
                        type="date"
                        placeholder="Exercise Name"
                        className="form-control"
                        onChange={(e) => setDate(e.target.value)}
                      />
                    </div>
                    <div className='d-flex justify-content-end gap-2'>
                    <button className="cmn_btn" onClick={() => handleSearch()}>Search</button>
                    <button className="cmn_btn fade_color" onClick={() => handleClear()}>Clean</button>
                      </div>
                  </div>
                )}
            <div className={`${toggleFilter && "blur_bg"}`}>

            <Tabs
              activeKey={activeTab} 
              onSelect={(key) => {setActiveTab(key);handleValueClear()}} 
              id="uncontrolled-tab-example"
              className={`mb-3 cmn_tabs ${toggleFilter && "blur_bg"}`}
            >
              <Tab eventKey="active" title="Active" />
              <Tab eventKey="approvalRequest" title="Approval Requests" />
              <Tab eventKey="rejected" title="Rejected" />
            </Tabs>

            {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exercise;
