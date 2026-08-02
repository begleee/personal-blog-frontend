import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/services/api";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (credentials, { rejectWithValue }) => {
        const { email, password } = credentials;
        try {
            const response = await fetch('http://localhost:3000/login',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                }
            )
            const data = await response.json();

            if(!response.ok) {
                return rejectWithValue(data.message || "Login failed");
            }
            
            Cookies.set("access_token", data.accessToken);
            Cookies.set("resfresh_token", data.refreshToken);

            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Login failed");
        }
    }
);

export const logoutUser = createAsyncThunk(
    "auth/logoutUser",
    async(_, { rejectWithValue }) => {
        try {
            await api.post("/logout");
            
            Cookies.remove("access_token");
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Logout failed");
        }
    }
);

const initialState = {
    user: JSON.parse(localStorage.getItem("user_profile")) || null,
    isAthenticated: !!localStorage.getItem("user_profile"),
    isLoading: false,
    error: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        updateUser: (status, action) => {
            status.user = action.payload;
            localStorage.setItem("user_profile", action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(loginUser.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isAthentificated = true;
            const decodedUser = jwtDecode(action.payload.accessToken);
            state.user = decodedUser;
            localStorage.setItem("user_profile", JSON.stringify(decodedUser))
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })
        //logout actoins
        .addCase(logoutUser.fulfilled, (state) => {
            state.user = null;
            state.isAthentificated = false;
            localStorage.removeItem("user_profile");
        });
    },
});

export const { updateUser } = authSlice.actions;
export default authSlice.reducer;
