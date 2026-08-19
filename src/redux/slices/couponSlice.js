import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import BaseUrl from '../../../BaseUrl';

// Async thunk to fetch coupons from the backend
export const fetchCoupons = createAsyncThunk(
    'coupons/fetchCoupons',
    async (_, { rejectWithValue }) => {
        try {
            // Trying common endpoint patterns based on other slices
            const response = await axios.get(`${BaseUrl}/get-coupons`);
            
            if (response.data.success) {
                return response.data.coupons || response.data.data || response.data;
            } else {
                // If it isn't wrapped in success, it might just be the array or object
                return response.data;
            }
        } catch (error) {
            // Fallback: If /get-coupons fails, maybe it's /coupons?
            try {
                const retryResponse = await axios.get(`${BaseUrl}/coupons`);
                return retryResponse.data.coupons || retryResponse.data.data || retryResponse.data;
            } catch (retryError) {
                return rejectWithValue(retryError.response?.data?.message || retryError.message);
            }
        }
    }
);

const couponSlice = createSlice({
    name: 'coupons',
    initialState: {
        items: [],
        status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCoupons.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchCoupons.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // Make sure it's an array
                state.items = Array.isArray(action.payload) ? action.payload : Object.values(action.payload || {});
            })
            .addCase(fetchCoupons.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    }
});

export default couponSlice.reducer;
