import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as restController from "../../pages/api/rest"


const SLICE_NAME = 'contactSlice'

const initialState = {
    isLoading: false,
    contactList: []
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

const extraReducers = (builder) => {
    builder.addCase(getAllUser.fulfilled, (state, { payload }) => {
        state.contactList = [...state.contactList, ...payload]
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