import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch token from local storage
const token = localStorage.getItem("token");

// Define the async thunk for fetching chats
export const fetchChats = createAsyncThunk("chats/fetchChats", async ({user}) => {
  try {
    
    const response = await axios.get(`http://localhost:3000/api/chats/${user}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
   
    return response.data;
  } catch (error) {
    throw error;
  }
});

// Define the async thunk for creating a new chat
export const createChat = createAsyncThunk(
  "chats/createChat",
  async ({ user, message }) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/chats/send/${user}`,
        { message },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data.message;
    } catch (error) {
      throw error;
    }
  }
);

// Define the initial state for chats
const initialState = {
  selectedConversations: null,
  messages: [],
  error: null,
};

// Define the chats slice
const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChats.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchChats.fulfilled, (state, action) => {
        state.error = null;
        state.messages = action.payload;
      })
      .addCase(fetchChats.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(createChat.pending, (state) => {
        state.error = null;
      })
      .addCase(createChat.fulfilled, (state, action) => {
        state.error = null;
        state.messages.push(action.payload); 
      })
      .addCase(createChat.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const chatReducer = chatsSlice.reducer;
export const chatSelector = (state) => state.chatReducer;
