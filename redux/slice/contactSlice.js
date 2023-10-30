import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as restController from "../../pages/api/rest"


const SLICE_NAME = 'contactSlice'

const initialState = {
    isLoading: false,
    contactList: [],
    messageList: [],
    chatsView: [],
    chats: [],
    currentChat: null,
    currentParticipant: null
}

const reducers = {
    addContact: (state, action) => {
        state.contactList = [...state.contactList, action]
    },
    setCurrentChat: (state, { payload }) => {
        state.currentChat = payload.chatId
    },
    addMessage: (state, { payload }) => {
        state.messageList = [...state.messageList, payload]
        const index = state.chatsView.findIndex((el) => el._id === payload.chatId)
        state.chatsView[index].lastMessage = payload
    },
    filterChats: (state, { payload }) => {
        const regex = new RegExp(`^${payload}`)
        state.chatsView = state.chats.filter(el => regex.test(el.interlocutors.phoneNumber))
    }
}

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
    async (payload, { rejectWithValue, dispatch }) => {
        try {
            const { data } = await restController.sendMessage(payload)
            dispatch(addMessage(data))
            return data
        } catch (e) {
            return rejectWithValue({
                message: "Failed to fetch"
            })
        }
    }
)

export const updateStatusMassage = createAsyncThunk(
    `${SLICE_NAME}/updateStatusMassage`,
    async (payload, { rejectWithValue }) => {
        try {
            const { data } = await restController.updateStatusMassage(payload)
            return data
        } catch (e) {
            return rejectWithValue({
                message: 'Failed to fetch'
            })
        }
    }
)

const extraReducers = (builder) => {
    builder.addCase(updateStatusMassage.pending, (state) => {
        state.isLoading = true
    })
    builder.addCase(updateStatusMassage.fulfilled, (state, { payload }) => {
        state.isLoading = false
        if (payload) {
            const index = state.chatsView.findIndex(el => el.interlocutors._id === payload.sender._id)
            if (index !== -1) {
                const newChatsView = [...state.chatsView]
                newChatsView[index].lastMessage = payload
                state.chatsView = [...newChatsView]
            }
        }
    })
    builder.addCase(updateStatusMassage.rejected, (state, { payload }) => {
        state.isLoading = false
        state.error = payload
    })
    builder.addCase(addFriend.pending, (state) => {
        state.isLoading = true
    })
    builder.addCase(addFriend.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.chatsView = [...state.chatsView, payload]
        state.chats = [...state.chats, payload]
    })
    builder.addCase(addFriend.rejected, (state, { payload }) => {
        state.isLoading = false
        state.error = payload
    })
    builder.addCase(getChats.fulfilled, (state, { payload }) => {
        state.chats = payload
        state.chatsView = payload
    })
    builder.addCase(getOneChat.pending, (state) => {
        state.isLoading = true
    })
    builder.addCase(getOneChat.fulfilled, (state, { payload }) => {
        state.messageList = payload.messages
        state.isLoading = false
        state.currentParticipant = payload.participant
    })
    builder.addCase(getOneChat.rejected, (state, { payload }) => {
        state.isLoading = false
        state.error = payload
    })
    builder.addCase(sendMessage.pending, (state) => {
        state.isLoading = true
    })
    builder.addCase(sendMessage.fulfilled, (state) => {
        state.isLoading = false
    })
    builder.addCase(sendMessage.rejected, (state, { payload }) => {
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

export const { addContact, setCurrentChat, addMessage, filterChats } = actions
export default reducer