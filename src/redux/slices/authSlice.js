import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import BaseUrl from '../../../BaseUrl';

export const sendMobileOtp = createAsyncThunk(
    'auth/sendMobileOtp',
    async (mobileNumber, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BaseUrl}/check-mobile-send-otp`, { mobileNumber });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to send OTP');
        }
    }
);

export const verifyMobileOtp = createAsyncThunk(
    'auth/verifyMobileOtp',
    async ({ mobileNumber, otp }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BaseUrl}/verify-otp`, { mobileNumber, otp });
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
            }
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Verification failed');
        }
    }
);

export const sendEmailOtp = createAsyncThunk(
    'auth/sendEmailOtp',
    async (email, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BaseUrl}/send-email-otp`, { email });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to send email OTP');
        }
    }
);

export const verifyEmailOtp = createAsyncThunk(
    'auth/verifyEmailOtp',
    async ({ email, otp }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BaseUrl}/verify-email-otp`, { email, otp });
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
            }
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Verification failed');
        }
    }
);

export const loginWithEmail = createAsyncThunk(
    'auth/loginWithEmail',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BaseUrl}/login-user`, { email, password });
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
            }
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Login failed');
        }
    }
);

export const signupWithEmail = createAsyncThunk(
    'auth/signupWithEmail',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BaseUrl}/signup-with-email`, userData);
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
            }
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Signup failed');
        }
    }
);

export const loginWithGoogle = createAsyncThunk(
    'auth/loginWithGoogle',
    async (token, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BaseUrl}/sign-up-with-google`, { token });
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
            }
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Google login failed');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token: localStorage.getItem('token') || null,
        loading: false,
        error: null,
        otpSessionData: null, // Stores email/mobile when moving from Login to OTP Modal
        isNewUser: false,
        isLoginModalOpen: false
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem('token');
        },
        clearError: (state) => {
            state.error = null;
        },
        setOtpSessionData: (state, action) => {
            state.otpSessionData = action.payload; // { type: 'email' | 'mobile', value: string }
        },
        clearOtpSessionData: (state) => {
            state.otpSessionData = null;
        },
        setLoginModalOpen: (state, action) => {
            state.isLoginModalOpen = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            // sendMobileOtp
            .addCase(sendMobileOtp.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(sendMobileOtp.fulfilled, (state, action) => {
                state.loading = false;
                state.isNewUser = action.payload.isNewUser;
            })
            .addCase(sendMobileOtp.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

            // verifyMobileOtp
            .addCase(verifyMobileOtp.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(verifyMobileOtp.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload.user) state.user = action.payload.user;
                if (action.payload.token) state.token = action.payload.token;
            })
            .addCase(verifyMobileOtp.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

            // sendEmailOtp
            .addCase(sendEmailOtp.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(sendEmailOtp.fulfilled, (state, action) => {
                state.loading = false;
                state.isNewUser = action.payload.isNewUser;
            })
            .addCase(sendEmailOtp.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

            // verifyEmailOtp
            .addCase(verifyEmailOtp.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(verifyEmailOtp.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload.user) state.user = action.payload.user;
                if (action.payload.token) state.token = action.payload.token;
            })
            .addCase(verifyEmailOtp.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

            // loginWithEmail
            .addCase(loginWithEmail.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(loginWithEmail.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(loginWithEmail.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

            // signupWithEmail
            .addCase(signupWithEmail.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(signupWithEmail.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(signupWithEmail.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

            // loginWithGoogle
            .addCase(loginWithGoogle.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(loginWithGoogle.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(loginWithGoogle.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
    }
});

export const { logout, clearError, setOtpSessionData, clearOtpSessionData, setLoginModalOpen } = authSlice.actions;
export default authSlice.reducer;
