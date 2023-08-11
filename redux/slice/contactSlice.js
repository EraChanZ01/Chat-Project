import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as restController from "../../pages/api/rest"


const SLICE_NAME = 'contactSlice'

const initialState = {
    isLoading: false,
    contactList: [],
    messageList: [],
    chatsView: [],
    currentChat: null,
    participant: null
}

const reducers = {
    addContact: (state, action) => {
        state.contactList = [...state.contactList, action]
    },
    setCurrentChat: (state, { payload }) => {
        state.currentChat = payload.chatId
        state.participant = payload.participant
    },
    addMessage: (state, { payload }) => {
        state.messageList = [...state.messageList, payload]
    }
}

export const getAllUser = createAsyncThunk(
    `${SLICE_NAME}/getAllUser`,
    async (payload, { rejectWithValue }) => {
        try {
            const { data } = await restController.getAllUser(payload)
            return data
        } catch (e) {
            return rejectWithValue({
                message: "Failed to fetch"
            })
        }
    }
)
export const addFriend = createAsyncThunk(
    `${SLICE_NAME}/addFriend`,
    async (payload, { rejectWithValue }) => {
        try {
            const { data } = await restController.addFriend(payload)
            return data
        } catch (e) {
            return rejectWithValue({
                message: "Failed to fetch"
            })
        }
    }
)
export const getChats = createAsyncThunk(
    `${SLICE_NAME}/getChats`,
    async (payload, { rejectWithValue }) => {
        try {
            const { data } = await restController.getChats()
            return data
        } catch (e) {
            return rejectWithValue({
                message: "Failed to fetch"
            })
        }
    }
)
export const getOneChat = createAsyncThunk(
    `${SLICE_NAME}/getOneChat`,
    async (payload, { rejectWithValue, dispatch }) => {
        try {
            dispatch(setCurrentChat(payload))
            const { data } = await restController.getOneChat(payload.chatId)
            return data
        } catch (e) {
            return rejectWithValue({
                message: "Failed to fetch"
            })
        }
    }
)
export const sendMessage = createAsyncThunk(
    `${SLICE_NAME}/sendMessage`,
    async (payload, { rejectWithValue }) => {
        try {
            const { data } = await restController.sendMessage(payload)
            return data
        } catch (e) {
            return rejectWithValue({
                message: "Failed to fetch"
            })
        }
    }
)

const extraReducers = (builder) => {
    builder.addCase(getAllUser.fulfilled, (state, { payload }) => {
        state.contactList = [...state.contactList, ...payload]
    })
    builder.addCase(addFriend.fulfilled, (state, { payload }) => {
        state.contactList = [...state.contactList, payload]
    })
    builder.addCase(getChats.fulfilled, (state, { payload }) => {
        state.chatsView = payload
    })
    builder.addCase(getOneChat.pending, (state) => {
        state.isLoading = true
    })
    builder.addCase(getOneChat.fulfilled, (state, { payload }) => {
        state.messageList = payload
        state.isLoading = false
    })
    builder.addCase(sendMessage.fulfilled, (state, { payload }) => {
        state.isLoading = false
    })
}

const userSlice = createSlice({
    name: SLICE_NAME,
    initialState,
    reducers,
    extraReducers
})

const { actions, reducer } = userSlice

export const { addContact, setCurrentChat, addMessage } = actions
export default reducer