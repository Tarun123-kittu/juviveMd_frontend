import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { fetchProgressFactor } from "../../redux/slices/getPatientReportSlice/progressFactorSlice";
import { useDispatch } from "react-redux";
import Dropdown from 'react-bootstrap/Dropdown';
import { CiFilter } from "react-icons/ci";

const MobilityProgressChart = ({ progressFactorData, trainingType, patientId }) => {
    console.log("progressFactorDataInside", progressFactorData)
    const dispatch = useDispatch();
    const [startDate, setStartDate] = React.useState('');
    const [endDate, setEndDate] = React.useState('');
    const [selectedOption, setSelectedOption] = React.useState('');
    const [loading, setLoading] = React.useState(false); // Loading state
    const [showDropdown, setShowDropdown] = React.useState(false);
    const currentDate = new Date().toISOString().split("T")[0]; // Get current date in yyyy-mm-dd format

    const handleSubmit = () => {
        setLoading(true); // Set loading to true on submit
        dispatch(fetchProgressFactor({ patientId, startDate, endDate, trainingType: selectedOption }))
            .finally(() => {
                setLoading(false); // Set loading to false after fetch is complete
            });
        setShowDropdown(false)
    };

    const handleClear = () => {
        dispatch(fetchProgressFactor({ patientId }));
        setStartDate('');
        setEndDate('');
        setSelectedOption('');
        setShowDropdown(false)
        setLoading(false); // Reset loading when clearing
    };

    // Safeguard against undefined data
    if (!progressFactorData?.weeks || !progressFactorData?.exercises) return null;

    const chartOptions = {
        chart: {
            type: "line"
        },
        title: {
            text: loading ? "" : progressFactorData.trainingType ,
        },
        xAxis: {
            categories: progressFactorData.weeks,
            title: {
                text: "Weeks"
            }
        },
        yAxis: {
            title: {
                text: "Progress Factor"
            },
            min: 0,
            max: 1
        },
        legend: {
            align: "right",
            verticalAlign: "middle",
            layout: "vertical"
        },
        series: progressFactorData?.exercises?.map((exercise) => {
            return {
                name: exercise?.name || "Unknown",
                data: [...(exercise?.data || [])] // Clone the array
            };
        }),
        responsive: {
            rules: [
                {
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        legend: {
                            layout: "horizontal",
                            align: "center",
                            verticalAlign: "bottom"
                        }
                    }
                }
            ]
        }
    };

    const shouldShowClearButton = startDate || endDate || selectedOption;

    return (
        <>
            <div className="filter_wrapper d-flex justify-content-end gap-2 align-items-center">

                <Dropdown
                    show={showDropdown}
                    onToggle={() => setShowDropdown(!showDropdown)}
                    className="filter_dropdown_toggle">
                    <Dropdown.Toggle variant="null" id="dropdown-basic">
                        Filter <CiFilter size={20} />

                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <div className="form-group">
                            <label htmlFor="">Start Date</label>
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="form-control"
                                max={currentDate} // Prevent selecting future dates
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="">End Date</label>
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="form-control"
                                max={currentDate} // Prevent selecting future dates
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Training Type</label>
                            <select className="form-select" value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
                                <option value="" disabled>Select Option</option>
                                {trainingType.map((value, index) => (
                                    <option key={index} value={value}>{value}</option>
                                ))}
                            </select>
                        </div>
                        <div className="d-flex gap-3 justify-content-end mt-2">
                            <button className="cmn_btn" onClick={handleSubmit} disabled={loading}>
                                {loading ? "Loading..." : "Submit"}
                            </button>
                            {shouldShowClearButton && (
                                <button className="cmn_btn border-btn" onClick={handleClear}>Clear</button>
                            )}
                        </div>
                    </Dropdown.Menu>
                </Dropdown>

            </div>

            {loading && <p className="text-center">Loading...</p>} {/* Render loading indicator */}
            {!loading && progressFactorData?.exercises.length === 0 ? <p className="text-center blank_chart">No data found for Mobility Progress</p> : <HighchartsReact highcharts={Highcharts} options={chartOptions} />}

        </>
    );
};

export default MobilityProgressChart;