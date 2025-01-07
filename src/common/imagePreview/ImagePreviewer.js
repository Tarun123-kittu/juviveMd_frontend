import React from "react";

const ImagePreview = ({ setShowPopup, showPopup, image }) => {
    const closePopup = () => {
        setShowPopup(false);
    };

    return (
        <div className="container mt-5">
            {showPopup && (
                <div
                    className="modal fade show d-block"
                    tabIndex="-1"
                    style={{
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100vh",
                    }}
                >
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button
                                    type="button"
                                    className="btn-close"
                                    aria-label="Close"
                                    onClick={closePopup}
                                ></button>
                            </div>
                            <div className="modal-body text-center">
                                <img
                                    src={image}
                                    alt="Preview"
                                    className="img-fluid"
                                    style={{ maxHeight: "500px" }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImagePreview;
