import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useSelector, useDispatch } from "react-redux";
import { fetch_weight_progress } from "../../redux/slices/getPatientReportSlice/weightProgressSlice";
import Dropdown from 'react-bootstrap/Dropdown';
import { CiFilter } from "react-icons/ci";
const WeightProgressChart = ({ weightProgressData, patientId }) => {
    const dispatch = useDispatch();
    const hasData = weightProgressData && weightProgressData.series && weightProgressData.series.length > 0;
    const [selectedOption, setSelectedOption] = React.useState('');
    const isLoading = useSelector((state) => state.GET_WEIGHT_REPORT.isLoading);

    // Safely map exercises and data
    const exercises = weightProgressData?.series?.map(item => item.name) || [];
    const sessionCount = weightProgressData?.series?.length > 0
        ? Math.max(0, ...weightProgressData.series.map(item => item.data.length))
        : 0;

    // Initialize default session series, if necessary
    const sessionSeries = Array.from({ length: sessionCount }, (_, i) => ({
        name: `Session ${i + 1}`,
        data: Array(weightProgressData.series.length).fill(null)
    }));

    // Populate sessionSeries if weightProgressData is defined
    if (weightProgressData && weightProgressData.series) {
        weightProgressData.series.forEach((exercise, exerciseIndex) => {
            exercise.data.forEach((val, i) => {
                sessionSeries[i].data[exerciseIndex] = val ?? null;
            });
        });
    }

    const handleSubmit = () => {
        dispatch(fetch_weight_progress({ patientId, monthsToCompare: selectedOption }));
    };

    const handleClear = () => {
        dispatch(fetch_weight_progress({ patientId }));
        setSelectedOption('');
    };

    const chartOptions = {
        chart: {
            type: "bar",
        },
        title: {
            text: "Weight Progress by Exercise",
        },
        xAxis: {
            categories: exercises,
            title: { text: null },
            gridLineWidth: 1,
        },
        yAxis: {
            min: 0,
            title: {
                text: "Weight (kg)",
            },
        },
        tooltip: {
            shared: true,
            valueSuffix: " kg",
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true,
                },
                groupPadding: 0.1,
            },
        },
        credits: { enabled: false },
        legend: {
            enabled: false,
        },
        series: sessionSeries
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
                            <label htmlFor="">Select Duration</label>
                            <select className="form-select" value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
                                <option value="">Select Duration</option>
                                <option value="1">One Month</option>
                                <option value="2">Two Months</option>
                                <option value="3">Three Months</option>
                            </select>
                        </div>
                        <div className="d-flex gap-3 justify-content-end mt-2">

                            <button className="cmn_btn" onClick={handleSubmit} disabled={isLoading}>
                                {isLoading ? 'Loading...' : 'Submit'}
                            </button>
                            {selectedOption && <button className="cmn_btn border-btn" onClick={handleClear}>
                                Clear
                            </button>}
                        </div>
                    </Dropdown.Menu>
                </Dropdown>

            </div>
            {isLoading ? (
                <p style={{ textAlign: "center", marginTop: "2rem" }}>
                    Loading data...
                </p>
            ) : hasData ? (
                <HighchartsReact highcharts={Highcharts} options={chartOptions} />
            ) : (
                <p style={{ textAlign: "center", marginTop: "2rem" }}>
                    No weight progress data available for the selected duration.
                </p>
            )}
        </div>
    );
};

export default WeightProgressChart;