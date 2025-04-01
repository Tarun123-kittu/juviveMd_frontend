import toast from "react-hot-toast";

// let lastToastId = null; // Store the last toast ID

// export const showToast = (message = "", type = "info") => {
//     if (!message || !type) return;

//     // Dismiss the last toast before showing a new one
//     if (lastToastId) {
//         toast.dismiss(lastToastId);
//     }

//     const toastTypes = {
//         SUCCESS: () => (lastToastId = toast.success(message)),
//         ERROR: () => (lastToastId = toast.error(message)),
//         INFO: () => (lastToastId = toast(message)), // Default info toast
//         WARNING: () => (lastToastId = toast(message)), // No dedicated warning, using default
//     };

//     const show = toastTypes[type.toUpperCase()];
//     if (show) show();
// };

// import toast from "react-hot-toast";

export const showToast = (message = "", type = "") => {
    if (!message || !type) {
        return "";
    }

    if (type.toUpperCase() === "SUCCESS") {
        toast.success(message, { id: "success" });
    }
    if (type.toUpperCase() === "ERROR") {
        toast.error(message, { id: "error" });
    }
    if (type.toUpperCase() === "INFO") {
        toast(message, { id: "info" });
    }
};
