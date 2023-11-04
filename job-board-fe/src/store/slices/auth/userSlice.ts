import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SLICE_BASE_NAME } from './constants'

export type UserState = {
    id: number
    firstName: string
    lastName: string
    username: string
    email: string
    appliedJobs: {
        id: number
        name: string
        description: string
    }[]
    authority?: string[]
}

const initialState: UserState = {
    id: 0,
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    appliedJobs: [],
    authority: [],
}

const userSlice = createSlice({
    name: `${SLICE_BASE_NAME}/user`,
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<UserState>) {
            state.id = action.payload.id
            state.firstName = action.payload.firstName
            state.lastName = action.payload.lastName
            state.username = action.payload.username
            state.email = action.payload.email
            state.appliedJobs = action.payload.appliedJobs
            state.authority = action.payload.authority
        },
    },
})

export const { setUser } = userSlice.actions
export default userSlice.reducer
