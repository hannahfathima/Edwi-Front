import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import BaseUrl from '../../../BaseUrl';

const getToken = () => localStorage.getItem('token');

export const fetchAddresses = createAsyncThunk(
    'address/fetchAddresses',
    async (_, { rejectWithValue }) => {
        try {
            const token = getToken();
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.get(`${BaseUrl}/get-address`, config);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.error || 'Failed to fetch addresses');
        }
    }
);

export const addAddress = createAsyncThunk(
    'address/addAddress',
    async (addressData, { dispatch, rejectWithValue }) => {
        try {
            const token = getToken();
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.post(`${BaseUrl}/add-address`, addressData, config);
            dispatch(fetchAddresses()); // Refresh addresses
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.error || 'Failed to add address');
        }
    }
);

export const updateAddress = createAsyncThunk(
    'address/updateAddress',
    async (addressData, { dispatch, rejectWithValue }) => {
        try {
            const token = getToken();
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.put(`${BaseUrl}/update-address`, addressData, config);
            dispatch(fetchAddresses()); // Refresh addresses
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.error || 'Failed to update address');
        }
    }
);

const addressSlice = createSlice({
    name: 'address',
    initialState: {
        addresses: [],
        selectedAddressId: localStorage.getItem('selectedAddressId') || null,
        loading: false,
        initialFetchDone: false,
        error: null
    },
    reducers: {
        setSelectedAddressId: (state, action) => {
            state.selectedAddressId = action.payload;
            if (action.payload) {
                localStorage.setItem('selectedAddressId', action.payload);
            } else {
                localStorage.removeItem('selectedAddressId');
            }
        },
        resetAddressState: (state) => {
            state.addresses = [];
            state.selectedAddressId = null;
            state.loading = false;
            state.initialFetchDone = false;
            state.error = null;
            localStorage.removeItem('selectedAddressId');
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAddresses.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(fetchAddresses.fulfilled, (state, action) => {
                state.loading = false;
                state.initialFetchDone = true;
                state.addresses = action.payload.addresses || [];
                
                const validIds = state.addresses.map(a => a.id || a._id);
                // If no selected address or the current selected ID is invalid, auto-select default or first address
                if (!state.selectedAddressId || !validIds.includes(state.selectedAddressId)) {
                    const defaultAddr = state.addresses.find(a => a.isDefault);
                    const selected = defaultAddr ? (defaultAddr.id || defaultAddr._id) : (validIds[0] || null);
                    state.selectedAddressId = selected;
                    if (selected) {
                        localStorage.setItem('selectedAddressId', selected);
                    } else {
                        localStorage.removeItem('selectedAddressId');
                    }
                }
            })
            .addCase(fetchAddresses.rejected, (state, action) => { 
                state.loading = false; 
                state.initialFetchDone = true; 
                state.error = action.payload; 
            })

            .addCase(addAddress.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(addAddress.fulfilled, (state) => { state.loading = false; })
            .addCase(addAddress.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

            .addCase(updateAddress.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(updateAddress.fulfilled, (state) => { state.loading = false; })
            .addCase(updateAddress.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

            .addCase('auth/logout', (state) => {
                state.addresses = [];
                state.selectedAddressId = null;
                state.initialFetchDone = false;
                state.loading = false;
                state.error = null;
                localStorage.removeItem('selectedAddressId');
            });
    }
});

export const { setSelectedAddressId, resetAddressState } = addressSlice.actions;
export default addressSlice.reducer;
