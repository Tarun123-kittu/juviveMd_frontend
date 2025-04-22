import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrainingTypeDistribution } from "../../redux/slices/getPatientReportSlice/trainingTypeSlice";
import Dropdown from 'react-bootstrap/Dropdown';
import { CiFilter } from "react-icons/ci";
const TrainingTypeDistribution = ({ getTrainingType, patientId }) => {
    const dispatch = useDispatch();
    const [startDate, setStartDate] = React.useState('');
    const [endDate, setEndDate] = React.useState('');

    // Get current date in yyyy-mm-dd format for date input max attribute
    const currentDate = new Date().toISOString().split("T")[0]; 

    // Selector to get loading and error state from Redux slice
    const isLoading = useSelector((state) => state.GET_TRAINER_TYPE_REPORT.isLoading);
    const isError = useSelector((state) => state.GET_TRAINER_TYPE_REPORT.isError);

    const handleSubmit = () => {
        dispatch(fetchTrainingTypeDistribution({ patientId, startDate, endDate }));
    };

    const handleClear = () => {
        dispatch(fetchTrainingTypeDistribution({ patientId }));
        setStartDate('');
        setEndDate('');
    };

    const hasData = Array.isArray(getTrainingType) && getTrainingType.length > 0;

    const chartOptions = {
        chart: {
            type: "pie",
        },
        title: {
            text: null,
        },
        tooltip: {
            pointFormat: "<b>{point.percentage:.1f}%</b>",
        },
        accessibility: {
            point: {
                valueSuffix: "%",
            },
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: "pointer",
                dataLabels: {
                    enabled: true,
                    format: "<b>{point.name}</b>: {point.y}",
                    distance: 30,
                    connectorColor: "silver",
                },
                showInLegend: true,
            },
        },
        series: [
            {
                name: "Training Type",
                colorByPoint: true,
                data: getTrainingType?.map((item) => ({
                    name: item.name,
                    y: item.value,
                })),
            },
        ],
    };

    return (
        <div>
            <div className="filter_wrapper d-flex justify-content-end gap-2 align-items-center">
            <Dropdown className="filter_dropdown_toggle">
                    <Dropdown.Toggle variant="null" id="dropdown-basic">
                  Filter <CiFilter size={20}/>
                    </Dropdown.Toggle>
                       <Dropdown.Menu>
                       <div className="form-group">
                        <label htmlFor="">Start Date</label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="form-control"
                        max={currentDate} // Limit selection to today or earlier
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="">End Date</label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="form-control"
                        max={currentDate} // Limit selection to today or earlier
                    />
                </div>
                <div className="d-flex gap-3 justify-content-end mt-2">
                <button className="cmn_btn" onClick={handleSubmit} disabled={isLoading}>
                    {isLoading ? 'Loading...' : 'Submit'}
                </button>
                {(startDate || endDate) && (
                    <button className="cmn_btn border-btn" onClick={handleClear}>
                        Clear
                    </button>
                )}
                </div>
                       </Dropdown.Menu>
                    </Dropdown>
               
            </div>
            {isError && <p style={{ color: 'red' }}>Error fetching data!</p>}
            {hasData ? (
                <HighchartsReact highcharts={Highcharts} options={chartOptions} />
            ) : (
                <p style={{ textAlign: "center", marginTop: "2rem" }}>
                    No training type data available for the selected range.
                </p>
            )}
        </div>
    );
};

export default TrainingTypeDistribution;