import React from "react";
import validator from "validator";

export const ValidateLogin = (email, password) => {
    if (!email) {
        return { key: "email", message: "Email is required" };
    }
    if (!validator.isEmail(email)) {
        return { key: "email", message: "Email is invalid" };
    }
    if (!password) {
        return { key: "password", message: "Password is required" };
    }
    return { key: "success", message: "Validation passed" };
};
