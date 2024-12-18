import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import * as XLSX from 'xlsx';
import { CSVLink } from 'react-csv';
import Papa from 'papaparse';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { upload_exercises, clear_upload_exercise_state } from '../../redux/slices/exerciseSlice/uploadExercises';
import { get_exercise } from '../../redux/slices/exerciseSlice/getExercise';
import Spinner from 'react-bootstrap/Spinner';
import InfoIcon from '../../Images/info.png'
function UploadFileModal({ setShowFileUploadModal, showFileUploadModal }) {
    const dispatch = useDispatch();
    const [fileData, setFileData] = useState(null);
    const [uploadFile, setUploadFile] = useState();
    const [fileName, setFileName] = useState('');
    const [isValidUpload, setIsValidUpload] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [show_close_button, setShow_close_button] = useState(false)
    const [show_success, setShow_success] = useState([])
    const is_file_uploades = useSelector((store) => store.UPLOAD_EXERCISE);
    console.log(show_success, "this is the show_success")
    const handleClose = () => {
        setShowFileUploadModal(false)
        dispatch(clear_upload_exercise_state())
        setShow_close_button(false)
        setShow_success([])
    }

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setUploadFile(file);

        const fileType = file.name.split('.').pop().toLowerCase();

        if (fileType !== 'csv' && fileType !== 'xlsx' && fileType !== 'xls') {
            setIsValidUpload(false);
            toast.error('Only CSV or Excel files are allowed.');
            return;
        }
        setIsValidUpload(true);
        setErrorMessage('');

        const reader = new FileReader();

        if (fileType === 'csv') {
            reader.onload = (event) => {
                parseCSV(event.target.result);
            };
            reader.readAsText(file);
        } else if (fileType === 'xlsx' || fileType === 'xls') {
            reader.onload = (event) => {
                parseExcel(event.target.result);
            };
            reader.readAsArrayBuffer(file);
        }
    };

    const parseCSV = (data) => {
        Papa.parse(data, {
            complete: (result) => {
                setFileData(result.data);
                setFileName(`data_${new Date().toLocaleString()}.csv`);
            },
            header: false,
        });
    };

    const parseExcel = (data) => {
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        setFileData(rows);
        setFileName(`data_${new Date().toLocaleString()}.xlsx`);
    };

    const handleUpload = () => {
        if (!uploadFile) return
        dispatch(upload_exercises({ file: uploadFile }))
    };

    useEffect(() => {
        if (is_file_uploades?.isSuccess) {
            dispatch(get_exercise({ page: 1, tab: "approvalRequest" }))
            setShow_close_button(true)
            setShow_success(is_file_uploades?.data?.data?.successRecords)
        }
    }, [is_file_uploades])

    return (
        <Modal
            show={showFileUploadModal}
            className='cmn_modal '
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            onHide={() => {
                setShowFileUploadModal(false);
                setIsValidUpload(false);
                setErrorMessage('');
                dispatch(clear_upload_exercise_state())
                setFileData(null)
                setShow_close_button(false)
                setShow_success([])
            }}
            centered
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
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M24.2798 2.6503C24.4239 2.50636 24.5383 2.33545 24.6163 2.14733C24.6944 1.9592 24.7346 1.75754 24.7348 1.55386C24.7349 1.35019 24.6949 1.14848 24.6171 0.960257C24.5392 0.772036 24.4251 0.600986 24.2812 0.456876C24.1372 0.312765 23.9663 0.198416 23.7782 0.120356C23.5901 0.0422964 23.3884 0.00205508 23.1847 0.0019299C22.9811 0.00180471 22.7794 0.0417981 22.5911 0.119627C22.4029 0.197455 22.2319 0.311594 22.0877 0.455528L12.7344 9.8089L3.38369 0.455528C3.09265 0.164483 2.69791 0.000976559 2.28631 0.000976562C1.87471 0.000976566 1.47997 0.164483 1.18893 0.455528C0.897882 0.746572 0.734375 1.14131 0.734375 1.55291C0.734375 1.96451 0.897882 2.35925 1.18893 2.6503L10.5423 12.001L1.18893 21.3517C1.04482 21.4958 0.930501 21.6668 0.852509 21.8551C0.774517 22.0434 0.734375 22.2452 0.734375 22.449C0.734375 22.6528 0.774517 22.8546 0.852509 23.0429C0.930501 23.2312 1.04482 23.4023 1.18893 23.5464C1.47997 23.8375 1.87471 24.001 2.28631 24.001C2.49011 24.001 2.69192 23.9608 2.88021 23.8828C3.0685 23.8048 3.23958 23.6905 3.38369 23.5464L12.7344 14.193L22.0877 23.5464C22.3788 23.8371 22.7734 24.0003 23.1847 24C23.5961 23.9998 23.9905 23.8361 24.2812 23.5451C24.5719 23.254 24.735 22.8594 24.7348 22.4481C24.7345 22.0367 24.5709 21.6423 24.2798 21.3517L14.9264 12.001L24.2798 2.6503Z"
                        fill="black"
                    />
                </svg>
            </div>
            <Modal.Body>
                <h2 className="deletmodal_heading">Upload Exercises</h2>
                <div className="mb-3 pt-3">
                    <input
                        type="file"
                        accept=".csv, .xlsx, .xls"
                        onChange={handleFileUpload}
                        className="form-control"
                    />
                    <div className='info d-flex gap-3 mt-2'>

                        <img src={InfoIcon} alt="InfoIcon" />
                        <h6 >  File must include the following columns: exercise_name, category, video_link, description, imageUrl.</h6>
                    </div>
                </div>

                {!isValidUpload && <div className="text-danger">{errorMessage}</div>}

                <div className='table-responsive'>
                    {fileData && show_close_button && (
                        <table className="table table-striped table-bordered custom-table">
                            <thead>
                                <tr>
                                    {fileData[0].map((header, index) => (
                                        <th key={index}>{header}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {fileData.slice(1).map((row, rowIndex) => {
                                    // Check if any cell in the row matches the `exercise_name` field in `show_success`
                                    const isRowMatched = row.some(cell =>
                                        show_success.some(success => success.exercise_name === cell)
                                    );

                                    console.log(isRowMatched, "is row matched");

                                    return (
                                        <tr
                                            key={rowIndex}
                                            className={isRowMatched ? 'rowmatched' : ""}
                                            style={{ background: isRowMatched ? "green" : "transparent" }}
                                        >
                                            {row.map((cell, cellIndex) => (
                                                <td className="text-break" key={cellIndex}>
                                                    {cell}
                                                </td>
                                            ))}
                                        </tr>
                                    );
                                })}




                            </tbody>
                        </table>
                    )}
                    {is_file_uploades?.isSuccess && is_file_uploades?.data?.data?.errorRecords?.length > 0 && <div className='show_errors'>
                        <h4>Error logs for csv/xml uploads</h4>
                        <ul>

                            {is_file_uploades?.data?.data?.errorRecords?.map((ErrorCur, index) => {
                                return (

                                    <li key={index}>{ErrorCur?.error} row {ErrorCur?.row}</li>
                                )
                            })
                            }
                        </ul>
                    </div>}
                    {is_file_uploades?.isSuccess && is_file_uploades?.data?.data?.successRecords?.length > 0 && <div className='show_success'>
                        <h6 className='m-0'>File Uploaded Successfully</h6>
                        {/* <ul>

                            {is_file_uploades?.data?.data?.successRecords?.map((ErrorCur, index) => {
                                return (

                                    <li key={index}>{ErrorCur?.exercise_name} </li>
                                )
                            })
                            }
                        </ul> */}
                    </div>}

                </div>
                <div className='text-end d-flex justify-content-end gap-2'>
                    {fileData && !show_close_button && (
                        <>
                            {fileName.endsWith('.csv') ? (
                                <CSVLink data={fileData} filename={fileName}>
                                    <button className='cmn_btn'>Download Sample</button>
                                </CSVLink>
                            ) : (
                                <button
                                    className='cmn_btn'
                                    onClick={() => {
                                        const wb = XLSX.utils.book_new();
                                        const ws = XLSX.utils.aoa_to_sheet(fileData);
                                        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
                                        XLSX.writeFile(wb, fileName);
                                    }}
                                >
                                    Download Sample
                                </button>
                            )}
                        </>
                    )}
                    {isValidUpload && !show_close_button && <button className='cmn_btn' onClick={handleUpload}>{!is_file_uploades?.isLoading ? "Upload" : <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>}</button>}
                    {show_close_button && <button className='cmn_btn' onClick={handleClose}>Close</button>}
                </div>
            </Modal.Body>


        </Modal>
    );
}

export default UploadFileModal;
