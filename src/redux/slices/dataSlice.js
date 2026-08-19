import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import BaseUrl from '../../../BaseUrl';

// Async thunk to fetch products from the backend
export const fetchProducts = createAsyncThunk(
    'data/fetchProducts',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BaseUrl}/getAllProducts`);

            if (response.data.success) {
                // Store in local storage
                localStorage.setItem('products', JSON.stringify(response.data.products));
                return response.data.products;
            } else {
                return rejectWithValue(response.data.message);
            }
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

// Helper to load initial state from local storage
const loadProductsFromStorage = () => {
    try {
        const serializedData = localStorage.getItem('products');
        if (serializedData === null) {
            return [];
        }
        return JSON.parse(serializedData);
    } catch (e) {
        console.warn("Error reading from local storage", e);
        return [];
    }
};

const dataSlice = createSlice({
    name: 'data',
    initialState: {
        products: loadProductsFromStorage(),
        status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    }
});

export default dataSlice.reducer;
