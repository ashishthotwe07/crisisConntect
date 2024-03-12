import { createSlice } from "@reduxjs/toolkit";
import { io } from "socket.io-client";
import { store } from "../store";

const socket = io("http://localhost:3000");

const initialState = {
  notifications: [],
  currentNotification: null,
  newNoty: false,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    // Add reducer to handle receiving a new notification
    receiveNotification(state, action) {
      const newNotification = action.payload;
      state.notifications.unshift(newNotification);
      state.currentNotification = newNotification;
      state.newNoty = true;
    },

    setCountZero(state) {
      state.newNoty = false;
    },
    clearAllNotifications(state) {
      state.notifications = [];
      state.currentNotification = null;
    },
  },
});

// Listen for 'newEmergencyReport' event and dispatch receiveNotification action
socket.on("newEmergencyReport", (notification) => {
  store.dispatch(notificationSlice.actions.receiveNotification(notification));
});

export const { receiveNotification, clearAllNotifications, setCountZero } =
  notificationSlice.actions;

export const notificationReducer = notificationSlice.reducer;

export const NotificationSelector = (state) => state.notificationReducer;
