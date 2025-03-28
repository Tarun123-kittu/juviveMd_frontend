import React, { useState, useEffect, useRef } from 'react';
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
import { RxCross2 } from "react-icons/rx";

function UploadFileModal({ setShowFileUploadModal, showFileUploadModal, setActiveTab }) {
    const dispatch = useDispatch();
    const fileInputRef = useRef(null);
    const [fileData, setFileData] = useState(null);
    const [uploadFile, setUploadFile] = useState();
    const [fileName, setFileName] = useState('sample.csv');
    const [showPreview, setShowPreview] = useState(false)
    const [isValidUpload, setIsValidUpload] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [show_close_button, setShow_close_button] = useState(false)
    const [show_success, setShow_success] = useState([])
    const [csvData, setCsvData] = useState([]);
    const [hide_download, setHide_download] = useState(true)

    const is_file_uploades = useSelector((store) => store.UPLOAD_EXERCISE);

    const expectedHeaders = [
        'Exercise Name', 'Exercise Type', 'Category',
        'Start Point, A', 'Start Point, B', 'Start Point, C',
        'Exercise Unit', 'Upper', 'Lower', 'Unilateral', 'Back',
        'Full Body', 'Push', 'Pull', 'Core', 'Chest', 'Mobility',
        'Biceps', 'Triceps', 'Shoulders', 'Conditioning', 'Menopause',
        'image_url', 'video_link', 'description'
    ];


    useEffect(() => {
        if (!showFileUploadModal) return
        fetch("/exercises - Sheet1 (1).csv")
            .then((response) => response.text())
            .then((data) => {
                const cleanedData = data.replace(/^\uFEFF/, "");
                Papa.parse(cleanedData, {
                    complete: (result) => {
                        setFileData(result.data);
                    },
                    header: false,
                });
            })
            .catch((error) => console.error("Error fetching CSV file:", error));
    }, [showFileUploadModal]);

    const handleClose = () => {
        setShowFileUploadModal(false)
        dispatch(clear_upload_exercise_state())
        setShow_close_button(false)
        setShow_success([])
        setFileData("")
        setIsValidUpload(false)
        setShowPreview(false)
        setHide_download(true)
        is_file_uploades?.isSuccess && setActiveTab("approvalRequest")
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
                console.log(result.data,"result.data")
                setFileData(result?.data);
                setHide_download(false);
                setShowPreview(true);
                setFileName(`data_${new Date().toLocaleString()}.csv`);
            },
            header: false,
        });
    };
    const parseExcel = (data) => {
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const rows = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: "" });
    
        // Filter out rows where all columns are empty
        const filteredRows = rows.filter(row => row.some(cell => cell !== "")); 
    
        console.log(filteredRows, "Filtered Rows");
        setFileData(filteredRows);
        setShowPreview(true);
        setHide_download(false);
        setFileName(`data_${new Date().toLocaleString()}.xlsx`);
    };
    
 const handleUpload = () => {
        if (!uploadFile) return
        dispatch(upload_exercises({ file: uploadFile }))
    };

    useEffect(() => {
        if (is_file_uploades?.isSuccess) {
            // handleClose()
            dispatch(get_exercise({ page: 1, tab: "approvalRequest" }))
            setShow_close_button(true)
            setShow_success(is_file_uploades?.data?.data?.processedExercises)
        }
        if (is_file_uploades?.isError) {
            console.log(is_file_uploades);
            toast.error(is_file_uploades?.error?.loggedError, {
                duration: 2000
            })
            dispatch(clear_upload_exercise_state())
        }
    }, [is_file_uploades])

    const handleCloseUpload = () => {
        setActiveTab("approvalRequest")
        setShowFileUploadModal(false)
        dispatch(clear_upload_exercise_state())
        setShow_close_button(false)
        setShow_success([])
        setFileData("")
        setIsValidUpload(false)
        setShowPreview(false)
        setHide_download(true)
    }

    const refreshField = () => {
        fetch("/exercises - Sheet1 (1).csv")
            .then((response) => response.text())
            .then((data) => {
                const cleanedData = data.replace(/^\uFEFF/, "");
                if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                }
                setIsValidUpload(false)
                setShow_close_button(false)
                setHide_download(true)
                Papa.parse(cleanedData, {
                    complete: (result) => {
                        setFileData(result.data);
                    },
                    header: false,
                });
            })
            .catch((error) => console.error("Error fetching CSV file:", error));
    }

    return (
        <Modal
            show={showFileUploadModal}
            className='cmn_modal upoadFile_modal'
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
                    <div className='position-relative'>
                        <input
                            type="file"
                            accept=".csv, .xlsx, .xls"
                            onChange={handleFileUpload}
                            className="form-control"
                            ref={fileInputRef}
                        />
                        {isValidUpload && !show_close_button && <RxCross2 onClick={() => refreshField()} className="position-absolute end-0 top-0 mt-2 me-2" size={20} type='button' />}
                    </div>
                    {fileData !== null && <div className='info d-flex gap-3 mt-3'>

                        <img src={InfoIcon} alt="InfoIcon" />
                        <h6>{!showPreview ? "Sample Preview" : "Uploaded file preview"}</h6>
                    </div>}
                </div>

                {!isValidUpload && <div className="text-danger">{errorMessage}</div>}

                <div className='table-responsive uploadTable'>
                   <div className='uploadTable_result'>
                     {fileData && fileData?.length > 0 && (
                        <table className="table table-striped table-bordered custom-table">
                            <thead>
                                <tr>
                                    {fileData[0].map((header, index) => (
                                        <th key={index}>{header}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(fileData) && fileData.slice(1).map((row, rowIndex) => {
                                    if (!Array.isArray(row)) return null;  
                                    const isRowMatched = row.some(cell => {

                                        return Array.isArray(show_success) && show_success.some(success => {
                                            return String(cell).trim().toLowerCase() === String(success?.exercise_name).trim().toLowerCase();
                                        });
                                    });

                                    return (
                                        <tr
                                            key={rowIndex}
                                            className={isRowMatched ? 'rowmatched' : ""}
                                            style={{ background: isRowMatched ? "green" : "transparent" }}
                                        >
                                            {row.map((cell, cellIndex) => (
                                                <td className="text-break" key={cellIndex}>
                                                    {String(cell)} 
                                                </td>
                                            ))}
                                        </tr>
                                    );
                                })}
                            </tbody>



                        </table>
                    )}
                   </div>
                    {is_file_uploades?.isSuccess && is_file_uploades?.data?.data?.successRecords?.length > 0 && <div className='show_success'>
                        <h6 className='m-0'>{is_file_uploades?.data?.data?.errorRecords?.length > 0 ? "Some of your exercises has been uploaded Successfully !!" : "Exercises Uploaded Successfully !!"}</h6>
                    </div>}
                    {is_file_uploades?.isSuccess && is_file_uploades?.data?.data?.errorRecords?.length > 0 && <div className='show_errors'>
                        <h4>There are some errors in Your file.Please check below</h4>
                        <ul>

                            {is_file_uploades?.data?.data?.errorRecords?.map((ErrorCur, index) => {
                                return (

                                    <li key={index}>{ErrorCur?.error} row {ErrorCur?.row}</li>
                                )
                            })
                            }
                        </ul>
                    </div>}


                </div>
                <div className='text-end d-flex justify-content-end gap-2'>
                    {fileData !== null && hide_download && (
                        <>
                            <div>
                                <a
                                    href="/exercises - Sheet1 (1).csv"
                                    download="sample.csv"
                                    className='text-decoration-none'
                                >
                                    <button className="cmn_btn mt-3">Download Sample</button>
                                </a>
                            </div>
                        </>
                    )}
                    {isValidUpload && !show_close_button && <button className='cmn_btn mt-3' onClick={handleUpload}>Upload {is_file_uploades?.isLoading && <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>}</button>}
                    {show_close_button && <button className='cmn_btn mt-3' onClick={() => handleCloseUpload()}>Close</button>}
                </div>
            </Modal.Body>


        </Modal>
    );
}

export default UploadFileModal;
