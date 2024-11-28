import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

export const user_login = createAsyncThunk("user_login",async({email,password},thunkAPI) => {
    try {
        const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "email": email,
  "password": password
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/admin-login`, requestOptions)
if (!response.ok) {
    const errorMessage = await response.json();
    if (errorMessage) {
        throw new Error(errorMessage.message);
    }
}

const result = await response.json();
return result;
} catch (error) {
return thunkAPI.rejectWithValue({
    message: error.message,
});
}
})

const UserLoginAPI = createSlice({
    name : "UserLoginAPI",
    initialState : {
        isLoading : false,
        isError : false,
        isSuccess : false,
        data : [],
        error : null
    },
    reducers : {
        clear_login_state : (state) => {
            state.isSuccess = false
            state.isError = false
            state.isLoading = false
            state.data = []
            state.error = null
            return state
        }
    },
    extraReducers : (builder) => {
        builder
        .addCase(user_login.pending,(state) => {
            state.isLoading = true
        })
        .addCase(user_login.fulfilled,(state,action) => {
            state.isSuccess = true
            state.isLoading = false
            state.data = action.payload
        })
        .addCase(user_login.rejected,(state,action) => {
            state.isLoading = false
            state.isError = true
            state.error = action.payload
        })
    }
})
export const {clear_login_state} = UserLoginAPI.actions
export default UserLoginAPI.reducer