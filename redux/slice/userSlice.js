import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addContact } from './contactSlice'
import * as restController from "../../pages/api/rest"


const SLICE_NAME = 'userSlice'

const initialState = {
    isLoading: false
}
const reducers = {

}

export const checkAuth = createAsyncThunk(
    `${SLICE_NAME}/checkAuth`,
    async (payload, { rejectWithValue }) => {
        try {
            const { data } = await restController.checkAuth()
            return data
        } catch (e) {
            return rejectWithValue({
                message: "Failed to fetch"
            })
        }
    }
)

export const registerUser = createAsyncThunk(
    `${SLICE_NAME}/registerUser`,
    async (payload, { rejectWithValue }) => {
        try {
            const { data } = await restController.registerUser(payload)
            return data
        } catch (e) {
            return rejectWithValue({
                message: "Failed to fetch"
            })
        }
    }
)
export const loginUser = createAsyncThunk(
    `${SLICE_NAME}/loginUser`,
    async (payload, { rejectWithValue }) => {
        try {
            const { data } = await restController.loginUser(payload)
            return data
        } catch (e) {
            return rejectWithValue({
                message: "Failed to fetch"
            })
        }
    }
)



const extraReducers = (builder) => {
    builder.addCase(registerUser.pending, (state) => {
        state.isLoading = true
    })
    builder.addCase(registerUser.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.data = payload
        state.error = null

    })
    builder.addCase(registerUser.rejected, (state, { payload }) => {
        state.isLoading = false
        state.error = payload
    })
    builder.addCase(loginUser.pending, (state) => {
        state.isLoading = true
    })
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.data = payload.data
        state.error = null

    })
    builder.addCase(loginUser.rejected, (state, { payload }) => {
        state.isLoading = false
        state.error = payload
    })
    builder.addCase(checkAuth.pending, (state) => {
        state.isLoading = true
    })
    builder.addCase(checkAuth.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.data = payload.data
        state.error = null

    })
    builder.addCase(checkAuth.rejected, (state, { payload }) => {
        state.isLoading = false
        state.error = payload
    })
}

const userSlice = createSlice({
    name: SLICE_NAME,
    initialState,
    reducers,
    extraReducers
})


const { actions, reducer } = userSlice

export default reducer