import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as restController from "../../pages/api"


const SLICE_NAME = 'userSlice'

const initialState = {
    isLoading: false
}
const reducers = {

}

export const registerUser = createAsyncThunk(
    `${SLICE_NAME}/registerUser`,
    async (payload, { rejectWithValue }) => {
        try {
            const {data} = await restController.registerUser(payload)
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
}

const userSlice = createSlice({
    name: SLICE_NAME,
    initialState,
    reducers,
    extraReducers
})


const { actions, reducer } = userSlice

export default reducer