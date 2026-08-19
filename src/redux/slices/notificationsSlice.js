import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import BaseUrl from '../../../BaseUrl';

// Thunks
export const fetchNotifications = createAsyncThunk(
    'notifications/fetchNotifications',
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${BaseUrl}/notifications`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data.notifications;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch notifications');
        }
    }
);

export const markAsRead = createAsyncThunk(
    'notifications/markAsRead',
    async (notificationId, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.patch(`${BaseUrl}/notifications/${notificationId}/read`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return { id: notificationId, success: response.data.success };
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to mark notification as read');
        }
    }
);

const notificationsSlice = createSlice({
    name: 'notifications',
    initialState: {
        items: [],
        loading: false,
        error: null,
        unreadCount: 0
    },
    reducers: {
        clearNotificationsError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNotifications.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchNotifications.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
                state.unreadCount = action.payload.filter(n => !n.read).length;
            })
            .addCase(fetchNotifications.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(markAsRead.fulfilled, (state, action) => {
                const index = state.items.findIndex(n => n.id === action.payload.id);
                if (index !== -1) {
                    state.items[index].read = true;
                    state.items[index].isNew = false;
                    state.unreadCount = state.items.filter(n => !n.read).length;
                }
            });
    }
});

export const { clearNotificationsError } = notificationsSlice.actions;
export default notificationsSlice.reducer;
