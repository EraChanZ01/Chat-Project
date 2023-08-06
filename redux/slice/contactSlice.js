import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as restController from "../../pages/api/rest"


const SLICE_NAME = 'contactSlice'

const initialState = {
    isLoading: false,
    contactList: [],
    chatsView: []
}
const reducers = {
    addContact: (state, action) => {
        state.contactList = [...state.contactList, action]
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
}

const userSlice = createSlice({
    name: SLICE_NAME,
    initialState,
    reducers,
    extraReducers
})

const { actions, reducer } = userSlice

export const { addContact } = actions
export default reducer