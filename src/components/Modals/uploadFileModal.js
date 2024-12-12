import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import * as XLSX from 'xlsx';
import { CSVLink } from 'react-csv';
import Papa from 'papaparse';
import toast from 'react-hot-toast';
import { upload_exercises, clear_upload_exercise_state } from '../../redux/slices/exerciseSlice/uploadExercises';
import { useDispatch, useSelector } from 'react-redux';

function UploadFileModal({ setShowFileUploadModal, showFileUploadModal }) {
    const dispatch = useDispatch()
    const [fileData, setFileData] = useState(null);
    const [uploadFile,setUploadFile] = useState()
    const [fileName, setFileName] = useState('');
    const [isValidUpload, setIsValidUpload] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const is_file_uploades = useSelector((store) => store.UPLOAD_EXERCISE)
    console.log(is_file_uploades,"is file uploades")

    useEffect(() => {
        if (showFileUploadModal) {
            loadDemoFile();
        }
    }, [showFileUploadModal]);

    const loadDemoFile = () => {
        fetch('/exercise.xlsx')
            .then((response) => response.arrayBuffer())
            .then((buffer) => {
                parseExcel(buffer);
            })
            .catch((error) => console.error('Error loading the demo file:', error));
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        console.log(file,"this is the file")
        if (!file) return;
        setUploadFile(file)

        const fileType = file.name.split('.').pop().toLowerCase();

        // Validate file type
        if (fileType !== 'csv' && fileType !== 'xlsx' && fileType !== 'xls') {
            setIsValidUpload(false);
            toast.error('Only CSV or Excel files are allowed.');
            return;
        }

        // Reset error state for valid file type
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

    return (
        <Modal
            show={showFileUploadModal}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            onHide={() => {
                setShowFileUploadModal(false);
                setIsValidUpload(false);
                setErrorMessage('');
            }}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Upload Excel or CSV File to Create Exercises
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* File Upload Input */}
                <div className="mb-3">
                    <input
                        type="file"
                        accept=".csv, .xlsx, .xls"
                        onChange={handleFileUpload}
                        className="form-control"
                    />
                </div>

                {/* Error Message for Invalid Upload */}
                {!isValidUpload && <div className="text-danger">{errorMessage}</div>}

                {/* Show demo preview */}
                <div>
                    <h5>Demo Preview:</h5>
                    {fileData && (
                        <table className="table table-striped table-bordered custom-table">
                            <thead>
                                <tr>
                                    {fileData[0].map((header, index) => (
                                        <th key={index}>{header}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {fileData.slice(1).map((row, index) => (
                                    <tr key={index}>
                                        {row.map((cell, i) => (
                                            <td key={i}>{cell}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </Modal.Body>
            <Modal.Footer>
                {fileData && (
                    <>
                        {fileName.endsWith('.csv') ? (
                            <CSVLink data={fileData} filename={fileName}>
                                <Button>Download CSV</Button>
                            </CSVLink>
                        ) : (
                            <Button
                                className='cmn_btn'
                                onClick={() => {
                                    const wb = XLSX.utils.book_new();
                                    const ws = XLSX.utils.aoa_to_sheet(fileData);
                                    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
                                    XLSX.writeFile(wb, fileName);
                                }}
                            >
                                Download Excel
                            </Button>
                        )}
                    </>
                )}
                {isValidUpload && <Button className='cmn_btn' onClick={() => dispatch(upload_exercises({file : uploadFile}))}>Upload</Button>}
            </Modal.Footer>
        </Modal>
    );
}

export default UploadFileModal;
