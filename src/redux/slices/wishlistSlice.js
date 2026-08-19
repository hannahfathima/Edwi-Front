import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import BaseUrl from '../../../BaseUrl';

// Get token helper
const getToken = () => localStorage.getItem('token');

export const fetchWishlist = createAsyncThunk(
    'wishlist/fetchWishlist',
    async (_, { rejectWithValue }) => {
        try {
            const token = getToken();
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.get(`${BaseUrl}/get-wishlist`, config);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.error || 'Failed to fetch wishlist');
        }
    }
);

export const addToWishlist = createAsyncThunk(
    'wishlist/addToWishlist',
    async ({ productId }, { dispatch, rejectWithValue }) => {
        try {
            const token = getToken();
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.post(`${BaseUrl}/add-to-wishlist`, { productId }, config);
            dispatch(fetchWishlist()); // Refresh wishlist after adding
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.error || 'Failed to add to wishlist');
        }
    }
);

export const removeFromWishlist = createAsyncThunk(
    'wishlist/removeFromWishlist',
    async ({ productId }, { dispatch, rejectWithValue }) => {
        try {
            const token = getToken();
            const config = { 
                headers: { Authorization: `Bearer ${token}` },
                data: { productId } // Axios delete requires body data to be passed inside config.data
            };
            const response = await axios.delete(`${BaseUrl}/remove-from-wishlist`, config);
            dispatch(fetchWishlist()); // Refresh wishlist after removing
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.error || 'Failed to remove from wishlist');
        }
    }
);

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState: {
        items: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // fetchWishlist
            .addCase(fetchWishlist.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(fetchWishlist.fulfilled, (state, action) => {
                state.loading = false;
                // Assuming backend returns { wishlist: [...] } or matching array
                state.items = action.payload.wishlist || action.payload || [];
            })
            .addCase(fetchWishlist.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

            // addToWishlist
            .addCase(addToWishlist.pending, (state) => { state.loading = true; })
            .addCase(addToWishlist.fulfilled, (state) => { state.loading = false; })
            .addCase(addToWishlist.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

            // removeFromWishlist
            .addCase(removeFromWishlist.pending, (state) => { state.loading = true; })
            .addCase(removeFromWishlist.fulfilled, (state) => { state.loading = false; })
            .addCase(removeFromWishlist.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
    }
});

export default wishlistSlice.reducer;
